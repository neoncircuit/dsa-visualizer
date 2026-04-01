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

        astar: {
            pseudo: [
                '# A* pathfinding with heuristic - finds shortest path to a goal',
                'procedure astar(adj, start, goal, heuristic):',
                '',
                '    gScore = map each node to infinity  # [2] Cost from start to each node',
                '    gScore[start] = 0  # [3] Cost to reach start is zero',
                '    fScore = map each node to infinity  # [4] Estimated total cost (g + h)',
                '    fScore[start] = heuristic(start, goal)  # [5] Initial estimate',
                '    openSet = [(fScore[start], start)]  # [6] Priority queue sorted by fScore',
                '',
                '    while openSet is not empty:  # [7] Keep going while there are nodes to explore',
                '        (f, node) = openSet.extractMin()  # [8] Get node with lowest fScore',
                '',
                '        if node == goal:  # [9] If we reached the goal',
                '            return reconstructPath()  # [10] Build and return the path',
                '',
                '        for (neighbor, weight) in adj[node]:  # [11] Look at every neighbor',
                '            tentativeG = gScore[node] + weight  # [12] Calculate new cost to neighbor',
                '            if tentativeG < gScore[neighbor]:  # [13] If this path is better',
                '                gScore[neighbor] = tentativeG  # [14] Update cost to neighbor',
                '                f = tentativeG + heuristic(neighbor, goal)  # [15] Calculate new fScore',
                '                fScore[neighbor] = f  # [16] Update fScore',
                '                openSet.insert((f, neighbor))  # [17] Add neighbor to open set',
                '',
                '    return null  # [18] No path found',
            ],
            python: [
                '# A* pathfinding with heuristic - finds shortest path to a goal',
                'def astar(adj: dict[int, list], start: int, goal: int, h: Callable) -> list[int] | None:',
                '',
                '    g_score: dict[int, float] = {n: float("inf") for n in adj}  # [2] Cost from start',
                '    g_score[start] = 0  # [3] Cost to reach start is zero',
                '    f_score: dict[int, float] = {n: float("inf") for n in adj}  # [4] Estimated total',
                '    f_score[start] = h(start, goal)  # [5] Initial estimate',
                '    open_set: list[tuple] = [(f_score[start], start)]  # [6] Priority queue',
                '',
                '    while open_set:  # [7] Keep going while there are nodes to explore',
                '        _, node = min(open_set); open_set.remove((_, node))  # [8] Get lowest fScore',
                '',
                '        if node == goal:  # [9] If we reached the goal',
                '            return reconstruct_path()  # [10] Build and return the path',
                '',
                '        for neighbor in adj[node]:  # [11] Look at every neighbor',
                '            tentative_g = g_score[node] + neighbor["weight"]  # [12] New cost',
                '            if tentative_g < g_score[neighbor["to"]]:  # [13] If this path is better',
                '                g_score[neighbor["to"]] = tentative_g  # [14] Update cost',
                '                f = tentative_g + h(neighbor["to"], goal)  # [15] Calculate fScore',
                '                f_score[neighbor["to"]] = f  # [16] Update fScore',
                '                open_set.append((f, neighbor["to"]))  # [17] Add to open set',
                '',
                '    return None  # [18] No path found',
            ],
            java: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'List<Integer> astar(Map<Integer, List<int[]>> adj, int start, int goal, Heuristic h) {',
                '',
                '    Map<Integer, Integer> gScore = new HashMap<>();',
                '    for (int n : adj.keySet()) gScore.put(n, Integer.MAX_VALUE);  // [2] Cost from start',
                '    gScore.put(start, 0);  // [3] Cost to reach start is zero',
                '    Map<Integer, Integer> fScore = new HashMap<>();',
                '    for (int n : adj.keySet()) fScore.put(n, Integer.MAX_VALUE);  // [4] Estimated total',
                '    fScore.put(start, h.estimate(start, goal));  // [5] Initial estimate',
                '    PriorityQueue<int[]> openSet = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));',
                '    openSet.offer(new int[]{fScore.get(start), start});  // [6] Priority queue',
                '',
                '    while (!openSet.isEmpty()) {  // [7] Keep going while there are nodes to explore',
                '        int[] top = openSet.poll();',
                '        int node = top[1];  // [8] Get node with lowest fScore',
                '',
                '        if (node == goal) return reconstructPath();  // [9-10] Reached the goal',
                '',
                '        for (int[] neighbor : adj.get(node)) {  // [11] Look at every neighbor',
                '            int tentativeG = gScore.get(node) + neighbor[1];  // [12] New cost',
                '            if (tentativeG < gScore.get(neighbor[0])) {  // [13] If this path is better',
                '                gScore.put(neighbor[0], tentativeG);  // [14] Update cost',
                '                int f = tentativeG + h.estimate(neighbor[0], goal);  // [15] fScore',
                '                fScore.put(neighbor[0], f);  // [16] Update fScore',
                '                openSet.offer(new int[]{f, neighbor[0]});  // [17] Add to open set',
                '            }',
                '        }',
                '    }',
                '    return null;  // [18] No path found',
                '}',
            ],
            cpp: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'vector<int> astar(unordered_map<int, vector<pair<int,int>>>& adj, int start, int goal,',
                '                   function<int(int,int)> h) {',
                '',
                '    unordered_map<int, int> gScore;',
                '    for (auto& [n, _] : adj) gScore[n] = INT_MAX;  // [2] Cost from start',
                '    gScore[start] = 0;  // [3] Cost to reach start is zero',
                '    unordered_map<int, int> fScore;',
                '    for (auto& [n, _] : adj) fScore[n] = INT_MAX;  // [4] Estimated total',
                '    fScore[start] = h(start, goal);  // [5] Initial estimate',
                '    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> openSet;',
                '    openSet.push({fScore[start], start});  // [6] Priority queue',
                '',
                '    while (!openSet.empty()) {  // [7] Keep going while there are nodes to explore',
                '        auto [f, node] = openSet.top(); openSet.pop();  // [8] Get lowest fScore',
                '',
                '        if (node == goal) return reconstructPath();  // [9-10] Reached the goal',
                '',
                '        for (auto& [neighbor, weight] : adj[node]) {  // [11] Look at every neighbor',
                '            int tentativeG = gScore[node] + weight;  // [12] New cost',
                '            if (tentativeG < gScore[neighbor]) {  // [13] If this path is better',
                '                gScore[neighbor] = tentativeG;  // [14] Update cost',
                '                int newF = tentativeG + h(neighbor, goal);  // [15] fScore',
                '                fScore[neighbor] = newF;  // [16] Update fScore',
                '                openSet.push({newF, neighbor});  // [17] Add to open set',
                '            }',
                '        }',
                '    }',
                '    return {};  // [18] No path found',
                '}',
            ],
            c: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'int astar(int adj[][2], int adjSize[], int start, int goal,',
                '         int (*heuristic)(int, int), int* path) {',
                '',
                '    int gScore[MAX_NODES], fScore[MAX_NODES];',
                '    for (int i = 0; i < MAX_NODES; i++) gScore[i] = INT_MAX;  // [2] Cost from start',
                '    gScore[start] = 0;  // [3] Cost to reach start is zero',
                '    for (int i = 0; i < MAX_NODES; i++) fScore[i] = INT_MAX;  // [4] Estimated total',
                '    fScore[start] = heuristic(start, goal);  // [5] Initial estimate',
                '    // [6] Priority queue implementation',
                '',
                '    // [7-18] Main loop similar to Dijkstra with heuristic',
                '    return 0;  // Path length, or -1 if no path',
                '}',
            ],
            csharp: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'List<int> Astar(Dictionary<int, List<int[]>> adj, int start, int goal, Func<int,int,int> h) {',
                '',
                '    var gScore = new Dictionary<int, int>();',
                '    foreach (var n in adj.Keys) gScore[n] = int.MaxValue;  // [2] Cost from start',
                '    gScore[start] = 0;  // [3] Cost to reach start is zero',
                '    var fScore = new Dictionary<int, int>();',
                '    foreach (var n in adj.Keys) fScore[n] = int.MaxValue;  // [4] Estimated total',
                '    fScore[start] = h(start, goal);  // [5] Initial estimate',
                '    var openSet = new PriorityQueue<int, int>();',
                '    openSet.Enqueue(start, fScore[start]);  // [6] Priority queue',
                '',
                '    while (openSet.Count > 0) {  // [7] Keep going while there are nodes to explore',
                '        int node = openSet.Dequeue();  // [8] Get node with lowest fScore',
                '',
                '        if (node == goal) return ReconstructPath();  // [9-10] Reached the goal',
                '',
                '        foreach (var neighbor in adj[node]) {  // [11] Look at every neighbor',
                '            int tentativeG = gScore[node] + neighbor[1];  // [12] New cost',
                '            if (tentativeG < gScore[neighbor[0]]) {  // [13] If this path is better',
                '                gScore[neighbor[0]] = tentativeG;  // [14] Update cost',
                '                int f = tentativeG + h(neighbor[0], goal);  // [15] fScore',
                '                fScore[neighbor[0]] = f;  // [16] Update fScore',
                '                openSet.Enqueue(neighbor[0], f);  // [17] Add to open set',
                '            }',
                '        }',
                '    }',
                '    return null;  // [18] No path found',
                '}',
            ],
            javascript: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'function astar(adj, start, goal, heuristic) {',
                '',
                '    const gScore = Object.fromEntries(Object.keys(adj).map(n => [n, Infinity]));',
                '    gScore[start] = 0;  // [2-3] Cost from start',
                '    const fScore = Object.fromEntries(Object.keys(adj).map(n => [n, Infinity]));',
                '    fScore[start] = heuristic(start, goal);  // [4-5] Estimated total cost',
                '    const openSet = [{ f: fScore[start], node: start }];  // [6] Priority queue',
                '',
                '    while (openSet.length > 0) {  // [7] Keep going while there are nodes to explore',
                '        openSet.sort((a, b) => a.f - b.f);',
                '        const { node } = openSet.shift();  // [8] Get node with lowest fScore',
                '',
                '        if (node === goal) return reconstructPath();  // [9-10] Reached the goal',
                '',
                '        for (const neighbor of adj[node]) {  // [11] Look at every neighbor',
                '            const tentativeG = gScore[node] + neighbor.weight;  // [12] New cost',
                '            if (tentativeG < gScore[neighbor.to]) {  // [13] If this path is better',
                '                gScore[neighbor.to] = tentativeG;  // [14] Update cost',
                '                const f = tentativeG + heuristic(neighbor.to, goal);  // [15] fScore',
                '                fScore[neighbor.to] = f;  // [16] Update fScore',
                '                openSet.push({ f, node: neighbor.to });  // [17] Add to open set',
                '            }',
                '        }',
                '    }',
                '    return null;  // [18] No path found',
                '}',
            ],
            typescript: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'function astar(',
                '    adj: Record<number, Array<{ to: number; weight: number }>>,',
                '    start: number,',
                '    goal: number,',
                '    heuristic: (a: number, b: number) => number',
                '): number[] | null {',
                '',
                '    const gScore: Record<number, number> = {};',
                '    for (const n of Object.keys(adj)) gScore[Number(n)] = Infinity;  // [2]',
                '    gScore[start] = 0;  // [3] Cost to reach start is zero',
                '    const fScore: Record<number, number> = {};',
                '    for (const n of Object.keys(adj)) fScore[Number(n)] = Infinity;  // [4]',
                '    fScore[start] = heuristic(start, goal);  // [5] Initial estimate',
                '    const openSet: Array<{ f: number; node: number }> = [{ f: fScore[start], node: start }];',
                '    // [6] Priority queue',
                '',
                '    while (openSet.length > 0) {  // [7] Keep going while there are nodes',
                '        openSet.sort((a, b) => a.f - b.f);',
                '        const { node } = openSet.shift()!;  // [8] Get lowest fScore',
                '',
                '        if (node === goal) return reconstructPath();  // [9-10]',
                '',
                '        for (const neighbor of adj[node]) {  // [11]',
                '            const tentativeG = gScore[node] + neighbor.weight;  // [12]',
                '            if (tentativeG < gScore[neighbor.to]) {  // [13]',
                '                gScore[neighbor.to] = tentativeG;  // [14]',
                '                const f = tentativeG + heuristic(neighbor.to, goal);  // [15]',
                '                fScore[neighbor.to] = f;  // [16]',
                '                openSet.push({ f, node: neighbor.to });  // [17]',
                '            }',
                '        }',
                '    }',
                '    return null;  // [18] No path found',
                '}',
            ],
            go: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'func astar(adj map[int][][2]int, start int, goal int, h func(int, int) int) []int {',
                '',
                '    gScore := make(map[int]int)',
                '    for n := range adj { gScore[n] = math.MaxInt }  // [2] Cost from start',
                '    gScore[start] = 0  // [3] Cost to reach start is zero',
                '    fScore := make(map[int]int)',
                '    for n := range adj { fScore[n] = math.MaxInt }  // [4] Estimated total',
                '    fScore[start] = h(start, goal)  // [5] Initial estimate',
                '    openSet := &MinHeap{{fScore[start], start}}  // [6] Priority queue',
                '    heap.Init(openSet)',
                '',
                '    for openSet.Len() > 0 {  // [7] Keep going while there are nodes to explore',
                '        item := heap.Pop(openSet).([2]int)',
                '        node := item[1]  // [8] Get node with lowest fScore',
                '',
                '        if node == goal { return reconstructPath() }  // [9-10] Reached the goal',
                '',
                '        for _, edge := range adj[node] {  // [11] Look at every neighbor',
                '            neighbor, weight := edge[0], edge[1]',
                '            tentativeG := gScore[node] + weight  // [12] New cost',
                '            if tentativeG < gScore[neighbor] {  // [13] If this path is better',
                '                gScore[neighbor] = tentativeG  // [14] Update cost',
                '                f := tentativeG + h(neighbor, goal)  // [15] fScore',
                '                fScore[neighbor] = f  // [16] Update fScore',
                '                heap.Push(openSet, [2]int{f, neighbor})  // [17] Add to open set',
                '            }',
                '        }',
                '    }',
                '    return nil  // [18] No path found',
                '}',
            ],
            rust: [
                '// A* pathfinding with heuristic - finds shortest path to a goal',
                'fn astar(',
                '    adj: &HashMap<i32, Vec<(i32, i32)>>,',
                '    start: i32,',
                '    goal: i32,',
                '    h: impl Fn(i32, i32) -> i32,',
                ') -> Option<Vec<i32>> {',
                '',
                '    let mut g_score: HashMap<i32, i32> = adj.keys().map(|&n| (n, i32::MAX)).collect();',
                '    // [2] Cost from start',
                '    g_score.insert(start, 0);  // [3] Cost to reach start is zero',
                '    let mut f_score: HashMap<i32, i32> = adj.keys().map(|&n| (n, i32::MAX)).collect();',
                '    // [4] Estimated total',
                '    f_score.insert(start, h(start, goal));  // [5] Initial estimate',
                '    let mut open_set = BinaryHeap::new();',
                '    open_set.push(Reverse((f_score[&start], start)));  // [6] Priority queue',
                '',
                '    while let Some(Reverse((_, node))) = open_set.pop() {  // [7-8]',
                '        if node == goal { return Some(reconstruct_path()); }  // [9-10]',
                '',
                '        for &(neighbor, weight) in &adj[&node] {  // [11]',
                '            let tentative_g = g_score[&node] + weight;  // [12]',
                '            if tentative_g < *g_score.get(&neighbor).unwrap_or(&i32::MAX) {  // [13]',
                '                g_score.insert(neighbor, tentative_g);  // [14]',
                '                let f = tentative_g + h(neighbor, goal);  // [15]',
                '                f_score.insert(neighbor, f);  // [16]',
                '                open_set.push(Reverse((f, neighbor)));  // [17]',
                '            }',
                '        }',
                '    }',
                '    None  // [18] No path found',
                '}',
            ],
        },

        bellmanFord: {
            pseudo: [
                '# Bellman-Ford: shortest paths with negative edge support',
                'procedure bellmanFord(adj, start, nodes):',
                '',
                '    dist = map each node to infinity  # [2] Set every distance to infinity',
                '    dist[start] = 0  # [3] Distance to start is zero',
                '',
                '    for i = 1 to |nodes| - 1:  # [4] Relax all edges V-1 times',
                '        for each edge (u, v, w) in edges:  # [5] Check every edge',
                '            if dist[u] + w < dist[v]:  # [6] Can we improve the path to v?',
                '                dist[v] = dist[u] + w  # [7] Update distance to v',
                '',
                '    # Check for negative cycles',
                '    for each edge (u, v, w) in edges:  # [8] One more pass',
                '        if dist[u] + w < dist[v]:  # [9] If we can still improve',
                '            return "Negative cycle detected"  # [10] Cycle exists',
                '',
                '    return dist  # [11] Return shortest distances',
            ],
            python: [
                '# Bellman-Ford: shortest paths with negative edge support',
                'def bellman_ford(edges: list[tuple], start: int, nodes: list[int]) -> dict[int, float] | str:',
                '',
                '    dist: dict[int, float] = {n: float("inf") for n in nodes}  # [2]',
                '    dist[start] = 0  # [3] Distance to start is zero',
                '',
                '    for _ in range(len(nodes) - 1):  # [4] Relax all edges V-1 times',
                '        for u, v, w in edges:  # [5] Check every edge',
                '            if dist[u] + w < dist[v]:  # [6] Can we improve?',
                '                dist[v] = dist[u] + w  # [7] Update distance',
                '',
                '    # Check for negative cycles',
                '    for u, v, w in edges:  # [8] One more pass',
                '        if dist[u] + w < dist[v]:  # [9] If still improving',
                '            return "Negative cycle"  # [10] Cycle exists',
                '',
                '    return dist  # [11] Return shortest distances',
            ],
            java: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'Map<Integer, Integer> bellmanFord(List<int[]> edges, int start, List<Integer> nodes) {',
                '',
                '    Map<Integer, Integer> dist = new HashMap<>();',
                '    for (int n : nodes) dist.put(n, Integer.MAX_VALUE);  // [2]',
                '    dist.put(start, 0);  // [3] Distance to start is zero',
                '',
                '    for (int i = 0; i < nodes.size() - 1; i++) {  // [4] V-1 iterations',
                '        for (int[] edge : edges) {  // [5] Check every edge',
                '            int u = edge[0], v = edge[1], w = edge[2];',
                '            if (dist.get(u) != Integer.MAX_VALUE && dist.get(u) + w < dist.get(v)) {  // [6]',
                '                dist.put(v, dist.get(u) + w);  // [7] Update distance',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    for (int[] edge : edges) {  // [8] One more pass',
                '        int u = edge[0], v = edge[1], w = edge[2];',
                '        if (dist.get(u) != Integer.MAX_VALUE && dist.get(u) + w < dist.get(v)) {  // [9]',
                '            return null;  // [10] Negative cycle detected',
                '        }',
                '    }',
                '    return dist;  // [11] Return shortest distances',
                '}',
            ],
            cpp: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'unordered_map<int, int> bellmanFord(vector<tuple<int,int,int>>& edges, int start, vector<int>& nodes) {',
                '',
                '    unordered_map<int, int> dist;',
                '    for (int n : nodes) dist[n] = INT_MAX;  // [2]',
                '    dist[start] = 0;  // [3] Distance to start is zero',
                '',
                '    for (int i = 0; i < nodes.size() - 1; i++) {  // [4] V-1 iterations',
                '        for (auto& [u, v, w] : edges) {  // [5] Check every edge',
                '            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {  // [6]',
                '                dist[v] = dist[u] + w;  // [7] Update distance',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    for (auto& [u, v, w] : edges) {  // [8] One more pass',
                '        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {  // [9]',
                '            return {};  // [10] Negative cycle detected',
                '        }',
                '    }',
                '    return dist;  // [11] Return shortest distances',
                '}',
            ],
            c: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'int bellmanFord(int edges[][3], int edgeCount, int start, int n, int* dist) {',
                '',
                '    for (int i = 0; i < n; i++) dist[i] = INT_MAX;  // [2]',
                '    dist[start] = 0;  // [3] Distance to start is zero',
                '',
                '    for (int i = 0; i < n - 1; i++) {  // [4] V-1 iterations',
                '        for (int j = 0; j < edgeCount; j++) {  // [5] Check every edge',
                '            int u = edges[j][0], v = edges[j][1], w = edges[j][2];',
                '            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {  // [6]',
                '                dist[v] = dist[u] + w;  // [7] Update distance',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    for (int j = 0; j < edgeCount; j++) {  // [8] One more pass',
                '        int u = edges[j][0], v = edges[j][1], w = edges[j][2];',
                '        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {  // [9]',
                '            return -1;  // [10] Negative cycle detected',
                '        }',
                '    }',
                '    return 0;  // [11] Success',
                '}',
            ],
            csharp: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'Dictionary<int, int> BellmanFord(List<(int, int, int)> edges, int start, List<int> nodes) {',
                '',
                '    var dist = new Dictionary<int, int>();',
                '    foreach (var n in nodes) dist[n] = int.MaxValue;  // [2]',
                '    dist[start] = 0;  // [3] Distance to start is zero',
                '',
                '    for (int i = 0; i < nodes.Count - 1; i++) {  // [4] V-1 iterations',
                '        foreach (var (u, v, w) in edges) {  // [5] Check every edge',
                '            if (dist[u] != int.MaxValue && dist[u] + w < dist[v]) {  // [6]',
                '                dist[v] = dist[u] + w;  // [7] Update distance',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    foreach (var (u, v, w) in edges) {  // [8] One more pass',
                '        if (dist[u] != int.MaxValue && dist[u] + w < dist[v]) {  // [9]',
                '            return null;  // [10] Negative cycle detected',
                '        }',
                '    }',
                '    return dist;  // [11] Return shortest distances',
                '}',
            ],
            javascript: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'function bellmanFord(edges, start, nodes) {',
                '',
                '    const dist = Object.fromEntries(nodes.map(n => [n, Infinity]));  // [2]',
                '    dist[start] = 0;  // [3] Distance to start is zero',
                '',
                '    for (let i = 0; i < nodes.length - 1; i++) {  // [4] V-1 iterations',
                '        for (const [u, v, w] of edges) {  // [5] Check every edge',
                '            if (dist[u] + w < dist[v]) {  // [6] Can we improve?',
                '                dist[v] = dist[u] + w;  // [7] Update distance',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    for (const [u, v, w] of edges) {  // [8] One more pass',
                '        if (dist[u] + w < dist[v]) {  // [9] If still improving',
                '            return "Negative cycle";  // [10] Cycle exists',
                '        }',
                '    }',
                '    return dist;  // [11] Return shortest distances',
                '}',
            ],
            typescript: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'function bellmanFord(',
                '    edges: Array<[number, number, number]>,',
                '    start: number,',
                '    nodes: number[]',
                '): Record<number, number> | string {',
                '',
                '    const dist: Record<number, number> = {};',
                '    for (const n of nodes) dist[n] = Infinity;  // [2]',
                '    dist[start] = 0;  // [3] Distance to start is zero',
                '',
                '    for (let i = 0; i < nodes.length - 1; i++) {  // [4] V-1 iterations',
                '        for (const [u, v, w] of edges) {  // [5] Check every edge',
                '            if (dist[u] + w < dist[v]) {  // [6] Can we improve?',
                '                dist[v] = dist[u] + w;  // [7] Update distance',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    for (const [u, v, w] of edges) {  // [8] One more pass',
                '        if (dist[u] + w < dist[v]) {  // [9] If still improving',
                '            return "Negative cycle";  // [10] Cycle exists',
                '        }',
                '    }',
                '    return dist;  // [11] Return shortest distances',
                '}',
            ],
            go: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'func bellmanFord(edges [][3]int, start int, nodes []int) (map[int]int, error) {',
                '',
                '    dist := make(map[int]int)',
                '    for _, n := range nodes { dist[n] = math.MaxInt }  // [2]',
                '    dist[start] = 0  // [3] Distance to start is zero',
                '',
                '    for i := 0; i < len(nodes)-1; i++ {  // [4] V-1 iterations',
                '        for _, edge := range edges {  // [5] Check every edge',
                '            u, v, w := edge[0], edge[1], edge[2]',
                '            if dist[u] != math.MaxInt && dist[u]+w < dist[v] {  // [6]',
                '                dist[v] = dist[u] + w  // [7] Update distance',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    for _, edge := range edges {  // [8] One more pass',
                '        u, v, w := edge[0], edge[1], edge[2]',
                '        if dist[u] != math.MaxInt && dist[u]+w < dist[v] {  // [9]',
                '            return nil, errors.New("negative cycle")  // [10]',
                '        }',
                '    }',
                '    return dist, nil  // [11] Return shortest distances',
                '}',
            ],
            rust: [
                '// Bellman-Ford: shortest paths with negative edge support',
                'fn bellman_ford(edges: &[(i32, i32, i32)], start: i32, nodes: &[i32]) -> Option<HashMap<i32, i32>> {',
                '',
                '    let mut dist: HashMap<i32, i32> = nodes.iter().map(|&n| (n, i32::MAX)).collect();',
                '    dist.insert(start, 0);  // [3] Distance to start is zero',
                '',
                '    for _ in 0..nodes.len() - 1 {  // [4] V-1 iterations',
                '        for &(u, v, w) in edges {  // [5] Check every edge',
                '            if let (Some(&du), Some(dv)) = (dist.get(&u), dist.get(&v)) {',
                '                if du != i32::MAX && du + w < dv {  // [6]',
                '                    dist.insert(v, du + w);  // [7] Update distance',
                '                }',
                '            }',
                '        }',
                '    }',
                '',
                '    // Check for negative cycles',
                '    for &(u, v, w) in edges {  // [8] One more pass',
                '        if let (Some(&du), Some(dv)) = (dist.get(&u), dist.get(&v)) {',
                '            if du != i32::MAX && du + w < dv {  // [9]',
                '                return None;  // [10] Negative cycle detected',
                '            }',
                '        }',
                '    }',
                '    Some(dist)  // [11] Return shortest distances',
                '}',
            ],
        },

        kruskal: {
            pseudo: [
                '# Kruskal\'s MST: greedy edge selection with union-find',
                'procedure kruskal(nodes, edges):',
                '',
                '    edges.sort(by weight)  # [2] Sort edges by weight ascending',
                '    uf = UnionFind(nodes)  # [3] Initialize union-find structure',
                '    mst = []  # [4] Empty MST edge list',
                '',
                '    for each edge (u, v, w) in edges:  # [5] Process edges in order',
                '        if uf.find(u) != uf.find(v):  # [6] If adding edge won\'t create cycle',
                '            mst.append((u, v, w))  # [7] Add edge to MST',
                '            uf.union(u, v)  # [8] Merge the two components',
                '',
                '    return mst  # [9] Return MST edges',
            ],
            python: [
                '# Kruskal\'s MST: greedy edge selection with union-find',
                'def kruskal(nodes: list[int], edges: list[tuple]) -> list[tuple]:',
                '',
                '    edges = sorted(edges, key=lambda e: e[2])  # [2] Sort by weight',
                '    uf = UnionFind(nodes)  # [3] Initialize union-find',
                '    mst: list[tuple] = []  # [4] Empty MST',
                '',
                '    for u, v, w in edges:  # [5] Process edges in order',
                '        if uf.find(u) != uf.find(v):  # [6] No cycle?',
                '            mst.append((u, v, w))  # [7] Add to MST',
                '            uf.union(u, v)  # [8] Merge components',
                '',
                '    return mst  # [9] Return MST edges',
            ],
            java: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'List<int[]> kruskal(List<Integer> nodes, List<int[]> edges) {',
                '',
                '    edges.sort(Comparator.comparingInt(e -> e[2]));  // [2] Sort by weight',
                '    UnionFind uf = new UnionFind(nodes);  // [3] Initialize union-find',
                '    List<int[]> mst = new ArrayList<>();  // [4] Empty MST',
                '',
                '    for (int[] edge : edges) {  // [5] Process edges in order',
                '        int u = edge[0], v = edge[1], w = edge[2];',
                '        if (uf.find(u) != uf.find(v)) {  // [6] No cycle?',
                '            mst.add(edge);  // [7] Add to MST',
                '            uf.union(u, v);  // [8] Merge components',
                '        }',
                '    }',
                '    return mst;  // [9] Return MST edges',
                '}',
            ],
            cpp: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'vector<tuple<int,int,int>> kruskal(vector<int>& nodes, vector<tuple<int,int,int>>& edges) {',
                '',
                '    sort(edges.begin(), edges.end(), [](auto& a, auto& b) {',
                '        return get<2>(a) < get<2>(b);  // [2] Sort by weight',
                '    });',
                '    UnionFind uf(nodes);  // [3] Initialize union-find',
                '    vector<tuple<int,int,int>> mst;  // [4] Empty MST',
                '',
                '    for (auto& [u, v, w] : edges) {  // [5] Process edges in order',
                '        if (uf.find(u) != uf.find(v)) {  // [6] No cycle?',
                '            mst.push_back({u, v, w});  // [7] Add to MST',
                '            uf.union(u, v);  // [8] Merge components',
                '        }',
                '    }',
                '    return mst;  // [9] Return MST edges',
                '}',
            ],
            c: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'int kruskal(int edges[][3], int edgeCount, int* nodes, int n, int mst[][3]) {',
                '',
                '    qsort(edges, edgeCount, sizeof(edges[0]), compareEdges);  // [2] Sort',
                '    UnionFind uf = createUnionFind(nodes, n);  // [3] Initialize',
                '    int mstCount = 0;  // [4] Empty MST',
                '',
                '    for (int i = 0; i < edgeCount; i++) {  // [5] Process edges',
                '        int u = edges[i][0], v = edges[i][1], w = edges[i][2];',
                '        if (find(&uf, u) != find(&uf, v)) {  // [6] No cycle?',
                '            mst[mstCount][0] = u; mst[mstCount][1] = v; mst[mstCount][2] = w;',
                '            mstCount++;  // [7] Add to MST',
                '            unionSets(&uf, u, v);  // [8] Merge components',
                '        }',
                '    }',
                '    return mstCount;  // [9] Return MST edge count',
                '}',
            ],
            csharp: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'List<(int, int, int)> Kruskal(List<int> nodes, List<(int, int, int)> edges) {',
                '',
                '    edges = edges.OrderBy(e => e.Item3).ToList();  // [2] Sort by weight',
                '    var uf = new UnionFind(nodes);  // [3] Initialize union-find',
                '    var mst = new List<(int, int, int)>();  // [4] Empty MST',
                '',
                '    foreach (var (u, v, w) in edges) {  // [5] Process edges in order',
                '        if (uf.Find(u) != uf.Find(v)) {  // [6] No cycle?',
                '            mst.Add((u, v, w));  // [7] Add to MST',
                '            uf.Union(u, v);  // [8] Merge components',
                '        }',
                '    }',
                '    return mst;  // [9] Return MST edges',
                '}',
            ],
            javascript: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'function kruskal(nodes, edges) {',
                '',
                '    edges.sort((a, b) => a[2] - b[2]);  // [2] Sort by weight',
                '    const uf = new UnionFind(nodes);  // [3] Initialize union-find',
                '    const mst = [];  // [4] Empty MST',
                '',
                '    for (const [u, v, w] of edges) {  // [5] Process edges in order',
                '        if (uf.find(u) !== uf.find(v)) {  // [6] No cycle?',
                '            mst.push([u, v, w]);  // [7] Add to MST',
                '            uf.union(u, v);  // [8] Merge components',
                '        }',
                '    }',
                '    return mst;  // [9] Return MST edges',
                '}',
            ],
            typescript: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'function kruskal(nodes: number[], edges: Array<[number, number, number]>): Array<[number, number, number]> {',
                '',
                '    edges.sort((a, b) => a[2] - b[2]);  // [2] Sort by weight',
                '    const uf = new UnionFind(nodes);  // [3] Initialize union-find',
                '    const mst: Array<[number, number, number]> = [];  // [4] Empty MST',
                '',
                '    for (const [u, v, w] of edges) {  // [5] Process edges in order',
                '        if (uf.find(u) !== uf.find(v)) {  // [6] No cycle?',
                '            mst.push([u, v, w]);  // [7] Add to MST',
                '            uf.union(u, v);  // [8] Merge components',
                '        }',
                '    }',
                '    return mst;  // [9] Return MST edges',
                '}',
            ],
            go: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'func kruskal(nodes []int, edges [][3]int) [][3]int {',
                '',
                '    sort.Slice(edges, func(i, j int) bool {',
                '        return edges[i][2] < edges[j][2]  // [2] Sort by weight',
                '    })',
                '    uf := NewUnionFind(nodes)  // [3] Initialize union-find',
                '    mst := [][3]int{}  // [4] Empty MST',
                '',
                '    for _, edge := range edges {  // [5] Process edges in order',
                '        u, v, w := edge[0], edge[1], edge[2]',
                '        if uf.Find(u) != uf.Find(v) {  // [6] No cycle?',
                '            mst = append(mst, [3]int{u, v, w})  // [7] Add to MST',
                '            uf.Union(u, v)  // [8] Merge components',
                '        }',
                '    }',
                '    return mst  // [9] Return MST edges',
                '}',
            ],
            rust: [
                '// Kruskal\'s MST: greedy edge selection with union-find',
                'fn kruskal(nodes: &[i32], mut edges: Vec<(i32, i32, i32)>) -> Vec<(i32, i32, i32)> {',
                '',
                '    edges.sort_by_key(|e| e.2);  // [2] Sort by weight',
                '    let mut uf = UnionFind::new(nodes);  // [3] Initialize union-find',
                '    let mut mst = Vec::new();  // [4] Empty MST',
                '',
                '    for (u, v, w) in edges {  // [5] Process edges in order',
                '        if uf.find(u) != uf.find(v) {  // [6] No cycle?',
                '            mst.push((u, v, w));  // [7] Add to MST',
                '            uf.union(u, v);  // [8] Merge components',
                '        }',
                '    }',
                '    mst  // [9] Return MST edges',
                '}',
            ],
        },

        topologicalSort: {
            pseudo: [
                '# Topological Sort: order nodes so edges go from earlier to later',
                'procedure topologicalSort(adj, nodes):',
                '',
                '    inDegree = map each node to 0  # [2] Count incoming edges',
                '    for each node u in nodes:  # [3] Calculate in-degrees',
                '        for each neighbor v of u:  # [4]',
                '            inDegree[v] += 1  # [5]',
                '',
                '    queue = all nodes with inDegree 0  # [6] Start with no dependencies',
                '    result = []  # [7] Empty result list',
                '',
                '    while queue is not empty:  # [8] Process nodes',
                '        node = queue.dequeue()  # [9] Get next available node',
                '        result.append(node)  # [10] Add to result',
                '        for each neighbor v of node:  # [11] Update dependencies',
                '            inDegree[v] -= 1  # [12]',
                '            if inDegree[v] == 0:  # [13]',
                '                queue.enqueue(v)  # [14]',
                '',
                '    return result  # [15] Return sorted order',
            ],
            python: [
                '# Topological Sort: order nodes so edges go from earlier to later',
                'def topological_sort(adj: dict[int, list], nodes: list[int]) -> list[int]:',
                '',
                '    in_degree: dict[int, int] = {n: 0 for n in nodes}  # [2]',
                '    for u in adj:  # [3] Calculate in-degrees',
                '        for neighbor in adj[u]:  # [4]',
                '            in_degree[neighbor["to"]] += 1  # [5]',
                '',
                '    queue: list[int] = [n for n in nodes if in_degree[n] == 0]  # [6]',
                '    result: list[int] = []  # [7]',
                '',
                '    while queue:  # [8] Process nodes',
                '        node = queue.pop(0)  # [9] Get next available',
                '        result.append(node)  # [10] Add to result',
                '        for neighbor in adj[node]:  # [11] Update dependencies',
                '            in_degree[neighbor["to"]] -= 1  # [12]',
                '            if in_degree[neighbor["to"]] == 0:  # [13]',
                '                queue.append(neighbor["to"])  # [14]',
                '',
                '    return result  # [15]',
            ],
            java: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'List<Integer> topologicalSort(Map<Integer, List<int[]>> adj, List<Integer> nodes) {',
                '',
                '    Map<Integer, Integer> inDegree = new HashMap<>();',
                '    for (int n : nodes) inDegree.put(n, 0);  // [2]',
                '    for (int u : adj.keySet()) {  // [3] Calculate in-degrees',
                '        for (int[] neighbor : adj.get(u)) {  // [4]',
                '            inDegree.merge(neighbor[0], 1, Integer::sum);  // [5]',
                '        }',
                '    }',
                '',
                '    Queue<Integer> queue = new LinkedList<>();',
                '    for (int n : nodes) if (inDegree.get(n) == 0) queue.add(n);  // [6]',
                '    List<Integer> result = new ArrayList<>();  // [7]',
                '',
                '    while (!queue.isEmpty()) {  // [8] Process nodes',
                '        int node = queue.poll();  // [9] Get next available',
                '        result.add(node);  // [10] Add to result',
                '        for (int[] neighbor : adj.get(node)) {  // [11]',
                '            inDegree.merge(neighbor[0], -1, Integer::sum);  // [12]',
                '            if (inDegree.get(neighbor[0]) == 0) {  // [13]',
                '                queue.add(neighbor[0]);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return result;  // [15]',
                '}',
            ],
            cpp: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'vector<int> topologicalSort(unordered_map<int, vector<pair<int,int>>>& adj, vector<int>& nodes) {',
                '',
                '    unordered_map<int, int> inDegree;',
                '    for (int n : nodes) inDegree[n] = 0;  // [2]',
                '    for (auto& [u, neighbors] : adj) {  // [3] Calculate in-degrees',
                '        for (auto& [v, w] : neighbors) {  // [4]',
                '            inDegree[v]++;  // [5]',
                '        }',
                '    }',
                '',
                '    queue<int> q;',
                '    for (int n : nodes) if (inDegree[n] == 0) q.push(n);  // [6]',
                '    vector<int> result;  // [7]',
                '',
                '    while (!q.empty()) {  // [8] Process nodes',
                '        int node = q.front(); q.pop();  // [9] Get next available',
                '        result.push_back(node);  // [10] Add to result',
                '        for (auto& [v, w] : adj[node]) {  // [11]',
                '            if (--inDegree[v] == 0) {  // [12-13]',
                '                q.push(v);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return result;  // [15]',
                '}',
            ],
            c: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'int topologicalSort(int adj[][2], int adjSize[], int n, int* result) {',
                '',
                '    int inDegree[MAX_NODES] = {0};  // [2]',
                '    for (int u = 0; u < n; u++) {  // [3] Calculate in-degrees',
                '        for (int i = 0; i < adjSize[u]; i++) {  // [4]',
                '            inDegree[adj[u][i]]++;  // [5]',
                '        }',
                '    }',
                '',
                '    int queue[MAX_NODES], front = 0, rear = 0;',
                '    for (int i = 0; i < n; i++)  // [6]',
                '        if (inDegree[i] == 0) queue[rear++] = i;',
                '',
                '    int count = 0;  // [7]',
                '    while (front < rear) {  // [8] Process nodes',
                '        int node = queue[front++];  // [9]',
                '        result[count++] = node;  // [10]',
                '        for (int i = 0; i < adjSize[node]; i++) {  // [11]',
                '            if (--inDegree[adj[node][i]] == 0)  // [12-13]',
                '                queue[rear++] = adj[node][i];  // [14]',
                '        }',
                '    }',
                '    return count;  // [15]',
                '}',
            ],
            csharp: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'List<int> TopologicalSort(Dictionary<int, List<int[]>> adj, List<int> nodes) {',
                '',
                '    var inDegree = new Dictionary<int, int>();',
                '    foreach (var n in nodes) inDegree[n] = 0;  // [2]',
                '    foreach (var u in adj.Keys) {  // [3] Calculate in-degrees',
                '        foreach (var neighbor in adj[u]) {  // [4]',
                '            inDegree[neighbor[0]]++;  // [5]',
                '        }',
                '    }',
                '',
                '    var queue = new Queue<int>();',
                '    foreach (var n in nodes) if (inDegree[n] == 0) queue.Enqueue(n);  // [6]',
                '    var result = new List<int>();  // [7]',
                '',
                '    while (queue.Count > 0) {  // [8] Process nodes',
                '        int node = queue.Dequeue();  // [9]',
                '        result.Add(node);  // [10]',
                '        foreach (var neighbor in adj[node]) {  // [11]',
                '            if (--inDegree[neighbor[0]] == 0) {  // [12-13]',
                '                queue.Enqueue(neighbor[0]);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return result;  // [15]',
                '}',
            ],
            javascript: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'function topologicalSort(adj, nodes) {',
                '',
                '    const inDegree = Object.fromEntries(nodes.map(n => [n, 0]));  // [2]',
                '    for (const u of Object.keys(adj)) {  // [3] Calculate in-degrees',
                '        for (const neighbor of adj[u]) {  // [4]',
                '            inDegree[neighbor.to]++;  // [5]',
                '        }',
                '    }',
                '',
                '    const queue = nodes.filter(n => inDegree[n] === 0);  // [6]',
                '    const result = [];  // [7]',
                '',
                '    while (queue.length > 0) {  // [8] Process nodes',
                '        const node = queue.shift();  // [9]',
                '        result.push(node);  // [10]',
                '        for (const neighbor of adj[node]) {  // [11]',
                '            inDegree[neighbor.to]--;  // [12]',
                '            if (inDegree[neighbor.to] === 0) {  // [13]',
                '                queue.push(neighbor.to);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return result;  // [15]',
                '}',
            ],
            typescript: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'function topologicalSort(',
                '    adj: Record<number, Array<{ to: number; weight: number }>>,',
                '    nodes: number[]',
                '): number[] {',
                '',
                '    const inDegree: Record<number, number> = {};',
                '    for (const n of nodes) inDegree[n] = 0;  // [2]',
                '    for (const u of Object.keys(adj)) {  // [3]',
                '        for (const neighbor of adj[Number(u)]) {  // [4]',
                '            inDegree[neighbor.to] = (inDegree[neighbor.to] || 0) + 1;  // [5]',
                '        }',
                '    }',
                '',
                '    const queue: number[] = nodes.filter(n => inDegree[n] === 0);  // [6]',
                '    const result: number[] = [];  // [7]',
                '',
                '    while (queue.length > 0) {  // [8]',
                '        const node = queue.shift()!;  // [9]',
                '        result.push(node);  // [10]',
                '        for (const neighbor of adj[node]) {  // [11]',
                '            inDegree[neighbor.to]--;  // [12]',
                '            if (inDegree[neighbor.to] === 0) {  // [13]',
                '                queue.push(neighbor.to);  // [14]',
                '            }',
                '        }',
                '    }',
                '    return result;  // [15]',
                '}',
            ],
            go: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'func topologicalSort(adj map[int][][2]int, nodes []int) []int {',
                '',
                '    inDegree := make(map[int]int)',
                '    for _, n := range nodes { inDegree[n] = 0 }  // [2]',
                '    for u, neighbors := range adj {  // [3] Calculate in-degrees',
                '        for _, edge := range neighbors {  // [4]',
                '            inDegree[edge[0]]++  // [5]',
                '        }',
                '        _ = u  // suppress unused variable',
                '    }',
                '',
                '    queue := []int{}',
                '    for _, n := range nodes {  // [6]',
                '        if inDegree[n] == 0 { queue = append(queue, n) }',
                '    }',
                '    result := []int{}  // [7]',
                '',
                '    for len(queue) > 0 {  // [8] Process nodes',
                '        node := queue[0]; queue = queue[1:]  // [9]',
                '        result = append(result, node)  // [10]',
                '        for _, edge := range adj[node] {  // [11]',
                '            inDegree[edge[0]]--  // [12]',
                '            if inDegree[edge[0]] == 0 {  // [13]',
                '                queue = append(queue, edge[0])  // [14]',
                '            }',
                '        }',
                '    }',
                '    return result  // [15]',
                '}',
            ],
            rust: [
                '// Topological Sort: order nodes so edges go from earlier to later',
                'fn topological_sort(adj: &HashMap<i32, Vec<(i32, i32)>>, nodes: &[i32]) -> Vec<i32> {',
                '',
                '    let mut in_degree: HashMap<i32, i32> = nodes.iter().map(|&n| (n, 0)).collect();  // [2]',
                '    for (_, neighbors) in adj {  // [3] Calculate in-degrees',
                '        for &(v, _) in neighbors {  // [4]',
                '            *in_degree.entry(v).or_insert(0) += 1;  // [5]',
                '        }',
                '    }',
                '',
                '    let mut queue: VecDeque<i32> = nodes.iter()',
                '        .filter(|&&n| in_degree.get(&n) == Some(&0))',
                '        .cloned().collect();  // [6]',
                '    let mut result = Vec::new();  // [7]',
                '',
                '    while let Some(node) = queue.pop_front() {  // [8-9]',
                '        result.push(node);  // [10]',
                '        if let Some(neighbors) = adj.get(&node) {  // [11]',
                '            for &(v, _) in neighbors {',
                '                *in_degree.get_mut(&v).unwrap() -= 1;  // [12]',
                '                if in_degree[&v] == 0 {  // [13]',
                '                    queue.push_back(v);  // [14]',
                '                }',
                '            }',
                '        }',
                '    }',
                '    result  // [15]',
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
            realWorld:
                'Powers the "six degrees of separation" analysis in social networks, web crawler frontiers ' +
                '(discover all links at the current depth before going deeper), GPS navigation for shortest ' +
                'routes in unweighted road networks, and multiplayer game matchmaking. Used in peer-to-peer ' +
                'networks for finding nearby nodes, in garbage collection algorithms for marking reachable ' +
                'objects, and in solving puzzles like the shortest number of moves in Rubik\'s cube.',
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
            realWorld:
                'Used in maze generation and solving, topological sorting (build dependency order), ' +
                'cycle detection in deadlocks and compilation units, and finding connected components. ' +
                'Powers the "solve" function in Sudoku solvers, the backtracking in constraint satisfaction ' +
                'problems, the Git object traversal, and the file system search (find command). ' +
                'Also used in compiler parsing (abstract syntax tree construction).',
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
            realWorld:
                'The backbone of GPS navigation systems (Google Maps, Apple Maps, Waze). Used in network ' +
                'routing protocols (OSPF, IS-IS) for finding the shortest path between routers, in logistics ' +
                'and delivery optimization (traveling salesman approximations), in robotics for path planning, ' +
                'and in gaming AI for NPC navigation. Also powers the "shortest path" feature in flight ' +
                'booking systems and public transit planners.',
        },
        astar: {
            name: 'A* Pathfinding',
            best: 'O(E)',
            average: 'O(E log V)',
            worst: 'O((V + E) log V)',
            space: 'O(V)',
            description:
                'Informed search algorithm that finds the shortest path using a heuristic function. ' +
                'Combines the actual cost from the start (g) with an estimated cost to the goal (h) ' +
                'to make better decisions about which nodes to explore. With an admissible heuristic, ' +
                'it is guaranteed to find the optimal path.',
            useCase:
                'The go-to algorithm for pathfinding in games, robotics, and GPS navigation. ' +
                'Much faster than Dijkstra when you have a good heuristic because it focuses ' +
                'the search toward the goal rather than exploring in all directions.',
            avoid:
                'Requires a good heuristic function - poor heuristics can make it slower than Dijkstra. ' +
                'Does not work with negative edge weights. For finding paths to all nodes, ' +
                'Dijkstra may be more appropriate since A* targets a specific goal.',
            realWorld:
                'Used in video game pathfinding (every game with NPCs navigating a map: Age of Empires, ' +
                'Starcraft, Minecraft mobs), in robotics for real-time path planning with obstacle avoidance, ' +
                'in GPS systems with traffic-aware routing, and in logistics for delivery route optimization. ' +
                'Powers the pathfinding in Google Maps when real-time traffic data is available as the heuristic.',
        },
        bellmanFord: {
            name: 'Bellman-Ford',
            best: 'O(V * E)',
            average: 'O(V * E)',
            worst: 'O(V * E)',
            space: 'O(V)',
            description:
                'Finds shortest paths from a source to all nodes, even with negative edge weights. ' +
                'Relaxes all edges V-1 times, then checks for negative cycles. Slower than Dijkstra ' +
                'but handles negative weights which Dijkstra cannot.',
            useCase:
                'Use when the graph may contain negative edge weights, such as in currency arbitrage ' +
                'detection, financial modeling, or when edge weights represent costs that can decrease. ' +
                'Also useful for detecting negative cycles in a graph.',
            avoid:
                'Much slower than Dijkstra (O(V*E) vs O((V+E)log V)) for graphs with only positive weights. ' +
                'Use Dijkstra when you know all edge weights are non-negative for better performance.',
            realWorld:
                'Used in networking protocols like RIP (Routing Information Protocol) for distance-vector routing. ' +
                'Essential in financial systems for detecting arbitrage opportunities in currency exchange ' +
                '(negative cycles represent risk-free profit). Used in distributed systems where each node only ' +
                'knows its neighbors, and in applications where negative edge weights exist (unlike Dijkstra).',
        },
        kruskal: {
            name: "Kruskal's MST",
            best: 'O(E log E)',
            average: 'O(E log E)',
            worst: 'O(E log E)',
            space: 'O(V)',
            description:
                'Finds a minimum spanning tree by greedily selecting the cheapest edge that connects ' +
                'two different components. Uses union-find to efficiently detect cycles. Sorts all edges ' +
                'once, then processes them in order.',
            useCase:
                'Use when you need to connect all nodes with minimum total edge weight, such as in ' +
                'network design, clustering, or approximating the traveling salesman problem. ' +
                'Works well for sparse graphs (few edges relative to nodes).',
            avoid:
                'For dense graphs, Prim\'s algorithm may be faster. Not suitable for directed graphs ' +
                'or when you need the shortest path (use Dijkstra instead). Does not work for ' +
                'disconnected graphs (produces minimum spanning forest instead).',
            realWorld:
                'Used in network design: laying fiber-optic cables between cities at minimum cost, designing ' +
                'water pipeline networks, and planning electrical grid connections. Powers cluster analysis ' +
                'in data science (single-linkage clustering), image segmentation in computer vision, and the ' +
                'minimum spanning forest computation for disconnected components in social network analysis.',
        },
        topologicalSort: {
            name: 'Topological Sort',
            best: 'O(V + E)',
            average: 'O(V + E)',
            worst: 'O(V + E)',
            space: 'O(V)',
            description:
                'Orders nodes in a directed acyclic graph (DAG) such that every edge goes from an ' +
                'earlier node to a later node. Uses Kahn\'s algorithm with in-degree counting and a queue. ' +
                'If the result has fewer nodes than the input, a cycle exists.',
            useCase:
                'Use for task scheduling (tasks with dependencies), course prerequisites, build systems, ' +
                'or any scenario where some items must come before others. Essential for dependency resolution.',
            avoid:
                'Only works on directed acyclic graphs (DAGs). If the graph has cycles, no valid ' +
                'topological order exists. For cyclic graphs, consider finding strongly connected ' +
                'components first.',
            realWorld:
                'Used in build systems (Make, Maven, npm) to determine compilation/installation order, ' +
                'in package managers to resolve dependencies, in spreadsheet cell evaluation order, ' +
                'and in course scheduling (prerequisite chains). Powers the `tsort` Unix utility, Docker ' +
                'layer ordering, and the compilation order in large codebases with thousands of ' +
                'interdependent modules.',
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

    /**
     * A* Pathfinding generator.
     * Uses a heuristic to guide the search toward the goal.
     *
     * @param {object} adj - Adjacency list mapping node to array of { to, weight }.
     * @param {number} startNode - The source node.
     * @param {number} goalNode - The target node to reach.
     * @param {number[]} nodes - All nodes in the graph.
     * @param {object} positions - Map of nodeId to { x, y } for heuristic calculation.
     * @yields {object} Step object with type, nodeId, optional from/to, and codeLine.
     */
    function* astar(adj, startNode, goalNode, nodes, positions) {
        function heuristic(a, b) {
            if (!positions[a] || !positions[b]) return 0;
            const dx = positions[a].x - positions[b].x;
            const dy = positions[a].y - positions[b].y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        const gScore = {};
        const fScore = {};
        for (const n of nodes) {
            gScore[n] = Infinity;
            fScore[n] = Infinity;
        }
        gScore[startNode] = 0;
        fScore[startNode] = heuristic(startNode, goalNode);

        const openSet = [{ f: fScore[startNode], node: startNode }];
        const visited = new Set();

        yield { type: 'visit', nodeId: startNode, codeLine: 5 };

        while (openSet.length > 0) {
            openSet.sort((a, b) => a.f - b.f);
            const { node } = openSet.shift();

            yield { type: 'visit', nodeId: node, codeLine: 8 };

            if (visited.has(node)) {
                continue;
            }

            visited.add(node);
            yield { type: 'visited', nodeId: node, codeLine: 10 };

            if (node === goalNode) {
                yield { type: 'found', nodeId: node, codeLine: 9 };
                return;
            }

            for (const neighbor of adj[node]) {
                const tentativeG = gScore[node] + neighbor.weight;

                yield { type: 'relax', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 12 };

                if (tentativeG < gScore[neighbor.to]) {
                    gScore[neighbor.to] = tentativeG;
                    const f = tentativeG + heuristic(neighbor.to, goalNode);
                    fScore[neighbor.to] = f;
                    openSet.push({ f, node: neighbor.to });

                    yield { type: 'update', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 16 };
                }
            }
        }

        yield { type: 'notFound', nodeId: goalNode, codeLine: 18 };
    }

    /**
     * Bellman-Ford Shortest Path generator.
     * Handles negative edge weights and detects negative cycles.
     *
     * @param {Array<[number, number, number]>} edges - Array of [from, to, weight] edges.
     * @param {number} startNode - The source node.
     * @param {number[]} nodes - All nodes in the graph.
     * @yields {object} Step object with type, nodeId, optional from/to, and codeLine.
     */
    function* bellmanFord(edges, startNode, nodes) {
        const dist = {};
        for (const n of nodes) dist[n] = Infinity;
        dist[startNode] = 0;

        yield { type: 'visit', nodeId: startNode, codeLine: 3 };

        // Relax all edges V-1 times
        for (let i = 0; i < nodes.length - 1; i++) {
            for (const [u, v, w] of edges) {
                yield { type: 'relax', nodeId: v, from: u, to: v, codeLine: 5 };

                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    yield { type: 'update', nodeId: v, from: u, to: v, codeLine: 7 };
                }
            }
            yield { type: 'visit', nodeId: -1, codeLine: 4 };
        }

        // Check for negative cycles
        for (const [u, v, w] of edges) {
            yield { type: 'relax', nodeId: v, from: u, to: v, codeLine: 8 };

            if (dist[u] + w < dist[v]) {
                yield { type: 'notFound', nodeId: v, codeLine: 10 };
                return;
            }
        }

        yield { type: 'found', nodeId: startNode, codeLine: 11 };
    }

    /**
     * Kruskal's Minimum Spanning Tree generator.
     * Uses union-find to detect cycles efficiently.
     *
     * @param {Array<[number, number, number]>} edges - Array of [from, to, weight] edges.
     * @param {number[]} nodes - All nodes in the graph.
     * @yields {object} Step object with type, nodeId, optional from/to, and codeLine.
     */
    function* kruskal(edges, nodes) {
        // Simple union-find implementation
        const parent = {};
        const rank = {};

        for (const n of nodes) {
            parent[n] = n;
            rank[n] = 0;
        }

        function find(x) {
            if (parent[x] !== x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }

        function union(x, y) {
            const px = find(x);
            const py = find(y);
            if (px === py) return false;
            if (rank[px] < rank[py]) {
                parent[px] = py;
            } else if (rank[px] > rank[py]) {
                parent[py] = px;
            } else {
                parent[py] = px;
                rank[px]++;
            }
            return true;
        }

        // Sort edges by weight
        const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
        yield { type: 'visit', nodeId: -1, codeLine: 2 };

        const mstEdges = [];

        for (const [u, v, w] of sortedEdges) {
            yield { type: 'relax', nodeId: v, from: u, to: v, codeLine: 5 };

            if (find(u) !== find(v)) {
                yield { type: 'visit', nodeId: u, codeLine: 6 };
                yield { type: 'visit', nodeId: v, codeLine: 6 };

                union(u, v);
                mstEdges.push([u, v, w]);

                yield { type: 'update', nodeId: v, from: u, to: v, codeLine: 7 };
            }
        }

        yield { type: 'found', nodeId: mstEdges.length > 0 ? mstEdges[0][0] : -1, codeLine: 9 };
    }

    /**
     * Topological Sort generator using Kahn's algorithm.
     * Orders nodes so edges go from earlier to later nodes.
     *
     * @param {object} adj - Adjacency list mapping node to array of { to, weight }.
     * @param {number[]} nodes - All nodes in the graph.
     * @yields {object} Step object with type, nodeId, optional from/to, and codeLine.
     */
    function* topologicalSort(adj, nodes) {
        const inDegree = {};
        for (const n of nodes) inDegree[n] = 0;

        // Calculate in-degrees
        for (const u of Object.keys(adj)) {
            for (const neighbor of adj[u]) {
                inDegree[neighbor.to] = (inDegree[neighbor.to] || 0) + 1;
            }
        }
        yield { type: 'visit', nodeId: -1, codeLine: 2 };

        // Find all nodes with no incoming edges
        const queue = nodes.filter(n => inDegree[n] === 0);
        yield { type: 'visit', nodeId: -1, codeLine: 6 };

        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            yield { type: 'visit', nodeId: node, codeLine: 9 };

            result.push(node);
            yield { type: 'visited', nodeId: node, codeLine: 10 };

            for (const neighbor of adj[node]) {
                inDegree[neighbor.to]--;
                yield { type: 'relax', nodeId: neighbor.to, from: node, to: neighbor.to, codeLine: 12 };

                if (inDegree[neighbor.to] === 0) {
                    queue.push(neighbor.to);
                    yield { type: 'enqueue', nodeId: neighbor.to, codeLine: 14 };
                }
            }
        }

        if (result.length === nodes.length) {
            yield { type: 'found', nodeId: result[result.length - 1], codeLine: 15 };
        } else {
            yield { type: 'notFound', nodeId: -1, codeLine: 15 };
        }
    }

    return { CODE, COMPLEXITY, buildAdjList, buildSampleGraph, bfs, dfs, dijkstra, astar, bellmanFord, kruskal, topologicalSort };
})();

export default GraphAlgorithms;
