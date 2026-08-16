/**
 * Feedback UI module.
 *
 * Renders a feedback modal with a rating selector, category dropdown,
 * and message textarea. Delegates submission to FeedbackService so
 * the UI is completely decoupled from the storage backend.
 *
 * @module feedback
 */

import FeedbackService from './feedback-service.js';

const RATING_MAX = 5;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 1000;
const SUBMIT_COOLDOWN_MS = 30_000;

/** @type {number|null} Timestamp of the last successful submission. */
let lastSubmitTime = null;

/** @type {boolean} Whether a submission is currently in flight. */
let submitting = false;

/**
 * Validate feedback form data.
 *
 * @param {Object} data
 * @param {number} data.rating   - Selected rating (1-5).
 * @param {string} data.category - Selected category.
 * @param {string} data.message  - Message text.
 * @returns {{ valid: boolean; errors: string[] }}
 */
function validate(data) {
    const errors = [];

    if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > RATING_MAX) {
        errors.push('Please select a rating.');
    }

    const validCategories = ['bug', 'feature', 'general', 'other'];
    if (!validCategories.includes(data.category)) {
        errors.push('Please select a category.');
    }

    if (data.message.length < MESSAGE_MIN_LENGTH) {
        errors.push(`Message must be at least ${MESSAGE_MIN_LENGTH} characters.`);
    }

    if (data.message.length > MESSAGE_MAX_LENGTH) {
        errors.push(`Message must be at most ${MESSAGE_MAX_LENGTH} characters.`);
    }

    if (lastSubmitTime && Date.now() - lastSubmitTime < SUBMIT_COOLDOWN_MS) {
        const remaining = Math.ceil((SUBMIT_COOLDOWN_MS - (Date.now() - lastSubmitTime)) / 1000);
        errors.push(`Please wait ${remaining}s before submitting again.`);
    }

    return { valid: errors.length === 0, errors };
}

/**
 * Gather form data from the DOM.
 *
 * @returns {{ rating: number, category: string, message: string }}
 */
function getFormData() {
    const ratingEl = document.querySelector('.feedback-star.selected');
    const rating = ratingEl ? parseInt(ratingEl.dataset.value, 10) : 0;

    const categoryEl = document.getElementById('feedback-category');
    const category = categoryEl ? categoryEl.value : '';

    const messageEl = document.getElementById('feedback-message');
    const message = messageEl ? messageEl.value.trim() : '';

    return { rating, category, message };
}

/**
 * Reset the form to its initial state.
 *
 * @returns {void}
 */
function resetForm() {
    const stars = document.querySelectorAll('.feedback-star');
    stars.forEach(star => star.classList.remove('selected'));

    const categoryEl = document.getElementById('feedback-category');
    if (categoryEl) categoryEl.selectedIndex = 0;

    const messageEl = document.getElementById('feedback-message');
    if (messageEl) messageEl.value = '';

    const counterEl = document.getElementById('feedback-char-count');
    if (counterEl) counterEl.textContent = '0';

    const errorEl = document.getElementById('feedback-errors');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
    }
}

/**
 * Show the feedback modal.
 *
 * @returns {void}
 */
function showModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) modal.classList.add('active');
}

/**
 * Hide the feedback modal and reset the form.
 *
 * @returns {void}
 */
function hideModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) modal.classList.remove('active');
    resetForm();
}

/**
 * Show inline validation errors.
 *
 * @param {string[]} errors - Array of error messages.
 * @returns {void}
 */
function showErrors(errors) {
    const errorEl = document.getElementById('feedback-errors');
    if (!errorEl) return;
    errorEl.textContent = errors.join(' ');
    errorEl.classList.remove('hidden');
}

/**
 * Show a success toast and close the modal after a delay.
 *
 * @returns {void}
 */
function showSuccess() {
    hideModal();
    const toast = document.getElementById('feedback-toast');
    if (!toast) return;

    toast.textContent = 'Feedback submitted. Thank you!';
    toast.classList.add('active');

    setTimeout(() => toast.classList.remove('active'), 3000);
}

/**
 * Show an error toast when submission fails.
 *
 * @param {string} message - Error message to display.
 * @returns {void}
 */
function showError(message) {
    const toast = document.getElementById('feedback-toast');
    if (!toast) return;

    toast.textContent = message || 'Something went wrong. Please try again.';
    toast.classList.add('active', 'error');

    setTimeout(() => toast.classList.remove('active', 'error'), 4000);
}

/**
 * Handle form submission.
 *
 * Validates the form, submits via FeedbackService, and shows
 * the appropriate result to the user.
 *
 * @returns {Promise<void>}
 */
async function handleSubmit() {
    if (submitting) return;

    const data = getFormData();
    const { valid, errors } = validate(data);

    if (!valid) {
        showErrors(errors);
        return;
    }

    submitting = true;
    const submitBtn = document.getElementById('feedback-submit');
    if (submitBtn) submitBtn.disabled = true;

    try {
        const result = await FeedbackService.submit(data);

        if (result.success) {
            lastSubmitTime = Date.now();
            showSuccess();
        } else {
            showError(result.error);
        }
    } catch {
        showError('Network error. Please check your connection and try again.');
    } finally {
        submitting = false;
        if (submitBtn) submitBtn.disabled = false;
    }
}

/**
 * Bind DOM event listeners for the feedback modal.
 *
 * @returns {void}
 */
function bindEvents() {
    const openBtn = document.getElementById('btn-feedback');
    if (openBtn) openBtn.addEventListener('click', showModal);

    const closeBtn = document.getElementById('feedback-close');
    if (closeBtn) closeBtn.addEventListener('click', hideModal);

    const cancelBtn = document.getElementById('feedback-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', hideModal);

    const submitBtn = document.getElementById('feedback-submit');
    if (submitBtn) submitBtn.addEventListener('click', handleSubmit);

    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    const stars = document.querySelectorAll('.feedback-star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            stars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
        });

        star.addEventListener('mouseenter', () => {
            const value = parseInt(star.dataset.value, 10);
            stars.forEach(s => {
                const sv = parseInt(s.dataset.value, 10);
                if (sv <= value) s.classList.add('hover');
            });
        });
    });

    const starsContainer = document.querySelector('.feedback-stars');
    if (starsContainer) {
        starsContainer.addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('hover'));
        });
    }

    const messageEl = document.getElementById('feedback-message');
    const counterEl = document.getElementById('feedback-char-count');
    if (messageEl && counterEl) {
        messageEl.addEventListener('input', () => {
            counterEl.textContent = messageEl.value.length;
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
    });
}

/**
 * Initialise the feedback module.
 *
 * Sets up the feedback service adapter and binds UI events.
 * Safe to call multiple times (no-op after first call).
 *
 * @returns {void}
 */
function init() {
    FeedbackService.init();
    bindEvents();

    if (!FeedbackService.isReady()) {
        const btn = document.getElementById('btn-feedback');
        if (btn) {
            const group = btn.closest('.controls-group');
            if (group) {
                group.style.display = 'none';
            } else {
                btn.style.display = 'none';
            }
        }
    }
}

const Feedback = { init, showModal, hideModal, validate };
export default Feedback;
