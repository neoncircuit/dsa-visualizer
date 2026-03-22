/**
 * Tree Renderer module.
 *
 * Renders binary trees as SVG with nodes, edges, and value labels.
 * Supports highlighting nodes in different states (visiting, found, comparing, etc.).
 */

const TreeRenderer = (() => {
    /** @type {HTMLElement|null} */
    let container = null;
    /** @type {SVGSVGElement|null} */
    let svg = null;
    /** @type {Object.<number, SVGGElement>} */
    let nodeElements = {};

    const NODE_RADIUS = 20;
    const LEVEL_HEIGHT = 60;
    const MIN_H_SPACING = 50;

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
     * Render a binary tree from its node structure.
     * Tree is an object: { value, left, right, id }
     *
     * @param {object|null} root - The root node of the tree.
     * @returns {void}
     */
    function render(root) {
        container.innerHTML = '';
        nodeElements = {};

        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'tree-svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        container.appendChild(svg);

        if (!root) return;

        // Calculate positions
        const positions = calculatePositions(root);
        const bounds = getBounds(positions);

        // Set viewBox to fit all nodes with padding
        const pad = 40;
        svg.setAttribute('viewBox',
            `${bounds.minX - pad} ${bounds.minY - pad} ${bounds.maxX - bounds.minX + pad * 2} ${bounds.maxY - bounds.minY + pad * 2}`
        );

        // Draw edges first (so they appear behind nodes)
        drawEdges(root, positions);

        // Draw nodes
        drawNodes(root, positions);
    }

    /**
     * Calculate x, y positions for each node using an in-order traversal.
     *
     * @param {object} root - The root node.
     * @returns {Map} Map of node id to {x, y}.
     */
    function calculatePositions(root) {
        /** @type {Map<number, {x: number, y: number}>} */
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
        return { minX, minY, maxX, maxY };
    }

    /**
     * Draw edges between parent and child nodes.
     *
     * @param {object} node - Current node.
     * @param {Map} positions - Node positions.
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
     * Draw a line (edge) between two points.
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
        svg.appendChild(line);
    }

    /**
     * Draw all nodes recursively.
     *
     * @param {object|null} node - Current node.
     * @param {Map} positions - Node positions.
     * @returns {void}
     */
    function drawNodes(node, positions) {
        if (!node) return;
        const pos = positions.get(node.id);

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'tree-node');
        g.setAttribute('data-id', node.id);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', NODE_RADIUS);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('class', 'tree-node-text');
        text.textContent = node.value;

        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
        nodeElements[node.id] = g;

        drawNodes(node.left, positions);
        drawNodes(node.right, positions);
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
     * Process a tree algorithm step.
     *
     * @param {{type: string, nodeId: number}} step - The step to process.
     * @returns {void}
     */
    function processStep(step) {
        // Clear transient states
        for (const g of Object.values(nodeElements)) {
            g.classList.remove('visiting', 'comparing');
        }

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

export default TreeRenderer;
