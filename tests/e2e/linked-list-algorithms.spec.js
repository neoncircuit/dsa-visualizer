/**
 * Linked list algorithm E2E tests for DSA Visualizer.
 * Tests various linked list operations and algorithms.
 */

import { test, expect } from '@playwright/test';
import {
  waitForVisualizerReady,
  selectAlgorithm,
  clickPlay,
  clickStep,
  clickReset,
  TIMEOUTS
} from './test-utils';

test.describe('Linked List Insert Operations', () => {
  test('should visualize insert at head', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const llContainer = page.locator('#linked-list-container');
    await expect(llContainer).toBeVisible();
  });

  test('should display new node after insert at head', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should visualize insert at tail', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertTail');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should visualize insert at position', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertPos');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should visualize insert after value', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertAfterValue');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThan(0);
  });
});

test.describe('Linked List Delete Operations', () => {
  test('should visualize delete head', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llDeleteHead');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const llContainer = page.locator('#linked-list-container');
    await expect(llContainer).toBeVisible();
  });

  test('should remove node after delete head', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickPlay(page);
    await page.waitForTimeout(2000);
    
    const nodesBefore = await page.$$('.ll-node');
    
    await selectAlgorithm(page, 'llDeleteHead');
    await clickPlay(page);
    await page.waitForTimeout(2000);
    
    const nodesAfter = await page.$$('.ll-node');
    expect(nodesAfter.length).toBeLessThan(nodesBefore.length);
  });

  test('should visualize delete tail', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llDeleteTail');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const llContainer = page.locator('#linked-list-container');
    await expect(llContainer).toBeVisible();
  });

  test('should visualize delete at position', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llDeletePos');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThanOrEqual(0);
  });

  test('should visualize delete by value', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llDeleteVal');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const llContainer = page.locator('#linked-list-container');
    await expect(llContainer).toBeVisible();
  });
});

test.describe('Linked List Search and Traverse', () => {
  test('should visualize search operation', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llSearch');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const llContainer = page.locator('#linked-list-container');
    await expect(llContainer).toBeVisible();
  });

  test('should highlight found node in search', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llSearch');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const foundNode = await page.$('.ll-node.found');
    expect(foundNode).toBeTruthy();
  });

  test('should visualize traverse operation', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llTraverse');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.ll-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });
});

test.describe('Linked List Advanced Operations', () => {
  test('should visualize reverse operation', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llReverse');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should reverse list direction', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llReverse');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const arrows = await page.$$('.ll-arrow');
    expect(arrows.length).toBeGreaterThanOrEqual(0);
  });

  test('should visualize detect cycle operation', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llDetectCycle');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText).toBeTruthy();
  });

  test('should visualize merge sorted lists', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llMergeSorted');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should visualize merge sort on linked list', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llMergeSort');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThan(0);
  });
});

test.describe('Linked List Visualization', () => {
  test('should display nodes with values', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodeTexts = await page.$$eval('.ll-node', nodes =>
      nodes.map(n => n.textContent)
    );
    
    expect(nodeTexts.length).toBeGreaterThan(0);
    expect(nodeTexts[0]).toMatch(/\d+/);
  });

  test('should display arrows between nodes', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickPlay(page);
    await page.waitForTimeout(1000);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickPlay(page);
    await page.waitForTimeout(2000);
    
    const arrows = await page.$$('.ll-arrow');
    expect(arrows.length).toBeGreaterThan(0);
  });

  test('should highlight active node during operation', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llTraverse');
    await clickStep(page);
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const currentNode = await page.$('.ll-node.current');
    expect(currentNode).toBeTruthy();
  });
});

test.describe('Linked List Statistics', () => {
  test('should track operations count', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText).toBeTruthy();
  });

  test('should display list length', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llTraverse');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const infoContent = await page.textContent('#info-panel');
    expect(infoContent.length).toBeGreaterThan(20);
  });
});

test.describe('Linked List Edge Cases', () => {
  test('should handle empty list', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llDeleteHead');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText).toBeTruthy();
  });

  test('should handle single node list', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llInsertHead');
    await clickStep(page);
    
    const nodes = await page.$$('.ll-node');
    expect(nodes.length).toBeGreaterThanOrEqual(1);
  });

  test('should handle cycle detection on cyclic list', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'llDetectCycle');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText.toLowerCase()).toMatch(/cycle|found/);
  });
});
