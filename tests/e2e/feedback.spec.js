import { test, expect } from '@playwright/test';

test.describe('Feedback', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        await page.evaluate(() => {
            const btn = document.getElementById('btn-feedback');
            if (btn) btn.style.display = '';
        });
    });

    // ── Modal open / close ──

    test('opens modal when feedback button is clicked', async ({ page }) => {
        await page.click('#btn-feedback');
        await expect(page.locator('#feedback-modal')).toHaveClass(/active/);
        await expect(page.locator('.feedback-modal-inner h2')).toHaveText('Send Feedback');
    });

    test('closes modal via close button', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.click('#feedback-close');
        await expect(page.locator('#feedback-modal')).not.toHaveClass(/active/);
    });

    test('closes modal via cancel button', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.click('#feedback-cancel');
        await expect(page.locator('#feedback-modal')).not.toHaveClass(/active/);
    });

    test('closes modal via Escape key', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.keyboard.press('Escape');
        await expect(page.locator('#feedback-modal')).not.toHaveClass(/active/);
    });

    test('closes modal by clicking overlay', async ({ page }) => {
        await page.click('#btn-feedback');
        const modal = page.locator('#feedback-modal');
        await modal.click({ position: { x: 10, y: 10 } });
        await expect(page.locator('#feedback-modal')).not.toHaveClass(/active/);
    });

    // ── Star rating ──

    test('selects a star rating on click', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.click('.feedback-star[data-value="4"]');
        const selected = page.locator('.feedback-star.selected');
        await expect(selected).toHaveCount(1);
        await expect(selected).toHaveAttribute('data-value', '4');
    });

    test('changes selected star when clicking a different one', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.click('.feedback-star[data-value="2"]');
        await page.click('.feedback-star[data-value="5"]');
        const selected = page.locator('.feedback-star.selected');
        await expect(selected).toHaveCount(1);
        await expect(selected).toHaveAttribute('data-value', '5');
    });

    test('highlights stars on hover', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.hover('.feedback-star[data-value="3"]');
        await expect(page.locator('.feedback-star.hover')).toHaveCount(3);
    });

    test('removes hover highlight when mouse leaves stars container', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.hover('.feedback-star[data-value="3"]');
        await page.hover('#feedback-category');
        await expect(page.locator('.feedback-star.hover')).toHaveCount(0);
    });

    // ── Message input ──

    test('updates character counter as user types', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.fill('#feedback-message', 'Hello world');
        await expect(page.locator('#feedback-char-count')).toHaveText('11');
    });

    test('character counter resets when modal is closed', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.fill('#feedback-message', 'Hello world');
        await page.click('#feedback-close');
        await page.click('#btn-feedback');
        await expect(page.locator('#feedback-char-count')).toHaveText('0');
        await expect(page.locator('#feedback-message')).toHaveValue('');
    });

    // ── Validation ──

    test('shows validation errors when submitting empty form', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.click('#feedback-submit');
        await expect(page.locator('#feedback-errors')).toBeVisible();
    });

    test('shows error when no rating is selected', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.selectOption('#feedback-category', 'general');
        await page.fill('#feedback-message', 'This is a valid message');
        await page.click('#feedback-submit');
        const errors = await page.locator('#feedback-errors').textContent();
        expect(errors).toContain('select a rating');
    });

    test('shows error when message is too short', async ({ page }) => {
        await page.click('#btn-feedback');
        await page.click('.feedback-star[data-value="3"]');
        await page.fill('#feedback-message', 'Too short');
        await page.click('#feedback-submit');
        const errors = await page.locator('#feedback-errors').textContent();
        expect(errors).toContain('at least 10 characters');
    });

    // ── Submission (mocked API) ──

    test('shows success toast on valid submission', async ({ page }) => {
        await page.route('**/rest/v1/feedback', async (route) => {
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify([{ id: 'test-id' }]),
            });
        });

        await page.click('#btn-feedback');
        await page.click('.feedback-star[data-value="5"]');
        await page.selectOption('#feedback-category', 'general');
        await page.fill('#feedback-message', 'This is a great application for learning algorithms!');
        await page.click('#feedback-submit');

        await expect(page.locator('#feedback-toast')).toHaveClass(/active/);
        await expect(page.locator('#feedback-toast')).toContainText('Thank you');
    });

    test('shows error toast when server returns 500', async ({ page }) => {
        await page.route('**/rest/v1/feedback', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'text/plain',
                body: 'Internal Server Error',
            });
        });

        await page.click('#btn-feedback');
        await page.click('.feedback-star[data-value="3"]');
        await page.selectOption('#feedback-category', 'bug');
        await page.fill('#feedback-message', 'Found a bug in the sorting visualization');
        await page.click('#feedback-submit');

        await expect(page.locator('#feedback-toast')).toHaveClass(/error/);
    });

    test('closes modal and resets form after successful submission', async ({ page }) => {
        await page.route('**/rest/v1/feedback', async (route) => {
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify([{ id: 'test-id' }]),
            });
        });

        await page.click('#btn-feedback');
        await page.click('.feedback-star[data-value="4"]');
        await page.selectOption('#feedback-category', 'feature');
        await page.fill('#feedback-message', 'Would love to see more algorithms added');
        await page.click('#feedback-submit');

        await expect(page.locator('#feedback-modal')).not.toHaveClass(/active/);
    });
});
