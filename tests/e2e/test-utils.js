/**
 * Test utilities and helpers for DSA Visualizer E2E tests.
 * Provides common functions for interacting with the application UI.
 */

/**
 * Wait for the visualizer to be ready after page load.
 * @param {import('@playwright/test').Page} page 
 */
export async function waitForVisualizerReady(page) {
  await page.waitForSelector('#viz-panel', { state: 'visible' });
  await page.waitForSelector('#bars-container .bar', { state: 'attached', timeout: 5000 }).catch(() => {
  });
  await page.waitForTimeout(500);
}

/**
 * Select an algorithm from the dropdown.
 * @param {import('@playwright/test').Page} page 
 * @param {string} algorithmValue - The value attribute of the option (e.g., 'bubbleSort')
 */
export async function selectAlgorithm(page, algorithmValue) {
  await page.selectOption('#algorithm-select', algorithmValue);
  await page.waitForTimeout(300);
}

/**
 * Set the array size using the slider.
 * @param {import('@playwright/test').Page} page 
 * @param {number} size - Array size (5-100)
 */
export async function setArraySize(page, size) {
  await page.fill('#size-display', String(size));
  await page.waitForTimeout(200);
}

/**
 * Click the play button to start visualization.
 * @param {import('@playwright/test').Page} page 
 */
export async function clickPlay(page) {
  await page.click('#btn-play');
}

/**
 * Click the pause button.
 * @param {import('@playwright/test').Page} page 
 */
export async function clickPause(page) {
  await page.click('#btn-pause');
}

/**
 * Click the step button (execute single step).
 * @param {import('@playwright/test').Page} page 
 */
export async function clickStep(page) {
  await page.click('#btn-step');
}

/**
 * Click the reset button.
 * @param {import('@playwright/test').Page} page 
 */
export async function clickReset(page) {
  await page.click('#btn-reset');
  await page.waitForTimeout(300);
}

/**
 * Click the generate button (new random array).
 * @param {import('@playwright/test').Page} page 
 */
export async function clickGenerate(page) {
  await page.click('#btn-generate');
  await page.waitForTimeout(300);
}

/**
 * Set the search target value for searching algorithms.
 * @param {import('@playwright/test').Page} page 
 * @param {number} target - Target value to search for
 */
export async function setSearchTarget(page, target) {
  await page.fill('#search-target', String(target));
  await page.waitForTimeout(200);
}

/**
 * Wait for visualization to complete (sorted state).
 * @param {import('@playwright/test').Page} page 
 * @param {number} timeout - Maximum wait time in ms (default 30000)
 */
export async function waitForCompletion(page, timeout = 30000) {
  await page.waitForFunction(() => {
    const stats = document.querySelector('#stats-container');
    return stats && stats.textContent.includes('Sorted');
  }, { timeout });
}

/**
 * Get the current number of bars displayed.
 * @param {import('@playwright/test').Page} page 
 * @returns {Promise<number>}
 */
export async function getBarCount(page) {
  const bars = await page.$$('#bars-container .bar');
  return bars.length;
}

/**
 * Check if the code panel is visible and has content.
 * @param {import('@playwright/test').Page} page 
 * @returns {Promise<boolean>}
 */
export async function isCodePanelVisible(page) {
  const codePanel = await page.$('#code-display');
  if (!codePanel) return false;
  const content = await codePanel.textContent();
  return content && content.trim().length > 0;
}

/**
 * Check if the info panel is visible and has content.
 * @param {import('@playwright/test').Page} page 
 * @returns {Promise<boolean>}
 */
export async function isInfoPanelVisible(page) {
  const infoPanel = await page.$('.info-panel');
  if (!infoPanel) return false;
  const content = await infoPanel.textContent();
  return content && content.trim().length > 0;
}

/**
 * Get statistics values from the stats container.
 * @param {import('@playwright/test').Page} page 
 * @returns {Promise<{comparisons: number, swaps: number, time: string}>}
 */
export async function getStatistics(page) {
  const comparisons = await page.textContent('#comparisons-count');
  const swaps = await page.textContent('#swaps-count');
  const time = await page.textContent('#elapsed-time');
  
  return {
    comparisons: parseInt(comparisons || '0'),
    swaps: parseInt(swaps || '0'),
    time: time || '0.000s'
  };
}

/**
 * Toggle sound on/off.
 * @param {import('@playwright/test').Page} page 
 */
export async function toggleSound(page) {
  await page.click('#btn-sound');
}

/**
 * Enter compare mode.
 * @param {import('@playwright/test').Page} page 
 */
export async function enterCompareMode(page) {
  await page.click('#btn-compare');
  await page.waitForTimeout(300);
}

/**
 * Exit compare mode.
 * @param {import('@playwright/test').Page) page 
 */
export async function exitCompareMode(page) {
  await page.click('#btn-compare');
  await page.waitForTimeout(300);
}

/**
 * Select second algorithm in compare mode.
 * @param {import('@playwright/test').Page} page 
 * @param {string} algorithmValue 
 */
export async function selectCompareAlgorithm(page, algorithmValue) {
  await page.selectOption('#compare-algorithm-select', algorithmValue);
  await page.waitForTimeout(300);
}

/**
 * Algorithm categories for testing.
 */
export const ALGORITHM_CATEGORIES = {
  SORTING: {
    BASIC: ['bubbleSort', 'selectionSort', 'insertionSort'],
    EFFICIENT: ['mergeSort', 'quickSort', 'heapSort'],
    EXTENDED: ['shellSort', 'countingSort', 'gnomeSort', 'cocktailShakerSort', 'pancakeSort'],
    FUN: ['bogoSort', 'thanosSort', 'stalinSort']
  },
  SEARCHING: ['linearSearch', 'binarySearch', 'jumpSearch', 'ternarySearch', 'fibonacciSearch'],
  TREES: {
    BST: ['bstInsert', 'bstSearch', 'bstDelete', 'bstInorder', 'bstPreorder', 'bstPostorder', 'bstLevelOrder'],
    AVL: ['avlInsert'],
    HEAP: ['heapInsertMin', 'heapExtractMin']
  },
  GRAPHS: ['bfs', 'dfs', 'dijkstra', 'astar', 'bellmanFord', 'kruskal', 'topologicalSort'],
  LINKED_LISTS: ['llInsertHead', 'llInsertTail', 'llInsertPos', 'llInsertAfterValue', 
                 'llDeleteHead', 'llDeleteTail', 'llDeletePos', 'llDeleteVal',
                 'llSearch', 'llTraverse', 'llReverse', 'llDetectCycle', 
                 'llMergeSorted', 'llMergeSort']
};

/**
 * Timeout constants for different operations.
 */
export const TIMEOUTS = {
  PAGE_LOAD: 10000,
  ANIMATION: 500,
  FAST_SORT: 5000,
  MEDIUM_SORT: 15000,
  SLOW_SORT: 30000,
  VERY_SLOW_SORT: 60000
};
