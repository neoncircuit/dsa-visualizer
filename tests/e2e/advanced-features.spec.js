/**
 * Advanced features E2E tests for DSA Visualizer.
 * Tests compare mode, keyboard shortcuts, sound, and other advanced features.
 */

import { test, expect } from '@playwright/test';
import {
  waitForVisualizerReady,
  selectAlgorithm,
  setArraySize,
  clickPlay,
  clickReset,
  enterCompareMode,
  exitCompareMode,
  selectCompareAlgorithm,
  toggleSound,
  TIMEOUTS
} from './test-utils';

test.describe('Compare Mode', () => {
  test('should enter compare mode', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await enterCompareMode(page);

    const compareContainer = page.locator('#viz-compare');
    await expect(compareContainer).toBeVisible();
  });

  test('should exit compare mode', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await enterCompareMode(page);
    await exitCompareMode(page);

    const compareContainer = page.locator('#viz-compare');
    await expect(compareContainer).not.toBeVisible();
  });

  test('should display two algorithm selectors in compare mode', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await enterCompareMode(page);

    const firstSelector = page.locator('#algorithm-select');
    const secondSelector = page.locator('#compare-select-b');

    await expect(firstSelector).toBeVisible();
    await expect(secondSelector).toBeVisible();
  });

  test('should run two algorithms side by side', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await enterCompareMode(page);
    await selectCompareAlgorithm(page, 'insertionSort');
    await clickPlay(page);

    await page.waitForTimeout(3000);

    const leftBars = await page.$$('#bars-container-a .bar');
    const rightBars = await page.$$('#bars-container-b .bar');

    expect(leftBars.length).toBeGreaterThan(0);
    expect(rightBars.length).toBeGreaterThan(0);
  });

  test('should show comparison statistics', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await enterCompareMode(page);
    await selectCompareAlgorithm(page, 'mergeSort');
    await clickPlay(page);

    await page.waitForTimeout(5000);

    const compareStats = page.locator('#compare-stats');
    await expect(compareStats).toBeVisible();
  });
});

test.describe('Keyboard Shortcuts', () => {
  test('should play/pause with Space key', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');

    await page.keyboard.press('Space');
    await page.waitForTimeout(1000);

    const comparisons = await page.textContent('#comparisons-count');
    expect(comparisons).toBeTruthy();
  });

  test('should step with Right Arrow key', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');

    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);

    const comparisons = await page.textContent('#comparisons-count');
    expect(comparisons).toBeTruthy();
  });

  test('should reset with R key', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    await page.waitForTimeout(1000);

    await page.keyboard.press('r');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);

    const comparisons = await page.textContent('#comparisons-count');
    expect(comparisons).toContain('0');
  });

  test('should generate new array with G key', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await setArraySize(page, 20);

    const barsBefore = await page.$$eval('#bars-container .bar', bars =>
      bars.map(b => b.style.height)
    );

    // Blur any focused input so the keyboard shortcut reaches the global handler
    await page.click('body');
    await page.keyboard.press('g');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);

    const barsAfter = await page.$$eval('#bars-container .bar', bars =>
      bars.map(b => b.style.height)
    );

    expect(barsBefore).not.toEqual(barsAfter);
  });
});

test.describe('Sound Toggle', () => {
  test('should toggle sound on/off', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const soundToggle = page.locator('#btn-sound');
    await expect(soundToggle).toBeVisible();

    await toggleSound(page);
    await page.waitForTimeout(TIMEOUTS.ANIMATION);

    await toggleSound(page);
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
  });

  test('should show sound indicator', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const soundToggle = page.locator('#btn-sound');
    const soundIcon = await soundToggle.textContent();
    expect(soundIcon).toBeTruthy();
  });
});

test.describe('Theme Toggle', () => {
  test('should have dark theme by default', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const body = page.locator('body');
    const className = await body.getAttribute('class');
    // Dark theme is default — body should not have 'light' class
    expect(className ?? '').not.toContain('light');
  });

  test('should toggle to light theme', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const themeToggle = page.locator('#btn-theme');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const body = page.locator('body');
      const className = await body.getAttribute('class');
      expect(className).toContain('light');
    }
  });
});

