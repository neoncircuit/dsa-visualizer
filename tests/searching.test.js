/**
 * Unit tests for searching algorithm generators.
 *
 * All searching generators communicate results via the yielded step objects.
 * A step with type 'found' and a non-empty indices array indicates success;
 * a step with type 'notFound' indicates the target was absent.
 *
 * This test suite collects all yielded steps, then inspects the final step to
 * determine whether the search succeeded and which index was reported.
 */

import { describe, it, expect } from 'vitest';
import SearchingAlgorithms from '../src/static/js/algorithms/searching.js';

/**
 * Drive a searching generator to completion, collecting every yielded step.
 *
 * @param {Generator} gen - The searching generator to exhaust.
 * @returns {{ steps: object[], lastStep: object|null }} All yielded steps and the final one.
 */
function runSearchGenerator(gen) {
    const steps = [];
    let result = gen.next();
    while (!result.done) {
        steps.push(result.value);
        result = gen.next();
    }
    return {
        steps,
        lastStep: steps.length > 0 ? steps[steps.length - 1] : null,
    };
}

/**
 * Return the type and index of the conclusive step from a searching generator.
 *
 * @param {Generator} gen - The searching generator.
 * @returns {{ found: boolean, index: number }} Search outcome.
 */
function search(gen) {
    const { lastStep } = runSearchGenerator(gen);
    if (!lastStep) return { found: false, index: -1 };
    if (lastStep.type === 'found') {
        return { found: true, index: lastStep.indices[0] };
    }
    return { found: false, index: -1 };
}

// ─── Shared test suite ───────────────────────────────────────────────────────

/**
 * Run the standard found/not-found test suite for a searching algorithm.
 *
 * @param {string} name - Human-readable algorithm name.
 * @param {number[]} arr - The search array (must be sorted for algorithms that require it).
 * @param {Function} searchFn - The generator factory: (arr, target) => generator.
 */
function runSearchingTests(name, arr, searchFn) {
    describe(name, () => {
        it('finds a target that exists in the array', () => {
            const target = arr[2];
            const { found, index } = search(searchFn(arr, target));
            expect(found).toBe(true);
            expect(arr[index]).toBe(target);
        });

        it('finds a target at the first position', () => {
            const target = arr[0];
            const { found, index } = search(searchFn(arr, target));
            expect(found).toBe(true);
            expect(arr[index]).toBe(target);
        });

        it('finds a target at the last position', () => {
            const target = arr[arr.length - 1];
            const { found, index } = search(searchFn(arr, target));
            expect(found).toBe(true);
            expect(arr[index]).toBe(target);
        });

        it('reports not-found for a target absent from the array', () => {
            const { found } = search(searchFn(arr, 9999));
            expect(found).toBe(false);
        });
    });
}

// ─── Algorithm test suites ───────────────────────────────────────────────────

const SORTED = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

describe('SearchingAlgorithms', () => {
    // Algorithms that work on unsorted arrays
    describe('linearSearch', () => {
        const arr = [5, 3, 8, 1, 9, 2, 7, 4, 6];

        it('finds a target that exists', () => {
            const { found, index } = search(SearchingAlgorithms.linearSearch(arr, 9));
            expect(found).toBe(true);
            expect(arr[index]).toBe(9);
        });

        it('finds the first element', () => {
            const { found, index } = search(SearchingAlgorithms.linearSearch(arr, 5));
            expect(found).toBe(true);
            expect(arr[index]).toBe(5);
        });

        it('finds the last element', () => {
            const { found, index } = search(SearchingAlgorithms.linearSearch(arr, 6));
            expect(found).toBe(true);
            expect(arr[index]).toBe(6);
        });

        it('reports not-found for a missing target', () => {
            const { found } = search(SearchingAlgorithms.linearSearch(arr, 99));
            expect(found).toBe(false);
        });
    });

    describe('sentinelLinearSearch', () => {
        // Requires at least one element (uses arr[n-1] as sentinel slot)
        const arr = [5, 3, 8, 1, 9, 2, 7, 4, 6];

        it('finds a target that exists', () => {
            const { found, index } = search(SearchingAlgorithms.sentinelLinearSearch([...arr], 9));
            expect(found).toBe(true);
        });

        it('reports not-found for a missing target', () => {
            const { found } = search(SearchingAlgorithms.sentinelLinearSearch([...arr], 99));
            expect(found).toBe(false);
        });
    });

    // Algorithms that require sorted arrays
    runSearchingTests(
        'binarySearch',
        [...SORTED],
        (arr, target) => SearchingAlgorithms.binarySearch(arr, target),
    );

    runSearchingTests(
        'jumpSearch',
        [...SORTED],
        (arr, target) => SearchingAlgorithms.jumpSearch(arr, target),
    );

    runSearchingTests(
        'ternarySearch',
        [...SORTED],
        (arr, target) => SearchingAlgorithms.ternarySearch(arr, target),
    );

    runSearchingTests(
        'fibonacciSearch',
        [...SORTED],
        (arr, target) => SearchingAlgorithms.fibonacciSearch(arr, target),
    );

    runSearchingTests(
        'interpolationSearch',
        [...SORTED],
        (arr, target) => SearchingAlgorithms.interpolationSearch(arr, target),
    );

    runSearchingTests(
        'exponentialSearch',
        [...SORTED],
        (arr, target) => SearchingAlgorithms.exponentialSearch(arr, target),
    );
});
