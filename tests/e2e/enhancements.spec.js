import { test, expect } from '@playwright/test';
import { waitForVisualizerReady, selectAlgorithm, clickPlay, setArraySize, TIMEOUTS } from './test-utils.js';

/**
 * Wait for an algorithm to finish by watching the Play button become re-enabled
 * (it gets disabled during playback and re-enabled on completion).
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

test.describe('Enhancements', () => {
    test.use({ actionTimeout: TIMEOUTS.SLOW_SORT });

    test.describe('Visual Polish - Confetti', () => {
        test('shows confetti particles when algorithm completes', async ({ page }) => {
            await page.goto('/');
            await waitForVisualizerReady(page);
            await setArraySize(page, 10);
            await selectAlgorithm(page, 'bubbleSort');
            await clickPlay(page);
            await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

            const particles = page.locator('.confetti-particle');
            await expect(particles.first()).toBeVisible({ timeout: 3000 });
            expect(await particles.count()).toBeGreaterThan(0);
        });

        test('confetti particles are cleaned up after animation', async ({ page }) => {
            await page.goto('/');
            await waitForVisualizerReady(page);
            await setArraySize(page, 10);
            await selectAlgorithm(page, 'bubbleSort');
            await clickPlay(page);
            await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

            await page.waitForTimeout(4000);
            expect(await page.locator('.confetti-particle').count()).toBe(0);
        });
    });

    test.describe('Gamification - Streak', () => {
        test('renders streak counter in controls bar', async ({ page }) => {
            await page.goto('/');
            await waitForVisualizerReady(page);
            const counter = page.locator('#streak-counter');
            await expect(counter).toBeVisible();
        });

        test('increments streak counter after completing an algorithm', async ({ page }) => {
            await page.goto('/');
            await waitForVisualizerReady(page);
            await setArraySize(page, 10);
            await selectAlgorithm(page, 'bubbleSort');
            await clickPlay(page);
            await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

            const streakValue = page.locator('#streak-counter .streak-value');
            await expect(streakValue).toHaveText(/\d+/);
            const count = parseInt(await streakValue.textContent(), 10);
            expect(count).toBeGreaterThanOrEqual(1);
        });
    });

    test.describe('Gamification - Achievements', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto('/');
            await page.evaluate(() => localStorage.removeItem('dsa-visualizer-gamification'));
            await page.reload();
            await waitForVisualizerReady(page);
        });

        test('shows First Sort achievement on first sorting algorithm completion', async ({ page }) => {
            await setArraySize(page, 10);
            await selectAlgorithm(page, 'bubbleSort');
            await clickPlay(page);
            await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

            const toast = page.locator('.achievement-toast').filter({ hasText: 'First Sort' });
            await expect(toast).toBeVisible({ timeout: 5000 });
        });

        test('achievement toast auto-dismisses', async ({ page }) => {
            await setArraySize(page, 10);
            await selectAlgorithm(page, 'bubbleSort');
            await clickPlay(page);
            await waitForAlgorithmDone(page, TIMEOUTS.FAST_SORT);

            const toast = page.locator('.achievement-toast').first();
            await expect(toast).toBeVisible({ timeout: 5000 });
            await page.waitForTimeout(5000);
            await expect(toast).not.toBeVisible();
        });
    });
});