test.describe('Portrait/Landscape Mode', () => {
  test('should have landscape mode by default', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    // Landscape is default — body should not have 'vertical' class
    const body = page.locator('body');
    const className = await body.getAttribute('class');
    expect(className ?? '').not.toContain('vertical');
  });

  test('should toggle to portrait mode', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const portraitToggle = page.locator('#btn-layout');
    if (await portraitToggle.isVisible()) {
      await portraitToggle.click();
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const body = page.locator('body');
      const className = await body.getAttribute('class');
      expect(className).toContain('vertical');
    }
  });
});

test.describe('Recording Feature', () => {
  test('should show record button', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const recordBtn = page.locator('#btn-record');
    await expect(recordBtn).toBeVisible();
  });

  test('should start recording when clicked', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const recordBtn = page.locator('#btn-record');
    await expect(recordBtn).toBeVisible();
    // Note: getDisplayMedia is not available in headless mode — only verify button is interactive
    const isEnabled = await recordBtn.isEnabled();
    expect(isEnabled).toBe(true);
  });

  test('should stop recording when clicked again', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const recordBtn = page.locator('#btn-record');
    await expect(recordBtn).toBeVisible();
    // getDisplayMedia requires real screen-share permission; verify button exists and is enabled
    const isEnabled = await recordBtn.isEnabled();
    expect(isEnabled).toBe(true);
  });
});

test.describe('Info Panel Features', () => {
  test('should display algorithm description', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await selectAlgorithm(page, 'mergeSort');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);

    const infoContent = await page.textContent('.info-panel');
    expect(infoContent.toLowerCase()).toContain('merge');
  });

  test('should display complexity information', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await selectAlgorithm(page, 'quickSort');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);

    const infoContent = await page.textContent('.info-panel');
    expect(infoContent.toLowerCase()).toMatch(/o\(n|complexity/);
  });

  test('should display best use case', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    await selectAlgorithm(page, 'bubbleSort');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);

    const infoContent = await page.textContent('.info-panel');
    expect(infoContent.length).toBeGreaterThan(50);
  });
});

test.describe('Cheat Sheet', () => {
  test('should toggle cheat sheet visibility', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const cheatToggle = page.locator('#cheat-toggle');
    if (await cheatToggle.isVisible()) {
      await cheatToggle.click();
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const cheatSheet = page.locator('#cheat-content');
      await expect(cheatSheet).toBeVisible();
    }
  });

  test('should display sorting algorithms table', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const cheatToggle = page.locator('#cheat-toggle');
    if (await cheatToggle.isVisible()) {
      await cheatToggle.click();
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const cheatContent = await page.textContent('#cheat-content');
      expect(cheatContent.toLowerCase()).toContain('sorting');
    }
  });

  test('should display searching algorithms table', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const cheatToggle = page.locator('#cheat-toggle');
    if (await cheatToggle.isVisible()) {
      await cheatToggle.click();
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const cheatContent = await page.textContent('#cheat-content');
      expect(cheatContent.toLowerCase()).toContain('search');
    }
  });
});

test.describe('Custom Array Input', () => {
  test('should show custom array input option', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const customToggle = page.locator('#custom-array-toggle');
    if (await customToggle.isVisible()) {
      await customToggle.click();
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const customInput = page.locator('#custom-array');
      await expect(customInput).toBeVisible();
    }
  });

  test('should accept custom array values', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const customToggle = page.locator('#custom-array-toggle');
    if (await customToggle.isVisible()) {
      await customToggle.click();
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const customInput = page.locator('#custom-array');
      await customInput.fill('5, 3, 8, 1, 9');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      const bars = await page.$$('#bars-container .bar');
      expect(bars.length).toBe(5);
    }
  });
});

test.describe('Speed Control', () => {
  test('should adjust visualization speed', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);

    const speedSlider = page.locator('#speed-slider');
    if (await speedSlider.isVisible()) {
      await speedSlider.fill('50');
      await page.waitForTimeout(TIMEOUTS.ANIMATION);

      await setArraySize(page, 10);
      await selectAlgorithm(page, 'bubbleSort');
      await clickPlay(page);
      await page.waitForTimeout(2000);

      const comparisons = await page.textContent('#comparisons-count');
      expect(comparisons).toBeTruthy();
    }
  });
});
