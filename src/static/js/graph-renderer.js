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
    /** @type {Map<number, {x: number, y: number}>} */
    let currentPositions = new Map();

    /** @type {number[]} Cached node list for edge redrawing. */
    let cachedNodes = [];
    /** @type {Array<[number, number, number?]>} Cached edge list for redrawing. */
    let cachedEdges = [];
    /** @type {boolean} Cached directed flag for edge redrawing. */
    let cachedDirected = false;

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

        cachedNodes = [...nodes];
        cachedEdges = edges.map(e => [...e]);
        cachedDirected = directed;

        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'graph-svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        container.appendChild(svg);

        // Position nodes in a circle
        currentPositions = circleLayout(nodes);

        // Calculate viewBox
        const pad = 60;
        const size = Math.max(...nodes.map((_, i) => {
            const p = currentPositions.get(nodes[i]);
            return Math.max(Math.abs(p.x), Math.abs(p.y));
        })) + pad;

        svg.setAttribute('viewBox', `${-size} ${-size} ${size * 2} ${size * 2}`);

        // Draw edges first
        for (const edge of edges) {
            const [from, to, weight] = edge;
            const fromPos = currentPositions.get(from);
            const toPos = currentPositions.get(to);
            if (fromPos && toPos) {
                drawEdge(from, to, fromPos, toPos, weight, directed);
            }
        }

        // Draw nodes
        for (const nodeVal of nodes) {
            const pos = currentPositions.get(nodeVal);
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

    /**
     * Get the current node positions.
     *
     * @returns {Object.<number, {x: number, y: number}>} Position map.
     */
    function getNodePositions() {
        const result = {};
        for (const [key, value] of currentPositions) {
            result[key] = value;
        }
        return result;
    }

    /**
     * Render an adjacency matrix representation of the graph.
     *
     * @param {number[]} nodes - Array of node values/ids.
     * @param {Array<[number, number, number?]>} edges - Array of [from, to, weight?].
     * @param {boolean} directed - Whether edges are directed.
     * @returns {void}
     */
    function renderMatrix(nodes, edges, directed = false) {
        container.innerHTML = '';
        nodeElements = {};
        edgeElements = {};

        const n = nodes.length;
        const sortedNodes = [...nodes].sort((a, b) => a - b);
        const nodeIndex = new Map(sortedNodes.map((node, i) => [node, i]));

        const matrix = Array(n).fill(null).map(() => Array(n).fill(0));

        for (const [from, to, weight] of edges) {
            const w = weight || 1;
            const i = nodeIndex.get(from);
            const j = nodeIndex.get(to);
            if (i !== undefined && j !== undefined) {
                matrix[i][j] = w;
                if (!directed) {
                    matrix[j][i] = w;
                }
            }
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'adj-matrix-wrapper';

        const table = document.createElement('table');
        table.className = 'adj-matrix';

        const headerRow = document.createElement('tr');
        const emptyHeader = document.createElement('th');
        headerRow.appendChild(emptyHeader);
        for (const node of sortedNodes) {
            const th = document.createElement('th');
            th.textContent = node;
            th.className = 'matrix-header';
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        for (let i = 0; i < n; i++) {
            const row = document.createElement('tr');
            const rowHeader = document.createElement('th');
            rowHeader.textContent = sortedNodes[i];
            rowHeader.className = 'matrix-header';
            row.appendChild(rowHeader);

            for (let j = 0; j < n; j++) {
                const cell = document.createElement('td');
                const val = matrix[i][j];
                cell.textContent = val === 0 ? '-' : val;
                cell.className = 'matrix-cell';
                cell.dataset.row = sortedNodes[i];
                cell.dataset.col = sortedNodes[j];
                if (val !== 0) {
                    cell.classList.add('has-edge');
                }
                if (i === j) {
                    cell.classList.add('diagonal');
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        wrapper.appendChild(table);
        container.appendChild(wrapper);
    }

    /**
     * Render an adjacency list representation of the graph.
     *
     * @param {number[]} nodes - Array of node values/ids.
     * @param {Array<[number, number, number?]>} edges - Array of [from, to, weight?].
     * @param {boolean} directed - Whether edges are directed.
     * @returns {void}
     */
    function renderList(nodes, edges, directed = false) {
        container.innerHTML = '';
        nodeElements = {};
        edgeElements = {};

        const adjList = {};
        for (const node of nodes) {
            adjList[node] = [];
        }

        for (const [from, to, weight] of edges) {
            const w = weight || 1;
            if (adjList[from]) {
                adjList[from].push({ to, weight: w });
            }
            if (!directed && adjList[to]) {
                adjList[to].push({ to: from, weight: w });
            }
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'adj-list-wrapper';

        const sortedNodes = [...nodes].sort((a, b) => a - b);

        for (const node of sortedNodes) {
            const row = document.createElement('div');
            row.className = 'adj-list-row';
            row.dataset.node = node;

            const nodeLabel = document.createElement('span');
            nodeLabel.className = 'adj-list-node';
            nodeLabel.textContent = node;
            row.appendChild(nodeLabel);

            const arrow = document.createElement('span');
            arrow.className = 'adj-list-arrow';
            arrow.textContent = '→';
            row.appendChild(arrow);

            const neighbors = adjList[node] || [];
            if (neighbors.length === 0) {
                const empty = document.createElement('span');
                empty.className = 'adj-list-empty';
                empty.textContent = '∅';
                row.appendChild(empty);
            } else {
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];
                    const neighborSpan = document.createElement('span');
                    neighborSpan.className = 'adj-list-neighbor';
                    neighborSpan.textContent = neighbor.weight === 1 ? neighbor.to : `${neighbor.to}(${neighbor.weight})`;
                    neighborSpan.dataset.from = node;
                    neighborSpan.dataset.to = neighbor.to;
                    row.appendChild(neighborSpan);

                    if (i < neighbors.length - 1) {
                        const separator = document.createElement('span');
                        separator.className = 'adj-list-separator';
                        separator.textContent = '→';
                        row.appendChild(separator);
                    }
                }
            }

            wrapper.appendChild(row);
        }

        container.appendChild(wrapper);
    }

    /**
     * Render both adjacency matrix and adjacency list side by side.
     *
     * @param {number[]} nodes - Array of node values/ids.
     * @param {Array<[number, number, number?]>} edges - Array of [from, to, weight?].
     * @param {boolean} directed - Whether edges are directed.
     * @returns {void}
     */
    function renderBoth(nodes, edges, directed = false) {
        container.innerHTML = '';
        nodeElements = {};
        edgeElements = {};

        const wrapper = document.createElement('div');
        wrapper.className = 'graph-both-wrapper';

        const matrixPanel = document.createElement('div');
        matrixPanel.className = 'graph-both-panel';
        const matrixLabel = document.createElement('div');
        matrixLabel.className = 'graph-both-panel-label';
        matrixLabel.textContent = 'Adjacency Matrix';
        matrixPanel.appendChild(matrixLabel);

        const listPanel = document.createElement('div');
        listPanel.className = 'graph-both-panel';
        const listLabel = document.createElement('div');
        listLabel.className = 'graph-both-panel-label';
        listLabel.textContent = 'Adjacency List';
        listPanel.appendChild(listLabel);

        wrapper.appendChild(matrixPanel);
        wrapper.appendChild(listPanel);
        container.appendChild(wrapper);

        // Build matrix table into matrixPanel
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'adj-matrix-wrapper';
        matrixPanel.appendChild(matrixContainer);
        _renderMatrixInto(matrixContainer, nodes, edges, directed);

        // Build list into listPanel
        const listContainer = document.createElement('div');
        listContainer.className = 'adj-list-wrapper';
        listPanel.appendChild(listContainer);
        _renderListInto(listContainer, nodes, edges, directed);
    }

    /**
     * Internal helper: render adjacency matrix into a given element.
     *
     * @param {HTMLElement} target - Target element to render into.
     * @param {number[]} nodes - Node IDs.
     * @param {Array<[number, number, number?]>} edges - Edge tuples.
     * @param {boolean} directed - Directed graph flag.
     * @returns {void}
     */
    function _renderMatrixInto(target, nodes, edges, directed) {
        const n = nodes.length;
        const sortedNodes = [...nodes].sort((a, b) => a - b);
        const nodeIndex = new Map(sortedNodes.map((node, i) => [node, i]));
        const matrix = Array(n).fill(null).map(() => Array(n).fill(0));

        for (const [from, to, weight] of edges) {
            const w = weight || 1;
            const i = nodeIndex.get(from);
            const j = nodeIndex.get(to);
            if (i !== undefined && j !== undefined) {
                matrix[i][j] = w;
                if (!directed) matrix[j][i] = w;
            }
        }

        const table = document.createElement('table');
        table.className = 'adj-matrix';
        const headerRow = document.createElement('tr');
        headerRow.appendChild(document.createElement('th'));
        for (const node of sortedNodes) {
            const th = document.createElement('th');
            th.textContent = node;
            th.className = 'matrix-header';
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);

        for (let i = 0; i < n; i++) {
            const row = document.createElement('tr');
            const rh = document.createElement('th');
            rh.textContent = sortedNodes[i];
            rh.className = 'matrix-header';
            row.appendChild(rh);
            for (let j = 0; j < n; j++) {
                const cell = document.createElement('td');
                const val = matrix[i][j];
                cell.textContent = val === 0 ? '-' : val;
                cell.className = 'matrix-cell';
                cell.dataset.row = sortedNodes[i];
                cell.dataset.col = sortedNodes[j];
                if (val !== 0) cell.classList.add('has-edge');
                if (i === j) cell.classList.add('diagonal');
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        target.appendChild(table);
    }

    /**
     * Internal helper: render adjacency list into a given element.
     *
     * @param {HTMLElement} target - Target element to render into.
     * @param {number[]} nodes - Node IDs.
     * @param {Array<[number, number, number?]>} edges - Edge tuples.
     * @param {boolean} directed - Directed graph flag.
     * @returns {void}
     */
    function _renderListInto(target, nodes, edges, directed) {
        const adjList = {};
        for (const node of nodes) adjList[node] = [];
        for (const [from, to, weight] of edges) {
            const w = weight || 1;
            if (adjList[from]) adjList[from].push({ to, weight: w });
            if (!directed && adjList[to]) adjList[to].push({ to: from, weight: w });
        }

        const sortedNodes = [...nodes].sort((a, b) => a - b);
        for (const node of sortedNodes) {
            const row = document.createElement('div');
            row.className = 'adj-list-row';
            row.dataset.node = node;

            const nodeLabel = document.createElement('span');
            nodeLabel.className = 'adj-list-node';
            nodeLabel.textContent = node;
            row.appendChild(nodeLabel);

            const arrow = document.createElement('span');
            arrow.className = 'adj-list-arrow';
            arrow.textContent = '→';
            row.appendChild(arrow);

            const neighbors = adjList[node] || [];
            if (neighbors.length === 0) {
                const empty = document.createElement('span');
                empty.className = 'adj-list-empty';
                empty.textContent = '∅';
                row.appendChild(empty);
            } else {
                for (let i = 0; i < neighbors.length; i++) {
                    const nb = neighbors[i];
                    const span = document.createElement('span');
                    span.className = 'adj-list-neighbor';
                    span.textContent = nb.weight === 1 ? nb.to : `${nb.to}(${nb.weight})`;
                    span.dataset.from = node;
                    span.dataset.to = nb.to;
                    row.appendChild(span);
                    if (i < neighbors.length - 1) {
                        const sep = document.createElement('span');
                        sep.className = 'adj-list-separator';
                        sep.textContent = '→';
                        row.appendChild(sep);
                    }
                }
            }
            target.appendChild(row);
        }
    }

    /**
     * Get the current representation type.
     *
     * @returns {string} 'node-edge', 'matrix', 'list', or 'both'.
     */
    function getCurrentRepresentation() {
        if (container.querySelector('.graph-both-wrapper')) return 'both';
        if (container.querySelector('.adj-matrix-wrapper')) return 'matrix';
        if (container.querySelector('.adj-list-wrapper')) return 'list';
        return 'node-edge';
    }

    /**
     * Update the cached position of a single node.
     * Used by the interactivity module during drag operations.
     *
     * @param {number} nodeId - The node identifier.
     * @param {number} x - New X coordinate in SVG space.
     * @param {number} y - New Y coordinate in SVG space.
     * @returns {void}
     */
    function updateNodePosition(nodeId, x, y) {
        currentPositions.set(nodeId, { x, y });
    }

    /**
     * Redraw all edges based on current node positions.
     * Removes existing edge elements and weight labels from the SVG,
     * then re-draws them using the cached edge data and updated positions.
     *
     * @returns {void}
     */
    function redrawEdges() {
        if (!svg) return;

        const existingEdges = svg.querySelectorAll('.graph-edge');
        const existingWeights = svg.querySelectorAll('.graph-weight');
        existingEdges.forEach(el => el.remove());
        existingWeights.forEach(el => el.remove());

        edgeElements = {};

        for (const edge of cachedEdges) {
            const [from, to, weight] = edge;
            const fromPos = currentPositions.get(from);
            const toPos = currentPositions.get(to);
            if (fromPos && toPos) {
                drawEdge(from, to, fromPos, toPos, weight, cachedDirected);
            }
        }
    }

    return {
        init,
        render,
        renderMatrix,
        renderList,
        renderBoth,
        highlightNode,
        highlightEdge,
        clearAllStates,
        processStep,
        getNodePositions,
        getCurrentRepresentation,
        updateNodePosition,
        redrawEdges,
    };
})();

export default GraphRenderer;
