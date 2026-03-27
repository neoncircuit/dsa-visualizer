/**
 * Firebase adapter for the feedback service.
 *
 * Sends feedback entries to Firebase Firestore via its REST API
 * using the native fetch API. Does NOT require the Firebase SDK.
 *
 * This adapter is provided as a reference implementation. To use it:
 *   1. Create a Firebase project and enable Firestore.
 *   2. Set VITE_FIREBASE_PROJECT_ID and VITE_FIREBASE_API_KEY in .env.local.
 *   3. Change the import in feedback-service.js from supabase-adapter to firebase-adapter.
 *
 * Environment variables (exposed by Vite):
 *   VITE_FIREBASE_PROJECT_ID - Firebase project identifier.
 *   VITE_FIREBASE_API_KEY    - Firebase API key (safe to expose for Firestore with security rules).
 *   VITE_FIREBASE_COLLECTION - Firestore collection name (default: 'feedback').
 *
 * @module adapters/firebase-adapter
 */

const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || '';
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY || '';
const FIREBASE_COLLECTION = import.meta.env.VITE_FIREBASE_COLLECTION || 'feedback';

/**
 * Submit a feedback entry to Firebase Firestore.
 *
 * @param {import('../feedback-service.js').FeedbackEntry} entry - The feedback data.
 * @returns {Promise<import('../feedback-service.js').FeedbackResult>}
 */
async function submit(entry) {
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${FIREBASE_COLLECTION}`;

    const fields = {
        rating: { integerValue: entry.rating },
        category: { stringValue: entry.category },
        message: { stringValue: entry.message },
        page_url: { stringValue: entry.pageUrl || window.location.href },
        user_agent: { stringValue: entry.userAgent || navigator.userAgent },
        created_at: { timestampValue: new Date().toISOString() },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'key': FIREBASE_API_KEY,
            },
            body: JSON.stringify({ fields }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            return {
                success: false,
                error: `Server responded with ${response.status}: ${errorBody}`,
            };
        }

        const data = await response.json();
        const docId = data.name ? data.name.split('/').pop() : null;

        return { success: true, id: docId };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error.',
        };
    }
}

/**
 * Check whether the Firebase adapter has valid credentials.
 *
 * @returns {boolean}
 */
function isReady() {
    return FIREBASE_PROJECT_ID.length > 0 && FIREBASE_API_KEY.length > 0;
}

/**
 * Adapter identifier for logging.
 *
 * @returns {string}
 */
function getName() {
    return 'firebase';
}

const FirebaseAdapter = { submit, isReady, getName };
export default FirebaseAdapter;
