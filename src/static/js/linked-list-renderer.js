/**
 * Linked List Renderer module.
 *
 * Renders linked lists as SVG with rectangular nodes and arrow pointers.
 * Supports highlighting nodes in different states (visiting, found, comparing, etc.).
 */

const LinkedListRenderer = (() => {
    /** @type {HTMLElement|null} */
    let container = null;
    /** @type {SVGSVGElement|null} */
    let svg = null;
    /** @type {Object.<number, SVGGElement>} */
    let nodeElements = {};

    const NODE_WIDTH = 50;
    const NODE_HEIGHT = 30;
    const HORIZONTAL_SPACING = 80;
    const VERTICAL_SPACING = 60;
    const ARROW_SIZE = 20;

    /**
     * Initialize the renderer with a container element.
     *
     * @param {HTMLElement} containerEl - The container to render into.
     * @returns {void}
     */
    function init(containerEl) {
        container = containerEl;
    }

    /**
     * Render a linked list from its head node.
     * Node structure: { value, next, id }
     *
     * @param {object|null} head - The head node of the list (or null).
     * @returns {void}
     */
    function render(head) {
        container.innerHTML = '';
        nodeElements = {};

        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'll-svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        container.appendChild(svg);

        if (!head) {
            const emptyText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            emptyText.setAttribute('x', '50%');
            emptyText.setAttribute('y', '50%');
            emptyText.setAttribute('text-anchor', 'middle');
            emptyText.setAttribute('dominant-baseline', 'central');
            emptyText.setAttribute('class', 'll-empty-text');
            emptyText.textContent = 'Empty List';
            svg.appendChild(emptyText);
            return;
        }

        const positions = calculateLayout(head);
        const bounds = getBounds(positions);

        const pad = 40;
        svg.setAttribute('viewBox',
            `${bounds.minX - pad} ${bounds.minY - pad} ${bounds.maxX - bounds.minX + NODE_WIDTH + pad * 2} ${bounds.maxY - bounds.minY + NODE_HEIGHT + pad * 2}`
        );

        drawArrows(head, positions);
        drawNodes(head, positions);
    }

    /**
     * Calculate x, y positions for each node using horizontal layout.
     *
     * @param {object} head - The head node.
     * @returns {Map} Map of node id to {x, y}.
     */
    function calculateLayout(head) {
        const positions = new Map();
        let current = head;
        let x = 0;
        let y = 0;
        let maxX = 0;

        while (current) {
            positions.set(current.id, { x, y });
            x += HORIZONTAL_SPACING;
            maxX = x;
            current = current.next;
        }

        return positions;
    }

    /**
     * Get bounding box of all node positions.
     *
     * @param {Map} positions - Node positions map.
     * @returns {{minX: number, minY: number, maxX: number, maxY: number}} Bounds.
     */
    function getBounds(positions) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        for (const pos of positions.values()) {
            minX = Math.min(minX, pos.x);
            minY = Math.min(minY, pos.y);
            maxX = Math.max(maxX, pos.x);
            maxY = Math.max(maxY, pos.y);
        }

        if (positions.size === 0) {
            minX = 0;
            minY = 0;
            maxX = 200;
            maxY = 100;
        }

        return { minX, minY, maxX, maxY };
    }

    /**
     * Draw arrows between nodes.
     *
     * @param {object} head - The head node.
     * @param {Map} positions - Layout object with positions.
     * @returns {void}
     */
    function drawArrows(head, positions) {
        let current = head;

        while (current && current.next) {
            const start = positions.get(current.id);
            const end = positions.get(current.next.id);

            drawArrow(
                start.x + NODE_WIDTH,
                start.y + NODE_HEIGHT / 2,
                end.x - ARROW_SIZE,
                end.y + NODE_HEIGHT / 2
            );

            current = current.next;
        }
    }

    /**
     * Draw an arrow between two points.
     *
     * @param {number} x1 - Start x.
     * @param {number} y1 - Start y.
     * @param {number} x2 - End x.
     * @param {number} y2 - End y.
     * @returns {void}
     */
    function drawArrow(x1, y1, x2, y2) {
        const defs = svg.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        if (!svg.querySelector('defs')) {
            svg.appendChild(defs);
        }

        const arrowhead = defs.querySelector('#ll-arrowhead');
        if (!arrowhead) {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', 'll-arrowhead');
            marker.setAttribute('markerWidth', '10');
            marker.setAttribute('markerHeight', '7');
            marker.setAttribute('refX', '10');
            marker.setAttribute('refY', '3.5');
            marker.setAttribute('orient', 'auto');
            const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
            polygon.setAttribute('fill', 'var(--border-color)');
            marker.appendChild(polygon);
            defs.appendChild(marker);
        }

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'll-arrow');
        line.setAttribute('marker-end', 'url(#ll-arrowhead)');
        svg.appendChild(line);
    }

    /**
     * Draw all nodes.
     *
     * @param {object|null} node - Current node.
     * @param {Map} positions - Layout object with positions.
     * @returns {void}
     */
    function drawNodes(node, positions) {
        while (node) {
            const pos = positions.get(node.id);

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'll-node');
            g.setAttribute('data-id', node.id);

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', pos.x);
            rect.setAttribute('y', pos.y);
            rect.setAttribute('width', NODE_WIDTH);
            rect.setAttribute('height', NODE_HEIGHT);
            rect.setAttribute('rx', '4');

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', pos.x + NODE_WIDTH / 2);
            text.setAttribute('y', pos.y + NODE_HEIGHT / 2);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'central');
            text.setAttribute('class', 'll-node-text');
            text.textContent = node.value;

            g.appendChild(rect);
            g.appendChild(text);
            svg.appendChild(g);
            nodeElements[node.id] = g;

            node = node.next;
        }
    }

    /**
     * Highlight a node with a given state.
     *
     * @param {number} nodeId - The node id to highlight.
     * @param {string} state - CSS class: 'visiting', 'found', 'comparing', 'inserted', 'deleted'.
     * @returns {void}
     */
    function highlightNode(nodeId, state) {
        const g = nodeElements[nodeId];
        if (g) {
            g.classList.add(state);
        }
    }

    /**
     * Clear a specific state from a node.
     *
     * @param {number} nodeId - The node id.
     * @param {string} state - The state class to remove.
     * @returns {void}
     */
    function clearNodeState(nodeId, state) {
        const g = nodeElements[nodeId];
        if (g) {
            g.classList.remove(state);
        }
    }

    /**
     * Clear all highlight states from all nodes.
     *
     * @returns {void}
     */
    function clearAllStates() {
        for (const g of Object.values(nodeElements)) {
            g.classList.remove('visiting', 'found', 'comparing', 'inserted', 'deleted');
        }
    }

    /**
     * Process a linked list algorithm step.
     *
     * @param {{type: string, nodeId: number, codeLine: number}} step - The step to process.
     * @returns {void}
     */
    function processStep(step) {
        clearAllStates();

        const stateMap = {
            visit: 'visiting',
            compare: 'comparing',
            found: 'found',
            insert: 'inserted',
            delete: 'deleted',
        };

        const cls = stateMap[step.type];
        if (cls && step.nodeId != null) {
            highlightNode(step.nodeId, cls);
        }
    }

    return { init, render, highlightNode, clearNodeState, clearAllStates, processStep };
})();

export default LinkedListRenderer;
