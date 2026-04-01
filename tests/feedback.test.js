import { describe, it, expect, beforeEach } from 'vitest';
import FeedbackService from '../src/static/js/feedback-service.js';
import Feedback from '../src/static/js/feedback.js';

/**
 * Create a mock adapter for testing FeedbackService.
 *
 * @param {Object}  [opts]                - Override options.
 * @param {Function} [opts.submit]        - Async submit function.
 * @param {boolean}  [opts.isReady=true]  - Whether the adapter is ready.
 * @param {string}   [opts.getName='mock'] - Adapter name.
 * @returns {{ submit: Function, isReady: Function, getName: Function }}
 */
function createMockAdapter(opts = {}) {
    return {
        submit: opts.submit || (async () => ({ success: true, id: 'mock-id' })),
        isReady: () => opts.isReady ?? true,
        getName: opts.getName || (() => 'mock'),
    };
}

// ── FeedbackService ──────────────────────────────────────────────────────────

describe('FeedbackService', () => {
    let mockAdapter;

    beforeEach(() => {
        mockAdapter = createMockAdapter();
        FeedbackService.init(mockAdapter);
    });

    describe('isReady', () => {
        it('returns true when adapter reports ready', () => {
            expect(FeedbackService.isReady()).toBe(true);
        });

        it('returns false when adapter reports not ready', () => {
            FeedbackService.init(createMockAdapter({ isReady: false }));
            expect(FeedbackService.isReady()).toBe(false);
        });
    });

    describe('getName', () => {
        it('returns the adapter name', () => {
            expect(FeedbackService.getName()).toBe('mock');
        });

        it('returns custom adapter name', () => {
            FeedbackService.init(createMockAdapter({ getName: () => 'test-adapter' }));
            expect(FeedbackService.getName()).toBe('test-adapter');
        });
    });

    describe('submit', () => {
        it('delegates to adapter and returns success result', async () => {
            const result = await FeedbackService.submit({
                rating: 5,
                category: 'general',
                message: 'This application is wonderful!',
            });
            expect(result.success).toBe(true);
            expect(result.id).toBe('mock-id');
        });

        it('delegates to adapter and returns error result', async () => {
            FeedbackService.init(
                createMockAdapter({
                    submit: async () => ({ success: false, error: 'Server error' }),
                }),
            );
            const result = await FeedbackService.submit({
                rating: 5,
                category: 'bug',
                message: 'Something is broken here',
            });
            expect(result.success).toBe(false);
            expect(result.error).toBe('Server error');
        });

        it('passes the entry object through to the adapter unchanged', async () => {
            const entry = { rating: 4, category: 'feature', message: 'Add dark mode please' };
            let receivedEntry = null;
            FeedbackService.init(
                createMockAdapter({
                    submit: async (e) => {
                        receivedEntry = e;
                        return { success: true, id: 'id-1' };
                    },
                }),
            );
            await FeedbackService.submit(entry);
            expect(receivedEntry).toEqual(entry);
        });
    });
});

// ── Feedback Validation ──────────────────────────────────────────────────────

describe('Feedback.validate', () => {
    const validMessage = 'This is a valid feedback message';

    it('returns valid for correct data', () => {
        const result = Feedback.validate({ rating: 3, category: 'general', message: validMessage });
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    // ── Rating ──

    it('rejects rating of 0', () => {
        const result = Feedback.validate({ rating: 0, category: 'general', message: validMessage });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Please select a rating.');
    });

    it('rejects negative rating', () => {
        const result = Feedback.validate({ rating: -1, category: 'general', message: validMessage });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Please select a rating.');
    });

    it('rejects rating above 5', () => {
        const result = Feedback.validate({ rating: 6, category: 'general', message: validMessage });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Please select a rating.');
    });

    it('rejects non-integer rating', () => {
        const result = Feedback.validate({ rating: 3.5, category: 'general', message: validMessage });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Please select a rating.');
    });

    it('accepts all valid ratings (1 through 5)', () => {
        for (let r = 1; r <= 5; r++) {
            const result = Feedback.validate({ rating: r, category: 'general', message: validMessage });
            expect(result.errors).not.toContain('Please select a rating.');
        }
    });

    // ── Category ──

    it('rejects invalid category', () => {
        const result = Feedback.validate({ rating: 3, category: 'invalid', message: validMessage });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Please select a category.');
    });

    it('rejects empty category', () => {
        const result = Feedback.validate({ rating: 3, category: '', message: validMessage });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Please select a category.');
    });

    it('accepts all valid categories', () => {
        const categories = ['bug', 'feature', 'general', 'other'];
        for (const category of categories) {
            const result = Feedback.validate({ rating: 3, category, message: validMessage });
            expect(result.errors).not.toContain('Please select a category.');
        }
    });

    // ── Message length ──

    it('rejects message shorter than 10 characters', () => {
        const result = Feedback.validate({ rating: 3, category: 'general', message: 'Too short' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Message must be at least 10 characters.');
    });

    it('rejects message longer than 1000 characters', () => {
        const message = 'a'.repeat(1001);
        const result = Feedback.validate({ rating: 3, category: 'general', message });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Message must be at most 1000 characters.');
    });

    it('accepts message at exactly 10 characters', () => {
        const message = '1234567890';
        const result = Feedback.validate({ rating: 3, category: 'general', message });
        expect(result.errors).not.toContain('Message must be at least 10 characters.');
    });

    it('accepts message at exactly 1000 characters', () => {
        const message = 'a'.repeat(1000);
        const result = Feedback.validate({ rating: 3, category: 'general', message });
        expect(result.errors).not.toContain('Message must be at most 1000 characters.');
    });

    // ── Multiple errors ──

    it('collects all validation errors at once', () => {
        const result = Feedback.validate({ rating: 0, category: 'invalid', message: 'short' });
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(3);
    });

    it('returns empty errors array when data is valid', () => {
        const result = Feedback.validate({ rating: 5, category: 'bug', message: validMessage });
        expect(result.errors).toEqual([]);
    });
});
