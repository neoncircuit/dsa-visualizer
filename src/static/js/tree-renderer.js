/**
 * Tree Renderer module.
 *
 * Renders binary trees as SVG with nodes, edges, and value labels.
 * Supports highlighting nodes in different states (visiting, found, comparing, etc.)
 * and animates node movement, insertion, and deletion between renders.
 */

const TreeRenderer = (() => {
    /** @type {HTMLElement|null} */
    let container = null;
    /** @type {SVGSVGElement|null} */
    let svg = null;
    /** @type {SVGGElement|null} */
    let edgeLayer = null;
    /** @type {SVGGElement|null} */
    let nodeLayer = null;
    /** @type {Object.<number, SVGGElement>} */
    let nodeElements = {};

    const NODE_RADIUS = 20;
    const LEVEL_HEIGHT = 60;
    const MIN_H_SPACING = 50;
    const ANIM_MS = 420;

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
     * Render a binary tree from its node structure with animated transitions.
     * Existing nodes animate to new positions, new nodes fade in,
     * removed nodes fade out before being removed.
     *
     * @param {object|null} root - The root node of the tree.
     * @returns {void}
     */
    function render(root) {
        if (!root) {
            container.innerHTML = '';
            nodeElements = {};
            svg = null;
            edgeLayer = null;
            nodeLayer = null;
            return;
        }

        const newPositions = calculatePositions(root);
        const bounds = getBounds(newPositions);
        const pad = 40;
        const vb = `${bounds.minX - pad} ${bounds.minY - pad} ${bounds.maxX - bounds.minX + pad * 2} ${bounds.maxY - bounds.minY + pad * 2}`;

        // Create SVG layers on first render or if DOM was cleared externally
        if (!svg || !container.contains(svg)) {
            container.innerHTML = '';
            nodeElements = {};
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'tree-svg');
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            edgeLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            edgeLayer.setAttribute('class', 'tree-edge-layer');
            nodeLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            nodeLayer.setAttribute('class', 'tree-node-layer');
            svg.appendChild(edgeLayer);
            svg.appendChild(nodeLayer);
            container.appendChild(svg);
        }

        svg.setAttribute('viewBox', vb);

        // Redraw edges instantly — edges snap, only nodes animate
        edgeLayer.innerHTML = '';
        drawEdges(root, newPositions);

        // Collect current tree node IDs
        const newIds = new Set();
        collectIds(root, newIds);
        const oldIds = new Set(Object.keys(nodeElements).map(Number));

        // Fade out nodes that no longer exist
        for (const id of oldIds) {
            if (!newIds.has(id)) {
                const g = nodeElements[id];
                g.style.transition = `opacity ${ANIM_MS}ms ease, transform ${ANIM_MS}ms ease`;
                g.style.opacity = '0';
                // Slightly shrink to reinforce the "removed" feel
                const cur = g.style.transform || 'translate(0px,0px)';
                g.style.transform = cur + ' scale(0.4)';
                setTimeout(() => { if (g.parentNode) g.remove(); }, ANIM_MS);
                delete nodeElements[id];
            }
        }

        // Move existing nodes or create new ones
        traverseNodes(root, (node) => {
            const pos = newPositions.get(node.id);
            const tx = `translate(${pos.x}px, ${pos.y}px)`;

            if (nodeElements[node.id]) {
                // Existing node: animate to new position and clear any highlight state
                const g = nodeElements[node.id];
                g.classList.remove('visiting', 'comparing', 'rotating', 'height-updating', 'balancing', 'replacing');
                g.style.transition = `transform ${ANIM_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                g.style.opacity = '1';
                g.style.transform = tx;
            } else {
                // New node: create at position with opacity 0, then fade in
                const g = createNodeElement(node);
                g.style.transform = tx;
                g.style.opacity = '0';
                g.style.transition = 'none';
                nodeLayer.appendChild(g);
                nodeElements[node.id] = g;
                // Force reflow so the transition triggers
                void g.getBoundingClientRect();
                g.style.transition = `opacity ${ANIM_MS}ms ease`;
                g.style.opacity = '1';
            }
        });
    }

    /**
     * Create an SVG group element for a tree node, centred at origin.
     * Positioning is applied via style.transform on the group.
     *
     * @param {{id: number, value: number}} node - The tree node.
     * @returns {SVGGElement} The constructed group element.
     */
    function createNodeElement(node) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'tree-node');
        g.setAttribute('data-id', node.id);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', 0);
        circle.setAttribute('cy', 0);
        circle.setAttribute('r', NODE_RADIUS);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', 0);
        text.setAttribute('y', 0);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('class', 'tree-node-text');
        text.textContent = node.value;

        g.appendChild(circle);
        g.appendChild(text);
        return g;
    }

    /**
     * Calculate x, y positions for each node using an in-order traversal.
     *
     * @param {object} root - The root node.
     * @returns {Map<number, {x: number, y: number}>} Map of node id to position.
     */
    function calculatePositions(root) {
        const positions = new Map();
        let xCounter = 0;

        /**
         * In-order traversal to assign x positions.
         *
         * @param {object|null} node - Current node.
         * @param {number} depth - Current depth level.
         * @returns {void}
         */
        function inOrder(node, depth) {
            if (!node) return;
            inOrder(node.left, depth + 1);
            positions.set(node.id, {
                x: xCounter * MIN_H_SPACING,
                y: depth * LEVEL_HEIGHT,
            });
            xCounter++;
            inOrder(node.right, depth + 1);
        }

        inOrder(root, 0);
        return positions;
    }

    /**
     * Get bounding box of all node positions.
     *
     * @param {Map<number, {x: number, y: number}>} positions - Node positions map.
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
        return { minX, minY, maxX, maxY };
    }

    /**
     * Collect all node IDs in the tree into a Set.
     *
     * @param {object|null} node - Current node.
     * @param {Set<number>} ids - Set to populate.
     * @returns {void}
     */
    function collectIds(node, ids) {
        if (!node) return;
        ids.add(node.id);
        collectIds(node.left, ids);
        collectIds(node.right, ids);
    }

    /**
     * Traverse all nodes in the tree and invoke a callback for each.
     *
     * @param {object|null} node - Current node.
     * @param {Function} cb - Callback invoked with each node.
     * @returns {void}
     */
    function traverseNodes(node, cb) {
        if (!node) return;
        cb(node);
        traverseNodes(node.left, cb);
        traverseNodes(node.right, cb);
    }

    /**
     * Draw edges between parent and child nodes into the edge layer.
     *
     * @param {object|null} node - Current node.
     * @param {Map<number, {x: number, y: number}>} positions - Node positions.
     * @returns {void}
     */
    function drawEdges(node, positions) {
        if (!node) return;
        const parentPos = positions.get(node.id);

        if (node.left) {
            const childPos = positions.get(node.left.id);
            drawLine(parentPos.x, parentPos.y, childPos.x, childPos.y);
            drawEdges(node.left, positions);
        }
        if (node.right) {
            const childPos = positions.get(node.right.id);
            drawLine(parentPos.x, parentPos.y, childPos.x, childPos.y);
            drawEdges(node.right, positions);
        }
    }

    /**
     * Draw a line (edge) between two points in the edge layer.
     *
     * @param {number} x1 - Start x.
     * @param {number} y1 - Start y.
     * @param {number} x2 - End x.
     * @param {number} y2 - End y.
     * @returns {void}
     */
    function drawLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'tree-edge');
        edgeLayer.appendChild(line);
    }

    /**
     * Highlight a node with a given state class.
     *
     * @param {number} nodeId - The node id to highlight.
     * @param {string} state - CSS class: 'visiting', 'found', 'comparing', 'inserted', 'deleted', etc.
     * @returns {void}
     */
    function highlightNode(nodeId, state) {
        const g = nodeElements[nodeId];
        if (g) {
            g.classList.add(state);
        }
    }

    /**
     * Clear a specific state class from a node.
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
            g.classList.remove('visiting', 'found', 'comparing', 'inserted', 'deleted', 'rotating', 'height-updating', 'balancing', 'replacing');
        }
    }

    /**
     * Process a tree algorithm step and apply the appropriate highlight state.
     *
     * @param {{type: string, nodeId: number, newValue?: number, codeLine: number}} step - The step object.
     * @returns {void}
     */
    function processStep(step) {
        // Clear transient states, keep persistent ones (found, inserted, deleted)
        for (const g of Object.values(nodeElements)) {
            g.classList.remove('visiting', 'comparing', 'rotating', 'height-updating', 'balancing', 'replacing');
        }

        /** @type {Object.<string, string>} */
        const stateMap = {
            visit: 'visiting',
            compare: 'comparing',
            found: 'found',
            insert: 'inserted',
            delete: 'deleted',
            rotate: 'rotating',
            updateHeight: 'height-updating',
            checkBalance: 'balancing',
            replace: 'replacing',
        };

        const cls = stateMap[step.type];
        if (cls && step.nodeId != null) {
            highlightNode(step.nodeId, cls);
        }

        if (step.type === 'replace' && step.newValue !== undefined && step.nodeId != null) {
            updateNodeValue(step.nodeId, step.newValue);
        }
    }

    /**
     * Update the displayed value of a node without re-rendering.
     *
     * @param {number} nodeId - The node id to update.
     * @param {number} newValue - The new value to display.
     * @returns {void}
     */
    function updateNodeValue(nodeId, newValue) {
        const g = nodeElements[nodeId];
        if (g) {
            const textElement = g.querySelector('.tree-node-text');
            if (textElement) {
                textElement.textContent = newValue;
            }
        }
    }

    return { init, render, highlightNode, clearNodeState, clearAllStates, processStep, updateNodeValue };
})();

export default TreeRenderer;
