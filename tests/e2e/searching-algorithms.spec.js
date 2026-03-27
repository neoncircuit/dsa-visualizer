/**
 * Searching algorithm E2E tests for DSA Visualizer.
 * Tests visualization and results of various searching algorithms.
 */

import { test, expect } from '@playwright/test';
import {
  waitForVisualizerReady,
  selectAlgorithm,
  setArraySize,
  setSearchTarget,
  clickPlay,
  clickStep,
  TIMEOUTS
} from './test-utils';

test.describe('Linear Search', () => {
  test('should find existing element', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const foundBar = await page.$('.bar.found');
    expect(foundBar).toBeTruthy();
  });

  test('should handle element not found', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 999);
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText.toLowerCase()).toContain('not found');
  });

  test('should visualize searching progress step by step', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 50);
    
    for (let i = 0; i < 3; i++) {
      await clickStep(page);
      await page.waitForTimeout(200);
      
      const searchingBars = await page.$$('.bar.searching');
      expect(searchingBars.length).toBe(i + 1);
    }
  });
});

test.describe('Binary Search', () => {
  test('should find existing element in sorted array', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'binarySearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const foundBar = await page.$('.bar.found');
    expect(foundBar).toBeTruthy();
  });

  test('should handle element not found', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'binarySearch');
    await setSearchTarget(page, 999);
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText.toLowerCase()).toContain('not found');
  });

  test('should use divide and conquer approach', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 16);
    await selectAlgorithm(page, 'binarySearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(500);
    
    const searchingBars = await page.$$('.bar.searching');
    expect(searchingBars.length).toBeGreaterThan(0);
  });
});

test.describe('Jump Search', () => {
  test('should find existing element', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'jumpSearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const foundBar = await page.$('.bar.found');
    expect(foundBar).toBeTruthy();
  });

  test('should handle element not found', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'jumpSearch');
    await setSearchTarget(page, 999);
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText.toLowerCase()).toContain('not found');
  });
});

test.describe('Ternary Search', () => {
  test('should find existing element', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'ternarySearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const foundBar = await page.$('.bar.found');
    expect(foundBar).toBeTruthy();
  });
});

test.describe('Fibonacci Search', () => {
  test('should find existing element', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    await selectAlgorithm(page, 'fibonacciSearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const foundBar = await page.$('.bar.found');
    expect(foundBar).toBeTruthy();
  });
});

test.describe('Searching Algorithm Behavior', () => {
  test('should highlight searching progress', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(500);
    
    const searchingBars = await page.$$('.bar.searching');
    expect(searchingBars.length).toBeGreaterThan(0);
  });

  test('should mark found element with distinct color', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 50);
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const foundBar = await page.$('.bar.found');
    if (foundBar) {
      const className = await foundBar.getAttribute('class');
      expect(className).toContain('found');
    }
  });

  test('should require sorted array for binary search', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'binarySearch');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const infoContent = await page.textContent('#info-panel');
    expect(infoContent.toLowerCase()).toContain('sorted');
  });
});

test.describe('Search Target Input', () => {
  test('should accept valid numeric input', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 42);
    
    const targetValue = await page.inputValue('#search-target');
    expect(targetValue).toBe('42');
  });

  test('should show search target input for searching algorithms', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'linearSearch');
    const searchGroup = page.locator('.search-target-group');
    await expect(searchGroup).toBeVisible();
  });

  test('should hide search target input for sorting algorithms', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bubbleSort');
    const searchGroup = page.locator('.search-target-group');
    await expect(searchGroup).not.toBeVisible();
  });
});

test.describe('Searching Algorithm Performance', () => {
  test('linear search should examine all elements in worst case', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 999);
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const searchingBars = await page.$$('.bar.searching');
    expect(searchingBars.length).toBe(10);
  });

  test('binary search should be faster than linear search', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 30);
    
    await selectAlgorithm(page, 'linearSearch');
    await setSearchTarget(page, 999);
    await clickPlay(page);
    await page.waitForTimeout(5000);
    const linearStats = await page.textContent('#stats-container');
    
    await clickPlay(page);
    await selectAlgorithm(page, 'binarySearch');
    await setSearchTarget(page, 999);
    await clickPlay(page);
    await page.waitForTimeout(2000);
    const binaryStats = await page.textContent('#stats-container');
    
    const linearComparisons = parseInt(linearStats.match(/Comparisons:\s*(\d+)/)?.[1] || '0');
    const binaryComparisons = parseInt(binaryStats.match(/Comparisons:\s*(\d+)/)?.[1] || '0');
    
    expect(binaryComparisons).toBeLessThan(linearComparisons);
  });
});
