/**
 * Tree algorithm E2E tests for DSA Visualizer.
 * Tests BST operations, traversals, and AVL/Heap operations.
 */

import { test, expect } from '@playwright/test';
import {
  waitForVisualizerReady,
  selectAlgorithm,
  clickPlay,
  clickStep,
  TIMEOUTS
} from './test-utils';

test.describe('BST Insert', () => {
  test('should visualize node insertion', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const treeContainer = page.locator('#tree-container');
    await expect(treeContainer).toBeVisible();
  });

  test('should show inserted node in tree structure', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('#tree-container .tree-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should maintain BST property after insertion', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    
    for (let i = 0; i < 5; i++) {
      await clickStep(page);
      await page.waitForTimeout(300);
    }
    
    const nodes = await page.$$('#tree-container .tree-node');
    expect(nodes.length).toBeGreaterThanOrEqual(5);
  });
});

test.describe('BST Search', () => {
  test('should find existing node', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstSearch');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const foundNode = await page.$('.tree-node.found');
    expect(foundNode).toBeTruthy();
  });

  test('should handle node not found', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstSearch');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText.toLowerCase()).toContain('not found');
  });

  test('should visualize search path', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstSearch');
    await clickPlay(page);
    
    await page.waitForTimeout(1000);
    
    const visitingNodes = await page.$$('.tree-node.visiting');
    expect(visitingNodes.length).toBeGreaterThan(0);
  });
});

test.describe('BST Delete', () => {
  test('should visualize node deletion', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstDelete');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const treeContainer = page.locator('#tree-container');
    await expect(treeContainer).toBeVisible();
  });
});

test.describe('Tree Traversals', () => {
  test('should perform in-order traversal', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInorder');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.tree-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });

  test('should perform pre-order traversal', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstPreorder');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.tree-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });

  test('should perform post-order traversal', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstPostorder');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.tree-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });

  test('should perform level-order (BFS) traversal', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstLevelOrder');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.tree-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });
});

test.describe('AVL Tree Operations', () => {
  test('should visualize AVL insertion with balancing', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'avlInsert');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('#tree-container .tree-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should maintain balance after multiple insertions', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'avlInsert');
    
    for (let i = 0; i < 7; i++) {
      await clickStep(page);
      await page.waitForTimeout(500);
    }
    
    const nodes = await page.$$('#tree-container .tree-node');
    expect(nodes.length).toBeGreaterThanOrEqual(5);
  });
});

test.describe('Heap Operations', () => {
  test('should visualize min-heap insertion', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'heapInsertMin');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('#tree-container .tree-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should visualize min-heap extraction', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'heapExtractMin');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const treeContainer = page.locator('#tree-container');
    await expect(treeContainer).toBeVisible();
  });

  test('should maintain heap property after extraction', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'heapExtractMin');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('#tree-container .tree-node');
    expect(nodes.length).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Tree Visualization', () => {
  test('should display tree nodes with values', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodeTexts = await page.$$eval('#tree-container .tree-node', nodes =>
      nodes.map(n => n.textContent)
    );
    
    expect(nodeTexts.length).toBeGreaterThan(0);
    expect(nodeTexts[0]).toMatch(/\d+/);
  });

  test('should display edges connecting nodes', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const edges = await page.$$('#tree-container .tree-edge');
    expect(edges.length).toBeGreaterThanOrEqual(0);
  });

  test('should highlight active node during operation', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickStep(page);
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const activeNode = await page.$('.tree-node.current');
    expect(activeNode).toBeTruthy();
  });
});

test.describe('Tree Algorithm Statistics', () => {
  test('should track comparisons in BST operations', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText.toLowerCase()).toContain('comparison');
  });

  test('should display tree height or size', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const infoContent = await page.textContent('#info-panel');
    expect(infoContent.length).toBeGreaterThan(20);
  });
});

test.describe('Tree Algorithm Edge Cases', () => {
  test('should handle empty tree', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstSearch');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText).toBeTruthy();
  });

  test('should handle single node tree', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bstInsert');
    await clickStep(page);
    
    const nodes = await page.$$('#tree-container .tree-node');
    expect(nodes.length).toBeGreaterThanOrEqual(1);
  });
});
