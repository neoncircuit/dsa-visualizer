/**
 * Graph traversal algorithm generators.
 *
 * Each algorithm is a generator function that yields step objects:
 * { type: 'enqueue'|'dequeue'|'visit'|'visited'|'push'|'relax'|'update', nodeId: number, from?: number, to?: number, codeLine: number }
 */

const GraphAlgorithms = (() => {

    // ─── Code Snippets (per language) ───

    const CODE = {
        bfs: {
            pseudo: [
                '# Step 1: Traverse the graph level by level starting from a source node',
                'procedure bfs(adj, start):',
                '',
                '    visited = empty set  # [2] Keep track of which nodes we have seen',
                '    queue = [start]  # [3] Begin with the start node in the queue',
                '    visited.add(start)  # [4] Mark the start node as visited',
                '',
                '    while queue is not empty:  # [5] Keep going while there are nodes to process',
                '        node = queue.dequeue()  # [6] Take the next node from the front of the queue',
                '',
                '        for neighbor in adj[node]:  # [7] Look at every neighbor of this node',
                '            if neighbor not in visited:  # [8] If we have not visited this neighbor yet',
                '                visited.add(neighbor)  # [9] Mark the neighbor as visited',
                '                queue.enqueue(neighbor)  # [10] Add the neighbor to the back of the queue',
                '',
                '    return visited  # [11] Give back all the nodes we reached',
            ],
            python: [
                '# Step 1: Traverse the graph level by level starting from a source node',
                'def bfs(adj: dict[int, list], start: int) -> set[int]:',
                '',
                '    visited: set[int] = set()  # [2] Keep track of which nodes we have seen',
                '    queue: list[int] = [start]  # [3] Begin with the start node in the queue',
                '    visited.add(start)  # [4] Mark the start node as visited',
                '',
                '    while queue:  # [5] Keep going while there are nodes to process',
                '        node: int = queue.pop(0)  # [6] Take the next node from the front of the queue',
                '',
                '        for neighbor in adj[node]:  # [7] Look at every neighbor of this node',
                '            if neighbor["to"] not in visited:  # [8] If we have not visited this neighbor yet',
                '                visited.add(neighbor["to"])  # [9] Mark the neighbor as visited',
                '                queue.append(neighbor["to"])  # [10] Add the neighbor to the back of the queue',
                '',
                '    return visited  # [11] Give back all the nodes we reached',
            ],
            java: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'public Set<Integer> bfs(Map<Integer, List<int[]>> adj, int start) {',
                '',
                '    Set<Integer> visited = new HashSet<>();  // [2] Keep track of which nodes we have seen',
                '    Queue<Integer> queue = new LinkedList<>();',
                '    queue.add(start);  // [3] Begin with the start node in the queue',
                '    visited.add(start);  // [4] Mark the start node as visited',
                '',
                '    while (!queue.isEmpty()) {  // [5] Keep going while there are nodes to process',
                '        int node = queue.poll();  // [6] Take the next node from the front of the queue',
                '',
                '        for (int[] neighbor : adj.get(node)) {  // [7] Look at every neighbor of this node',
                '            if (!visited.contains(neighbor[0])) {  // [8] If we have not visited this neighbor yet',
                '                visited.add(neighbor[0]);  // [9] Mark the neighbor as visited',
                '                queue.add(neighbor[0]);  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            cpp: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'unordered_set<int> bfs(unordered_map<int, vector<pair<int,int>>>& adj, int start) {',
                '',
                '    unordered_set<int> visited;  // [2] Keep track of which nodes we have seen',
                '    queue<int> q;',
                '    q.push(start);  // [3] Begin with the start node in the queue',
                '    visited.insert(start);  // [4] Mark the start node as visited',
                '',
                '    while (!q.empty()) {  // [5] Keep going while there are nodes to process',
                '        int node = q.front(); q.pop();  // [6] Take the next node from the front of the queue',
                '',
                '        for (auto& [neighbor, weight] : adj[node]) {  // [7] Look at every neighbor of this node',
                '            if (!visited.count(neighbor)) {  // [8] If we have not visited this neighbor yet',
                '                visited.insert(neighbor);  // [9] Mark the neighbor as visited',
                '                q.push(neighbor);  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            javascript: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'function bfs(adj, start) {',
                '',
                '    const visited = new Set();  // [2] Keep track of which nodes we have seen',
                '    const queue = [start];  // [3] Begin with the start node in the queue',
                '    visited.add(start);  // [4] Mark the start node as visited',
                '',
                '    while (queue.length > 0) {  // [5] Keep going while there are nodes to process',
                '        const node = queue.shift();  // [6] Take the next node from the front of the queue',
                '',
                '        for (const neighbor of adj[node]) {  // [7] Look at every neighbor of this node',
                '            if (!visited.has(neighbor.to)) {  // [8] If we have not visited this neighbor yet',
                '                visited.add(neighbor.to);  // [9] Mark the neighbor as visited',
                '                queue.push(neighbor.to);  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            c: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'void bfs(int adj[][2], int adjSize[], int start, int n, int* visited) {',
                '',
                '    memset(visited, 0, n * sizeof(int));  // [2] Keep track of which nodes we have seen',
                '    int queue[n], front = 0, back = 0;',
                '    queue[back++] = start;  // [3] Begin with the start node in the queue',
                '    visited[start] = 1;  // [4] Mark the start node as visited',
                '',
                '    while (front < back) {  // [5] Keep going while there are nodes to process',
                '        int node = queue[front++];  // [6] Take the next node from the front of the queue',
                '',
                '        for (int i = 0; i < adjSize[node]; i++) {  // [7] Look at every neighbor of this node',
                '            int neighbor = adj[node][i];',
                '            if (!visited[neighbor]) {  // [8] If we have not visited this neighbor yet',
                '                visited[neighbor] = 1;  // [9] Mark the neighbor as visited',
                '                queue[back++] = neighbor;  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '    // [11] visited[] now holds all the nodes we reached',
                '}',
            ],
            csharp: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'public HashSet<int> Bfs(Dictionary<int, List<(int to, int weight)>> adj, int start) {',
                '',
                '    var visited = new HashSet<int>();  // [2] Keep track of which nodes we have seen',
                '    var queue = new Queue<int>();',
                '    queue.Enqueue(start);  // [3] Begin with the start node in the queue',
                '    visited.Add(start);  // [4] Mark the start node as visited',
                '',
                '    while (queue.Count > 0) {  // [5] Keep going while there are nodes to process',
                '        int node = queue.Dequeue();  // [6] Take the next node from the front of the queue',
                '',
                '        foreach (var (neighbor, _) in adj[node]) {  // [7] Look at every neighbor of this node',
                '            if (!visited.Contains(neighbor)) {  // [8] If we have not visited this neighbor yet',
                '                visited.Add(neighbor);  // [9] Mark the neighbor as visited',
                '                queue.Enqueue(neighbor);  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            typescript: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'function bfs(adj: Map<number, [number, number][]>, start: number): Set<number> {',
                '',
                '    const visited = new Set<number>();  // [2] Keep track of which nodes we have seen',
                '    const queue: number[] = [start];  // [3] Begin with the start node in the queue',
                '    visited.add(start);  // [4] Mark the start node as visited',
                '',
                '    while (queue.length > 0) {  // [5] Keep going while there are nodes to process',
                '        const node = queue.shift()!;  // [6] Take the next node from the front of the queue',
                '',
                '        for (const [neighbor] of adj.get(node)!) {  // [7] Look at every neighbor of this node',
                '            if (!visited.has(neighbor)) {  // [8] If we have not visited this neighbor yet',
                '                visited.add(neighbor);  // [9] Mark the neighbor as visited',
                '                queue.push(neighbor);  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            go: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'func bfs(adj map[int][][2]int, start int) map[int]bool {',
                '',
                '    visited := make(map[int]bool)  // [2] Keep track of which nodes we have seen',
                '    queue := []int{start}  // [3] Begin with the start node in the queue',
                '    visited[start] = true  // [4] Mark the start node as visited',
                '',
                '    for len(queue) > 0 {  // [5] Keep going while there are nodes to process',
                '        node := queue[0]  // [6] Take the next node from the front of the queue',
                '        queue = queue[1:]',
                '',
                '        for _, edge := range adj[node] {  // [7] Look at every neighbor of this node',
                '            neighbor := edge[0]',
                '            if !visited[neighbor] {  // [8] If we have not visited this neighbor yet',
                '                visited[neighbor] = true  // [9] Mark the neighbor as visited',
                '                queue = append(queue, neighbor)  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited  // [11] Give back all the nodes we reached',
                '}',
            ],
            rust: [
                '// Step 1: Traverse the graph level by level starting from a source node',
                'fn bfs(adj: &HashMap<i32, Vec<(i32, i32)>>, start: i32) -> HashSet<i32> {',
                '',
                '    let mut visited = HashSet::new();  // [2] Keep track of which nodes we have seen',
                '    let mut queue = VecDeque::new();',
                '    queue.push_back(start);  // [3] Begin with the start node in the queue',
                '    visited.insert(start);  // [4] Mark the start node as visited',
                '',
                '    while let Some(node) = queue.pop_front() {  // [5] Keep going while there are nodes to process',
                '        // [6] Take the next node from the front of the queue',
                '',
                '        for &(neighbor, _) in &adj[&node] {  // [7] Look at every neighbor of this node',
                '            if !visited.contains(&neighbor) {  // [8] If we have not visited this neighbor yet',
                '                visited.insert(neighbor);  // [9] Mark the neighbor as visited',
                '                queue.push_back(neighbor);  // [10] Add the neighbor to the back of the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    visited  // [11] Give back all the nodes we reached',
                '}',
            ],
        },

        dfs: {
            pseudo: [
                '# Step 1: Traverse the graph by going as deep as possible before backtracking',
                'procedure dfs(adj, start):',
                '',
                '    visited = empty set  # [2] Keep track of which nodes we have seen',
                '    stack = [start]  # [3] Begin with the start node on the stack',
                '',
                '    while stack is not empty:  # [4] Keep going while there are nodes to process',
                '        node = stack.pop()  # [5] Take the most recently added node from the stack',
                '',
                '        if node not in visited:  # [6] If we have not visited this node yet',
                '            visited.add(node)  # [7] Mark the node as visited',
                '',
                '            for neighbor in adj[node]:  # [8] Look at every neighbor of this node',
                '                if neighbor not in visited:  # [9] If we have not visited this neighbor',
                '                    stack.push(neighbor)  # [10] Push the neighbor onto the stack',
                '',
                '    return visited  # [11] Give back all the nodes we reached',
            ],
            python: [
                '# Step 1: Traverse the graph by going as deep as possible before backtracking',
                'def dfs(adj: dict[int, list], start: int) -> set[int]:',
                '',
                '    visited: set[int] = set()  # [2] Keep track of which nodes we have seen',
                '    stack: list[int] = [start]  # [3] Begin with the start node on the stack',
                '',
                '    while stack:  # [4] Keep going while there are nodes to process',
                '        node: int = stack.pop()  # [5] Take the most recently added node from the stack',
                '',
                '        if node not in visited:  # [6] If we have not visited this node yet',
                '            visited.add(node)  # [7] Mark the node as visited',
                '',
                '            for neighbor in adj[node]:  # [8] Look at every neighbor of this node',
                '                if neighbor["to"] not in visited:  # [9] If we have not visited this neighbor',
                '                    stack.append(neighbor["to"])  # [10] Push the neighbor onto the stack',
                '',
                '    return visited  # [11] Give back all the nodes we reached',
            ],
            java: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'public Set<Integer> dfs(Map<Integer, List<int[]>> adj, int start) {',
                '',
                '    Set<Integer> visited = new HashSet<>();  // [2] Keep track of which nodes we have seen',
                '    Deque<Integer> stack = new ArrayDeque<>();',
                '    stack.push(start);  // [3] Begin with the start node on the stack',
                '',
                '    while (!stack.isEmpty()) {  // [4] Keep going while there are nodes to process',
                '        int node = stack.pop();  // [5] Take the most recently added node from the stack',
                '',
                '        if (!visited.contains(node)) {  // [6] If we have not visited this node yet',
                '            visited.add(node);  // [7] Mark the node as visited',
                '',
                '            for (int[] neighbor : adj.get(node)) {  // [8] Look at every neighbor of this node',
                '                if (!visited.contains(neighbor[0])) {  // [9] If we have not visited this neighbor',
                '                    stack.push(neighbor[0]);  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            cpp: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'unordered_set<int> dfs(unordered_map<int, vector<pair<int,int>>>& adj, int start) {',
                '',
                '    unordered_set<int> visited;  // [2] Keep track of which nodes we have seen',
                '    stack<int> stk;',
                '    stk.push(start);  // [3] Begin with the start node on the stack',
                '',
                '    while (!stk.empty()) {  // [4] Keep going while there are nodes to process',
                '        int node = stk.top(); stk.pop();  // [5] Take the most recently added node from the stack',
                '',
                '        if (!visited.count(node)) {  // [6] If we have not visited this node yet',
                '            visited.insert(node);  // [7] Mark the node as visited',
                '',
                '            for (auto& [neighbor, weight] : adj[node]) {  // [8] Look at every neighbor of this node',
                '                if (!visited.count(neighbor)) {  // [9] If we have not visited this neighbor',
                '                    stk.push(neighbor);  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            javascript: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'function dfs(adj, start) {',
                '',
                '    const visited = new Set();  // [2] Keep track of which nodes we have seen',
                '    const stack = [start];  // [3] Begin with the start node on the stack',
                '',
                '    while (stack.length > 0) {  // [4] Keep going while there are nodes to process',
                '        const node = stack.pop();  // [5] Take the most recently added node from the stack',
                '',
                '        if (!visited.has(node)) {  // [6] If we have not visited this node yet',
                '            visited.add(node);  // [7] Mark the node as visited',
                '',
                '            for (const neighbor of adj[node]) {  // [8] Look at every neighbor of this node',
                '                if (!visited.has(neighbor.to)) {  // [9] If we have not visited this neighbor',
                '                    stack.push(neighbor.to);  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            c: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'void dfs(int adj[][2], int adjSize[], int start, int n, int* visited) {',
                '',
                '    memset(visited, 0, n * sizeof(int));  // [2] Keep track of which nodes we have seen',
                '    int stack[n], top = 0;',
                '    stack[top++] = start;  // [3] Begin with the start node on the stack',
                '',
                '    while (top > 0) {  // [4] Keep going while there are nodes to process',
                '        int node = stack[--top];  // [5] Take the most recently added node from the stack',
                '',
                '        if (!visited[node]) {  // [6] If we have not visited this node yet',
                '            visited[node] = 1;  // [7] Mark the node as visited',
                '',
                '            for (int i = 0; i < adjSize[node]; i++) {  // [8] Look at every neighbor of this node',
                '                int neighbor = adj[node][i];',
                '                if (!visited[neighbor]) {  // [9] If we have not visited this neighbor',
                '                    stack[top++] = neighbor;  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '    // [11] visited[] now holds all the nodes we reached',
                '}',
            ],
            csharp: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'public HashSet<int> Dfs(Dictionary<int, List<(int to, int weight)>> adj, int start) {',
                '',
                '    var visited = new HashSet<int>();  // [2] Keep track of which nodes we have seen',
                '    var stack = new Stack<int>();',
                '    stack.Push(start);  // [3] Begin with the start node on the stack',
                '',
                '    while (stack.Count > 0) {  // [4] Keep going while there are nodes to process',
                '        int node = stack.Pop();  // [5] Take the most recently added node from the stack',
                '',
                '        if (!visited.Contains(node)) {  // [6] If we have not visited this node yet',
                '            visited.Add(node);  // [7] Mark the node as visited',
                '',
                '            foreach (var (neighbor, _) in adj[node]) {  // [8] Look at every neighbor of this node',
                '                if (!visited.Contains(neighbor)) {  // [9] If we have not visited this neighbor',
                '                    stack.Push(neighbor);  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            typescript: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'function dfs(adj: Map<number, [number, number][]>, start: number): Set<number> {',
                '',
                '    const visited = new Set<number>();  // [2] Keep track of which nodes we have seen',
                '    const stack: number[] = [start];  // [3] Begin with the start node on the stack',
                '',
                '    while (stack.length > 0) {  // [4] Keep going while there are nodes to process',
                '        const node = stack.pop()!;  // [5] Take the most recently added node from the stack',
                '',
                '        if (!visited.has(node)) {  // [6] If we have not visited this node yet',
                '            visited.add(node);  // [7] Mark the node as visited',
                '',
                '            for (const [neighbor] of adj.get(node)!) {  // [8] Look at every neighbor of this node',
                '                if (!visited.has(neighbor)) {  // [9] If we have not visited this neighbor',
                '                    stack.push(neighbor);  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited;  // [11] Give back all the nodes we reached',
                '}',
            ],
            go: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'func dfs(adj map[int][][2]int, start int) map[int]bool {',
                '',
                '    visited := make(map[int]bool)  // [2] Keep track of which nodes we have seen',
                '    stack := []int{start}  // [3] Begin with the start node on the stack',
                '',
                '    for len(stack) > 0 {  // [4] Keep going while there are nodes to process',
                '        node := stack[len(stack)-1]  // [5] Take the most recently added node from the stack',
                '        stack = stack[:len(stack)-1]',
                '',
                '        if !visited[node] {  // [6] If we have not visited this node yet',
                '            visited[node] = true  // [7] Mark the node as visited',
                '',
                '            for _, edge := range adj[node] {  // [8] Look at every neighbor of this node',
                '                neighbor := edge[0]',
                '                if !visited[neighbor] {  // [9] If we have not visited this neighbor',
                '                    stack = append(stack, neighbor)  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    return visited  // [11] Give back all the nodes we reached',
                '}',
            ],
            rust: [
                '// Step 1: Traverse the graph by going as deep as possible before backtracking',
                'fn dfs(adj: &HashMap<i32, Vec<(i32, i32)>>, start: i32) -> HashSet<i32> {',
                '',
                '    let mut visited = HashSet::new();  // [2] Keep track of which nodes we have seen',
                '    let mut stack = vec![start];  // [3] Begin with the start node on the stack',
                '',
                '    while let Some(node) = stack.pop() {  // [4] Keep going while there are nodes to process',
                '        // [5] Take the most recently added node from the stack',
                '',
                '        if !visited.contains(&node) {  // [6] If we have not visited this node yet',
                '            visited.insert(node);  // [7] Mark the node as visited',
                '',
                '            for &(neighbor, _) in &adj[&node] {  // [8] Look at every neighbor of this node',
                '                if !visited.contains(&neighbor) {  // [9] If we have not visited this neighbor',
                '                    stack.push(neighbor);  // [10] Push the neighbor onto the stack',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    visited  // [11] Give back all the nodes we reached',
                '}',
            ],
        },

        dijkstra: {
            pseudo: [
                '# Step 1: Find the shortest path from a start node to all other nodes',
                'procedure dijkstra(adj, start, nodes):',
                '',
                '    dist = map each node to infinity  # [2] Set every distance to infinity at first',
                '    dist[start] = 0  # [3] The distance from start to itself is zero',
                '    visited = empty set  # [4] Keep track of fully processed nodes',
                '    pq = [(0, start)]  # [5] Priority queue with (distance, node)',
                '',
                '    while pq is not empty:  # [6] Keep going while there are nodes to process',
                '        (d, node) = pq.extractMin()  # [7] Take the node with the smallest distance',
                '',
                '        if node in visited:  # [8] If we already processed this node',
                '            continue  # [9] Skip it and move on',
                '',
                '        visited.add(node)  # [10] Mark this node as fully processed',
                '',
                '        for (neighbor, weight) in adj[node]:  # [11] Look at every neighbor',
                '            newDist = d + weight  # [12] Calculate the distance going through this node',
                '            if newDist < dist[neighbor]:  # [13] If this path is shorter than what we knew',
                '                dist[neighbor] = newDist  # [14] Update to the shorter distance',
                '                pq.insert((newDist, neighbor))  # [15] Add neighbor with new distance to the queue',
                '',
                '    return dist  # [16] Give back the shortest distances to every node',
            ],
            python: [
                '# Step 1: Find the shortest path from a start node to all other nodes',
                'def dijkstra(adj: dict[int, list], start: int, nodes: list[int]) -> dict[int, float]:',
                '',
                '    dist: dict[int, float] = {n: float("inf") for n in nodes}  # [2] Set every distance to infinity',
                '    dist[start] = 0  # [3] The distance from start to itself is zero',
                '    visited: set[int] = set()  # [4] Keep track of fully processed nodes',
                '    pq: list[tuple] = [(0, start)]  # [5] Priority queue with (distance, node)',
                '',
                '    while pq:  # [6] Keep going while there are nodes to process',
                '        d, node = min(pq)  # [7] Take the node with the smallest distance',
                '        pq.remove((d, node))  # [7] Remove it from the queue',
                '',
                '        if node in visited:  # [8] If we already processed this node',
                '            continue  # [9] Skip it and move on',
                '',
                '        visited.add(node)  # [10] Mark this node as fully processed',
                '',
                '        for neighbor in adj[node]:  # [11] Look at every neighbor',
                '            new_dist: float = d + neighbor["weight"]  # [12] Calculate the distance through this node',
                '            if new_dist < dist[neighbor["to"]]:  # [13] If this path is shorter',
                '                dist[neighbor["to"]] = new_dist  # [14] Update to the shorter distance',
                '                pq.append((new_dist, neighbor["to"]))  # [15] Add neighbor to the queue',
                '',
                '    return dist  # [16] Give back the shortest distances to every node',
            ],
            java: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'public Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> adj, int start, List<Integer> nodes) {',
                '',
                '    Map<Integer, Integer> dist = new HashMap<>();',
                '    for (int n : nodes) dist.put(n, Integer.MAX_VALUE);  // [2] Set every distance to infinity',
                '    dist.put(start, 0);  // [3] The distance from start to itself is zero',
                '    Set<Integer> visited = new HashSet<>();  // [4] Keep track of fully processed nodes',
                '    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));',
                '    pq.offer(new int[]{0, start});  // [5] Priority queue with (distance, node)',
                '',
                '    while (!pq.isEmpty()) {  // [6] Keep going while there are nodes to process',
                '        int[] top = pq.poll();',
                '        int d = top[0], node = top[1];  // [7] Take the node with the smallest distance',
                '',
                '        if (visited.contains(node)) continue;  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited.add(node);  // [10] Mark this node as fully processed',
                '',
                '        for (int[] neighbor : adj.get(node)) {  // [11] Look at every neighbor',
                '            int newDist = d + neighbor[1];  // [12] Calculate the distance through this node',
                '            if (newDist < dist.get(neighbor[0])) {  // [13] If this path is shorter',
                '                dist.put(neighbor[0], newDist);  // [14] Update to the shorter distance',
                '                pq.offer(new int[]{newDist, neighbor[0]});  // [15] Add neighbor to the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return dist;  // [16] Give back the shortest distances to every node',
                '}',
            ],
            cpp: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'unordered_map<int,int> dijkstra(unordered_map<int, vector<pair<int,int>>>& adj, int start, vector<int>& nodes) {',
                '',
                '    unordered_map<int, int> dist;',
                '    for (int n : nodes) dist[n] = INT_MAX;  // [2] Set every distance to infinity',
                '    dist[start] = 0;  // [3] The distance from start to itself is zero',
                '    unordered_set<int> visited;  // [4] Keep track of fully processed nodes',
                '    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;',
                '    pq.push({0, start});  // [5] Priority queue with (distance, node)',
                '',
                '    while (!pq.empty()) {  // [6] Keep going while there are nodes to process',
                '        auto [d, node] = pq.top(); pq.pop();  // [7] Take the node with the smallest distance',
                '',
                '        if (visited.count(node)) continue;  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited.insert(node);  // [10] Mark this node as fully processed',
                '',
                '        for (auto& [neighbor, weight] : adj[node]) {  // [11] Look at every neighbor',
                '            int newDist = d + weight;  // [12] Calculate the distance through this node',
                '            if (newDist < dist[neighbor]) {  // [13] If this path is shorter',
                '                dist[neighbor] = newDist;  // [14] Update to the shorter distance',
                '                pq.push({newDist, neighbor});  // [15] Add neighbor to the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return dist;  // [16] Give back the shortest distances to every node',
                '}',
            ],
            javascript: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'function dijkstra(adj, start, nodes) {',
                '',
                '    const dist = Object.fromEntries(nodes.map(n => [n, Infinity]));  // [2] Set every distance to infinity',
                '    dist[start] = 0;  // [3] The distance from start to itself is zero',
                '    const visited = new Set();  // [4] Keep track of fully processed nodes',
                '    const pq = [{ dist: 0, node: start }];  // [5] Priority queue with (distance, node)',
                '',
                '    while (pq.length > 0) {  // [6] Keep going while there are nodes to process',
                '        pq.sort((a, b) => a.dist - b.dist);',
                '        const { dist: d, node } = pq.shift();  // [7] Take the node with the smallest distance',
                '',
                '        if (visited.has(node)) continue;  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited.add(node);  // [10] Mark this node as fully processed',
                '',
                '        for (const neighbor of adj[node]) {  // [11] Look at every neighbor',
                '            const newDist = d + neighbor.weight;  // [12] Calculate the distance through this node',
                '            if (newDist < dist[neighbor.to]) {  // [13] If this path is shorter',
                '                dist[neighbor.to] = newDist;  // [14] Update to the shorter distance',
                '                pq.push({ dist: newDist, node: neighbor.to });  // [15] Add neighbor to the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return dist;  // [16] Give back the shortest distances to every node',
                '}',
            ],
            c: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'void dijkstra(int adj[][2], int adjSize[], int start, int n, int* dist) {',
                '',
                '    for (int i = 0; i < n; i++) dist[i] = INT_MAX;  // [2] Set every distance to infinity',
                '    dist[start] = 0;  // [3] The distance from start to itself is zero',
                '    int visited[n]; memset(visited, 0, sizeof(visited));  // [4] Keep track of fully processed nodes',
                '    // [5] Use a simple array as a priority queue (min-scan each iteration)',
                '',
                '    for (int iter = 0; iter < n; iter++) {  // [6] Keep going while there are nodes to process',
                '        int node = -1;',
                '        for (int i = 0; i < n; i++)  // [7] Take the node with the smallest distance',
                '            if (!visited[i] && (node == -1 || dist[i] < dist[node])) node = i;',
                '',
                '        if (dist[node] == INT_MAX) break;  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited[node] = 1;  // [10] Mark this node as fully processed',
                '',
                '        for (int i = 0; i < adjSize[node]; i++) {  // [11] Look at every neighbor',
                '            int neighbor = adj[node][i * 2];',
                '            int weight   = adj[node][i * 2 + 1];',
                '            int newDist = dist[node] + weight;  // [12] Calculate the distance through this node',
                '            if (newDist < dist[neighbor]) {  // [13] If this path is shorter',
                '                dist[neighbor] = newDist;  // [14] Update to the shorter distance',
                '                // [15] Array scan replaces priority queue insert',
                '            }',
                '        }',
                '    }',
                '    // [16] dist[] now holds the shortest distances to every node',
                '}',
            ],
            csharp: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'public Dictionary<int, int> Dijkstra(Dictionary<int, List<(int to, int weight)>> adj, int start, List<int> nodes) {',
                '',
                '    var dist = new Dictionary<int, int>();',
                '    foreach (int n in nodes) dist[n] = int.MaxValue;  // [2] Set every distance to infinity',
                '    dist[start] = 0;  // [3] The distance from start to itself is zero',
                '    var visited = new HashSet<int>();  // [4] Keep track of fully processed nodes',
                '    var pq = new PriorityQueue<int, int>();',
                '    pq.Enqueue(start, 0);  // [5] Priority queue with (node, distance)',
                '',
                '    while (pq.Count > 0) {  // [6] Keep going while there are nodes to process',
                '        int node = pq.Dequeue();  // [7] Take the node with the smallest distance',
                '        int d = dist[node];',
                '',
                '        if (visited.Contains(node)) continue;  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited.Add(node);  // [10] Mark this node as fully processed',
                '',
                '        foreach (var (neighbor, weight) in adj[node]) {  // [11] Look at every neighbor',
                '            int newDist = d + weight;  // [12] Calculate the distance through this node',
                '            if (newDist < dist[neighbor]) {  // [13] If this path is shorter',
                '                dist[neighbor] = newDist;  // [14] Update to the shorter distance',
                '                pq.Enqueue(neighbor, newDist);  // [15] Add neighbor to the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return dist;  // [16] Give back the shortest distances to every node',
                '}',
            ],
            typescript: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'function dijkstra(adj: Map<number, [number, number][]>, start: number, nodes: number[]): Map<number, number> {',
                '',
                '    const dist = new Map<number, number>(nodes.map(n => [n, Infinity]));  // [2] Set every distance to infinity',
                '    dist.set(start, 0);  // [3] The distance from start to itself is zero',
                '    const visited = new Set<number>();  // [4] Keep track of fully processed nodes',
                '    const pq: [number, number][] = [[0, start]];  // [5] Priority queue with (distance, node)',
                '',
                '    while (pq.length > 0) {  // [6] Keep going while there are nodes to process',
                '        pq.sort((a, b) => a[0] - b[0]);',
                '        const [d, node] = pq.shift()!;  // [7] Take the node with the smallest distance',
                '',
                '        if (visited.has(node)) continue;  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited.add(node);  // [10] Mark this node as fully processed',
                '',
                '        for (const [neighbor, weight] of adj.get(node)!) {  // [11] Look at every neighbor',
                '            const newDist = d + weight;  // [12] Calculate the distance through this node',
                '            if (newDist < dist.get(neighbor)!) {  // [13] If this path is shorter',
                '                dist.set(neighbor, newDist);  // [14] Update to the shorter distance',
                '                pq.push([newDist, neighbor]);  // [15] Add neighbor to the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return dist;  // [16] Give back the shortest distances to every node',
                '}',
            ],
            go: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'func dijkstra(adj map[int][][2]int, start int, nodes []int) map[int]int {',
                '',
                '    dist := make(map[int]int)',
                '    for _, n := range nodes { dist[n] = math.MaxInt }  // [2] Set every distance to infinity',
                '    dist[start] = 0  // [3] The distance from start to itself is zero',
                '    visited := make(map[int]bool)  // [4] Keep track of fully processed nodes',
                '    h := &MinHeap{{0, start}}  // [5] Priority queue with (distance, node)',
                '    heap.Init(h)',
                '',
                '    for h.Len() > 0 {  // [6] Keep going while there are nodes to process',
                '        item := heap.Pop(h).([2]int)',
                '        d, node := item[0], item[1]  // [7] Take the node with the smallest distance',
                '',
                '        if visited[node] { continue }  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited[node] = true  // [10] Mark this node as fully processed',
                '',
                '        for _, edge := range adj[node] {  // [11] Look at every neighbor',
                '            neighbor, weight := edge[0], edge[1]',
                '            newDist := d + weight  // [12] Calculate the distance through this node',
                '            if newDist < dist[neighbor] {  // [13] If this path is shorter',
                '                dist[neighbor] = newDist  // [14] Update to the shorter distance',
                '                heap.Push(h, [2]int{newDist, neighbor})  // [15] Add neighbor to the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    return dist  // [16] Give back the shortest distances to every node',
                '}',
            ],
            rust: [
                '// Step 1: Find the shortest path from a start node to all other nodes',
                'fn dijkstra(adj: &HashMap<i32, Vec<(i32, i32)>>, start: i32, nodes: &[i32]) -> HashMap<i32, i32> {',
                '',
                '    let mut dist: HashMap<i32, i32> = nodes.iter().map(|&n| (n, i32::MAX)).collect();',
                '    // [2] Set every distance to infinity',
                '    dist.insert(start, 0);  // [3] The distance from start to itself is zero',
                '    let mut visited = HashSet::new();  // [4] Keep track of fully processed nodes',
                '    let mut pq = BinaryHeap::new();',
                '    pq.push(Reverse((0, start)));  // [5] Priority queue with (distance, node)',
                '',
                '    while let Some(Reverse((d, node))) = pq.pop() {  // [6] Keep going while there are nodes to process',
                '        // [7] Take the node with the smallest distance',
                '',
                '        if visited.contains(&node) { continue; }  // [8] If we already processed this node',
                '        // [9] Skip it and move on',
                '',
                '        visited.insert(node);  // [10] Mark this node as fully processed',
                '',
                '        for &(neighbor, weight) in &adj[&node] {  // [11] Look at every neighbor',
                '            let new_dist = d + weight;  // [12] Calculate the distance through this node',
                '            if new_dist < *dist.get(&neighbor).unwrap_or(&i32::MAX) {  // [13] If this path is shorter',
                '                dist.insert(neighbor, new_dist);  // [14] Update to the shorter distance',
                '                pq.push(Reverse((new_dist, neighbor)));  // [15] Add neighbor to the queue',
                '            }',
                '        }',
                '    }',
                '',
                '    dist  // [16] Give back the shortest distances to every node',
                '}',
            ],
        },
    };

    // ─── Complexity Info ───

    const COMPLEXITY = {
        bfs: {
            name: 'Breadth-First Search',
            best: 'O(V + E)',
            average: 'O(V + E)',
            worst: 'O(V + E)',
            space: 'O(V)',
            description:
                'Start at a node and visit all its neighbors first, then visit the neighbors of those ' +
                'neighbors, and so on. Uses a queue to process nodes level by level. Every node and ' +
                'every edge is looked at exactly once.',
            useCase:
                'Ideal for finding the shortest path in an unweighted graph. Also used for level-order ' +
                'traversal of trees, checking if a graph is bipartite, and finding all nodes within ' +
                'a certain number of hops from a start node.',
            avoid:
                'Not ideal when the graph is very deep and the target is far from the start. ' +
                'Uses more memory than DFS because it stores all nodes at the current level. ' +
                'For weighted shortest paths, use Dijkstra instead.',
        },
        dfs: {
            name: 'Depth-First Search',
            best: 'O(V + E)',
            average: 'O(V + E)',
            worst: 'O(V + E)',
            space: 'O(V)',
            description:
                'Start at a node and go as deep as possible along each branch before backtracking. ' +
                'Uses a stack (or recursion) to remember where to go back. Every node and every ' +
                'edge is looked at exactly once.',
            useCase:
                'Great for exploring all paths, detecting cycles, topological sorting, and solving ' +
                'maze-like problems. Uses less memory than BFS on wide graphs since it only stores ' +
                'nodes along the current path.',
            avoid:
                'Not suitable for finding the shortest path in unweighted graphs (use BFS instead). ' +
                'Can get stuck in very deep or infinite branches without a depth limit. ' +
                'Recursive version may cause stack overflow on very deep graphs.',
        },
        dijkstra: {
            name: "Dijkstra's Shortest Path",
            best: 'O((V + E) log V)',
            average: 'O((V + E) log V)',
            worst: 'O((V + E) log V)',
            space: 'O(V)',
            description:
                'Find the shortest path from a starting node to every other node in a weighted graph. ' +
                'Always pick the unvisited node with the smallest known distance, then update distances ' +
                'to its neighbors. Repeats until all reachable nodes are processed.',
            useCase:
                'The standard choice for shortest paths in graphs with non-negative edge weights. ' +
                'Used in GPS navigation, network routing protocols, and any scenario where you need ' +
                'the cheapest route between two points.',
            avoid:
                'Does not work correctly with negative edge weights (use Bellman-Ford instead). ' +
                'Overkill for unweighted graphs where BFS gives the same result more simply. ' +
                'The priority queue adds overhead compared to simpler approaches on small graphs.',
        },
    };

    // ─── Graph Representation Helper ───

    function buildAdjList(nodes, edges) {
        const adj = {};
        for (const n of nodes) adj[n] = [];
        for (const [from, to, weight] of edges) {
            adj[from].push({ to, weight: weight || 1 });
            adj[to].push({ to: from, weight: weight || 1 }); // undirected
        }
        return adj;
    }

    // ─── Sample Graph Builder ───

    function buildSampleGraph() {
        const nodes = [1, 2, 3, 4, 5, 6];
        const edges = [[1, 2], [1, 3], [2, 4], [2, 5], [3, 6]];
        return { nodes, edges, adj: buildAdjList(nodes, edges) };
    }

    // ─── Algorithm Generators ───

    /**
     * Breadth-First Search generator.
     *
     * @param {object} adj - Adjacency list mapping node to array of { to, weight }.
     * @param {number} startNode - The node to begin traversal from.
     * @param {number[]} nodes - All nodes in the graph.
     * @yields {object} Step object with type, nodeId, optional from/to, and codeLine.
     */
    function* bfs(adj, startNode, nodes) {
        const visited = new Set();
        const queue = [startNode];
        visited.add(startNode);

        yield { type: 'enqueue', nodeId: startNode, codeLine: 3 };
        yield { type: 'visit', nodeId: startNode, codeLine: 4 };

        while (queue.length > 0) {
            const node = queue.shift();
            yield { type: 'dequeue', nodeId: node, codeLine: 6 };

            for (const neighbor of adj[node]) {
                if (!visited.has(neighbor.to)) {
                    visited.add(neighbor.to);
                    queue.push(neighbor.to);
                    yield { type: 'enqueue', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 10 };
                    yield { type: 'visit', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 9 };
                }
            }

            yield { type: 'visited', nodeId: node, codeLine: 7 };
        }
    }

    /**
     * Depth-First Search generator (iterative with stack).
     *
     * @param {object} adj - Adjacency list mapping node to array of { to, weight }.
     * @param {number} startNode - The node to begin traversal from.
     * @param {number[]} nodes - All nodes in the graph.
     * @yields {object} Step object with type, nodeId, optional from/to, and codeLine.
     */
    function* dfs(adj, startNode, nodes) {
        const visited = new Set();
        const stack = [startNode];

        yield { type: 'push', nodeId: startNode, codeLine: 3 };

        while (stack.length > 0) {
            const node = stack.pop();
            yield { type: 'visit', nodeId: node, codeLine: 5 };

            if (!visited.has(node)) {
                visited.add(node);
                yield { type: 'visited', nodeId: node, codeLine: 7 };

                for (const neighbor of adj[node]) {
                    if (!visited.has(neighbor.to)) {
                        stack.push(neighbor.to);
                        yield { type: 'push', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 10 };
                    }
                }
            }
        }
    }

    /**
     * Dijkstra's Shortest Path generator.
     * Uses a simple array-based priority queue for visualization clarity.
     *
     * @param {object} adj - Adjacency list mapping node to array of { to, weight }.
     * @param {number} startNode - The source node.
     * @param {number[]} nodes - All nodes in the graph.
     * @yields {object} Step object with type, nodeId, optional from/to, and codeLine.
     */
    function* dijkstra(adj, startNode, nodes) {
        const dist = {};
        for (const n of nodes) dist[n] = Infinity;
        dist[startNode] = 0;

        const visited = new Set();
        const pq = [{ dist: 0, node: startNode }];

        yield { type: 'visit', nodeId: startNode, codeLine: 3 };

        while (pq.length > 0) {
            // Extract the entry with the smallest distance
            pq.sort((a, b) => a.dist - b.dist);
            const { dist: d, node } = pq.shift();

            yield { type: 'visit', nodeId: node, codeLine: 7 };

            if (visited.has(node)) {
                continue;
            }

            visited.add(node);
            yield { type: 'visited', nodeId: node, codeLine: 10 };

            for (const neighbor of adj[node]) {
                const newDist = d + neighbor.weight;

                yield { type: 'relax', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 12 };

                if (newDist < dist[neighbor.to]) {
                    dist[neighbor.to] = newDist;
                    pq.push({ dist: newDist, node: neighbor.to });

                    yield { type: 'update', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 14 };
                }
            }
        }
    }

    return { CODE, COMPLEXITY, buildAdjList, buildSampleGraph, bfs, dfs, dijkstra };
})();

export default GraphAlgorithms;
