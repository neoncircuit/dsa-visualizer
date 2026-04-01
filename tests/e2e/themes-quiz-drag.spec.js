import { test, expect } from '@playwright/test';
import {
    waitForVisualizerReady,
    selectAlgorithm,
    clickPlay,
    setArraySize,
    TIMEOUTS,
} from './test-utils.js';

/**
 * Wait for an algorithm to finish by watching the Play button become re-enabled.
 *
 * @param {import('@playwright/test').Page} page
 * @param {number} timeout
 * @returns {Promise<void>}
 */
async function waitForAlgorithmDone(page, timeout = 30000) {
    await page.waitForFunction(() => {
        const btn = document.getElementById('btn-play');
        return btn && !btn.disabled;
    }, { timeout });
    await page.waitForTimeout(300);
}

test.describe('Themes', () => {
    test.use({ actionTimeout: 10000 });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.removeItem('dsa-visualizer-color-theme'));
        await page.reload();
        await waitForVisualizerReady(page);
        await page.waitForSelector('#color-theme-select', { timeout: 10000 });
    });

    test('renders theme selector dropdown in controls bar', async ({ page }) => {
        const selector = page.locator('#color-theme-select');
        await expect(selector).toBeVisible();
        await expect(selector).toContainText('Default');
        await expect(selector).toContainText('Ocean');
        await expect(selector).toContainText('Forest');
        await expect(selector).toContainText('Sunset');
        await expect(selector).toContainText('Mono');
    });

    test('applies Ocean theme and persists to localStorage', async ({ page }) => {
        await page.selectOption('#color-theme-select', 'ocean');
        const bg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim());
        expect(bg).toBe('#0c1929');

        await page.reload();
        await waitForVisualizerReady(page);
        const restored = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim());
        expect(restored).toBe('#0c1929');
    });

    test('reverts to default theme when selecting Default', async ({ page }) => {
        await page.selectOption('#color-theme-select', 'forest');
        const themed = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim());
        expect(themed).toBe('#0f1f13');

        await page.selectOption('#color-theme-select', '');
        const defaultBg = await page.evaluate(() => {
            document.body.classList.remove('light');
            return getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();
        });
        expect(defaultBg).toBe('#1a1b26');
    });
});

test.describe('Educational - Quiz', () => {
    test.use({ actionTimeout: 10000 });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => {
            localStorage.removeItem('dsa-visualizer-quiz-scores');
            localStorage.setItem('dsa-visualizer-quiz-enabled', 'true');
        });
        await page.reload();
        await waitForVisualizerReady(page);
        await page.waitForSelector('#btn-quiz', { timeout: 5000 });
    });

    test('renders Quiz toggle button in controls bar', async ({ page }) => {
        const btn = page.locator('#btn-quiz');
        await expect(btn).toBeVisible();
    });

    test('shows quiz modal after algorithm completion', async ({ page }) => {
        await setArraySize(page, 10);
        await selectAlgorithm(page, 'bubbleSort');
        await clickPlay(page);
        await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

        const modal = page.locator('.quiz-modal-overlay');
        await expect(modal).toBeVisible({ timeout: 3000 });
    });

    test('displays question and answer options', async ({ page }) => {
        await setArraySize(page, 10);
        await selectAlgorithm(page, 'bubbleSort');
        await clickPlay(page);
        await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

        const modal = page.locator('.quiz-modal-overlay');
        await expect(modal).toBeVisible({ timeout: 3000 });

        await expect(page.locator('.quiz-question')).toBeVisible();
        const options = page.locator('.quiz-option');
        expect(await options.count()).toBeGreaterThanOrEqual(2);
    });

    test('shows correct feedback when answering correctly', async ({ page }) => {
        await setArraySize(page, 10);
        await selectAlgorithm(page, 'bubbleSort');
        await clickPlay(page);
        await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

        await expect(page.locator('.quiz-modal-overlay')).toBeVisible({ timeout: 3000 });

        const correctOption = page.locator('.quiz-option').nth(2);
        await correctOption.click();

        await expect(page.locator('.quiz-feedback-correct')).toBeVisible();
        await expect(page.locator('.quiz-btn-next:not(.hidden)')).toBeVisible();
    });

    test('can close quiz modal without answering', async ({ page }) => {
        await setArraySize(page, 10);
        await selectAlgorithm(page, 'bubbleSort');
        await clickPlay(page);
        await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

        await expect(page.locator('.quiz-modal-overlay')).toBeVisible({ timeout: 3000 });

        await page.click('.quiz-close');
        await expect(page.locator('.quiz-modal-overlay')).not.toBeVisible();
    });

    test('quiz toggle button hides quiz on completion when disabled', async ({ page }) => {
        await page.evaluate(() => localStorage.setItem('dsa-visualizer-quiz-enabled', 'false'));
        await page.reload();
        await waitForVisualizerReady(page);

        await setArraySize(page, 10);
        await selectAlgorithm(page, 'bubbleSort');
        await clickPlay(page);
        await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

        await expect(page.locator('.quiz-modal-overlay')).not.toBeVisible();
    });
});

test.describe('Interactivity - Drag and Drop', () => {
    test.use({ actionTimeout: 10000 });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await waitForVisualizerReady(page);
        await page.waitForSelector('#btn-drag', { timeout: 5000 });
    });

    test('renders Drag toggle button in controls bar', async ({ page }) => {
        const btn = page.locator('#btn-drag');
        await expect(btn).toBeVisible();
    });

    test('bars have draggable attribute', async ({ page }) => {
        const firstBar = page.locator('#bars-container .bar').first();
        const draggable = await firstBar.getAttribute('draggable');
        expect(draggable).toBe('true');
    });

    test('drag toggle button changes state on click', async ({ page }) => {
        const btn = page.locator('#btn-drag');
        await btn.click();
        await expect(btn).not.toHaveClass(/drag-btn-active/);
        await btn.click();
        await expect(btn).toHaveClass(/drag-btn-active/);
    });
});
