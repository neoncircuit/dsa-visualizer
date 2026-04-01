/**
 * Maze / Grid Renderer
 *
 * Canvas-based renderer for 2D grid algorithms (maze generation and grid pathfinding).
 * Cells are drawn as filled rectangles; per-step updates redraw only the changed cell
 * for performance.
 *
 * Cell state integers (must match constants in maze.js):
 *   0 WALL | 1 PASSAGE | 2 START | 3 END
 *   4 VISITED | 5 EXPLORING | 6 PATH | 7 FRONTIER | 8 CURRENT
 */

const MazeRenderer = (() => {

    // ─── Colour palette (dark theme; light theme overrides applied in render) ───

    /** @type {Object<number,string>} Maps cell state integer to fill colour. */
    const COLORS = {
        0: '#1a1b26',  // WALL
        1: '#3b4261',  // PASSAGE
        2: '#9ece6a',  // START  — green
        3: '#f7768e',  // END    — red/pink
        4: '#7aa2f7',  // VISITED — blue
        5: '#bb9af7',  // EXPLORING — purple
        6: '#e0af68',  // PATH — gold
        7: '#ff9e64',  // FRONTIER — orange
        8: '#c0caf5',  // CURRENT — bright white
    };

    const COLORS_LIGHT = {
        0: '#c8c8d4',  // WALL
        1: '#f0f0f5',  // PASSAGE
        2: '#16a34a',  // START
        3: '#dc2626',  // END
        4: '#2563eb',  // VISITED
        5: '#7c3aed',  // EXPLORING
        6: '#d97706',  // PATH
        7: '#ea580c',  // FRONTIER
        8: '#1a1b26',  // CURRENT
    };

    /** Maps step.type to cell state integer for processStep. */
    const STEP_STATE_MAP = {
        carve:    1,
        passage:  1,
        backtrack:1,
        wall:     0,
        frontier: 7,
        visit:    8,
        current:  8,
        check:    5,
        explore:  5,
        found:    6,
        path:     6,
    };

    /** @type {HTMLElement|null} */
    let container = null;
    /** @type {HTMLCanvasElement|null} */
    let canvas = null;
    /** @type {CanvasRenderingContext2D|null} */
    let ctx = null;
    /** @type {number[][]|null} Live copy of the grid state. */
    let currentGrid = null;
    /** @type {number} Pixel width of one cell. */
    let cellW = 1;
    /** @type {number} Pixel height of one cell. */
    let cellH = 1;

    // ─── Helpers ─────────────────────────────────────────────────────────────

    /**
     * Return the correct colour palette based on current theme.
     *
     * @returns {Object<number,string>}
     */
    function palette() {
        return document.body.classList.contains('light') ? COLORS_LIGHT : COLORS;
    }

    /**
     * Draw a single cell at grid position (r, c) with the given state colour.
     *
     * @param {number} r - Row index.
     * @param {number} c - Column index.
     * @param {number} state - Cell state integer.
     * @returns {void}
     */
    function drawCell(r, c, state) {
        const pal = palette();
        ctx.fillStyle = pal[state] ?? pal[0];
        ctx.fillRect(
            Math.floor(c * cellW),
            Math.floor(r * cellH),
            Math.ceil(cellW),
            Math.ceil(cellH)
        );
    }

    /**
     * Ensure start (1,1) and end (rows-2,cols-2) cells keep their colours unless
     * they are part of the final PATH, in which case PATH colour wins.
     *
     * @returns {void}
     */
    function refreshStartEnd() {
        if (!currentGrid) return;
        const rows = currentGrid.length;
        const cols = currentGrid[0].length;
        const sr = 1, sc = 1;
        const er = rows - 2, ec = cols - 2;
        drawCell(sr, sc, currentGrid[sr][sc] === 6 ? 6 : 2);
        drawCell(er, ec, currentGrid[er][ec] === 6 ? 6 : 3);
    }

    // ─── Public API ───────────────────────────────────────────────────────────

    /**
     * Initialise the renderer by creating a canvas inside the given container.
     * Registers a ResizeObserver so the canvas redraws when the container resizes.
     *
     * @param {HTMLElement} containerEl - DOM element that will hold the canvas.
     * @returns {void}
     */
    function init(containerEl) {
        container = containerEl;
        canvas = document.createElement('canvas');
        canvas.style.display = 'block';
        canvas.style.width   = '100%';
        canvas.style.height  = '100%';
        container.innerHTML  = '';
        container.appendChild(canvas);
        ctx = canvas.getContext('2d');

        new ResizeObserver(() => {
            if (currentGrid) render(currentGrid);
        }).observe(container);
    }

    /**
     * Render the entire grid from scratch.
     * Takes a deep copy so external mutations do not affect the displayed state.
     *
     * @param {number[][]} grid - 2D array of cell state integers.
     * @returns {void}
     */
    function render(grid) {
        currentGrid = grid.map(row => [...row]);

        const w = container.clientWidth  || 400;
        const h = container.clientHeight || 400;
        canvas.width  = w;
        canvas.height = h;

        const rows = grid.length;
        const cols = grid[0].length;
        cellW = w / cols;
        cellH = h / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                drawCell(r, c, grid[r][c]);
            }
        }
    }

    /**
     * Apply a single algorithm step to the canvas.
     * Updates the internal grid copy and redraws only the affected cell(s).
     *
     * @param {{type: string, row: number, col: number}} step - Algorithm step object.
     * @returns {void}
     */
    function processStep(step) {
        if (!currentGrid) return;

        const state = STEP_STATE_MAP[step.type] ?? 4;  // default: VISITED
        currentGrid[step.row][step.col] = state;
        drawCell(step.row, step.col, state);

        // Keep start/end cells visually distinct
        refreshStartEnd();
    }

    /**
     * Reset all visited/exploring/path/frontier cells back to PASSAGE,
     * then redraw the start and end cells.
     * Used when switching from a completed maze to a pathfinding algorithm.
     *
     * @returns {void}
     */
    function clearAllStates() {
        if (!currentGrid) return;

        for (let r = 0; r < currentGrid.length; r++) {
            for (let c = 0; c < currentGrid[0].length; c++) {
                if (currentGrid[r][c] >= 4) {
                    currentGrid[r][c] = 1;  // reset to PASSAGE
                    drawCell(r, c, 1);
                }
            }
        }

        // Re-mark start/end
        const rows = currentGrid.length;
        const cols = currentGrid[0].length;
        currentGrid[1][1] = 2;
        currentGrid[rows - 2][cols - 2] = 3;
        drawCell(1, 1, 2);
        drawCell(rows - 2, cols - 2, 3);
    }

    return { init, render, processStep, clearAllStates };

})();

export default MazeRenderer;
