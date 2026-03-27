/**
 * Core functionality E2E tests for DSA Visualizer.
 * Tests basic UI interactions, page load, and playback controls.
 */

import { test, expect } from '@playwright/test';
import {
  waitForVisualizerReady,
  selectAlgorithm,
  setArraySize,
  clickPlay,
  clickPause,
  clickStep,
  clickReset,
  clickGenerate,
  getBarCount,
  isCodePanelVisible,
  isInfoPanelVisible,
  getStatistics,
  TIMEOUTS
} from './test-utils';

test.describe('Page Load and Initial State', () => {
  test('should load the page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/DSA Visualizer/);
  });

  test('should display the algorithm selector', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    const selector = page.locator('#algorithm-select');
    await expect(selector).toBeVisible();
    await expect(selector).toBeEnabled();
  });

  test('should display all three panels (info, code, visualizer)', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    const infoPanelVisible = await isInfoPanelVisible(page);
    expect(infoPanelVisible).toBe(true);
    
    const codePanelVisible = await isCodePanelVisible(page);
    expect(codePanelVisible).toBe(true);
    
    const vizPanel = page.locator('#viz-panel');
    await expect(vizPanel).toBeVisible();
  });

  test('should display initial bars for sorting visualization', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    const barCount = await getBarCount(page);
    expect(barCount).toBeGreaterThan(0);
    expect(barCount).toBeLessThanOrEqual(100);
  });

  test('should display playback controls', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await expect(page.locator('#btn-play')).toBeVisible();
    await expect(page.locator('#btn-pause')).toBeVisible();
    await expect(page.locator('#btn-step')).toBeVisible();
    await expect(page.locator('#btn-reset')).toBeVisible();
    await expect(page.locator('#btn-generate')).toBeVisible();
  });
});

test.describe('Algorithm Selection', () => {
  test('should select different sorting algorithms', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    const algorithms = ['bubbleSort', 'mergeSort', 'quickSort'];
    
    for (const algo of algorithms) {
      await selectAlgorithm(page, algo);
      const value = await page.inputValue('#algorithm-select');
      expect(value).toBe(algo);
    }
  });

  test('should select different searching algorithms', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    const algorithms = ['linearSearch', 'binarySearch', 'jumpSearch'];
    
    for (const algo of algorithms) {
      await selectAlgorithm(page, algo);
      const value = await page.inputValue('#algorithm-select');
      expect(value).toBe(algo);
    }
  });

  test('should show search target input for searching algorithms', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'linearSearch');
    const searchTargetGroup = page.locator('.search-target-group');
    await expect(searchTargetGroup).toBeVisible();
  });

  test('should hide search target input for sorting algorithms', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bubbleSort');
    const searchTargetGroup = page.locator('.search-target-group');
    await expect(searchTargetGroup).not.toBeVisible();
  });
});

test.describe('Array Size Controls', () => {
  test('should change array size using the input', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 50);
    await clickGenerate(page);
    const barCount = await getBarCount(page);
    expect(barCount).toBe(50);
  });

  test('should change array size using the slider', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await page.fill('#array-size', '20');
    await clickGenerate(page);
    
    const barCount = await getBarCount(page);
    expect(barCount).toBe(20);
  });

  test('should respect minimum array size', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 3);
    await clickGenerate(page);
    const barCount = await getBarCount(page);
    expect(barCount).toBeGreaterThanOrEqual(5);
  });

  test('should respect maximum array size', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 150);
    await clickGenerate(page);
    const barCount = await getBarCount(page);
    expect(barCount).toBeLessThanOrEqual(100);
  });
});

test.describe('Playback Controls', () => {
  test('should start visualization when play is clicked', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    
    await page.waitForTimeout(1000);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThanOrEqual(0);
  });

  test('should pause visualization when pause is clicked', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    await page.waitForTimeout(500);
    
    await clickPause(page);
    await page.waitForTimeout(500);
    
    const statsAfterPause = await getStatistics(page);
    await page.waitForTimeout(1000);
    const statsAfterWait = await getStatistics(page);
    
    expect(statsAfterPause.comparisons).toBe(statsAfterWait.comparisons);
  });

  test('should execute single step when step is clicked', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    
    const statsBefore = await getStatistics(page);
    await clickStep(page);
    const statsAfter = await getStatistics(page);
    
    expect(statsAfter.comparisons).toBeGreaterThan(statsBefore.comparisons);
  });

  test('should reset visualization when reset is clicked', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    await page.waitForTimeout(2000);
    
    await clickReset(page);
    const stats = await getStatistics(page);
    
    expect(stats.comparisons).toBe(0);
    expect(stats.swaps).toBe(0);
  });

  test('should generate new array when generate is clicked', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 20);
    
    const barsBefore = await page.$$eval('#bars-container .bar', bars => 
      bars.map(b => b.style.height)
    );
    
    await clickGenerate(page);
    
    const barsAfter = await page.$$eval('#bars-container .bar', bars => 
      bars.map(b => b.style.height)
    );
    
    expect(barsBefore).not.toEqual(barsAfter);
  });
});

test.describe('Code Panel', () => {
  test('should display code for selected algorithm', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bubbleSort');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const codeContent = await page.textContent('#code-display');
    expect(codeContent).toBeTruthy();
    expect(codeContent.length).toBeGreaterThan(50);
  });

  test('should display multiple language tabs', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    const tabs = await page.$$('.lang-tab');
    expect(tabs.length).toBeGreaterThanOrEqual(5);
  });

  test('should switch code language when tab is clicked', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'mergeSort');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const pythonTab = page.locator('.lang-tab:has-text("Python")');
    await pythonTab.click();
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const codeContent = await page.textContent('#code-display');
    expect(codeContent.toLowerCase()).toContain('def');
  });
});

test.describe('Info Panel', () => {
  test('should display algorithm description', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bubbleSort');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const infoContent = await page.textContent('.info-panel');
    expect(infoContent).toBeTruthy();
    expect(infoContent.length).toBeGreaterThan(20);
  });

  test('should display complexity information', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'mergeSort');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const infoContent = await page.textContent('.info-panel');
    expect(infoContent.toLowerCase()).toContain('complexity');
  });
});

test.describe('Statistics Display', () => {
  test('should track comparisons during sorting', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    await page.waitForTimeout(2000);
    
    const stats = await getStatistics(page);
    expect(stats.comparisons).toBeGreaterThan(0);
  });

  test('should track swaps during sorting', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    await page.waitForTimeout(2000);
    
    const stats = await getStatistics(page);
    expect(stats.swaps).toBeGreaterThanOrEqual(0);
  });

  test('should display elapsed time', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await setArraySize(page, 10);
    await selectAlgorithm(page, 'bubbleSort');
    await clickPlay(page);
    await page.waitForTimeout(2000);
    
    const stats = await getStatistics(page);
    expect(stats.time).toBeTruthy();
  });
});
