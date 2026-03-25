/**
 * Unit tests for BST (Binary Search Tree) algorithm generators.
 *
 * The generators communicate results via yielded step objects.  An inserted
 * node is confirmed by reading the tree structure with getValues (in-order
 * traversal).  A successful search ends with a 'found' step; a failed search
 * ends with a 'notFound' step.
 */

import { describe, it, expect } from 'vitest';
import TreeAlgorithms from '../src/static/js/algorithms/trees.js';

/**
 * Drive a generator to completion, collecting all yielded steps.
 *
 * @param {Generator} gen - The tree generator to exhaust.
 * @returns {{ steps: object[], returnValue: * }} All steps and the generator's return value.
 */
function exhaust(gen) {
    const steps = [];
    let result = gen.next();
    while (!result.done) {
        steps.push(result.value);
        result = gen.next();
    }
    return { steps, returnValue: result.value };
}

/**
 * Return the type of the final yielded step from a generator.
 *
 * @param {Generator} gen - The generator to exhaust.
 * @returns {string|null} The type of the last step, or null if no steps were yielded.
 */
function lastStepType(gen) {
    const { steps } = exhaust(gen);
    return steps.length > 0 ? steps[steps.length - 1].type : null;
}

// ─── bstInsert ───────────────────────────────────────────────────────────────

describe('bstInsert', () => {
    it('inserts a new value into a BST and makes it reachable via in-order traversal', () => {
        const root = TreeAlgorithms.buildSampleBST([5, 3, 7, 1, 4]);
        // In-order before insert: [1, 3, 4, 5, 7]
        const { returnValue: newRoot } = exhaust(TreeAlgorithms.bstInsert(root, 6));
        const values = TreeAlgorithms.getValues(newRoot);
        expect(values).toContain(6);
        // In-order traversal should remain sorted after insertion
        expect(values).toEqual([...values].sort((a, b) => a - b));
    });

    it('inserts into an empty tree (null root) and returns the new node', () => {
        const { returnValue: newRoot } = exhaust(TreeAlgorithms.bstInsert(null, 10));
        expect(newRoot).not.toBeNull();
        expect(newRoot.value).toBe(10);
    });

    it('does not duplicate an existing value', () => {
        const root = TreeAlgorithms.buildSampleBST([5, 3, 7]);
        const { returnValue: newRoot } = exhaust(TreeAlgorithms.bstInsert(root, 5));
        const values = TreeAlgorithms.getValues(newRoot);
        const count = values.filter((v) => v === 5).length;
        expect(count).toBe(1);
    });

    it('produces a BST that is correctly ordered after multiple inserts', () => {
        const root = TreeAlgorithms.buildSampleBST([5, 3, 7, 1, 4]);
        const { returnValue: r1 } = exhaust(TreeAlgorithms.bstInsert(root, 6));
        const { returnValue: r2 } = exhaust(TreeAlgorithms.bstInsert(r1, 2));
        const values = TreeAlgorithms.getValues(r2);
        expect(values).toEqual([...values].sort((a, b) => a - b));
    });
});

// ─── bstSearch ───────────────────────────────────────────────────────────────

describe('bstSearch', () => {
    it('yields a found step when searching for an existing value', () => {
        const root = TreeAlgorithms.buildSampleBST([5, 3, 7, 1, 4]);
        const type = lastStepType(TreeAlgorithms.bstSearch(root, 3));
        expect(type).toBe('found');
    });

    it('yields a found step for the root value', () => {
        const root = TreeAlgorithms.buildSampleBST([5, 3, 7, 1, 4]);
        const type = lastStepType(TreeAlgorithms.bstSearch(root, 5));
        expect(type).toBe('found');
    });

    it('yields a found step for a leaf value', () => {
        const root = TreeAlgorithms.buildSampleBST([5, 3, 7, 1, 4]);
        const type = lastStepType(TreeAlgorithms.bstSearch(root, 1));
        expect(type).toBe('found');
    });

    it('yields a notFound step when searching for a missing value', () => {
        const root = TreeAlgorithms.buildSampleBST([5, 3, 7, 1, 4]);
        const type = lastStepType(TreeAlgorithms.bstSearch(root, 99));
        expect(type).toBe('notFound');
    });

    it('yields a notFound step when searching an empty tree', () => {
        const type = lastStepType(TreeAlgorithms.bstSearch(null, 5));
        expect(type).toBe('notFound');
    });
});
