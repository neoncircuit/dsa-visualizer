/**
 * Visualizer module.
 *
 * Renders the array as colored bars and applies visual state changes
 * (comparing, swapping, sorted, found, etc.) based on algorithm steps.
 */

const Visualizer = (() => {
    /** @type {HTMLElement|null} */
    let container = null;
    /** @type {HTMLDivElement[]} */
    let bars = [];
    /** @type {HTMLDivElement[]} */
    let cells = [];
    /** @type {'bars'|'list'} */
    let mode = 'bars';

    /**
     * Initialize the visualizer with a DOM container reference.
     *
     * @param {HTMLElement} containerEl - The bars container element.
     * @returns {void}
     */
    function init(containerEl) {
        container = containerEl;
    }

    /**
     * Set the visualization mode.
     *
     * @param {'bars'|'list'} newMode - The visualization mode.
     * @returns {void}
     */
    function setMode(newMode) {
        mode = newMode;
    }

    /**
     * Get the current visualization mode.
     *
     * @returns {'bars'|'list'} The current mode.
     */
    function getMode() {
        return mode;
    }

    /**
     * Render the array as bars or list cells inside the container.
     * Each bar's height is proportional to its value relative to the max.
     *
     * @param {number[]} arr - The array of values to render.
     * @returns {void}
     */
    function render(arr) {
        container.innerHTML = '';
        bars = [];
        cells = [];

        if (mode === 'bars') {
            renderBars(arr);
        } else {
            renderList(arr);
        }
    }

    /**
     * Render the array as bars.
     *
     * @param {number[]} arr - The array of values to render.
     * @returns {void}
     */
    function renderBars(arr) {
        container.classList.remove('list-view');
        container.classList.add('bars-view');
        const maxVal = Math.max(...arr);
        const showLabels = arr.length <= 40;

        for (let i = 0; i < arr.length; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(arr[i] / maxVal) * 100}%`;
            if (showLabels) {
                bar.setAttribute('data-value', arr[i]);
            }
            container.appendChild(bar);
            bars.push(bar);
        }
    }

    /**
     * Render the array as list cells.
     *
     * @param {number[]} arr - The array of values to render.
     * @returns {void}
     */
    function renderList(arr) {
        container.classList.remove('bars-view');
        container.classList.add('list-view');

        for (let i = 0; i < arr.length; i++) {
            const cell = document.createElement('div');
            cell.className = 'list-cell';
            cell.textContent = arr[i];
            cell.dataset.index = i;
            container.appendChild(cell);
            cells.push(cell);
        }
    }


    /**
     * Update bar heights or list cell values to reflect current array state without recreating DOM elements.
     *
     * @param {number[]} arr - The current array values.
     * @returns {void}
     */
    function updateHeights(arr) {
        if (mode === 'bars') {
            updateBarsHeights(arr);
        } else {
            updateListValues(arr);
        }
    }

    /**
     * Update bar heights to reflect current array state.
     *
     * @param {number[]} arr - The current array values.
     * @returns {void}
     */
    function updateBarsHeights(arr) {
        const maxVal = Math.max(...arr);
        for (let i = 0; i < arr.length; i++) {
            if (bars[i]) {
                bars[i].style.height = `${(arr[i] / maxVal) * 100}%`;
                if (bars[i].hasAttribute('data-value')) {
                    bars[i].setAttribute('data-value', arr[i]);
                }
            }
        }
    }

    /**
     * Update list cell values to reflect current array state.
     *
     * @param {number[]} arr - The current array values.
     * @returns {void}
     */
    function updateListValues(arr) {
        for (let i = 0; i < arr.length; i++) {
            if (cells[i]) {
                const oldValue = cells[i].textContent;
                if (oldValue !== String(arr[i])) {
                    cells[i].classList.add('updating');
                    cells[i].textContent = arr[i];
                    setTimeout(() => {
                        if (cells[i]) {
                            cells[i].classList.remove('updating');
                        }
                    }, 250);
                }
            }
        }
    }

    /**
     * Clear all CSS state classes from every element.
     *
     * @returns {void}
     */
    function clearStates() {
        const elements = mode === 'bars' ? bars : cells;
        for (const el of elements) {
            el.classList.remove('comparing', 'swapping', 'sorted', 'found', 'searching', 'pivot');
        }
    }

    /**
     * Apply a visual state to specific element indices.
     *
     * @param {string} state - The CSS class name to apply.
     * @param {number[]} indices - The element indices to highlight.
     * @returns {void}
     */
    function applyState(state, indices) {
        const elements = mode === 'bars' ? bars : cells;
        for (const idx of indices) {
            if (elements[idx]) {
                elements[idx].classList.add(state);
            }
        }
    }

    /**
     * Process an algorithm step and update the bar visuals accordingly.
     * Clears transient states (comparing, swapping) but preserves sorted markers.
     *
     * @param {{type: string, indices: number[], codeLine: number}} step - The step object from the algorithm generator.
     * @param {number[]} arr - The current array state.
     * @returns {void}
     */
    function processStep(step, arr) {
        // Only clear non-sorted states to preserve the sorted markers
        const elements = mode === 'bars' ? bars : cells;
        for (const el of elements) {
            el.classList.remove('comparing', 'swapping', 'searching', 'pivot');
        }
        updateHeights(arr);

        /** @type {Object.<string, string|null>} */
        const stateMap = {
            compare: 'comparing',
            swap: 'swapping',
            overwrite: 'swapping',
            sorted: 'sorted',
            found: 'found',
            check: 'searching',
            eliminate: 'comparing',
            pivot: 'pivot',
            notFound: null,
        };

        const cssClass = stateMap[step.type];
        if (cssClass) {
            applyState(cssClass, step.indices);
        }
    }

    /**
     * Mark all elements as sorted (final state after algorithm completes).
     *
     * @returns {void}
     */
    function markAllSorted() {
        const elements = mode === 'bars' ? bars : cells;
        for (const el of elements) {
            el.classList.remove('comparing', 'swapping', 'searching', 'pivot');
            el.classList.add('sorted');
        }
    }

    return { init, render, updateHeights, clearStates, applyState, processStep, markAllSorted, setMode, getMode };
})();

export default Visualizer;
