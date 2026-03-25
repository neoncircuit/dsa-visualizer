/**
 * Unit tests for linked-list algorithm generators.
 *
 * All generator functions accept and return head-node references. The pattern
 * for each test is:
 *   1. Build a starting list with buildSampleLinkedList.
 *   2. Drive the generator to completion and capture its return value (the new head).
 *   3. Extract values with getValues and assert the expected structure.
 */

import { describe, it, expect } from 'vitest';
import LinkedListAlgorithms from '../src/static/js/algorithms/linked-lists.js';

/**
 * Drive a generator to completion and return the final return value (new head).
 *
 * @param {Generator} gen - The linked-list generator to exhaust.
 * @returns {object|null} The generator's return value (typically the new head node).
 */
function exhaust(gen) {
    let result = gen.next();
    while (!result.done) {
        result = gen.next();
    }
    return result.value;
}

/**
 * Build a linked list and extract its values as an array for readability.
 *
 * @param {number[]} values - Values to insert. buildSampleLinkedList inserts
 *   each value at the head, so the resulting list is reversed relative to
 *   the input array.
 * @returns {{ head: object|null, list: number[] }} Head node and current values.
 */
function makeList(values) {
    // buildSampleLinkedList inserts each element at the head, producing a
    // list whose order is the reverse of the input array.
    const head = LinkedListAlgorithms.buildSampleLinkedList(values);
    return { head, list: LinkedListAlgorithms.getValues(head) };
}

// ─── llInsertHead ────────────────────────────────────────────────────────────

describe('llInsertHead', () => {
    it('inserts a node at the head of a non-empty list', () => {
        const { head } = makeList([3, 2, 1]); // list: [1, 2, 3]
        const newHead = exhaust(LinkedListAlgorithms.llInsertHead(head, 0));
        expect(LinkedListAlgorithms.getValues(newHead)[0]).toBe(0);
    });

    it('inserts a node into an empty list', () => {
        const newHead = exhaust(LinkedListAlgorithms.llInsertHead(null, 42));
        expect(LinkedListAlgorithms.getValues(newHead)).toEqual([42]);
    });
});

// ─── llInsertTail ────────────────────────────────────────────────────────────

describe('llInsertTail', () => {
    it('appends a node to the tail of a non-empty list', () => {
        const { head } = makeList([3, 2, 1]); // list: [1, 2, 3]
        const newHead = exhaust(LinkedListAlgorithms.llInsertTail(head, 99));
        const values = LinkedListAlgorithms.getValues(newHead);
        expect(values[values.length - 1]).toBe(99);
    });

    it('inserts a node into an empty list', () => {
        const newHead = exhaust(LinkedListAlgorithms.llInsertTail(null, 7));
        expect(LinkedListAlgorithms.getValues(newHead)).toEqual([7]);
    });
});

// ─── llDeleteHead ────────────────────────────────────────────────────────────

describe('llDeleteHead', () => {
    it('removes the head node and returns the new head', () => {
        const { head, list } = makeList([3, 2, 1]); // list: [1, 2, 3]
        const oldHead = list[0];
        const newHead = exhaust(LinkedListAlgorithms.llDeleteHead(head));
        const values = LinkedListAlgorithms.getValues(newHead);
        expect(values).not.toContain(oldHead);
        expect(values[0]).toBe(list[1]);
    });

    it('returns null when deleting the head of a single-element list', () => {
        const { head } = makeList([1]);
        const newHead = exhaust(LinkedListAlgorithms.llDeleteHead(head));
        expect(newHead).toBeNull();
    });

    it('returns null when deleting from an empty list', () => {
        const newHead = exhaust(LinkedListAlgorithms.llDeleteHead(null));
        expect(newHead).toBeNull();
    });
});

// ─── llDeleteTail ────────────────────────────────────────────────────────────

describe('llDeleteTail', () => {
    it('removes the tail node from a multi-element list', () => {
        const { head, list } = makeList([3, 2, 1]); // list: [1, 2, 3]
        const oldTail = list[list.length - 1];
        const newHead = exhaust(LinkedListAlgorithms.llDeleteTail(head));
        const values = LinkedListAlgorithms.getValues(newHead);
        expect(values).not.toContain(oldTail);
        expect(values.length).toBe(list.length - 1);
    });

    it('returns null when deleting the tail of a single-element list', () => {
        const { head } = makeList([1]);
        const newHead = exhaust(LinkedListAlgorithms.llDeleteTail(head));
        expect(newHead).toBeNull();
    });

    it('returns null when deleting from an empty list', () => {
        const newHead = exhaust(LinkedListAlgorithms.llDeleteTail(null));
        expect(newHead).toBeNull();
    });
});

// ─── llSearch ────────────────────────────────────────────────────────────────

describe('llSearch', () => {
    it('returns the node when the value is found', () => {
        const { head } = makeList([3, 2, 1]); // list: [1, 2, 3]
        const found = exhaust(LinkedListAlgorithms.llSearch(head, 2));
        expect(found).not.toBeUndefined();
        expect(found.value).toBe(2);
    });

    it('returns undefined when the value is not found', () => {
        const { head } = makeList([3, 2, 1]);
        const found = exhaust(LinkedListAlgorithms.llSearch(head, 99));
        expect(found).toBeUndefined();
    });
});

// ─── llReverse ───────────────────────────────────────────────────────────────

describe('llReverse', () => {
    it('reverses the order of nodes in a list', () => {
        const { head, list } = makeList([3, 2, 1]); // list: [1, 2, 3]
        const newHead = exhaust(LinkedListAlgorithms.llReverse(head));
        const reversed = LinkedListAlgorithms.getValues(newHead);
        expect(reversed).toEqual([...list].reverse());
    });

    it('returns null for an empty list', () => {
        const newHead = exhaust(LinkedListAlgorithms.llReverse(null));
        expect(newHead).toBeNull();
    });

    it('returns the same single element for a one-element list', () => {
        const { head } = makeList([1]);
        const newHead = exhaust(LinkedListAlgorithms.llReverse(head));
        expect(LinkedListAlgorithms.getValues(newHead)).toEqual([1]);
    });
});
