/**
 * Main controller module.
 *
 * Orchestrates the algorithm selection, array generation, playback controls,
 * speed adjustment, and language switching. Connects the Visualizer,
 * CodeHighlighter, and algorithm generators together.
 */

import SortingAlgorithms from './algorithms/sorting.js';
import SearchingAlgorithms from './algorithms/searching.js';
import Visualizer from './visualizer.js';
import CodeHighlighter from './code-highlighter.js';
import SoundEngine from './sound-engine.js';
import CompareMode from './compare-mode.js';
import Recorder from './recorder.js';
import TreeRenderer from './tree-renderer.js';
import GraphRenderer from './graph-renderer.js';
import TreeAlgorithms from './algorithms/trees.js';
import GraphAlgorithms from './algorithms/graphs.js';
import LinkedListAlgorithms from './algorithms/linked-lists.js';
import LinkedListRenderer from './linked-list-renderer.js';
import MazeAlgorithms from './algorithms/maze.js';
import MazeRenderer from './maze-renderer.js';
import Benchmark from './benchmark.js';
import FEATURES from './config.js';
import Feedback from './feedback.js';
import EventBus from './event-bus.js';

(() => {
    'use strict';

    // ─── DOM References ───

    /** @type {HTMLSelectElement} */
    const algorithmSelect = document.getElementById('algorithm-select');
    /** @type {HTMLInputElement} */
    const arraySizeSlider = document.getElementById('array-size');
    /** @type {HTMLInputElement} */
    const sizeDisplay = document.getElementById('size-display');
    /** @type {HTMLInputElement} */
    const speedSlider = document.getElementById('speed-slider');
    /** @type {HTMLInputElement} */
    const speedDisplay = document.getElementById('speed-display');
    /** @type {HTMLSelectElement} */
    const arrayTypeSelect = document.getElementById('array-type');
    /** @type {HTMLSelectElement} */
    const vizModeSelect = document.getElementById('viz-mode');
    /** @type {HTMLInputElement} */
    const searchTargetInput = document.getElementById('search-target');
    /** @type {HTMLDivElement} */
    const searchTargetGroup = document.querySelector('.search-target-group');
    /** @type {HTMLInputElement} */
    const llPositionInput = document.getElementById('ll-position');
    /** @type {HTMLDivElement} */
    const llPositionGroup = document.querySelector('.ll-position-group');
    /** @type {HTMLInputElement} */
    const llTargetInput = document.getElementById('ll-target');
    /** @type {HTMLDivElement} */
    const llTargetGroup = document.querySelector('.ll-target-group');
    /** @type {HTMLSelectElement} */
    const graphViewSelect = document.getElementById('graph-view');
    /** @type {HTMLDivElement} */
    const graphViewGroup = document.querySelector('.graph-view-group');
    /** @type {HTMLButtonElement} */
    const btnEditGraph = document.getElementById('btn-edit-graph');
    /** @type {HTMLButtonElement} */
    const btnExportGraph = document.getElementById('btn-export-graph');
    /** @type {HTMLDivElement} */
    const graphEditGroup = document.querySelector('.graph-edit-group');
    /** @type {HTMLInputElement} */
    const customArrayInput = document.getElementById('custom-array');
    /** @type {HTMLDivElement} */
    const customArrayGroup = document.querySelector('.custom-array-group');
    /** @type {HTMLButtonElement} */
    const btnApplyCustom = document.getElementById('btn-apply-custom');

    /** @type {HTMLDivElement} */
    const arrayStateBody = document.getElementById('array-state-body');
    /** @type {HTMLDivElement} */
    const arrayStatePanel = document.getElementById('array-state-panel');
    /** @type {HTMLDivElement} */
    const cotPanel = document.getElementById('cot-panel');
    /** @type {HTMLDivElement} */
    const cotBody = document.getElementById('cot-body');
    /** @type {HTMLDivElement} */
    const vizWrapper = document.getElementById('viz-wrapper');

    /** @type {HTMLButtonElement} */
    const btnGenerate = document.getElementById('btn-generate');
    /** @type {HTMLButtonElement} */
    const btnPlay = document.getElementById('btn-play');
    /** @type {HTMLButtonElement} */
    const btnPause = document.getElementById('btn-pause');
    /** @type {HTMLButtonElement} */
    const btnStep = document.getElementById('btn-step');
    /** @type {HTMLButtonElement} */
    const btnReset = document.getElementById('btn-reset');

    /** @type {HTMLDivElement} */
    const languageTabs = document.getElementById('language-tabs');
    /** @type {HTMLPreElement} */
    const codeDisplay = document.getElementById('code-display');
    /** @type {HTMLDivElement} */
    const barsContainer = document.getElementById('bars-container');

    /** @type {HTMLHeadingElement} */
    const algoNameEl = document.getElementById('algo-name');
    /** @type {HTMLElement} */
    const bestTimeEl = document.getElementById('best-time');
    /** @type {HTMLElement} */
    const avgTimeEl = document.getElementById('avg-time');
    /** @type {HTMLElement} */
    const worstTimeEl = document.getElementById('worst-time');
    /** @type {HTMLElement} */
    const spaceComplexityEl = document.getElementById('space-complexity');
    /** @type {HTMLElement} */
    const comparisonsEl = document.getElementById('comparisons-count');
    /** @type {HTMLElement} */
    const swapsEl = document.getElementById('swaps-count');
    /** @type {HTMLElement} */
    const elapsedTimeEl = document.getElementById('elapsed-time');
    /** @type {HTMLButtonElement} */
    const btnSound = document.getElementById('btn-sound');
    /** @type {HTMLInputElement} */
    const volumeSlider = document.getElementById('volume-slider');
    /** @type {HTMLParagraphElement} */
    const algoDescriptionText = document.getElementById('algo-description-text');
    /** @type {HTMLParagraphElement} */
    const algoUseCaseText = document.getElementById('algo-usecase-text');
    /** @type {HTMLParagraphElement} */
    const algoAvoidText = document.getElementById('algo-avoid-text');
    /** @type {HTMLParagraphElement} */
    const algoRealWorldText = document.getElementById('algo-realworld-text');

    // ─── State ───

    /** @type {number[]} Current working array being sorted/searched. */
    let currentArray = [];
    /** @type {Generator|null} Active algorithm generator instance. */
    let generator = null;
    /** @type {number|null} setTimeout ID for playback scheduling. */
    let timerId = null;
    /** @type {boolean} Whether the visualization is currently playing. */
    let isPlaying = false;
    /** @type {number} Running count of comparison operations. */
    let comparisons = 0;
    /** @type {number} Running count of swap/overwrite operations. */
    let swapCount = 0;
    /** @type {number|null} Timestamp (ms) when the current run started. */
    let startTime = null;
    /** @type {number|null} setInterval ID for elapsed time display. */
    let elapsedTimerId = null;
    /** @type {number} Cached max value of the current array, set once per generator init. */
    let cachedMaxVal = 1;
    /** @type {Set<number>} Indices currently marked as sorted (persistent across steps). */
    let sortedIndices = new Set();
    /** @type {HTMLDivElement[]} Persistent cell elements for the array state panel. */
    let stateCells = [];

    // ─── Algorithm Classification ───

    /** @type {string[]} */
    const SEARCH_ALGORITHMS = ['linearSearch', 'binarySearch', 'jumpSearch', 'ternarySearch', 'fibonacciSearch', 'interpolationSearch', 'exponentialSearch', 'sentinelLinearSearch'];

    /** @type {string[]} */
    const TREE_ALGORITHMS = ['bstInsert', 'bstSearch', 'bstDelete', 'avlInsert', 'bstInorder', 'bstPreorder', 'bstPostorder', 'bstLevelOrder', 'heapInsertMin', 'heapExtractMin'];
    /** @type {string[]} */
    const GRAPH_ALGORITHMS = ['bfs', 'dfs', 'dijkstra', 'astar', 'bellmanFord', 'kruskal', 'topologicalSort'];
    /** @type {string[]} */
    const LINKED_LIST_ALGORITHMS = ['llInsertHead', 'llInsertTail', 'llDeleteHead', 'llDeleteTail', 'llSearch', 'llTraverse', 'llReverse', 'llInsertPos', 'llDeletePos', 'llDeleteVal', 'llInsertAfterValue', 'llDetectCycle', 'llMergeSorted', 'llMergeSort'];

    const MAZE_ALGORITHMS = ['mazeRecursiveDFS', 'mazePrims', 'mazeBinaryTree', 'pathBFS', 'pathDFS', 'pathAStar', 'pathGreedy'];
    const MAZE_GENERATION = ['mazeRecursiveDFS', 'mazePrims', 'mazeBinaryTree'];

    // ─── Tree/Graph/Linked List State ───

    /** @type {HTMLDivElement} */
    const treeGraphContainer = document.getElementById('tree-graph-container');
    /** @type {HTMLDivElement} */
    const linkedListContainer = document.getElementById('linked-list-container');
    /** @type {HTMLDivElement} */
    const mazeContainer = document.getElementById('maze-container');
    /** @type {object|null} */
    let currentTree = null;
    /** @type {object|null} */
    let currentGraph = null;
    /** @type {object|null} */
    let currentLinkedList = null;
    /** @type {number[]} */
    let currentHeap = [];
    /** @type {number[][]|null} */
    let currentMaze = null;

    // ─── Layout State ───

    /** @type {boolean} */
    let isVertical = false;

    /** @type {number} Original array size before switching to list view */
    let originalArraySize = 0;

    // ─── Initialization ───

    Visualizer.init(barsContainer);
    CodeHighlighter.init(codeDisplay);
    TreeRenderer.init(treeGraphContainer);
    GraphRenderer.init(treeGraphContainer);
    LinkedListRenderer.init(linkedListContainer);
    MazeRenderer.init(mazeContainer);

    generateArray();
    loadAlgorithm();

    // ─── Mobile Device Detection ───

    /**
     * Detect if the current device is a mobile/touch device.
     *
     * @returns {boolean} True if the device is mobile.
     */
    function isMobileDevice() {
        return (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }

    /**
     * Apply mobile-specific adaptations when on a mobile device in portrait mode.
     * Adds 'mobile-portrait' class to body for additional styling hooks.
     *
     * @returns {void}
     */
    function handleMobileAdaptation() {
        const isMobile = isMobileDevice();
        const isPortrait = window.innerHeight > window.innerWidth;
        const isSmallScreen = window.innerWidth <= 768;

        if (isMobile && isPortrait && isSmallScreen) {
            document.body.classList.add('mobile-portrait');
        } else {
            document.body.classList.remove('mobile-portrait');
        }
    }

    handleMobileAdaptation();
    window.addEventListener('resize', handleMobileAdaptation);
    window.addEventListener('orientationchange', () => {
        setTimeout(handleMobileAdaptation, 100);
    });

    // ─── Array Generation ───

    /**
     * Generate a new array based on the current size and type settings.
     * Resets all state (counters, generator, button states) and re-renders bars.
     *
     * @returns {void}
     */
    function generateArray() {
        stopPlayback();
        clearArrayState();
        const size = parseInt(arraySizeSlider.value, 10);
        const type = arrayTypeSelect.value;
        currentArray = createArray(size, type);

        comparisons = 0;
        swapCount = 0;
        updateStats();
        Visualizer.render(currentArray);
        initArrayState(currentArray);
        initCotPanel(algorithmSelect.value);
        generator = null;
        updateButtonStates();
    }

    /**
     * Generate a new maze grid and render it.
     * For pathfinding algorithms, generates a fresh maze first.
     *
     * @returns {void}
     */
    function generateMaze() {
        stopPlayback();
        clearArrayState();
        const algoKey = algorithmSelect.value;

        if (isMazeGeneration(algoKey)) {
            currentMaze = MazeAlgorithms.buildMazeGrid();
        } else {
            currentMaze = MazeAlgorithms.buildMazeGrid();
            const gen = MazeAlgorithms.mazeRecursiveDFS(currentMaze);
            while (!gen.done) gen.next();
            currentMaze = gen.value;
        }

        comparisons = 0;
        swapCount = 0;
        updateStats();
        MazeRenderer.render(currentMaze);
        initCotPanel(algoKey);
        generator = null;
        updateButtonStates();
    }

    /**
     * Create an array of given size and distribution type.
     * Uses unique random values (1..100) for both visual clarity and list view readability.
     *
     * @param {number} size - Number of elements.
     * @param {string} type - Distribution type: random, nearlySorted, reversed, fewUnique.
     * @returns {number[]} The generated array.
     */
    function createArray(size, type) {
        /** @type {number[]} */
        let arr = [];

        const generateUniqueRandomValues = (count) => {
            const uniqueValues = new Set();
            while (uniqueValues.size < count) {
                uniqueValues.add(Math.floor(Math.random() * 100) + 1);
            }
            return Array.from(uniqueValues);
        };

        switch (type) {
            case 'nearlySorted':
                const sorted = generateUniqueRandomValues(size);
                sorted.sort((a, b) => a - b);
                arr = sorted;
                // Swap ~10% of elements to introduce slight disorder
                for (let i = 0; i < Math.floor(size * 0.1); i++) {
                    const a = Math.floor(Math.random() * size);
                    const b = Math.floor(Math.random() * size);
                    [arr[a], arr[b]] = [arr[b], arr[a]];
                }
                break;
            case 'reversed':
                const reversedSorted = generateUniqueRandomValues(size);
                reversedSorted.sort((a, b) => a - b);
                arr = reversedSorted.reverse();
                break;
            case 'fewUnique':
                for (let i = 0; i < size; i++) {
                    arr.push(Math.floor(Math.random() * 5) + 1);
                }
                break;
            default: // random - unique random values 1-100
                arr = generateUniqueRandomValues(size);
                arr = fisherYatesShuffle(arr);
                break;
        }

        return arr;
    }

    /**
     * Generate random unique values for a BST.
     * Picks 9-13 unique values between 5 and 95, shuffled so the tree
     * shape varies each time.
     *
     * @returns {number[]} Random values for BST insertion.
     */
    function generateRandomTreeValues() {
        const count = 9 + Math.floor(Math.random() * 5);
        const pool = [];
        for (let i = 5; i <= 95; i += 5) pool.push(i);
        const shuffled = fisherYatesShuffle([...pool]);
        return shuffled.slice(0, count);
    }

    /**
     * Generate random unique values for a heap.
     * Picks 7-11 unique values between 5 and 95.
     *
     * @returns {number[]} Random values for heap building.
     */
    function generateRandomHeapValues() {
        const count = 7 + Math.floor(Math.random() * 5);
        const pool = [];
        for (let i = 5; i <= 95; i += 5) pool.push(i);
        const shuffled = fisherYatesShuffle([...pool]);
        return shuffled.slice(0, count);
    }

    /**
     * Generate random unique values for a linked list.
     * Picks 6-10 unique values between 5 and 95, shuffled so the list
     * order varies each time.
     *
     * @returns {number[]} Random values for linked list.
     */
    function generateRandomLinkedListValues() {
        const count = 6 + Math.floor(Math.random() * 5);
        const pool = [];
        for (let i = 5; i <= 95; i += 5) pool.push(i);
        const shuffled = fisherYatesShuffle([...pool]);
        return shuffled.slice(0, count);
    }

    /**
     * Perform an in-place Fisher-Yates shuffle on an array.
     * Guarantees a uniformly random permutation of the input.
     *
     * @param {number[]} arr - The array to shuffle.
     * @returns {number[]} The same array, shuffled in place.
     */
    function fisherYatesShuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ─── Algorithm Loading ───

    /**
     * Load the selected algorithm's code and complexity info into the UI.
     * Updates the code panel, complexity display, and search target visibility.
     *
     * @returns {void}
     */
    function loadAlgorithm() {
        const algoKey = algorithmSelect.value;
        const lang = CodeHighlighter.getLanguage();
        const isSearch = isSearchAlgorithm(algoKey);
        const isTree = isTreeAlgorithm(algoKey);
        const isGraph = isGraphAlgorithm(algoKey);
        const isHeap = algoKey === 'heapInsertMin' || algoKey === 'heapExtractMin';

        // Show/hide search target input
        const needsTarget = isSearch || algoKey === 'bstSearch';
        searchTargetGroup.classList.toggle('controls-hidden', !needsTarget);

        // Show/hide linked list position input
        const needsPosition = algoKey === 'llInsertPos' || algoKey === 'llDeletePos';
        llPositionGroup.classList.toggle('controls-hidden', !needsPosition);

        // Show/hide graph view selector and edit button
        const isGraphAlgo = isGraphAlgorithm(algoKey);
        graphViewGroup.classList.toggle('controls-hidden', !isGraphAlgo);
        graphEditGroup.classList.toggle('controls-hidden', !isGraphAlgo);

        // Show custom array input only for sort/search (array-based algorithms)
        const isArrayAlgo = !isGraphAlgo && !isTreeAlgorithm(algoKey) && !isLinkedListAlgorithm(algoKey) && !isMazeAlgorithm(algoKey);
        customArrayGroup.classList.toggle('controls-hidden', !isArrayAlgo);

        // Determine code and complexity source
        let codeSource, complexitySource;
        if (algoKey === 'bstLevelOrder') {
            codeSource = TreeAlgorithms.LEVEL_ORDER_CODE;
            complexitySource = TreeAlgorithms.LEVEL_ORDER_COMPLEXITY;
        } else if (isHeap) {
            codeSource = TreeAlgorithms.HEAP_CODE;
            complexitySource = TreeAlgorithms.HEAP_COMPLEXITY;
        } else if (isTree) {
            codeSource = TreeAlgorithms.CODE;
            complexitySource = TreeAlgorithms.COMPLEXITY;
        } else if (isGraph) {
            codeSource = GraphAlgorithms.CODE;
            complexitySource = GraphAlgorithms.COMPLEXITY;
        } else if (isSearch) {
            codeSource = SearchingAlgorithms.CODE;
            complexitySource = SearchingAlgorithms.COMPLEXITY;
        } else if (isLinkedListAlgorithm(algoKey)) {
            codeSource = LinkedListAlgorithms.CODE;
            complexitySource = LinkedListAlgorithms.COMPLEXITY;
        } else if (isMazeAlgorithm(algoKey)) {
            codeSource = MazeAlgorithms.CODE;
            complexitySource = MazeAlgorithms.COMPLEXITY;
        } else {
            codeSource = SortingAlgorithms.CODE;
            complexitySource = SortingAlgorithms.COMPLEXITY;
        }

        // Load code (fall back to pseudo if language not available)
        const codeLines = codeSource[algoKey]?.[lang] || codeSource[algoKey]?.['pseudo'] || [];
        CodeHighlighter.loadCode(codeLines);

        // In portrait mode, size the code panel to fit all lines
        if (isVertical) {
            requestAnimationFrame(updatePortraitCodeSize);
        }

        // Load complexity
        const info = complexitySource[algoKey];
        if (info) {
            algoNameEl.textContent = info.name;
            bestTimeEl.textContent = info.best;
            avgTimeEl.textContent = info.average;
            worstTimeEl.textContent = info.worst;
            spaceComplexityEl.textContent = info.space;
            algoDescriptionText.textContent = info.description || '';
            algoUseCaseText.textContent = info.useCase || '';
            algoAvoidText.textContent = info.avoid || '';
            algoRealWorldText.textContent = info.realWorld || '';
            if (isVertical) updateVizOverlay();
        }

        // Switch viz mode (builds tree/graph if needed)
        switchVizMode(algoKey);

        // Auto-set search target after tree is built
        if (needsTarget) {
            if (algoKey === 'bstSearch' && currentTree) {
                const treeValues = TreeAlgorithms.getValues(currentTree);
                const randomIdx = Math.floor(Math.random() * treeValues.length);
                searchTargetInput.value = treeValues[randomIdx];
            } else if (currentArray.length > 0) {
                const randomIdx = Math.floor(Math.random() * currentArray.length);
                searchTargetInput.value = currentArray[randomIdx];
            }
        }
    }

    /**
     * Check if an algorithm key is a search algorithm.
     *
     * @param {string} key - The algorithm key.
     * @returns {boolean} True if it is a search algorithm.
     */
    function isSearchAlgorithm(key) {
        return SEARCH_ALGORITHMS.includes(key);
    }

    /**
     * Check if an algorithm key is a tree algorithm.
     *
     * @param {string} key - The algorithm key.
     * @returns {boolean} True if it is a tree algorithm.
     */
    function isTreeAlgorithm(key) {
        return TREE_ALGORITHMS.includes(key);
    }

    /**
     * Check if an algorithm key is a graph algorithm.
     *
     * @param {string} key - The algorithm key.
     * @returns {boolean} True if it is a graph algorithm.
     */
    function isGraphAlgorithm(key) {
        return GRAPH_ALGORITHMS.includes(key);
    }

    /**
     * Check if an algorithm key is a linked list algorithm.
     *
     * @param {string} key - The algorithm key.
     * @returns {boolean} True if it is a linked list algorithm.
     */
    function isLinkedListAlgorithm(key) {
        return LINKED_LIST_ALGORITHMS.includes(key);
    }

    /**
     * Check if an algorithm key is a maze algorithm.
     *
     * @param {string} key - The algorithm key.
     * @returns {boolean} True if it is a maze algorithm.
     */
    function isMazeAlgorithm(key) {
        return MAZE_ALGORITHMS.includes(key);
    }

    /**
     * Check if an algorithm key is a maze generation algorithm (not pathfinding).
     *
     * @param {string} key - The algorithm key.
     * @returns {boolean} True if it is a maze generation algorithm.
     */
    function isMazeGeneration(key) {
        return MAZE_GENERATION.includes(key);
    }

    // ─── Graph View & Interactive Builder ───

    /** @type {boolean} Whether the graph is in edit mode. */
    let graphEditMode = false;
    /** @type {number|null} First selected node when drawing a new edge. */
    let edgeSourceNode = null;

    /**
     * Render the current graph using the selected graph view mode.
     *
     * @param {{nodes: number[], edges: Array, adj: object}} graph - The current graph.
     * @returns {void}
     */
    function applyGraphView(graph) {
        const view = graphViewSelect.value;
        if (view === 'matrix') {
            GraphRenderer.renderMatrix(graph.nodes, graph.edges);
        } else if (view === 'list') {
            GraphRenderer.renderList(graph.nodes, graph.edges);
        } else if (view === 'both') {
            GraphRenderer.renderBoth(graph.nodes, graph.edges);
        } else {
            GraphRenderer.render(graph.nodes, graph.edges);
        }
        if (graphEditMode && view === 'graph') {
            attachGraphEditHandlers();
        }
    }

    /**
     * Rebuild the graph adjacency list from nodes and edges.
     *
     * @param {number[]} nodes - Node IDs.
     * @param {Array<[number, number, number?]>} edges - Edge tuples.
     * @returns {object} Adjacency list object.
     */
    function buildAdjList(nodes, edges) {
        const adj = {};
        for (const n of nodes) adj[n] = [];
        for (const [from, to, weight] of edges) {
            const w = weight || 1;
            if (adj[from]) adj[from].push({ to, weight: w });
            if (adj[to]) adj[to].push({ to: from, weight: w });
        }
        return adj;
    }

    /**
     * Attach interactive event handlers to the graph SVG for edit mode.
     *
     * @returns {void}
     */
    function attachGraphEditHandlers() {
        const svgEl = treeGraphContainer.querySelector('.graph-svg');
        if (!svgEl) return;

        svgEl.classList.add('edit-mode');
        edgeSourceNode = null;

        // Click on background → add node
        svgEl.addEventListener('click', function onSvgClick(e) {
            if (e.target === svgEl || e.target.tagName === 'svg') {
                const rect = svgEl.getBoundingClientRect();
                const vb = svgEl.viewBox.baseVal;
                const scaleX = vb.width / rect.width;
                const scaleY = vb.height / rect.height;
                const x = (e.clientX - rect.left) * scaleX + vb.x;
                const y = (e.clientY - rect.top) * scaleY + vb.y;
                const newId = currentGraph.nodes.length > 0
                    ? Math.max(...currentGraph.nodes) + 1
                    : 1;
                currentGraph.nodes.push(newId);
                currentGraph.adj = buildAdjList(currentGraph.nodes, currentGraph.edges);
                applyGraphView(currentGraph);
            }
        });

        // Click on node → select for edge creation or complete edge
        for (const nodeEl of svgEl.querySelectorAll('.graph-node')) {
            const nodeId = parseInt(nodeEl.dataset.id, 10);

            nodeEl.addEventListener('click', function(e) {
                e.stopPropagation();
                if (edgeSourceNode === null) {
                    edgeSourceNode = nodeId;
                    nodeEl.classList.add('selected');
                } else if (edgeSourceNode === nodeId) {
                    nodeEl.classList.remove('selected');
                    edgeSourceNode = null;
                } else {
                    // Avoid duplicate edges
                    const exists = currentGraph.edges.some(
                        ([f, t]) => (f === edgeSourceNode && t === nodeId) ||
                                   (f === nodeId && t === edgeSourceNode)
                    );
                    if (!exists) {
                        const weightStr = prompt(`Edge weight from ${edgeSourceNode} → ${nodeId}:`, '1');
                        const weight = parseInt(weightStr, 10);
                        if (!isNaN(weight) && weight > 0) {
                            currentGraph.edges.push([edgeSourceNode, nodeId, weight]);
                        } else if (weightStr !== null) {
                            currentGraph.edges.push([edgeSourceNode, nodeId]);
                        }
                        currentGraph.adj = buildAdjList(currentGraph.nodes, currentGraph.edges);
                    }
                    edgeSourceNode = null;
                    applyGraphView(currentGraph);
                }
            });

            // Right-click node → delete node and its edges
            nodeEl.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                e.stopPropagation();
                currentGraph.nodes = currentGraph.nodes.filter(n => n !== nodeId);
                currentGraph.edges = currentGraph.edges.filter(
                    ([f, t]) => f !== nodeId && t !== nodeId
                );
                currentGraph.adj = buildAdjList(currentGraph.nodes, currentGraph.edges);
                edgeSourceNode = null;
                applyGraphView(currentGraph);
            });
        }

        // Right-click edge → delete edge
        for (const edgeEl of svgEl.querySelectorAll('.graph-edge')) {
            edgeEl.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                const from = parseInt(edgeEl.dataset.from, 10);
                const to = parseInt(edgeEl.dataset.to, 10);
                currentGraph.edges = currentGraph.edges.filter(
                    ([f, t]) => !((f === from && t === to) || (f === to && t === from))
                );
                currentGraph.adj = buildAdjList(currentGraph.nodes, currentGraph.edges);
                applyGraphView(currentGraph);
            });
        }
    }

    // Graph view selector change
    graphViewSelect.addEventListener('change', () => {
        if (currentGraph) applyGraphView(currentGraph);
    });

    // Edit Graph toggle
    btnEditGraph.addEventListener('click', () => {
        graphEditMode = !graphEditMode;
        btnEditGraph.classList.toggle('active', graphEditMode);
        btnEditGraph.textContent = graphEditMode ? 'Stop Editing' : 'Edit Graph';
        if (currentGraph && graphViewSelect.value === 'graph') {
            applyGraphView(currentGraph);
        }
    });

    /**
     * Export the current graph structure as a downloadable JSON file.
     * Includes nodes, edges, and adjacency list representation.
     *
     * @returns {void}
     */
    btnExportGraph.addEventListener('click', () => {
        if (!currentGraph) return;
        const data = {
            nodes: currentGraph.nodes,
            edges: currentGraph.edges.map(e => {
                const entry = { from: e[0], to: e[1] };
                if (e[2] != null) entry.weight = e[2];
                return entry;
            }),
            adjacencyList: currentGraph.adj,
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dsa-graph-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    /**
     * Switch the visualization between bars and tree/graph modes.
     *
     * @param {string} algoKey - The selected algorithm key.
     * @returns {void}
     */
    function switchVizMode(algoKey) {
        const isLL = isLinkedListAlgorithm(algoKey);
        const isHeap = algoKey === 'heapInsertMin' || algoKey === 'heapExtractMin';
        const isTG = isTreeAlgorithm(algoKey) || isGraphAlgorithm(algoKey) || isHeap;
        const isMaze = isMazeAlgorithm(algoKey);
        barsContainer.classList.toggle('compare-hidden', isLL || isTG || isMaze);
        treeGraphContainer.classList.toggle('compare-hidden', !isTG);
        linkedListContainer.classList.toggle('compare-hidden', !isLL);
        mazeContainer.classList.toggle('compare-hidden', !isMaze);

        if (isHeap) {
            TreeAlgorithms.resetIds();
            const heapData = TreeAlgorithms.buildSampleHeap(generateRandomHeapValues(), 'min');
            currentHeap = heapData.heap;
            currentTree = heapData.tree;
            TreeRenderer.render(currentTree);
        } else if (isTreeAlgorithm(algoKey)) {
            TreeAlgorithms.resetIds();
            currentTree = TreeAlgorithms.buildSampleBST(generateRandomTreeValues());
            TreeRenderer.render(currentTree);
        } else if (isGraphAlgorithm(algoKey)) {
            currentGraph = GraphAlgorithms.buildSampleGraph();
            applyGraphView(currentGraph);
        } else if (isLinkedListAlgorithm(algoKey)) {
            LinkedListAlgorithms.resetIds();
            currentLinkedList = LinkedListAlgorithms.buildSampleLinkedList(generateRandomLinkedListValues());
            LinkedListRenderer.render(currentLinkedList);
        } else if (isMaze) {
            currentMaze = MazeAlgorithms.buildMazeGrid();
            MazeRenderer.render(currentMaze);
        }
    }

    // ─── Playback ───

    /**
     * Start or resume playback of the algorithm visualization.
     * Initializes the audio context and generator if not already running.
     *
     * @returns {void}
     */
    function play() {
        SoundEngine.ensureContext();
        if (!generator) {
            initGenerator();
            EventBus.emit('algorithm:start', {
                algoKey: algorithmSelect.value,
                arraySize: currentArray.length,
            });
        }

        if (!startTime) {
            startTime = performance.now();
            startElapsedTimer();
        }

        isPlaying = true;
        updateButtonStates();
        scheduleNextStep();
    }

    /**
     * Initialize the algorithm generator based on the currently selected algorithm.
     * For binary search, sorts the array first. For search algorithms, reads the target value.
     *
     * @returns {void}
     */
    function initGenerator() {
        const algoKey = algorithmSelect.value;
        comparisons = 0;
        swapCount = 0;
        cachedMaxVal = currentArray.length > 0 ? Math.max(...currentArray) : 1;
        updateStats();

        if (isTreeAlgorithm(algoKey)) {
            TreeRenderer.clearAllStates();
            if (algoKey === 'bstInsert') {
                const val = Math.floor(Math.random() * 90) + 5;
                generator = TreeAlgorithms.bstInsert(currentTree, val);
            } else if (algoKey === 'bstSearch') {
                const target = parseInt(searchTargetInput.value, 10) || 40;
                generator = TreeAlgorithms.bstSearch(currentTree, target);
            } else if (algoKey === 'bstDelete') {
                const treeValues = TreeAlgorithms.getValues(currentTree);
                const randomIdx = Math.floor(Math.random() * treeValues.length);
                generator = TreeAlgorithms.bstDelete(currentTree, treeValues[randomIdx]);
            } else if (algoKey === 'avlInsert') {
                const val = Math.floor(Math.random() * 90) + 5;
                generator = TreeAlgorithms.avlInsert(currentTree, val);
            } else if (algoKey === 'bstLevelOrder') {
                generator = TreeAlgorithms.bstLevelOrder(currentTree);
            } else if (algoKey === 'heapInsertMin') {
                const val = Math.floor(Math.random() * 90) + 5;
                generator = TreeAlgorithms.heapInsert(currentHeap, val, 'min');
            } else if (algoKey === 'heapExtractMin') {
                generator = TreeAlgorithms.heapExtract(currentHeap, 'min');
            } else {
                generator = TreeAlgorithms[algoKey](currentTree);
            }
        } else         if (isGraphAlgorithm(algoKey)) {
            GraphRenderer.clearAllStates();
            if (algoKey === 'astar') {
                const goalNode = currentGraph.nodes[currentGraph.nodes.length - 1];
                const positions = GraphRenderer.getNodePositions();
                generator = GraphAlgorithms.astar(currentGraph.adj, currentGraph.nodes[0], goalNode, currentGraph.nodes, positions);
            } else if (algoKey === 'bellmanFord') {
                const edges = currentGraph.edges.map(e => [e[0], e[1], e[2] || 1]);
                generator = GraphAlgorithms.bellmanFord(edges, currentGraph.nodes[0], currentGraph.nodes);
            } else if (algoKey === 'kruskal') {
                const edges = currentGraph.edges.map(e => [e[0], e[1], e[2] || 1]);
                generator = GraphAlgorithms.kruskal(edges, currentGraph.nodes);
            } else if (algoKey === 'topologicalSort') {
                generator = GraphAlgorithms.topologicalSort(currentGraph.adj, currentGraph.nodes);
            } else {
                generator = GraphAlgorithms[algoKey](currentGraph.adj, currentGraph.nodes[0], currentGraph.nodes);
            }
        } else if (isLinkedListAlgorithm(algoKey)) {
            LinkedListRenderer.clearAllStates();
            if (algoKey === 'llInsertHead') {
                const val = Math.floor(Math.random() * 90) + 5;
                generator = LinkedListAlgorithms.llInsertHead(currentLinkedList, val);
            } else if (algoKey === 'llInsertTail') {
                const val = Math.floor(Math.random() * 90) + 5;
                generator = LinkedListAlgorithms.llInsertTail(currentLinkedList, val);
            } else if (algoKey === 'llDeleteHead') {
                generator = LinkedListAlgorithms.llDeleteHead(currentLinkedList);
            } else if (algoKey === 'llDeleteTail') {
                generator = LinkedListAlgorithms.llDeleteTail(currentLinkedList);
            } else if (algoKey === 'llSearch') {
                const target = Math.floor(Math.random() * 90) + 5;
                generator = LinkedListAlgorithms.llSearch(currentLinkedList, target);
            } else if (algoKey === 'llTraverse') {
                generator = LinkedListAlgorithms.llTraverse(currentLinkedList);
            } else if (algoKey === 'llReverse') {
                generator = LinkedListAlgorithms.llReverse(currentLinkedList);
            } else if (algoKey === 'llInsertPos') {
                const pos = Math.max(0, parseInt(llPositionInput.value, 10) || 0);
                const val = Math.floor(Math.random() * 90) + 5;
                generator = LinkedListAlgorithms.llInsertPos(currentLinkedList, pos, val);
            } else if (algoKey === 'llInsertAfterValue') {
                const target = Math.floor(Math.random() * 90) + 5;
                const val = Math.floor(Math.random() * 90) + 5;
                generator = LinkedListAlgorithms.llInsertAfterValue(currentLinkedList, target, val);
            } else if (algoKey === 'llDetectCycle') {
                generator = LinkedListAlgorithms.llDetectCycle(currentLinkedList);
            } else if (algoKey === 'llMergeSorted') {
                const list1 = currentLinkedList;
                const list2 = LinkedListAlgorithms.buildSampleLinkedList(
                    Array.from({ length: 5 }, () => Math.floor(Math.random() * 45) + 5).sort((a, b) => a - b)
                );
                generator = LinkedListAlgorithms.llMergeSorted(list1, list2);
            } else if (algoKey === 'llMergeSort') {
                generator = LinkedListAlgorithms.llMergeSort(currentLinkedList);
            } else if (algoKey === 'llDeletePos') {
                const pos = Math.max(0, parseInt(llPositionInput.value, 10) || 0);
                generator = LinkedListAlgorithms.llDeletePos(currentLinkedList, pos);
            } else if (algoKey === 'llDeleteVal') {
                const values = LinkedListAlgorithms.getValues(currentLinkedList);
                const pickExisting = Math.random() < 0.8 && values.length > 0;
                const target = pickExisting
                    ? values[Math.floor(Math.random() * values.length)]
                    : Math.floor(Math.random() * 90) + 5;
                generator = LinkedListAlgorithms.llDeleteVal(currentLinkedList, target);
            } else {
                generator = LinkedListAlgorithms[algoKey](currentLinkedList);
            }
        } else if (isMazeAlgorithm(algoKey)) {
            MazeRenderer.clearAllStates();
            if (isMazeGeneration(algoKey)) {
                currentMaze = MazeAlgorithms.buildMazeGrid();
                MazeRenderer.render(currentMaze);
                generator = MazeAlgorithms[algoKey](currentMaze);
            } else {
                if (!currentMaze) {
                    currentMaze = MazeAlgorithms.buildMazeGrid();
                    const gen = MazeAlgorithms.mazeRecursiveDFS(currentMaze);
                    while (!gen.done) gen.next();
                    currentMaze = gen.value;
                }
                MazeRenderer.clearAllStates();
                MazeRenderer.render(currentMaze);
                generator = MazeAlgorithms[algoKey](currentMaze);
            }
        } else if (isSearchAlgorithm(algoKey)) {
            if (algoKey !== 'linearSearch' && algoKey !== 'sentinelLinearSearch') {
                currentArray.sort((a, b) => a - b);
                Visualizer.render(currentArray);
            }
            const target = parseInt(searchTargetInput.value, 10);
            generator = SearchingAlgorithms[algoKey](currentArray, target);
        } else {
            generator = SortingAlgorithms[algoKey](currentArray);
        }
    }

    /**
     * Schedule the next step based on the current speed setting.
     * Uses setTimeout with an exponential delay curve for smooth control.
     *
     * @returns {void}
     */
    function scheduleNextStep() {
        if (!isPlaying) return;
        const delay = getDelay();
        timerId = setTimeout(() => {
            const done = executeStep();
            if (!done && isPlaying) {
                scheduleNextStep();
            }
        }, delay);
    }

    /**
     * Execute a single step from the generator.
     *
     * @returns {boolean} True if the algorithm is finished.
     */
    function executeStep() {
        if (!generator) return true;

        const result = generator.next();
        if (result.done) {
            const updatedValue = result.value;
            if (updatedValue !== undefined) {
                const algoKey = algorithmSelect.value;
                if (algoKey === 'heapInsertMin' || algoKey === 'heapExtractMin') {
                    currentHeap = updatedValue.heap;
                    currentTree = TreeAlgorithms.heapToTree(currentHeap);
                    TreeRenderer.render(currentTree);
                } else if (isTreeAlgorithm(algoKey)) {
                    currentTree = updatedValue;
                    TreeRenderer.render(currentTree);
                } else if (isLinkedListAlgorithm(algoKey)) {
                    // Only update list if the return value is a node object.
                    // Some algorithms (e.g. llDetectCycle) return a boolean result
                    // and do not modify the list structure.
                    if (updatedValue !== null && typeof updatedValue === 'object') {
                        currentLinkedList = updatedValue;
                    }
                    LinkedListRenderer.render(currentLinkedList);
                } else if (isMazeAlgorithm(algoKey)) {
                    if (Array.isArray(updatedValue)) {
                        currentMaze = updatedValue;
                        MazeRenderer.render(currentMaze);
                    }
                }
            }
            onComplete();
            return true;
        }

        const step = result.value;
        const algoKey = algorithmSelect.value;
        processStepStats(step);
        renderArrayState(step);

        if (algoKey === 'heapInsertMin' || algoKey === 'heapExtractMin') {
            if (step.indices && step.indices[0] >= 0 && step.indices[0] < currentHeap.length) {
                Visualizer.processStep(step, currentHeap);
            }
            currentTree = TreeAlgorithms.heapToTree(currentHeap);
            TreeRenderer.render(currentTree);
        } else if (isTreeAlgorithm(algoKey)) {
            TreeRenderer.processStep(step);
        } else if (isGraphAlgorithm(algoKey)) {
            GraphRenderer.processStep(step);
        } else if (isLinkedListAlgorithm(algoKey)) {
            LinkedListRenderer.processStep(step);
        } else if (isMazeAlgorithm(algoKey)) {
            MazeRenderer.processStep(step);
        } else {
            Visualizer.processStep(step, currentArray);
        }

        CodeHighlighter.highlightLine(step.codeLine);

        // Append chain-of-thought entry for tree / graph algorithms
        const thought = generateThought(step, algoKey);
        if (thought) appendThought(step, thought);

        EventBus.emit('algorithm:step', {
            stepType: step.type,
            indices: step.indices || [],
            nodeId: step.nodeId || null,
            codeLine: step.codeLine,
        });
        return false;
    }

    /**
     * Update comparison and swap counters based on step type.
     * Also triggers the appropriate sound effect for the operation.
     *
     * @param {{type: string, indices?: number[], nodeId?: number, codeLine: number}} step - The algorithm step object.
     * @returns {void}
     */
    function processStepStats(step) {
        if (step.type === 'compare' || step.type === 'check') {
            comparisons++;
            if (step.indices && step.indices.length > 0) {
                SoundEngine.playCompare(currentArray[step.indices[0]], cachedMaxVal);
            }
        }
        if (step.type === 'swap' || step.type === 'overwrite') {
            swapCount++;
            if (step.indices && step.indices.length > 0) {
                SoundEngine.playSwap(currentArray[step.indices[0]], cachedMaxVal);
            }
        }
        if (step.type === 'notFound') {
            SoundEngine.playNotFound();
        }
        updateStats();
    }

    // ─── Chain of Thought ───

    /**
     * Per-algorithm, per-step-type thought generators.
     * Each leaf is a function that receives the step object and returns a human-readable string
     * describing WHY the algorithm is making this decision.
     * Returns null to suppress an entry for purely mechanical steps.
     *
     * @type {Object<string, Object<string, function({type:string, nodeId?:*, from?:*, to?:*, balance?:number, rotationType?:string}):string|null>>}
     */
    const THOUGHTS = {
        // ── BST Insert ───────────────────────────────────────────────────────────
        bstInsert: {
            visit:    () => `Arrived at a node — checking which subtree to recurse into`,
            compare:  (s) => s.codeLine <= 4
                ? `Inserted value is less than current node — descend into left subtree`
                : `Inserted value is greater than current node — descend into right subtree`,
            insert:   () => `Found an empty position — placing the new node here`,
        },
        // ── BST Search ───────────────────────────────────────────────────────────
        bstSearch: {
            visit:    () => `Examining current node`,
            compare:  (s) => s.codeLine <= 4
                ? `Target is less than current node — search left subtree`
                : `Target is greater than current node — search right subtree`,
            found:    () => `Target value matches this node — search complete`,
            notFound: () => `Reached a null child — value is not in the tree`,
        },
        // ── BST Delete ───────────────────────────────────────────────────────────
        bstDelete: {
            visit:    () => `Traversing tree to find the node to delete`,
            compare:  (s) => s.codeLine <= 5
                ? `Target is less than current node — go left`
                : `Target is greater than current node — go right`,
            found:    () => `Node to delete found — determining case: leaf, one child, or two children`,
            delete:   () => `Removing node — relinking parent pointer`,
            replace:  () => `Two-child case: replacing value with in-order successor (smallest in right subtree)`,
            notFound: () => `Reached null — value not present in tree, nothing to delete`,
        },
        // ── BST Traversals ───────────────────────────────────────────────────────
        bstInorder: {
            visit: () => `In-order: left subtree → visit this node → right subtree`,
        },
        bstPreorder: {
            visit: () => `Pre-order: visit this node → left subtree → right subtree`,
        },
        bstPostorder: {
            visit: () => `Post-order: left subtree → right subtree → visit this node`,
        },
        bstLevelOrder: {
            visit:   () => `Level-order (BFS): visiting nodes breadth-first, level by level`,
            enqueue: () => `Enqueuing children of current node for the next level`,
        },
        // ── AVL Insert ───────────────────────────────────────────────────────────
        avlInsert: {
            insert:       () => `New node inserted — now tracing back up to check balance`,
            visit:        () => `Descending to find insertion point`,
            compare:      (s) => s.codeLine <= 4
                ? `Value less than current node — go left`
                : `Value greater than current node — go right`,
            updateHeight: () => null,   // mechanical — no meaningful narrative
            checkBalance: (s) => {
                const bf = s.balance;
                if (bf == null) return `Checking balance factor at this node`;
                if (Math.abs(bf) <= 1) return `Balance factor ${bf >= 0 ? '+' : ''}${bf} — subtree is balanced (|BF| ≤ 1), continue up`;
                return `Balance factor ${bf >= 0 ? '+' : ''}${bf} — imbalanced! Rotation required to restore AVL property`;
            },
            rotate: (s) => s.rotationType
                ? `Performing ${s.rotationType} rotation to restore height balance`
                : `Rotating subtree to restore AVL balance`,
        },
        // ── Heap Insert Min ──────────────────────────────────────────────────────
        heapInsertMin: {
            insert:  () => `New value appended at end of heap array — will bubble up`,
            compare: () => `Comparing child with its parent — is min-heap order satisfied?`,
            swap:    () => `Child is smaller than parent — swapping to bubble up`,
            check:   () => `Child is not smaller than parent — heap property satisfied, stop`,
            visit:   () => `Node settled into its correct position`,
        },
        // ── Heap Extract Min ─────────────────────────────────────────────────────
        heapExtractMin: {
            found:    () => `Root (minimum element) saved — will be returned after sift-down`,
            overwrite:() => `Last element moved to root — now sifting down to restore heap order`,
            visit:    () => `Sifting down: swapping node with its smallest child`,
            compare:  () => `Comparing node with its children to find the smallest`,
            check:    () => `Node is smaller than both children — heap property restored`,
            swap:     () => `Swapping with smallest child to maintain min-heap order`,
            notFound: () => `Heap is empty — nothing to extract`,
        },
        // ── BFS ──────────────────────────────────────────────────────────────────
        bfsGraph: {
            enqueue: (s) => s.from != null
                ? `Node ${s.nodeId} (neighbor of ${s.from}) not yet visited — adding to queue`
                : `Enqueuing start node ${s.nodeId}`,
            visit:   (s) => s.from != null
                ? `Discovered node ${s.nodeId} via edge from ${s.from}`
                : `Starting BFS from node ${s.nodeId} — marking as visited`,
            dequeue: (s) => `Dequeuing node ${s.nodeId} — processing all its unvisited neighbors`,
            visited: (s) => `Node ${s.nodeId} fully processed — all reachable neighbors enqueued`,
        },
        // ── DFS ──────────────────────────────────────────────────────────────────
        dfsGraph: {
            push:    (s) => s.from != null
                ? `Pushing node ${s.nodeId} onto stack (via edge from ${s.from})`
                : `Starting DFS from node ${s.nodeId}`,
            visit:   (s) => `Exploring node ${s.nodeId} — marking as visited`,
            visited: (s) => `Node ${s.nodeId} fully explored — all neighbors visited, backtracking`,
        },
        // ── Dijkstra ─────────────────────────────────────────────────────────────
        dijkstraGraph: {
            visit:   (s) => s.from != null
                ? `Now processing node ${s.nodeId} — smallest tentative distance in unvisited set`
                : `Initialising source node ${s.nodeId} with distance 0`,
            visited: (s) => `Node ${s.nodeId} finalized — its shortest path is confirmed`,
            relax:   (s) => `Checking edge ${s.from} → ${s.to}: can we find a shorter path to ${s.to}?`,
            update:  (s) => `Shorter path found! Updated distance to node ${s.to} via ${s.from}`,
        },
        // ── A* ───────────────────────────────────────────────────────────────────
        aStarGraph: {
            visit:   (s) => `Expanding node ${s.nodeId} — lowest f(n) = g(n) + h(n) in open set`,
            visited: (s) => `Node ${s.nodeId} closed — optimal cost confirmed`,
            relax:   (s) => `Evaluating neighbor ${s.to}: f(n) = g(n) + edge_cost + heuristic`,
            update:  (s) => `Better path to ${s.to} via ${s.from} — updating f(n) and predecessor`,
            found:   (s) => `Goal node ${s.nodeId} reached — reconstructing path`,
            notFound:(s) => `Open set exhausted — no path exists to goal`,
        },
        // ── Bellman-Ford ─────────────────────────────────────────────────────────
        bellmanFordGraph: {
            visit:   (s) => s.nodeId === -1
                ? `Starting new relaxation pass over all edges`
                : `Initialising distances — source node ${s.nodeId} set to 0, all others to ∞`,
            relax:   (s) => `Relaxing edge ${s.from} → ${s.to}: is path via ${s.from} shorter?`,
            update:  (s) => `Distance to ${s.to} improved via ${s.from} — updated`,
            found:   () => `All V-1 passes complete — shortest paths finalized (no negative cycle detected)`,
            notFound:(s) => `Negative cycle detected at node ${s.nodeId} — distances are unreliable`,
        },
        // ── Kruskal ──────────────────────────────────────────────────────────────
        kruskalGraph: {
            visit:   (s) => s.nodeId === -1
                ? `Examining next cheapest edge in sorted order`
                : `Adding node ${s.nodeId} to MST`,
            relax:   (s) => s.from != null
                ? `Considering edge ${s.from}–${s.to}: are they in different components? (union-find check)`
                : `Checking edge for MST inclusion`,
            update:  (s) => `Different components — edge ${s.from}–${s.to} added to MST (merging sets)`,
            found:   () => `MST complete — all vertices connected with minimum total weight`,
        },
        // ── Topological Sort ─────────────────────────────────────────────────────
        topoSortGraph: {
            visit:   (s) => s.nodeId === -1
                ? `Initialising in-degree counts for all nodes`
                : `Processing node ${s.nodeId} — decrementing in-degrees of its successors`,
            visited: (s) => `Node ${s.nodeId} appended to topological order`,
            relax:   (s) => `Edge ${s.from} → ${s.to}: decrementing in-degree of ${s.to}`,
            enqueue: (s) => `Node ${s.to != null ? s.to : s.nodeId} in-degree reached 0 — ready to process`,
            found:   (s) => `Node ${s.nodeId} added to topological sort result`,
            notFound:() => `Cycle detected — topological sort is impossible for cyclic graphs`,
        },
        mazeRecursiveDFS: {
            carve:    (s) => `Carving passage at (${s.row}, ${s.col})`,
            backtrack:(s) => `Dead end at (${s.row}, ${s.col}) — backtracking to previous cell`,
        },
        mazePrims: {
            carve:    (s) => `Carving passage at (${s.row}, ${s.col})`,
            frontier: (s) => `Adding wall at (${s.row}, ${s.col}) to frontier`,
        },
        mazeBinaryTree: {
            carve:    (s) => `Carving passage at (${s.row}, ${s.col})`,
        },
        pathBFS: {
            visit:   (s) => `Dequeueing cell (${s.row}, ${s.col}) — processing neighbors`,
            explore: (s) => `Exploring neighbor (${s.row}, ${s.col}) — adding to queue`,
            found:   () => `Exit reached — reconstructing shortest path`,
            path:    (s) => `Path cell (${s.row}, ${s.col})`,
        },
        pathDFS: {
            visit:   (s) => `Visiting cell (${s.row}, ${s.col}) — exploring deeper`,
            explore: (s) => `Exploring neighbor (${s.row}, ${s.col}) — pushing to stack`,
            found:   () => `Exit reached — reconstructing path`,
            path:    (s) => `Path cell (${s.row}, ${s.col})`,
        },
        pathAStar: {
            visit:   (s) => `Expanding cell (${s.row}, ${s.col}) — lowest f-score in open set`,
            explore: (s) => `Evaluating neighbor (${s.row}, ${s.col}) — checking if path improves`,
            found:   () => `Goal reached — optimal path found via A*`,
            path:    (s) => `Path cell (${s.row}, ${s.col})`,
            frontier:(s) => `Adding (${s.row}, ${s.col}) to open set`,
        },
        pathGreedy: {
            visit:   (s) => `Expanding cell (${s.row}, ${s.col}) — closest to goal by heuristic`,
            explore: (s) => `Exploring neighbor (${s.row}, ${s.col}) — adding to open set`,
            found:   () => `Goal reached — path found (may not be optimal)`,
            path:    (s) => `Path cell (${s.row}, ${s.col})`,
            frontier:(s) => `Adding (${s.row}, ${s.col}) to open set`,
        },
    };

    /**
     * Generate a human-readable "chain of thought" string for a given algorithm step.
     *
     * @param {{type: string, nodeId?: *, from?: *, to?: *, balance?: number, rotationType?: string, codeLine?: number}} step - The current algorithm step.
     * @param {string} algoKey - The current algorithm key.
     * @returns {string|null} Thought string, or null to skip this step.
     */
    function generateThought(step, algoKey) {
        const algoThoughts = THOUGHTS[algoKey];
        if (!algoThoughts) return null;
        const generator = algoThoughts[step.type];
        if (!generator) return null;
        return generator(step);
    }

    /**
     * Append a single chain-of-thought entry to the CoT panel and auto-scroll to it.
     * Caps the log at 60 entries to prevent unbounded DOM growth.
     *
     * @param {{type: string}} step - The current algorithm step (used for the tag label and CSS class).
     * @param {string} text - The thought string to display.
     * @returns {void}
     */
    function appendThought(step, text) {
        const entry = document.createElement('div');
        entry.className = 'cot-entry';

        const tag = document.createElement('span');
        tag.className = `cot-tag ${step.type}`;
        tag.textContent = step.type;

        const msg = document.createElement('span');
        msg.textContent = text;

        entry.appendChild(tag);
        entry.appendChild(msg);
        cotBody.appendChild(entry);

        // Cap at 60 entries to prevent unbounded growth
        while (cotBody.children.length > 60) {
            cotBody.removeChild(cotBody.firstChild);
        }
        cotBody.scrollTop = cotBody.scrollHeight;
    }

    /**
     * Show or hide the Chain of Thought panel based on the current algorithm.
     * Clears any existing entries.
     *
     * @param {string} algoKey - The current algorithm key.
     * @returns {void}
     */
    function initCotPanel(algoKey) {
        const show = isTreeAlgorithm(algoKey) || isGraphAlgorithm(algoKey) || isMazeAlgorithm(algoKey);
        cotPanel.style.display = show ? '' : 'none';
        cotBody.innerHTML = '';
    }

    /**
     * Clear all chain-of-thought entries.
     *
     * @returns {void}
     */
    function clearCotPanel() {
        cotBody.innerHTML = '';
    }

    /**
     * Create persistent cell elements for the array state panel.
     * Called once per array generation — cells are reused across all subsequent steps.
     *
     * @param {number[]} arr - The initial array.
     * @returns {void}
     */
    function initArrayState(arr) {
        const algoKey = algorithmSelect.value;
        const isArrayAlgo = !isTreeAlgorithm(algoKey) && !isGraphAlgorithm(algoKey) && !isLinkedListAlgorithm(algoKey) && !isMazeAlgorithm(algoKey);
        const isListMode = Visualizer.getMode() === 'list';

        arrayStatePanel.style.display = (isArrayAlgo && !isListMode) ? '' : 'none';
        arrayStateBody.innerHTML = '';
        stateCells = [];
        if (!isArrayAlgo || isListMode || arr.length === 0) return;

        for (let i = 0; i < arr.length; i++) {
            const cell = document.createElement('div');
            cell.className = 'array-state-cell';

            const valSpan = document.createElement('span');
            valSpan.className = 'asc-value';
            valSpan.textContent = arr[i];

            const idxSpan = document.createElement('span');
            idxSpan.className = 'asc-index';
            idxSpan.textContent = i;

            cell.appendChild(valSpan);
            cell.appendChild(idxSpan);
            arrayStateBody.appendChild(cell);
            stateCells.push(cell);
        }
    }

    /**
     * Update the array state panel for a single algorithm step.
     * Animates swaps with a translateX crossing transition scaled to current speed.
     * Accumulates sorted state across steps.
     *
     * @param {{type: string, indices?: number[]}|null} step - The current step, or null on complete.
     * @param {boolean} [complete=false] - Whether the algorithm just finished.
     * @returns {void}
     */
    function renderArrayState(step, complete = false) {
        if (stateCells.length === 0) return;

        // Accumulate sorted indices
        if (step && step.type === 'sorted' && step.indices) {
            for (const i of step.indices) sortedIndices.add(i);
        }
        if (complete) {
            for (let i = 0; i < stateCells.length; i++) sortedIndices.add(i);
        }

        const stateMap = {
            compare:   'comparing',
            swap:      'swapping',
            overwrite: 'swapping',
            sorted:    'sorted',
            found:     'found',
            check:     'searching',
            eliminate: 'comparing',
            pivot:     'pivot',
        };
        const activeClass = step ? (stateMap[step.type] || null) : null;
        const indices = step && step.indices ? step.indices : [];

        // For swap/overwrite: animate cells crossing before updating values
        if (step && (step.type === 'swap' || step.type === 'overwrite') && indices.length >= 1) {
            const i = indices[0];
            const j = indices[1];
            const cellA = stateCells[i];
            const cellB = j != null ? stateCells[j] : null;

            if (cellA && cellB) {
                const rectA = cellA.getBoundingClientRect();
                const rectB = cellB.getBoundingClientRect();
                const dx = rectB.left - rectA.left;
                const dur = Math.min(Math.max(getDelay() * 0.6, 60), 180);
                const easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                cellA.style.transition = `transform ${dur}ms ${easing}, background ${dur}ms ease`;
                cellB.style.transition = `transform ${dur}ms ${easing}, background ${dur}ms ease`;
                cellA.classList.add('swapping');
                cellB.classList.add('swapping');
                cellA.style.transform = `translateX(${dx}px)`;
                cellB.style.transform = `translateX(${-dx}px)`;
                cellA.style.zIndex = '2';

                setTimeout(() => {
                    cellA.style.transition = 'none';
                    cellB.style.transition = 'none';
                    cellA.style.transform = '';
                    cellB.style.transform = '';
                    cellA.style.zIndex = '';
                    cellA.classList.remove('swapping');
                    cellB.classList.remove('swapping');
                    // Sync values after animation
                    cellA.querySelector('.asc-value').textContent = currentArray[i];
                    cellB.querySelector('.asc-value').textContent = currentArray[j];
                    applyStateCellClasses();
                }, dur);
                return; // let the animation handle the value update
            }

            // Single-index overwrite (e.g. merge sort)
            if (cellA) {
                cellA.querySelector('.asc-value').textContent = currentArray[i];
            }
        } else {
            // Non-swap step: sync all values immediately
            for (let i = 0; i < stateCells.length; i++) {
                stateCells[i].querySelector('.asc-value').textContent = currentArray[i];
            }
        }

        applyStateCellClasses();

        /**
         * Apply colour state classes to all persistent cells based on active indices and sorted set.
         *
         * @returns {void}
         */
        function applyStateCellClasses() {
            const activeSet = new Set(indices);
            for (let i = 0; i < stateCells.length; i++) {
                const cell = stateCells[i];
                cell.classList.remove('comparing', 'swapping', 'sorted', 'found', 'searching', 'pivot');
                if (activeSet.has(i) && activeClass) {
                    cell.classList.add(activeClass);
                } else if (sortedIndices.has(i)) {
                    cell.classList.add('sorted');
                }
            }
        }
    }

    /**
     * Clear the array state panel and reset sorted index tracking.
     *
     * @returns {void}
     */
    function clearArrayState() {
        sortedIndices = new Set();
        stateCells = [];
        arrayStateBody.innerHTML = '';
        clearCotPanel();
    }

    /**
     * Handle algorithm completion. Stops playback, marks bars as sorted,
     * plays a completion sound, and resets button states.
     *
     * @returns {void}
     */
    function onComplete() {
        isPlaying = false;
        generator = null;
        stopElapsedTimer();
        const algoKey = algorithmSelect.value;
        if (!isSearchAlgorithm(algoKey)) {
            Visualizer.markAllSorted();
        }
        SoundEngine.playComplete();
        CodeHighlighter.clearHighlight();
        renderArrayState(null, true);

        const elapsedMs = startTime ? performance.now() - startTime : 0;
        EventBus.emit('algorithm:complete', {
            algoKey,
            stats: {
                comparisons,
                swapCount,
                elapsedMs,
            },
        });

        updateButtonStates();
    }

    /**
     * Pause the playback. Clears the step timer but preserves the generator state
     * so playback can be resumed from the same point.
     *
     * @returns {void}
     */
    function pause() {
        isPlaying = false;
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
        }
        updateButtonStates();
    }

    /**
     * Stop playback completely. Pauses and discards the generator
     * so a fresh run starts next time.
     *
     * @returns {void}
     */
    function stopPlayback() {
        pause();
        generator = null;
    }

    /**
     * Reset the visualization. Generates a fresh randomized array,
     * clears all counters and timers, and re-renders everything.
     *
     * @returns {void}
     */
    function reset() {
        EventBus.emit('algorithm:reset', { algoKey: algorithmSelect.value });
        stopPlayback();
        CompareMode.stop();
        stopElapsedTimer();
        startTime = null;
        isPlaying = false;
        elapsedTimeEl.textContent = '0.000s';
        const algoKey = algorithmSelect.value;
        if (isTreeAlgorithm(algoKey) || isGraphAlgorithm(algoKey) || isLinkedListAlgorithm(algoKey) || isMazeAlgorithm(algoKey)) {
            switchVizMode(algoKey);
        }
        generateArray();
        CodeHighlighter.clearHighlight();
    }

    /**
     * Calculate the delay between steps based on the speed slider.
     *
     * @returns {number} Delay in milliseconds.
     */
    function getDelay() {
        const speed = parseInt(speedSlider.value, 10);
        // Map 1-100 to 500ms-5ms (exponential curve for better feel)
        return Math.max(5, Math.floor(500 * Math.pow(0.95, speed)));
    }

    // ─── UI Updates ───

    /**
     * Update the enabled/disabled state of control buttons based on
     * whether the visualization is currently playing.
     *
     * @returns {void}
     */
    function updateButtonStates() {
        btnPlay.disabled = isPlaying;
        btnPause.disabled = !isPlaying;
        btnStep.disabled = isPlaying;
        btnGenerate.disabled = isPlaying;
        arraySizeSlider.disabled = isPlaying;
        sizeDisplay.disabled = isPlaying;
        arrayTypeSelect.disabled = isPlaying;
        algorithmSelect.disabled = isPlaying;
    }

    /**
     * Update the comparisons and swaps counter display in the info bar.
     *
     * @returns {void}
     */
    function updateStats() {
        comparisonsEl.textContent = comparisons;
        swapsEl.textContent = swapCount;
    }

    // ─── Elapsed Time ───

    /**
     * Start the elapsed time counter display. Updates every 50ms
     * to show a live running clock in the info bar.
     *
     * @returns {void}
     */
    function startElapsedTimer() {
        stopElapsedTimer();
        elapsedTimerId = setInterval(() => {
            if (startTime) {
                const elapsed = (performance.now() - startTime) / 1000;
                elapsedTimeEl.textContent = elapsed.toFixed(3) + 's';
            }
        }, 50);
    }

    /**
     * Stop the elapsed time counter and freeze the display at the final value.
     *
     * @returns {void}
     */
    function stopElapsedTimer() {
        if (elapsedTimerId) {
            clearInterval(elapsedTimerId);
            elapsedTimerId = null;
        }
        // Show final time
        if (startTime) {
            const elapsed = (performance.now() - startTime) / 1000;
            elapsedTimeEl.textContent = elapsed.toFixed(3) + 's';
        }
    }

    // ─── Cheat Sheet Drawer Toggle ───

    /** @type {HTMLDivElement} */
    const cheatDrawer = document.getElementById('cheat-drawer');
    /** @type {HTMLButtonElement} */
    const cheatToggle = document.getElementById('cheat-toggle');

    cheatToggle.addEventListener('click', () => {
        cheatDrawer.classList.toggle('open');
    });

    // ─── Compare Mode ───

    /** @type {HTMLButtonElement} */
    const btnCompare = document.getElementById('btn-compare');
    /** @type {HTMLDivElement} */
    const vizSingle = document.getElementById('viz-single');
    /** @type {HTMLDivElement} */
    const vizCompare = document.getElementById('viz-compare');
    /** @type {HTMLDivElement} */
    const barsContainerA = document.getElementById('bars-container-a');
    /** @type {HTMLDivElement} */
    const barsContainerB = document.getElementById('bars-container-b');
    /** @type {HTMLElement} */
    const comparePanel = document.getElementById('compare-panel');
    /** @type {HTMLSelectElement} */
    const compareCategorySelect = document.getElementById('compare-category');
    /** @type {HTMLSelectElement} */
    const compareSelectA = document.getElementById('compare-select-a');
    /** @type {HTMLSelectElement} */
    const compareSelectB = document.getElementById('compare-select-b');
    /** @type {HTMLElement} */
    const mainContent = document.querySelector('.main-content');

    CompareMode.init(barsContainerA, barsContainerB);

    /**
     * Algorithm category definitions for compare mode filtering.
     * @type {Array<{label: string, algorithms: Array<{value: string, name: string}>}>}
     */
    const COMPARE_CATEGORIES = [
        {
            label: 'Sorting',
            algorithms: [
                { value: 'bubbleSort', name: 'Bubble Sort' },
                { value: 'selectionSort', name: 'Selection Sort' },
                { value: 'insertionSort', name: 'Insertion Sort' },
                { value: 'mergeSort', name: 'Merge Sort' },
                { value: 'quickSort', name: 'Quick Sort' },
                { value: 'heapSort', name: 'Heap Sort' },
                { value: 'shellSort', name: 'Shell Sort' },
                { value: 'countingSort', name: 'Counting Sort' },
                { value: 'gnomeSort', name: 'Gnome Sort' },
                { value: 'cocktailShakerSort', name: 'Cocktail Shaker Sort' },
                { value: 'pancakeSort', name: 'Pancake Sort' },
                { value: 'bogoSort', name: 'Bogo Sort' },
                { value: 'thanosSort', name: 'Thanos Sort' },
                { value: 'stalinSort', name: 'Stalin Sort' },
            ],
        },
        {
            label: 'Searching',
            algorithms: [
                { value: 'linearSearch', name: 'Linear Search' },
                { value: 'binarySearch', name: 'Binary Search' },
                { value: 'jumpSearch', name: 'Jump Search' },
                { value: 'ternarySearch', name: 'Ternary Search' },
                { value: 'fibonacciSearch', name: 'Fibonacci Search' },
            ],
        },
    ];

    // Populate the category dropdown once
    for (let i = 0; i < COMPARE_CATEGORIES.length; i++) {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = COMPARE_CATEGORIES[i].label;
        compareCategorySelect.appendChild(opt);
    }

    /**
     * Populate algorithm A and B dropdowns from the selected category.
     *
     * @returns {void}
     */
    function populateCompareDropdowns() {
        const catIdx = parseInt(compareCategorySelect.value, 10);
        const algos = COMPARE_CATEGORIES[catIdx].algorithms;

        for (const select of [compareSelectA, compareSelectB]) {
            const prev = select.value;
            select.innerHTML = '';
            for (const algo of algos) {
                const opt = document.createElement('option');
                opt.value = algo.value;
                opt.textContent = algo.name;
                select.appendChild(opt);
            }
            if (algos.some(a => a.value === prev)) {
                select.value = prev;
            }
        }

        // Default: A = first, B = second
        compareSelectA.value = algos[0].value;
        if (compareSelectB.value === compareSelectA.value || !compareSelectB.value) {
            compareSelectB.value = algos.length > 1 ? algos[1].value : algos[0].value;
        }
    }

    compareCategorySelect.addEventListener('change', populateCompareDropdowns);

    /**
     * Toggle compare mode on/off.
     *
     * @returns {void}
     */
    function toggleCompare() {
        const isOn = CompareMode.toggle();
        btnCompare.classList.toggle('active', isOn);
        vizWrapper.classList.toggle('compare-hidden', isOn);
        vizSingle.classList.toggle('compare-hidden', isOn);
        vizCompare.classList.toggle('compare-hidden', !isOn);
        comparePanel.classList.toggle('compare-hidden', !isOn);
        mainContent.classList.toggle('compare-active', isOn);
        if (isOn) {
            clearArrayState();
            populateCompareDropdowns();
        } else {
            generateArray();
        }
    }

    /**
     * Start a compare mode run with both selected algorithms.
     *
     * @returns {void}
     */
    function playCompare() {
        SoundEngine.ensureContext();
        const target = parseInt(searchTargetInput.value, 10);

        EventBus.emit('algorithm:compare:start', {
            algoKey1: compareSelectA.value,
            algoKey2: compareSelectB.value,
            arraySize: currentArray.length,
        });

        CompareMode.start(
            compareSelectA.value,
            compareSelectB.value,
            currentArray,
            target,
            getDelay,
            () => {
                EventBus.emit('algorithm:compare:complete', {
                    algoKey1: compareSelectA.value,
                    algoKey2: compareSelectB.value,
                });
                updateButtonStates();
            }
        );
        isPlaying = true;
        updateButtonStates();
    }

    btnCompare.addEventListener('click', toggleCompare);

    // ─── Benchmark Mode ───

    /** @type {HTMLButtonElement} */
    const btnBenchmark = document.getElementById('btn-benchmark');
    /** @type {HTMLDivElement} */
    const benchmarkModal = document.getElementById('benchmark-modal');
    /** @type {HTMLButtonElement} */
    const btnBenchmarkClose = document.getElementById('btn-benchmark-close');
    /** @type {HTMLDivElement} */
    const benchmarkResults = document.getElementById('benchmark-results');
    /** @type {HTMLHeadingElement} */
    const benchmarkTitle = document.getElementById('benchmark-title');
    /** @type {HTMLDivElement} */
    const benchmarkLoading = document.getElementById('benchmark-loading');
    /** @type {HTMLDivElement} */
    const benchmarkGroup = document.querySelector('.benchmark-group');

    /**
     * Determine whether the currently selected algorithm is benchmarkable.
     * Only sorting and searching algorithms are supported.
     *
     * @param {string} key - The algorithm key.
     * @returns {boolean} True if the algorithm can be benchmarked.
     */
    function isBenchmarkable(key) {
        return !isTreeAlgorithm(key) && !isGraphAlgorithm(key) && !isLinkedListAlgorithm(key);
    }

    /**
     * Show or hide the Benchmark button depending on the selected algorithm.
     *
     * @returns {void}
     */
    function updateBenchmarkVisibility() {
        const algoKey = algorithmSelect.value;
        benchmarkGroup.classList.toggle('controls-hidden', !isBenchmarkable(algoKey));
    }

    /**
     * Open the benchmark modal, run the benchmark for the current algorithm
     * across several array sizes, and display the results table and bar chart.
     *
     * @returns {void}
     */
    function openBenchmark() {
        const algoKey = algorithmSelect.value;
        if (!isBenchmarkable(algoKey)) return;

        const isSearch = isSearchAlgorithm(algoKey);

        // Resolve the algorithm function
        /** @type {Function} */
        const algoFn = isSearch
            ? SearchingAlgorithms[algoKey]
            : SortingAlgorithms[algoKey];

        if (typeof algoFn !== 'function') return;

        // Build a human-readable title from the algorithm key
        const info = isSearch
            ? SearchingAlgorithms.COMPLEXITY[algoKey]
            : SortingAlgorithms.COMPLEXITY[algoKey];
        const name = info ? info.name : algoKey;

        benchmarkTitle.textContent = `Benchmark — ${name}`;
        benchmarkResults.innerHTML = '';
        benchmarkLoading.style.display = 'block';
        benchmarkModal.style.display = 'flex';

        // Defer the heavy work one tick so the modal renders before blocking
        setTimeout(() => {
            const SIZES = [10, 25, 50, 100];
            const RUNS = 20;

            const results = Benchmark.run(algoFn, SIZES, RUNS, isSearch);
            benchmarkLoading.style.display = 'none';
            Benchmark.renderResults(benchmarkResults, name, results);
        }, 30);
    }

    btnBenchmark.addEventListener('click', openBenchmark);

    btnBenchmarkClose.addEventListener('click', () => {
        benchmarkModal.style.display = 'none';
    });

    // Close modal when clicking the backdrop
    benchmarkModal.addEventListener('click', (e) => {
        if (e.target === benchmarkModal) {
            benchmarkModal.style.display = 'none';
        }
    });

    // Keep benchmark button visibility in sync with algorithm selection
    algorithmSelect.addEventListener('change', updateBenchmarkVisibility);

    // Set initial visibility
    updateBenchmarkVisibility();

    // ─── Event Listeners ───

    btnGenerate.addEventListener('click', () => {
        if (isMazeAlgorithm(algorithmSelect.value)) {
            generateMaze();
        } else {
            generateArray();
        }
    });
    btnPlay.addEventListener('click', () => {
        if (CompareMode.isActive()) {
            playCompare();
        } else {
            play();
        }
    });
    btnPause.addEventListener('click', () => {
        if (CompareMode.isActive()) {
            CompareMode.stop();
            isPlaying = false;
            updateButtonStates();
        } else {
            pause();
        }
    });
    btnReset.addEventListener('click', reset);

    btnStep.addEventListener('click', () => {
        SoundEngine.ensureContext();
        if (!generator) {
            initGenerator();
        }
        if (!startTime) {
            startTime = performance.now();
        }
        executeStep();
        // Update time display for step mode
        if (startTime) {
            const elapsed = (performance.now() - startTime) / 1000;
            elapsedTimeEl.textContent = elapsed.toFixed(3) + 's';
        }
    });

    algorithmSelect.addEventListener('change', () => {
        reset();
        loadAlgorithm();
        initCotPanel(algorithmSelect.value);
        // For sorted-array searches, auto-sort the array for display
        const val = algorithmSelect.value;
        if (val !== 'linearSearch' && val !== 'sentinelLinearSearch' && isSearchAlgorithm(val)) {
            currentArray.sort((a, b) => a - b);
            Visualizer.render(currentArray);
        }
    });

    arraySizeSlider.addEventListener('input', () => {
        if (Visualizer.getMode() === 'list') {
            let newSize = parseInt(arraySizeSlider.value, 10);
            if (newSize > 10) {
                newSize = 10;
                arraySizeSlider.value = 10;
            }
            sizeDisplay.value = String(newSize);
        } else {
            sizeDisplay.value = arraySizeSlider.value;
        }
        generateArray();
    });

    sizeDisplay.addEventListener('change', () => {
        let val = Math.min(100, Math.max(5, parseInt(sizeDisplay.value, 10) || 5));
        if (Visualizer.getMode() === 'list') val = Math.min(val, 10);
        sizeDisplay.value = String(val);
        arraySizeSlider.value = String(val);
        generateArray();
    });

    speedDisplay.addEventListener('change', () => {
        const val = Math.min(100, Math.max(1, parseInt(speedDisplay.value, 10) || 1));
        speedDisplay.value = String(val);
        speedSlider.value = String(val);
    });

    speedSlider.addEventListener('input', () => {
        speedDisplay.value = speedSlider.value;
    });

    arrayTypeSelect.addEventListener('change', generateArray);

    vizModeSelect.addEventListener('change', () => {
        const newMode = vizModeSelect.value;
        const currentSize = parseInt(arraySizeSlider.value, 10);

        Visualizer.setMode(newMode);

        if (newMode === 'list') {
            if (currentSize > 10) {
                originalArraySize = currentSize;
                arraySizeSlider.value = 10;
                sizeDisplay.value = '10';
                generateArray();
            } else {
                Visualizer.render(currentArray);
            }
        } else if (newMode === 'bars') {
            if (originalArraySize > 0) {
                arraySizeSlider.value = originalArraySize;
                sizeDisplay.value = String(originalArraySize);
                originalArraySize = 0;
                generateArray();
            } else {
                Visualizer.render(currentArray);
            }
        }
    });

    // Sound controls
    btnSound.addEventListener('click', () => {
        SoundEngine.ensureContext();
        const on = SoundEngine.toggle();
        btnSound.textContent = `Sound: ${on ? 'ON' : 'OFF'}`;
    });

    volumeSlider.addEventListener('input', () => {
        SoundEngine.setVolume(parseInt(volumeSlider.value, 10) / 100);
    });

    // ─── Layout Toggle (Landscape / Portrait) ───

    /** @type {HTMLButtonElement} */
    const btnLayout = document.getElementById('btn-layout');
    /** @type {HTMLElement} */
    const vizPanel = document.getElementById('viz-panel');
    /**
     * Size the code panel in portrait mode to fit all rendered code lines.
     * Measures the actual scrollHeight of the code display and the tab bar,
     * then sets a fixed height on the code panel.
     *
     * @returns {void}
     */
    function updatePortraitCodeSize() {
        const codePanel = document.querySelector('.code-panel');
        if (!isVertical) {
            codePanel.style.removeProperty('height');
            codePanel.style.removeProperty('flex');
            return;
        }
        const tabBar = codePanel.querySelector('.language-tabs');
        const codeEl = codePanel.querySelector('.code-display');
        const tabHeight = tabBar ? tabBar.offsetHeight : 0;
        const codeHeight = codeEl ? codeEl.scrollHeight : 0;
        const totalNeeded = tabHeight + codeHeight + 4;
        const maxAllowed = window.innerHeight * 0.6;
        const finalHeight = Math.min(totalNeeded, maxAllowed);
        codePanel.style.flex = `0 0 ${finalHeight}px`;
    }

    /**
     * Update the viz panel data attributes used by CSS overlays in vertical mode.
     *
     * @returns {void}
     */
    function updateVizOverlay() {
        const algoKey = algorithmSelect.value;
        let complexitySource;
        if (isTreeAlgorithm(algoKey)) {
            complexitySource = TreeAlgorithms.COMPLEXITY;
        } else if (isGraphAlgorithm(algoKey)) {
            complexitySource = GraphAlgorithms.COMPLEXITY;
        } else if (isSearchAlgorithm(algoKey)) {
            complexitySource = SearchingAlgorithms.COMPLEXITY;
        } else {
            complexitySource = SortingAlgorithms.COMPLEXITY;
        }
        const info = complexitySource[algoKey];
        if (info) {
            vizPanel.setAttribute('data-algo-name', info.name);
            vizPanel.setAttribute('data-complexity', `Avg: ${info.average}  |  Space: ${info.space}`);
        }
    }

    btnLayout.addEventListener('click', () => {
        isVertical = !isVertical;
        document.body.classList.toggle('vertical', isVertical);
        btnLayout.textContent = isVertical ? 'Portrait' : 'Landscape';
        updateVizOverlay();
        requestAnimationFrame(updatePortraitCodeSize);
    });

    // ─── Custom Array Input ───

    /**
     * Parse a comma-separated string of numbers into an array.
     * Filters out non-numeric tokens and clamps values to [1, 200].
     *
     * @param {string} raw - Raw input string.
     * @returns {number[]|null} Parsed array, or null if no valid numbers found.
     */
    function parseCustomArray(raw) {
        const values = raw.split(',')
            .map(s => parseInt(s.trim(), 10))
            .filter(n => !isNaN(n) && n >= 1 && n <= 200);
        return values.length >= 2 ? values : null;
    }

    btnApplyCustom.addEventListener('click', () => {
        const parsed = parseCustomArray(customArrayInput.value);
        if (!parsed) {
            customArrayInput.style.borderColor = 'var(--bar-swap)';
            setTimeout(() => { customArrayInput.style.borderColor = ''; }, 1200);
            return;
        }
        reset();
        currentArray = parsed;
        cachedMaxVal = Math.max(...currentArray);
        Visualizer.render(currentArray);
        customArrayInput.style.borderColor = 'var(--bar-sorted)';
        setTimeout(() => { customArrayInput.style.borderColor = ''; }, 1200);
    });

    // Apply on Enter key
    customArrayInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btnApplyCustom.click();
    });

    // ─── Theme Toggle ───

    /** @type {HTMLButtonElement} */
    const btnTheme = document.getElementById('btn-theme');

    btnTheme.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light');
        btnTheme.textContent = isLight ? 'Dark' : 'Light';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        EventBus.emit('theme:change', { theme: isLight ? 'light' : 'dark' });
    });

    // Restore saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light');
        btnTheme.textContent = 'Dark';
    }

    // ─── Recording ───

    /** @type {HTMLButtonElement} */
    const btnRecord = document.getElementById('btn-record');
    /** @type {HTMLSelectElement} */
    const recordQuality = document.getElementById('record-quality');

    btnRecord.addEventListener('click', async () => {
        if (Recorder.isRecording()) {
            Recorder.stop();
            btnRecord.textContent = 'Record';
            btnRecord.classList.remove('recording');
        } else {
            const started = await Recorder.start(recordQuality.value, () => {
                btnRecord.textContent = 'Record';
                btnRecord.classList.remove('recording');
            });
            if (started) {
                btnRecord.textContent = 'Stop';
                btnRecord.classList.add('recording');
            }
        }
    });

    // Language tab switching
    languageTabs.addEventListener('click', (e) => {
        if (!e.target.classList.contains('lang-tab')) return;

        document.querySelector('.lang-tab.active').classList.remove('active');
        e.target.classList.add('active');

        CodeHighlighter.setLanguage(e.target.dataset.lang);
        loadAlgorithm();
    });

    // ─── Keyboard Shortcuts ───

    document.addEventListener('keydown', (e) => {
        // Ignore if user is typing in an input/select
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                if (isPlaying) {
                    btnPause.click();
                } else {
                    btnPlay.click();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (!isPlaying) btnStep.click();
                break;
            case 'KeyR':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    btnReset.click();
                }
                break;
            case 'KeyG':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    btnGenerate.click();
                }
                break;
        }
    });

    if (FEATURES.FEEDBACK) {
        Feedback.init();
    }

    if (FEATURES.VISUAL_POLISH) {
        import('./enhancements/visual-polish.js').then(({ default: VisualPolish }) => {
            VisualPolish.init();
        });
    }

    if (FEATURES.GAMIFICATION) {
        import('./enhancements/gamification.js').then(({ default: Gamification }) => {
            Gamification.init();
        });
    }

    if (FEATURES.EDUCATIONAL) {
        import('./enhancements/educational.js').then(({ default: Educational }) => {
            Educational.init();
        });
    }

    if (FEATURES.INTERACTIVITY) {
        import('./enhancements/interactivity.js').then(({ default: Interactivity }) => {
            Interactivity.init();
        });
    }
})();
