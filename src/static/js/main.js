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

(() => {
    'use strict';

    // ─── DOM References ───

    /** @type {HTMLSelectElement} */
    const algorithmSelect = document.getElementById('algorithm-select');
    /** @type {HTMLInputElement} */
    const arraySizeSlider = document.getElementById('array-size');
    /** @type {HTMLSpanElement} */
    const sizeDisplay = document.getElementById('size-display');
    /** @type {HTMLInputElement} */
    const speedSlider = document.getElementById('speed-slider');
    /** @type {HTMLSelectElement} */
    const arrayTypeSelect = document.getElementById('array-type');
    /** @type {HTMLInputElement} */
    const searchTargetInput = document.getElementById('search-target');
    /** @type {HTMLDivElement} */
    const searchTargetGroup = document.querySelector('.search-target-group');

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

    // ─── Algorithm Classification ───

    /** @type {string[]} */
    const SEARCH_ALGORITHMS = ['linearSearch', 'binarySearch', 'jumpSearch', 'ternarySearch', 'fibonacciSearch'];

    /** @type {string[]} */
    const TREE_ALGORITHMS = ['bstInsert', 'bstSearch', 'bstInorder', 'bstPreorder', 'bstPostorder'];
    /** @type {string[]} */
    const GRAPH_ALGORITHMS = ['bfs', 'dfs', 'dijkstra'];

    // ─── Tree/Graph State ───

    /** @type {HTMLDivElement} */
    const treeGraphContainer = document.getElementById('tree-graph-container');
    /** @type {object|null} */
    let currentTree = null;
    /** @type {object|null} */
    let currentGraph = null;

    // ─── Layout State ───

    /** @type {boolean} */
    let isVertical = false;

    // ─── Initialization ───

    Visualizer.init(barsContainer);
    CodeHighlighter.init(codeDisplay);
    TreeRenderer.init(treeGraphContainer);
    GraphRenderer.init(treeGraphContainer);

    generateArray();
    loadAlgorithm();

    // ─── Array Generation ───

    /**
     * Generate a new array based on the current size and type settings.
     * Resets all state (counters, generator, button states) and re-renders bars.
     *
     * @returns {void}
     */
    function generateArray() {
        stopPlayback();
        const size = parseInt(arraySizeSlider.value, 10);
        const type = arrayTypeSelect.value;
        currentArray = createArray(size, type);

        comparisons = 0;
        swapCount = 0;
        updateStats();
        Visualizer.render(currentArray);
        generator = null;
        updateButtonStates();
    }

    /**
     * Create an array of the given size and distribution type.
     * Uses unique values (1..N) for clear visual distinction between bars.
     *
     * @param {number} size - Number of elements.
     * @param {string} type - Distribution type: random, nearlySorted, reversed, fewUnique.
     * @returns {number[]} The generated array.
     */
    function createArray(size, type) {
        /** @type {number[]} */
        let arr = [];

        switch (type) {
            case 'nearlySorted':
                for (let i = 1; i <= size; i++) arr.push(i);
                // Swap ~10% of elements to introduce slight disorder
                for (let i = 0; i < Math.floor(size * 0.1); i++) {
                    const a = Math.floor(Math.random() * size);
                    const b = Math.floor(Math.random() * size);
                    [arr[a], arr[b]] = [arr[b], arr[a]];
                }
                break;
            case 'reversed':
                for (let i = size; i >= 1; i--) arr.push(i);
                break;
            case 'fewUnique':
                for (let i = 0; i < size; i++) {
                    arr.push(Math.floor(Math.random() * 5) + 1);
                }
                break;
            default: // random - Fisher-Yates shuffle of unique values
                for (let i = 1; i <= size; i++) arr.push(i);
                arr = fisherYatesShuffle(arr);
                break;
        }

        return arr;
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

        // Show/hide search target input and auto-set a valid target
        const needsTarget = isSearch || algoKey === 'bstSearch';
        searchTargetGroup.style.display = needsTarget ? 'flex' : 'none';
        if (needsTarget && currentArray.length > 0) {
            const randomIdx = Math.floor(Math.random() * currentArray.length);
            searchTargetInput.value = currentArray[randomIdx];
        }

        // Determine code and complexity source
        let codeSource, complexitySource;
        if (isTree) {
            codeSource = TreeAlgorithms.CODE;
            complexitySource = TreeAlgorithms.COMPLEXITY;
        } else if (isGraph) {
            codeSource = GraphAlgorithms.CODE;
            complexitySource = GraphAlgorithms.COMPLEXITY;
        } else if (isSearch) {
            codeSource = SearchingAlgorithms.CODE;
            complexitySource = SearchingAlgorithms.COMPLEXITY;
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
            if (isVertical) updateVizOverlay();
        }

        // Switch viz mode
        switchVizMode(algoKey);
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
     * Switch the visualization between bars and tree/graph modes.
     *
     * @param {string} algoKey - The selected algorithm key.
     * @returns {void}
     */
    function switchVizMode(algoKey) {
        const isTG = isTreeAlgorithm(algoKey) || isGraphAlgorithm(algoKey);
        barsContainer.classList.toggle('compare-hidden', isTG);
        treeGraphContainer.classList.toggle('compare-hidden', !isTG);

        if (isTreeAlgorithm(algoKey)) {
            currentTree = TreeAlgorithms.buildSampleBST([50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45]);
            TreeRenderer.render(currentTree);
        } else if (isGraphAlgorithm(algoKey)) {
            currentGraph = GraphAlgorithms.buildSampleGraph();
            GraphRenderer.render(currentGraph.nodes, currentGraph.edges);
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
            } else {
                generator = TreeAlgorithms[algoKey](currentTree);
            }
        } else if (isGraphAlgorithm(algoKey)) {
            GraphRenderer.clearAllStates();
            generator = GraphAlgorithms[algoKey](currentGraph.adj, currentGraph.nodes[0], currentGraph.nodes);
        } else if (isSearchAlgorithm(algoKey)) {
            if (algoKey !== 'linearSearch') {
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
            onComplete();
            return true;
        }

        const step = result.value;
        const algoKey = algorithmSelect.value;
        processStepStats(step);

        if (isTreeAlgorithm(algoKey)) {
            TreeRenderer.processStep(step);
        } else if (isGraphAlgorithm(algoKey)) {
            GraphRenderer.processStep(step);
        } else {
            Visualizer.processStep(step, currentArray);
        }

        CodeHighlighter.highlightLine(step.codeLine);
        return false;
    }

    /**
     * Update comparison and swap counters based on step type.
     * Also triggers the appropriate sound effect for the operation.
     *
     * @param {{type: string, indices: number[], codeLine: number}} step - The algorithm step object.
     * @returns {void}
     */
    function processStepStats(step) {
        if (step.type === 'compare' || step.type === 'check') {
            comparisons++;
            if (step.indices.length > 0) {
                SoundEngine.playCompare(currentArray[step.indices[0]], cachedMaxVal);
            }
        }
        if (step.type === 'swap' || step.type === 'overwrite') {
            swapCount++;
            if (step.indices.length > 0) {
                SoundEngine.playSwap(currentArray[step.indices[0]], cachedMaxVal);
            }
        }
        if (step.type === 'notFound') {
            SoundEngine.playNotFound();
        }
        updateStats();
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
        stopPlayback();
        CompareMode.stop();
        stopElapsedTimer();
        startTime = null;
        isPlaying = false;
        elapsedTimeEl.textContent = '0.000s';
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
        vizSingle.classList.toggle('compare-hidden', isOn);
        vizCompare.classList.toggle('compare-hidden', !isOn);
        comparePanel.classList.toggle('compare-hidden', !isOn);
        mainContent.classList.toggle('compare-active', isOn);
        if (isOn) {
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
        CompareMode.start(
            compareSelectA.value,
            compareSelectB.value,
            currentArray,
            target,
            getDelay,
            () => { updateButtonStates(); }
        );
        isPlaying = true;
        updateButtonStates();
    }

    btnCompare.addEventListener('click', toggleCompare);

    // ─── Event Listeners ───

    btnGenerate.addEventListener('click', generateArray);
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
        // For sorted-array searches, auto-sort the array for display
        const val = algorithmSelect.value;
        if (val !== 'linearSearch' && isSearchAlgorithm(val)) {
            currentArray.sort((a, b) => a - b);
            Visualizer.render(currentArray);
        }
    });

    arraySizeSlider.addEventListener('input', () => {
        sizeDisplay.textContent = arraySizeSlider.value;
        generateArray();
    });

    arrayTypeSelect.addEventListener('change', generateArray);

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
})();
