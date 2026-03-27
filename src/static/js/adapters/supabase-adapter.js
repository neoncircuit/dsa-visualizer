/**
 * Supabase adapter for the feedback service.
 *
 * Sends feedback entries to a Supabase project via its REST API
 * using the native fetch API. Does NOT require the @supabase/supabase-js
 * SDK, keeping the bundle lean.
 *
 * Environment variables (exposed by Vite):
 *   VITE_SUPABASE_URL      - Project URL, e.g. https://abc.supabase.co
 *   VITE_SUPABASE_ANON_KEY - Public anon key for the project.
 *
 * @module adapters/supabase-adapter
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const FEEDBACK_TABLE = 'feedback';

/**
 * Submit a feedback entry to Supabase.
 *
 * @param {import('../feedback-service.js').FeedbackEntry} entry - The feedback data.
 * @returns {Promise<import('../feedback-service.js').FeedbackResult>}
 */
async function submit(entry) {
    const url = `${SUPABASE_URL}/rest/v1/${FEEDBACK_TABLE}`;

    const body = {
        rating: entry.rating,
        category: entry.category,
        message: entry.message,
        page_url: entry.pageUrl || window.location.href,
        user_agent: entry.userAgent || navigator.userAgent,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Prefer': 'return=representation',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            return {
                success: false,
                error: `Server responded with ${response.status}: ${errorBody}`,
            };
        }

        const data = await response.json();
        const id = Array.isArray(data) && data.length > 0 ? data[0].id : null;

        return { success: true, id };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error.',
        };
    }
}

/**
 * Check whether the Supabase adapter has valid credentials.
 *
 * @returns {boolean}
 */
function isReady() {
    return SUPABASE_URL.length > 0 && SUPABASE_ANON_KEY.length > 0;
}

/**
 * Adapter identifier for logging.
 *
 * @returns {string}
 */
function getName() {
    return 'supabase';
}

const SupabaseAdapter = { submit, isReady, getName };
export default SupabaseAdapter;
