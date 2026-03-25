/**
 * Unit tests for core sorting algorithm generators.
 *
 * Each test drives a generator to completion and asserts the array has been
 * sorted in-place, because all sorting generators mutate their input array
 * by reference and do not return a new array.
 */

import { describe, it, expect } from 'vitest';
import SortingAlgorithms from '../src/static/js/algorithms/sorting.js';

/**
 * Drive a generator to completion, discarding every yielded step.
 *
 * @param {Generator} gen - The generator to exhaust.
 * @returns {*} The generator's final return value.
 */
function exhaust(gen) {
    let result = gen.next();
    while (!result.done) {
        result = gen.next();
    }
    return result.value;
}

// ─── Shared test cases ──────────────────────────────────────────────────────

/**
 * Run the standard suite of edge-case and normal-case tests for a single
 * sorting algorithm.
 *
 * @param {string} name - Human-readable algorithm name used in test labels.
 * @param {Function} sortFn - The generator function under test.
 */
function runSortingTests(name, sortFn) {
    describe(name, () => {
        it('sorts a mixed array into ascending order', () => {
            const arr = [5, 3, 8, 1, 9, 2];
            exhaust(sortFn(arr));
            expect(arr).toEqual([1, 2, 3, 5, 8, 9]);
        });

        it('handles an already-sorted array', () => {
            const arr = [1, 2, 3, 4, 5];
            exhaust(sortFn(arr));
            expect(arr).toEqual([1, 2, 3, 4, 5]);
        });

        it('handles a reverse-sorted array', () => {
            const arr = [9, 7, 5, 3, 1];
            exhaust(sortFn(arr));
            expect(arr).toEqual([1, 3, 5, 7, 9]);
        });

        it('handles a single-element array', () => {
            const arr = [42];
            exhaust(sortFn(arr));
            expect(arr).toEqual([42]);
        });

        it('handles an empty array', () => {
            const arr = [];
            exhaust(sortFn(arr));
            expect(arr).toEqual([]);
        });

        it('handles duplicate values', () => {
            const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
            exhaust(sortFn(arr));
            expect(arr).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 6, 9]);
        });
    });
}

// ─── Algorithm test suites ───────────────────────────────────────────────────

describe('SortingAlgorithms', () => {
    runSortingTests('bubbleSort', (arr) => SortingAlgorithms.bubbleSort(arr));
    runSortingTests('selectionSort', (arr) => SortingAlgorithms.selectionSort(arr));
    runSortingTests('insertionSort', (arr) => SortingAlgorithms.insertionSort(arr));
    runSortingTests('mergeSort', (arr) => SortingAlgorithms.mergeSort(arr));
    runSortingTests('quickSort', (arr) => SortingAlgorithms.quickSort(arr));
    runSortingTests('heapSort', (arr) => SortingAlgorithms.heapSort(arr));
    runSortingTests('shellSort', (arr) => SortingAlgorithms.shellSort(arr));
    runSortingTests('countingSort', (arr) => SortingAlgorithms.countingSort(arr));
});
