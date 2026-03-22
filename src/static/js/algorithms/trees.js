/**
 * Binary Search Tree algorithm generators.
 *
 * Each algorithm is a generator function that yields step objects:
 * { type: 'visit'|'compare'|'insert'|'found'|'notFound', nodeId: number, codeLine: number }
 */

const TreeAlgorithms = (() => {

    // ─── BST Node Helper ───

    let nodeIdCounter = 0;

    function createNode(value) {
        return { value, left: null, right: null, id: nodeIdCounter++ };
    }

    function resetIds() {
        nodeIdCounter = 0;
    }

    /**
     * Non-generator insert used for building trees without yielding steps.
     *
     * @param {object|null} root - Current root node.
     * @param {number} value - Value to insert.
     * @returns {object} The root of the tree after insertion.
     */
    function insertNode(root, value) {
        if (root === null) {
            return createNode(value);
        }
        if (value < root.value) {
            root.left = insertNode(root.left, value);
        } else if (value > root.value) {
            root.right = insertNode(root.right, value);
        }
        return root;
    }

    /**
     * Build a sample BST from an array of values.
     *
     * @param {number[]} values - Values to insert in order.
     * @returns {object|null} The root of the constructed BST.
     */
    function buildSampleBST(values) {
        resetIds();
        let root = null;
        for (const v of values) {
            root = insertNode(root, v);
        }
        return root;
    }

    // ─── Code Snippets ───

    const CODE = {
        bstInsert: {
            pseudo: [
                '# Step 1: Insert a value into a Binary Search Tree',
                'procedure bstInsert(root, value):',
                '',
                '    if root is null:  # [2] If the tree is empty here, we found the spot',
                '        return new Node(value)  # [3] Create a new node with the value',
                '',
                '    if value < root.value:  # [4] If the value is smaller, go left',
                '        root.left = bstInsert(root.left, value)  # [5] Insert into the left subtree',
                '    else if value > root.value:  # [6] If the value is larger, go right',
                '        root.right = bstInsert(root.right, value)  # [7] Insert into the right subtree',
                '',
                '    return root  # [8] Return the unchanged root node',
            ],
            python: [
                '# Step 1: Insert a value into a Binary Search Tree',
                'def bst_insert(root: Optional[Node], value: int) -> Node:',
                '',
                '    if root is None:  # [2] If the tree is empty here, we found the spot',
                '        return Node(value)  # [3] Create a new node with the value',
                '',
                '    if value < root.value:  # [4] If the value is smaller, go left',
                '        root.left = bst_insert(root.left, value)  # [5] Insert into the left subtree',
                '    elif value > root.value:  # [6] If the value is larger, go right',
                '        root.right = bst_insert(root.right, value)  # [7] Insert into the right subtree',
                '',
                '    return root  # [8] Return the unchanged root node',
            ],
            c: [
                '// Step 1: Insert a value into a Binary Search Tree',
                'struct Node* bstInsert(struct Node* root, int value) {',
                '',
                '    if (root == NULL) { // [2] If the tree is empty here, we found the spot',
                '        return createNode(value); // [3] Create a new node with the value',
                '    }',
                '',
                '    if (value < root->value) { // [4] If the value is smaller, go left',
                '        root->left = bstInsert(root->left, value); // [5] Insert into the left subtree',
                '    } else if (value > root->value) { // [6] If the value is larger, go right',
                '        root->right = bstInsert(root->right, value); // [7] Insert into the right subtree',
                '    }',
                '',
                '    return root; // [8] Return the unchanged root node',
                '}',
            ],
            csharp: [
                '// Step 1: Insert a value into a Binary Search Tree',
                'Node BstInsert(Node root, int value) {',
                '',
                '    if (root == null) { // [2] If the tree is empty here, we found the spot',
                '        return new Node(value); // [3] Create a new node with the value',
                '    }',
                '',
                '    if (value < root.Value) { // [4] If the value is smaller, go left',
                '        root.Left = BstInsert(root.Left, value); // [5] Insert into the left subtree',
                '    } else if (value > root.Value) { // [6] If the value is larger, go right',
                '        root.Right = BstInsert(root.Right, value); // [7] Insert into the right subtree',
                '    }',
                '',
                '    return root; // [8] Return the unchanged root node',
                '}',
            ],
            typescript: [
                '// Step 1: Insert a value into a Binary Search Tree',
                'function bstInsert(root: Node | null, value: number): Node {',
                '',
                '    if (root === null) { // [2] If the tree is empty here, we found the spot',
                '        return new Node(value); // [3] Create a new node with the value',
                '    }',
                '',
                '    if (value < root.value) { // [4] If the value is smaller, go left',
                '        root.left = bstInsert(root.left, value); // [5] Insert into the left subtree',
                '    } else if (value > root.value) { // [6] If the value is larger, go right',
                '        root.right = bstInsert(root.right, value); // [7] Insert into the right subtree',
                '    }',
                '',
                '    return root; // [8] Return the unchanged root node',
                '}',
            ],
            go: [
                '// Step 1: Insert a value into a Binary Search Tree',
                'func bstInsert(root *Node, value int) *Node {',
                '',
                '    if root == nil { // [2] If the tree is empty here, we found the spot',
                '        return &Node{Value: value} // [3] Create a new node with the value',
                '    }',
                '',
                '    if value < root.Value { // [4] If the value is smaller, go left',
                '        root.Left = bstInsert(root.Left, value) // [5] Insert into the left subtree',
                '    } else if value > root.Value { // [6] If the value is larger, go right',
                '        root.Right = bstInsert(root.Right, value) // [7] Insert into the right subtree',
                '    }',
                '',
                '    return root // [8] Return the unchanged root node',
                '}',
            ],
            rust: [
                '// Step 1: Insert a value into a Binary Search Tree',
                'fn bst_insert(root: Option<Box<Node>>, value: i32) -> Option<Box<Node>> {',
                '    match root {',
                '        None => Some(Box::new(Node::new(value))), // [2] If the tree is empty here, we found the spot',
                '                                                   // [3] Create a new node with the value',
                '        Some(mut node) => {',
                '            if value < node.value { // [4] If the value is smaller, go left',
                '                node.left = bst_insert(node.left, value); // [5] Insert into the left subtree',
                '            } else if value > node.value { // [6] If the value is larger, go right',
                '                node.right = bst_insert(node.right, value); // [7] Insert into the right subtree',
                '            }',
                '            Some(node) // [8] Return the unchanged root node',
                '        }',
                '    }',
                '}',
            ],
        },

        bstSearch: {
            pseudo: [
                '# Step 1: Search for a value in a Binary Search Tree',
                'procedure bstSearch(root, value):',
                '',
                '    if root is null:  # [2] If we reached an empty spot, the value is not here',
                '        return not found  # [3] The value does not exist in the tree',
                '',
                '    if value == root.value:  # [4] If this node holds the value we want',
                '        return root  # [5] We found it, return this node',
                '',
                '    if value < root.value:  # [6] If the value is smaller, it must be on the left',
                '        return bstSearch(root.left, value)  # [7] Search the left subtree',
                '    else:  # [8] If the value is larger, it must be on the right',
                '        return bstSearch(root.right, value)  # [9] Search the right subtree',
            ],
            python: [
                '# Step 1: Search for a value in a Binary Search Tree',
                'def bst_search(root: Optional[Node], value: int) -> Optional[Node]:',
                '',
                '    if root is None:  # [2] If we reached an empty spot, the value is not here',
                '        return None  # [3] The value does not exist in the tree',
                '',
                '    if value == root.value:  # [4] If this node holds the value we want',
                '        return root  # [5] We found it, return this node',
                '',
                '    if value < root.value:  # [6] If the value is smaller, it must be on the left',
                '        return bst_search(root.left, value)  # [7] Search the left subtree',
                '    else:  # [8] If the value is larger, it must be on the right',
                '        return bst_search(root.right, value)  # [9] Search the right subtree',
            ],
            c: [
                '// Step 1: Search for a value in a Binary Search Tree',
                'struct Node* bstSearch(struct Node* root, int value) {',
                '',
                '    if (root == NULL) { // [2] If we reached an empty spot, the value is not here',
                '        return NULL; // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if (value == root->value) { // [4] If this node holds the value we want',
                '        return root; // [5] We found it, return this node',
                '    }',
                '',
                '    if (value < root->value) { // [6] If the value is smaller, it must be on the left',
                '        return bstSearch(root->left, value); // [7] Search the left subtree',
                '    } else { // [8] If the value is larger, it must be on the right',
                '        return bstSearch(root->right, value); // [9] Search the right subtree',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Search for a value in a Binary Search Tree',
                'Node? BstSearch(Node? root, int value) {',
                '',
                '    if (root == null) { // [2] If we reached an empty spot, the value is not here',
                '        return null; // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if (value == root.Value) { // [4] If this node holds the value we want',
                '        return root; // [5] We found it, return this node',
                '    }',
                '',
                '    if (value < root.Value) { // [6] If the value is smaller, it must be on the left',
                '        return BstSearch(root.Left, value); // [7] Search the left subtree',
                '    } else { // [8] If the value is larger, it must be on the right',
                '        return BstSearch(root.Right, value); // [9] Search the right subtree',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Search for a value in a Binary Search Tree',
                'function bstSearch(root: Node | null, value: number): Node | null {',
                '',
                '    if (root === null) { // [2] If we reached an empty spot, the value is not here',
                '        return null; // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if (value === root.value) { // [4] If this node holds the value we want',
                '        return root; // [5] We found it, return this node',
                '    }',
                '',
                '    if (value < root.value) { // [6] If the value is smaller, it must be on the left',
                '        return bstSearch(root.left, value); // [7] Search the left subtree',
                '    } else { // [8] If the value is larger, it must be on the right',
                '        return bstSearch(root.right, value); // [9] Search the right subtree',
                '    }',
                '}',
            ],
            go: [
                '// Step 1: Search for a value in a Binary Search Tree',
                'func bstSearch(root *Node, value int) *Node {',
                '',
                '    if root == nil { // [2] If we reached an empty spot, the value is not here',
                '        return nil // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if value == root.Value { // [4] If this node holds the value we want',
                '        return root // [5] We found it, return this node',
                '    }',
                '',
                '    if value < root.Value { // [6] If the value is smaller, it must be on the left',
                '        return bstSearch(root.Left, value) // [7] Search the left subtree',
                '    } else { // [8] If the value is larger, it must be on the right',
                '        return bstSearch(root.Right, value) // [9] Search the right subtree',
                '    }',
                '}',
            ],
            rust: [
                '// Step 1: Search for a value in a Binary Search Tree',
                'fn bst_search(root: &Option<Box<Node>>, value: i32) -> Option<&Node> {',
                '    match root {',
                '        None => None, // [2] If we reached an empty spot, the value is not here',
                '                      // [3] The value does not exist in the tree',
                '        Some(node) => {',
                '            if value == node.value { // [4] If this node holds the value we want',
                '                Some(node) // [5] We found it, return this node',
                '            } else if value < node.value { // [6] If the value is smaller, it must be on the left',
                '                bst_search(&node.left, value) // [7] Search the left subtree',
                '            } else { // [8] If the value is larger, it must be on the right',
                '                bst_search(&node.right, value) // [9] Search the right subtree',
                '            }',
                '        }',
                '    }',
                '}',
            ],
        },

        bstInorder: {
            pseudo: [
                '# Step 1: Visit every node in left-root-right order',
                'procedure bstInorder(root):',
                '',
                '    if root is null:  # [2] If there is no node here, stop',
                '        return  # [3] Nothing to visit',
                '',
                '    bstInorder(root.left)  # [4] First visit the entire left subtree',
                '    visit(root)  # [5] Then visit this node',
                '    bstInorder(root.right)  # [6] Finally visit the entire right subtree',
            ],
            python: [
                '# Step 1: Visit every node in left-root-right order',
                'def bst_inorder(root: Optional[Node]) -> None:',
                '',
                '    if root is None:  # [2] If there is no node here, stop',
                '        return  # [3] Nothing to visit',
                '',
                '    bst_inorder(root.left)  # [4] First visit the entire left subtree',
                '    visit(root)  # [5] Then visit this node',
                '    bst_inorder(root.right)  # [6] Finally visit the entire right subtree',
            ],
            c: [
                '// Step 1: Visit every node in left-root-right order',
                'void bstInorder(struct Node* root) {',
                '',
                '    if (root == NULL) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    bstInorder(root->left); // [4] First visit the entire left subtree',
                '    visit(root); // [5] Then visit this node',
                '    bstInorder(root->right); // [6] Finally visit the entire right subtree',
                '}',
            ],
            csharp: [
                '// Step 1: Visit every node in left-root-right order',
                'void BstInorder(Node? root) {',
                '',
                '    if (root == null) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    BstInorder(root.Left); // [4] First visit the entire left subtree',
                '    Visit(root); // [5] Then visit this node',
                '    BstInorder(root.Right); // [6] Finally visit the entire right subtree',
                '}',
            ],
            typescript: [
                '// Step 1: Visit every node in left-root-right order',
                'function bstInorder(root: Node | null): void {',
                '',
                '    if (root === null) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    bstInorder(root.left); // [4] First visit the entire left subtree',
                '    visit(root); // [5] Then visit this node',
                '    bstInorder(root.right); // [6] Finally visit the entire right subtree',
                '}',
            ],
            go: [
                '// Step 1: Visit every node in left-root-right order',
                'func bstInorder(root *Node) {',
                '',
                '    if root == nil { // [2] If there is no node here, stop',
                '        return // [3] Nothing to visit',
                '    }',
                '',
                '    bstInorder(root.Left) // [4] First visit the entire left subtree',
                '    visit(root) // [5] Then visit this node',
                '    bstInorder(root.Right) // [6] Finally visit the entire right subtree',
                '}',
            ],
            rust: [
                '// Step 1: Visit every node in left-root-right order',
                'fn bst_inorder(root: &Option<Box<Node>>) {',
                '    match root {',
                '        None => return, // [2] If there is no node here, stop',
                '                        // [3] Nothing to visit',
                '        Some(node) => {',
                '            bst_inorder(&node.left); // [4] First visit the entire left subtree',
                '            visit(node); // [5] Then visit this node',
                '            bst_inorder(&node.right); // [6] Finally visit the entire right subtree',
                '        }',
                '    }',
                '}',
            ],
        },

        bstPreorder: {
            pseudo: [
                '# Step 1: Visit every node in root-left-right order',
                'procedure bstPreorder(root):',
                '',
                '    if root is null:  # [2] If there is no node here, stop',
                '        return  # [3] Nothing to visit',
                '',
                '    visit(root)  # [4] Visit this node first',
                '    bstPreorder(root.left)  # [5] Then visit the entire left subtree',
                '    bstPreorder(root.right)  # [6] Finally visit the entire right subtree',
            ],
            python: [
                '# Step 1: Visit every node in root-left-right order',
                'def bst_preorder(root: Optional[Node]) -> None:',
                '',
                '    if root is None:  # [2] If there is no node here, stop',
                '        return  # [3] Nothing to visit',
                '',
                '    visit(root)  # [4] Visit this node first',
                '    bst_preorder(root.left)  # [5] Then visit the entire left subtree',
                '    bst_preorder(root.right)  # [6] Finally visit the entire right subtree',
            ],
            c: [
                '// Step 1: Visit every node in root-left-right order',
                'void bstPreorder(struct Node* root) {',
                '',
                '    if (root == NULL) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    visit(root); // [4] Visit this node first',
                '    bstPreorder(root->left); // [5] Then visit the entire left subtree',
                '    bstPreorder(root->right); // [6] Finally visit the entire right subtree',
                '}',
            ],
            csharp: [
                '// Step 1: Visit every node in root-left-right order',
                'void BstPreorder(Node? root) {',
                '',
                '    if (root == null) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    Visit(root); // [4] Visit this node first',
                '    BstPreorder(root.Left); // [5] Then visit the entire left subtree',
                '    BstPreorder(root.Right); // [6] Finally visit the entire right subtree',
                '}',
            ],
            typescript: [
                '// Step 1: Visit every node in root-left-right order',
                'function bstPreorder(root: Node | null): void {',
                '',
                '    if (root === null) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    visit(root); // [4] Visit this node first',
                '    bstPreorder(root.left); // [5] Then visit the entire left subtree',
                '    bstPreorder(root.right); // [6] Finally visit the entire right subtree',
                '}',
            ],
            go: [
                '// Step 1: Visit every node in root-left-right order',
                'func bstPreorder(root *Node) {',
                '',
                '    if root == nil { // [2] If there is no node here, stop',
                '        return // [3] Nothing to visit',
                '    }',
                '',
                '    visit(root) // [4] Visit this node first',
                '    bstPreorder(root.Left) // [5] Then visit the entire left subtree',
                '    bstPreorder(root.Right) // [6] Finally visit the entire right subtree',
                '}',
            ],
            rust: [
                '// Step 1: Visit every node in root-left-right order',
                'fn bst_preorder(root: &Option<Box<Node>>) {',
                '    match root {',
                '        None => return, // [2] If there is no node here, stop',
                '                        // [3] Nothing to visit',
                '        Some(node) => {',
                '            visit(node); // [4] Visit this node first',
                '            bst_preorder(&node.left); // [5] Then visit the entire left subtree',
                '            bst_preorder(&node.right); // [6] Finally visit the entire right subtree',
                '        }',
                '    }',
                '}',
            ],
        },

        bstPostorder: {
            pseudo: [
                '# Step 1: Visit every node in left-right-root order',
                'procedure bstPostorder(root):',
                '',
                '    if root is null:  # [2] If there is no node here, stop',
                '        return  # [3] Nothing to visit',
                '',
                '    bstPostorder(root.left)  # [4] First visit the entire left subtree',
                '    bstPostorder(root.right)  # [5] Then visit the entire right subtree',
                '    visit(root)  # [6] Finally visit this node',
            ],
            python: [
                '# Step 1: Visit every node in left-right-root order',
                'def bst_postorder(root: Optional[Node]) -> None:',
                '',
                '    if root is None:  # [2] If there is no node here, stop',
                '        return  # [3] Nothing to visit',
                '',
                '    bst_postorder(root.left)  # [4] First visit the entire left subtree',
                '    bst_postorder(root.right)  # [5] Then visit the entire right subtree',
                '    visit(root)  # [6] Finally visit this node',
            ],
            c: [
                '// Step 1: Visit every node in left-right-root order',
                'void bstPostorder(struct Node* root) {',
                '',
                '    if (root == NULL) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    bstPostorder(root->left); // [4] First visit the entire left subtree',
                '    bstPostorder(root->right); // [5] Then visit the entire right subtree',
                '    visit(root); // [6] Finally visit this node',
                '}',
            ],
            csharp: [
                '// Step 1: Visit every node in left-right-root order',
                'void BstPostorder(Node? root) {',
                '',
                '    if (root == null) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    BstPostorder(root.Left); // [4] First visit the entire left subtree',
                '    BstPostorder(root.Right); // [5] Then visit the entire right subtree',
                '    Visit(root); // [6] Finally visit this node',
                '}',
            ],
            typescript: [
                '// Step 1: Visit every node in left-right-root order',
                'function bstPostorder(root: Node | null): void {',
                '',
                '    if (root === null) { // [2] If there is no node here, stop',
                '        return; // [3] Nothing to visit',
                '    }',
                '',
                '    bstPostorder(root.left); // [4] First visit the entire left subtree',
                '    bstPostorder(root.right); // [5] Then visit the entire right subtree',
                '    visit(root); // [6] Finally visit this node',
                '}',
            ],
            go: [
                '// Step 1: Visit every node in left-right-root order',
                'func bstPostorder(root *Node) {',
                '',
                '    if root == nil { // [2] If there is no node here, stop',
                '        return // [3] Nothing to visit',
                '    }',
                '',
                '    bstPostorder(root.Left) // [4] First visit the entire left subtree',
                '    bstPostorder(root.Right) // [5] Then visit the entire right subtree',
                '    visit(root) // [6] Finally visit this node',
                '}',
            ],
            rust: [
                '// Step 1: Visit every node in left-right-root order',
                'fn bst_postorder(root: &Option<Box<Node>>) {',
                '    match root {',
                '        None => return, // [2] If there is no node here, stop',
                '                        // [3] Nothing to visit',
                '        Some(node) => {',
                '            bst_postorder(&node.left); // [4] First visit the entire left subtree',
                '            bst_postorder(&node.right); // [5] Then visit the entire right subtree',
                '            visit(node); // [6] Finally visit this node',
                '        }',
                '    }',
                '}',
            ],
        },
    };

    // ─── Complexity Information ───

    const COMPLEXITY = {
        bstInsert: {
            name: 'BST Insert',
            best: 'O(log n)',
            average: 'O(log n)',
            worst: 'O(n)',
            space: 'O(log n)',
            description:
                'Walk down the tree comparing the new value to each node. ' +
                'Go left if it is smaller, right if it is larger, until you reach ' +
                'an empty spot. Place the new node there. On a balanced tree this ' +
                'takes about log n steps, but a skewed tree can degrade to n steps.',
            useCase:
                'Use when building a dynamic collection that needs fast lookups. ' +
                'Good for maintaining a sorted set where items arrive one at a time. ' +
                'Common in symbol tables, priority schedulers, and database indexes.',
            avoid:
                'Avoid when data arrives in sorted or nearly sorted order, as the tree ' +
                'becomes a linked list with O(n) operations. Use a self-balancing tree ' +
                'such as AVL or Red-Black when worst-case guarantees matter.',
        },

        bstSearch: {
            name: 'BST Search',
            best: 'O(log n)',
            average: 'O(log n)',
            worst: 'O(n)',
            space: 'O(log n)',
            description:
                'Start at the root and compare the target to the current node. ' +
                'If it matches, you are done. If the target is smaller go left, ' +
                'if larger go right. Repeat until you find it or reach a null pointer. ' +
                'Each comparison eliminates roughly half the remaining nodes in a balanced tree.',
            useCase:
                'Use when you need to look up values in a collection that changes over time. ' +
                'Ideal when insertions and lookups are interleaved. ' +
                'Common in dictionaries, auto-complete systems, and routing tables.',
            avoid:
                'Avoid when the tree is not balanced, because search degrades to O(n). ' +
                'If the data is static, a sorted array with binary search uses less memory ' +
                'and has better cache performance.',
        },

        bstInorder: {
            name: 'In-order Traversal',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(n)',
            description:
                'Visit the left subtree, then the current node, then the right subtree. ' +
                'For a BST this produces values in ascending sorted order. ' +
                'Every node is visited exactly once, so the time is always O(n). ' +
                'Recursion stack can grow to O(n) in a skewed tree.',
            useCase:
                'Use when you need the elements of a BST in sorted order. ' +
                'Perfect for printing a sorted list, range queries, or verifying ' +
                'that a tree satisfies the BST property.',
            avoid:
                'Avoid when you only need one specific element. A targeted search is ' +
                'O(log n) on a balanced tree, much faster than traversing all n nodes.',
        },

        bstPreorder: {
            name: 'Pre-order Traversal',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(n)',
            description:
                'Visit the current node first, then the left subtree, then the right subtree. ' +
                'This order is useful for copying or serializing a tree, because you can ' +
                'reconstruct the exact same structure by inserting nodes in pre-order sequence. ' +
                'Every node is visited exactly once.',
            useCase:
                'Use when you need to serialize a tree to a file or stream so it can ' +
                'be reconstructed later. Also useful for creating a deep copy of a tree ' +
                'or evaluating prefix expressions in an expression tree.',
            avoid:
                'Avoid when you need elements in sorted order. In-order traversal is the ' +
                'right choice for that. Pre-order does not produce sorted output from a BST.',
        },

        bstPostorder: {
            name: 'Post-order Traversal',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(n)',
            description:
                'Visit the left subtree, then the right subtree, then the current node. ' +
                'Children are always processed before their parent. This is the natural ' +
                'order for deleting or freeing a tree, since you remove children before ' +
                'the parent. Every node is visited exactly once.',
            useCase:
                'Use when you need to delete or free every node in a tree safely. ' +
                'Also used for evaluating postfix expressions in expression trees ' +
                'and computing the size or height of subtrees bottom-up.',
            avoid:
                'Avoid when you need sorted output or when you want to process parents ' +
                'before children. Use in-order for sorted output and pre-order for ' +
                'top-down processing.',
        },
    };

    // ─── Generator Functions ───

    /**
     * BST Insert generator. Yields visualization steps while inserting a value.
     *
     * @param {object|null} root - The root of the BST (or null for an empty tree).
     * @param {number} value - The value to insert.
     * @yields {{ type: string, nodeId: number, codeLine: number }}
     * @returns {object} The new root of the tree.
     */
    function* bstInsert(root, value) {
        if (root === null) {
            const newNode = createNode(value);
            yield { type: 'insert', nodeId: newNode.id, codeLine: 3 };
            return newNode;
        }

        yield { type: 'visit', nodeId: root.id, codeLine: 2 };
        yield { type: 'compare', nodeId: root.id, codeLine: 4 };

        if (value < root.value) {
            yield { type: 'compare', nodeId: root.id, codeLine: 5 };
            const gen = bstInsert(root.left, value);
            let result = gen.next();
            while (!result.done) {
                yield result.value;
                result = gen.next();
            }
            root.left = result.value;
        } else if (value > root.value) {
            yield { type: 'compare', nodeId: root.id, codeLine: 7 };
            const gen = bstInsert(root.right, value);
            let result = gen.next();
            while (!result.done) {
                yield result.value;
                result = gen.next();
            }
            root.right = result.value;
        }

        return root;
    }

    /**
     * BST Search generator. Yields visualization steps while searching for a value.
     *
     * @param {object|null} root - The root of the BST.
     * @param {number} value - The value to search for.
     * @yields {{ type: string, nodeId: number, codeLine: number }}
     */
    function* bstSearch(root, value) {
        if (root === null) {
            yield { type: 'notFound', nodeId: -1, codeLine: 3 };
            return;
        }

        yield { type: 'visit', nodeId: root.id, codeLine: 2 };
        yield { type: 'compare', nodeId: root.id, codeLine: 4 };

        if (value === root.value) {
            yield { type: 'found', nodeId: root.id, codeLine: 5 };
            return;
        }

        if (value < root.value) {
            yield { type: 'compare', nodeId: root.id, codeLine: 6 };
            yield* bstSearch(root.left, value);
        } else {
            yield { type: 'compare', nodeId: root.id, codeLine: 8 };
            yield* bstSearch(root.right, value);
        }
    }

    /**
     * In-order traversal generator (left, root, right).
     *
     * @param {object|null} root - The root of the BST.
     * @yields {{ type: string, nodeId: number, codeLine: number }}
     */
    function* bstInorder(root) {
        if (root === null) {
            return;
        }

        yield* bstInorder(root.left);
        yield { type: 'visit', nodeId: root.id, codeLine: 5 };
        yield* bstInorder(root.right);
    }

    /**
     * Pre-order traversal generator (root, left, right).
     *
     * @param {object|null} root - The root of the BST.
     * @yields {{ type: string, nodeId: number, codeLine: number }}
     */
    function* bstPreorder(root) {
        if (root === null) {
            return;
        }

        yield { type: 'visit', nodeId: root.id, codeLine: 4 };
        yield* bstPreorder(root.left);
        yield* bstPreorder(root.right);
    }

    /**
     * Post-order traversal generator (left, right, root).
     *
     * @param {object|null} root - The root of the BST.
     * @yields {{ type: string, nodeId: number, codeLine: number }}
     */
    function* bstPostorder(root) {
        if (root === null) {
            return;
        }

        yield* bstPostorder(root.left);
        yield* bstPostorder(root.right);
        yield { type: 'visit', nodeId: root.id, codeLine: 6 };
    }

    // ─── Public API ───

    return {
        CODE,
        COMPLEXITY,
        createNode,
        resetIds,
        buildSampleBST,
        bstInsert,
        bstSearch,
        bstInorder,
        bstPreorder,
        bstPostorder,
    };
})();

export default TreeAlgorithms;
