/**
 * Maze generation and grid pathfinding algorithm generators.
 *
 * Grid cell states:
 *   0 WALL | 1 PASSAGE | 2 START | 3 END
 *   4 VISITED | 5 EXPLORING | 6 PATH | 7 FRONTIER | 8 CURRENT
 *
 * Step objects: { type: string, row: number, col: number, codeLine: number }
 *
 * Maze generators mutate and return the grid.
 * Pathfinders yield visualization steps and return the grid with the path drawn.
 */

const MazeAlgorithms = (() => {

    const ROWS = 21;
    const COLS = 21;
    const WALL = 0;
    const PASSAGE = 1;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    class MinHeap {
        constructor() { this.data = []; }

        get size() { return this.data.length; }

        isEmpty() { return this.data.length === 0; }

        push(item) {
            this.data.push(item);
            let i = this.data.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (this.data[p].priority <= this.data[i].priority) break;
                [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
                i = p;
            }
        }

        pop() {
            if (this.data.length === 0) return undefined;
            const top = this.data[0];
            const last = this.data.pop();
            if (this.data.length > 0) {
                this.data[0] = last;
                let i = 0;
                while (true) {
                    let smallest = i;
                    const l = 2 * i + 1;
                    const r = 2 * i + 2;
                    if (l < this.data.length && this.data[l].priority < this.data[smallest].priority) smallest = l;
                    if (r < this.data.length && this.data[r].priority < this.data[smallest].priority) smallest = r;
                    if (smallest === i) break;
                    [this.data[smallest], this.data[i]] = [this.data[i], this.data[smallest]];
                    i = smallest;
                }
            }
            return top;
        }
    }

    /**
     * @param {number} rows
     * @param {number} cols
     * @returns {number[][]}
     */
    function buildMazeGrid(rows = ROWS, cols = COLS) {
        const grid = Array.from({ length: rows }, () => Array(cols).fill(WALL));
        return grid;
    }

    /**
     * @param {number[][]} grid
     * @param {number} r
     * @param {number} c
     * @param {number} rows
     * @param {number} cols
     * @returns {number[][]}
     */
    function getMazeNeighbors(grid, r, c, rows, cols) {
        const dirs = shuffle([[0, 2], [0, -2], [2, 0], [-2, 0]]);
        return dirs
            .map(([dr, dc]) => [r + dr, c + dc])
            .filter(([nr, nc]) => nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && grid[nr][nc] === WALL);
    }

    /**
     * @param {number[][]} grid
     * @param {number} r
     * @param {number} c
     * @param {number} rows
     * @param {number} cols
     * @returns {number[][]}
     */
    function getPathNeighbors(grid, r, c, rows, cols) {
        const result = [];
        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] !== WALL) {
                result.push([nr, nc]);
            }
        }
        return result;
    }

    /**
     * @param {number} r1
     * @param {number} c1
     * @param {number} r2
     * @param {number} c2
     * @returns {number}
     */
    function manhattan(r1, c1, r2, c2) {
        return Math.abs(r1 - r2) + Math.abs(c1 - c2);
    }

    /**
     * @param {Map<string,string>} prev
     * @param {number} endR
     * @param {number} endC
     * @param {Generator} gen
     */
    function* reconstructPath(prev, endR, endC, gen) {
        const path = [];
        let key = `${endR},${endC}`;
        while (prev.has(key)) {
            const [r, c] = key.split(',').map(Number);
            path.push([r, c]);
            key = prev.get(key);
        }
        path.reverse();
        for (const [r, c] of path) {
            gen.yield = gen.yield || null;
        }
    }

    function* yieldPath(prev, endR, endC) {
        const path = [];
        let key = `${endR},${endC}`;
        while (prev.has(key)) {
            const [r, c] = key.split(',').map(Number);
            path.push([r, c]);
            key = prev.get(key);
        }
        path.reverse();
        for (const [r, c] of path) {
            yield { type: 'path', row: r, col: c, codeLine: 0 };
        }
    }

    // ─── Code Snippets ───

    const CODE = {
        mazeRecursiveDFS: {
            pseudo: [
                '# Step 1: Generate a maze using depth-first search with backtracking',
                'procedure recursiveDFS(grid):',
                '    stack = [(1, 1)]  # [2] Start at top-left cell, push to stack',
                '    grid[1][1] = PASSAGE  # [3] Mark starting cell as open',
                '',
                '    while stack is not empty:  # [4] Keep going while there are cells to process',
                '        current = stack.peek()  # [5] Look at the top cell without removing it',
                '        neighbors = unvisitedNeighbors(current)  # [6] Find cells 2 steps away that are still walls',
                '',
                '        if neighbors is not empty:  # [7] If there is at least one unvisited neighbor',
                '            next = randomChoice(neighbors)  # [8] Pick one at random',
                '            carveWall(current, next)  # [9] Remove the wall between current and next',
                '            grid[next] = PASSAGE  # [10] Mark the neighbor as open',
                '            stack.push(next)  # [11] Push the neighbor onto the stack',
                '        else:  # [12] No unvisited neighbors, dead end reached',
                '            stack.pop()  # [13] Backtrack: remove the top cell from the stack',
            ],
            python: [
                '# Step 1: Generate a maze using iterative DFS with backtracking',
                'def maze_recursive_dfs(grid: list[list[int]]) -> list[list[int]]:',
                '    rows, cols = len(grid), len(grid[0])',
                '    stack = [(1, 1)]  # [2] Start at (1,1)',
                '    grid[1][1] = 1  # [3] Mark start as passage',
                '',
                '    while stack:  # [4] Continue while stack has cells',
                '        r, c = stack[-1]  # [5] Peek at top of stack',
                '        neighbors = get_maze_neighbors(r, c, rows, cols)  # [6] Get unvisited neighbors',
                '',
                '        if neighbors:  # [7] If unvisited neighbors exist',
                '            nr, nc = random.choice(neighbors)  # [8] Pick random neighbor',
                '            grid[(r + nr) // 2][(c + nc) // 2] = 1  # [9] Carve wall between',
                '            grid[nr][nc] = 1  # [10] Mark neighbor as passage',
                '            stack.append((nr, nc))  # [11] Push neighbor',
                '        else:  # [12] Dead end',
                '            stack.pop()  # [13] Backtrack',
                '    return grid',
            ],
            java: [
                '// Step 1: Generate a maze using iterative DFS',
                'void mazeRecursiveDFS(int[][] grid) {',
                '    int rows = grid.length, cols = grid[0].length;',
                '    Deque<int[]> stack = new ArrayDeque<>();  // [2]',
                '    stack.push(new int[]{1, 1});',
                '    grid[1][1] = 1;  // [3]',
                '',
                '    while (!stack.isEmpty()) {  // [4]',
                '        int[] cur = stack.peek();  // [5]',
                '        int r = cur[0], c = cur[1];',
                '        List<int[]> nbrs = getMazeNeighbors(r, c, rows, cols);  // [6]',
                '',
                '        if (!nbrs.isEmpty()) {  // [7]',
                '            int[] next = nbrs.get(random.nextInt(nbrs.size()));  // [8]',
                '            grid[(r + next[0]) / 2][(c + next[1]) / 2] = 1;  // [9]',
                '            grid[next[0]][next[1]] = 1;  // [10]',
                '            stack.push(next);  // [11]',
                '        } else {  // [12]',
                '            stack.pop();  // [13]',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Generate a maze using iterative DFS',
                'void mazeRecursiveDFS(vector<vector<int>>& grid) {',
                '    int rows = grid.size(), cols = grid[0].size();',
                '    vector<pair<int,int>> stk;  // [2]',
                '    stk.emplace_back(1, 1);',
                '    grid[1][1] = 1;  // [3]',
                '',
                '    while (!stk.empty()) {  // [4]',
                '        auto [r, c] = stk.back();  // [5]',
                '        auto nbrs = getMazeNeighbors(r, c, rows, cols);  // [6]',
                '',
                '        if (!nbrs.empty()) {  // [7]',
                '            auto [nr, nc] = nbrs[rand() % nbrs.size()];  // [8]',
                '            grid[(r+nr)/2][(c+nc)/2] = 1;  // [9]',
                '            grid[nr][nc] = 1;  // [10]',
                '            stk.emplace_back(nr, nc);  // [11]',
                '        } else {  // [12]',
                '            stk.pop_back();  // [13]',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Generate a maze using iterative DFS',
                'void maze_recursive_dfs(int **grid, int rows, int cols) {',
                '    int *sr = malloc(rows * cols * sizeof(int));',
                '    int *sc = malloc(rows * cols * sizeof(int));  // [2]',
                '    int top = 0; sr[top] = 1; sc[top] = 1;',
                '    grid[1][1] = 1;  // [3]',
                '',
                '    while (top >= 0) {  // [4]',
                '        int r = sr[top], c = sc[top];  // [5]',
                '        int nbrs[4][2], n = 0;  // [6]',
                '        get_maze_neighbors(r, c, rows, cols, nbrs, &n);',
                '',
                '        if (n > 0) {  // [7]',
                '            int idx = rand() % n;  // [8]',
                '            int nr = nbrs[idx][0], nc = nbrs[idx][1];',
                '            grid[(r+nr)/2][(c+nc)/2] = 1;  // [9]',
                '            grid[nr][nc] = 1;  // [10]',
                '            top++; sr[top] = nr; sc[top] = nc;  // [11]',
                '        } else {  // [12]',
                '            top--;  // [13]',
                '        }',
                '    }',
                '    free(sr); free(sc);',
                '}',
            ],
            csharp: [
                '// Step 1: Generate a maze using iterative DFS',
                'void MazeRecursiveDFS(int[,] grid) {',
                '    int rows = grid.GetLength(0), cols = grid.GetLength(1);',
                '    var stack = new Stack<(int, int)>();  // [2]',
                '    stack.Push((1, 1));',
                '    grid[1, 1] = 1;  // [3]',
                '',
                '    while (stack.Count > 0) {  // [4]',
                '        var (r, c) = stack.Peek();  // [5]',
                '        var nbrs = GetMazeNeighbors(r, c, rows, cols);  // [6]',
                '',
                '        if (nbrs.Count > 0) {  // [7]',
                '            var (nr, nc) = nbrs[rnd.Next(nbrs.Count)];  // [8]',
                '            grid[(r+nr)/2, (c+nc)/2] = 1;  // [9]',
                '            grid[nr, nc] = 1;  // [10]',
                '            stack.Push((nr, nc));  // [11]',
                '        } else {  // [12]',
                '            stack.Pop();  // [13]',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Generate a maze using iterative DFS',
                'function* mazeRecursiveDFS(grid) {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const stack = [[1, 1]];  // [2]',
                '    grid[1][1] = 1;  // [3]',
                '',
                '    while (stack.length > 0) {  // [4]',
                '        const [r, c] = stack[stack.length - 1];  // [5]',
                '        const nbrs = getMazeNeighbors(r, c, rows, cols);  // [6]',
                '',
                '        if (nbrs.length > 0) {  // [7]',
                '            const [nr, nc] = nbrs[Math.floor(Math.random() * nbrs.length)];  // [8]',
                '            grid[(r+nr)/2][(c+nc)/2] = 1;  // [9]',
                '            grid[nr][nc] = 1;  // [10]',
                '            stack.push([nr, nc]);  // [11]',
                '        } else {  // [12]',
                '            stack.pop();  // [13]',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            typescript: [
                '// Step 1: Generate a maze using iterative DFS',
                'function* mazeRecursiveDFS(grid: number[][]): Generator<Step, number[][], unknown> {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const stack: [number, number][] = [[1, 1]];  // [2]',
                '    grid[1][1] = 1;  // [3]',
                '',
                '    while (stack.length > 0) {  // [4]',
                '        const [r, c] = stack[stack.length - 1];  // [5]',
                '        const nbrs = getMazeNeighbors(r, c, rows, cols);  // [6]',
                '',
                '        if (nbrs.length > 0) {  // [7]',
                '            const [nr, nc] = nbrs[Math.floor(Math.random() * nbrs.length)];  // [8]',
                '            grid[(r+nr)/2][(c+nc)/2] = 1;  // [9]',
                '            grid[nr][nc] = 1;  // [10]',
                '            stack.push([nr, nc]);  // [11]',
                '        } else {  // [12]',
                '            stack.pop();  // [13]',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            go: [
                '// Step 1: Generate a maze using iterative DFS',
                'func MazeRecursiveDFS(grid [][]int) [][]int {',
                '    rows, cols := len(grid), len(grid[0])',
                '    stack := [][2]int{{1, 1}}  // [2]',
                '    grid[1][1] = 1  // [3]',
                '',
                '    for len(stack) > 0 {  // [4]',
                '        top := stack[len(stack)-1]  // [5]',
                '        r, c := top[0], top[1]',
                '        nbrs := getMazeNeighbors(r, c, rows, cols)  // [6]',
                '',
                '        if len(nbrs) > 0 {  // [7]',
                '            next := nbrs[rand.Intn(len(nbrs))]  // [8]',
                '            grid[(r+next[0])/2][(c+next[1])/2] = 1  // [9]',
                '            grid[next[0]][next[1]] = 1  // [10]',
                '            stack = append(stack, next)  // [11]',
                '        } else {  // [12]',
                '            stack = stack[:len(stack)-1]  // [13]',
                '        }',
                '    }',
                '    return grid',
                '}',
            ],
            rust: [
                '// Step 1: Generate a maze using iterative DFS',
                'fn maze_recursive_dfs(grid: &mut Vec<Vec<i32>>) {',
                '    let (rows, cols) = (grid.len(), grid[0].len());',
                '    let mut stack = vec![(1usize, 1usize)];  // [2]',
                '    grid[1][1] = 1;  // [3]',
                '',
                '    while !stack.is_empty() {  // [4]',
                '        let (r, c) = *stack.last().unwrap();  // [5]',
                '        let nbrs = get_maze_neighbors(r, c, rows, cols);  // [6]',
                '',
                '        if !nbrs.is_empty() {  // [7]',
                '            let (nr, nc) = nbrs[rand::thread_rng().gen_range(0..nbrs.len())];  // [8]',
                '            grid[(r+nr)/2][(c+nc)/2] = 1;  // [9]',
                '            grid[nr][nc] = 1;  // [10]',
                '            stack.push((nr, nc));  // [11]',
                '        } else {  // [12]',
                '            stack.pop();  // [13]',
                '        }',
                '    }',
                '}',
            ],
        },
        mazePrims: {
            pseudo: [
                '# Step 1: Generate a maze using randomised Prim\'s algorithm',
                'procedure primsMaze(grid):',
                '    start = (1, 1)  # [2] Begin at the top-left cell',
                '    grid[1][1] = PASSAGE  # [3] Mark the starting cell as open',
                '    frontier = getFrontierWalls(start)  # [4] Collect walls adjacent to start',
                '',
                '    while frontier is not empty:  # [5] While there are walls to consider',
                '        wall = randomChoice(frontier)  # [6] Pick a random wall from the frontier',
                '        remove wall from frontier  # [7] Remove the chosen wall',
                '        cellA, cellB = cellsOnEitherSide(wall)  # [8] Get the two cells separated by this wall',
                '',
                '        if exactly one of cellA, cellB is PASSAGE:  # [9] Check if this wall connects visited to unvisited',
                '            grid[wall] = PASSAGE  # [10] Open the wall',
                '            grid[unvisitedCell] = PASSAGE  # [11] Open the unvisited cell',
                '            add newFrontierWalls(unvisitedCell) to frontier  # [12] Add its walls to the frontier',
            ],
            python: [
                '# Step 1: Generate a maze using randomised Prim\'s algorithm',
                'def maze_prims(grid: list[list[int]]) -> list[list[int]]:',
                '    rows, cols = len(grid), len(grid[0])',
                '    grid[1][1] = 1  # [2-3] Mark start as passage',
                '    frontier = []  # [4]',
                '    for dr, dc in [(0,2),(0,-2),(2,0),(-2,0)]:  # [4]',
                '        nr, nc = 1+dr, 1+dc',
                '        if 0 < nr < rows-1 and 0 < nc < cols-1:',
                '            frontier.append((1+dr//2, 1+dc//2, nr, nc))',
                '',
                '    while frontier:  # [5]',
                '        idx = random.randrange(len(frontier))  # [6-7]',
                '        wr, wc, cr, cc = frontier.pop(idx)',
                '        if grid[cr][cc] != 1:  # [9] Target cell is unvisited',
                '            grid[wr][wc] = 1  # [10]',
                '            grid[cr][cc] = 1  # [11]',
                '            for dr, dc in [(0,2),(0,-2),(2,0),(-2,0)]:  # [12]',
                '                nr, nc = cr+dr, cc+dc',
                '                if 0 < nr < rows-1 and 0 < nc < cols-1 and grid[nr][nc] == 0:',
                '                    frontier.append((cr+dr//2, cc+dc//2, nr, nc))',
                '    return grid',
            ],
            java: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'void mazePrims(int[][] grid) {',
                '    int rows = grid.length, cols = grid[0].length;',
                '    grid[1][1] = 1;  // [2-3]',
                '    List<int[]> frontier = new ArrayList<>();  // [4]',
                '    int[][] dirs = {{0,2},{0,-2},{2,0},{-2,0}};',
                '    for (int[] d : dirs) {',
                '        int nr = 1+d[0], nc = 1+d[1];',
                '        if (nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1)',
                '            frontier.add(new int[]{1+d[0]/2, 1+d[1]/2, nr, nc});',
                '    }',
                '    while (!frontier.isEmpty()) {  // [5]',
                '        int idx = random.nextInt(frontier.size());  // [6-7]',
                '        int[] w = frontier.remove(idx);',
                '        if (grid[w[2]][w[3]] != 1) {  // [9]',
                '            grid[w[0]][w[1]] = 1;  // [10]',
                '            grid[w[2]][w[3]] = 1;  // [11]',
                '            for (int[] d : dirs) {  // [12]',
                '                int nr = w[2]+d[0], nc = w[3]+d[1];',
                '                if (nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1 && grid[nr][nc] == 0)',
                '                    frontier.add(new int[]{w[2]+d[0]/2, w[3]+d[1]/2, nr, nc});',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'void mazePrims(vector<vector<int>>& grid) {',
                '    int rows = grid.size(), cols = grid[0].size();',
                '    grid[1][1] = 1;  // [2-3]',
                '    vector<array<int,4>> frontier;  // [4]',
                '    int dirs[4][2] = {{0,2},{0,-2},{2,0},{-2,0}};',
                '    for (auto& d : dirs) {',
                '        int nr=1+d[0], nc=1+d[1];',
                '        if (nr>0 && nr<rows-1 && nc>0 && nc<cols-1)',
                '            frontier.push_back({1+d[0]/2, 1+d[1]/2, nr, nc});',
                '    }',
                '    while (!frontier.empty()) {  // [5]',
                '        int idx = rand() % frontier.size();  // [6-7]',
                '        auto [wr,wc,cr,cc] = frontier[idx];',
                '        frontier.erase(frontier.begin()+idx);',
                '        if (grid[cr][cc] != 1) {  // [9]',
                '            grid[wr][wc] = 1;  // [10]',
                '            grid[cr][cc] = 1;  // [11]',
                '            for (auto& d : dirs) {  // [12]',
                '                int nr=cr+d[0], nc=cc+d[1];',
                '                if (nr>0 && nr<rows-1 && nc>0 && nc<cols-1 && grid[nr][nc]==0)',
                '                    frontier.push_back({cr+d[0]/2, cc+d[1]/2, nr, nc});',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'void maze_prims(int **grid, int rows, int cols) {',
                '    grid[1][1] = 1;  // [2-3]',
                '    int (*frontier)[4] = malloc(rows*cols*sizeof(*frontier));',
                '    int fcount = 0;  // [4]',
                '    int dirs[4][2] = {{0,2},{0,-2},{2,0},{-2,0}};',
                '    for (int i = 0; i < 4; i++) {',
                '        int nr=1+dirs[i][0], nc=1+dirs[i][1];',
                '        if (nr>0 && nr<rows-1 && nc>0 && nc<cols-1)',
                '            frontier[fcount++] = (int[4]){1+dirs[i][0]/2, 1+dirs[i][1]/2, nr, nc};',
                '    }',
                '    while (fcount > 0) {  // [5]',
                '        int idx = rand() % fcount;  // [6-7]',
                '        int wr=frontier[idx][0], wc=frontier[idx][1];',
                '        int cr=frontier[idx][2], cc=frontier[idx][3];',
                '        frontier[idx] = frontier[--fcount];',
                '        if (grid[cr][cc] != 1) {  // [9]',
                '            grid[wr][wc] = 1;  // [10]',
                '            grid[cr][cc] = 1;  // [11]',
                '            for (int i = 0; i < 4; i++) {  // [12]',
                '                int nr=cr+dirs[i][0], nc=cc+dirs[i][1];',
                '                if (nr>0 && nr<rows-1 && nc>0 && nc<cols-1 && grid[nr][nc]==0)',
                '                    frontier[fcount++] = (int[4]){cr+dirs[i][0]/2, cc+dirs[i][1]/2, nr, nc};',
                '            }',
                '        }',
                '    }',
                '    free(frontier);',
                '}',
            ],
            csharp: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'void MazePrims(int[,] grid) {',
                '    int rows = grid.GetLength(0), cols = grid.GetLength(1);',
                '    grid[1, 1] = 1;  // [2-3]',
                '    var frontier = new List<(int,int,int,int)>();  // [4]',
                '    (int,int)[] dirs = {(0,2),(0,-2),(2,0),(-2,0)};',
                '    foreach (var (dr,dc) in dirs) {',
                '        int nr=1+dr, nc=1+dc;',
                '        if (nr>0 && nr<rows-1 && nc>0 && nc<cols-1)',
                '            frontier.Add((1+dr/2, 1+dc/2, nr, nc));',
                '    }',
                '    while (frontier.Count > 0) {  // [5]',
                '        int idx = rnd.Next(frontier.Count);  // [6-7]',
                '        var (wr,wc,cr,cc) = frontier[idx];',
                '        frontier.RemoveAt(idx);',
                '        if (grid[cr, cc] != 1) {  // [9]',
                '            grid[wr, wc] = 1;  // [10]',
                '            grid[cr, cc] = 1;  // [11]',
                '            foreach (var (dr,dc) in dirs) {  // [12]',
                '                int nr=cr+dr, nc=cc+dc;',
                '                if (nr>0 && nr<rows-1 && nc>0 && nc<cols-1 && grid[nr,nc]==0)',
                '                    frontier.Add((cr+dr/2, cc+dc/2, nr, nc));',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'function* mazePrims(grid) {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    grid[1][1] = 1;  // [2-3]',
                '    const frontier = [];  // [4]',
                '    const dirs = [[0,2],[0,-2],[2,0],[-2,0]];',
                '    for (const [dr, dc] of dirs) {',
                '        const nr = 1+dr, nc = 1+dc;',
                '        if (nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1)',
                '            frontier.push([1+dr/2, 1+dc/2, nr, nc]);',
                '    }',
                '    while (frontier.length > 0) {  // [5]',
                '        const idx = Math.floor(Math.random() * frontier.length);  // [6-7]',
                '        const [wr, wc, cr, cc] = frontier.splice(idx, 1)[0];',
                '        if (grid[cr][cc] !== 1) {  // [9]',
                '            grid[wr][wc] = 1;  // [10]',
                '            grid[cr][cc] = 1;  // [11]',
                '            for (const [dr, dc] of dirs) {  // [12]',
                '                const nr = cr+dr, nc = cc+dc;',
                '                if (nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1 && grid[nr][nc] === 0)',
                '                    frontier.push([cr+dr/2, cc+dc/2, nr, nc]);',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            typescript: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'function* mazePrims(grid: number[][]): Generator<Step, number[][], unknown> {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    grid[1][1] = 1;  // [2-3]',
                '    const frontier: [number,number,number,number][] = [];  // [4]',
                '    const dirs: [number,number][] = [[0,2],[0,-2],[2,0],[-2,0]];',
                '    for (const [dr, dc] of dirs) {',
                '        const nr = 1+dr, nc = 1+dc;',
                '        if (nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1)',
                '            frontier.push([1+Math.floor(dr/2), 1+Math.floor(dc/2), nr, nc]);',
                '    }',
                '    while (frontier.length > 0) {  // [5]',
                '        const idx = Math.floor(Math.random() * frontier.length);  // [6-7]',
                '        const [wr, wc, cr, cc] = frontier.splice(idx, 1)[0];',
                '        if (grid[cr][cc] !== 1) {  // [9]',
                '            grid[wr][wc] = 1;  // [10]',
                '            grid[cr][cc] = 1;  // [11]',
                '            for (const [dr, dc] of dirs) {  // [12]',
                '                const nr = cr+dr, nc = cc+dc;',
                '                if (nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1 && grid[nr][nc] === 0)',
                '                    frontier.push([cr+Math.floor(dr/2), cc+Math.floor(dc/2), nr, nc]);',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            go: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'func MazePrims(grid [][]int) [][]int {',
                '    rows, cols := len(grid), len(grid[0])',
                '    grid[1][1] = 1  // [2-3]',
                '    type wall struct{ wr,wc,cr,cc int }',
                '    frontier := []wall{}  // [4]',
                '    dirs := [][2]int{{0,2},{0,-2},{2,0},{-2,0}}',
                '    for _, d := range dirs {',
                '        nr, nc := 1+d[0], 1+d[1]',
                '        if nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1 {',
                '            frontier = append(frontier, wall{1+d[0]/2, 1+d[1]/2, nr, nc})',
                '        }',
                '    }',
                '    for len(frontier) > 0 {  // [5]',
                '        idx := rand.Intn(len(frontier))  // [6-7]',
                '        w := frontier[idx]',
                '        frontier = append(frontier[:idx], frontier[idx+1:]...)',
                '        if grid[w.cr][w.cc] != 1 {  // [9]',
                '            grid[w.wr][w.wc] = 1  // [10]',
                '            grid[w.cr][w.cc] = 1  // [11]',
                '            for _, d := range dirs {  // [12]',
                '                nr, nc := w.cr+d[0], w.cc+d[1]',
                '                if nr > 0 && nr < rows-1 && nc > 0 && nc < cols-1 && grid[nr][nc] == 0 {',
                '                    frontier = append(frontier, wall{w.cr+d[0]/2, w.cc+d[1]/2, nr, nc})',
                '                }',
                '            }',
                '        }',
                '    }',
                '    return grid',
                '}',
            ],
            rust: [
                '// Step 1: Generate a maze using Prim\'s algorithm',
                'fn maze_prims(grid: &mut Vec<Vec<i32>>) {',
                '    let (rows, cols) = (grid.len(), grid[0].len());',
                '    grid[1][1] = 1;  // [2-3]',
                '    let mut frontier: Vec<[i32; 4]> = Vec::new();  // [4]',
                '    let dirs: [[i32; 2]; 4] = [[0,2],[0,-2],[2,0],[-2,0]];',
                '    for d in &dirs {',
                '        let (nr, nc) = (1+d[0], 1+d[1]);',
                '        if nr > 0 && nr < rows as i32 -1 && nc > 0 && nc < cols as i32 -1',
                '            { frontier.push([1+d[0]/2, 1+d[1]/2, nr, nc]); }',
                '    }',
                '    while !frontier.is_empty() {  // [5]',
                '        let idx = rand::thread_rng().gen_range(0..frontier.len());  // [6-7]',
                '        let [wr, wc, cr, cc] = frontier.remove(idx);',
                '        if grid[cr as usize][cc as usize] != 1 {  // [9]',
                '            grid[wr as usize][wc as usize] = 1;  // [10]',
                '            grid[cr as usize][cc as usize] = 1;  // [11]',
                '            for d in &dirs {  // [12]',
                '                let (nr, nc) = (cr+d[0], cc+d[1]);',
                '                if nr>0 && nr<rows as i32 -1 && nc>0 && nc<cols as i32 -1',
                '                    && grid[nr as usize][nc as usize] == 0',
                '                    { frontier.push([cr+d[0]/2, cc+d[1]/2, nr, nc]); }',
                '            }',
                '        }',
                '    }',
                '}',
            ],
        },
        mazeBinaryTree: {
            pseudo: [
                '# Step 1: Generate a maze using the binary tree algorithm',
                'procedure binaryTreeMaze(grid):',
                '    for each cell (r, c) at odd positions:  # [2] Visit every cell in the grid',
                '        canNorth = r > 1  # [3] Check if we can carve north (not at top edge)',
                '        canEast = c < cols - 2  # [4] Check if we can carve east (not at right edge)',
                '',
                '        if canNorth and canEast:  # [5] If both directions are available',
                '            direction = randomChoice([NORTH, EAST])  # [6] Pick one at random',
                '        else if canNorth:  # [7]',
                '            direction = NORTH  # [8] Only north is available',
                '        else if canEast:  # [9]',
                '            direction = EAST  # [10] Only east is available',
                '        else:  # [11]',
                '            continue  # [12] Top-right corner, no direction available',
                '',
                '        if direction is NORTH:  # [13]',
                '            grid[r-1][c] = PASSAGE  # [14] Remove wall to the north',
                '        else:  # [15]',
                '            grid[r][c+1] = PASSAGE  # [16] Remove wall to the east',
            ],
            python: [
                '# Step 1: Generate a maze using the binary tree algorithm',
                'def maze_binary_tree(grid: list[list[int]]) -> list[list[int]]:',
                '    rows, cols = len(grid), len(grid[0])',
                '    for r in range(1, rows - 1, 2):  # [2]',
                '        for c in range(1, cols - 1, 2):',
                '            grid[r][c] = 1',
                '            can_north = r > 1  # [3]',
                '            can_east = c < cols - 2  # [4]',
                '',
                '            if can_north and can_east:  # [5]',
                '                if random.random() < 0.5:  # [6]',
                '                    grid[r-1][c] = 1  # [14]',
                '                else:',
                '                    grid[r][c+1] = 1  # [16]',
                '            elif can_north:  # [7]',
                '                grid[r-1][c] = 1  # [14]',
                '            elif can_east:  # [9]',
                '                grid[r][c+1] = 1  # [16]',
                '    return grid',
            ],
            java: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'void mazeBinaryTree(int[][] grid) {',
                '    int rows = grid.length, cols = grid[0].length;',
                '    for (int r = 1; r < rows - 1; r += 2) {  // [2]',
                '        for (int c = 1; c < cols - 1; c += 2) {',
                '            grid[r][c] = 1;',
                '            boolean north = r > 1;  // [3]',
                '            boolean east = c < cols - 2;  // [4]',
                '            if (north && east) {  // [5]',
                '                if (random.nextBoolean()) grid[r-1][c] = 1;  // [6,14]',
                '                else grid[r][c+1] = 1;  // [16]',
                '            } else if (north) {  // [7]',
                '                grid[r-1][c] = 1;  // [14]',
                '            } else if (east) {  // [9]',
                '                grid[r][c+1] = 1;  // [16]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'void mazeBinaryTree(vector<vector<int>>& grid) {',
                '    int rows = grid.size(), cols = grid[0].size();',
                '    for (int r = 1; r < rows-1; r += 2) {  // [2]',
                '        for (int c = 1; c < cols-1; c += 2) {',
                '            grid[r][c] = 1;',
                '            bool north = r > 1, east = c < cols-2;  // [3-4]',
                '            if (north && east) {  // [5]',
                '                if (rand()%2) grid[r-1][c] = 1;  // [6,14]',
                '                else grid[r][c+1] = 1;  // [16]',
                '            } else if (north) grid[r-1][c] = 1;  // [14]',
                '            else if (east) grid[r][c+1] = 1;  // [16]',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'void maze_binary_tree(int **grid, int rows, int cols) {',
                '    for (int r = 1; r < rows-1; r += 2) {  // [2]',
                '        for (int c = 1; c < cols-1; c += 2) {',
                '            grid[r][c] = 1;',
                '            int north = r > 1, east = c < cols-2;  // [3-4]',
                '            if (north && east) {  // [5]',
                '                if (rand()%2) grid[r-1][c] = 1;  // [6,14]',
                '                else grid[r][c+1] = 1;  // [16]',
                '            } else if (north) grid[r-1][c] = 1;  // [14]',
                '            else if (east) grid[r][c+1] = 1;  // [16]',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'void MazeBinaryTree(int[,] grid) {',
                '    int rows = grid.GetLength(0), cols = grid.GetLength(1);',
                '    for (int r = 1; r < rows-1; r += 2) {  // [2]',
                '        for (int c = 1; c < cols-1; c += 2) {',
                '            grid[r, c] = 1;',
                '            bool north = r > 1, east = c < cols-2;  // [3-4]',
                '            if (north && east) {  // [5]',
                '                if (rnd.Next(2) == 0) grid[r-1, c] = 1;  // [6,14]',
                '                else grid[r, c+1] = 1;  // [16]',
                '            } else if (north) grid[r-1, c] = 1;  // [14]',
                '            else if (east) grid[r, c+1] = 1;  // [16]',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'function* mazeBinaryTree(grid) {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    for (let r = 1; r < rows-1; r += 2) {  // [2]',
                '        for (let c = 1; c < cols-1; c += 2) {',
                '            grid[r][c] = 1;',
                '            const north = r > 1, east = c < cols-2;  // [3-4]',
                '            if (north && east) {  // [5]',
                '                if (Math.random() < 0.5) grid[r-1][c] = 1;  // [6,14]',
                '                else grid[r][c+1] = 1;  // [16]',
                '            } else if (north) grid[r-1][c] = 1;  // [14]',
                '            else if (east) grid[r][c+1] = 1;  // [16]',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            typescript: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'function* mazeBinaryTree(grid: number[][]): Generator<Step, number[][], unknown> {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    for (let r = 1; r < rows-1; r += 2) {  // [2]',
                '        for (let c = 1; c < cols-1; c += 2) {',
                '            grid[r][c] = 1;',
                '            const north = r > 1, east = c < cols-2;  // [3-4]',
                '            if (north && east) {  // [5]',
                '                if (Math.random() < 0.5) grid[r-1][c] = 1;  // [6,14]',
                '                else grid[r][c+1] = 1;  // [16]',
                '            } else if (north) grid[r-1][c] = 1;  // [14]',
                '            else if (east) grid[r][c+1] = 1;  // [16]',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            go: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'func MazeBinaryTree(grid [][]int) [][]int {',
                '    rows, cols := len(grid), len(grid[0])',
                '    for r := 1; r < rows-1; r += 2 {  // [2]',
                '        for c := 1; c < cols-1; c += 2 {',
                '            grid[r][c] = 1',
                '            north, east := r > 1, c < cols-2  // [3-4]',
                '            if north && east {  // [5]',
                '                if rand.Intn(2) == 0 { grid[r-1][c] = 1 }  // [6,14]',
                '                else { grid[r][c+1] = 1 }  // [16]',
                '            } else if north { grid[r-1][c] = 1 }  // [14]',
                '            else if east { grid[r][c+1] = 1 }  // [16]',
                '        }',
                '    }',
                '    return grid',
                '}',
            ],
            rust: [
                '// Step 1: Generate a maze using binary tree algorithm',
                'fn maze_binary_tree(grid: &mut Vec<Vec<i32>>) {',
                '    let (rows, cols) = (grid.len(), grid[0].len());',
                '    for r in (1..rows-1).step_by(2) {  // [2]',
                '        for c in (1..cols-1).step_by(2) {',
                '            grid[r][c] = 1;',
                '            let north = r > 1;  // [3]',
                '            let east = c < cols-2;  // [4]',
                '            if north && east {  // [5]',
                '                if rand::random::<bool>() { grid[r-1][c] = 1; }  // [6,14]',
                '                else { grid[r][c+1] = 1; }  // [16]',
                '            } else if north { grid[r-1][c] = 1; }  // [14]',
                '            else if east { grid[r][c+1] = 1; }  // [16]',
                '        }',
                '    }',
                '}',
            ],
        },
        pathBFS: {
            pseudo: [
                '# Step 1: Find shortest path in a maze using breadth-first search',
                'procedure pathBFS(grid):',
                '    start = (1, 1), end = (rows-2, cols-2)  # [2] Define start and end positions',
                '    queue = [start]  # [3] Initialize queue with the start cell',
                '    visited = {start}  # [4] Mark start as visited',
                '    prev = empty map  # [5] Map to reconstruct the path later',
                '',
                '    while queue is not empty:  # [6] Process cells level by level',
                '        current = queue.dequeue()  # [7] Take the next cell from the front',
                '        if current == end:  # [8] We reached the destination',
                '            return reconstructPath(prev, end)  # [9] Trace back the path',
                '',
                '        for each neighbor of current:  # [10] Check all four directions',
                '            if neighbor not in visited and not a wall:  # [11]',
                '                visited.add(neighbor)  # [12] Mark neighbor as visited',
                '                prev[neighbor] = current  # [13] Remember how we got here',
                '                queue.enqueue(neighbor)  # [14] Add neighbor to the queue',
            ],
            python: [
                '# Step 1: Find shortest path using BFS',
                'from collections import deque',
                'def path_bfs(grid: list[list[int]]) -> list[list[int]]:',
                '    rows, cols = len(grid), len(grid[0])',
                '    start, end = (1, 1), (rows-2, cols-2)  # [2]',
                '    queue = deque([start])  # [3]',
                '    visited = {start}  # [4]',
                '    prev = {}  # [5]',
                '',
                '    while queue:  # [6]',
                '        r, c = queue.popleft()  # [7]',
                '        if (r, c) == end:  # [8]',
                '            return reconstruct_path(prev, end)  # [9]',
                '        for nr, nc in get_path_neighbors(grid, r, c, rows, cols):  # [10]',
                '            if (nr, nc) not in visited:  # [11]',
                '                visited.add((nr, nc))  # [12]',
                '                prev[(nr, nc)] = (r, c)  # [13]',
                '                queue.append((nr, nc))  # [14]',
                '    return grid  # No path found',
            ],
            java: [
                '// Step 1: Find shortest path using BFS',
                'void pathBFS(int[][] grid) {',
                '    int rows = grid.length, cols = grid[0].length;',
                '    int[] start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    Queue<int[]> queue = new LinkedList<>();  // [3]',
                '    queue.add(start);',
                '    Set<String> visited = new HashSet<>();  // [4]',
                '    visited.add("1,1");',
                '    Map<String, String> prev = new HashMap<>();  // [5]',
                '',
                '    while (!queue.isEmpty()) {  // [6]',
                '        int[] cur = queue.poll();  // [7]',
                '        if (cur[0]==end[0] && cur[1]==end[1]) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (int[] nb : getPathNeighbors(grid, cur[0], cur[1], rows, cols)) {  // [10]',
                '            String key = nb[0]+","+nb[1];',
                '            if (!visited.contains(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.put(key, cur[0]+","+cur[1]);  // [13]',
                '                queue.add(nb);  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Find shortest path using BFS',
                'void pathBFS(vector<vector<int>>& grid) {',
                '    int rows = grid.size(), cols = grid[0].size();',
                '    pair<int,int> start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    queue<pair<int,int>> q;  // [3]',
                '    q.push(start);',
                '    set<string> visited; visited.insert("1,1");  // [4]',
                '    map<string,string> prev;  // [5]',
                '',
                '    while (!q.empty()) {  // [6]',
                '        auto [r,c] = q.front(); q.pop();  // [7]',
                '        if (r==end.first && c==end.second) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (auto [nr,nc] : getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            string key = to_string(nr)+","+to_string(nc);',
                '            if (!visited.count(key)) {  // [11]',
                '                visited.insert(key);  // [12]',
                '                prev[key] = to_string(r)+","+to_string(c);  // [13]',
                '                q.push({nr,nc});  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Find shortest path using BFS',
                'void path_bfs(int **grid, int rows, int cols) {',
                '    int sr=1,sc=1,er=rows-2,ec=cols-2;  // [2]',
                '    int *qr=malloc(rows*cols*sizeof(int));',
                '    int *qc=malloc(rows*cols*sizeof(int));  // [3]',
                '    int qh=0, qt=0; qr[qt]=sr; qc[qt++]=sc;',
                '    char **vis=calloc(rows,sizeof(char*));  // [4]',
                '    for(int i=0;i<rows;i++) vis[i]=calloc(cols,sizeof(char));',
                '    vis[sr][sc]=1;',
                '    while(qh<qt) {  // [6]',
                '        int r=qr[qh], c=qc[qh++];  // [7]',
                '        if(r==er && c==ec) { /* [8] reconstruct path */ return; }',
                '        int dirs[4][2]={{0,1},{0,-1},{1,0},{-1,0}};  // [10]',
                '        for(int i=0;i<4;i++) {',
                '            int nr=r+dirs[i][0], nc=c+dirs[i][1];',
                '            if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&!vis[nr][nc]&&grid[nr][nc]) {  // [11]',
                '                vis[nr][nc]=1;  // [12]',
                '                qr[qt]=nr; qc[qt++]=nc;  // [14]',
                '            }',
                '        }',
                '    }',
                '    free(qr); free(qc);',
                '}',
            ],
            csharp: [
                '// Step 1: Find shortest path using BFS',
                'void PathBFS(int[,] grid) {',
                '    int rows = grid.GetLength(0), cols = grid.GetLength(1);',
                '    (int,int) start = (1,1), end = (rows-2, cols-2);  // [2]',
                '    var queue = new Queue<(int,int)>();  // [3]',
                '    queue.Enqueue(start);',
                '    var visited = new HashSet<string>(); visited.Add("1,1");  // [4]',
                '    var prev = new Dictionary<string, string>();  // [5]',
                '',
                '    while (queue.Count > 0) {  // [6]',
                '        var (r,c) = queue.Dequeue();  // [7]',
                '        if ((r,c) == end) { ReconstructPath(prev, end); return; }  // [8-9]',
                '        foreach (var (nr,nc) in GetPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            string key = $"{nr},{nc}";',
                '            if (!visited.Contains(key)) {  // [11]',
                '                visited.Add(key);  // [12]',
                '                prev[key] = $"{r},{c}";  // [13]',
                '                queue.Enqueue((nr,nc));  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Find shortest path using BFS',
                'function* pathBFS(grid) {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const start = [1,1], end = [rows-2, cols-2];  // [2]',
                '    const queue = [start];  // [3]',
                '    const visited = new Set(["1,1"]);  // [4]',
                '    const prev = new Map();  // [5]',
                '',
                '    while (queue.length > 0) {  // [6]',
                '        const [r, c] = queue.shift();  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const key = `${nr},${nc}`;',
                '            if (!visited.has(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                queue.push([nr, nc]);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            typescript: [
                '// Step 1: Find shortest path using BFS',
                'function* pathBFS(grid: number[][]): Generator<Step, number[][], unknown> {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const end = [rows-2, cols-2];  // [2]',
                '    const queue: [number, number][] = [[1, 1]];  // [3]',
                '    const visited = new Set<string>(["1,1"]);  // [4]',
                '    const prev = new Map<string, string>();  // [5]',
                '',
                '    while (queue.length > 0) {  // [6]',
                '        const [r, c] = queue.shift()!;  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const key = `${nr},${nc}`;',
                '            if (!visited.has(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                queue.push([nr, nc]);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            go: [
                '// Step 1: Find shortest path using BFS',
                'func PathBFS(grid [][]int) [][]int {',
                '    rows, cols := len(grid), len(grid[0])',
                '    end := [2]int{rows-2, cols-2}  // [2]',
                '    type cell [2]int',
                '    queue := []cell{{1, 1}}  // [3]',
                '    visited := map[string]bool{"1,1": true}  // [4]',
                '    prev := map[string]string{}  // [5]',
                '',
                '    for len(queue) > 0 {  // [6]',
                '        cur := queue[0]; queue = queue[1:]  // [7]',
                '        if cur == end { /* [8] reconstruct */ return grid }',
                '        for _, nb := range getPathNeighbors(grid, cur[0], cur[1], rows, cols) {  // [10]',
                '            key := fmt.Sprintf("%d,%d", nb[0], nb[1])',
                '            if !visited[key] {  // [11]',
                '                visited[key] = true  // [12]',
                '                prev[key] = fmt.Sprintf("%d,%d", cur[0], cur[1])  // [13]',
                '                queue = append(queue, nb)  // [14]',
                '            }',
                '        }',
                '    }',
                '    return grid',
                '}',
            ],
            rust: [
                '// Step 1: Find shortest path using BFS',
                'fn path_bfs(grid: &mut Vec<Vec<i32>>) {',
                '    let (rows, cols) = (grid.len(), grid[0].len());',
                '    let end = (rows-2, cols-2);  // [2]',
                '    let mut queue = std::collections::VecDeque::new();  // [3]',
                '    queue.push_back((1usize, 1usize));',
                '    let mut visited = std::collections::HashSet::new();  // [4]',
                '    visited.insert((1, 1));',
                '    let mut prev: std::collections::HashMap<String, String> = HashMap::new();  // [5]',
                '',
                '    while let Some((r, c)) = queue.pop_front() {  // [6]',
                '        if (r, c) == end { /* [8] reconstruct path */ return; }',
                '        for (nr, nc) in get_path_neighbors(grid, r, c, rows, cols) {  // [10]',
                '            if !visited.contains(&(nr, nc)) {  // [11]',
                '                visited.insert((nr, nc));  // [12]',
                '                prev.insert(format!("{},{}", nr, nc), format!("{},{}", r, c));  // [13]',
                '                queue.push_back((nr, nc));  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
        },
        pathDFS: {
            pseudo: [
                '# Step 1: Find a path in a maze using depth-first search',
                'procedure pathDFS(grid):',
                '    start = (1, 1), end = (rows-2, cols-2)  # [2] Define start and end positions',
                '    stack = [start]  # [3] Initialize stack with the start cell',
                '    visited = {start}  # [4] Mark start as visited',
                '    prev = empty map  # [5] Map to reconstruct the path later',
                '',
                '    while stack is not empty:  # [6] Process cells depth-first',
                '        current = stack.pop()  # [7] Take the next cell from the top',
                '        if current == end:  # [8] We reached the destination',
                '            return reconstructPath(prev, end)  # [9] Trace back the path',
                '',
                '        for each neighbor of current:  # [10] Check all four directions',
                '            if neighbor not in visited and not a wall:  # [11]',
                '                visited.add(neighbor)  # [12] Mark neighbor as visited',
                '                prev[neighbor] = current  # [13] Remember how we got here',
                '                stack.push(neighbor)  # [14] Add neighbor to the stack',
            ],
            python: [
                '# Step 1: Find a path using DFS',
                'def path_dfs(grid: list[list[int]]) -> list[list[int]]:',
                '    rows, cols = len(grid), len(grid[0])',
                '    start, end = (1, 1), (rows-2, cols-2)  # [2]',
                '    stack = [start]  # [3]',
                '    visited = {start}  # [4]',
                '    prev = {}  # [5]',
                '',
                '    while stack:  # [6]',
                '        r, c = stack.pop()  # [7]',
                '        if (r, c) == end:  # [8]',
                '            return reconstruct_path(prev, end)  # [9]',
                '        for nr, nc in get_path_neighbors(grid, r, c, rows, cols):  # [10]',
                '            if (nr, nc) not in visited:  # [11]',
                '                visited.add((nr, nc))  # [12]',
                '                prev[(nr, nc)] = (r, c)  # [13]',
                '                stack.append((nr, nc))  # [14]',
                '    return grid',
            ],
            java: [
                '// Step 1: Find a path using DFS',
                'void pathDFS(int[][] grid) {',
                '    int rows = grid.length, cols = grid[0].length;',
                '    int[] start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    Deque<int[]> stack = new ArrayDeque<>();  // [3]',
                '    stack.push(start);',
                '    Set<String> visited = new HashSet<>(); visited.add("1,1");  // [4]',
                '    Map<String, String> prev = new HashMap<>();  // [5]',
                '',
                '    while (!stack.isEmpty()) {  // [6]',
                '        int[] cur = stack.pop();  // [7]',
                '        if (cur[0]==end[0] && cur[1]==end[1]) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (int[] nb : getPathNeighbors(grid, cur[0], cur[1], rows, cols)) {  // [10]',
                '            String key = nb[0]+","+nb[1];',
                '            if (!visited.contains(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.put(key, cur[0]+","+cur[1]);  // [13]',
                '                stack.push(nb);  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Find a path using DFS',
                'void pathDFS(vector<vector<int>>& grid) {',
                '    int rows = grid.size(), cols = grid[0].size();',
                '    pair<int,int> start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    stack<pair<int,int>> stk;  // [3]',
                '    stk.push(start);',
                '    set<string> visited; visited.insert("1,1");  // [4]',
                '    map<string,string> prev;  // [5]',
                '',
                '    while (!stk.empty()) {  // [6]',
                '        auto [r,c] = stk.top(); stk.pop();  // [7]',
                '        if (r==end.first && c==end.second) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (auto [nr,nc] : getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            string key = to_string(nr)+","+to_string(nc);',
                '            if (!visited.count(key)) {  // [11]',
                '                visited.insert(key);  // [12]',
                '                prev[key] = to_string(r)+","+to_string(c);  // [13]',
                '                stk.push({nr,nc});  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Find a path using DFS',
                'void path_dfs(int **grid, int rows, int cols) {',
                '    int sr=1,sc=1,er=rows-2,ec=cols-2;  // [2]',
                '    int *stk_r=malloc(rows*cols*sizeof(int));',
                '    int *stk_c=malloc(rows*cols*sizeof(int));  // [3]',
                '    int top=0; stk_r[0]=sr; stk_c[0]=sc;',
                '    char **vis=calloc(rows,sizeof(char*));  // [4]',
                '    for(int i=0;i<rows;i++) vis[i]=calloc(cols,sizeof(char));',
                '    vis[sr][sc]=1;',
                '    while(top>=0) {  // [6]',
                '        int r=stk_r[top], c=stk_c[top--];  // [7]',
                '        if(r==er && c==ec) { /* [8] reconstruct */ return; }',
                '        int dirs[4][2]={{0,1},{0,-1},{1,0},{-1,0}};  // [10]',
                '        for(int i=0;i<4;i++) {',
                '            int nr=r+dirs[i][0], nc=c+dirs[i][1];',
                '            if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&!vis[nr][nc]&&grid[nr][nc]) {  // [11]',
                '                vis[nr][nc]=1;  // [12]',
                '                top++; stk_r[top]=nr; stk_c[top]=nc;  // [14]',
                '            }',
                '        }',
                '    }',
                '    free(stk_r); free(stk_c);',
                '}',
            ],
            csharp: [
                '// Step 1: Find a path using DFS',
                'void PathDFS(int[,] grid) {',
                '    int rows = grid.GetLength(0), cols = grid.GetLength(1);',
                '    (int,int) start = (1,1), end = (rows-2, cols-2);  // [2]',
                '    var stack = new Stack<(int,int)>();  // [3]',
                '    stack.Push(start);',
                '    var visited = new HashSet<string>(); visited.Add("1,1");  // [4]',
                '    var prev = new Dictionary<string, string>();  // [5]',
                '',
                '    while (stack.Count > 0) {  // [6]',
                '        var (r,c) = stack.Pop();  // [7]',
                '        if ((r,c) == end) { ReconstructPath(prev, end); return; }  // [8-9]',
                '        foreach (var (nr,nc) in GetPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            string key = $"{nr},{nc}";',
                '            if (!visited.Contains(key)) {  // [11]',
                '                visited.Add(key);  // [12]',
                '                prev[key] = $"{r},{c}";  // [13]',
                '                stack.Push((nr,nc));  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Find a path using DFS',
                'function* pathDFS(grid) {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const start = [1,1], end = [rows-2, cols-2];  // [2]',
                '    const stack = [start];  // [3]',
                '    const visited = new Set(["1,1"]);  // [4]',
                '    const prev = new Map();  // [5]',
                '',
                '    while (stack.length > 0) {  // [6]',
                '        const [r, c] = stack.pop();  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const key = `${nr},${nc}`;',
                '            if (!visited.has(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                stack.push([nr, nc]);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            typescript: [
                '// Step 1: Find a path using DFS',
                'function* pathDFS(grid: number[][]): Generator<Step, number[][], unknown> {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const end = [rows-2, cols-2];  // [2]',
                '    const stack: [number, number][] = [[1, 1]];  // [3]',
                '    const visited = new Set<string>(["1,1"]);  // [4]',
                '    const prev = new Map<string, string>();  // [5]',
                '',
                '    while (stack.length > 0) {  // [6]',
                '        const [r, c] = stack.pop()!;  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const key = `${nr},${nc}`;',
                '            if (!visited.has(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                stack.push([nr, nc]);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            go: [
                '// Step 1: Find a path using DFS',
                'func PathDFS(grid [][]int) [][]int {',
                '    rows, cols := len(grid), len(grid[0])',
                '    end := [2]int{rows-2, cols-2}  // [2]',
                '    stack := [][2]int{{1, 1}}  // [3]',
                '    visited := map[string]bool{"1,1": true}  // [4]',
                '    prev := map[string]string{}  // [5]',
                '',
                '    for len(stack) > 0 {  // [6]',
                '        cur := stack[len(stack)-1]; stack = stack[:len(stack)-1]  // [7]',
                '        if cur == end { /* [8] reconstruct */ return grid }',
                '        for _, nb := range getPathNeighbors(grid, cur[0], cur[1], rows, cols) {  // [10]',
                '            key := fmt.Sprintf("%d,%d", nb[0], nb[1])',
                '            if !visited[key] {  // [11]',
                '                visited[key] = true  // [12]',
                '                prev[key] = fmt.Sprintf("%d,%d", cur[0], cur[1])  // [13]',
                '                stack = append(stack, nb)  // [14]',
                '            }',
                '        }',
                '    }',
                '    return grid',
                '}',
            ],
            rust: [
                '// Step 1: Find a path using DFS',
                'fn path_dfs(grid: &mut Vec<Vec<i32>>) {',
                '    let (rows, cols) = (grid.len(), grid[0].len());',
                '    let end = (rows-2, cols-2);  // [2]',
                '    let mut stack = vec![(1usize, 1usize)];  // [3]',
                '    let mut visited = std::collections::HashSet::new();  // [4]',
                '    visited.insert((1, 1));',
                '    let mut prev: std::collections::HashMap<String, String> = HashMap::new();  // [5]',
                '',
                '    while let Some((r, c)) = stack.pop() {  // [6]',
                '        if (r, c) == end { /* [8] reconstruct path */ return; }',
                '        for (nr, nc) in get_path_neighbors(grid, r, c, rows, cols) {  // [10]',
                '            if !visited.contains(&(nr, nc)) {  // [11]',
                '                visited.insert((nr, nc));  // [12]',
                '                prev.insert(format!("{},{}", nr, nc), format!("{},{}", r, c));  // [13]',
                '                stack.push((nr, nc));  // [14]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
        },
        pathAStar: {
            pseudo: [
                '# Step 1: Find shortest path using A* with Manhattan heuristic',
                'procedure pathAStar(grid):',
                '    start = (1, 1), end = (rows-2, cols-2)  # [2] Define start and end positions',
                '    openSet = MinHeap with start  # [3] Priority queue ordered by f = g + h',
                '    gScore = {start: 0}  # [4] Cost from start to each cell',
                '    prev = empty map  # [5] Map to reconstruct the path later',
                '',
                '    while openSet is not empty:  # [6] While there are cells to evaluate',
                '        current = openSet.extractMin()  # [7] Get cell with lowest f score',
                '        if current == end:  # [8] We reached the destination',
                '            return reconstructPath(prev, end)  # [9] Trace back the path',
                '',
                '        for each neighbor of current:  # [10] Check all four directions',
                '            tentativeG = gScore[current] + 1  # [11] Cost to reach neighbor through current',
                '            if tentativeG < gScore[neighbor]:  # [12] Found a better path to neighbor',
                '                prev[neighbor] = current  # [13] Remember the path',
                '                gScore[neighbor] = tentativeG  # [14] Update the best cost',
                '                f = tentativeG + heuristic(neighbor, end)  # [15] Calculate f = g + h',
                '                openSet.insert(neighbor, f)  # [16] Add to open set with priority f',
            ],
            python: [
                '# Step 1: Find shortest path using A*',
                'import heapq',
                'def path_a_star(grid: list[list[int]]) -> list[list[int]]:',
                '    rows, cols = len(grid), len(grid[0])',
                '    start, end = (1, 1), (rows-2, cols-2)  # [2]',
                '    open_set = [(manhattan(1,1,end[0],end[1]), 0, 1, 1)]  # [3]',
                '    g_score = {(1,1): 0}  # [4]',
                '    prev = {}  # [5]',
                '',
                '    while open_set:  # [6]',
                '        f, g, r, c = heapq.heappop(open_set)  # [7]',
                '        if (r, c) == end:  # [8]',
                '            return reconstruct_path(prev, end)  # [9]',
                '        if g > g_score.get((r,c), float(\'inf\')): continue',
                '        for nr, nc in get_path_neighbors(grid, r, c, rows, cols):  # [10]',
                '            tg = g + 1  # [11]',
                '            if tg < g_score.get((nr,nc), float(\'inf\')):  # [12]',
                '                prev[(nr,nc)] = (r,c)  # [13]',
                '                g_score[(nr,nc)] = tg  # [14]',
                '                heapq.heappush(open_set, (tg+manhattan(nr,nc,end[0],end[1]), tg, nr, nc))  # [15-16]',
                '    return grid',
            ],
            java: [
                '// Step 1: Find shortest path using A*',
                'void pathAStar(int[][] grid) {',
                '    int rows = grid.length, cols = grid[0].length;',
                '    int[] start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    PriorityQueue<int[]> open = new PriorityQueue<>(  // [3]',
                '        (a,b) -> Integer.compare(a[0], b[0]));',
                '    open.add(new int[]{manhattan(1,1,end[0],end[1]), 0, 1, 1});',
                '    Map<String, Integer> gScore = new HashMap<>(); gScore.put("1,1", 0);  // [4]',
                '    Map<String, String> prev = new HashMap<>();  // [5]',
                '',
                '    while (!open.isEmpty()) {  // [6]',
                '        int[] cur = open.poll();  // [7]',
                '        int r=cur[2], c=cur[3], g=cur[1];',
                '        if (r==end[0] && c==end[1]) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (int[] nb : getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            int tg = g + 1;  // [11]',
                '            String key = nb[0]+","+nb[1];',
                '            if (tg < gScore.getOrDefault(key, Integer.MAX_VALUE)) {  // [12]',
                '                prev.put(key, r+","+c);  // [13]',
                '                gScore.put(key, tg);  // [14]',
                '                int f = tg + manhattan(nb[0],nb[1],end[0],end[1]);  // [15]',
                '                open.add(new int[]{f, tg, nb[0], nb[1]});  // [16]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Find shortest path using A*',
                'void pathAStar(vector<vector<int>>& grid) {',
                '    int rows = grid.size(), cols = grid[0].size();',
                '    pair<int,int> start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    priority_queue<tuple<int,int,int,int>, vector<tuple<int,int,int,int>>, greater<>> open;  // [3]',
                '    open.push({manhattan(1,1,end.first,end.second), 0, 1, 1});',
                '    map<string,int> gScore; gScore["1,1"] = 0;  // [4]',
                '    map<string,string> prev;  // [5]',
                '',
                '    while (!open.empty()) {  // [6]',
                '        auto [f,g,r,c] = open.top(); open.pop();  // [7]',
                '        if (r==end.first && c==end.second) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (auto [nr,nc] : getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            int tg = g + 1;  // [11]',
                '            string key = to_string(nr)+","+to_string(nc);',
                '            if (tg < gScore.count(key) ? gScore[key] : INT_MAX) {  // [12]',
                '                prev[key] = to_string(r)+","+to_string(c);  // [13]',
                '                gScore[key] = tg;  // [14]',
                '                open.push({tg+manhattan(nr,nc,end.first,end.second), tg, nr, nc});  // [15-16]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Find shortest path using A*',
                'typedef struct { int r, c, g, f; } AStarNode;',
                'int astar_cmp(const void *a, const void *b) { return ((AStarNode*)a)->f - ((AStarNode*)b)->f; }',
                'void path_a_star(int **grid, int rows, int cols) {',
                '    int er=rows-2, ec=cols-2;  // [2]',
                '    AStarNode *open = malloc(rows*cols*sizeof(AStarNode));  // [3]',
                '    int on = 0;',
                '    open[on++] = (AStarNode){1, 1, 0, manhattan(1,1,er,ec)};',
                '    int *gs = calloc(rows*cols, sizeof(int)); gs[1*cols+1] = 0;  // [4]',
                '    while (on > 0) {  // [6]',
                '        qsort(open, on, sizeof(AStarNode), astar_cmp);',
                '        AStarNode cur = open[--on];  // [7]',
                '        if (cur.r==er && cur.c==ec) { /* [8] reconstruct */ return; }',
                '        int dirs[4][2]={{0,1},{0,-1},{1,0},{-1,0}};  // [10]',
                '        for (int i=0; i<4; i++) {',
                '            int nr=cur.r+dirs[i][0], nc=cur.c+dirs[i][1];',
                '            if (nr>=0&&nr<rows&&nc>=0&&nc<cols&&grid[nr][nc]) {',
                '                int tg = cur.g + 1;  // [11]',
                '                if (tg < gs[nr*cols+nc]) {  // [12]',
                '                    gs[nr*cols+nc] = tg;  // [14]',
                '                    open[on++] = (AStarNode){nr,nc,tg,tg+manhattan(nr,nc,er,ec)};  // [15-16]',
                '                }',
                '            }',
                '        }',
                '    }',
                '    free(open); free(gs);',
                '}',
            ],
            csharp: [
                '// Step 1: Find shortest path using A*',
                'void PathAStar(int[,] grid) {',
                '    int rows = grid.GetLength(0), cols = grid.GetLength(1);',
                '    (int,int) start = (1,1), end = (rows-2, cols-2);  // [2]',
                '    var open = new PriorityQueue<(int,int), int>();  // [3]',
                '    open.Enqueue((1,1), Manhattan(1,1,end.Item1,end.Item2));',
                '    var gScore = new Dictionary<string,int> { ["1,1"] = 0 };  // [4]',
                '    var prev = new Dictionary<string, string>();  // [5]',
                '',
                '    while (open.Count > 0) {  // [6]',
                '        var (r,c) = open.Dequeue();  // [7]',
                '        if ((r,c) == end) { ReconstructPath(prev, end); return; }  // [8-9]',
                '        foreach (var (nr,nc) in GetPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            int tg = gScore[$"{r},{c}"] + 1;  // [11]',
                '            string key = $"{nr},{nc}";',
                '            if (tg < gScore.GetValueOrDefault(key, int.MaxValue)) {  // [12]',
                '                prev[key] = $"{r},{c}";  // [13]',
                '                gScore[key] = tg;  // [14]',
                '                open.Enqueue((nr,nc), tg + Manhattan(nr,nc,end.Item1,end.Item2));  // [15-16]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Find shortest path using A*',
                'function* pathAStar(grid) {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const end = [rows-2, cols-2];  // [2]',
                '    const open = new MinHeap();  // [3]',
                '    open.push({ row: 1, col: 1, priority: manhattan(1,1,end[0],end[1]) });',
                '    const gScore = new Map([["1,1", 0]]);  // [4]',
                '    const prev = new Map();  // [5]',
                '',
                '    while (!open.isEmpty()) {  // [6]',
                '        const { row: r, col: c } = open.pop();  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        const g = gScore.get(`${r},${c}`);',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const tg = g + 1;  // [11]',
                '            const key = `${nr},${nc}`;',
                '            if (tg < (gScore.get(key) ?? Infinity)) {  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                gScore.set(key, tg);  // [14]',
                '                open.push({ row: nr, col: nc, priority: tg + manhattan(nr,nc,end[0],end[1]) });  // [15-16]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            typescript: [
                '// Step 1: Find shortest path using A*',
                'function* pathAStar(grid: number[][]): Generator<Step, number[][], unknown> {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const end = [rows-2, cols-2];  // [2]',
                '    const open = new MinHeap();  // [3]',
                '    open.push({ row: 1, col: 1, priority: manhattan(1,1,end[0],end[1]) });',
                '    const gScore = new Map<string, number>([["1,1", 0]]);  // [4]',
                '    const prev = new Map<string, string>();  // [5]',
                '',
                '    while (!open.isEmpty()) {  // [6]',
                '        const { row: r, col: c } = open.pop()!;  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        const g = gScore.get(`${r},${c}`)!;',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const tg = g + 1;  // [11]',
                '            const key = `${nr},${nc}`;',
                '            if (tg < (gScore.get(key) ?? Infinity)) {  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                gScore.set(key, tg);  // [14]',
                '                open.push({ row: nr, col: nc, priority: tg + manhattan(nr,nc,end[0],end[1]) });  // [15-16]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            go: [
                '// Step 1: Find shortest path using A*',
                'func PathAStar(grid [][]int) [][]int {',
                '    rows, cols := len(grid), len(grid[0])',
                '    end := [2]int{rows-2, cols-2}  // [2]',
                '    open := container.NewHeap(func(a,b any) int { return 0 })  // [3]',
                '    gScore := map[string]int{"1,1": 0}  // [4]',
                '    prev := map[string]string{}  // [5]',
                '',
                '    for open.Len() > 0 {  // [6]',
                '        cur := heap.Pop(open).(AStarNode)  // [7]',
                '        if cur.r == end[0] && cur.c == end[1] { /* [8] reconstruct */ return grid }',
                '        for _, nb := range getPathNeighbors(grid, cur.r, cur.c, rows, cols) {  // [10]',
                '            tg := gScore[fmt.Sprintf("%d,%d", cur.r, cur.c)] + 1  // [11]',
                '            key := fmt.Sprintf("%d,%d", nb[0], nb[1])',
                '            if tg < gScore[key] {  // [12]',
                '                prev[key] = fmt.Sprintf("%d,%d", cur.r, cur.c)  // [13]',
                '                gScore[key] = tg  // [14]',
                '                heap.Push(open, AStarNode{nb[0],nb[1],tg,tg+manhattan(nb[0],nb[1],end[0],end[1])})  // [15-16]',
                '            }',
                '        }',
                '    }',
                '    return grid',
                '}',
            ],
            rust: [
                '// Step 1: Find shortest path using A*',
                'fn path_a_star(grid: &mut Vec<Vec<i32>>) {',
                '    let (rows, cols) = (grid.len(), grid[0].len());',
                '    let end = (rows-2, cols-2);  // [2]',
                '    let mut open: BinaryHeap<Reverse<(i32, usize, usize, usize)>> = BinaryHeap::new();  // [3]',
                '    open.push(Reverse((manhattan(1,1,end.0,end.1), 0, 1, 1)));',
                '    let mut g_score: HashMap<(usize,usize), i32> = HashMap::new();  // [4]',
                '    g_score.insert((1,1), 0);',
                '    let mut prev: HashMap<String, String> = HashMap::new();  // [5]',
                '',
                '    while let Some(Reverse((_,g,r,c))) = open.pop() {  // [6]',
                '        if (r,c) == end { /* [8] reconstruct */ return; }',
                '        for (nr,nc) in get_path_neighbors(grid, r, c, rows, cols) {  // [10]',
                '            let tg = g + 1;  // [11]',
                '            if tg < *g_score.get(&(nr,nc)).unwrap_or(&i32::MAX) {  // [12]',
                '                g_score.insert((nr,nc), tg);  // [14]',
                '                open.push(Reverse((tg+manhattan(nr,nc,end.0,end.1), tg, nr, nc)));  // [15-16]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
        },
        pathGreedy: {
            pseudo: [
                '# Step 1: Find a path using greedy best-first search',
                'procedure pathGreedy(grid):',
                '    start = (1, 1), end = (rows-2, cols-2)  # [2] Define start and end positions',
                '    openSet = MinHeap ordered by h(heuristic)  # [3] Priority queue by distance to goal only',
                '    visited = {start}  # [4] Track visited cells',
                '    prev = empty map  # [5] Map to reconstruct the path later',
                '',
                '    while openSet is not empty:  # [6] While there are cells to evaluate',
                '        current = openSet.extractMin()  # [7] Get cell closest to goal by heuristic',
                '        if current == end:  # [8] We reached the destination',
                '            return reconstructPath(prev, end)  # [9] Trace back the path',
                '',
                '        for each neighbor of current:  # [10] Check all four directions',
                '            if neighbor not in visited and not a wall:  # [11]',
                '                visited.add(neighbor)  # [12] Mark neighbor as visited',
                '                prev[neighbor] = current  # [13] Remember how we got here',
                '                h = heuristic(neighbor, end)  # [14] Estimate distance to goal',
                '                openSet.insert(neighbor, h)  # [15] Add with heuristic as priority',
            ],
            python: [
                '# Step 1: Find a path using greedy best-first search',
                'import heapq',
                'def path_greedy(grid: list[list[int]]) -> list[list[int]]:',
                '    rows, cols = len(grid), len(grid[0])',
                '    start, end = (1, 1), (rows-2, cols-2)  # [2]',
                '    open_set = [(manhattan(1,1,end[0],end[1]), 1, 1)]  # [3]',
                '    visited = {start}  # [4]',
                '    prev = {}  # [5]',
                '',
                '    while open_set:  # [6]',
                '        h, r, c = heapq.heappop(open_set)  # [7]',
                '        if (r, c) == end:  # [8]',
                '            return reconstruct_path(prev, end)  # [9]',
                '        for nr, nc in get_path_neighbors(grid, r, c, rows, cols):  # [10]',
                '            if (nr, nc) not in visited:  # [11]',
                '                visited.add((nr, nc))  # [12]',
                '                prev[(nr, nc)] = (r, c)  # [13]',
                '                heapq.heappush(open_set, (manhattan(nr,nc,end[0],end[1]), nr, nc))  # [14-15]',
                '    return grid',
            ],
            java: [
                '// Step 1: Find a path using greedy best-first search',
                'void pathGreedy(int[][] grid) {',
                '    int rows = grid.length, cols = grid[0].length;',
                '    int[] start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    PriorityQueue<int[]> open = new PriorityQueue<>(  // [3]',
                '        (a,b) -> Integer.compare(a[0], b[0]));',
                '    open.add(new int[]{manhattan(1,1,end[0],end[1]), 1, 1});',
                '    Set<String> visited = new HashSet<>(); visited.add("1,1");  // [4]',
                '    Map<String, String> prev = new HashMap<>();  // [5]',
                '',
                '    while (!open.isEmpty()) {  // [6]',
                '        int[] cur = open.poll();  // [7]',
                '        int r=cur[1], c=cur[2];',
                '        if (r==end[0] && c==end[1]) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (int[] nb : getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            String key = nb[0]+","+nb[1];',
                '            if (!visited.contains(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.put(key, r+","+c);  // [13]',
                '                open.add(new int[]{manhattan(nb[0],nb[1],end[0],end[1]), nb[0], nb[1]});  // [14-15]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Find a path using greedy best-first search',
                'void pathGreedy(vector<vector<int>>& grid) {',
                '    int rows = grid.size(), cols = grid[0].size();',
                '    pair<int,int> start = {1,1}, end = {rows-2, cols-2};  // [2]',
                '    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> open;  // [3]',
                '    open.push({manhattan(1,1,end.first,end.second), 1, 1});',
                '    set<string> visited; visited.insert("1,1");  // [4]',
                '    map<string,string> prev;  // [5]',
                '',
                '    while (!open.empty()) {  // [6]',
                '        auto [h,r,c] = open.top(); open.pop();  // [7]',
                '        if (r==end.first && c==end.second) { reconstructPath(prev, end); return; }  // [8-9]',
                '        for (auto [nr,nc] : getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            string key = to_string(nr)+","+to_string(nc);',
                '            if (!visited.count(key)) {  // [11]',
                '                visited.insert(key);  // [12]',
                '                prev[key] = to_string(r)+","+to_string(c);  // [13]',
                '                open.push({manhattan(nr,nc,end.first,end.second), nr, nc});  // [14-15]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Find a path using greedy best-first search',
                'void path_greedy(int **grid, int rows, int cols) {',
                '    int er=rows-2, ec=cols-2;  // [2]',
                '    int *open_r=malloc(rows*cols*sizeof(int));',
                '    int *open_h=malloc(rows*cols*sizeof(int));  // [3]',
                '    int on=0; open_r[on]=1; open_h[on++]=manhattan(1,1,er,ec);',
                '    char **vis=calloc(rows,sizeof(char*));  // [4]',
                '    for(int i=0;i<rows;i++) vis[i]=calloc(cols,sizeof(char));',
                '    vis[1][1]=1;',
                '    while(on>0) {  // [6]',
                '        int mi=0; for(int i=1;i<on;i++) if(open_h[i]<open_h[mi]) mi=i;',
                '        int r=open_r[mi], c=???; open_r[mi]=open_r[--on];  // [7]',
                '        if(r==er) { /* [8] reconstruct */ return; }',
                '        int dirs[4][2]={{0,1},{0,-1},{1,0},{-1,0}};  // [10]',
                '        for(int i=0;i<4;i++) {',
                '            int nr=r+dirs[i][0], nc=c+dirs[i][1];',
                '            if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&!vis[nr][nc]&&grid[nr][nc]) {  // [11]',
                '                vis[nr][nc]=1;  // [12]',
                '                open_r[on]=nr; open_h[on++]=manhattan(nr,nc,er,ec);  // [14-15]',
                '            }',
                '        }',
                '    }',
                '    free(open_r); free(open_h);',
                '}',
            ],
            csharp: [
                '// Step 1: Find a path using greedy best-first search',
                'void PathGreedy(int[,] grid) {',
                '    int rows = grid.GetLength(0), cols = grid.GetLength(1);',
                '    (int,int) start = (1,1), end = (rows-2, cols-2);  // [2]',
                '    var open = new PriorityQueue<(int,int), int>();  // [3]',
                '    open.Enqueue((1,1), Manhattan(1,1,end.Item1,end.Item2));',
                '    var visited = new HashSet<string>(); visited.Add("1,1");  // [4]',
                '    var prev = new Dictionary<string, string>();  // [5]',
                '',
                '    while (open.Count > 0) {  // [6]',
                '        var (r,c) = open.Dequeue();  // [7]',
                '        if ((r,c) == end) { ReconstructPath(prev, end); return; }  // [8-9]',
                '        foreach (var (nr,nc) in GetPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            string key = $"{nr},{nc}";',
                '            if (!visited.Contains(key)) {  // [11]',
                '                visited.Add(key);  // [12]',
                '                prev[key] = $"{r},{c}";  // [13]',
                '                open.Enqueue((nr,nc), Manhattan(nr,nc,end.Item1,end.Item2));  // [14-15]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Find a path using greedy best-first search',
                'function* pathGreedy(grid) {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const end = [rows-2, cols-2];  // [2]',
                '    const open = new MinHeap();  // [3]',
                '    open.push({ row: 1, col: 1, priority: manhattan(1,1,end[0],end[1]) });',
                '    const visited = new Set(["1,1"]);  // [4]',
                '    const prev = new Map();  // [5]',
                '',
                '    while (!open.isEmpty()) {  // [6]',
                '        const { row: r, col: c } = open.pop();  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const key = `${nr},${nc}`;',
                '            if (!visited.has(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                open.push({ row: nr, col: nc, priority: manhattan(nr,nc,end[0],end[1]) });  // [14-15]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            typescript: [
                '// Step 1: Find a path using greedy best-first search',
                'function* pathGreedy(grid: number[][]): Generator<Step, number[][], unknown> {',
                '    const rows = grid.length, cols = grid[0].length;',
                '    const end = [rows-2, cols-2];  // [2]',
                '    const open = new MinHeap();  // [3]',
                '    open.push({ row: 1, col: 1, priority: manhattan(1,1,end[0],end[1]) });',
                '    const visited = new Set<string>(["1,1"]);  // [4]',
                '    const prev = new Map<string, string>();  // [5]',
                '',
                '    while (!open.isEmpty()) {  // [6]',
                '        const { row: r, col: c } = open.pop()!;  // [7]',
                '        if (r === end[0] && c === end[1]) {  // [8]',
                '            yield* yieldPath(prev, end[0], end[1]);  // [9]',
                '            yield { type: \'found\', row: end[0], col: end[1], codeLine: 8 };',
                '            return grid;',
                '        }',
                '        for (const [nr, nc] of getPathNeighbors(grid, r, c, rows, cols)) {  // [10]',
                '            const key = `${nr},${nc}`;',
                '            if (!visited.has(key)) {  // [11]',
                '                visited.add(key);  // [12]',
                '                prev.set(key, `${r},${c}`);  // [13]',
                '                open.push({ row: nr, col: nc, priority: manhattan(nr,nc,end[0],end[1]) });  // [14-15]',
                '            }',
                '        }',
                '    }',
                '    return grid;',
                '}',
            ],
            go: [
                '// Step 1: Find a path using greedy best-first search',
                'func PathGreedy(grid [][]int) [][]int {',
                '    rows, cols := len(grid), len(grid[0])',
                '    end := [2]int{rows-2, cols-2}  // [2]',
                '    open := container.NewHeap(func(a,b any) int { return 0 })  // [3]',
                '    visited := map[string]bool{"1,1": true}  // [4]',
                '    prev := map[string]string{}  // [5]',
                '',
                '    for open.Len() > 0 {  // [6]',
                '        cur := heap.Pop(open).(GreedyNode)  // [7]',
                '        if cur.r == end[0] && cur.c == end[1] { /* [8] reconstruct */ return grid }',
                '        for _, nb := range getPathNeighbors(grid, cur.r, cur.c, rows, cols) {  // [10]',
                '            key := fmt.Sprintf("%d,%d", nb[0], nb[1])',
                '            if !visited[key] {  // [11]',
                '                visited[key] = true  // [12]',
                '                prev[key] = fmt.Sprintf("%d,%d", cur.r, cur.c)  // [13]',
                '                heap.Push(open, GreedyNode{nb[0],nb[1],manhattan(nb[0],nb[1],end[0],end[1])})  // [14-15]',
                '            }',
                '        }',
                '    }',
                '    return grid',
                '}',
            ],
            rust: [
                '// Step 1: Find a path using greedy best-first search',
                'fn path_greedy(grid: &mut Vec<Vec<i32>>) {',
                '    let (rows, cols) = (grid.len(), grid[0].len());',
                '    let end = (rows-2, cols-2);  // [2]',
                '    let mut open: BinaryHeap<Reverse<(i32, usize, usize)>> = BinaryHeap::new();  // [3]',
                '    open.push(Reverse((manhattan(1,1,end.0,end.1), 1, 1)));',
                '    let mut visited = std::collections::HashSet::new();  // [4]',
                '    visited.insert((1, 1));',
                '    let mut prev: HashMap<String, String> = HashMap::new();  // [5]',
                '',
                '    while let Some(Reverse((_,r,c))) = open.pop() {  // [6]',
                '        if (r,c) == end { /* [8] reconstruct */ return; }',
                '        for (nr,nc) in get_path_neighbors(grid, r, c, rows, cols) {  // [10]',
                '            if !visited.contains(&(nr, nc)) {  // [11]',
                '                visited.insert((nr, nc));  // [12]',
                '                prev.insert(format!("{},{}", nr, nc), format!("{},{}", r, c));  // [13]',
                '                open.push(Reverse((manhattan(nr,nc,end.0,end.1), nr, nc)));  // [14-15]',
                '            }',
                '        }',
                '    }',
                '}',
            ],
        },
    };

    // ─── Complexity Data ───

    const COMPLEXITY = {
        mazeRecursiveDFS: {
            name: 'Maze: Recursive Backtracker',
            best: 'O(N)',
            average: 'O(N)',
            worst: 'O(N)',
            space: 'O(N)',
            description:
                'Carve passages through a grid using depth-first search. Start at one cell, ' +
                'randomly choose an unvisited neighbor, remove the wall between them, and move to ' +
                'that neighbor. When no unvisited neighbors remain, backtrack along the path until ' +
                'an unvisited cell is found. This produces mazes with long, winding corridors and ' +
                'few dead ends.',
            useCase:
                'Ideal for generating classic-looking mazes with long corridors. The most common ' +
                'maze generation algorithm in games and puzzles. Produces highly biased mazes where ' +
                'the solution path tends to be long and winding.',
            avoid:
                'Avoid when you need mazes with many short dead ends or more open areas. The ' +
                'resulting mazes have a strong directional bias along the initial traversal path.',
            realWorld:
                'Used in procedural dungeon generation for roguelike games, maze-based puzzle games, ' +
                'and random level design. Powers maze generation in educational tools and algorithm visualization platforms. ' +
                'Applied in robotics for generating test environments for pathfinding algorithms.',
        },
        mazePrims: {
            name: "Maze: Prim's Algorithm",
            best: 'O(N log N)',
            average: 'O(N log N)',
            worst: 'O(N log N)',
            space: 'O(N)',
            description:
                'Grow the maze outward from a starting cell by randomly selecting walls from the ' +
                'frontier. When a wall is selected, if it separates a visited and unvisited cell, ' +
                'the wall is removed and the unvisited cell becomes part of the maze. New frontier ' +
                'walls from that cell are added. This produces mazes with many short dead ends.',
            useCase:
                'Best for generating mazes with many branches and short dead ends. Produces more ' +
                '"organic" looking mazes compared to recursive backtracker. Good for maze games ' +
                'where exploration is the primary mechanic.',
            avoid:
                'Avoid when you need long winding corridors or a specific difficulty curve. The ' +
                'resulting mazes tend to be easier to solve because paths branch frequently.',
            realWorld:
                'Used in procedural terrain generation for games, random maze creation for puzzle ' +
                'applications, and level design tools. Applied in network topology generation and ' +
                'circuit board trace routing visualization.',
        },
        mazeBinaryTree: {
            name: 'Maze: Binary Tree',
            best: 'O(N)',
            average: 'O(N)',
            worst: 'O(N)',
            space: 'O(1)',
            description:
                'For each cell in the grid, randomly carve a passage either north or east (if ' +
                'possible). At the top row, only east is available; at the rightmost column, only ' +
                'north is available. This is the simplest and fastest maze generation algorithm.',
            useCase:
                'Use when speed matters more than maze quality. Excellent for real-time maze ' +
                'generation in constrained environments. Good for educational demonstrations of ' +
                'how simple rules can produce complex structures.',
            avoid:
                'Avoid when maze quality matters. The algorithm creates a strong diagonal bias ' +
                'with a clearly visible corridor along the top and right edges. Not suitable for ' +
                'puzzles where the maze should feel random.',
            realWorld:
                'Used in lightweight game engines for rapid maze generation, embedded systems ' +
                'with limited processing power, and educational demonstrations. Applied in ' +
                'procedural content generation tutorials and algorithm courses.',
        },
        pathBFS: {
            name: 'Pathfinding: BFS',
            best: 'O(N)',
            average: 'O(N)',
            worst: 'O(N)',
            space: 'O(N)',
            description:
                'Explore the maze layer by layer using a queue. Starting from the entrance, visit ' +
                'all cells at distance 1, then distance 2, and so on. The first time the exit is ' +
                'reached, the path is guaranteed to be the shortest possible. BFS is the gold ' +
                'standard for unweighted shortest path problems.',
            useCase:
                'The optimal choice for finding shortest paths in unweighted grids. Use when the ' +
                'cost of moving between any two adjacent cells is the same. Guarantees the shortest ' +
                'path in terms of number of steps.',
            avoid:
                'Avoid when edge weights vary (use Dijkstra instead) or when memory is extremely ' +
                'constrained (BFS stores all frontier nodes). For very large grids, memory usage ' +
                'can be significant.',
            realWorld:
                'Used in GPS navigation for grid-based maps, game AI for enemy pathfinding, ' +
                'network routing protocols, social network friend recommendations (degrees of ' +
                'separation), and web crawling. The foundation of shortest-path algorithms.',
        },
        pathDFS: {
            name: 'Pathfinding: DFS',
            best: 'O(N)',
            average: 'O(N)',
            worst: 'O(N)',
            space: 'O(N)',
            description:
                'Explore the maze by going as deep as possible along each branch before backtracking. ' +
                'Uses a stack to track the current path. DFS finds a path but does not guarantee it ' +
                'is the shortest. The path found depends on the order of neighbor exploration.',
            useCase:
                'Useful for maze-solving when any path is acceptable. Good for generating all ' +
                'possible paths, detecting cycles, and topological sorting. Efficient in practice ' +
                'for sparse mazes with few dead ends.',
            avoid:
                'Avoid when the shortest path is required (use BFS instead). DFS can find very ' +
                'long, winding paths even when short ones exist. In the worst case, explores ' +
                'nearly every cell before finding the exit.',
            realWorld:
                'Used in game AI for exploration behaviors, file system traversal, compiler ' +
                'parsing (abstract syntax trees), solving puzzles like Sudoku, and detecting ' +
                'cycles in graphs. Common in memory-constrained embedded systems.',
        },
        pathAStar: {
            name: 'Pathfinding: A*',
            best: 'O(N)',
            average: 'O(N log N)',
            worst: 'O(N log N)',
            space: 'O(N)',
            description:
                'Combines the actual cost from the start (g) with an estimated cost to the goal (h) ' +
                'to guide the search toward the exit. Uses a min-heap priority queue sorted by f = g + h. ' +
                'The Manhattan distance heuristic is used for grid movement. A* is optimal when the ' +
                'heuristic is admissible (never overestimates).',
            useCase:
                'The best general-purpose pathfinding algorithm for grids. Use when you need the ' +
                'shortest path and have a good heuristic. Explores fewer cells than BFS by ' +
                'directing the search toward the goal.',
            avoid:
                'Avoid when no good heuristic exists (degrades to Dijkstra) or when the ' +
                'heuristic is not admissible (may not find the shortest path). Memory usage can ' +
                'be high for very large open sets.',
            realWorld:
                'The most widely used pathfinding algorithm in video games (NPC navigation, ' +
                'RTS unit movement), GPS navigation systems, robotics motion planning, and ' +
                'network routing. Powers pathfinding in virtually every game engine.',
        },
        pathGreedy: {
            name: 'Pathfinding: Greedy Best-First',
            best: 'O(N)',
            average: 'O(N log N)',
            worst: 'O(N^2)',
            space: 'O(N)',
            description:
                'Always expands the cell that appears closest to the goal based on the heuristic ' +
                'alone (Manhattan distance). Unlike A*, it ignores the actual distance traveled. ' +
                'This makes it faster in practice but does not guarantee the shortest path. It can ' +
                'get trapped by obstacles between the start and goal.',
            useCase:
                'Use when speed matters more than optimality. Good for real-time game AI where a ' +
                'good-enough path is sufficient. Effective in open environments with few obstacles ' +
                'where the heuristic closely matches the actual path cost.',
            avoid:
                'Avoid when the shortest path is required (use A* instead). Performs poorly in ' +
                'mazes with many walls and dead ends where the greedy choice leads to frequent ' +
                'backtracking. Can produce very long paths in complex mazes.',
            realWorld:
                'Used in real-time strategy games for quick unit pathfinding, robotics for ' +
                'approximate navigation, and web map services for initial route estimation. ' +
                'Applied in NPC AI for games where frame-rate constraints require fast decisions.',
        },
    };

    // ─── Maze Generation Generators ───

    /**
     * @param {number[][]} grid
     * @yields {{type: string, row: number, col: number, codeLine: number}}
     * @returns {number[][]}
     */
    function* mazeRecursiveDFS(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const stack = [[1, 1]];
        grid[1][1] = 1;
        yield { type: 'carve', row: 1, col: 1, codeLine: 3 };

        while (stack.length > 0) {
            const [r, c] = stack[stack.length - 1];
            const nbrs = getMazeNeighbors(grid, r, c, rows, cols);

            if (nbrs.length > 0) {
                const [nr, nc] = nbrs[0];
                const wr = (r + nr) >> 1;
                const wc = (c + nc) >> 1;
                grid[wr][wc] = 1;
                yield { type: 'carve', row: wr, col: wc, codeLine: 9 };
                grid[nr][nc] = 1;
                yield { type: 'carve', row: nr, col: nc, codeLine: 10 };
                stack.push([nr, nc]);
            } else {
                stack.pop();
                yield { type: 'backtrack', row: r, col: c, codeLine: 13 };
            }
        }
        return grid;
    }

    /**
     * @param {number[][]} grid
     * @yields {{type: string, row: number, col: number, codeLine: number}}
     * @returns {number[][]}
     */
    function* mazePrims(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        grid[1][1] = 1;
        yield { type: 'carve', row: 1, col: 1, codeLine: 3 };

        const frontier = [];
        const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]];
        for (const [dr, dc] of dirs) {
            const nr = 1 + dr;
            const nc = 1 + dc;
            if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1) {
                frontier.push([1 + (dr >> 1), 1 + (dc >> 1), nr, nc]);
                yield { type: 'frontier', row: 1 + (dr >> 1), col: 1 + (dc >> 1), codeLine: 4 };
            }
        }

        while (frontier.length > 0) {
            const idx = Math.floor(Math.random() * frontier.length);
            const [wr, wc, cr, cc] = frontier[idx];
            frontier[idx] = frontier[frontier.length - 1];
            frontier.pop();

            if (grid[cr][cc] !== 1) {
                grid[wr][wc] = 1;
                yield { type: 'carve', row: wr, col: wc, codeLine: 10 };
                grid[cr][cc] = 1;
                yield { type: 'carve', row: cr, col: cc, codeLine: 11 };

                for (const [dr, dc] of dirs) {
                    const nr = cr + dr;
                    const nc = cc + dc;
                    if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && grid[nr][nc] === 0) {
                        frontier.push([cr + (dr >> 1), cc + (dc >> 1), nr, nc]);
                        yield { type: 'frontier', row: cr + (dr >> 1), col: cc + (dc >> 1), codeLine: 12 };
                    }
                }
            }
        }
        return grid;
    }

    /**
     * @param {number[][]} grid
     * @yields {{type: string, row: number, col: number, codeLine: number}}
     * @returns {number[][]}
     */
    function* mazeBinaryTree(grid) {
        const rows = grid.length;
        const cols = grid[0].length;

        for (let r = 1; r < rows - 1; r += 2) {
            for (let c = 1; c < cols - 1; c += 2) {
                grid[r][c] = 1;
                yield { type: 'carve', row: r, col: c, codeLine: 2 };

                const north = r > 1;
                const east = c < cols - 2;

                if (north && east) {
                    if (Math.random() < 0.5) {
                        grid[r - 1][c] = 1;
                        yield { type: 'carve', row: r - 1, col: c, codeLine: 14 };
                    } else {
                        grid[r][c + 1] = 1;
                        yield { type: 'carve', row: r, col: c + 1, codeLine: 16 };
                    }
                } else if (north) {
                    grid[r - 1][c] = 1;
                    yield { type: 'carve', row: r - 1, col: c, codeLine: 14 };
                } else if (east) {
                    grid[r][c + 1] = 1;
                    yield { type: 'carve', row: r, col: c + 1, codeLine: 16 };
                }
            }
        }
        return grid;
    }

    // ─── Grid Pathfinding Generators ───

    /**
     * @param {number[][]} grid
     * @yields {{type: string, row: number, col: number, codeLine: number}}
     * @returns {number[][]}
     */
    function* pathBFS(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const endR = rows - 2;
        const endC = cols - 2;
        const queue = [[1, 1]];
        const visited = new Set(['1,1']);
        const prev = new Map();

        yield { type: 'visit', row: 1, col: 1, codeLine: 3 };

        while (queue.length > 0) {
            const [r, c] = queue.shift();
            yield { type: 'visit', row: r, col: c, codeLine: 7 };

            if (r === endR && c === endC) {
                yield* yieldPath(prev, endR, endC);
                yield { type: 'found', row: endR, col: endC, codeLine: 8 };
                return grid;
            }

            const nbrs = getPathNeighbors(grid, r, c, rows, cols);
            for (const [nr, nc] of nbrs) {
                const key = `${nr},${nc}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    prev.set(key, `${r},${c}`);
                    queue.push([nr, nc]);
                    yield { type: 'explore', row: nr, col: nc, codeLine: 10 };
                }
            }
        }
        return grid;
    }

    /**
     * @param {number[][]} grid
     * @yields {{type: string, row: number, col: number, codeLine: number}}
     * @returns {number[][]}
     */
    function* pathDFS(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const endR = rows - 2;
        const endC = cols - 2;
        const stack = [[1, 1]];
        const visited = new Set(['1,1']);
        const prev = new Map();

        yield { type: 'visit', row: 1, col: 1, codeLine: 3 };

        while (stack.length > 0) {
            const [r, c] = stack.pop();
            yield { type: 'visit', row: r, col: c, codeLine: 7 };

            if (r === endR && c === endC) {
                yield* yieldPath(prev, endR, endC);
                yield { type: 'found', row: endR, col: endC, codeLine: 8 };
                return grid;
            }

            const nbrs = getPathNeighbors(grid, r, c, rows, cols);
            for (const [nr, nc] of nbrs) {
                const key = `${nr},${nc}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    prev.set(key, `${r},${c}`);
                    stack.push([nr, nc]);
                    yield { type: 'explore', row: nr, col: nc, codeLine: 10 };
                }
            }
        }
        return grid;
    }

    /**
     * @param {number[][]} grid
     * @yields {{type: string, row: number, col: number, codeLine: number}}
     * @returns {number[][]}
     */
    function* pathAStar(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const endR = rows - 2;
        const endC = cols - 2;
        const open = new MinHeap();
        const gScore = new Map([['1,1', 0]]);
        const closed = new Set();
        const prev = new Map();

        open.push({ row: 1, col: 1, priority: manhattan(1, 1, endR, endC) });
        yield { type: 'frontier', row: 1, col: 1, codeLine: 3 };

        while (!open.isEmpty()) {
            const { row: r, col: c } = open.pop();
            const key = `${r},${c}`;

            if (closed.has(key)) continue;
            closed.add(key);

            yield { type: 'visit', row: r, col: c, codeLine: 7 };

            if (r === endR && c === endC) {
                yield* yieldPath(prev, endR, endC);
                yield { type: 'found', row: endR, col: endC, codeLine: 8 };
                return grid;
            }

            const g = gScore.get(key) ?? Infinity;
            const nbrs = getPathNeighbors(grid, r, c, rows, cols);
            for (const [nr, nc] of nbrs) {
                const nKey = `${nr},${nc}`;
                const tg = g + 1;

                if (tg < (gScore.get(nKey) ?? Infinity)) {
                    prev.set(nKey, key);
                    gScore.set(nKey, tg);
                    const f = tg + manhattan(nr, nc, endR, endC);
                    open.push({ row: nr, col: nc, priority: f });
                    yield { type: 'explore', row: nr, col: nc, codeLine: 10 };
                }
            }
        }
        return grid;
    }

    /**
     * @param {number[][]} grid
     * @yields {{type: string, row: number, col: number, codeLine: number}}
     * @returns {number[][]}
     */
    function* pathGreedy(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const endR = rows - 2;
        const endC = cols - 2;
        const open = new MinHeap();
        const visited = new Set();
        const prev = new Map();

        open.push({ row: 1, col: 1, priority: manhattan(1, 1, endR, endC) });
        yield { type: 'frontier', row: 1, col: 1, codeLine: 3 };

        while (!open.isEmpty()) {
            const { row: r, col: c } = open.pop();
            const key = `${r},${c}`;

            if (visited.has(key)) continue;
            visited.add(key);

            yield { type: 'visit', row: r, col: c, codeLine: 7 };

            if (r === endR && c === endC) {
                yield* yieldPath(prev, endR, endC);
                yield { type: 'found', row: endR, col: endC, codeLine: 8 };
                return grid;
            }

            const nbrs = getPathNeighbors(grid, r, c, rows, cols);
            for (const [nr, nc] of nbrs) {
                const nKey = `${nr},${nc}`;
                if (!visited.has(nKey)) {
                    prev.set(nKey, key);
                    open.push({ row: nr, col: nc, priority: manhattan(nr, nc, endR, endC) });
                    yield { type: 'explore', row: nr, col: nc, codeLine: 10 };
                }
            }
        }
        return grid;
    }

    return {
        CODE,
        COMPLEXITY,
        buildMazeGrid,
        mazeRecursiveDFS,
        mazePrims,
        mazeBinaryTree,
        pathBFS,
        pathDFS,
        pathAStar,
        pathGreedy,
    };

})();

export default MazeAlgorithms;
