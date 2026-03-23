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
     * Render the array as bars inside the container.
     * Each bar's height is proportional to its value relative to the max.
     *
     * @param {number[]} arr - The array of values to render.
     * @returns {void}
     */
    function render(arr) {
        container.innerHTML = '';
        bars = [];
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
     * Update bar heights to reflect current array state without recreating DOM elements.
     *
     * @param {number[]} arr - The current array values.
     * @returns {void}
     */
    function updateHeights(arr) {
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
     * Clear all CSS state classes from every bar.
     *
     * @returns {void}
     */
    function clearStates() {
        for (const bar of bars) {
            bar.classList.remove('comparing', 'swapping', 'sorted', 'found', 'searching', 'pivot');
        }
    }

    /**
     * Apply a visual state to specific bar indices.
     *
     * @param {string} state - The CSS class name to apply.
     * @param {number[]} indices - The bar indices to highlight.
     * @returns {void}
     */
    function applyState(state, indices) {
        for (const idx of indices) {
            if (bars[idx]) {
                bars[idx].classList.add(state);
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
        for (const bar of bars) {
            bar.classList.remove('comparing', 'swapping', 'searching', 'pivot');
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
     * Mark all bars as sorted (final state after algorithm completes).
     *
     * @returns {void}
     */
    function markAllSorted() {
        for (const bar of bars) {
            bar.classList.remove('comparing', 'swapping', 'searching', 'pivot');
            bar.classList.add('sorted');
        }
    }

    return { init, render, updateHeights, clearStates, applyState, processStep, markAllSorted };
})();

export default Visualizer;
