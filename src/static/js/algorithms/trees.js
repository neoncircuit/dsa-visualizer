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
        return { value, left: null, right: null, id: nodeIdCounter++, height: 1 };
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

    /**
     * Count the number of nodes in a tree.
     *
     * @param {object|null} node - Current node.
     * @returns {number} Number of nodes.
     */
    function countNodes(node) {
        if (!node) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    }

    function getHeight(node) {
        return node ? node.height : 0;
    }

    function updateHeight(node) {
        node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    function getBalanceFactor(node) {
        return node ? getHeight(node.left) - getHeight(node.right) : 0;
    }

    function rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        updateHeight(y);
        updateHeight(x);

        return x;
    }

    function rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        updateHeight(x);
        updateHeight(y);

        return y;
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

        bstDelete: {
            pseudo: [
                '# Step 1: Delete a value from a Binary Search Tree',
                'procedure bstDelete(root, value):',
                '',
                '    if root is null:  # [2] If we reached an empty spot, value is not found',
                '        return not found  # [3] The value does not exist in the tree',
                '',
                '    if value < root.value:  # [4] If the value is smaller, go left',
                '        root.left = bstDelete(root.left, value)  # [5] Delete from the left subtree',
                '    elif value > root.value:  # [6] If the value is larger, go right',
                '        root.right = bstDelete(root.right, value)  # [7] Delete from the right subtree',
                '    else:  # [8] This is the node to delete',
                '        if root.left is null:  # [9] Node has only right child',
                '            return root.right  # [10] Replace with right child (may be null)',
                '        elif root.right is null:  # [11] Node has only left child',
                '            return root.left  # [12] Replace with left child',
                '        else:  # [13] Node has two children',
                '            temp = findMin(root.right)  # [14] Find inorder successor',
                '            root.value = temp.value  # [15] Replace value with successor',
                '            root.right = bstDelete(root.right, temp.value)  # [16] Delete successor',
                '    return root  # [17] Return the (possibly modified) root',
            ],
            python: [
                '# Step 1: Delete a value from a Binary Search Tree',
                'def bst_delete(root: Optional[Node], value: int) -> Optional[Node]:',
                '',
                '    if root is None:  # [2] If we reached an empty spot, value is not found',
                '        return None  # [3] The value does not exist in the tree',
                '',
                '    if value < root.value:  # [4] If the value is smaller, go left',
                '        root.left = bst_delete(root.left, value)  # [5] Delete from the left subtree',
                '    elif value > root.value:  # [6] If the value is larger, go right',
                '        root.right = bst_delete(root.right, value)  # [7] Delete from the right subtree',
                '    else:  # [8] This is the node to delete',
                '        if root.left is None:  # [9] Node has only right child',
                '            return root.right  # [10] Replace with right child (may be None)',
                '        elif root.right is None:  # [11] Node has only left child',
                '            return root.left  # [12] Replace with left child',
                '        else:  # [13] Node has two children',
                '            temp = find_min(root.right)  # [14] Find inorder successor',
                '            root.value = temp.value  # [15] Replace value with successor',
                '            root.right = bst_delete(root.right, temp.value)  # [16] Delete successor',
                '    return root  # [17] Return the (possibly modified) root',
            ],
            java: [
                '// Step 1: Delete a value from a Binary Search Tree',
                'Node bstDelete(Node root, int value) {',
                '',
                '    if (root == null) { // [2] If we reached an empty spot, value is not found',
                '        return null; // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if (value < root.value) { // [4] If the value is smaller, go left',
                '        root.left = bstDelete(root.left, value); // [5] Delete from the left subtree',
                '    } else if (value > root.value) { // [6] If the value is larger, go right',
                '        root.right = bstDelete(root.right, value); // [7] Delete from the right subtree',
                '    } else { // [8] This is the node to delete',
                '        if (root.left == null) { // [9] Node has only right child',
                '            return root.right; // [10] Replace with right child (may be null)',
                '        } else if (root.right == null) { // [11] Node has only left child',
                '            return root.left; // [12] Replace with left child',
                '        } else { // [13] Node has two children',
                '            Node temp = findMin(root.right); // [14] Find inorder successor',
                '            root.value = temp.value; // [15] Replace value with successor',
                '            root.right = bstDelete(root.right, temp.value); // [16] Delete successor',
                '        }',
                '    }',
                '    return root; // [17] Return the (possibly modified) root',
                '}',
            ],
            c: [
                '// Step 1: Delete a value from a Binary Search Tree',
                'struct Node* bstDelete(struct Node* root, int value) {',
                '',
                '    if (root == NULL) { // [2] If we reached an empty spot, value is not found',
                '        return NULL; // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if (value < root->value) { // [4] If the value is smaller, go left',
                '        root->left = bstDelete(root->left, value); // [5] Delete from the left subtree',
                '    } else if (value > root->value) { // [6] If the value is larger, go right',
                '        root->right = bstDelete(root->right, value); // [7] Delete from the right subtree',
                '    } else { // [8] This is the node to delete',
                '        if (root->left == NULL) { // [9] Node has only right child',
                '            return root->right; // [10] Replace with right child (may be NULL)',
                '        } else if (root->right == NULL) { // [11] Node has only left child',
                '            return root->left; // [12] Replace with left child',
                '        } else { // [13] Node has two children',
                '            struct Node* temp = findMin(root->right); // [14] Find inorder successor',
                '            root->value = temp->value; // [15] Replace value with successor',
                '            root->right = bstDelete(root->right, temp->value); // [16] Delete successor',
                '        }',
                '    }',
                '    return root; // [17] Return the (possibly modified) root',
                '}',
            ],
            csharp: [
                '// Step 1: Delete a value from a Binary Search Tree',
                'Node? BstDelete(Node? root, int value) {',
                '',
                '    if (root == null) { // [2] If we reached an empty spot, value is not found',
                '        return null; // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if (value < root.Value) { // [4] If the value is smaller, go left',
                '        root.Left = BstDelete(root.Left, value); // [5] Delete from the left subtree',
                '    } else if (value > root.Value) { // [6] If the value is larger, go right',
                '        root.Right = BstDelete(root.Right, value); // [7] Delete from the right subtree',
                '    } else { // [8] This is the node to delete',
                '        if (root.Left == null) { // [9] Node has only right child',
                '            return root.Right; // [10] Replace with right child (may be null)',
                '        } else if (root.Right == null) { // [11] Node has only left child',
                '            return root.Left; // [12] Replace with left child',
                '        } else { // [13] Node has two children',
                '            Node? temp = FindMin(root.Right); // [14] Find inorder successor',
                '            root.Value = temp.Value; // [15] Replace value with successor',
                '            root.Right = BstDelete(root.Right, temp.Value); // [16] Delete successor',
                '        }',
                '    }',
                '    return root; // [17] Return the (possibly modified) root',
                '}',
            ],
            typescript: [
                '// Step 1: Delete a value from a Binary Search Tree',
                'function bstDelete(root: Node | null, value: number): Node | null {',
                '',
                '    if (root === null) { // [2] If we reached an empty spot, value is not found',
                '        return null; // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if (value < root.value) { // [4] If the value is smaller, go left',
                '        root.left = bstDelete(root.left, value); // [5] Delete from the left subtree',
                '    } else if (value > root.value) { // [6] If the value is larger, go right',
                '        root.right = bstDelete(root.right, value); // [7] Delete from the right subtree',
                '    } else { // [8] This is the node to delete',
                '        if (root.left === null) { // [9] Node has only right child',
                '            return root.right; // [10] Replace with right child (may be null)',
                '        } else if (root.right === null) { // [11] Node has only left child',
                '            return root.left; // [12] Replace with left child',
                '        } else { // [13] Node has two children',
                '            const temp = findMin(root.right); // [14] Find inorder successor',
                '            root.value = temp.value; // [15] Replace value with successor',
                '            root.right = bstDelete(root.right, temp.value); // [16] Delete successor',
                '        }',
                '    }',
                '    return root; // [17] Return the (possibly modified) root',
                '}',
            ],
            go: [
                '// Step 1: Delete a value from a Binary Search Tree',
                'func bstDelete(root *Node, value int) *Node {',
                '',
                '    if root == nil { // [2] If we reached an empty spot, value is not found',
                '        return nil // [3] The value does not exist in the tree',
                '    }',
                '',
                '    if value < root.Value { // [4] If the value is smaller, go left',
                '        root.Left = bstDelete(root.Left, value) // [5] Delete from the left subtree',
                '    } else if value > root.Value { // [6] If the value is larger, go right',
                '        root.Right = bstDelete(root.Right, value) // [7] Delete from the right subtree',
                '    } else { // [8] This is the node to delete',
                '        if root.Left == nil { // [9] Node has only right child',
                '            return root.Right // [10] Replace with right child (may be nil)',
                '        } else if root.Right == nil { // [11] Node has only left child',
                '            return root.Left // [12] Replace with left child',
                '        } else { // [13] Node has two children',
                '            temp := findMin(root.Right) // [14] Find inorder successor',
                '            root.Value = temp.Value // [15] Replace value with successor',
                '            root.Right = bstDelete(root.Right, temp.Value) // [16] Delete successor',
                '        }',
                '    }',
                '    return root // [17] Return the (possibly modified) root',
                '}',
            ],
            rust: [
                '// Step 1: Delete a value from a Binary Search Tree',
                'fn bst_delete(root: Option<Box<Node>>, value: i32) -> Option<Box<Node>> {',
                '    match root {',
                '        None => None, // [2] If we reached an empty spot, value is not found',
                '                     // [3] The value does not exist in the tree',
                '        Some(mut node) => {',
                '            if value < node.value { // [4] If the value is smaller, go left',
                '                node.left = bst_delete(node.left, value); // [5] Delete from the left subtree',
                '            } else if value > node.value { // [6] If the value is larger, go right',
                '                node.right = bst_delete(node.right, value); // [7] Delete from the right subtree',
                '            } else { // [8] This is the node to delete',
                '                return if node.left.is_none() { // [9] Node has only right child',
                '                    node.right // [10] Replace with right child (may be None)',
                '                } else if node.right.is_none() { // [11] Node has only left child',
                '                    node.left // [12] Replace with left child',
                '                } else { // [13] Node has two children',
                '                    let temp = find_min(&node.right); // [14] Find inorder successor',
                '                    node.value = temp.value; // [15] Replace value with successor',
                '                    node.right = bst_delete(node.right, temp.value); // [16] Delete successor',
                '                    Some(node)',
                '                };',
                '            }',
                '            Some(node) // [17] Return the (possibly modified) root',
                '        }',
                '    }',
                '}',
            ],
        },

        avlInsert: {
            pseudo: [
                '# Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'procedure avlInsert(root, value):',
                '',
                '    if root is null:  # [2] If the tree is empty here, we found the spot',
                '        return new Node(value)  # [3] Create a new node with the value',
                '',
                '    if value < root.value:  # [4] If the value is smaller, go left',
                '        root.left = avlInsert(root.left, value)  # [5] Insert into the left subtree',
                '    else:  # [6] If the value is larger (or equal), go right',
                '        root.right = avlInsert(root.right, value)  # [7] Insert into the right subtree',
                '',
                '    updateHeight(root)  # [8] Update the height of this node',
                '',
                '    balance = getBalance(root)  # [9] Get the balance factor',
                '',
                '    if balance > 1 and value < root.left.value:  # [10] Left-Left case',
                '        return rotateRight(root)  # [11] Right rotation to fix',
                '    elif balance < -1 and value > root.right.value:  # [12] Right-Right case',
                '        return rotateLeft(root)  # [13] Left rotation to fix',
                '    elif balance > 1 and value > root.left.value:  # [14] Left-Right case',
                '        root.left = rotateLeft(root.left)  # [15] Left rotation on left child',
                '        return rotateRight(root)  # [16] Right rotation on root',
                '    elif balance < -1 and value < root.right.value:  # [17] Right-Left case',
                '        root.right = rotateRight(root.right)  # [18] Right rotation on right child',
                '        return rotateLeft(root)  # [19] Left rotation on root',
                '',
                '    return root  # [20] Return the (possibly rotated) root',
            ],
            python: [
                '# Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'def avl_insert(root: Optional[AVLNode], value: int) -> AVLNode:',
                '',
                '    if root is None:  # [2] If the tree is empty here, we found the spot',
                '        return AVLNode(value)  # [3] Create a new node with the value',
                '',
                '    if value < root.value:  # [4] If the value is smaller, go left',
                '        root.left = avl_insert(root.left, value)  # [5] Insert into the left subtree',
                '    else:  # [6] If the value is larger (or equal), go right',
                '        root.right = avl_insert(root.right, value)  # [7] Insert into the right subtree',
                '',
                '    update_height(root)  # [8] Update the height of this node',
                '',
                '    balance = get_balance(root)  # [9] Get the balance factor',
                '',
                '    if balance > 1 and value < root.left.value:  # [10] Left-Left case',
                '        return rotate_right(root)  # [11] Right rotation to fix',
                '    elif balance < -1 and value > root.right.value:  # [12] Right-Right case',
                '        return rotate_left(root)  # [13] Left rotation to fix',
                '    elif balance > 1 and value > root.left.value:  # [14] Left-Right case',
                '        root.left = rotate_left(root.left)  # [15] Left rotation on left child',
                '        return rotate_right(root)  # [16] Right rotation on root',
                '    elif balance < -1 and value < root.right.value:  # [17] Right-Left case',
                '        root.right = rotate_right(root.right)  # [18] Right rotation on right child',
                '        return rotate_left(root)  # [19] Left rotation on root',
                '',
                '    return root  # [20] Return the (possibly rotated) root',
            ],
            java: [
                '// Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'AVLNode avlInsert(AVLNode root, int value) {',
                '',
                '    if (root == null) { // [2] If the tree is empty here, we found the spot',
                '        return new AVLNode(value); // [3] Create a new node with the value',
                '    }',
                '',
                '    if (value < root.value) { // [4] If the value is smaller, go left',
                '        root.left = avlInsert(root.left, value); // [5] Insert into the left subtree',
                '    } else { // [6] If the value is larger (or equal), go right',
                '        root.right = avlInsert(root.right, value); // [7] Insert into the right subtree',
                '    }',
                '',
                '    updateHeight(root); // [8] Update the height of this node',
                '',
                '    int balance = getBalance(root); // [9] Get the balance factor',
                '',
                '    if (balance > 1 && value < root.left.value) { // [10] Left-Left case',
                '        return rotateRight(root); // [11] Right rotation to fix',
                '    } else if (balance < -1 && value > root.right.value) { // [12] Right-Right case',
                '        return rotateLeft(root); // [13] Left rotation to fix',
                '    } else if (balance > 1 && value > root.left.value) { // [14] Left-Right case',
                '        root.left = rotateLeft(root.left); // [15] Left rotation on left child',
                '        return rotateRight(root); // [16] Right rotation on root',
                '    } else if (balance < -1 && value < root.right.value) { // [17] Right-Left case',
                '        root.right = rotateRight(root.right); // [18] Right rotation on right child',
                '        return rotateLeft(root); // [19] Left rotation on root',
                '    }',
                '',
                '    return root; // [20] Return the (possibly rotated) root',
                '}',
            ],
            c: [
                '// Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'struct AVLNode* avlInsert(struct AVLNode* root, int value) {',
                '',
                '    if (root == NULL) { // [2] If the tree is empty here, we found the spot',
                '        return createAVLNode(value); // [3] Create a new node with the value',
                '    }',
                '',
                '    if (value < root->value) { // [4] If the value is smaller, go left',
                '        root->left = avlInsert(root->left, value); // [5] Insert into the left subtree',
                '    } else { // [6] If the value is larger (or equal), go right',
                '        root->right = avlInsert(root->right, value); // [7] Insert into the right subtree',
                '    }',
                '',
                '    updateHeight(root); // [8] Update the height of this node',
                '',
                '    int balance = getBalance(root); // [9] Get the balance factor',
                '',
                '    if (balance > 1 && value < root->left->value) { // [10] Left-Left case',
                '        return rotateRight(root); // [11] Right rotation to fix',
                '    } else if (balance < -1 && value > root->right->value) { // [12] Right-Right case',
                '        return rotateLeft(root); // [13] Left rotation to fix',
                '    } else if (balance > 1 && value > root->left->value) { // [14] Left-Right case',
                '        root->left = rotateLeft(root->left); // [15] Left rotation on left child',
                '        return rotateRight(root); // [16] Right rotation on root',
                '    } else if (balance < -1 && value < root->right->value) { // [17] Right-Left case',
                '        root->right = rotateRight(root->right); // [18] Right rotation on right child',
                '        return rotateLeft(root); // [19] Left rotation on root',
                '    }',
                '',
                '    return root; // [20] Return the (possibly rotated) root',
                '}',
            ],
            csharp: [
                '// Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'AVLNode AvlInsert(AVLNode root, int value) {',
                '',
                '    if (root == null) { // [2] If the tree is empty here, we found the spot',
                '        return new AVLNode(value); // [3] Create a new node with the value',
                '    }',
                '',
                '    if (value < root.Value) { // [4] If the value is smaller, go left',
                '        root.Left = AvlInsert(root.Left, value); // [5] Insert into the left subtree',
                '    } else { // [6] If the value is larger (or equal), go right',
                '        root.Right = AvlInsert(root.Right, value); // [7] Insert into the right subtree',
                '    }',
                '',
                '    UpdateHeight(root); // [8] Update the height of this node',
                '',
                '    int balance = GetBalance(root); // [9] Get the balance factor',
                '',
                '    if (balance > 1 && value < root.Left.Value) { // [10] Left-Left case',
                '        return RotateRight(root); // [11] Right rotation to fix',
                '    } else if (balance < -1 && value > root.Right.Value) { // [12] Right-Right case',
                '        return RotateLeft(root); // [13] Left rotation to fix',
                '    } else if (balance > 1 && value > root.Left.Value) { // [14] Left-Right case',
                '        root.Left = RotateLeft(root.Left); // [15] Left rotation on left child',
                '        return RotateRight(root); // [16] Right rotation on root',
                '    } else if (balance < -1 && value < root.Right.Value) { // [17] Right-Left case',
                '        root.Right = RotateRight(root.Right); // [18] Right rotation on right child',
                '        return RotateLeft(root); // [19] Left rotation on root',
                '    }',
                '',
                '    return root; // [20] Return the (possibly rotated) root',
                '}',
            ],
            typescript: [
                '// Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'function avlInsert(root: AVLNode | null, value: number): AVLNode {',
                '',
                '    if (root === null) { // [2] If the tree is empty here, we found the spot',
                '        return new AVLNode(value); // [3] Create a new node with the value',
                '    }',
                '',
                '    if (value < root.value) { // [4] If the value is smaller, go left',
                '        root.left = avlInsert(root.left, value); // [5] Insert into the left subtree',
                '    } else { // [6] If the value is larger (or equal), go right',
                '        root.right = avlInsert(root.right, value); // [7] Insert into the right subtree',
                '    }',
                '',
                '    updateHeight(root); // [8] Update the height of this node',
                '',
                '    const balance = getBalance(root); // [9] Get the balance factor',
                '',
                '    if (balance > 1 && value < root.left.value) { // [10] Left-Left case',
                '        return rotateRight(root); // [11] Right rotation to fix',
                '    } else if (balance < -1 && value > root.right.value) { // [12] Right-Right case',
                '        return rotateLeft(root); // [13] Left rotation to fix',
                '    } else if (balance > 1 && value > root.left.value) { // [14] Left-Right case',
                '        root.left = rotateLeft(root.left); // [15] Left rotation on left child',
                '        return rotateRight(root); // [16] Right rotation on root',
                '    } else if (balance < -1 && value < root.right.value) { // [17] Right-Left case',
                '        root.right = rotateRight(root.right); // [18] Right rotation on right child',
                '        return rotateLeft(root); // [19] Left rotation on root',
                '    }',
                '',
                '    return root; // [20] Return the (possibly rotated) root',
                '}',
            ],
            go: [
                '// Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'func AvlInsert(root *AVLNode, value int) *AVLNode {',
                '',
                '    if root == nil { // [2] If the tree is empty here, we found the spot',
                '        return &AVLNode{Value: value, Height: 1} // [3] Create a new node with the value',
                '    }',
                '',
                '    if value < root.Value { // [4] If the value is smaller, go left',
                '        root.Left = AvlInsert(root.Left, value) // [5] Insert into the left subtree',
                '    } else { // [6] If the value is larger (or equal), go right',
                '        root.Right = AvlInsert(root.Right, value) // [7] Insert into the right subtree',
                '    }',
                '',
                '    UpdateHeight(root) // [8] Update the height of this node',
                '',
                '    balance := GetBalance(root) // [9] Get the balance factor',
                '',
                '    if balance > 1 && value < root.Left.Value { // [10] Left-Left case',
                '        return RotateRight(root) // [11] Right rotation to fix',
                '    } else if balance < -1 && value > root.Right.Value { // [12] Right-Right case',
                '        return RotateLeft(root) // [13] Left rotation to fix',
                '    } else if balance > 1 && value > root.Left.Value { // [14] Left-Right case',
                '        root.Left = RotateLeft(root.Left) // [15] Left rotation on left child',
                '        return RotateRight(root) // [16] Right rotation on root',
                '    } else if balance < -1 && value < root.Right.Value { // [17] Right-Left case',
                '        root.Right = RotateRight(root.Right) // [18] Right rotation on right child',
                '        return RotateLeft(root) // [19] Left rotation on root',
                '    }',
                '',
                '    return root // [20] Return the (possibly rotated) root',
                '}',
            ],
            rust: [
                '// Step 1: Insert a value into an AVL Tree (self-balancing BST)',
                'fn avl_insert(root: Option<Box<AVLNode>>, value: i32) -> Box<AVLNode> {',
                '    match root {',
                '        None => Box::new(AVLNode::new(value)), // [2] If the tree is empty here, we found the spot',
                '                                              // [3] Create a new node with the value',
                '        Some(mut node) => {',
                '            if value < node.value { // [4] If the value is smaller, go left',
                '                node.left = Some(avl_insert(node.left, value)); // [5] Insert into the left subtree',
                '            } else { // [6] If the value is larger (or equal), go right',
                '                node.right = Some(avl_insert(node.right, value)); // [7] Insert into the right subtree',
                '            }',
                '',
                '            node.update_height(); // [8] Update the height of this node',
                '',
                '            let balance = node.get_balance(); // [9] Get the balance factor',
                '',
                '            if balance > 1 && value < node.left.as_ref().unwrap().value { // [10] Left-Left case',
                '                return node.rotate_right(); // [11] Right rotation to fix',
                '            } else if balance < -1 && value > node.right.as_ref().unwrap().value { // [12] Right-Right case',
                '                return node.rotate_left(); // [13] Left rotation to fix',
                '            } else if balance > 1 && value > node.left.as_ref().unwrap().value { // [14] Left-Right case',
                '                node.left = Some(node.left.take()?.rotate_left()?); // [15] Left rotation on left child',
                '                return node.rotate_right(); // [16] Right rotation on root',
                '            } else if balance < -1 && value < node.right.as_ref().unwrap().value { // [17] Right-Left case',
                '                node.right = Some(node.right.take()?.rotate_right()?); // [18] Right rotation on right child',
                '                return node.rotate_left(); // [19] Left rotation on root',
                '            }',
                '',
                '            node // [20] Return the (possibly rotated) root',
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
            realWorld:
                'Used to build database indexes, implement symbol tables in compilers, and create in-memory sorted collections. ' +
                'Powers the `std::map` and `std::set` containers in C++, and forms the basis for more advanced tree structures. ' +
                'Used in file systems for directory indexing and in autocomplete systems for storing sorted word lists.',
            mentalModel:
                'Like inserting a new card into a sorted deck. Start at the top, compare your card to the current one, ' +
                'and go left (smaller) or right (larger) until you find an empty slot to place it.',
            difficulty: 'Easy',
            patterns: ['Trees', 'BST', 'Insertion'],
            leetcodeTags: ['tree', 'bst', 'insertion', 'interview-common']
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
            realWorld:
                'The fundamental operation behind database queries, dictionary lookups, and symbol table access in compilers. ' +
                'Used in spell checkers to verify word existence, in IP routing tables for longest-prefix matching, ' +
                'and in version control systems for efficient file lookup. Powers the `in` operator for sets in many languages.',
            mentalModel:
                'Like searching for a name in a phone book. Open to the middle, if your name comes earlier go to the first half, ' +
                'if later go to the second half. Repeat until you find it or run out of pages.',
            difficulty: 'Easy',
            patterns: ['Trees', 'BST', 'Search', 'Binary Search'],
            leetcodeTags: ['tree', 'bst', 'search', 'interview-common']
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
            realWorld:
                'Used to extract sorted data from a BST without an explicit sort step. ' +
                'Powers the `sorted()` output from tree-based data structures, the "flatten to sorted list" operation in databases, ' +
                'and the code generation phase in compilers that outputs symbols in alphabetical order. ' +
                'Also used in expression tree evaluation (infix notation).',
            mentalModel:
                'Like reading a book page from left to right. You visit the left chapter first, then the current page, then the right chapter.',
            difficulty: 'Easy',
            patterns: ['Binary Tree Traversal', 'DFS', 'Trees'],
            leetcodeTags: ['tree', 'traversal', 'bst', 'easy', 'interview-common']
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
            realWorld:
                'Used to serialize/deserialize tree structures (save to disk and restore). ' +
                'Powers the copy operation for tree data structures, the "deep clone" in JSON/XML processing, ' +
                'and the code generation phase in compilers that produces prefix notation. ' +
                'Also used in file system operations for exporting directory trees and in markup document traversal.',
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
            realWorld:
                'Used to safely delete a tree (delete children before parent to avoid dangling references). ' +
                'Powers the evaluation of expression trees in compilers and calculators, the "calculate directory sizes" ' +
                'operation in file systems, and the dependency resolution in build systems (build children before parent). ' +
                'Also used in memory management for freeing tree-allocated resources.',
            mentalModel:
                'Like cleaning up a room - you put away toys before cleaning the floor. Process children (toys) first, then the parent (room).',
            difficulty: 'Easy',
            patterns: ['Binary Tree Traversal', 'DFS', 'Trees'],
            leetcodeTags: ['tree', 'traversal', 'easy', 'interview-common']
        },

        bstDelete: {
            name: 'BST Delete',
            best: 'O(log n)',
            average: 'O(log n)',
            worst: 'O(n)',
            space: 'O(log n)',
            description:
                'Search for the node to delete by comparing values and traversing left or right. ' +
                'Three cases: (1) leaf node - simply remove it, (2) one child - replace with that child, ' +
                '(3) two children - find inorder successor (minimum of right subtree), copy its value, ' +
                'then delete the successor. On a balanced tree this takes about log n steps, ' +
                'but a skewed tree can degrade to n steps.',
            useCase:
                'Use when maintaining a dynamic collection where items are removed. ' +
                'Essential for implementing sets, maps, and symbol tables with delete operations. ' +
                'Common in database indexing, file systems, and memory management.',
            avoid:
                'Avoid when the tree is not balanced, as operations can degrade to O(n). ' +
                'For applications requiring guaranteed performance, use a self-balancing tree ' +
                'such as AVL or Red-Black tree. If deletions are frequent, consider lazy deletion ' +
                'or tombstone marking to improve performance.',
            realWorld:
                'Used in database index maintenance when records are removed, in memory management for freeing tree nodes, ' +
                'and in compiler symbol tables when variables go out of scope. Essential for implementing the "erase" operation ' +
                'in C++ `std::map`/`std::set` and for maintaining balanced search structures in databases.',
        },

        avlInsert: {
            name: 'AVL Tree Insert',
            best: 'O(log n)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(log n)',
            description:
                'Insert a value like BST, then rebalance along the path from the new node to the root. ' +
                'Track heights and compute balance factors (height(left) - height(right)). ' +
                'If imbalance exceeds 1, perform rotations: LL (right rotate), RR (left rotate), ' +
                'LR (left rotate left child, then right rotate), RL (right rotate right child, then left rotate). ' +
                'Always maintains O(log n) height, guaranteeing consistent performance.',
            useCase:
                'Use when worst-case performance guarantees are critical. ' +
                'Perfect for database indexes, memory allocators, and any system where ' +
                'timing predictability matters. Also excellent for implementing ' +
                'ordered sets and maps with strict O(log n) bounds.',
            avoid:
                'Avoid when memory overhead is a concern, as storing height per node ' +
                'uses extra space. Also avoid when rotations are too expensive - ' +
                'Red-Black trees require fewer rotations on average. For simple ' +
                'applications without strict timing requirements, a regular BST may suffice.',
            realWorld:
                'Used in database indexing where guaranteed O(log n) operations are critical (e.g., financial trading systems, ' +
                'real-time inventory management). Powers the `std::map` in some standard library implementations, the Windows NT ' +
                'kernel\'s virtual memory management, and in-memory indexes for real-time applications. ' +
                'Preferred over regular BSTs when data ordering is adversarial.',
            mentalModel:
                'Like BST insert but with automatic balancing. After inserting, check if any subtree is leaning too much ' +
                'to one side. If so, rotate nodes to restore balance, similar to how a mobile balances itself.',
            difficulty: 'Medium',
            patterns: ['Trees', 'BST', 'Balanced Trees', 'Rotations'],
            leetcodeTags: ['tree', 'avl', 'balanced-tree', 'medium', 'interview-common']
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

    /**
     * Find the minimum value node in a subtree (for inorder successor).
     *
     * @param {object} node - The root of the subtree.
     * @returns {object} The node with the minimum value.
     */
    function findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    /**
     * BST Delete generator. Yields visualization steps while deleting a value.
     *
     * @param {object|null} root - The root of the BST (or null for an empty tree).
     * @param {number} value - The value to delete.
     * @yields {{ type: string, nodeId: number, codeLine: number, deletedNodeId?: number }}
     * @returns {object|null} The new root of the tree.
     */
    function* bstDelete(root, value) {
        if (root === null) {
            yield { type: 'notFound', nodeId: -1, codeLine: 3 };
            return null;
        }

        yield { type: 'visit', nodeId: root.id, codeLine: 2 };
        yield { type: 'compare', nodeId: root.id, codeLine: 4 };

        if (value < root.value) {
            yield { type: 'compare', nodeId: root.id, codeLine: 5 };
            const gen = bstDelete(root.left, value);
            let result = gen.next();
            while (!result.done) {
                yield result.value;
                result = gen.next();
            }
            root.left = result.value;
        } else if (value > root.value) {
            yield { type: 'compare', nodeId: root.id, codeLine: 7 };
            const gen = bstDelete(root.right, value);
            let result = gen.next();
            while (!result.done) {
                yield result.value;
                result = gen.next();
            }
            root.right = result.value;
        } else {
            yield { type: 'found', nodeId: root.id, codeLine: 8 };

            if (root.left === null) {
                yield { type: 'delete', nodeId: root.id, codeLine: 10, deletedNodeId: root.id };
                return root.right;
            }
            yield { type: 'compare', nodeId: root.id, codeLine: 11 };

            if (root.right === null) {
                yield { type: 'delete', nodeId: root.id, codeLine: 12, deletedNodeId: root.id };
                return root.left;
            }

            const successor = findMinNode(root.right);
            yield { type: 'visit', nodeId: successor.id, codeLine: 14 };

            yield { type: 'replace', nodeId: root.id, newValue: successor.value, codeLine: 15 };
            const oldValue = root.value;
            root.value = successor.value;

            yield { type: 'compare', nodeId: root.id, codeLine: 16 };
            const gen = bstDelete(root.right, successor.value);
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
     * AVL Insert generator. Yields visualization steps while inserting a value.
     *
     * @param {object|null} root - The root of the AVL tree (or null for an empty tree).
     * @param {number} value - The value to insert.
     * @yields {{ type: string, nodeId: number, codeLine: number }}
     * @returns {object} The new root of the tree.
     */
    function* avlInsert(root, value) {
        if (root === null) {
            const newNode = createNode(value);
            yield { type: 'insert', nodeId: newNode.id, codeLine: 3 };
            return newNode;
        }

        yield { type: 'visit', nodeId: root.id, codeLine: 2 };
        yield { type: 'compare', nodeId: root.id, codeLine: 4 };

        if (value < root.value) {
            yield { type: 'compare', nodeId: root.id, codeLine: 5 };
            const gen = avlInsert(root.left, value);
            let result = gen.next();
            while (!result.done) {
                yield result.value;
                result = gen.next();
            }
            root.left = result.value;
        } else {
            yield { type: 'compare', nodeId: root.id, codeLine: 7 };
            const gen = avlInsert(root.right, value);
            let result = gen.next();
            while (!result.done) {
                yield result.value;
                result = gen.next();
            }
            root.right = result.value;
        }

        updateHeight(root);
        yield { type: 'updateHeight', nodeId: root.id, codeLine: 8 };

        const balance = getBalanceFactor(root);
        yield { type: 'checkBalance', nodeId: root.id, balance, codeLine: 9 };

        if (balance > 1 && value < root.left.value) {
            yield { type: 'rotate', nodeId: root.id, rotationType: 'right', codeLine: 11 };
            return rotateRight(root);
        }
        if (balance < -1 && value > root.right.value) {
            yield { type: 'rotate', nodeId: root.id, rotationType: 'left', codeLine: 13 };
            return rotateLeft(root);
        }
        if (balance > 1 && value > root.left.value) {
            yield { type: 'rotate', nodeId: root.left.id, rotationType: 'left', codeLine: 15 };
            root.left = rotateLeft(root.left);
            yield { type: 'rotate', nodeId: root.id, rotationType: 'right', codeLine: 16 };
            return rotateRight(root);
        }
        if (balance < -1 && value < root.right.value) {
            yield { type: 'rotate', nodeId: root.right.id, rotationType: 'right', codeLine: 18 };
            root.right = rotateRight(root.right);
            yield { type: 'rotate', nodeId: root.id, rotationType: 'left', codeLine: 19 };
            return rotateLeft(root);
        }

        return root;
    }

    /**
     * Collect all values in a BST via in-order traversal.
     *
     * @param {object|null} root - The root node.
     * @returns {number[]} All values in the tree.
     */
    function getValues(root) {
        if (!root) return [];
        return [...getValues(root.left), root.value, ...getValues(root.right)];
    }

    // ─── Level-Order Traversal (BFS) Code Snippets ───

    const LEVEL_ORDER_CODE = {
        bstLevelOrder: {
            pseudo: [
                '# Step 1: Visit every node level by level (BFS)',
                'procedure levelOrder(root):',
                '',
                '    if root is null:  # [2] If the tree is empty',
                '        return  # [3] Nothing to traverse',
                '',
                '    queue = [root]  # [4] Initialize queue with root node',
                '',
                '    while queue is not empty:  # [5] Process all nodes',
                '        node = queue.dequeue()  # [6] Remove front of queue',
                '        visit(node)  # [7] Visit the current node',
                '',
                '        if node.left is not null:  # [8] If left child exists',
                '            queue.enqueue(node.left)  # [9] Add left child to queue',
                '        if node.right is not null:  # [10] If right child exists',
                '            queue.enqueue(node.right)  # [11] Add right child to queue',
            ],
            python: [
                '# Step 1: Visit every node level by level (BFS)',
                'from collections import deque',
                '',
                'def level_order(root: Optional[Node]) -> None:',
                '',
                '    if root is None:  # [2] If the tree is empty',
                '        return  # [3] Nothing to traverse',
                '',
                '    queue = deque([root])  # [4] Initialize queue with root node',
                '',
                '    while queue:  # [5] Process all nodes',
                '        node = queue.popleft()  # [6] Remove front of queue',
                '        visit(node)  # [7] Visit the current node',
                '',
                '        if node.left is not None:  # [8] If left child exists',
                '            queue.append(node.left)  # [9] Add left child to queue',
                '        if node.right is not None:  # [10] If right child exists',
                '            queue.append(node.right)  # [11] Add right child to queue',
            ],
            java: [
                '// Step 1: Visit every node level by level (BFS)',
                'import java.util.LinkedList;',
                'import java.util.Queue;',
                '',
                'void levelOrder(Node root) {',
                '',
                '    if (root == null) { // [2] If the tree is empty',
                '        return; // [3] Nothing to traverse',
                '    }',
                '',
                '    Queue<Node> queue = new LinkedList<>();',
                '    queue.add(root); // [4] Initialize queue with root node',
                '',
                '    while (!queue.isEmpty()) { // [5] Process all nodes',
                '        Node node = queue.poll(); // [6] Remove front of queue',
                '        visit(node); // [7] Visit the current node',
                '',
                '        if (node.left != null) { // [8] If left child exists',
                '            queue.add(node.left); // [9] Add left child to queue',
                '        }',
                '        if (node.right != null) { // [10] If right child exists',
                '            queue.add(node.right); // [11] Add right child to queue',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Visit every node level by level (BFS)',
                'typedef struct Node Node;',
                'typedef struct Queue Queue;',
                '',
                'void levelOrder(Node* root) {',
                '',
                '    if (root == NULL) { // [2] If the tree is empty',
                '        return; // [3] Nothing to traverse',
                '    }',
                '',
                '    Queue* queue = createQueue();',
                '    enqueue(queue, root); // [4] Initialize queue with root node',
                '',
                '    while (!isEmpty(queue)) { // [5] Process all nodes',
                '        Node* node = dequeue(queue); // [6] Remove front of queue',
                '        visit(node); // [7] Visit the current node',
                '',
                '        if (node->left != NULL) { // [8] If left child exists',
                '            enqueue(queue, node->left); // [9] Add left child to queue',
                '        }',
                '        if (node->right != NULL) { // [10] If right child exists',
                '            enqueue(queue, node->right); // [11] Add right child to queue',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Visit every node level by level (BFS)',
                'using System.Collections.Generic;',
                '',
                'void LevelOrder(Node root) {',
                '',
                '    if (root == null) { // [2] If the tree is empty',
                '        return; // [3] Nothing to traverse',
                '    }',
                '',
                '    Queue<Node> queue = new Queue<Node>();',
                '    queue.Enqueue(root); // [4] Initialize queue with root node',
                '',
                '    while (queue.Count > 0) { // [5] Process all nodes',
                '        Node node = queue.Dequeue(); // [6] Remove front of queue',
                '        Visit(node); // [7] Visit the current node',
                '',
                '        if (node.Left != null) { // [8] If left child exists',
                '            queue.Enqueue(node.Left); // [9] Add left child to queue',
                '        }',
                '        if (node.Right != null) { // [10] If right child exists',
                '            queue.Enqueue(node.Right); // [11] Add right child to queue',
                '        }',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Visit every node level by level (BFS)',
                'function levelOrder(root: Node | null): void {',
                '',
                '    if (root === null) { // [2] If the tree is empty',
                '        return; // [3] Nothing to traverse',
                '    }',
                '',
                '    const queue: Node[] = [root]; // [4] Initialize queue with root node',
                '',
                '    while (queue.length > 0) { // [5] Process all nodes',
                '        const node = queue.shift()!; // [6] Remove front of queue',
                '        visit(node); // [7] Visit the current node',
                '',
                '        if (node.left !== null) { // [8] If left child exists',
                '            queue.push(node.left); // [9] Add left child to queue',
                '        }',
                '        if (node.right !== null) { // [10] If right child exists',
                '            queue.push(node.right); // [11] Add right child to queue',
                '        }',
                '    }',
                '}',
            ],
            go: [
                '// Step 1: Visit every node level by level (BFS)',
                'func levelOrder(root *Node) {',
                '',
                '    if root == nil { // [2] If the tree is empty',
                '        return // [3] Nothing to traverse',
                '    }',
                '',
                '    queue := []*Node{root} // [4] Initialize queue with root node',
                '',
                '    for len(queue) > 0 { // [5] Process all nodes',
                '        node := queue[0]',
                '        queue = queue[1:] // [6] Remove front of queue',
                '        visit(node) // [7] Visit the current node',
                '',
                '        if node.Left != nil { // [8] If left child exists',
                '            queue = append(queue, node.Left) // [9] Add left child to queue',
                '        }',
                '        if node.Right != nil { // [10] If right child exists',
                '            queue = append(queue, node.Right) // [11] Add right child to queue',
                '        }',
                '    }',
                '}',
            ],
            rust: [
                '// Step 1: Visit every node level by level (BFS)',
                'use std::collections::VecDeque;',
                '',
                'fn level_order(root: &Option<Box<Node>>) {',
                '',
                '    let root = match root {',
                '        None => return, // [2] If the tree is empty',
                '                         // [3] Nothing to traverse',
                '        Some(r) => r,',
                '    };',
                '',
                '    let mut queue: VecDeque<*Node> = VecDeque::new();',
                '    queue.push_back(root); // [4] Initialize queue with root node',
                '',
                '    while !queue.is_empty() { // [5] Process all nodes',
                '        let node = queue.pop_front().unwrap(); // [6] Remove front of queue',
                '        visit(node); // [7] Visit the current node',
                '',
                '        if let Some(left) = &node.left { // [8] If left child exists',
                '            queue.push_back(left); // [9] Add left child to queue',
                '        }',
                '        if let Some(right) = &node.right { // [10] If right child exists',
                '            queue.push_back(right); // [11] Add right child to queue',
                '        }',
                '    }',
                '}',
            ],
        },
    };

    // ─── Level-Order Traversal Complexity Information ───

    const LEVEL_ORDER_COMPLEXITY = {
        bstLevelOrder: {
            name: 'Level-Order Traversal',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(n)',
            description:
                'Use a queue to visit nodes level by level, starting from the root. ' +
                'Enqueue the root, then repeatedly dequeue a node, visit it, and enqueue its children. ' +
                'This processes all nodes at depth d before any nodes at depth d+1. ' +
                'Every node is visited exactly once, so time is always O(n). ' +
                'Space is O(n) for the queue in a full tree at the last level.',
            useCase:
                'Use when you need to process nodes level by level. ' +
                'Perfect for finding the shortest path in unweighted graphs, ' +
                'printing tree by level, or implementing BFS algorithms. ' +
                'Also useful for finding the minimum depth or level of a node.',
            avoid:
                'Avoid when you need depth-first operations or when memory is constrained. ' +
                'The queue can use significant space for wide trees. ' +
                'For simple printing without level information, pre-order may be more memory efficient.',
            realWorld:
                'Used in social network friend recommendations (find connections at distance N), web crawler scheduling ' +
                '(process pages by depth), and multiplayer game matchmaking (find players at similar skill levels). ' +
                'Powers the "Find Nearest" feature in location services, the shortest path in unweighted graphs (maze solving), ' +
                'and the breadth-first component labeling in image processing.',
            mentalModel:
                'Like reading a book page by page from top to bottom. You visit all nodes at level 1, then all at level 2, etc.',
            difficulty: 'Easy',
            patterns: ['Binary Tree Traversal', 'BFS', 'Trees'],
            leetcodeTags: ['tree', 'traversal', 'bfs', 'level-order', 'easy', 'interview-common']
        },
    };

    /**
     * Level-order (BFS) traversal generator.
     *
     * @param {object|null} root - The root of the BST.
     * @yields {{ type: string, nodeId: number, codeLine: number }}
     */
    function* bstLevelOrder(root) {
        if (root === null) {
            return;
        }

        const queue = [root];

        while (queue.length > 0) {
            const node = queue.shift();
            yield { type: 'visit', nodeId: node.id, codeLine: 7 };

            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    // ─── Heap Helper Functions ───

    /**
     * Convert a heap array (0-indexed) to a binary tree structure for visualization.
     *
     * @param {number[]} heap - The heap array.
     * @returns {object|null} The root node of the tree representation.
     */
    function heapToTree(heap) {
        if (!heap || heap.length === 0) return null;

        let heapIdCounter = nodeIdCounter;

        function buildNode(index) {
            if (index >= heap.length) return null;
            const node = { value: heap[index], left: null, right: null, id: heapIdCounter++ };
            node.left = buildNode(2 * index + 1);
            node.right = buildNode(2 * index + 2);
            return node;
        }

        return buildNode(0);
    }

    /**
     * Build a sample heap from an array of values.
     *
     * @param {number[]} values - Values to insert.
     * @param {string} type - 'min' or 'max' heap.
     * @returns {{heap: number[], tree: object|null}} The heap array and its tree representation.
     */
    function buildSampleHeap(values, type = 'min') {
        resetIds();
        const heap = [];
        for (const v of values) {
            heapInsertHelper(heap, v, type);
        }
        const tree = heapToTree(heap);
        return { heap, tree };
    }

    /**
     * Non-generator heap insert helper (for building heaps without visualization).
     *
     * @param {number[]} heap - The heap array.
     * @param {number} value - Value to insert.
     * @param {string} type - 'min' or 'max' heap.
     * @returns {void}
     */
    function heapInsertHelper(heap, value, type = 'min') {
        heap.push(value);
        let index = heap.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if ((type === 'min' && heap[parentIndex] <= heap[index]) ||
                (type === 'max' && heap[parentIndex] >= heap[index])) {
                break;
            }
            [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
            index = parentIndex;
        }
    }

    /**
     * Non-generator heap extract helper (for building heaps without visualization).
     *
     * @param {number[]} heap - The heap array.
     * @param {string} type - 'min' or 'max' heap.
     * @returns {number|null} The extracted value.
     */
    function heapExtractHelper(heap, type = 'min') {
        if (heap.length === 0) return null;

        const result = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.pop();

        let index = 0;
        const length = heap.length;

        while (true) {
            let bestIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < length) {
                if ((type === 'min' && heap[leftChild] < heap[bestIndex]) ||
                    (type === 'max' && heap[leftChild] > heap[bestIndex])) {
                    bestIndex = leftChild;
                }
            }

            if (rightChild < length) {
                if ((type === 'min' && heap[rightChild] < heap[bestIndex]) ||
                    (type === 'max' && heap[rightChild] > heap[bestIndex])) {
                    bestIndex = rightChild;
                }
            }

            if (bestIndex === index) break;
            [heap[index], heap[bestIndex]] = [heap[bestIndex], heap[index]];
            index = bestIndex;
        }

        return result;
    }

    // ─── Heap Algorithm Code Snippets ───

    const HEAP_CODE = {
        heapInsertMin: {
            pseudo: [
                '# Step 1: Insert a value into a Min-Heap',
                'procedure heapInsert(heap, value):',
                '',
                '    heap.push(value)  # [2] Add value to the end',
                '    index = heap.length - 1  # [3] Start from the new node',
                '',
                '    while index > 0:  # [4] Bubble up until reaching root',
                '        parent = floor((index - 1) / 2)  # [5] Find parent index',
                '        if heap[parent] <= heap[index]:  # [6] If parent is smaller or equal',
                '            break  # [7] Heap property is satisfied, stop',
                '        swap(heap[parent], heap[index])  # [8] Swap with parent',
                '        index = parent  # [9] Continue from parent position',
            ],
            python: [
                '# Step 1: Insert a value into a Min-Heap',
                'def heap_insert(heap: List[int], value: int) -> None:',
                '',
                '    heap.append(value)  # [2] Add value to the end',
                '    index = len(heap) - 1  # [3] Start from the new node',
                '',
                '    while index > 0:  # [4] Bubble up until reaching root',
                '        parent = (index - 1) // 2  # [5] Find parent index',
                '        if heap[parent] <= heap[index]:  # [6] If parent is smaller or equal',
                '            break  # [7] Heap property is satisfied, stop',
                '        heap[parent], heap[index] = heap[index], heap[parent]  # [8] Swap with parent',
                '        index = parent  # [9] Continue from parent position',
            ],
            java: [
                '// Step 1: Insert a value into a Min-Heap',
                'void heapInsert(int[] heap, int value) {',
                '',
                '    heap[heap.length] = value; // [2] Add value to the end (assuming dynamic array)',
                '    int index = heap.length - 1; // [3] Start from the new node',
                '',
                '    while (index > 0) { // [4] Bubble up until reaching root',
                '        int parent = (index - 1) / 2; // [5] Find parent index',
                '        if (heap[parent] <= heap[index]) { // [6] If parent is smaller or equal',
                '            break; // [7] Heap property is satisfied, stop',
                '        }',
                '        swap(heap[parent], heap[index]); // [8] Swap with parent',
                '        index = parent; // [9] Continue from parent position',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Insert a value into a Min-Heap',
                'void heapInsert(int* heap, int* size, int value, int capacity) {',
                '',
                '    heap[*size] = value; // [2] Add value to the end',
                '    int index = *size; // [3] Start from the new node',
                '    (*size)++;',
                '',
                '    while (index > 0) { // [4] Bubble up until reaching root',
                '        int parent = (index - 1) / 2; // [5] Find parent index',
                '        if (heap[parent] <= heap[index]) { // [6] If parent is smaller or equal',
                '            break; // [7] Heap property is satisfied, stop',
                '        }',
                '        int temp = heap[parent];',
                '        heap[parent] = heap[index]; // [8] Swap with parent',
                '        heap[index] = temp;',
                '        index = parent; // [9] Continue from parent position',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Insert a value into a Min-Heap',
                'void HeapInsert(int[] heap, int value, ref int size) {',
                '',
                '    heap[size] = value; // [2] Add value to the end',
                '    int index = size; // [3] Start from the new node',
                '    size++;',
                '',
                '    while (index > 0) { // [4] Bubble up until reaching root',
                '        int parent = (index - 1) / 2; // [5] Find parent index',
                '        if (heap[parent] <= heap[index]) { // [6] If parent is smaller or equal',
                '            break; // [7] Heap property is satisfied, stop',
                '        }',
                '        int temp = heap[parent];',
                '        heap[parent] = heap[index]; // [8] Swap with parent',
                '        heap[index] = temp;',
                '        index = parent; // [9] Continue from parent position',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Insert a value into a Min-Heap',
                'function heapInsert(heap: number[], value: number): void {',
                '',
                '    heap.push(value); // [2] Add value to the end',
                '    let index = heap.length - 1; // [3] Start from the new node',
                '',
                '    while (index > 0) { // [4] Bubble up until reaching root',
                '        const parent = Math.floor((index - 1) / 2); // [5] Find parent index',
                '        if (heap[parent] <= heap[index]) { // [6] If parent is smaller or equal',
                '            break; // [7] Heap property is satisfied, stop',
                '        }',
                '        [heap[parent], heap[index]] = [heap[index], heap[parent]]; // [8] Swap with parent',
                '        index = parent; // [9] Continue from parent position',
                '    }',
                '}',
            ],
            go: [
                '// Step 1: Insert a value into a Min-Heap',
                'func heapInsert(heap []int, value int) []int {',
                '',
                '    heap = append(heap, value) // [2] Add value to the end',
                '    index := len(heap) - 1 // [3] Start from the new node',
                '',
                '    for index > 0 { // [4] Bubble up until reaching root',
                '        parent := (index - 1) / 2 // [5] Find parent index',
                '        if heap[parent] <= heap[index] { // [6] If parent is smaller or equal',
                '            break // [7] Heap property is satisfied, stop',
                '        }',
                '        heap[parent], heap[index] = heap[index], heap[parent] // [8] Swap with parent',
                '        index = parent // [9] Continue from parent position',
                '    }',
                '    return heap',
                '}',
            ],
            rust: [
                '// Step 1: Insert a value into a Min-Heap',
                'fn heap_insert(heap: &mut Vec<i32>, value: i32) {',
                '',
                '    heap.push(value); // [2] Add value to the end',
                '    let mut index = heap.len() - 1; // [3] Start from the new node',
                '',
                '    while index > 0 { // [4] Bubble up until reaching root',
                '        let parent = (index - 1) / 2; // [5] Find parent index',
                '        if heap[parent] <= heap[index] { // [6] If parent is smaller or equal',
                '            break; // [7] Heap property is satisfied, stop',
                '        }',
                '        heap.swap(parent, index); // [8] Swap with parent',
                '        index = parent; // [9] Continue from parent position',
                '    }',
                '}',
            ],
        },

        heapExtractMin: {
            pseudo: [
                '# Step 1: Extract minimum value from Min-Heap',
                'procedure heapExtract(heap):',
                '',
                '    if heap is empty:  # [2] Heap has no elements',
                '        return null  # [3] Cannot extract from empty heap',
                '',
                '    result = heap[0]  # [4] Save the minimum value',
                '    heap[0] = heap[heap.length - 1]  # [5] Move last element to root',
                '    heap.pop()  # [6] Remove the last element',
                '    index = 0  # [7] Start from root',
                '',
                '    while true:  # [8] Bubble down until heap property holds',
                '        left = 2 * index + 1  # [9] Left child index',
                '        right = 2 * index + 2  # [10] Right child index',
                '        smallest = index  # [11] Assume current is smallest',
                '',
                '        if left < heap.length and heap[left] < heap[smallest]:  # [12] Left child is smaller',
                '            smallest = left  # [13] Update smallest index',
                '        if right < heap.length and heap[right] < heap[smallest]:  # [14] Right child is smaller',
                '            smallest = right  # [15] Update smallest index',
                '',
                '        if smallest == index:  # [16] Heap property satisfied',
                '            break  # [17] Stop bubbling down',
                '        swap(heap[index], heap[smallest])  # [18] Swap with smallest child',
                '        index = smallest  # [19] Continue from child position',
                '',
                '    return result  # [20] Return the minimum value',
            ],
            python: [
                '# Step 1: Extract minimum value from Min-Heap',
                'def heap_extract(heap: List[int]) -> Optional[int]:',
                '',
                '    if not heap:  # [2] Heap has no elements',
                '        return None  # [3] Cannot extract from empty heap',
                '',
                '    result = heap[0]  # [4] Save the minimum value',
                '    heap[0] = heap[-1]  # [5] Move last element to root',
                '    heap.pop()  # [6] Remove the last element',
                '    index = 0  # [7] Start from root',
                '',
                '    while True:  # [8] Bubble down until heap property holds',
                '        left = 2 * index + 1  # [9] Left child index',
                '        right = 2 * index + 2  # [10] Right child index',
                '        smallest = index  # [11] Assume current is smallest',
                '',
                '        if left < len(heap) and heap[left] < heap[smallest]:  # [12] Left child is smaller',
                '            smallest = left  # [13] Update smallest index',
                '        if right < len(heap) and heap[right] < heap[smallest]:  # [14] Right child is smaller',
                '            smallest = right  # [15] Update smallest index',
                '',
                '        if smallest == index:  # [16] Heap property satisfied',
                '            break  # [17] Stop bubbling down',
                '        heap[index], heap[smallest] = heap[smallest], heap[index]  # [18] Swap with smallest child',
                '        index = smallest  # [19] Continue from child position',
                '',
                '    return result  # [20] Return the minimum value',
            ],
            java: [
                '// Step 1: Extract minimum value from Min-Heap',
                'int heapExtract(int[] heap, int[] size) {',
                '',
                '    if (size[0] == 0) { // [2] Heap has no elements',
                '        return -1; // [3] Cannot extract from empty heap',
                '    }',
                '',
                '    int result = heap[0]; // [4] Save the minimum value',
                '    heap[0] = heap[size[0] - 1]; // [5] Move last element to root',
                '    size[0]--; // [6] Decrease size',
                '    int index = 0; // [7] Start from root',
                '',
                '    while (true) { // [8] Bubble down until heap property holds',
                '        int left = 2 * index + 1; // [9] Left child index',
                '        int right = 2 * index + 2; // [10] Right child index',
                '        int smallest = index; // [11] Assume current is smallest',
                '',
                '        if (left < size[0] && heap[left] < heap[smallest]) { // [12] Left child is smaller',
                '            smallest = left; // [13] Update smallest index',
                '        }',
                '        if (right < size[0] && heap[right] < heap[smallest]) { // [14] Right child is smaller',
                '            smallest = right; // [15] Update smallest index',
                '        }',
                '',
                '        if (smallest == index) { // [16] Heap property satisfied',
                '            break; // [17] Stop bubbling down',
                '        }',
                '        swap(heap[index], heap[smallest]); // [18] Swap with smallest child',
                '        index = smallest; // [19] Continue from child position',
                '    }',
                '',
                '    return result; // [20] Return the minimum value',
                '}',
            ],
            c: [
                '// Step 1: Extract minimum value from Min-Heap',
                'int heapExtract(int* heap, int* size) {',
                '',
                '    if (*size == 0) { // [2] Heap has no elements',
                '        return -1; // [3] Cannot extract from empty heap',
                '    }',
                '',
                '    int result = heap[0]; // [4] Save the minimum value',
                '    heap[0] = heap[*size - 1]; // [5] Move last element to root',
                '    (*size)--; // [6] Decrease size',
                '    int index = 0; // [7] Start from root',
                '',
                '    while (1) { // [8] Bubble down until heap property holds',
                '        int left = 2 * index + 1; // [9] Left child index',
                '        int right = 2 * index + 2; // [10] Right child index',
                '        int smallest = index; // [11] Assume current is smallest',
                '',
                '        if (left < *size && heap[left] < heap[smallest]) { // [12] Left child is smaller',
                '            smallest = left; // [13] Update smallest index',
                '        }',
                '        if (right < *size && heap[right] < heap[smallest]) { // [14] Right child is smaller',
                '            smallest = right; // [15] Update smallest index',
                '        }',
                '',
                '        if (smallest == index) { // [16] Heap property satisfied',
                '            break; // [17] Stop bubbling down',
                '        }',
                '        int temp = heap[index];',
                '        heap[index] = heap[smallest]; // [18] Swap with smallest child',
                '        heap[smallest] = temp;',
                '        index = smallest; // [19] Continue from child position',
                '    }',
                '',
                '    return result; // [20] Return the minimum value',
                '}',
            ],
            csharp: [
                '// Step 1: Extract minimum value from Min-Heap',
                'int HeapExtract(int[] heap, ref int size) {',
                '',
                '    if (size == 0) { // [2] Heap has no elements',
                '        return -1; // [3] Cannot extract from empty heap',
                '    }',
                '',
                '    int result = heap[0]; // [4] Save the minimum value',
                '    heap[0] = heap[size - 1]; // [5] Move last element to root',
                '    size--; // [6] Decrease size',
                '    int index = 0; // [7] Start from root',
                '',
                '    while (true) { // [8] Bubble down until heap property holds',
                '        int left = 2 * index + 1; // [9] Left child index',
                '        int right = 2 * index + 2; // [10] Right child index',
                '        int smallest = index; // [11] Assume current is smallest',
                '',
                '        if (left < size && heap[left] < heap[smallest]) { // [12] Left child is smaller',
                '            smallest = left; // [13] Update smallest index',
                '        }',
                '        if (right < size && heap[right] < heap[smallest]) { // [14] Right child is smaller',
                '            smallest = right; // [15] Update smallest index',
                '        }',
                '',
                '        if (smallest == index) { // [16] Heap property satisfied',
                '            break; // [17] Stop bubbling down',
                '        }',
                '        int temp = heap[index];',
                '        heap[index] = heap[smallest]; // [18] Swap with smallest child',
                '        heap[smallest] = temp;',
                '        index = smallest; // [19] Continue from child position',
                '    }',
                '',
                '    return result; // [20] Return the minimum value',
                '}',
            ],
            typescript: [
                '// Step 1: Extract minimum value from Min-Heap',
                'function heapExtract(heap: number[]): number | null {',
                '',
                '    if (heap.length === 0) { // [2] Heap has no elements',
                '        return null; // [3] Cannot extract from empty heap',
                '    }',
                '',
                '    const result = heap[0]; // [4] Save the minimum value',
                '    heap[0] = heap[heap.length - 1]; // [5] Move last element to root',
                '    heap.pop(); // [6] Remove the last element',
                '    let index = 0; // [7] Start from root',
                '',
                '    while (true) { // [8] Bubble down until heap property holds',
                '        const left = 2 * index + 1; // [9] Left child index',
                '        const right = 2 * index + 2; // [10] Right child index',
                '        let smallest = index; // [11] Assume current is smallest',
                '',
                '        if (left < heap.length && heap[left] < heap[smallest]) { // [12] Left child is smaller',
                '            smallest = left; // [13] Update smallest index',
                '        }',
                '        if (right < heap.length && heap[right] < heap[smallest]) { // [14] Right child is smaller',
                '            smallest = right; // [15] Update smallest index',
                '        }',
                '',
                '        if (smallest === index) { // [16] Heap property satisfied',
                '            break; // [17] Stop bubbling down',
                '        }',
                '        [heap[index], heap[smallest]] = [heap[smallest], heap[index]]; // [18] Swap with smallest child',
                '        index = smallest; // [19] Continue from child position',
                '    }',
                '',
                '    return result; // [20] Return the minimum value',
                '}',
            ],
            go: [
                '// Step 1: Extract minimum value from Min-Heap',
                'func heapExtract(heap []int) ([]int, int) {',
                '',
                '    if len(heap) == 0 { // [2] Heap has no elements',
                '        return heap, -1 // [3] Cannot extract from empty heap',
                '    }',
                '',
                '    result := heap[0] // [4] Save the minimum value',
                '    heap[0] = heap[len(heap)-1] // [5] Move last element to root',
                '    heap = heap[:len(heap)-1] // [6] Remove the last element',
                '    index := 0 // [7] Start from root',
                '',
                '    for { // [8] Bubble down until heap property holds',
                '        left := 2*index + 1 // [9] Left child index',
                '        right := 2*index + 2 // [10] Right child index',
                '        smallest := index // [11] Assume current is smallest',
                '',
                '        if left < len(heap) && heap[left] < heap[smallest] { // [12] Left child is smaller',
                '            smallest = left // [13] Update smallest index',
                '        }',
                '        if right < len(heap) && heap[right] < heap[smallest] { // [14] Right child is smaller',
                '            smallest = right // [15] Update smallest index',
                '        }',
                '',
                '        if smallest == index { // [16] Heap property satisfied',
                '            break // [17] Stop bubbling down',
                '        }',
                '        heap[index], heap[smallest] = heap[smallest], heap[index] // [18] Swap with smallest child',
                '        index = smallest // [19] Continue from child position',
                '    }',
                '',
                '    return heap, result // [20] Return the minimum value',
                '}',
            ],
            rust: [
                '// Step 1: Extract minimum value from Min-Heap',
                'fn heap_extract(heap: &mut Vec<i32>) -> Option<i32> {',
                '',
                '    if heap.is_empty() { // [2] Heap has no elements',
                '        return None; // [3] Cannot extract from empty heap',
                '    }',
                '',
                '    let result = heap[0]; // [4] Save the minimum value',
                '    heap[0] = heap[heap.len() - 1]; // [5] Move last element to root',
                '    heap.pop(); // [6] Remove the last element',
                '    let mut index = 0; // [7] Start from root',
                '',
                '    loop { // [8] Bubble down until heap property holds',
                '        let left = 2 * index + 1; // [9] Left child index',
                '        let right = 2 * index + 2; // [10] Right child index',
                '        let mut smallest = index; // [11] Assume current is smallest',
                '',
                '        if left < heap.len() && heap[left] < heap[smallest] { // [12] Left child is smaller',
                '            smallest = left; // [13] Update smallest index',
                '        }',
                '        if right < heap.len() && heap[right] < heap[smallest] { // [14] Right child is smaller',
                '            smallest = right; // [15] Update smallest index',
                '        }',
                '',
                '        if smallest == index { // [16] Heap property satisfied',
                '            break; // [17] Stop bubbling down',
                '        }',
                '        heap.swap(index, smallest); // [18] Swap with smallest child',
                '        index = smallest; // [19] Continue from child position',
                '    }',
                '',
                '    Some(result) // [20] Return the minimum value',
                '}',
            ],
        },
    };

    // ─── Heap Complexity Information ───

    const HEAP_COMPLEXITY = {
        heapInsertMin: {
            name: 'Min-Heap Insert',
            best: 'O(1)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(1)',
            description:
                'Add the new element at the end of the heap array, then bubble it up by ' +
                'comparing with its parent and swapping if it is smaller (for min-heap) or larger (for max-heap). ' +
                'The bubbling continues until the heap property is restored or the root is reached. ' +
                'Best case is O(1) when the new element is already in the correct position.',
            useCase:
                'Use when building a priority queue or when you need efficient access to the minimum element. ' +
                'Essential for implementing Dijkstra\'s shortest path, Huffman coding, and heap sort. ' +
                'Also used in scheduling algorithms and event-driven simulations.',
            avoid:
                'Avoid when you need fast search or deletion of arbitrary elements. ' +
                'Heaps are optimized for root access, not for arbitrary lookups. ' +
                'For balanced search operations, use a BST or balanced tree instead.',
            realWorld:
                'Used in priority queue implementations: operating system process schedulers, event-driven simulations, ' +
                'Dijkstra\'s shortest path algorithm, and Huffman coding for data compression. ' +
                'Powers the "next smallest element" extraction in streaming algorithms, the merge step in external sorting, ' +
                'and the task scheduler in real-time operating systems.',
            mentalModel:
                'Like a priority queue where the most important item (smallest for min-heap) always floats to the top.',
            difficulty: 'Medium',
            patterns: ['Top K Elements', 'Heaps', 'Priority Queue'],
            leetcodeTags: ['heap', 'priority-queue', 'top-k', 'medium', 'interview-common']
        },
        heapExtractMin: {
            name: 'Min-Heap Extract',
            best: 'O(log n)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(1)',
            description:
                'Save the root (minimum for min-heap, maximum for max-heap), replace it with the last element, ' +
                'then bubble down by comparing with children and swapping with the smaller (or larger) child. ' +
                'The bubbling continues until the heap property is restored or a leaf is reached. ' +
                'Always takes O(log n) since we may need to traverse from root to leaf.',
            useCase:
                'Use when repeatedly extracting the minimum (or maximum) element in order. ' +
                'Critical for priority queue operations, sorting with heap sort, and algorithms ' +
                'that process elements in order of priority like Dijkstra or Prim\'s MST.',
            avoid:
                'Avoid when you need to preserve all elements. Extract removes the root element permanently. ' +
                'For peeking at the minimum without removing, use a different data structure ' +
                'or add a separate peek operation. Not suitable for maintaining a sorted list of all elements.',
            realWorld:
                'Used in scheduling the next task in operating systems (always pick the highest priority), ' +
                'in Dijkstra\'s algorithm for processing the closest unvisited node, in Huffman coding for building ' +
                'the compression tree, and in streaming median algorithms. Powers the "pop minimum" operation that makes ' +
                'heaps essential for greedy algorithms.',
            mentalModel:
                'Like taking the top card from a deck. After removing it, you reorganize the deck so the next smallest card is on top.',
            difficulty: 'Medium',
            patterns: ['Top K Elements', 'Heaps', 'Priority Queue'],
            leetcodeTags: ['heap', 'priority-queue', 'top-k', 'medium', 'interview-common']
        },
    };

    // ─── Heap Algorithm Generators ───

    /**
     * Heap Insert generator for visualization.
     *
     * @param {number[]} heap - The heap array.
     * @param {number} value - Value to insert.
     * @param {string} type - 'min' or 'max' heap.
     * @yields {{ type: string, indices: number[], codeLine: number, value?: number }}
     * @returns {number[]} The updated heap array.
     */
    function* heapInsert(heap, value, type = 'min') {
        heap.push(value);
        yield { type: 'insert', indices: [heap.length - 1], codeLine: 2, value };

        let index = heap.length - 1;

        while (index > 0) {
            yield { type: 'compare', indices: [index, (index - 1) / 2 | 0], codeLine: 4 };

            const parentIndex = Math.floor((index - 1) / 2);
            const shouldBreak = (type === 'min' && heap[parentIndex] <= heap[index]) ||
                            (type === 'max' && heap[parentIndex] >= heap[index]);

            if (shouldBreak) {
                yield { type: 'check', indices: [index], codeLine: 7 };
                break;
            }

            yield { type: 'swap', indices: [parentIndex, index], codeLine: 8, values: [heap[parentIndex], heap[index]] };
            [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
            index = parentIndex;
            yield { type: 'visit', indices: [index], codeLine: 9 };
        }

        return heap;
    }

    /**
     * Heap Extract generator for visualization.
     *
     * @param {number[]} heap - The heap array.
     * @param {string} type - 'min' or 'max' heap.
     * @yields {{ type: string, indices: number[], codeLine: number, value?: number }}
     * @returns {{ heap: number[], extracted: number|null }} The updated heap and extracted value.
     */
    function* heapExtract(heap, type = 'min') {
        if (heap.length === 0) {
            yield { type: 'notFound', indices: [-1], codeLine: 3 };
            return { heap, extracted: null };
        }

        const result = heap[0];
        yield { type: 'found', indices: [0], codeLine: 4, value: result };

        heap[0] = heap[heap.length - 1];
        heap.pop();
        yield { type: 'overwrite', indices: [0], codeLine: 6, value: heap[0] };

        let index = 0;
        const length = heap.length;

        while (length > 0) {
            yield { type: 'visit', indices: [index], codeLine: 8 };

            let bestIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            yield { type: 'compare', indices: [index, leftChild], codeLine: 9 };

            if (leftChild < length) {
                if ((type === 'min' && heap[leftChild] < heap[bestIndex]) ||
                    (type === 'max' && heap[leftChild] > heap[bestIndex])) {
                    yield { type: 'compare', indices: [bestIndex, leftChild], codeLine: 12 };
                    bestIndex = leftChild;
                }
            }

            if (rightChild < length) {
                if ((type === 'min' && heap[rightChild] < heap[bestIndex]) ||
                    (type === 'max' && heap[rightChild] > heap[bestIndex])) {
                    yield { type: 'compare', indices: [bestIndex, rightChild], codeLine: 14 };
                    bestIndex = rightChild;
                }
            }

            if (bestIndex === index) {
                yield { type: 'check', indices: [index], codeLine: 17 };
                break;
            }

            yield { type: 'swap', indices: [index, bestIndex], codeLine: 18, values: [heap[index], heap[bestIndex]] };
            [heap[index], heap[bestIndex]] = [heap[bestIndex], heap[index]];
            index = bestIndex;
        }

        return { heap, extracted: result };
    }

    // ─── Public API ───

    return {
        CODE,
        COMPLEXITY,
        createNode,
        resetIds,
        getValues,
        buildSampleBST,
        bstInsert,
        bstSearch,
        bstInorder,
        bstPreorder,
        bstPostorder,
        bstDelete,
        avlInsert,
        bstLevelOrder,
        countNodes,
        buildSampleHeap,
        heapToTree,
        heapInsert,
        heapExtract,
        HEAP_CODE,
        HEAP_COMPLEXITY,
        LEVEL_ORDER_CODE,
        LEVEL_ORDER_COMPLEXITY,
    };
})();

export default TreeAlgorithms;
