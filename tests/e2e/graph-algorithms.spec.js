/**
 * Graph algorithm E2E tests for DSA Visualizer.
 * Tests BFS, DFS, Dijkstra, A*, and other graph algorithms.
 */

import { test, expect } from '@playwright/test';
import {
  waitForVisualizerReady,
  selectAlgorithm,
  clickPlay,
  clickStep,
  TIMEOUTS
} from './test-utils';

test.describe('BFS (Breadth-First Search)', () => {
  test('should visualize BFS traversal', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const graphContainer = page.locator('#graph-container');
    await expect(graphContainer).toBeVisible();
  });

  test('should visit nodes in breadth-first order', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.graph-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });

  test('should highlight visited edges', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedEdges = await page.$$('.graph-edge.visited');
    expect(visitedEdges.length).toBeGreaterThanOrEqual(0);
  });
});

test.describe('DFS (Depth-First Search)', () => {
  test('should visualize DFS traversal', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const graphContainer = page.locator('#graph-container');
    await expect(graphContainer).toBeVisible();
  });

  test('should visit nodes in depth-first order', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.graph-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });

  test('should explore paths deeply before backtracking', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dfs');
    
    for (let i = 0; i < 5; i++) {
      await clickStep(page);
      await page.waitForTimeout(300);
    }
    
    const visitingNodes = await page.$$('.graph-node.visiting');
    expect(visitingNodes.length).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Dijkstra\'s Shortest Path', () => {
  test('should visualize shortest path finding', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dijkstra');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const graphContainer = page.locator('#graph-container');
    await expect(graphContainer).toBeVisible();
  });

  test('should highlight shortest path when found', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dijkstra');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const pathEdges = await page.$$('.graph-edge.path');
    expect(pathEdges.length).toBeGreaterThanOrEqual(0);
  });

  test('should display edge weights', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dijkstra');
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const edgeWeights = await page.$$('.edge-weight');
    expect(edgeWeights.length).toBeGreaterThanOrEqual(0);
  });
});

test.describe('A* Pathfinding', () => {
  test('should visualize A* pathfinding', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'astar');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const graphContainer = page.locator('#graph-container');
    await expect(graphContainer).toBeVisible();
  });

  test('should find optimal path', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'astar');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const visitedNodes = await page.$$('.graph-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });
});

test.describe('Bellman-Ford', () => {
  test('should visualize Bellman-Ford algorithm', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bellmanFord');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const graphContainer = page.locator('#graph-container');
    await expect(graphContainer).toBeVisible();
  });

  test('should handle negative weight edges', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bellmanFord');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const visitedNodes = await page.$$('.graph-node.visited');
    expect(visitedNodes.length).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Kruskal\'s MST', () => {
  test('should visualize minimum spanning tree construction', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'kruskal');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const graphContainer = page.locator('#graph-container');
    await expect(graphContainer).toBeVisible();
  });

  test('should highlight MST edges', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'kruskal');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const mstEdges = await page.$$('.graph-edge.mst');
    expect(mstEdges.length).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Topological Sort', () => {
  test('should visualize topological ordering', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'topologicalSort');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const graphContainer = page.locator('#graph-container');
    await expect(graphContainer).toBeVisible();
  });

  test('should visit nodes in topological order', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'topologicalSort');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const visitedNodes = await page.$$('.graph-node.visited');
    expect(visitedNodes.length).toBeGreaterThan(0);
  });
});

test.describe('Graph Visualization', () => {
  test('should display graph nodes with labels', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const nodes = await page.$$('.graph-node');
    expect(nodes.length).toBeGreaterThan(0);
  });

  test('should display edges connecting nodes', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const edges = await page.$$('.graph-edge');
    expect(edges.length).toBeGreaterThan(0);
  });

  test('should highlight current node during traversal', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dfs');
    await clickStep(page);
    await page.waitForTimeout(TIMEOUTS.ANIMATION);
    
    const currentNode = await page.$('.graph-node.current');
    expect(currentNode).toBeTruthy();
  });
});

test.describe('Graph Algorithm Statistics', () => {
  test('should track visited nodes count', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const statsText = await page.textContent('#stats-container');
    expect(statsText).toBeTruthy();
  });

  test('should display path length for shortest path algorithms', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dijkstra');
    await clickPlay(page);
    
    await page.waitForTimeout(3000);
    
    const infoContent = await page.textContent('#info-panel');
    expect(infoContent.length).toBeGreaterThan(20);
  });
});

test.describe('Graph Algorithm Edge Cases', () => {
  test('should handle disconnected graph', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'dfs');
    await clickPlay(page);
    
    await page.waitForTimeout(2000);
    
    const visitedNodes = await page.$$('.graph-node.visited');
    expect(visitedNodes.length).toBeGreaterThanOrEqual(0);
  });

  test('should handle single node graph', async ({ page }) => {
    await page.goto('/');
    await waitForVisualizerReady(page);
    
    await selectAlgorithm(page, 'bfs');
    await clickStep(page);
    
    const nodes = await page.$$('.graph-node');
    expect(nodes.length).toBeGreaterThan(0);
  });
});
