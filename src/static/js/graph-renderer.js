/**
 * Graph Renderer module.
 *
 * Renders graphs as SVG with nodes positioned in a circle layout,
 * weighted/unweighted edges, and node state highlighting for traversals.
 */

const GraphRenderer = (() => {
    /** @type {HTMLElement|null} */
    let container = null;
    /** @type {SVGSVGElement|null} */
    let svg = null;
    /** @type {Object.<number, SVGGElement>} */
    let nodeElements = {};
    /** @type {Object.<string, SVGLineElement>} */
    let edgeElements = {};

    const NODE_RADIUS = 22;

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
     * Render a graph from adjacency list and optional positions.
     *
     * @param {number[]} nodes - Array of node values/ids.
     * @param {Array<[number, number, number?]>} edges - Array of [from, to, weight?].
     * @param {boolean} directed - Whether edges are directed.
     * @returns {void}
     */
    function render(nodes, edges, directed = false) {
        container.innerHTML = '';
        nodeElements = {};
        edgeElements = {};

        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'graph-svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        container.appendChild(svg);

        // Position nodes in a circle
        const positions = circleLayout(nodes);

        // Calculate viewBox
        const pad = 60;
        const size = Math.max(...nodes.map((_, i) => {
            const p = positions.get(nodes[i]);
            return Math.max(Math.abs(p.x), Math.abs(p.y));
        })) + pad;

        svg.setAttribute('viewBox', `${-size} ${-size} ${size * 2} ${size * 2}`);

        // Draw edges first
        for (const edge of edges) {
            const [from, to, weight] = edge;
            const fromPos = positions.get(from);
            const toPos = positions.get(to);
            if (fromPos && toPos) {
                drawEdge(from, to, fromPos, toPos, weight, directed);
            }
        }

        // Draw nodes
        for (const nodeVal of nodes) {
            const pos = positions.get(nodeVal);
            drawNode(nodeVal, pos.x, pos.y);
        }
    }

    /**
     * Position nodes in a circle layout.
     *
     * @param {number[]} nodes - Node values.
     * @returns {Map<number, {x: number, y: number}>} Position map.
     */
    function circleLayout(nodes) {
        /** @type {Map<number, {x: number, y: number}>} */
        const positions = new Map();
        const n = nodes.length;
        const radius = Math.max(80, n * 25);

        for (let i = 0; i < n; i++) {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            positions.set(nodes[i], {
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
            });
        }
        return positions;
    }

    /**
     * Draw an edge between two nodes.
     *
     * @param {number} from - Source node.
     * @param {number} to - Target node.
     * @param {{x: number, y: number}} fromPos - Source position.
     * @param {{x: number, y: number}} toPos - Target position.
     * @param {number} [weight] - Optional edge weight.
     * @param {boolean} directed - Whether to draw an arrow.
     * @returns {void}
     */
    function drawEdge(from, to, fromPos, toPos, weight, directed) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromPos.x);
        line.setAttribute('y1', fromPos.y);
        line.setAttribute('x2', toPos.x);
        line.setAttribute('y2', toPos.y);
        line.setAttribute('class', 'graph-edge');
        line.setAttribute('data-from', from);
        line.setAttribute('data-to', to);

        const key = `${from}-${to}`;
        edgeElements[key] = line;
        svg.appendChild(line);

        // Weight label
        if (weight != null) {
            const midX = (fromPos.x + toPos.x) / 2;
            const midY = (fromPos.y + toPos.y) / 2;
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', midX);
            text.setAttribute('y', midY - 8);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('class', 'graph-weight');
            text.textContent = weight;
            svg.appendChild(text);
        }
    }

    /**
     * Draw a node circle with label.
     *
     * @param {number} value - Node value.
     * @param {number} x - X position.
     * @param {number} y - Y position.
     * @returns {void}
     */
    function drawNode(value, x, y) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'graph-node');
        g.setAttribute('data-id', value);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', NODE_RADIUS);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('class', 'graph-node-text');
        text.textContent = value;

        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
        nodeElements[value] = g;
    }

    /**
     * Highlight a node with a state.
     *
     * @param {number} nodeId - Node to highlight.
     * @param {string} state - CSS class: 'visiting', 'visited', 'found', 'current', 'queued'.
     * @returns {void}
     */
    function highlightNode(nodeId, state) {
        const g = nodeElements[nodeId];
        if (g) g.classList.add(state);
    }

    /**
     * Highlight an edge with a state.
     *
     * @param {number} from - Source node.
     * @param {number} to - Target node.
     * @param {string} state - CSS class: 'traversed', 'considering'.
     * @returns {void}
     */
    function highlightEdge(from, to, state) {
        const key = `${from}-${to}`;
        const line = edgeElements[key] || edgeElements[`${to}-${from}`];
        if (line) line.classList.add(state);
    }

    /**
     * Clear all highlight states.
     *
     * @returns {void}
     */
    function clearAllStates() {
        for (const g of Object.values(nodeElements)) {
            g.classList.remove('visiting', 'visited', 'found', 'current', 'queued');
        }
        for (const line of Object.values(edgeElements)) {
            line.classList.remove('traversed', 'considering');
        }
    }

    /**
     * Process a graph algorithm step.
     *
     * @param {{type: string, nodeId?: number, from?: number, to?: number}} step - The step.
     * @returns {void}
     */
    function processStep(step) {
        const nodeStateMap = {
            visit: 'current',
            enqueue: 'queued',
            dequeue: 'current',
            visited: 'visited',
            found: 'found',
        };

        if (step.type === 'visit' || step.type === 'dequeue') {
            // Clear previous 'current'
            for (const g of Object.values(nodeElements)) {
                g.classList.remove('current');
            }
        }

        if (step.nodeId != null) {
            const cls = nodeStateMap[step.type];
            if (cls) highlightNode(step.nodeId, cls);
        }

        if (step.from != null && step.to != null) {
            highlightEdge(step.from, step.to, 'traversed');
        }
    }

    return { init, render, highlightNode, highlightEdge, clearAllStates, processStep };
})();

export default GraphRenderer;
