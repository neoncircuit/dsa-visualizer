/**
 * Feedback service adapter interface.
 *
 * Defines the contract that all feedback backend adapters must satisfy.
 * The UI layer imports FeedbackService and calls its methods without
 * knowing which backend adapter is in use.
 *
 * To switch backends, change the adapter import in this file only.
 *
 * @module feedback-service
 */

import SupabaseAdapter from './adapters/supabase-adapter.js';

/**
 * @typedef {Object} FeedbackEntry
 * @property {number}   rating          - Rating from 1 to 5.
 * @property {string}   category        - One of 'bug', 'feature', 'general', 'other'.
 * @property {string}   message         - User's feedback text.
 * @property {string}   [pageUrl]       - URL of the page when feedback was submitted.
 * @property {string}   [userAgent]     - Browser user agent string.
 */

/**
 * @typedef {Object} FeedbackResult
 * @property {boolean} success  - Whether the submission succeeded.
 * @property {string}  [id]     - ID of the created record (on success).
 * @property {string}  [error]  - Human-readable error message (on failure).
 */

/**
 * Adapter interface that each backend must implement.
 *
 * @interface FeedbackAdapter
 */

/**
 * Submit a feedback entry to the backend.
 *
 * @function submit
 * @memberof FeedbackAdapter
 * @param {FeedbackEntry} entry - The feedback data to submit.
 * @returns {Promise<FeedbackResult>} Result indicating success or failure.
 */

/**
 * Check whether the adapter is properly configured and ready.
 *
 * @function isReady
 * @memberof FeedbackAdapter
 * @returns {boolean} True if the adapter has valid credentials / config.
 */

/**
 * Name of the adapter (for logging and debugging).
 *
 * @function getName
 * @memberof FeedbackAdapter
 * @returns {string} Adapter identifier, e.g. 'supabase', 'firebase'.
 */

let adapter = null;

/**
 * Initialise the feedback service with a specific adapter.
 *
 * @param {FeedbackAdapter} [customAdapter] - Optional adapter override for testing.
 * @returns {void}
 */
function init(customAdapter) {
    if (customAdapter) {
        adapter = customAdapter;
        return;
    }
    adapter = SupabaseAdapter;
}

/**
 * Submit feedback through the configured adapter.
 *
 * @param {FeedbackEntry} entry - The feedback data to submit.
 * @returns {Promise<FeedbackResult>} Result indicating success or failure.
 */
async function submit(entry) {
    if (!adapter) {
        return { success: false, error: 'Feedback service not initialised.' };
    }
    return adapter.submit(entry);
}

/**
 * Check whether the feedback service is ready to accept submissions.
 *
 * @returns {boolean} True if the adapter is configured and ready.
 */
function isReady() {
    return adapter ? adapter.isReady() : false;
}

/**
 * Get the name of the active adapter.
 *
 * @returns {string} Adapter name, or 'none' if not initialised.
 */
function getName() {
    return adapter ? adapter.getName() : 'none';
}

const FeedbackService = { init, submit, isReady, getName };
export default FeedbackService;
