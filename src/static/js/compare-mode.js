/**
 * Compare Mode module.
 *
 * Runs two algorithms side by side on the same array, with separate
 * visualizers and a stats comparison table between them.
 */

import SortingAlgorithms from './algorithms/sorting.js';
import SearchingAlgorithms from './algorithms/searching.js';
import SoundEngine from './sound-engine.js';

/** @type {string[]} */
const SEARCH_KEYS = ['linearSearch', 'binarySearch', 'jumpSearch', 'ternarySearch', 'fibonacciSearch'];

const CompareMode = (() => {
    /** @type {boolean} */
    let active = false;
    /** @type {boolean} */
    let isPlaying = false;

    // ─── DOM refs (set during init) ───

    /** @type {HTMLDivElement|null} */
    let containerA = null;
    /** @type {HTMLDivElement|null} */
    let containerB = null;
    /** @type {HTMLDivElement[]} */
    let barsA = [];
    /** @type {HTMLDivElement[]} */
    let barsB = [];

    // ─── State ───

    /** @type {number[]} */
    let arrayA = [];
    /** @type {number[]} */
    let arrayB = [];
    /** @type {Generator|null} */
    let genA = null;
    /** @type {Generator|null} */
    let genB = null;
    /** @type {boolean} */
    let doneA = false;
    /** @type {boolean} */
    let doneB = false;
    /** @type {number|null} */
    let timerId = null;
    /** @type {number} */
    let compsA = 0;
    /** @type {number} */
    let compsB = 0;
    /** @type {number} */
    let swapsA = 0;
    /** @type {number} */
    let swapsB = 0;
    /** @type {number|null} */
    let startTime = null;
    /** @type {number|null} */
    let endTimeA = null;
    /** @type {number|null} */
    let endTimeB = null;
    /** @type {number|null} */
    let elapsedTimerId = null;

    /** @type {function|null} */
    let onFinishCallback = null;

    /**
     * Initialize compare mode with DOM container references.
     *
     * @param {HTMLDivElement} contA - Bars container for algorithm A.
     * @param {HTMLDivElement} contB - Bars container for algorithm B.
     * @returns {void}
     */
    function init(contA, contB) {
        containerA = contA;
        containerB = contB;
    }

    /**
     * Check if compare mode is active.
     *
     * @returns {boolean} True if compare mode is on.
     */
    function isActive() {
        return active;
    }

    /**
     * Toggle compare mode on/off.
     *
     * @returns {boolean} New active state.
     */
    function toggle() {
        active = !active;
        stop();
        return active;
    }

    /**
     * Render bars into a container.
     *
     * @param {HTMLDivElement} container - The bars container.
     * @param {number[]} arr - The array to render.
     * @returns {HTMLDivElement[]} The created bar elements.
     */
    function renderBars(container, arr) {
        container.innerHTML = '';
        const bars = [];
        const maxVal = Math.max(...arr);
        for (let i = 0; i < arr.length; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(arr[i] / maxVal) * 100}%`;
            container.appendChild(bar);
            bars.push(bar);
        }
        return bars;
    }

    /**
     * Update bar heights from array values.
     *
     * @param {HTMLDivElement[]} bars - Bar elements.
     * @param {number[]} arr - Current array values.
     * @returns {void}
     */
    function updateHeights(bars, arr) {
        const maxVal = Math.max(...arr);
        for (let i = 0; i < arr.length; i++) {
            if (bars[i]) {
                bars[i].style.height = `${(arr[i] / maxVal) * 100}%`;
            }
        }
    }

    /**
     * Apply a step visually to a set of bars.
     *
     * @param {{type: string, indices: number[], codeLine: number}} step - The step.
     * @param {HTMLDivElement[]} bars - Bar elements.
     * @param {number[]} arr - Current array.
     * @returns {void}
     */
    function applyStep(step, bars, arr) {
        for (const bar of bars) {
            bar.classList.remove('comparing', 'swapping', 'searching', 'pivot');
        }
        updateHeights(bars, arr);

        const stateMap = {
            compare: 'comparing', swap: 'swapping', overwrite: 'swapping',
            sorted: 'sorted', found: 'found', check: 'searching',
            eliminate: 'comparing', pivot: 'pivot', notFound: null,
        };

        const cls = stateMap[step.type];
        if (cls) {
            for (const idx of step.indices) {
                if (bars[idx]) bars[idx].classList.add(cls);
            }
        }
    }

    /**
     * Mark all bars as sorted.
     *
     * @param {HTMLDivElement[]} bars - Bar elements.
     * @returns {void}
     */
    function markAllSorted(bars) {
        for (const bar of bars) {
            bar.classList.remove('comparing', 'swapping', 'searching', 'pivot');
            bar.classList.add('sorted');
        }
    }

    /**
     * Start comparison run.
     *
     * @param {string} algoKeyA - Algorithm key for side A.
     * @param {string} algoKeyB - Algorithm key for side B.
     * @param {number[]} sourceArray - The source array (will be copied for both).
     * @param {number} searchTarget - Target value for search algorithms.
     * @param {function} getDelay - Function returning current delay in ms.
     * @param {function} onFinish - Called when both algorithms complete.
     * @returns {void}
     */
    function start(algoKeyA, algoKeyB, sourceArray, searchTarget, getDelay, onFinish) {
        stop();
        onFinishCallback = onFinish;

        arrayA = [...sourceArray];
        arrayB = [...sourceArray];
        compsA = compsB = swapsA = swapsB = 0;
        doneA = doneB = false;
        endTimeA = endTimeB = null;

        barsA = renderBars(containerA, arrayA);
        barsB = renderBars(containerB, arrayB);

        genA = createGenerator(algoKeyA, arrayA, searchTarget);
        genB = createGenerator(algoKeyB, arrayB, searchTarget);

        // Update labels and complexity in the compare table
        const infoA = getComplexity(algoKeyA);
        const infoB = getComplexity(algoKeyB);
        setText('cmp-name-a', infoA.name);
        setText('cmp-name-b', infoB.name);
        setText('cmp-avg-a', infoA.average);
        setText('cmp-avg-b', infoB.average);
        setText('cmp-space-a', infoA.space);
        setText('cmp-space-b', infoB.space);
        setText('compare-label-a', infoA.name);
        setText('compare-label-b', infoB.name);
        setText('cmp-time-a', '0.000s');
        setText('cmp-time-b', '0.000s');
        setText('cmp-comps-a', '0');
        setText('cmp-comps-b', '0');
        setText('cmp-swaps-a', '0');
        setText('cmp-swaps-b', '0');

        startTime = performance.now();
        isPlaying = true;
        startElapsedTimer();
        scheduleStep(getDelay);
    }

    /**
     * Create a generator for a given algorithm key.
     *
     * @param {string} key - Algorithm key.
     * @param {number[]} arr - The array.
     * @param {number} target - Search target.
     * @returns {Generator} The generator.
     */
    function createGenerator(key, arr, target) {
        if (SEARCH_KEYS.includes(key)) {
            if (key !== 'linearSearch') arr.sort((a, b) => a - b);
            return SearchingAlgorithms[key](arr, target);
        }
        return SortingAlgorithms[key](arr);
    }

    /**
     * Get complexity info for an algorithm.
     *
     * @param {string} key - Algorithm key.
     * @returns {{name: string, average: string, space: string}} Complexity info.
     */
    function getComplexity(key) {
        return SEARCH_KEYS.includes(key)
            ? SearchingAlgorithms.COMPLEXITY[key]
            : SortingAlgorithms.COMPLEXITY[key];
    }

    /**
     * Schedule the next step for both algorithms.
     *
     * @param {function} getDelay - Returns delay in ms.
     * @returns {void}
     */
    function scheduleStep(getDelay) {
        if (!isPlaying) return;
        timerId = setTimeout(() => {
            stepBoth();
            if (isPlaying && !(doneA && doneB)) {
                scheduleStep(getDelay);
            }
        }, getDelay());
    }

    /**
     * Execute one step for both algorithms.
     *
     * @returns {void}
     */
    function stepBoth() {
        if (!doneA && genA) {
            const r = genA.next();
            if (r.done) {
                doneA = true;
                endTimeA = performance.now();
                markAllSorted(barsA);
            } else {
                trackStats(r.value, 'a');
                applyStep(r.value, barsA, arrayA);
            }
        }

        if (!doneB && genB) {
            const r = genB.next();
            if (r.done) {
                doneB = true;
                endTimeB = performance.now();
                markAllSorted(barsB);
            } else {
                trackStats(r.value, 'b');
                applyStep(r.value, barsB, arrayB);
            }
        }

        updateStatsDisplay();

        if (doneA && doneB) {
            isPlaying = false;
            stopElapsedTimer();
            SoundEngine.playComplete();
            if (onFinishCallback) onFinishCallback();
        }
    }

    /**
     * Track comparison and swap counts.
     *
     * @param {{type: string}} step - The step.
     * @param {'a'|'b'} side - Which side.
     * @returns {void}
     */
    function trackStats(step, side) {
        if (step.type === 'compare' || step.type === 'check') {
            if (side === 'a') compsA++; else compsB++;
        }
        if (step.type === 'swap' || step.type === 'overwrite') {
            if (side === 'a') swapsA++; else swapsB++;
        }
    }

    /**
     * Update the stats display in the compare table.
     *
     * @returns {void}
     */
    function updateStatsDisplay() {
        const now = performance.now();
        const tA = ((endTimeA || now) - startTime) / 1000;
        const tB = ((endTimeB || now) - startTime) / 1000;
        setText('cmp-time-a', tA.toFixed(3) + 's');
        setText('cmp-time-b', tB.toFixed(3) + 's');
        setText('cmp-comps-a', String(compsA));
        setText('cmp-comps-b', String(compsB));
        setText('cmp-swaps-a', String(swapsA));
        setText('cmp-swaps-b', String(swapsB));
    }

    /**
     * Start elapsed time polling.
     *
     * @returns {void}
     */
    function startElapsedTimer() {
        stopElapsedTimer();
        elapsedTimerId = setInterval(updateStatsDisplay, 50);
    }

    /**
     * Stop elapsed time polling.
     *
     * @returns {void}
     */
    function stopElapsedTimer() {
        if (elapsedTimerId) {
            clearInterval(elapsedTimerId);
            elapsedTimerId = null;
        }
    }

    /**
     * Stop compare mode playback.
     *
     * @returns {void}
     */
    function stop() {
        isPlaying = false;
        if (timerId) { clearTimeout(timerId); timerId = null; }
        stopElapsedTimer();
        genA = genB = null;
    }

    /**
     * Helper to set text content by element id.
     *
     * @param {string} id - Element id.
     * @param {string} text - Text content.
     * @returns {void}
     */
    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    return { init, isActive, toggle, start, stop, renderBars };
})();

export default CompareMode;
