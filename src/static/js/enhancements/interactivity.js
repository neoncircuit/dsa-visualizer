/**
 * Interactivity enhancement module.
 *
 * Adds drag-and-drop bar reordering so users can manually arrange
 * bars to create custom arrays. Also supports undo/redo of the
 * last reorder operation.
 *
 * When a graph is active and displayed in node-edge view, enables
 * drag-and-drop repositioning of graph nodes with edge-following.
 *
 * Subscribes to: algorithm:reset
 * Emits: none
 *
 * @module enhancements/interactivity
 */

import EventBus from '../event-bus.js';

/**
 * Keep enhancement toolbar buttons in a stable left-to-right order.
 *
 * @returns {void}
 */
function orderEnhancementButtons() {
    const enhancements = document.getElementById('controls-enhancements');
    if (!enhancements) return;

    ['btn-challenge', 'btn-quiz', 'btn-drag'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) enhancements.appendChild(el);
    });
}

const Interactivity = {
    /** @type {number[]} */
    _preDragValues: [],

    /** @type {number[]} */
    _lastOrder: [],

    /** @type {number[]} */
    _beforeLastOrder: [],

    /** @type {boolean} */
    _dragEnabled: true,

    /** @type {HTMLElement|null} */
    _draggedBar: null,

    /** @type {boolean} Whether a graph node is currently being dragged. */
    _graphDragging: false,

    /** @type {number|null} The node ID being dragged. */
    _draggedNodeId: null,

    /** @type {SVGElement|null} The SVG viewport element. */
    _graphSvg: null,

    /** @type {number|null} ViewBox offset X for coordinate conversion. */
    _vbX: 0,

    /** @type {number|null} ViewBox offset Y for coordinate conversion. */
    _vbY: 0,

    /** @type {number|null} ViewBox width for coordinate conversion. */
    _vbW: 0,

    /** @type {number|null} ViewBox height for coordinate conversion. */
    _vbH: 0,

    /**
     * Initialise the interactivity module.
     *
     * Sets up drag-and-drop on bar elements and keyboard shortcut
     * (Ctrl+Z for undo, Ctrl+Shift+Z for redo). Also sets up graph
     * node drag via mousedown delegation.
     *
     * @returns {void}
     */
    init() {
        this.setupBarDragging();
        this.setupGraphNodeDragging();
        this.setupKeyboardShortcuts();
        this.injectToggleButton();
        EventBus.on('algorithm:reset', () => this._clearHistory());
    },

    /**
     * Clear undo/redo history on algorithm reset.
     *
     * @returns {void}
     */
    _clearHistory() {
        this._lastOrder = [];
        this._beforeLastOrder = [];
    },

    /**
     * Inject a toggle button to enable/disable drag-and-drop.
     *
     * @returns {void}
     */
    injectToggleButton() {
        const enhancements = document.getElementById('controls-enhancements');
        if (!enhancements || document.getElementById('btn-drag')) return;

        const btn = document.createElement('button');
        btn.id = 'btn-drag';
        btn.title = 'Toggle drag-and-drop bar reordering';
        btn.textContent = 'Drag';
        btn.className = 'btn drag-btn drag-btn-active';

        btn.addEventListener('click', () => {
            this._dragEnabled = !this._dragEnabled;
            btn.className = this._dragEnabled ? 'btn drag-btn drag-btn-active' : 'btn drag-btn';

            const container = document.getElementById('bars-container');
            if (container) {
                container.classList.toggle('drag-enabled', this._dragEnabled);
            }
        });

        enhancements.appendChild(btn);
        orderEnhancementButtons();
    },

    /**
     * Set up drag-and-drop event listeners on the bars container.
     *
     * Bars are reordered visually by inserting the dragged bar
     * before or after its drop target. On dragend, the new order
     * is synced back to the underlying array state.
     *
     * @returns {void}
     */
    setupBarDragging() {
        document.addEventListener('dragstart', (e) => {
            if (!this._dragEnabled) return;
            const bar = e.target.closest('.bar');
            if (!bar) return;

            this._draggedBar = bar;
            this._preDragValues = this._getBarValues();
            e.dataTransfer.effectAllowed = 'move';
            requestAnimationFrame(() => bar.classList.add('dragging'));
        });

        document.addEventListener('dragover', (e) => {
            if (!this._dragEnabled || !this._draggedBar) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            const container = document.getElementById('bars-container');
            if (!container) return;

            const bar = e.target.closest('.bar');
            if (!bar || bar === this._draggedBar) return;

            const rect = bar.getBoundingClientRect();
            const midX = rect.left + rect.width / 2;

            if (e.clientX < midX) {
                container.insertBefore(this._draggedBar, bar);
            } else {
                container.insertBefore(this._draggedBar, bar.nextSibling);
            }
        });

        document.addEventListener('dragend', () => {
            if (!this._draggedBar) return;
            this._draggedBar.classList.remove('dragging');

            const newValues = this._getBarValues();
            if (this._preDragValues.length > 0 && this._arraysDiffer(this._preDragValues, newValues)) {
                this._beforeLastOrder = this._lastOrder;
                this._lastOrder = this._preDragValues;
                EventBus.emit('array:reordered', { newArray: newValues });
            }

            this._draggedBar = null;
            this._preDragValues = [];
        });
    },

    /**
     * Set up mousedown/mousemove/mouseup listeners for graph node dragging.
     *
     * When a graph is displayed in node-edge view and the user mousedowns
     * on a graph node circle, the node follows the cursor. Edges connected
     * to the dragged node are updated in real time. On mouseup the new
     * position is stored in the GraphRenderer's position map.
     *
     * @returns {void}
     */
    setupGraphNodeDragging() {
        document.addEventListener('mousedown', (e) => {
            const nodeGroup = e.target.closest('.graph-node');
            if (!nodeGroup) return;
            if (e.button !== 0) return;

            const container = document.getElementById('tree-graph-container');
            if (!container) return;
            const svg = container.querySelector('.graph-svg');
            if (!svg) return;

            const nodeId = parseInt(nodeGroup.dataset.id, 10);
            if (isNaN(nodeId)) return;

            e.preventDefault();
            this._graphDragging = true;
            this._draggedNodeId = nodeId;
            this._graphSvg = svg;
            this._parseViewBox(svg);

            nodeGroup.classList.add('graph-node-dragging');
            svg.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!this._graphDragging || this._draggedNodeId == null) return;

            const svg = this._graphSvg;
            if (!svg) return;

            const container = document.getElementById('tree-graph-container');
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            const svgX = this._vbX + (mx / rect.width) * this._vbW;
            const svgY = this._vbY + (my / rect.height) * this._vbH;

            const graphRendererModule = awaitGraphRenderer();
            if (!graphRendererModule) return;

            const nodeEl = svg.querySelector(`.graph-node[data-id="${this._draggedNodeId}"]`);
            if (!nodeEl) return;

            const circle = nodeEl.querySelector('circle');
            const text = nodeEl.querySelector('.graph-node-text');
            if (circle) {
                circle.setAttribute('cx', svgX);
                circle.setAttribute('cy', svgY);
            }
            if (text) {
                text.setAttribute('x', svgX);
                text.setAttribute('y', svgY);
            }

            graphRendererModule.updateNodePosition(this._draggedNodeId, svgX, svgY);
            graphRendererModule.redrawEdges();
        });

        document.addEventListener('mouseup', () => {
            if (!this._graphDragging) return;

            const svg = this._graphSvg;
            if (svg) {
                svg.style.cursor = '';
                const nodeEl = svg.querySelector(`.graph-node[data-id="${this._draggedNodeId}"]`);
                if (nodeEl) nodeEl.classList.remove('graph-node-dragging');
            }

            this._graphDragging = false;
            this._draggedNodeId = null;
            this._graphSvg = null;
        });
    },

    /**
     * Parse the current viewBox attributes from an SVG element.
     *
     * @param {SVGElement} svg - The SVG element.
     * @returns {void}
     */
    _parseViewBox(svg) {
        const vb = svg.getAttribute('viewBox');
        if (!vb) {
            this._vbX = 0;
            this._vbY = 0;
            this._vbW = 500;
            this._vbH = 500;
            return;
        }
        const parts = vb.split(/[\s,]+/).map(Number);
        this._vbX = parts[0] || 0;
        this._vbY = parts[1] || 0;
        this._vbW = parts[2] || 500;
        this._vbH = parts[3] || 500;
    },

    /**
     * Read the current bar values from the DOM.
     *
     * @returns {number[]}
     */
    _getBarValues() {
        const bars = document.querySelectorAll('#bars-container .bar');
        return Array.from(bars).map((bar) => {
            const height = bar.style.height || '';
            const match = height.match(/([\d.]+)%/);
            return match ? parseFloat(match[1]) : 0;
        });
    },

    /**
     * Compare two arrays for inequality.
     *
     * @param {number[]} a
     * @param {number[]} b
     * @returns {boolean}
     */
    _arraysDiffer(a, b) {
        if (a.length !== b.length) return true;
        return a.some((v, i) => v !== b[i]);
    },

    /**
     * Set up Ctrl+Z (undo) and Ctrl+Shift+Z (redo) keyboard shortcuts.
     *
     * Undo restores the previous bar order by emitting an array:reordered event.
     *
     * @returns {void}
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!this._dragEnabled) return;

            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyZ') {
                e.preventDefault();
                this.redo();
            } else if ((e.ctrlKey || e.metaKey) && e.code === 'KeyZ') {
                e.preventDefault();
                this.undo();
            }
        });
    },

    /**
     * Undo the last bar reorder by restoring the previous array order.
     *
     * @returns {void}
     */
    undo() {
        if (this._lastOrder.length === 0) return;
        this._beforeLastOrder = this._lastOrder;
        this._lastOrder = [];
        EventBus.emit('array:reordered', { newArray: this._lastOrder });
    },

    /**
     * Redo the last undone bar reorder.
     *
     * @returns {void}
     */
    redo() {
        if (this._beforeLastOrder.length === 0) return;
        EventBus.emit('array:reordered', { newArray: this._beforeLastOrder });
        this._beforeLastOrder = [];
    },
};

/**
 * Dynamically import the GraphRenderer module.
 * Used to avoid hard coupling while still accessing position data.
 *
 * @returns {Promise<typeof import('../graph-renderer.js').default|null>}
 */
async function awaitGraphRenderer() {
    try {
        const mod = await import('../graph-renderer.js');
        return mod.default;
    } catch {
        return null;
    }
}

export default Interactivity;
