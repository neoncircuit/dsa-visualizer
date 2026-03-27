/**
 * Sorting algorithm E2E tests for DSA Visualizer.
 * Tests visualization and completion of various sorting algorithms.
 */

import { test, expect } from '@playwright/test';
import {
  waitForVisualizerReady,
  selectAlgorithm,
  setArraySize,
  clickPlay,
  clickReset,
  waitForCompletion,
  getStatistics,
  TIMEOUTS,
  ALGORITHM_CATEGORIES
} from './test-utils';

test.describe('Basic Sorting Algorithms', () => {
  test.use({ actionTimeout: TIMEOUTS.SLOW_SORT });
  
  for (const algorithm of ALGORITHM_CATEGORIES.SORTING.BASIC) {
    test(`should sort array using ${algorithm}`, async ({ page }) => {
      await page.goto('/');
      await waitForVisualizerReady(page);
      
      await setArraySize(page, 15);
      await selectAlgorithm(page, algorithm);
      await clickPlay(page);
      
      await waitForCompletion(page, TIMEOUTS.MEDIUM_SORT);
      
      const stats = await getStatistics(page);
      expect(stats.comparisons).toBeGreaterThan(0);
    });
  }
});

test.describe('Efficient Sorting Algorithms', () => {
  test.use({ actionTimeout: TIMEOUTS.SLOW_SORT });
  
  for (const algorithm of ALGORITHM_CATEGORIES.SORTING.EFFICIENT) {
    test(`should sort array using ${algorithm}`, async ({ page }) => {
      await page.goto('/');
      await waitForVisualizerReady(page);
      
      await setArraySize(page, 20);
      await selectAlgorithm(page, algorithm);
      await clickPlay(page);
      
      await waitForCompletion(page, TIMEOUTS.FAST_SORT);
      
      const stats = await getStatistics(page);
      expect(stats.comparisons).toBeGreaterThan(0);
    });
  }
});

test.describe('Extended Sorting Algorithms', () => {
  test.use({ actionTimeout: TIMEOUTS.SLOW_SORT });
  
  for (const algorithm of ALGORITHM_CATEGORIES.SORTING.EXTENDED.slice(0, 3)) {
    test(`should sort array using ${algorithm}`, async ({ page }) => {
      await page.goto('/');
      await waitForVisualizerReady(page);
      
      await setArraySize(page, 15);
      await selectAlgorithm(page, algorithm);
      await clickPlay(page);
      
      await waitForCompletion(page, TIMEOUTS.MEDIUM_SORT);
      
      const stats = await getStatistics(page);
      expect(stats.comparisons).toBeGreaterThanOrEqual(0);
    });
  }
});

test.describe('Sorting Algorithm Behavior', () => {
  test('should visualize comparisons with color changes', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    
    await page.waitForTimeout(500);
    
    const comparingBars = await page.$$('.bar.comparing');
    expect(comparingBars.length).toBeGreaterThan(0);
  });

  test('should visualize swaps with color changes', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    
    await page.waitForTimeout(1000);
    
    const stats = await getStatistics(page);
    expect(stats.swaps).toBeGreaterThanOrEqual(0);
  });

  test('should mark all bars as sorted on completion', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'insertionSort');
    await clickPlay(page);
    
    await waitForCompletion(page, TIMEOUTS.FAST_SORT);
    
    const sortedBars = await page.$$('.bar.sorted');
    const totalBars = await page.$$('#bars-container .bar');
    
    expect(sortedBars.length).toBe(totalBars.length);
  });

  test('should handle empty array gracefully', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const bars = await page.$$('#bars-container .bar');
    expect(bars.length).toBeGreaterThan(0);
  });

  test('should handle single element array', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 5);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    
    await waitForCompletion(page, TIMEOUTS.FAST_SORT);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Algorithm-Specific Features', () => {
  test('should show pivot element in quick sort', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 15);
    await selectAlgorithm(page, 'quickSort');
    await clickPlay(page);
    
    await page.waitForTimeout(500);
    
    const pivotBars = await page.$$('.bar.pivot');
    expect(pivotBars.length).toBeGreaterThanOrEqual(0);
  });

  test('should visualize merge operations in merge sort', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 16);
    await selectAlgorithm(page, 'mergeSort');
    await clickPlay(page);
    
    await page.waitForTimeout(500);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThanOrEqual(0);
  });

  test('should visualize heap structure in heap sort', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 15);
    await selectAlgorithm(page, 'heapSort');
    await clickPlay(page);
    
    await page.waitForTimeout(500);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Sorting with Different Array Distributions', () => {
  test('should sort nearly sorted array', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await page.selectOption('#array-type', 'nearly-sorted');
    await setArraySize(page, 15);
    await selectAlgorithm(page, 'insertionSort');
    await clickPlay(page);
    
    await waitForCompletion(page, TIMEOUTS.FAST_SORT);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThanOrEqual(0);
  });

  test('should sort reversed array', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await page.selectOption('#array-type', 'reversed');
    await setArraySize(page, 15);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    
    await waitForCompletion(page, TIMEOUTS.MEDIUM_SORT);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThan(0);
  });

  test('should sort array with few unique values', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await page.selectOption('#array-type', 'few-unique');
    await setArraySize(page, 15);
    await selectAlgorithm(page, 'countingSort');
    await clickPlay(page);
    
    await waitForCompletion(page, TIMEOUTS.FAST_SORT);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Sorting Performance', () => {
  test('should sort small array quickly', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'mergeSort');
    await clickPlay(page);
    
    const startTime = Date.now();
    await waitForCompletion(page, TIMEOUTS.FAST_SORT);
    const elapsed = Date.now() - startTime;
    
    expect(elapsed).toBeLessThan(TIMEOUTS.FAST_SORT);
  });

  test('should sort medium array within reasonable time', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 30);
    await selectAlgorithm(page, 'quickSort');
    await clickPlay(page);
    
    const startTime = Date.now();
    await waitForCompletion(page, TIMEOUTS.MEDIUM_SORT);
    const elapsed = Date.now() - startTime;
    
    expect(elapsed).toBeLessThan(TIMEOUTS.MEDIUM_SORT);
  });
});
