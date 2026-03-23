/**
 * Linked List algorithm generators.
 *
 * Each algorithm is a generator function that yields step objects:
 * { type: 'visit'|'compare'|'insert'|'delete'|'found'|'notFound', nodeId: number, codeLine: number }
 */

const LinkedListAlgorithms = (() => {

    let nodeIdCounter = 0;

    function createNode(value) {
        return { value, next: null, id: nodeIdCounter++ };
    }

    function resetIds() {
        nodeIdCounter = 0;
    }

    function createNodeWithValueAndId(value, id) {
        return { value, next: null, id };
    }

    // ─── Code Snippets ───

    const CODE = {
        llInsertHead: {
            pseudo: [
                '# Step 1: Insert a new node at the head of the list',
                'procedure insertAtHead(head, value):',
                '',
                '    newNode = Node(value)  # [2] Create a new node with the value',
                '    newNode.next = head  # [3] Point new node to current head',
                '    return newNode  # [4] Return new node as new head',
            ],
            python: [
                '# Step 1: Insert a new node at the head of the list',
                'def insert_at_head(head: Optional[Node], value: int) -> Node:',
                '',
                '    new_node = Node(value)  # [2] Create a new node with the value',
                '    new_node.next = head  # [3] Point new node to current head',
                '    return new_node  # [4] Return new node as new head',
            ],
            java: [
                '// Step 1: Insert a new node at the head of the list',
                'Node insertAtHead(Node head, int value) {',
                '',
                '    Node newNode = new Node(value);  // [2] Create a new node with the value',
                '    newNode.next = head;  // [3] Point new node to current head',
                '    return newNode;  // [4] Return new node as new head',
                '}',
            ],
            c: [
                '// Step 1: Insert a new node at the head of the list',
                'struct Node* insertAtHead(struct Node* head, int value) {',
                '',
                '    struct Node* newNode = createNode(value);  // [2] Create a new node with the value',
                '    newNode->next = head;  // [3] Point new node to current head',
                '    return newNode;  // [4] Return new node as new head',
                '}',
            ],
            csharp: [
                '// Step 1: Insert a new node at the head of the list',
                'Node InsertAtHead(Node head, int value) {',
                '',
                '    Node newNode = new Node(value);  // [2] Create a new node with the value',
                '    newNode.Next = head;  // [3] Point new node to current head',
                '    return newNode;  // [4] Return new node as new head',
                '}',
            ],
            javascript: [
                '// Step 1: Insert a new node at the head of the list',
                'function insertAtHead(head, value) {',
                '',
                '    const newNode = createNode(value);  // [2] Create a new node with the value',
                '    newNode.next = head;  // [3] Point new node to current head',
                '    return newNode;  // [4] Return new node as new head',
                '}',
            ],
            typescript: [
                '// Step 1: Insert a new node at the head of the list',
                'function insertAtHead(head: Node | null, value: number): Node {',
                '',
                '    const newNode = createNode(value);  // [2] Create a new node with the value',
                '    newNode.next = head;  // [3] Point new node to current head',
                '    return newNode;  // [4] Return new node as new head',
                '}',
            ],
            go: [
                '// Step 1: Insert a new node at the head of the list',
                'func insertAtHead(head *Node, value int) *Node {',
                '',
                '    newNode := Node{Value: value, Next: head}  // [2] Create a new node with the value',
                '    return newNode  // [3] Return new node as new head',
                '}',
            ],
            rust: [
                '// Step 1: Insert a new node at the head of the list',
                'fn insert_at_head(head: Option<Box<Node>>, value: i32) -> Box<Node> {',
                '',
                '    Box::new(Node { value, next: head })  // [2] Create a new node with the value',
                '}',
            ],
        },

        llDeleteHead: {
            pseudo: [
                '# Step 1: Delete the head node of the list',
                'procedure deleteHead(head):',
                '',
                '    if head is null:  # [2] If list is empty, nothing to delete',
                '        return null  # [3] Return null',
                '    return head.next  # [4] Return the second node as new head',
            ],
            python: [
                '# Step 1: Delete the head node of the list',
                'def delete_head(head: Optional[Node]) -> Optional[Node]:',
                '',
                '    if head is None:  # [2] If list is empty, nothing to delete',
                '        return None  # [3] Return null',
                '    return head.next  # [4] Return the second node as new head',
            ],
            java: [
                '// Step 1: Delete the head node of the list',
                'Node deleteHead(Node head) {',
                '',
                '    if (head == null) {  // [2] If list is empty, nothing to delete',
                '        return null;  // [3] Return null',
                '    }',
                '    return head.next;  // [4] Return the second node as new head',
                '}',
            ],
            c: [
                '// Step 1: Delete the head node of the list',
                'struct Node* deleteHead(struct Node* head) {',
                '',
                '    if (head == NULL) {  // [2] If list is empty, nothing to delete',
                '        return NULL;  // [3] Return null',
                '    }',
                '    return head->next;  // [4] Return the second node as new head',
                '}',
            ],
            csharp: [
                '// Step 1: Delete the head node of the list',
                'Node DeleteHead(Node head) {',
                '',
                '    if (head == null) {  // [2] If list is empty, nothing to delete',
                '        return null;  // [3] Return null',
                '    }',
                '    return head.Next;  // [4] Return the second node as new head',
                '}',
            ],
            javascript: [
                '// Step 1: Delete the head node of the list',
                'function deleteHead(head) {',
                '',
                '    if (head === null) {  // [2] If list is empty, nothing to delete',
                '        return null;  // [3] Return null',
                '    }',
                '    return head.next;  // [4] Return the second node as new head',
                '}',
            ],
            typescript: [
                '// Step 1: Delete the head node of the list',
                'function deleteHead(head: Node | null): Node | null {',
                '',
                '    if (head === null) {  // [2] If list is empty, nothing to delete',
                '        return null;  // [3] Return null',
                '    }',
                '    return head.next;  // [4] Return the second node as new head',
                '}',
            ],
            go: [
                '// Step 1: Delete the head node of the list',
                'func deleteHead(head *Node) *Node {',
                '',
                '    if head == nil {  // [2] If list is empty, nothing to delete',
                '        return nil  // [3] Return null',
                '    }',
                '    return head.Next  // [4] Return the second node as new head',
                '}',
            ],
            rust: [
                '// Step 1: Delete the head node of the list',
                'fn delete_head(head: Option<Box<Node>>) -> Option<Box<Node>> {',
                '',
                '    head.map(|node| node.next)  // [2] Return the second node as new head',
                '}',
            ],
        },

        llSearch: {
            pseudo: [
                '# Step 1: Search for a value in the linked list',
                'procedure searchList(head, value):',
                '',
                '    current = head',
                '    while current is not null:  # [2] Traverse until end of list',
                '        if current.value == value:  # [3] If this node has the value',
                '            return current  # [4] Found it, return this node',
                '        current = current.next  # [5] Move to next node',
                '    return not found  # [6] Value not in list',
            ],
            python: [
                '# Step 1: Search for a value in the linked list',
                'def search_list(head: Optional[Node], value: int) -> Optional[Node]:',
                '',
                '    current = head',
                '    while current is not None:  # [2] Traverse until end of list',
                '        if current.value == value:  # [3] If this node has the value',
                '            return current  # [4] Found it, return this node',
                '        current = current.next  # [5] Move to next node',
                '    return None  # [6] Value not in list',
            ],
            java: [
                '// Step 1: Search for a value in the linked list',
                'Node searchList(Node head, int value) {',
                '',
                '    Node current = head;',
                '    while (current != null) {  // [2] Traverse until end of list',
                '        if (current.value == value) {  // [3] If this node has the value',
                '            return current;  // [4] Found it, return this node',
                '        }',
                '        current = current.next;  // [5] Move to next node',
                '    }',
                '    return null;  // [6] Value not in list',
                '}',
            ],
            c: [
                '// Step 1: Search for a value in the linked list',
                'struct Node* searchList(struct Node* head, int value) {',
                '',
                '    struct Node* current = head;',
                '    while (current != NULL) {  // [2] Traverse until end of list',
                '        if (current->value == value) {  // [3] If this node has the value',
                '            return current;  // [4] Found it, return this node',
                '        }',
                '        current = current->next;  // [5] Move to next node',
                '    }',
                '    return NULL;  // [6] Value not in list',
                '}',
            ],
            csharp: [
                '// Step 1: Search for a value in the linked list',
                'Node SearchList(Node head, int value) {',
                '',
                '    Node current = head;',
                '    while (current != null) {  // [2] Traverse until end of list',
                '        if (current.Value == value) {  // [3] If this node has the value',
                '            return current;  // [4] Found it, return this node',
                '        }',
                '        current = current.Next;  // [5] Move to next node',
                '    }',
                '    return null;  // [6] Value not in list',
                '}',
            ],
            javascript: [
                '// Step 1: Search for a value in the linked list',
                'function searchList(head, value) {',
                '',
                '    let current = head;',
                '    while (current !== null) {  // [2] Traverse until end of list',
                '        if (current.value === value) {  // [3] If this node has the value',
                '            return current;  // [4] Found it, return this node',
                '        }',
                '        current = current.next;  // [5] Move to next node',
                '    }',
                '    return null;  // [6] Value not in list',
                '}',
            ],
            typescript: [
                '// Step 1: Search for a value in the linked list',
                'function searchList(head: Node | null, value: number): Node | null {',
                '',
                '    let current = head;',
                '    while (current !== null) {  // [2] Traverse until end of list',
                '        if (current.value === value) {  // [3] If this node has the value',
                '            return current;  // [4] Found it, return this node',
                '        }',
                '        current = current.next;  // [5] Move to next node',
                '    }',
                '    return null;  // [6] Value not in list',
                '}',
            ],
            go: [
                '// Step 1: Search for a value in the linked list',
                'func searchList(head *Node, value int) *Node {',
                '',
                '    current := head',
                '    for current != nil {  // [2] Traverse until end of list',
                '        if current.Value == value {  // [3] If this node has the value',
                '            return current  // [4] Found it, return this node',
                '        }',
                '        current = current.Next  // [5] Move to next node',
                '    }',
                '    return nil  // [6] Value not in list',
                '}',
            ],
            rust: [
                '// Step 1: Search for a value in the linked list',
                'fn search_list(head: &Option<Box<Node>>, value: i32) -> Option<&Node> {',
                '',
                '    let mut current = head.as_ref();',
                '    while current.is_some() {  // [2] Traverse until end of list',
                '        let node = current.as_ref().unwrap();',
                '        if node.value == value {  // [3] If this node has the value',
                '            return Some(node);  // [4] Found it, return this node',
                '        }',
                '        current = &node.next;  // [5] Move to next node',
                '    }',
                '    None  // [6] Value not in list',
                '}',
            ],
        },

        llTraverse: {
            pseudo: [
                '# Step 1: Visit every node in the linked list',
                'procedure traverseList(head):',
                '',
                '    current = head',
                '    while current is not null:  # [2] Traverse until end of list',
                '        visit(current)  # [3] Visit this node',
                '        current = current.next  # [4] Move to next node',
            ],
            python: [
                '# Step 1: Visit every node in the linked list',
                'def traverse_list(head: Optional[Node]) -> None:',
                '',
                '    current = head',
                '    while current is not None:  # [2] Traverse until end of list',
                '        visit(current)  # [3] Visit this node',
                '        current = current.next  # [4] Move to next node',
            ],
            java: [
                '// Step 1: Visit every node in the linked list',
                'void traverseList(Node head) {',
                '',
                '    Node current = head;',
                '    while (current != null) {  // [2] Traverse until end of list',
                '        visit(current);  // [3] Visit this node',
                '        current = current.next;  // [4] Move to next node',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Visit every node in the linked list',
                'void traverseList(struct Node* head) {',
                '',
                '    struct Node* current = head;',
                '    while (current != NULL) {  // [2] Traverse until end of list',
                '        visit(current);  // [3] Visit this node',
                '        current = current->next;  // [4] Move to next node',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Visit every node in the linked list',
                'void TraverseList(Node head) {',
                '',
                '    Node current = head;',
                '    while (current != null) {  // [2] Traverse until end of list',
                '        Visit(current);  // [3] Visit this node',
                '        current = current.Next;  // [4] Move to next node',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Visit every node in the linked list',
                'function traverseList(head) {',
                '',
                '    let current = head;',
                '    while (current !== null) {  // [2] Traverse until end of list',
                '        visit(current);  // [3] Visit this node',
                '        current = current.next;  // [4] Move to next node',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Visit every node in the linked list',
                'function traverseList(head: Node | null): void {',
                '',
                '    let current = head;',
                '    while (current !== null) {  // [2] Traverse until end of list',
                '        visit(current);  // [3] Visit this node',
                '        current = current.next;  // [4] Move to next node',
                '    }',
                '}',
            ],
            go: [
                '// Step 1: Visit every node in the linked list',
                'func traverseList(head *Node) {',
                '',
                '    current := head',
                '    for current != nil {  // [2] Traverse until end of list',
                '        visit(current)  // [3] Visit this node',
                '        current = current.Next  // [4] Move to next node',
                '    }',
                '}',
            ],
            rust: [
                '// Step 1: Visit every node in the linked list',
                'fn traverse_list(head: &Option<Box<Node>>)',
                '',
                '    let mut current = head.as_ref();',
                '    while current.is_some() {  // [2] Traverse until end of list',
                '        let node = current.as_ref().unwrap();',
                '        visit(node);  // [3] Visit this node',
                '        current = &node.next;  // [4] Move to next node',
                '    }',
                '}',
            ],
        },

        llReverse: {
            pseudo: [
                '# Step 1: Reverse the linked list in place',
                'procedure reverseList(head):',
                '',
                '    prev = null',
                '    current = head',
                '    while current is not null:  # [2] Traverse until end of list',
                '        next = current.next  # [3] Store next node',
                '        current.next = prev  # [4] Reverse pointer',
                '        prev = current  # [5] Move prev forward',
                '        current = next  # [6] Move to next node',
                '    return prev  # [7] Return new head (which was tail)',
            ],
            python: [
                '# Step 1: Reverse the linked list in place',
                'def reverse_list(head: Optional[Node]) -> Optional[Node]:',
                '',
                '    prev = None',
                '    current = head',
                '    while current is not None:  # [2] Traverse until end of list',
                '        next = current.next  # [3] Store next node',
                '        current.next = prev  # [4] Reverse pointer',
                '        prev = current  # [5] Move prev forward',
                '        current = next  # [6] Move to next node',
                '    return prev  # [7] Return new head (which was tail)',
            ],
            java: [
                '// Step 1: Reverse the linked list in place',
                'Node reverseList(Node head) {',
                '',
                '    Node prev = null;',
                '    Node current = head;',
                '    while (current != null) {  // [2] Traverse until end of list',
                '        Node next = current.next;  // [3] Store next node',
                '        current.next = prev;  // [4] Reverse pointer',
                '        prev = current;  // [5] Move prev forward',
                '        current = next;  // [6] Move to next node',
                '    }',
                '    return prev;  // [7] Return new head (which was tail)',
                '}',
            ],
            c: [
                '// Step 1: Reverse the linked list in place',
                'struct Node* reverseList(struct Node* head) {',
                '',
                '    struct Node* prev = NULL;',
                '    struct Node* current = head;',
                '    while (current != NULL) {  // [2] Traverse until end of list',
                '        struct Node* next = current->next;  // [3] Store next node',
                '        current->next = prev;  // [4] Reverse pointer',
                '        prev = current;  // [5] Move prev forward',
                '        current = next;  // [6] Move to next node',
                '    }',
                '    return prev;  // [7] Return new head (which was tail)',
                '}',
            ],
            csharp: [
                '// Step 1: Reverse the linked list in place',
                'Node ReverseList(Node head) {',
                '',
                '    Node prev = null;',
                '    Node current = head;',
                '    while (current != null) {  // [2] Traverse until end of list',
                '        Node next = current.Next;  // [3] Store next node',
                '        current.Next = prev;  // [4] Reverse pointer',
                '        prev = current;  // [5] Move prev forward',
                '        current = next;  // [6] Move to next node',
                '    }',
                '    return prev;  // [7] Return new head (which was tail)',
                '}',
            ],
            javascript: [
                '// Step 1: Reverse the linked list in place',
                'function reverseList(head) {',
                '',
                '    let prev = null;',
                '    let current = head;',
                '    while (current !== null) {  // [2] Traverse until end of list',
                '        const next = current.next;  // [3] Store next node',
                '        current.next = prev;  // [4] Reverse pointer',
                '        prev = current;  // [5] Move prev forward',
                '        current = next;  // [6] Move to next node',
                '    }',
                '    return prev;  // [7] Return new head (which was tail)',
                '}',
            ],
            typescript: [
                '// Step 1: Reverse the linked list in place',
                'function reverseList(head: Node | null): Node | null {',
                '',
                '    let prev = null;',
                '    let current = head;',
                '    while (current !== null) {  // [2] Traverse until end of list',
                '        const next = current.next;  // [3] Store next node',
                '        current.next = prev;  // [4] Reverse pointer',
                '        prev = current;  // [5] Move prev forward',
                '        current = next;  // [6] Move to next node',
                '    }',
                '    return prev;  // [7] Return new head (which was tail)',
                '}',
            ],
            go: [
                '// Step 1: Reverse the linked list in place',
                'func reverseList(head *Node) *Node {',
                '',
                '    var prev *Node = nil',
                '    var current = head',
                '    for current != nil {  // [2] Traverse until end of list',
                '        next := current.Next  // [3] Store next node',
                '        current.Next = prev  // [4] Reverse pointer',
                '        prev = current  // [5] Move prev forward',
                '        current = next  // [6] Move to next node',
                '    }',
                '    return prev  // [7] Return new head (which was tail)',
                '}',
            ],
            rust: [
                '// Step 1: Reverse the linked list in place',
                'fn reverse_list(head: Option<Box<Node>>) -> Option<Box<Node>> {',
                '',
                '    let mut prev: Option<Box<Node>> = None;',
                '    let mut current = head;',
                '    while current.is_some() {  // [2] Traverse until end of list',
                '        let next = current.as_ref().unwrap().next;  // [3] Store next node',
                '        current.as_mut().unwrap().next = prev;  // [4] Reverse pointer',
                '        prev = current;  // [5] Move prev forward',
                '        current = next;  // [6] Move to next node',
                '    }',
                '    prev  // [7] Return new head (which was tail)',
                '}',
            ],
        },

        llInsertTail: {
            pseudo: [
                '# Step 1: Insert a new node at the tail (end) of the list',
                'procedure insertAtTail(head, value):',
                '',
                '    newNode = Node(value)  # [2] Create a new node with the value',
                '',
                '    if head is null:  # [3] If list is empty',
                '        return newNode  # [4] Return new node as head',
                '',
                '    current = head  # [5] Start from head',
                '    while current.next is not null:  # [6] Traverse to the last node',
                '        current = current.next  # [7] Move to next node',
                '    current.next = newNode  # [8] Link last node to new node',
                '    return head  # [9] Return unchanged head',
            ],
            python: [
                '# Step 1: Insert a new node at the tail (end) of the list',
                'def insert_at_tail(head: Optional[Node], value: int) -> Node:',
                '',
                '    new_node = Node(value)  # [2] Create a new node with the value',
                '',
                '    if head is None:  # [3] If list is empty',
                '        return new_node  # [4] Return new node as head',
                '',
                '    current = head  # [5] Start from head',
                '    while current.next is not None:  # [6] Traverse to the last node',
                '        current = current.next  # [7] Move to next node',
                '    current.next = new_node  # [8] Link last node to new node',
                '    return head  # [9] Return unchanged head',
            ],
            java: [
                '// Step 1: Insert a new node at the tail (end) of the list',
                'Node insertAtTail(Node head, int value) {',
                '',
                '    Node newNode = new Node(value);  // [2] Create a new node with the value',
                '',
                '    if (head == null) {  // [3] If list is empty',
                '        return newNode;  // [4] Return new node as head',
                '    }',
                '',
                '    Node current = head;  // [5] Start from head',
                '    while (current.next != null) {  // [6] Traverse to the last node',
                '        current = current.next;  // [7] Move to next node',
                '    }',
                '    current.next = newNode;  // [8] Link last node to new node',
                '    return head;  // [9] Return unchanged head',
                '}',
            ],
            c: [
                '// Step 1: Insert a new node at the tail (end) of the list',
                'struct Node* insertAtTail(struct Node* head, int value) {',
                '',
                '    struct Node* newNode = createNode(value);  // [2] Create a new node with the value',
                '',
                '    if (head == NULL) {  // [3] If list is empty',
                '        return newNode;  // [4] Return new node as head',
                '    }',
                '',
                '    struct Node* current = head;  // [5] Start from head',
                '    while (current->next != NULL) {  // [6] Traverse to the last node',
                '        current = current->next;  // [7] Move to next node',
                '    }',
                '    current->next = newNode;  // [8] Link last node to new node',
                '    return head;  // [9] Return unchanged head',
                '}',
            ],
            csharp: [
                '// Step 1: Insert a new node at the tail (end) of the list',
                'Node InsertAtTail(Node head, int value) {',
                '',
                '    Node newNode = new Node(value);  // [2] Create a new node with the value',
                '',
                '    if (head == null) {  // [3] If list is empty',
                '        return newNode;  // [4] Return new node as head',
                '    }',
                '',
                '    Node current = head;  // [5] Start from head',
                '    while (current.Next != null) {  // [6] Traverse to the last node',
                '        current = current.Next;  // [7] Move to next node',
                '    }',
                '    current.Next = newNode;  // [8] Link last node to new node',
                '    return head;  // [9] Return unchanged head',
                '}',
            ],
            javascript: [
                '// Step 1: Insert a new node at the tail (end) of the list',
                'function insertAtTail(head, value) {',
                '',
                '    const newNode = createNode(value);  // [2] Create a new node with the value',
                '',
                '    if (head === null) {  // [3] If list is empty',
                '        return newNode;  // [4] Return new node as head',
                '    }',
                '',
                '    let current = head;  // [5] Start from head',
                '    while (current.next !== null) {  // [6] Traverse to the last node',
                '        current = current.next;  // [7] Move to next node',
                '    }',
                '    current.next = newNode;  // [8] Link last node to new node',
                '    return head;  // [9] Return unchanged head',
                '}',
            ],
            typescript: [
                '// Step 1: Insert a new node at the tail (end) of the list',
                'function insertAtTail(head: Node | null, value: number): Node {',
                '',
                '    const newNode = createNode(value);  // [2] Create a new node with the value',
                '',
                '    if (head === null) {  // [3] If list is empty',
                '        return newNode;  // [4] Return new node as head',
                '    }',
                '',
                '    let current = head;  // [5] Start from head',
                '    while (current.next !== null) {  // [6] Traverse to the last node',
                '        current = current.next;  // [7] Move to next node',
                '    }',
                '    current.next = newNode;  // [8] Link last node to new node',
                '    return head;  // [9] Return unchanged head',
                '}',
            ],
            go: [
                '// Step 1: Insert a new node at the tail (end) of the list',
                'func insertAtTail(head *Node, value int) *Node {',
                '',
                '    newNode := Node{Value: value, Next: nil}  // [2] Create a new node with the value',
                '',
                '    if head == nil {  // [3] If list is empty',
                '        return newNode  // [4] Return new node as head',
                '    }',
                '',
                '    current := head  // [5] Start from head',
                '    for current.Next != nil {  // [6] Traverse to the last node',
                '        current = current.Next  // [7] Move to next node',
                '    }',
                '    current.Next = newNode  // [8] Link last node to new node',
                '    return head  // [9] Return unchanged head',
                '}',
            ],
            rust: [
                '// Step 1: Insert a new node at the tail (end) of the list',
                'fn insert_at_tail(head: Option<Box<Node>>, value: i32) -> Box<Node> {',
                '',
                '    let new_node = Box::new(Node::new(value));  // [2] Create a new node with the value',
                '',
                '    match head {',
                '        None => return new_node,  // [3] If list is empty',
                '                                 // [4] Return new node as head',
                '        Some(h) => {',
                '            let mut current = h;  // [5] Start from head',
                '            while current.next.is_some() {  // [6] Traverse to the last node',
                '                current = current.next.as_mut().unwrap();  // [7] Move to next node',
                '            }',
                '            current.next = Some(new_node);  // [8] Link last node to new node',
                '            h  // [9] Return unchanged head',
                '        }',
                '    }',
                '}',
            ],
        },

        llDeleteTail: {
            pseudo: [
                '# Step 1: Delete the node at the tail (end) of the list',
                'procedure deleteTail(head):',
                '',
                '    if head is null:  # [2] If list is empty',
                '        return null  # [3] Cannot delete from empty list',
                '',
                '    if head.next is null:  # [4] If only one node exists',
                '        return null  # [5] Deleting last node makes list empty',
                '',
                '    current = head  # [6] Start from head',
                '    while current.next.next is not null:  # [7] Find second-to-last node',
                '        current = current.next  # [8] Move to next node',
                '    current.next = null  # [9] Remove last node',
                '    return head  # [10] Return unchanged head',
            ],
            python: [
                '# Step 1: Delete the node at the tail (end) of the list',
                'def delete_tail(head: Optional[Node]) -> Optional[Node]:',
                '',
                '    if head is None:  # [2] If list is empty',
                '        return None  # [3] Cannot delete from empty list',
                '',
                '    if head.next is None:  # [4] If only one node exists',
                '        return None  # [5] Deleting last node makes list empty',
                '',
                '    current = head  # [6] Start from head',
                '    while current.next.next is not None:  # [7] Find second-to-last node',
                '        current = current.next  # [8] Move to next node',
                '    current.next = None  # [9] Remove last node',
                '    return head  # [10] Return unchanged head',
            ],
            java: [
                '// Step 1: Delete the node at the tail (end) of the list',
                'Node deleteTail(Node head) {',
                '',
                '    if (head == null) {  // [2] If list is empty',
                '        return null;  // [3] Cannot delete from empty list',
                '    }',
                '',
                '    if (head.next == null) {  // [4] If only one node exists',
                '        return null;  // [5] Deleting last node makes list empty',
                '    }',
                '',
                '    Node current = head;  // [6] Start from head',
                '    while (current.next.next != null) {  // [7] Find second-to-last node',
                '        current = current.next;  // [8] Move to next node',
                '    }',
                '    current.next = null;  // [9] Remove last node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            c: [
                '// Step 1: Delete the node at the tail (end) of the list',
                'struct Node* deleteTail(struct Node* head) {',
                '',
                '    if (head == NULL) {  // [2] If list is empty',
                '        return NULL;  // [3] Cannot delete from empty list',
                '    }',
                '',
                '    if (head->next == NULL) {  // [4] If only one node exists',
                '        return NULL;  // [5] Deleting last node makes list empty',
                '    }',
                '',
                '    struct Node* current = head;  // [6] Start from head',
                '    while (current->next->next != NULL) {  // [7] Find second-to-last node',
                '        current = current->next;  // [8] Move to next node',
                '    }',
                '    current->next = NULL;  // [9] Remove last node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            csharp: [
                '// Step 1: Delete the node at the tail (end) of the list',
                'Node DeleteTail(Node head) {',
                '',
                '    if (head == null) {  // [2] If list is empty',
                '        return null;  // [3] Cannot delete from empty list',
                '    }',
                '',
                '    if (head.Next == null) {  // [4] If only one node exists',
                '        return null;  // [5] Deleting last node makes list empty',
                '    }',
                '',
                '    Node current = head;  // [6] Start from head',
                '    while (current.Next.Next != null) {  // [7] Find second-to-last node',
                '        current = current.Next;  // [8] Move to next node',
                '    }',
                '    current.Next = null;  // [9] Remove last node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            javascript: [
                '// Step 1: Delete the node at the tail (end) of the list',
                'function deleteTail(head) {',
                '',
                '    if (head === null) {  // [2] If list is empty',
                '        return null;  // [3] Cannot delete from empty list',
                '    }',
                '',
                '    if (head.next === null) {  // [4] If only one node exists',
                '        return null;  // [5] Deleting last node makes list empty',
                '    }',
                '',
                '    let current = head;  // [6] Start from head',
                '    while (current.next.next !== null) {  // [7] Find second-to-last node',
                '        current = current.next;  // [8] Move to next node',
                '    }',
                '    current.next = null;  // [9] Remove last node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            typescript: [
                '// Step 1: Delete the node at the tail (end) of the list',
                'function deleteTail(head: Node | null): Node | null {',
                '',
                '    if (head === null) {  // [2] If list is empty',
                '        return null;  // [3] Cannot delete from empty list',
                '    }',
                '',
                '    if (head.next === null) {  // [4] If only one node exists',
                '        return null;  // [5] Deleting last node makes list empty',
                '    }',
                '',
                '    let current = head;  // [6] Start from head',
                '    while (current.next.next !== null) {  // [7] Find second-to-last node',
                '        current = current.next;  // [8] Move to next node',
                '    }',
                '    current.next = null;  // [9] Remove last node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            go: [
                '// Step 1: Delete the node at the tail (end) of the list',
                'func deleteTail(head *Node) *Node {',
                '',
                '    if head == nil {  // [2] If list is empty',
                '        return nil  // [3] Cannot delete from empty list',
                '    }',
                '',
                '    if head.Next == nil {  // [4] If only one node exists',
                '        return nil  // [5] Deleting last node makes list empty',
                '    }',
                '',
                '    current := head  // [6] Start from head',
                '    for current.Next.Next != nil {  // [7] Find second-to-last node',
                '        current = current.Next  // [8] Move to next node',
                '    }',
                '    current.Next = nil  // [9] Remove last node',
                '    return head  // [10] Return unchanged head',
                '}',
            ],
            rust: [
                '// Step 1: Delete the node at the tail (end) of the list',
                'fn delete_tail(head: Option<Box<Node>>) -> Option<Box<Node>> {',
                '',
                '    let head = match head {',
                '        None => return None,  // [2] If list is empty',
                '                                  // [3] Cannot delete from empty list',
                '        Some(h) => {',
                '            if h.next.is_none() {  // [4] If only one node exists',
                '                return None;  // [5] Deleting last node makes list empty',
                '            }',
                '            let mut current = h;  // [6] Start from head',
                '            while current.as_ref().unwrap().next.as_ref().unwrap().next.is_some() {  // [7] Find second-to-last node',
                '                current = current.next.as_mut().unwrap();  // [8] Move to next node',
                '            }',
                '            current.as_mut().unwrap().next = None;  // [9] Remove last node',
                '            Some(h)  // [10] Return unchanged head',
                '        }',
                '    }',
                '}',
            ],
        },

        llInsertPos: {
            pseudo: [
                '# Step 1: Insert a new node at a given 0-based position',
                'procedure insertAtPosition(head, position, value):',
                '',
                '    newNode = Node(value)  # [2] Create a new node with the value',
                '',
                '    if position == 0:  # [3] Inserting at head',
                '        newNode.next = head  # [4] Point new node to current head',
                '        return newNode  # [5] Return new node as head',
                '',
                '    current = head  # [6] Start from head',
                '    for i = 0 to position - 2:  # [7] Traverse to node before target position',
                '        if current is null: break  # [8] Position exceeds list length',
                '        current = current.next  # [9] Move to next node',
                '',
                '    newNode.next = current.next  # [10] Link new node to successor',
                '    current.next = newNode  # [11] Link predecessor to new node',
                '    return head  # [12] Return unchanged head',
            ],
            python: [
                '# Step 1: Insert a new node at a given 0-based position',
                'def insert_at_position(head: Optional[Node], position: int, value: int) -> Node:',
                '',
                '    new_node = Node(value)  # [2] Create a new node with the value',
                '',
                '    if position == 0:  # [3] Inserting at head',
                '        new_node.next = head  # [4] Point new node to current head',
                '        return new_node  # [5] Return new node as head',
                '',
                '    current = head  # [6] Start from head',
                '    for _ in range(position - 1):  # [7] Traverse to node before target position',
                '        if current is None: break  # [8] Position exceeds list length',
                '        current = current.next  # [9] Move to next node',
                '',
                '    new_node.next = current.next  # [10] Link new node to successor',
                '    current.next = new_node  # [11] Link predecessor to new node',
                '    return head  # [12] Return unchanged head',
            ],
            java: [
                '// Step 1: Insert a new node at a given 0-based position',
                'Node insertAtPosition(Node head, int position, int value) {',
                '',
                '    Node newNode = new Node(value);  // [2] Create a new node with the value',
                '',
                '    if (position == 0) {  // [3] Inserting at head',
                '        newNode.next = head;  // [4] Point new node to current head',
                '        return newNode;  // [5] Return new node as head',
                '    }',
                '',
                '    Node current = head;  // [6] Start from head',
                '    for (int i = 0; i < position - 1 && current != null; i++) {  // [7] Traverse',
                '        current = current.next;  // [9] Move to next node',
                '    }',
                '',
                '    newNode.next = current.next;  // [10] Link new node to successor',
                '    current.next = newNode;  // [11] Link predecessor to new node',
                '    return head;  // [12] Return unchanged head',
                '}',
            ],
            cpp: [
                '// Step 1: Insert a new node at a given 0-based position',
                'Node* insertAtPosition(Node* head, int position, int value) {',
                '',
                '    Node* newNode = new Node(value);  // [2] Create a new node with the value',
                '',
                '    if (position == 0) {  // [3] Inserting at head',
                '        newNode->next = head;  // [4] Point new node to current head',
                '        return newNode;  // [5] Return new node as head',
                '    }',
                '',
                '    Node* current = head;  // [6] Start from head',
                '    for (int i = 0; i < position - 1 && current != nullptr; i++) {  // [7] Traverse',
                '        current = current->next;  // [9] Move to next node',
                '    }',
                '',
                '    newNode->next = current->next;  // [10] Link new node to successor',
                '    current->next = newNode;  // [11] Link predecessor to new node',
                '    return head;  // [12] Return unchanged head',
                '}',
            ],
            c: [
                '// Step 1: Insert a new node at a given 0-based position',
                'struct Node* insertAtPosition(struct Node* head, int position, int value) {',
                '',
                '    struct Node* newNode = createNode(value);  // [2] Create a new node with the value',
                '',
                '    if (position == 0) {  // [3] Inserting at head',
                '        newNode->next = head;  // [4] Point new node to current head',
                '        return newNode;  // [5] Return new node as head',
                '    }',
                '',
                '    struct Node* current = head;  // [6] Start from head',
                '    for (int i = 0; i < position - 1 && current != NULL; i++) {  // [7] Traverse',
                '        current = current->next;  // [9] Move to next node',
                '    }',
                '',
                '    newNode->next = current->next;  // [10] Link new node to successor',
                '    current->next = newNode;  // [11] Link predecessor to new node',
                '    return head;  // [12] Return unchanged head',
                '}',
            ],
            csharp: [
                '// Step 1: Insert a new node at a given 0-based position',
                'Node InsertAtPosition(Node head, int position, int value) {',
                '',
                '    Node newNode = new Node(value);  // [2] Create a new node with the value',
                '',
                '    if (position == 0) {  // [3] Inserting at head',
                '        newNode.Next = head;  // [4] Point new node to current head',
                '        return newNode;  // [5] Return new node as head',
                '    }',
                '',
                '    Node current = head;  // [6] Start from head',
                '    for (int i = 0; i < position - 1 && current != null; i++) {  // [7] Traverse',
                '        current = current.Next;  // [9] Move to next node',
                '    }',
                '',
                '    newNode.Next = current.Next;  // [10] Link new node to successor',
                '    current.Next = newNode;  // [11] Link predecessor to new node',
                '    return head;  // [12] Return unchanged head',
                '}',
            ],
            javascript: [
                '// Step 1: Insert a new node at a given 0-based position',
                'function insertAtPosition(head, position, value) {',
                '',
                '    const newNode = createNode(value);  // [2] Create a new node with the value',
                '',
                '    if (position === 0) {  // [3] Inserting at head',
                '        newNode.next = head;  // [4] Point new node to current head',
                '        return newNode;  // [5] Return new node as head',
                '    }',
                '',
                '    let current = head;  // [6] Start from head',
                '    for (let i = 0; i < position - 1 && current !== null; i++) {  // [7] Traverse',
                '        current = current.next;  // [9] Move to next node',
                '    }',
                '',
                '    newNode.next = current.next;  // [10] Link new node to successor',
                '    current.next = newNode;  // [11] Link predecessor to new node',
                '    return head;  // [12] Return unchanged head',
                '}',
            ],
            typescript: [
                '// Step 1: Insert a new node at a given 0-based position',
                'function insertAtPosition(head: Node | null, position: number, value: number): Node | null {',
                '',
                '    const newNode = createNode(value);  // [2] Create a new node with the value',
                '',
                '    if (position === 0) {  // [3] Inserting at head',
                '        newNode.next = head;  // [4] Point new node to current head',
                '        return newNode;  // [5] Return new node as head',
                '    }',
                '',
                '    let current: Node | null = head;  // [6] Start from head',
                '    for (let i = 0; i < position - 1 && current !== null; i++) {  // [7] Traverse',
                '        current = current.next;  // [9] Move to next node',
                '    }',
                '',
                '    newNode.next = current!.next;  // [10] Link new node to successor',
                '    current!.next = newNode;  // [11] Link predecessor to new node',
                '    return head;  // [12] Return unchanged head',
                '}',
            ],
            go: [
                '// Step 1: Insert a new node at a given 0-based position',
                'func insertAtPosition(head *Node, position int, value int) *Node {',
                '',
                '    newNode := &Node{Value: value}  // [2] Create a new node with the value',
                '',
                '    if position == 0 {  // [3] Inserting at head',
                '        newNode.Next = head  // [4] Point new node to current head',
                '        return newNode  // [5] Return new node as head',
                '    }',
                '',
                '    current := head  // [6] Start from head',
                '    for i := 0; i < position-1 && current != nil; i++ {  // [7] Traverse',
                '        current = current.Next  // [9] Move to next node',
                '    }',
                '',
                '    newNode.Next = current.Next  // [10] Link new node to successor',
                '    current.Next = newNode  // [11] Link predecessor to new node',
                '    return head  // [12] Return unchanged head',
                '}',
            ],
            rust: [
                '// Step 1: Insert a new node at a given 0-based position',
                'fn insert_at_position(head: Option<Box<Node>>, position: usize, value: i32) -> Option<Box<Node>> {',
                '',
                '    let mut new_node = Box::new(Node { value, next: None });  // [2] Create a new node',
                '',
                '    if position == 0 {  // [3] Inserting at head',
                '        new_node.next = head;  // [4] Point new node to current head',
                '        return Some(new_node);  // [5] Return new node as head',
                '    }',
                '',
                '    // [6] Traverse to position - 1 and insert',
                '    let mut dummy = Box::new(Node { value: 0, next: head });',
                '    let mut current = &mut dummy;',
                '    for _ in 0..position {  // [7] Traverse to node before target position',
                '        if current.next.is_none() { break; }  // [8] Position exceeds list length',
                '        current = current.next.as_mut().unwrap();  // [9] Move to next node',
                '    }',
                '    new_node.next = current.next.take();  // [10] Link new node to successor',
                '    current.next = Some(new_node);  // [11] Link predecessor to new node',
                '    dummy.next  // [12] Return unchanged head',
                '}',
            ],
        },

        llDeletePos: {
            pseudo: [
                '# Step 1: Delete the node at a given 0-based position',
                'procedure deleteAtPosition(head, position):',
                '',
                '    if head is null: return null  # [2] Empty list',
                '',
                '    if position == 0:  # [3] Deleting the head node',
                '        return head.next  # [4] Return second node as new head',
                '',
                '    current = head  # [5] Start from head',
                '    for i = 0 to position - 2:  # [6] Traverse to node before target',
                '        if current.next is null: return head  # [7] Position out of range',
                '        current = current.next  # [8] Move to next node',
                '',
                '    current.next = current.next.next  # [9] Unlink the target node',
                '    return head  # [10] Return unchanged head',
            ],
            python: [
                '# Step 1: Delete the node at a given 0-based position',
                'def delete_at_position(head: Optional[Node], position: int) -> Optional[Node]:',
                '',
                '    if head is None: return None  # [2] Empty list',
                '',
                '    if position == 0:  # [3] Deleting the head node',
                '        return head.next  # [4] Return second node as new head',
                '',
                '    current = head  # [5] Start from head',
                '    for _ in range(position - 1):  # [6] Traverse to node before target',
                '        if current.next is None: return head  # [7] Position out of range',
                '        current = current.next  # [8] Move to next node',
                '',
                '    current.next = current.next.next  # [9] Unlink the target node',
                '    return head  # [10] Return unchanged head',
            ],
            java: [
                '// Step 1: Delete the node at a given 0-based position',
                'Node deleteAtPosition(Node head, int position) {',
                '',
                '    if (head == null) return null;  // [2] Empty list',
                '',
                '    if (position == 0) {  // [3] Deleting the head node',
                '        return head.next;  // [4] Return second node as new head',
                '    }',
                '',
                '    Node current = head;  // [5] Start from head',
                '    for (int i = 0; i < position - 1; i++) {  // [6] Traverse to node before target',
                '        if (current.next == null) return head;  // [7] Position out of range',
                '        current = current.next;  // [8] Move to next node',
                '    }',
                '',
                '    current.next = current.next.next;  // [9] Unlink the target node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            cpp: [
                '// Step 1: Delete the node at a given 0-based position',
                'Node* deleteAtPosition(Node* head, int position) {',
                '',
                '    if (head == nullptr) return nullptr;  // [2] Empty list',
                '',
                '    if (position == 0) {  // [3] Deleting the head node',
                '        Node* next = head->next;  // [4] Save reference to second node',
                '        delete head;',
                '        return next;  // [4] Return second node as new head',
                '    }',
                '',
                '    Node* current = head;  // [5] Start from head',
                '    for (int i = 0; i < position - 1; i++) {  // [6] Traverse to node before target',
                '        if (current->next == nullptr) return head;  // [7] Position out of range',
                '        current = current->next;  // [8] Move to next node',
                '    }',
                '',
                '    Node* toDelete = current->next;  // [9] Save reference to target node',
                '    current->next = toDelete->next;  // [9] Unlink the target node',
                '    delete toDelete;',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            c: [
                '// Step 1: Delete the node at a given 0-based position',
                'struct Node* deleteAtPosition(struct Node* head, int position) {',
                '',
                '    if (head == NULL) return NULL;  // [2] Empty list',
                '',
                '    if (position == 0) {  // [3] Deleting the head node',
                '        struct Node* next = head->next;  // [4] Save reference to second node',
                '        free(head);',
                '        return next;  // [4] Return second node as new head',
                '    }',
                '',
                '    struct Node* current = head;  // [5] Start from head',
                '    for (int i = 0; i < position - 1; i++) {  // [6] Traverse to node before target',
                '        if (current->next == NULL) return head;  // [7] Position out of range',
                '        current = current->next;  // [8] Move to next node',
                '    }',
                '',
                '    struct Node* toDelete = current->next;  // [9] Save reference to target node',
                '    current->next = toDelete->next;  // [9] Unlink the target node',
                '    free(toDelete);',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            csharp: [
                '// Step 1: Delete the node at a given 0-based position',
                'Node? DeleteAtPosition(Node? head, int position) {',
                '',
                '    if (head == null) return null;  // [2] Empty list',
                '',
                '    if (position == 0) {  // [3] Deleting the head node',
                '        return head.Next;  // [4] Return second node as new head',
                '    }',
                '',
                '    Node current = head;  // [5] Start from head',
                '    for (int i = 0; i < position - 1; i++) {  // [6] Traverse to node before target',
                '        if (current.Next == null) return head;  // [7] Position out of range',
                '        current = current.Next;  // [8] Move to next node',
                '    }',
                '',
                '    current.Next = current.Next?.Next;  // [9] Unlink the target node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            javascript: [
                '// Step 1: Delete the node at a given 0-based position',
                'function deleteAtPosition(head, position) {',
                '',
                '    if (head === null) return null;  // [2] Empty list',
                '',
                '    if (position === 0) {  // [3] Deleting the head node',
                '        return head.next;  // [4] Return second node as new head',
                '    }',
                '',
                '    let current = head;  // [5] Start from head',
                '    for (let i = 0; i < position - 1; i++) {  // [6] Traverse to node before target',
                '        if (current.next === null) return head;  // [7] Position out of range',
                '        current = current.next;  // [8] Move to next node',
                '    }',
                '',
                '    current.next = current.next.next;  // [9] Unlink the target node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            typescript: [
                '// Step 1: Delete the node at a given 0-based position',
                'function deleteAtPosition(head: Node | null, position: number): Node | null {',
                '',
                '    if (head === null) return null;  // [2] Empty list',
                '',
                '    if (position === 0) {  // [3] Deleting the head node',
                '        return head.next;  // [4] Return second node as new head',
                '    }',
                '',
                '    let current: Node | null = head;  // [5] Start from head',
                '    for (let i = 0; i < position - 1; i++) {  // [6] Traverse to node before target',
                '        if (current!.next === null) return head;  // [7] Position out of range',
                '        current = current!.next;  // [8] Move to next node',
                '    }',
                '',
                '    current!.next = current!.next!.next;  // [9] Unlink the target node',
                '    return head;  // [10] Return unchanged head',
                '}',
            ],
            go: [
                '// Step 1: Delete the node at a given 0-based position',
                'func deleteAtPosition(head *Node, position int) *Node {',
                '',
                '    if head == nil { return nil }  // [2] Empty list',
                '',
                '    if position == 0 {  // [3] Deleting the head node',
                '        return head.Next  // [4] Return second node as new head',
                '    }',
                '',
                '    current := head  // [5] Start from head',
                '    for i := 0; i < position-1; i++ {  // [6] Traverse to node before target',
                '        if current.Next == nil { return head }  // [7] Position out of range',
                '        current = current.Next  // [8] Move to next node',
                '    }',
                '',
                '    current.Next = current.Next.Next  // [9] Unlink the target node',
                '    return head  // [10] Return unchanged head',
                '}',
            ],
            rust: [
                '// Step 1: Delete the node at a given 0-based position',
                'fn delete_at_position(head: Option<Box<Node>>, position: usize) -> Option<Box<Node>> {',
                '',
                '    let mut dummy = Box::new(Node { value: 0, next: head });',
                '    let mut current = &mut dummy;',
                '',
                '    for _ in 0..position {  // [6] Traverse to node before target',
                '        if current.next.is_none() { break; }  // [7] Position out of range',
                '        current = current.next.as_mut().unwrap();  // [8] Move to next node',
                '    }',
                '',
                '    // [9] Unlink the target node',
                '    let next = current.next.take().and_then(|n| n.next);',
                '    current.next = next;',
                '    dummy.next  // [10] Return unchanged head',
                '}',
            ],
        },

        llDeleteVal: {
            pseudo: [
                '# Step 1: Delete the first node whose value matches the target',
                'procedure deleteByValue(head, value):',
                '',
                '    if head is null: return null  # [2] Empty list',
                '',
                '    if head.value == value:  # [3] Head node matches',
                '        return head.next  # [4] Remove head, return new head',
                '',
                '    current = head  # [5] Start from head',
                '    while current.next is not null:  # [6] Traverse the list',
                '        if current.next.value == value:  # [7] Compare next node value',
                '            current.next = current.next.next  # [8] Unlink the matching node',
                '            return head  # [9] Return unchanged head',
                '        current = current.next  # [10] Move to next node',
                '',
                '    return head  # [11] Value not found, return head unchanged',
            ],
            python: [
                '# Step 1: Delete the first node whose value matches the target',
                'def delete_by_value(head: Optional[Node], value: int) -> Optional[Node]:',
                '',
                '    if head is None: return None  # [2] Empty list',
                '',
                '    if head.value == value:  # [3] Head node matches',
                '        return head.next  # [4] Remove head, return new head',
                '',
                '    current = head  # [5] Start from head',
                '    while current.next is not None:  # [6] Traverse the list',
                '        if current.next.value == value:  # [7] Compare next node value',
                '            current.next = current.next.next  # [8] Unlink the matching node',
                '            return head  # [9] Return unchanged head',
                '        current = current.next  # [10] Move to next node',
                '',
                '    return head  # [11] Value not found, return head unchanged',
            ],
            java: [
                '// Step 1: Delete the first node whose value matches the target',
                'Node deleteByValue(Node head, int value) {',
                '',
                '    if (head == null) return null;  // [2] Empty list',
                '',
                '    if (head.value == value) {  // [3] Head node matches',
                '        return head.next;  // [4] Remove head, return new head',
                '    }',
                '',
                '    Node current = head;  // [5] Start from head',
                '    while (current.next != null) {  // [6] Traverse the list',
                '        if (current.next.value == value) {  // [7] Compare next node value',
                '            current.next = current.next.next;  // [8] Unlink the matching node',
                '            return head;  // [9] Return unchanged head',
                '        }',
                '        current = current.next;  // [10] Move to next node',
                '    }',
                '',
                '    return head;  // [11] Value not found, return head unchanged',
                '}',
            ],
            cpp: [
                '// Step 1: Delete the first node whose value matches the target',
                'Node* deleteByValue(Node* head, int value) {',
                '',
                '    if (head == nullptr) return nullptr;  // [2] Empty list',
                '',
                '    if (head->value == value) {  // [3] Head node matches',
                '        Node* next = head->next;  // [4] Save reference to second node',
                '        delete head;',
                '        return next;  // [4] Remove head, return new head',
                '    }',
                '',
                '    Node* current = head;  // [5] Start from head',
                '    while (current->next != nullptr) {  // [6] Traverse the list',
                '        if (current->next->value == value) {  // [7] Compare next node value',
                '            Node* toDelete = current->next;',
                '            current->next = toDelete->next;  // [8] Unlink the matching node',
                '            delete toDelete;',
                '            return head;  // [9] Return unchanged head',
                '        }',
                '        current = current->next;  // [10] Move to next node',
                '    }',
                '',
                '    return head;  // [11] Value not found, return head unchanged',
                '}',
            ],
            c: [
                '// Step 1: Delete the first node whose value matches the target',
                'struct Node* deleteByValue(struct Node* head, int value) {',
                '',
                '    if (head == NULL) return NULL;  // [2] Empty list',
                '',
                '    if (head->value == value) {  // [3] Head node matches',
                '        struct Node* next = head->next;  // [4] Save reference to second node',
                '        free(head);',
                '        return next;  // [4] Remove head, return new head',
                '    }',
                '',
                '    struct Node* current = head;  // [5] Start from head',
                '    while (current->next != NULL) {  // [6] Traverse the list',
                '        if (current->next->value == value) {  // [7] Compare next node value',
                '            struct Node* toDelete = current->next;',
                '            current->next = toDelete->next;  // [8] Unlink the matching node',
                '            free(toDelete);',
                '            return head;  // [9] Return unchanged head',
                '        }',
                '        current = current->next;  // [10] Move to next node',
                '    }',
                '',
                '    return head;  // [11] Value not found, return head unchanged',
                '}',
            ],
            csharp: [
                '// Step 1: Delete the first node whose value matches the target',
                'Node? DeleteByValue(Node? head, int value) {',
                '',
                '    if (head == null) return null;  // [2] Empty list',
                '',
                '    if (head.Value == value) {  // [3] Head node matches',
                '        return head.Next;  // [4] Remove head, return new head',
                '    }',
                '',
                '    Node current = head;  // [5] Start from head',
                '    while (current.Next != null) {  // [6] Traverse the list',
                '        if (current.Next.Value == value) {  // [7] Compare next node value',
                '            current.Next = current.Next.Next;  // [8] Unlink the matching node',
                '            return head;  // [9] Return unchanged head',
                '        }',
                '        current = current.Next;  // [10] Move to next node',
                '    }',
                '',
                '    return head;  // [11] Value not found, return head unchanged',
                '}',
            ],
            javascript: [
                '// Step 1: Delete the first node whose value matches the target',
                'function deleteByValue(head, value) {',
                '',
                '    if (head === null) return null;  // [2] Empty list',
                '',
                '    if (head.value === value) {  // [3] Head node matches',
                '        return head.next;  // [4] Remove head, return new head',
                '    }',
                '',
                '    let current = head;  // [5] Start from head',
                '    while (current.next !== null) {  // [6] Traverse the list',
                '        if (current.next.value === value) {  // [7] Compare next node value',
                '            current.next = current.next.next;  // [8] Unlink the matching node',
                '            return head;  // [9] Return unchanged head',
                '        }',
                '        current = current.next;  // [10] Move to next node',
                '    }',
                '',
                '    return head;  // [11] Value not found, return head unchanged',
                '}',
            ],
            typescript: [
                '// Step 1: Delete the first node whose value matches the target',
                'function deleteByValue(head: Node | null, value: number): Node | null {',
                '',
                '    if (head === null) return null;  // [2] Empty list',
                '',
                '    if (head.value === value) {  // [3] Head node matches',
                '        return head.next;  // [4] Remove head, return new head',
                '    }',
                '',
                '    let current: Node | null = head;  // [5] Start from head',
                '    while (current!.next !== null) {  // [6] Traverse the list',
                '        if (current!.next.value === value) {  // [7] Compare next node value',
                '            current!.next = current!.next.next;  // [8] Unlink the matching node',
                '            return head;  // [9] Return unchanged head',
                '        }',
                '        current = current!.next;  // [10] Move to next node',
                '    }',
                '',
                '    return head;  // [11] Value not found, return head unchanged',
                '}',
            ],
            go: [
                '// Step 1: Delete the first node whose value matches the target',
                'func deleteByValue(head *Node, value int) *Node {',
                '',
                '    if head == nil { return nil }  // [2] Empty list',
                '',
                '    if head.Value == value {  // [3] Head node matches',
                '        return head.Next  // [4] Remove head, return new head',
                '    }',
                '',
                '    current := head  // [5] Start from head',
                '    for current.Next != nil {  // [6] Traverse the list',
                '        if current.Next.Value == value {  // [7] Compare next node value',
                '            current.Next = current.Next.Next  // [8] Unlink the matching node',
                '            return head  // [9] Return unchanged head',
                '        }',
                '        current = current.Next  // [10] Move to next node',
                '    }',
                '',
                '    return head  // [11] Value not found, return head unchanged',
                '}',
            ],
            rust: [
                '// Step 1: Delete the first node whose value matches the target',
                'fn delete_by_value(head: Option<Box<Node>>, value: i32) -> Option<Box<Node>> {',
                '',
                '    let mut dummy = Box::new(Node { value: 0, next: head });',
                '    let mut current = &mut dummy;',
                '',
                '    loop {  // [6] Traverse the list',
                '        match current.next {',
                '            None => break,  // [11] Value not found',
                '            Some(ref node) if node.value == value => {  // [7] Compare next node value',
                '                current.next = current.next.take().unwrap().next;  // [8] Unlink node',
                '                break;  // [9] Done',
                '            }',
                '            _ => { current = current.next.as_mut().unwrap(); }  // [10] Move forward',
                '        }',
                '    }',
                '    dummy.next  // [11] Return head',
                '}',
            ],
        },
    };

    // ─── Complexity Information ───

    const COMPLEXITY = {
        llInsertHead: {
            name: 'Insert at Head',
            best: 'O(1)',
            average: 'O(1)',
            worst: 'O(1)',
            space: 'O(1)',
            description:
                'Create a new node with the given value, set its next pointer to point at the current head, ' +
                'and return the new node as the new head of the list. This operation only ' +
                'requires creating one node and updating one pointer, regardless of list size.',
            useCase:
                'Use when implementing stacks, queues via deques, or any scenario where ' +
                'frequent insertions at the beginning of the list are needed. Common in ' +
                'LIFO (Last-In-First-Out) data structures.',
            avoid:
                'Avoid when you need random access by index or frequently access ' +
                'elements in the middle of the list. Arrays provide O(1) random access, ' +
                'while linked lists require O(n) traversal.',
        },

        llDeleteHead: {
            name: 'Delete Head',
            best: 'O(1)',
            average: 'O(1)',
            worst: 'O(1)',
            space: 'O(1)',
            description:
                'Simply update the head pointer to point at the second node, effectively ' +
                'removing the first element. No memory deallocation is shown in the visualization.',
            useCase:
                'Use when implementing stacks or queues via linked lists, ' +
                'where removing the first element is the primary operation.',
            avoid:
                'Avoid when the list is empty (check for null first). ' +
                'If you need to delete arbitrary positions, arrays provide O(1) deletion, ' +
                'while linked lists require O(n) traversal to find the node.',
        },

        llSearch: {
            name: 'Linked List Search',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Start at the head and traverse the list, comparing each node\'s value ' +
                'to the target. If found, return the node; if end of list is reached ' +
                'without finding the value, return not found. Best case is O(1) when target ' +
                'is at the head.',
            useCase:
                'Use when searching for a value in a dynamic collection where elements are ' +
                'frequently added and removed. Good for implementing hash table buckets, ' +
                'symbol tables, or any dynamic set.',
            avoid:
                'Avoid when you need fast random access or need to search ' +
                'the collection repeatedly. Arrays with binary search provide O(log n) search, ' +
                'while linked lists require O(n) sequential traversal.',
        },

        llTraverse: {
            name: 'Linked List Traversal',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Visit each node exactly once in sequential order, starting from the head ' +
                'and following next pointers until reaching the null at the end. ' +
                'Every node is processed exactly once, making this always O(n).',
            useCase:
                'Use when you need to process or display every element in a linked list, ' +
                'such as printing all values, computing statistics, or applying a ' +
                'function to each element.',
            avoid:
                'Avoid when you need to modify the list during traversal ' +
                'or need random access. For simple iteration, this is the correct approach. ' +
                'If you need to find specific elements, consider building an index or ' +
                'using a different data structure.',
        },

        llReverse: {
            name: 'Reverse Linked List',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Iterate through the list once, reversing each node\'s next pointer to point ' +
                'to the previous node. Requires three pointer updates per node (store next, ' +
                'reverse current pointer, update previous). The original head becomes the new tail.',
            useCase:
                'Use when you need to reverse the order of elements in a linked list, ' +
                'such as undoing an insert operation, preparing for LIFO processing, ' +
                'or reversing a sequence of operations.',
            avoid:
                'Avoid when you only need to traverse the list backwards without ' +
                'modifying it. If you need frequent reversals, consider using a ' +
                'doubly linked list for O(1) reverse at head.',
        },

        llInsertTail: {
            name: 'Insert at Tail',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Create a new node with the given value. If the list is empty, return ' +
                'the new node as the head. Otherwise, traverse the entire list to find ' +
                'the last node (where next is null) and link it to the new node. ' +
                'This requires O(n) traversal to reach the tail.',
            useCase:
                'Use when implementing queues (FIFO) where elements are added at the back. ' +
                'Also useful when appending to a list in the order elements arrive. ' +
                'Common in task schedulers and event processing systems.',
            avoid:
                'Avoid when you need fast insertions at the end. Use a doubly linked list ' +
                'with a tail pointer for O(1) insertions, or consider arrays when ' +
                'random access is needed. Single linked lists are inefficient for tail operations.',
        },

        llDeleteTail: {
            name: 'Delete Tail',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Find and remove the last node of the list. Handle edge cases: empty list (return null), ' +
                'single node (return null), and normal case (find second-to-last node, set its next to null). ' +
                'Requires O(n) traversal to reach the tail.',
            useCase:
                'Use when implementing queue operations where you need to dequeue ' +
                'from the end of a single linked list. Also useful for removing ' +
                'the most recently added element when tracking order.',
            avoid:
                'Avoid when you need efficient deletions from the end. ' +
                'Use a doubly linked list for O(1) tail deletions. ' +
                'For frequent tail operations, consider using a deque or circular ' +
                'buffer instead of a single linked list.',
        },

        llInsertPos: {
            name: 'Insert at Position',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Insert a new node at a given 0-based position. If position is 0 it behaves like ' +
                'insert at head (O(1)). Otherwise traverse to the node just before the target ' +
                'position and splice the new node in. If position exceeds the list length, ' +
                'the node is appended at the tail.',
            useCase:
                'Use when you need to insert at a specific index, such as maintaining ' +
                'an ordered list where position matters. Common in priority queues ' +
                'and ordered buffer management.',
            avoid:
                'Avoid for frequent mid-list insertions on large lists — O(n) traversal ' +
                'is expensive. Use a doubly linked list with an index cache, or an ' +
                'array-backed structure when random-access insertion is the primary operation.',
        },

        llDeletePos: {
            name: 'Delete at Position',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Remove the node at a given 0-based position. Deleting position 0 is O(1) ' +
                '(update head pointer). For any other position, traverse to the predecessor ' +
                'node and redirect its next pointer, skipping the target.',
            useCase:
                'Use when you know exactly which position to remove — for example, ' +
                'removing a known slot in a scheduler or a buffer ring. ' +
                'Simpler than searching by value when the index is already known.',
            avoid:
                'Avoid when position is frequently unknown — prefer delete-by-value instead. ' +
                'For O(1) arbitrary deletion use a doubly linked list combined with a ' +
                'node reference (pointer) rather than a positional index.',
        },

        llDeleteVal: {
            name: 'Delete by Value',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Search the list for the first node whose value matches the target and remove it. ' +
                'Checks the head first (O(1) if match). Otherwise traverse comparing each ' +
                'node\'s successor until a match is found or the list is exhausted.',
            useCase:
                'Use when you need to remove a specific value without knowing its index. ' +
                'Common in event queues (cancel a specific task) and LRU caches ' +
                'where lookup by value precedes deletion.',
            avoid:
                'Avoid on large unsorted lists where the value may be near the tail — ' +
                'O(n) worst case. Use a hash map to cache node references for O(1) ' +
                'lookup-and-delete, or a sorted structure with binary search.',
        },
    };

    // ─── Generator Functions ───

    function* llInsertHead(head, value) {
        const newNode = createNode(value);
        yield { type: 'insert', nodeId: newNode.id, codeLine: 2 };
        newNode.next = head;
        return newNode;
    }

    function* llDeleteHead(head) {
        if (head === null) {
            yield { type: 'visit', nodeId: -1, codeLine: 2 };
            return null;
        }
        yield { type: 'delete', nodeId: head.id, codeLine: 4 };
        return head.next;
    }

    function* llInsertTail(head, value) {
        const newNode = createNode(value);
        yield { type: 'insert', nodeId: newNode.id, codeLine: 2 };

        if (head === null) {
            yield { type: 'visit', nodeId: newNode.id, codeLine: 4 };
            return newNode;
        }

        let current = head;
        while (current.next !== null) {
            yield { type: 'visit', nodeId: current.id, codeLine: 6 };
            current = current.next;
        }
        yield { type: 'visit', nodeId: current.id, codeLine: 6 };
        current.next = newNode;
        yield { type: 'visit', nodeId: newNode.id, codeLine: 8 };
        return head;
    }

    function* llDeleteTail(head) {
        if (head === null) {
            yield { type: 'visit', nodeId: -1, codeLine: 3 };
            return null;
        }

        if (head.next === null) {
            yield { type: 'delete', nodeId: head.id, codeLine: 5 };
            return null;
        }

        let current = head;
        while (current.next.next !== null) {
            yield { type: 'visit', nodeId: current.id, codeLine: 7 };
            current = current.next;
        }
        yield { type: 'visit', nodeId: current.id, codeLine: 8 };
        yield { type: 'delete', nodeId: current.next.id, codeLine: 9 };
        current.next = null;
        return head;
    }

    function* llSearch(head, value) {
        let current = head;
        let pos = 0;
        while (current !== null) {
            yield { type: 'visit', nodeId: current.id, codeLine: 2 };
            yield { type: 'compare', nodeId: current.id, codeLine: 3 };
            if (current.value === value) {
                yield { type: 'found', nodeId: current.id, codeLine: 4 };
                return current;
            }
            current = current.next;
            pos++;
        }
        yield { type: 'notFound', nodeId: -1, codeLine: 6 };
        return;
    }

    function* llTraverse(head) {
        let current = head;
        while (current !== null) {
            yield { type: 'visit', nodeId: current.id, codeLine: 3 };
            current = current.next;
        }
    }

    function* llReverse(head) {
        let prev = null;
        let current = head;
        while (current !== null) {
            yield { type: 'visit', nodeId: current.id, codeLine: 2 };
            const next = current.next;
            yield { type: 'delete', nodeId: current.id, codeLine: 4 };
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    /**
     * Insert a new node with the given value at the specified 0-based position.
     * Position 0 inserts at head; positions >= length append at tail.
     *
     * @param {object|null} head - Head node of the linked list.
     * @param {number} position - 0-based index at which to insert.
     * @param {number} value - Value for the new node.
     * @returns {object} Updated head of the linked list.
     */
    function* llInsertPos(head, position, value) {
        const newNode = createNode(value);
        yield { type: 'insert', nodeId: newNode.id, codeLine: 2 };

        if (position === 0 || head === null) {
            newNode.next = head;
            yield { type: 'insert', nodeId: newNode.id, codeLine: 5 };
            return newNode;
        }

        let current = head;
        let i = 0;
        while (i < position - 1 && current.next !== null) {
            yield { type: 'visit', nodeId: current.id, codeLine: 9 };
            current = current.next;
            i++;
        }
        yield { type: 'visit', nodeId: current.id, codeLine: 9 };
        newNode.next = current.next;
        current.next = newNode;
        yield { type: 'insert', nodeId: newNode.id, codeLine: 11 };
        return head;
    }

    /**
     * Delete the node at the specified 0-based position.
     * Handles empty list, head deletion, and out-of-range positions gracefully.
     *
     * @param {object|null} head - Head node of the linked list.
     * @param {number} position - 0-based index of the node to remove.
     * @returns {object|null} Updated head of the linked list.
     */
    function* llDeletePos(head, position) {
        if (head === null) {
            return null;
        }

        if (position === 0) {
            yield { type: 'delete', nodeId: head.id, codeLine: 4 };
            return head.next;
        }

        let current = head;
        let i = 0;
        while (i < position - 1 && current.next !== null) {
            yield { type: 'visit', nodeId: current.id, codeLine: 8 };
            current = current.next;
            i++;
        }
        yield { type: 'visit', nodeId: current.id, codeLine: 8 };

        if (current.next !== null) {
            yield { type: 'delete', nodeId: current.next.id, codeLine: 9 };
            current.next = current.next.next;
        }
        return head;
    }

    /**
     * Delete the first node whose value matches the given target.
     * Yields compare steps while searching, found/delete on match, notFound if absent.
     *
     * @param {object|null} head - Head node of the linked list.
     * @param {number} value - Value to search for and remove.
     * @returns {object|null} Updated head of the linked list.
     */
    function* llDeleteVal(head, value) {
        if (head === null) {
            return null;
        }

        if (head.value === value) {
            yield { type: 'found', nodeId: head.id, codeLine: 3 };
            yield { type: 'delete', nodeId: head.id, codeLine: 4 };
            return head.next;
        }

        let current = head;
        while (current.next !== null) {
            yield { type: 'compare', nodeId: current.next.id, codeLine: 7 };
            if (current.next.value === value) {
                yield { type: 'found', nodeId: current.next.id, codeLine: 7 };
                yield { type: 'delete', nodeId: current.next.id, codeLine: 8 };
                current.next = current.next.next;
                return head;
            }
            current = current.next;
        }
        yield { type: 'notFound', nodeId: -1, codeLine: 11 };
        return head;
    }

    function buildSampleLinkedList(values) {
        resetIds();
        let head = null;
        for (const v of values) {
            const newNode = createNode(v);
            newNode.next = head;
            head = newNode;
        }
        return head;
    }

    function getValues(head) {
        const values = [];
        let current = head;
        while (current !== null) {
            values.push(current.value);
            current = current.next;
        }
        return values;
    }

    return {
        CODE,
        COMPLEXITY,
        resetIds,
        buildSampleLinkedList,
        getValues,
        llInsertHead,
        llDeleteHead,
        llInsertTail,
        llDeleteTail,
        llSearch,
        llTraverse,
        llReverse,
        llInsertPos,
        llDeletePos,
        llDeleteVal,
    };
})();

export default LinkedListAlgorithms;
