/**
 * Benchmark module.
 *
 * Provides utilities to run algorithm generator functions to completion
 * synchronously (without rendering) and collect timing and comparison statistics
 * across multiple array sizes and repeated runs.
 */

const Benchmark = (() => {
    'use strict';

    /**
     * Generate a random array of integers in the range [1, 200].
     *
     * @param {number} size - Number of elements to generate.
     * @returns {number[]} The generated array.
     */
    function randomArray(size) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 1);
    }

    /**
     * Generate a sorted array for use with search algorithms that require sorted input.
     *
     * @param {number} size - Number of elements to generate.
     * @returns {number[]} A sorted array of random integers.
     */
    function sortedArray(size) {
        return randomArray(size).sort((a, b) => a - b);
    }

    /**
     * Drain an algorithm generator to completion and count comparison steps.
     * Runs synchronously without any visualization side-effects.
     *
     * @param {Generator} gen - The algorithm generator instance to drain.
     * @returns {number} Total number of 'compare' or 'check' steps encountered.
     */
    function drainGenerator(gen) {
        let comparisons = 0;
        let result = gen.next();
        while (!result.done) {
            const step = result.value;
            if (step && (step.type === 'compare' || step.type === 'check')) {
                comparisons++;
            }
            result = gen.next();
        }
        return comparisons;
    }

    /**
     * Run an algorithm generator function N times on randomised arrays and collect
     * timing and comparison statistics for each specified array size.
     *
     * For search algorithms (isSorted = true), arrays are pre-sorted and a midpoint
     * target is selected to ensure the algorithm works correctly.
     *
     * @param {Function} algoFn - The generator function (e.g. SortingAlgorithms.bubbleSort).
     * @param {number[]} sizes - Array sizes to benchmark.
     * @param {number} runsPerSize - How many independent runs to perform per size.
     * @param {boolean} [isSorted=false] - Whether to pre-sort the array (for search algorithms).
     * @returns {Array<{size: number, min: number, avg: number, max: number, comparisons: number}>}
     *   An array of result objects, one per size, with timing in milliseconds and average comparisons.
     */
    function run(algoFn, sizes, runsPerSize, isSorted = false) {
        /** @type {Array<{size: number, min: number, avg: number, max: number, comparisons: number}>} */
        const results = [];

        for (const size of sizes) {
            const times = [];
            let totalComparisons = 0;

            for (let i = 0; i < runsPerSize; i++) {
                const arr = isSorted ? sortedArray(size) : randomArray(size);

                let gen;
                if (isSorted) {
                    // Pick a target near the middle of the sorted array to give a realistic workload
                    const target = arr[Math.floor(arr.length / 2)];
                    gen = algoFn([...arr], target);
                } else {
                    gen = algoFn([...arr]);
                }

                const t0 = performance.now();
                const comparisons = drainGenerator(gen);
                const elapsed = performance.now() - t0;

                times.push(elapsed);
                totalComparisons += comparisons;
            }

            const min = Math.min(...times);
            const max = Math.max(...times);
            const avg = times.reduce((a, b) => a + b, 0) / times.length;
            const avgComparisons = Math.round(totalComparisons / runsPerSize);

            results.push({ size, min, avg, max, comparisons: avgComparisons });
        }

        return results;
    }

    /**
     * Render benchmark results into a container element.
     * Produces an HTML table of per-size statistics and a CSS bar chart
     * visualising average elapsed time across sizes.
     *
     * @param {HTMLElement} container - The DOM element to write results into.
     * @param {string} algoName - Human-readable algorithm name for the chart title.
     * @param {Array<{size: number, min: number, avg: number, max: number, comparisons: number}>} results
     *   The benchmark result array returned by `run()`.
     * @returns {void}
     */
    function renderResults(container, algoName, results) {
        // ── Table ──────────────────────────────────────────────────────────────
        const table = document.createElement('table');
        table.className = 'benchmark-table';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Size</th>
                <th>Min (ms)</th>
                <th>Avg (ms)</th>
                <th>Max (ms)</th>
                <th>Avg Comparisons</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        for (const row of results) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.size}</td>
                <td>${row.min.toFixed(3)}</td>
                <td>${row.avg.toFixed(3)}</td>
                <td>${row.max.toFixed(3)}</td>
                <td>${row.comparisons.toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        // ── Bar chart ──────────────────────────────────────────────────────────
        const maxAvg = Math.max(...results.map(r => r.avg), 0.001);

        const chartWrapper = document.createElement('div');
        chartWrapper.className = 'benchmark-bar-chart';

        const chartTitle = document.createElement('div');
        chartTitle.className = 'benchmark-chart-title';
        chartTitle.textContent = `Avg Time (ms) — ${algoName}`;
        chartWrapper.appendChild(chartTitle);

        const barsArea = document.createElement('div');
        barsArea.className = 'benchmark-bars-area';

        for (const row of results) {
            const pct = (row.avg / maxAvg) * 100;

            const barGroup = document.createElement('div');
            barGroup.className = 'benchmark-bar-group';

            const label = document.createElement('span');
            label.className = 'benchmark-bar-label';
            label.textContent = `n=${row.size}`;

            const track = document.createElement('div');
            track.className = 'benchmark-bar-track';

            const bar = document.createElement('div');
            bar.className = 'benchmark-bar';
            bar.style.width = `${pct.toFixed(1)}%`;

            const value = document.createElement('span');
            value.className = 'benchmark-bar-value';
            value.textContent = row.avg.toFixed(3) + ' ms';

            track.appendChild(bar);
            barGroup.appendChild(label);
            barGroup.appendChild(track);
            barGroup.appendChild(value);
            barsArea.appendChild(barGroup);
        }

        chartWrapper.appendChild(barsArea);

        // ── Assemble ──────────────────────────────────────────────────────────
        container.innerHTML = '';
        container.appendChild(table);
        container.appendChild(chartWrapper);
    }

    return { run, renderResults };
})();

export default Benchmark;
