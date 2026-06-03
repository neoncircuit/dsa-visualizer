/**
 * Searching algorithm generators.
 *
 * Each algorithm is a generator function that yields step objects:
 * { type: 'check'|'found'|'eliminate'|'notFound', indices: number[], codeLine: number }
 */

const SearchingAlgorithms = (() => {

    // ─── Code Snippets ───

    const CODE = {
        linearSearch: {
            pseudo: [
                '# Step 1: Search through a list one item at a time',
                'procedure linearSearch(A, target):',
                '    for i = 0 to length(A) - 1:  # [2] Go through each item from start to end',
                '        if A[i] == target:  # [3] Check if this item is the one we want',
                '            return i  # [4] We found it, give back its position',
                '    return -1  # [5] We checked everything and did not find it',
            ],
            python: [
                '# Step 1: Search through a list one item at a time',
                'def linear_search(arr: list[int], target: int) -> int:',
                '    for i in range(len(arr)):  # [2] Go through each item from start to end',
                '        if arr[i] == target:  # [3] Check if this item is the one we want',
                '            return i  # [4] We found it, give back its position',
                '    return -1  # [5] We checked everything and did not find it',
            ],
            java: [
                '// Step 1: Search through an array one item at a time',
                'int linearSearch(int[] arr, int target) {',
                '    for (int i = 0; i < arr.length; i++) {  // [2] Go through each item from start to end',
                '        if (arr[i] == target) {  // [3] Check if this item is the one we want',
                '            return i;  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    return -1;  // [5] We checked everything and did not find it',
                '}',
            ],
            cpp: [
                '// Step 1: Search through a vector one item at a time',
                'int linearSearch(vector<int>& arr, int target) {',
                '    for (int i = 0; i < arr.size(); i++) {  // [2] Go through each item from start to end',
                '        if (arr[i] == target) {  // [3] Check if this item is the one we want',
                '            return i;  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    return -1;  // [5] We checked everything and did not find it',
                '}',
            ],
            javascript: [
                '// Step 1: Search through an array one item at a time',
                'function linearSearch(arr, target) {',
                '    for (let i = 0; i < arr.length; i++) {  // [2] Go through each item from start to end',
                '        if (arr[i] === target) {  // [3] Check if this item is the one we want',
                '            return i;  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    return -1;  // [5] We checked everything and did not find it',
                '}',
            ],
            c: [
                '// Step 1: Search through an array one item at a time',
                'int linearSearch(int *arr, int n, int target) {',
                '    for (int i = 0; i < n; i++) {  // [2] Go through each item from start to end',
                '        if (arr[i] == target) {  // [3] Check if this item is the one we want',
                '            return i;  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    return -1;  // [5] We checked everything and did not find it',
                '}',
            ],
            csharp: [
                '// Step 1: Search through an array one item at a time',
                'int LinearSearch(int[] arr, int target) {',
                '    for (int i = 0; i < arr.Length; i++) {  // [2] Go through each item from start to end',
                '        if (arr[i] == target) {  // [3] Check if this item is the one we want',
                '            return i;  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    return -1;  // [5] We checked everything and did not find it',
                '}',
            ],
            typescript: [
                '// Step 1: Search through an array one item at a time',
                'function linearSearch(arr: number[], target: number): number {',
                '    for (let i = 0; i < arr.length; i++) {  // [2] Go through each item from start to end',
                '        if (arr[i] === target) {  // [3] Check if this item is the one we want',
                '            return i;  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    return -1;  // [5] We checked everything and did not find it',
                '}',
            ],
            go: [
                '// Step 1: Search through a slice one item at a time',
                'func linearSearch(arr []int, target int) int {',
                '    for i := 0; i < len(arr); i++ {  // [2] Go through each item from start to end',
                '        if arr[i] == target {  // [3] Check if this item is the one we want',
                '            return i  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    return -1  // [5] We checked everything and did not find it',
                '}',
            ],
            rust: [
                '// Step 1: Search through a vector one item at a time',
                'fn linear_search(arr: &Vec<i32>, target: i32) -> Option<usize> {',
                '    for i in 0..arr.len() {  // [2] Go through each item from start to end',
                '        if arr[i] == target {  // [3] Check if this item is the one we want',
                '            return Some(i);  // [4] We found it, give back its position',
                '        }',
                '    }',
                '    None  // [5] We checked everything and did not find it',
                '}',
            ],
        },

        binarySearch: {
            pseudo: [
                '# Step 1: Search a sorted list by cutting it in half each time',
                'procedure binarySearch(A, target):',
                '',
                '    low = 0  # [2] Start at the first position',
                '    high = length(A) - 1  # [3] End at the last position',
                '',
                '    while low <= high:  # [4] Keep going while there are items left to check',
                '        mid = (low + high) / 2  # [5] Find the middle position',
                '',
                '        if A[mid] == target:  # [6] Check if the middle item is what we want',
                '            return mid  # [7] We found it, give back its position',
                '        else if A[mid] < target:  # [8] If the middle item is too small, look in the right half',
                '            low = mid + 1  # [9] Move the start past the middle',
                '        else:  # [10] If the middle item is too big, look in the left half',
                '            high = mid - 1  # [11] Move the end before the middle',
                '',
                '    return -1  # [12] We ran out of items, it is not here',
            ],
            python: [
                '# Step 1: Search a sorted list by cutting it in half each time',
                'def binary_search(arr: list[int], target: int) -> int:',
                '',
                '    low: int = 0  # [2] Start at the first position',
                '    high: int = len(arr) - 1  # [3] End at the last position',
                '',
                '    while low <= high:  # [4] Keep going while there are items left to check',
                '        mid: int = (low + high) // 2  # [5] Find the middle position',
                '',
                '        if arr[mid] == target:  # [6] Check if the middle item is what we want',
                '            return mid  # [7] We found it, give back its position',
                '        elif arr[mid] < target:  # [8] If the middle item is too small, look in the right half',
                '            low = mid + 1  # [9] Move the start past the middle',
                '        else:  # [10] If the middle item is too big, look in the left half',
                '            high = mid - 1  # [11] Move the end before the middle',
                '',
                '    return -1  # [12] We ran out of items, it is not here',
            ],
            java: [
                '// Step 1: Search a sorted array by cutting it in half each time',
                'int binarySearch(int[] arr, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = arr.length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid = (low + high) / 2;  // [5] Find the middle position',
                '',
                '        if (arr[mid] == target) {  // [6] Check if the middle item is what we want',
                '            return mid;  // [7] We found it, give back its position',
                '        } else if (arr[mid] < target) {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1;  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1;  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    return -1;  // [12] We ran out of items, it is not here',
                '}',
            ],
            cpp: [
                '// Step 1: Search a sorted vector by cutting it in half each time',
                'int binarySearch(vector<int>& arr, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = arr.size() - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid = (low + high) / 2;  // [5] Find the middle position',
                '',
                '        if (arr[mid] == target) {  // [6] Check if the middle item is what we want',
                '            return mid;  // [7] We found it, give back its position',
                '        } else if (arr[mid] < target) {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1;  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1;  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    return -1;  // [12] We ran out of items, it is not here',
                '}',
            ],
            javascript: [
                '// Step 1: Search a sorted array by cutting it in half each time',
                'function binarySearch(arr, target) {',
                '',
                '    let low = 0;  // [2] Start at the first position',
                '    let high = arr.length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        const mid = Math.floor((low + high) / 2);  // [5] Find the middle position',
                '',
                '        if (arr[mid] === target) {  // [6] Check if the middle item is what we want',
                '            return mid;  // [7] We found it, give back its position',
                '        } else if (arr[mid] < target) {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1;  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1;  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    return -1;  // [12] We ran out of items, it is not here',
                '}',
            ],
            c: [
                '// Step 1: Search a sorted array by cutting it in half each time',
                'int binarySearch(int *arr, int n, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = n - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid = (low + high) / 2;  // [5] Find the middle position',
                '',
                '        if (arr[mid] == target) {  // [6] Check if the middle item is what we want',
                '            return mid;  // [7] We found it, give back its position',
                '        } else if (arr[mid] < target) {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1;  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1;  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    return -1;  // [12] We ran out of items, it is not here',
                '}',
            ],
            csharp: [
                '// Step 1: Search a sorted array by cutting it in half each time',
                'int BinarySearch(int[] arr, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = arr.Length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid = (low + high) / 2;  // [5] Find the middle position',
                '',
                '        if (arr[mid] == target) {  // [6] Check if the middle item is what we want',
                '            return mid;  // [7] We found it, give back its position',
                '        } else if (arr[mid] < target) {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1;  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1;  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    return -1;  // [12] We ran out of items, it is not here',
                '}',
            ],
            typescript: [
                '// Step 1: Search a sorted array by cutting it in half each time',
                'function binarySearch(arr: number[], target: number): number {',
                '',
                '    let low: number = 0;  // [2] Start at the first position',
                '    let high: number = arr.length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        const mid: number = Math.floor((low + high) / 2);  // [5] Find the middle position',
                '',
                '        if (arr[mid] === target) {  // [6] Check if the middle item is what we want',
                '            return mid;  // [7] We found it, give back its position',
                '        } else if (arr[mid] < target) {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1;  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1;  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    return -1;  // [12] We ran out of items, it is not here',
                '}',
            ],
            go: [
                '// Step 1: Search a sorted slice by cutting it in half each time',
                'func binarySearch(arr []int, target int) int {',
                '',
                '    low := 0  // [2] Start at the first position',
                '    high := len(arr) - 1  // [3] End at the last position',
                '',
                '    for low <= high {  // [4] Keep going while there are items left to check',
                '        mid := (low + high) / 2  // [5] Find the middle position',
                '',
                '        if arr[mid] == target {  // [6] Check if the middle item is what we want',
                '            return mid  // [7] We found it, give back its position',
                '        } else if arr[mid] < target {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    return -1  // [12] We ran out of items, it is not here',
                '}',
            ],
            rust: [
                '// Step 1: Search a sorted vector by cutting it in half each time',
                'fn binary_search(arr: &Vec<i32>, target: i32) -> Option<usize> {',
                '',
                '    let mut low: usize = 0;  // [2] Start at the first position',
                '    let mut high: usize = arr.len() - 1;  // [3] End at the last position',
                '',
                '    while low <= high {  // [4] Keep going while there are items left to check',
                '        let mid = (low + high) / 2;  // [5] Find the middle position',
                '',
                '        if arr[mid] == target {  // [6] Check if the middle item is what we want',
                '            return Some(mid);  // [7] We found it, give back its position',
                '        } else if arr[mid] < target {  // [8] If the middle item is too small, look in the right half',
                '            low = mid + 1;  // [9] Move the start past the middle',
                '        } else {  // [10] If the middle item is too big, look in the left half',
                '            high = mid - 1;  // [11] Move the end before the middle',
                '        }',
                '    }',
                '',
                '    None  // [12] We ran out of items, it is not here',
                '}',
            ],
        },

        jumpSearch: {
            pseudo: [
                '# Step 1: Jump ahead by blocks, then search inside the right block',
                'procedure jumpSearch(A, target):',
                '',
                '    n = length(A)  # [2] Get the total number of items',
                '    step = floor(sqrt(n))  # [3] Pick a jump size equal to the square root of the list length',
                '',
                '    prev = 0  # [4] Start at the beginning of the list',
                '    while A[min(step, n) - 1] < target:  # [5] Jump ahead until we pass the target or reach the end',
                '        prev = step  # [6] Remember where we jumped from',
                '        step = step + floor(sqrt(n))  # [7] Move the jump point forward by one block',
                '        if prev >= n:  # [8] If we jumped past the end, the target is not here',
                '            return -1  # [9] Give up, it is not in the list',
                '',
                '    while A[prev] < target:  # [10] Walk one item at a time inside the block',
                '        prev = prev + 1  # [11] Move to the next item',
                '        if prev == min(step, n):  # [12] If we reached the end of the block, it is not here',
                '            return -1  # [13] Give up, it is not in the list',
                '',
                '    if A[prev] == target:  # [14] Check if the item we landed on is the target',
                '        return prev  # [15] We found it, give back its position',
                '    return -1  # [16] It is not here',
            ],
            python: [
                '# Step 1: Jump ahead by blocks, then search inside the right block',
                'def jump_search(arr: list[int], target: int) -> int:',
                '',
                '    n: int = len(arr)  # [2] Get the total number of items',
                '    step: int = int(n ** 0.5)  # [3] Pick a jump size equal to the square root of the list length',
                '',
                '    prev: int = 0  # [4] Start at the beginning of the list',
                '    while arr[min(step, n) - 1] < target:  # [5] Jump ahead until we pass the target or reach the end',
                '        prev = step  # [6] Remember where we jumped from',
                '        step += int(n ** 0.5)  # [7] Move the jump point forward by one block',
                '        if prev >= n:  # [8] If we jumped past the end, the target is not here',
                '            return -1  # [9] Give up, it is not in the list',
                '',
                '    while arr[prev] < target:  # [10] Walk one item at a time inside the block',
                '        prev += 1  # [11] Move to the next item',
                '        if prev == min(step, n):  # [12] If we reached the end of the block, it is not here',
                '            return -1  # [13] Give up, it is not in the list',
                '',
                '    if arr[prev] == target:  # [14] Check if the item we landed on is the target',
                '        return prev  # [15] We found it, give back its position',
                '    return -1  # [16] It is not here',
            ],
            java: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'int jumpSearch(int[] arr, int target) {',
                '',
                '    int n = arr.length;  // [2] Get the total number of items',
                '    int step = (int) Math.floor(Math.sqrt(n));  // [3] Pick a jump size equal to the square root of the array length',
                '',
                '    int prev = 0;  // [4] Start at the beginning of the array',
                '    while (arr[Math.min(step, n) - 1] < target) {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step;  // [6] Remember where we jumped from',
                '        step += (int) Math.floor(Math.sqrt(n));  // [7] Move the jump point forward by one block',
                '        if (prev >= n) {  // [8] If we jumped past the end, the target is not here',
                '            return -1;  // [9] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    while (arr[prev] < target) {  // [10] Walk one item at a time inside the block',
                '        prev++;  // [11] Move to the next item',
                '        if (prev == Math.min(step, n)) {  // [12] If we reached the end of the block, it is not here',
                '            return -1;  // [13] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    if (arr[prev] == target) {  // [14] Check if the item we landed on is the target',
                '        return prev;  // [15] We found it, give back its position',
                '    }',
                '    return -1;  // [16] It is not here',
                '}',
            ],
            cpp: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'int jumpSearch(vector<int>& arr, int target) {',
                '',
                '    int n = arr.size();  // [2] Get the total number of items',
                '    int step = floor(sqrt(n));  // [3] Pick a jump size equal to the square root of the vector length',
                '',
                '    int prev = 0;  // [4] Start at the beginning of the vector',
                '    while (arr[min(step, n) - 1] < target) {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step;  // [6] Remember where we jumped from',
                '        step += floor(sqrt(n));  // [7] Move the jump point forward by one block',
                '        if (prev >= n) {  // [8] If we jumped past the end, the target is not here',
                '            return -1;  // [9] Give up, it is not in the vector',
                '        }',
                '    }',
                '',
                '    while (arr[prev] < target) {  // [10] Walk one item at a time inside the block',
                '        prev++;  // [11] Move to the next item',
                '        if (prev == min(step, n)) {  // [12] If we reached the end of the block, it is not here',
                '            return -1;  // [13] Give up, it is not in the vector',
                '        }',
                '    }',
                '',
                '    if (arr[prev] == target) {  // [14] Check if the item we landed on is the target',
                '        return prev;  // [15] We found it, give back its position',
                '    }',
                '    return -1;  // [16] It is not here',
                '}',
            ],
            javascript: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'function jumpSearch(arr, target) {',
                '',
                '    const n = arr.length;  // [2] Get the total number of items',
                '    let step = Math.floor(Math.sqrt(n));  // [3] Pick a jump size equal to the square root of the array length',
                '',
                '    let prev = 0;  // [4] Start at the beginning of the array',
                '    while (arr[Math.min(step, n) - 1] < target) {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step;  // [6] Remember where we jumped from',
                '        step += Math.floor(Math.sqrt(n));  // [7] Move the jump point forward by one block',
                '        if (prev >= n) {  // [8] If we jumped past the end, the target is not here',
                '            return -1;  // [9] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    while (arr[prev] < target) {  // [10] Walk one item at a time inside the block',
                '        prev++;  // [11] Move to the next item',
                '        if (prev === Math.min(step, n)) {  // [12] If we reached the end of the block, it is not here',
                '            return -1;  // [13] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    if (arr[prev] === target) {  // [14] Check if the item we landed on is the target',
                '        return prev;  // [15] We found it, give back its position',
                '    }',
                '    return -1;  // [16] It is not here',
                '}',
            ],
            c: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'int jumpSearch(int *arr, int n, int target) {',
                '',
                '    int step = (int)sqrt((double)n);  // [2] Get the total number of items',
                '    // [3] Pick a jump size equal to the square root of the array length',
                '',
                '    int prev = 0;  // [4] Start at the beginning of the array',
                '    while (arr[(step < n ? step : n) - 1] < target) {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step;  // [6] Remember where we jumped from',
                '        step += (int)sqrt((double)n);  // [7] Move the jump point forward by one block',
                '        if (prev >= n) {  // [8] If we jumped past the end, the target is not here',
                '            return -1;  // [9] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    while (arr[prev] < target) {  // [10] Walk one item at a time inside the block',
                '        prev++;  // [11] Move to the next item',
                '        if (prev == (step < n ? step : n)) {  // [12] If we reached the end of the block, it is not here',
                '            return -1;  // [13] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    if (arr[prev] == target) {  // [14] Check if the item we landed on is the target',
                '        return prev;  // [15] We found it, give back its position',
                '    }',
                '    return -1;  // [16] It is not here',
                '}',
            ],
            csharp: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'int JumpSearch(int[] arr, int target) {',
                '',
                '    int n = arr.Length;  // [2] Get the total number of items',
                '    int step = (int)Math.Floor(Math.Sqrt(n));  // [3] Pick a jump size equal to the square root of the array length',
                '',
                '    int prev = 0;  // [4] Start at the beginning of the array',
                '    while (arr[Math.Min(step, n) - 1] < target) {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step;  // [6] Remember where we jumped from',
                '        step += (int)Math.Floor(Math.Sqrt(n));  // [7] Move the jump point forward by one block',
                '        if (prev >= n) {  // [8] If we jumped past the end, the target is not here',
                '            return -1;  // [9] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    while (arr[prev] < target) {  // [10] Walk one item at a time inside the block',
                '        prev++;  // [11] Move to the next item',
                '        if (prev == Math.Min(step, n)) {  // [12] If we reached the end of the block, it is not here',
                '            return -1;  // [13] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    if (arr[prev] == target) {  // [14] Check if the item we landed on is the target',
                '        return prev;  // [15] We found it, give back its position',
                '    }',
                '    return -1;  // [16] It is not here',
                '}',
            ],
            typescript: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'function jumpSearch(arr: number[], target: number): number {',
                '',
                '    const n: number = arr.length;  // [2] Get the total number of items',
                '    let step: number = Math.floor(Math.sqrt(n));  // [3] Pick a jump size equal to the square root of the array length',
                '',
                '    let prev: number = 0;  // [4] Start at the beginning of the array',
                '    while (arr[Math.min(step, n) - 1] < target) {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step;  // [6] Remember where we jumped from',
                '        step += Math.floor(Math.sqrt(n));  // [7] Move the jump point forward by one block',
                '        if (prev >= n) {  // [8] If we jumped past the end, the target is not here',
                '            return -1;  // [9] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    while (arr[prev] < target) {  // [10] Walk one item at a time inside the block',
                '        prev++;  // [11] Move to the next item',
                '        if (prev === Math.min(step, n)) {  // [12] If we reached the end of the block, it is not here',
                '            return -1;  // [13] Give up, it is not in the array',
                '        }',
                '    }',
                '',
                '    if (arr[prev] === target) {  // [14] Check if the item we landed on is the target',
                '        return prev;  // [15] We found it, give back its position',
                '    }',
                '    return -1;  // [16] It is not here',
                '}',
            ],
            go: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'func jumpSearch(arr []int, target int) int {',
                '',
                '    n := len(arr)  // [2] Get the total number of items',
                '    step := int(math.Sqrt(float64(n)))  // [3] Pick a jump size equal to the square root of the slice length',
                '',
                '    prev := 0  // [4] Start at the beginning of the slice',
                '    for arr[min(step, n)-1] < target {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step  // [6] Remember where we jumped from',
                '        step += int(math.Sqrt(float64(n)))  // [7] Move the jump point forward by one block',
                '        if prev >= n {  // [8] If we jumped past the end, the target is not here',
                '            return -1  // [9] Give up, it is not in the slice',
                '        }',
                '    }',
                '',
                '    for arr[prev] < target {  // [10] Walk one item at a time inside the block',
                '        prev++  // [11] Move to the next item',
                '        if prev == min(step, n) {  // [12] If we reached the end of the block, it is not here',
                '            return -1  // [13] Give up, it is not in the slice',
                '        }',
                '    }',
                '',
                '    if arr[prev] == target {  // [14] Check if the item we landed on is the target',
                '        return prev  // [15] We found it, give back its position',
                '    }',
                '    return -1  // [16] It is not here',
                '}',
            ],
            rust: [
                '// Step 1: Jump ahead by blocks, then search inside the right block',
                'fn jump_search(arr: &Vec<i32>, target: i32) -> Option<usize> {',
                '',
                '    let n = arr.len();  // [2] Get the total number of items',
                '    let step = (n as f64).sqrt() as usize;  // [3] Pick a jump size equal to the square root of the vector length',
                '',
                '    let mut prev = 0usize;  // [4] Start at the beginning of the vector',
                '    let mut step = step;',
                '    while arr[step.min(n) - 1] < target {  // [5] Jump ahead until we pass the target or reach the end',
                '        prev = step;  // [6] Remember where we jumped from',
                '        step += (n as f64).sqrt() as usize;  // [7] Move the jump point forward by one block',
                '        if prev >= n {  // [8] If we jumped past the end, the target is not here',
                '            return None;  // [9] Give up, it is not in the vector',
                '        }',
                '    }',
                '',
                '    while arr[prev] < target {  // [10] Walk one item at a time inside the block',
                '        prev += 1;  // [11] Move to the next item',
                '        if prev == step.min(n) {  // [12] If we reached the end of the block, it is not here',
                '            return None;  // [13] Give up, it is not in the vector',
                '        }',
                '    }',
                '',
                '    if arr[prev] == target {  // [14] Check if the item we landed on is the target',
                '        return Some(prev);  // [15] We found it, give back its position',
                '    }',
                '    None  // [16] It is not here',
                '}',
            ],
        },

        ternarySearch: {
            pseudo: [
                '# Step 1: Search a sorted list by splitting it into three parts each time',
                'procedure ternarySearch(A, target):',
                '',
                '    low = 0  # [2] Start at the first position',
                '    high = length(A) - 1  # [3] End at the last position',
                '',
                '    while low <= high:  # [4] Keep going while there are items left to check',
                '        mid1 = low + (high - low) / 3  # [5] Find the position one third of the way in',
                '        mid2 = high - (high - low) / 3  # [6] Find the position two thirds of the way in',
                '',
                '        if A[mid1] == target:  # [7] Check if the first third marker is what we want',
                '            return mid1  # [8] We found it at the first marker',
                '        if A[mid2] == target:  # [9] Check if the second third marker is what we want',
                '            return mid2  # [10] We found it at the second marker',
                '',
                '        if target < A[mid1]:  # [11] If target is in the first third',
                '            high = mid1 - 1  # [12] Throw away everything after the first marker',
                '        else if target > A[mid2]:  # [13] If target is in the last third',
                '            low = mid2 + 1  # [14] Throw away everything before the second marker',
                '        else:  # [15] Target must be in the middle third',
                '            low = mid1 + 1  # [16] Move start past the first marker',
                '            high = mid2 - 1  # [17] Move end before the second marker',
                '',
                '    return -1  # [18] We ran out of items, it is not here',
            ],
            python: [
                '# Step 1: Search a sorted list by splitting it into three parts each time',
                'def ternary_search(arr: list[int], target: int) -> int:',
                '',
                '    low: int = 0  # [2] Start at the first position',
                '    high: int = len(arr) - 1  # [3] End at the last position',
                '',
                '    while low <= high:  # [4] Keep going while there are items left to check',
                '        mid1: int = low + (high - low) // 3  # [5] Find the position one third of the way in',
                '        mid2: int = high - (high - low) // 3  # [6] Find the position two thirds of the way in',
                '',
                '        if arr[mid1] == target:  # [7] Check if the first third marker is what we want',
                '            return mid1  # [8] We found it at the first marker',
                '        if arr[mid2] == target:  # [9] Check if the second third marker is what we want',
                '            return mid2  # [10] We found it at the second marker',
                '',
                '        if target < arr[mid1]:  # [11] If target is in the first third',
                '            high = mid1 - 1  # [12] Throw away everything after the first marker',
                '        elif target > arr[mid2]:  # [13] If target is in the last third',
                '            low = mid2 + 1  # [14] Throw away everything before the second marker',
                '        else:  # [15] Target must be in the middle third',
                '            low = mid1 + 1  # [16] Move start past the first marker',
                '            high = mid2 - 1  # [17] Move end before the second marker',
                '',
                '    return -1  # [18] We ran out of items, it is not here',
            ],
            java: [
                '// Step 1: Search a sorted array by splitting it into three parts each time',
                'int ternarySearch(int[] arr, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = arr.length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid1 = low + (high - low) / 3;  // [5] Find the position one third of the way in',
                '        int mid2 = high - (high - low) / 3;  // [6] Find the position two thirds of the way in',
                '',
                '        if (arr[mid1] == target) {  // [7] Check if the first third marker is what we want',
                '            return mid1;  // [8] We found it at the first marker',
                '        }',
                '        if (arr[mid2] == target) {  // [9] Check if the second third marker is what we want',
                '            return mid2;  // [10] We found it at the second marker',
                '        }',
                '',
                '        if (target < arr[mid1]) {  // [11] If target is in the first third',
                '            high = mid1 - 1;  // [12] Throw away everything after the first marker',
                '        } else if (target > arr[mid2]) {  // [13] If target is in the last third',
                '            low = mid2 + 1;  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1;  // [16] Move start past the first marker',
                '            high = mid2 - 1;  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    return -1;  // [18] We ran out of items, it is not here',
                '}',
            ],
            cpp: [
                '// Step 1: Search a sorted vector by splitting it into three parts each time',
                'int ternarySearch(vector<int>& arr, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = arr.size() - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid1 = low + (high - low) / 3;  // [5] Find the position one third of the way in',
                '        int mid2 = high - (high - low) / 3;  // [6] Find the position two thirds of the way in',
                '',
                '        if (arr[mid1] == target) {  // [7] Check if the first third marker is what we want',
                '            return mid1;  // [8] We found it at the first marker',
                '        }',
                '        if (arr[mid2] == target) {  // [9] Check if the second third marker is what we want',
                '            return mid2;  // [10] We found it at the second marker',
                '        }',
                '',
                '        if (target < arr[mid1]) {  // [11] If target is in the first third',
                '            high = mid1 - 1;  // [12] Throw away everything after the first marker',
                '        } else if (target > arr[mid2]) {  // [13] If target is in the last third',
                '            low = mid2 + 1;  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1;  // [16] Move start past the first marker',
                '            high = mid2 - 1;  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    return -1;  // [18] We ran out of items, it is not here',
                '}',
            ],
            javascript: [
                '// Step 1: Search a sorted array by splitting it into three parts each time',
                'function ternarySearch(arr, target) {',
                '',
                '    let low = 0;  // [2] Start at the first position',
                '    let high = arr.length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        const mid1 = low + Math.floor((high - low) / 3);  // [5] Find the position one third of the way in',
                '        const mid2 = high - Math.floor((high - low) / 3);  // [6] Find the position two thirds of the way in',
                '',
                '        if (arr[mid1] === target) {  // [7] Check if the first third marker is what we want',
                '            return mid1;  // [8] We found it at the first marker',
                '        }',
                '        if (arr[mid2] === target) {  // [9] Check if the second third marker is what we want',
                '            return mid2;  // [10] We found it at the second marker',
                '        }',
                '',
                '        if (target < arr[mid1]) {  // [11] If target is in the first third',
                '            high = mid1 - 1;  // [12] Throw away everything after the first marker',
                '        } else if (target > arr[mid2]) {  // [13] If target is in the last third',
                '            low = mid2 + 1;  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1;  // [16] Move start past the first marker',
                '            high = mid2 - 1;  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    return -1;  // [18] We ran out of items, it is not here',
                '}',
            ],
            c: [
                '// Step 1: Search a sorted array by splitting it into three parts each time',
                'int ternarySearch(int *arr, int n, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = n - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid1 = low + (high - low) / 3;  // [5] Find the position one third of the way in',
                '        int mid2 = high - (high - low) / 3;  // [6] Find the position two thirds of the way in',
                '',
                '        if (arr[mid1] == target) {  // [7] Check if the first third marker is what we want',
                '            return mid1;  // [8] We found it at the first marker',
                '        }',
                '        if (arr[mid2] == target) {  // [9] Check if the second third marker is what we want',
                '            return mid2;  // [10] We found it at the second marker',
                '        }',
                '',
                '        if (target < arr[mid1]) {  // [11] If target is in the first third',
                '            high = mid1 - 1;  // [12] Throw away everything after the first marker',
                '        } else if (target > arr[mid2]) {  // [13] If target is in the last third',
                '            low = mid2 + 1;  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1;  // [16] Move start past the first marker',
                '            high = mid2 - 1;  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    return -1;  // [18] We ran out of items, it is not here',
                '}',
            ],
            csharp: [
                '// Step 1: Search a sorted array by splitting it into three parts each time',
                'int TernarySearch(int[] arr, int target) {',
                '',
                '    int low = 0;  // [2] Start at the first position',
                '    int high = arr.Length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        int mid1 = low + (high - low) / 3;  // [5] Find the position one third of the way in',
                '        int mid2 = high - (high - low) / 3;  // [6] Find the position two thirds of the way in',
                '',
                '        if (arr[mid1] == target) {  // [7] Check if the first third marker is what we want',
                '            return mid1;  // [8] We found it at the first marker',
                '        }',
                '        if (arr[mid2] == target) {  // [9] Check if the second third marker is what we want',
                '            return mid2;  // [10] We found it at the second marker',
                '        }',
                '',
                '        if (target < arr[mid1]) {  // [11] If target is in the first third',
                '            high = mid1 - 1;  // [12] Throw away everything after the first marker',
                '        } else if (target > arr[mid2]) {  // [13] If target is in the last third',
                '            low = mid2 + 1;  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1;  // [16] Move start past the first marker',
                '            high = mid2 - 1;  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    return -1;  // [18] We ran out of items, it is not here',
                '}',
            ],
            typescript: [
                '// Step 1: Search a sorted array by splitting it into three parts each time',
                'function ternarySearch(arr: number[], target: number): number {',
                '',
                '    let low: number = 0;  // [2] Start at the first position',
                '    let high: number = arr.length - 1;  // [3] End at the last position',
                '',
                '    while (low <= high) {  // [4] Keep going while there are items left to check',
                '        const mid1: number = low + Math.floor((high - low) / 3);  // [5] Find the position one third of the way in',
                '        const mid2: number = high - Math.floor((high - low) / 3);  // [6] Find the position two thirds of the way in',
                '',
                '        if (arr[mid1] === target) {  // [7] Check if the first third marker is what we want',
                '            return mid1;  // [8] We found it at the first marker',
                '        }',
                '        if (arr[mid2] === target) {  // [9] Check if the second third marker is what we want',
                '            return mid2;  // [10] We found it at the second marker',
                '        }',
                '',
                '        if (target < arr[mid1]) {  // [11] If target is in the first third',
                '            high = mid1 - 1;  // [12] Throw away everything after the first marker',
                '        } else if (target > arr[mid2]) {  // [13] If target is in the last third',
                '            low = mid2 + 1;  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1;  // [16] Move start past the first marker',
                '            high = mid2 - 1;  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    return -1;  // [18] We ran out of items, it is not here',
                '}',
            ],
            go: [
                '// Step 1: Search a sorted slice by splitting it into three parts each time',
                'func ternarySearch(arr []int, target int) int {',
                '',
                '    low := 0  // [2] Start at the first position',
                '    high := len(arr) - 1  // [3] End at the last position',
                '',
                '    for low <= high {  // [4] Keep going while there are items left to check',
                '        mid1 := low + (high-low)/3  // [5] Find the position one third of the way in',
                '        mid2 := high - (high-low)/3  // [6] Find the position two thirds of the way in',
                '',
                '        if arr[mid1] == target {  // [7] Check if the first third marker is what we want',
                '            return mid1  // [8] We found it at the first marker',
                '        }',
                '        if arr[mid2] == target {  // [9] Check if the second third marker is what we want',
                '            return mid2  // [10] We found it at the second marker',
                '        }',
                '',
                '        if target < arr[mid1] {  // [11] If target is in the first third',
                '            high = mid1 - 1  // [12] Throw away everything after the first marker',
                '        } else if target > arr[mid2] {  // [13] If target is in the last third',
                '            low = mid2 + 1  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1  // [16] Move start past the first marker',
                '            high = mid2 - 1  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    return -1  // [18] We ran out of items, it is not here',
                '}',
            ],
            rust: [
                '// Step 1: Search a sorted vector by splitting it into three parts each time',
                'fn ternary_search(arr: &Vec<i32>, target: i32) -> Option<usize> {',
                '',
                '    let mut low: usize = 0;  // [2] Start at the first position',
                '    let mut high: usize = arr.len() - 1;  // [3] End at the last position',
                '',
                '    while low <= high {  // [4] Keep going while there are items left to check',
                '        let mid1 = low + (high - low) / 3;  // [5] Find the position one third of the way in',
                '        let mid2 = high - (high - low) / 3;  // [6] Find the position two thirds of the way in',
                '',
                '        if arr[mid1] == target {  // [7] Check if the first third marker is what we want',
                '            return Some(mid1);  // [8] We found it at the first marker',
                '        }',
                '        if arr[mid2] == target {  // [9] Check if the second third marker is what we want',
                '            return Some(mid2);  // [10] We found it at the second marker',
                '        }',
                '',
                '        if target < arr[mid1] {  // [11] If target is in the first third',
                '            high = mid1 - 1;  // [12] Throw away everything after the first marker',
                '        } else if target > arr[mid2] {  // [13] If target is in the last third',
                '            low = mid2 + 1;  // [14] Throw away everything before the second marker',
                '        } else {  // [15] Target must be in the middle third',
                '            low = mid1 + 1;  // [16] Move start past the first marker',
                '            high = mid2 - 1;  // [17] Move end before the second marker',
                '        }',
                '    }',
                '',
                '    None  // [18] We ran out of items, it is not here',
                '}',
            ],
        },

        fibonacciSearch: {
            pseudo: [
                '# Step 1: Search a sorted list using Fibonacci numbers to pick where to look',
                'procedure fibonacciSearch(A, target):',
                '',
                '    n = length(A)  # [2] Get the total number of items',
                '    fib2 = 0  # [3] Two Fibonacci steps back, starts at zero',
                '    fib1 = 1  # [4] One Fibonacci step back, starts at one',
                '    fib = fib1 + fib2  # [5] Current Fibonacci number',
                '',
                '    while fib < n:  # [6] Grow Fibonacci numbers until one covers the whole list',
                '        fib2 = fib1  # [7] Shift the smaller number up',
                '        fib1 = fib  # [8] Shift the current number up',
                '        fib = fib1 + fib2  # [9] Make a new bigger Fibonacci number',
                '',
                '    offset = -1  # [10] Keeps track of where we eliminated up to',
                '',
                '    while fib > 1:  # [11] Keep going while there is more than one item to check',
                '        i = min(offset + fib2, n - 1)  # [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if A[i] < target:  # [13] If this item is too small, look further right',
                '            fib = fib1  # [14] Move down one Fibonacci step',
                '            fib1 = fib2  # [15] Shift the numbers down',
                '            fib2 = fib - fib1  # [16] Get the new smaller Fibonacci number',
                '            offset = i  # [17] Move our starting point forward',
                '        else if A[i] > target:  # [18] If this item is too big, look further left',
                '            fib = fib2  # [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2  # [20] Shift the numbers down',
                '            fib2 = fib - fib1  # [21] Get the new smaller Fibonacci number',
                '        else:  # [22] The item matches the target',
                '            return i  # [23] We found it, give back its position',
                '',
                '    if fib1 == 1 and A[offset + 1] == target:  # [24] Check the last remaining item',
                '        return offset + 1  # [25] We found it at the last spot',
                '    return -1  # [26] We checked everything and did not find it',
            ],
            python: [
                '# Step 1: Search a sorted list using Fibonacci numbers to pick where to look',
                'def fibonacci_search(arr: list[int], target: int) -> int:',
                '',
                '    n: int = len(arr)  # [2] Get the total number of items',
                '    fib2: int = 0  # [3] Two Fibonacci steps back, starts at zero',
                '    fib1: int = 1  # [4] One Fibonacci step back, starts at one',
                '    fib: int = fib1 + fib2  # [5] Current Fibonacci number',
                '',
                '    while fib < n:  # [6] Grow Fibonacci numbers until one covers the whole list',
                '        fib2 = fib1  # [7] Shift the smaller number up',
                '        fib1 = fib  # [8] Shift the current number up',
                '        fib = fib1 + fib2  # [9] Make a new bigger Fibonacci number',
                '',
                '    offset: int = -1  # [10] Keeps track of where we eliminated up to',
                '',
                '    while fib > 1:  # [11] Keep going while there is more than one item to check',
                '        i: int = min(offset + fib2, n - 1)  # [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if arr[i] < target:  # [13] If this item is too small, look further right',
                '            fib = fib1  # [14] Move down one Fibonacci step',
                '            fib1 = fib2  # [15] Shift the numbers down',
                '            fib2 = fib - fib1  # [16] Get the new smaller Fibonacci number',
                '            offset = i  # [17] Move our starting point forward',
                '        elif arr[i] > target:  # [18] If this item is too big, look further left',
                '            fib = fib2  # [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2  # [20] Shift the numbers down',
                '            fib2 = fib - fib1  # [21] Get the new smaller Fibonacci number',
                '        else:  # [22] The item matches the target',
                '            return i  # [23] We found it, give back its position',
                '',
                '    if fib1 == 1 and arr[offset + 1] == target:  # [24] Check the last remaining item',
                '        return offset + 1  # [25] We found it at the last spot',
                '    return -1  # [26] We checked everything and did not find it',
            ],
            java: [
                '// Step 1: Search a sorted array using Fibonacci numbers to pick where to look',
                'int fibonacciSearch(int[] arr, int target) {',
                '',
                '    int n = arr.length;  // [2] Get the total number of items',
                '    int fib2 = 0;  // [3] Two Fibonacci steps back, starts at zero',
                '    int fib1 = 1;  // [4] One Fibonacci step back, starts at one',
                '    int fib = fib1 + fib2;  // [5] Current Fibonacci number',
                '',
                '    while (fib < n) {  // [6] Grow Fibonacci numbers until one covers the whole array',
                '        fib2 = fib1;  // [7] Shift the smaller number up',
                '        fib1 = fib;  // [8] Shift the current number up',
                '        fib = fib1 + fib2;  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    int offset = -1;  // [10] Keeps track of where we eliminated up to',
                '',
                '    while (fib > 1) {  // [11] Keep going while there is more than one item to check',
                '        int i = Math.min(offset + fib2, n - 1);  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if (arr[i] < target) {  // [13] If this item is too small, look further right',
                '            fib = fib1;  // [14] Move down one Fibonacci step',
                '            fib1 = fib2;  // [15] Shift the numbers down',
                '            fib2 = fib - fib1;  // [16] Get the new smaller Fibonacci number',
                '            offset = i;  // [17] Move our starting point forward',
                '        } else if (arr[i] > target) {  // [18] If this item is too big, look further left',
                '            fib = fib2;  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2;  // [20] Shift the numbers down',
                '            fib2 = fib - fib1;  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return i;  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if (fib1 == 1 && arr[offset + 1] == target) {  // [24] Check the last remaining item',
                '        return offset + 1;  // [25] We found it at the last spot',
                '    }',
                '    return -1;  // [26] We checked everything and did not find it',
                '}',
            ],
            cpp: [
                '// Step 1: Search a sorted vector using Fibonacci numbers to pick where to look',
                'int fibonacciSearch(vector<int>& arr, int target) {',
                '',
                '    int n = arr.size();  // [2] Get the total number of items',
                '    int fib2 = 0;  // [3] Two Fibonacci steps back, starts at zero',
                '    int fib1 = 1;  // [4] One Fibonacci step back, starts at one',
                '    int fib = fib1 + fib2;  // [5] Current Fibonacci number',
                '',
                '    while (fib < n) {  // [6] Grow Fibonacci numbers until one covers the whole vector',
                '        fib2 = fib1;  // [7] Shift the smaller number up',
                '        fib1 = fib;  // [8] Shift the current number up',
                '        fib = fib1 + fib2;  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    int offset = -1;  // [10] Keeps track of where we eliminated up to',
                '',
                '    while (fib > 1) {  // [11] Keep going while there is more than one item to check',
                '        int i = min(offset + fib2, n - 1);  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if (arr[i] < target) {  // [13] If this item is too small, look further right',
                '            fib = fib1;  // [14] Move down one Fibonacci step',
                '            fib1 = fib2;  // [15] Shift the numbers down',
                '            fib2 = fib - fib1;  // [16] Get the new smaller Fibonacci number',
                '            offset = i;  // [17] Move our starting point forward',
                '        } else if (arr[i] > target) {  // [18] If this item is too big, look further left',
                '            fib = fib2;  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2;  // [20] Shift the numbers down',
                '            fib2 = fib - fib1;  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return i;  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if (fib1 == 1 && arr[offset + 1] == target) {  // [24] Check the last remaining item',
                '        return offset + 1;  // [25] We found it at the last spot',
                '    }',
                '    return -1;  // [26] We checked everything and did not find it',
                '}',
            ],
            javascript: [
                '// Step 1: Search a sorted array using Fibonacci numbers to pick where to look',
                'function fibonacciSearch(arr, target) {',
                '',
                '    const n = arr.length;  // [2] Get the total number of items',
                '    let fib2 = 0;  // [3] Two Fibonacci steps back, starts at zero',
                '    let fib1 = 1;  // [4] One Fibonacci step back, starts at one',
                '    let fib = fib1 + fib2;  // [5] Current Fibonacci number',
                '',
                '    while (fib < n) {  // [6] Grow Fibonacci numbers until one covers the whole array',
                '        fib2 = fib1;  // [7] Shift the smaller number up',
                '        fib1 = fib;  // [8] Shift the current number up',
                '        fib = fib1 + fib2;  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    let offset = -1;  // [10] Keeps track of where we eliminated up to',
                '',
                '    while (fib > 1) {  // [11] Keep going while there is more than one item to check',
                '        const i = Math.min(offset + fib2, n - 1);  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if (arr[i] < target) {  // [13] If this item is too small, look further right',
                '            fib = fib1;  // [14] Move down one Fibonacci step',
                '            fib1 = fib2;  // [15] Shift the numbers down',
                '            fib2 = fib - fib1;  // [16] Get the new smaller Fibonacci number',
                '            offset = i;  // [17] Move our starting point forward',
                '        } else if (arr[i] > target) {  // [18] If this item is too big, look further left',
                '            fib = fib2;  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2;  // [20] Shift the numbers down',
                '            fib2 = fib - fib1;  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return i;  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if (fib1 === 1 && arr[offset + 1] === target) {  // [24] Check the last remaining item',
                '        return offset + 1;  // [25] We found it at the last spot',
                '    }',
                '    return -1;  // [26] We checked everything and did not find it',
                '}',
            ],
            c: [
                '// Step 1: Search a sorted array using Fibonacci numbers to pick where to look',
                'int fibonacciSearch(int *arr, int n, int target) {',
                '',
                '    int fib2 = 0;  // [2] Get the total number of items',
                '    // [3] Two Fibonacci steps back, starts at zero',
                '    int fib1 = 1;  // [4] One Fibonacci step back, starts at one',
                '    int fib = fib1 + fib2;  // [5] Current Fibonacci number',
                '',
                '    while (fib < n) {  // [6] Grow Fibonacci numbers until one covers the whole array',
                '        fib2 = fib1;  // [7] Shift the smaller number up',
                '        fib1 = fib;  // [8] Shift the current number up',
                '        fib = fib1 + fib2;  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    int offset = -1;  // [10] Keeps track of where we eliminated up to',
                '',
                '    while (fib > 1) {  // [11] Keep going while there is more than one item to check',
                '        int i = (offset + fib2 < n - 1) ? offset + fib2 : n - 1;  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if (arr[i] < target) {  // [13] If this item is too small, look further right',
                '            fib = fib1;  // [14] Move down one Fibonacci step',
                '            fib1 = fib2;  // [15] Shift the numbers down',
                '            fib2 = fib - fib1;  // [16] Get the new smaller Fibonacci number',
                '            offset = i;  // [17] Move our starting point forward',
                '        } else if (arr[i] > target) {  // [18] If this item is too big, look further left',
                '            fib = fib2;  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2;  // [20] Shift the numbers down',
                '            fib2 = fib - fib1;  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return i;  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if (fib1 == 1 && arr[offset + 1] == target) {  // [24] Check the last remaining item',
                '        return offset + 1;  // [25] We found it at the last spot',
                '    }',
                '    return -1;  // [26] We checked everything and did not find it',
                '}',
            ],
            csharp: [
                '// Step 1: Search a sorted array using Fibonacci numbers to pick where to look',
                'int FibonacciSearch(int[] arr, int target) {',
                '',
                '    int n = arr.Length;  // [2] Get the total number of items',
                '    int fib2 = 0;  // [3] Two Fibonacci steps back, starts at zero',
                '    int fib1 = 1;  // [4] One Fibonacci step back, starts at one',
                '    int fib = fib1 + fib2;  // [5] Current Fibonacci number',
                '',
                '    while (fib < n) {  // [6] Grow Fibonacci numbers until one covers the whole array',
                '        fib2 = fib1;  // [7] Shift the smaller number up',
                '        fib1 = fib;  // [8] Shift the current number up',
                '        fib = fib1 + fib2;  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    int offset = -1;  // [10] Keeps track of where we eliminated up to',
                '',
                '    while (fib > 1) {  // [11] Keep going while there is more than one item to check',
                '        int i = Math.Min(offset + fib2, n - 1);  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if (arr[i] < target) {  // [13] If this item is too small, look further right',
                '            fib = fib1;  // [14] Move down one Fibonacci step',
                '            fib1 = fib2;  // [15] Shift the numbers down',
                '            fib2 = fib - fib1;  // [16] Get the new smaller Fibonacci number',
                '            offset = i;  // [17] Move our starting point forward',
                '        } else if (arr[i] > target) {  // [18] If this item is too big, look further left',
                '            fib = fib2;  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2;  // [20] Shift the numbers down',
                '            fib2 = fib - fib1;  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return i;  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if (fib1 == 1 && arr[offset + 1] == target) {  // [24] Check the last remaining item',
                '        return offset + 1;  // [25] We found it at the last spot',
                '    }',
                '    return -1;  // [26] We checked everything and did not find it',
                '}',
            ],
            typescript: [
                '// Step 1: Search a sorted array using Fibonacci numbers to pick where to look',
                'function fibonacciSearch(arr: number[], target: number): number {',
                '',
                '    const n: number = arr.length;  // [2] Get the total number of items',
                '    let fib2: number = 0;  // [3] Two Fibonacci steps back, starts at zero',
                '    let fib1: number = 1;  // [4] One Fibonacci step back, starts at one',
                '    let fib: number = fib1 + fib2;  // [5] Current Fibonacci number',
                '',
                '    while (fib < n) {  // [6] Grow Fibonacci numbers until one covers the whole array',
                '        fib2 = fib1;  // [7] Shift the smaller number up',
                '        fib1 = fib;  // [8] Shift the current number up',
                '        fib = fib1 + fib2;  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    let offset: number = -1;  // [10] Keeps track of where we eliminated up to',
                '',
                '    while (fib > 1) {  // [11] Keep going while there is more than one item to check',
                '        const i: number = Math.min(offset + fib2, n - 1);  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if (arr[i] < target) {  // [13] If this item is too small, look further right',
                '            fib = fib1;  // [14] Move down one Fibonacci step',
                '            fib1 = fib2;  // [15] Shift the numbers down',
                '            fib2 = fib - fib1;  // [16] Get the new smaller Fibonacci number',
                '            offset = i;  // [17] Move our starting point forward',
                '        } else if (arr[i] > target) {  // [18] If this item is too big, look further left',
                '            fib = fib2;  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2;  // [20] Shift the numbers down',
                '            fib2 = fib - fib1;  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return i;  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if (fib1 === 1 && arr[offset + 1] === target) {  // [24] Check the last remaining item',
                '        return offset + 1;  // [25] We found it at the last spot',
                '    }',
                '    return -1;  // [26] We checked everything and did not find it',
                '}',
            ],
            go: [
                '// Step 1: Search a sorted slice using Fibonacci numbers to pick where to look',
                'func fibonacciSearch(arr []int, target int) int {',
                '',
                '    n := len(arr)  // [2] Get the total number of items',
                '    fib2 := 0  // [3] Two Fibonacci steps back, starts at zero',
                '    fib1 := 1  // [4] One Fibonacci step back, starts at one',
                '    fib := fib1 + fib2  // [5] Current Fibonacci number',
                '',
                '    for fib < n {  // [6] Grow Fibonacci numbers until one covers the whole slice',
                '        fib2 = fib1  // [7] Shift the smaller number up',
                '        fib1 = fib  // [8] Shift the current number up',
                '        fib = fib1 + fib2  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    offset := -1  // [10] Keeps track of where we eliminated up to',
                '',
                '    for fib > 1 {  // [11] Keep going while there is more than one item to check',
                '        i := min(offset+fib2, n-1)  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if arr[i] < target {  // [13] If this item is too small, look further right',
                '            fib = fib1  // [14] Move down one Fibonacci step',
                '            fib1 = fib2  // [15] Shift the numbers down',
                '            fib2 = fib - fib1  // [16] Get the new smaller Fibonacci number',
                '            offset = i  // [17] Move our starting point forward',
                '        } else if arr[i] > target {  // [18] If this item is too big, look further left',
                '            fib = fib2  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2  // [20] Shift the numbers down',
                '            fib2 = fib - fib1  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return i  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if fib1 == 1 && arr[offset+1] == target {  // [24] Check the last remaining item',
                '        return offset + 1  // [25] We found it at the last spot',
                '    }',
                '    return -1  // [26] We checked everything and did not find it',
                '}',
            ],
            rust: [
                '// Step 1: Search a sorted vector using Fibonacci numbers to pick where to look',
                'fn fibonacci_search(arr: &Vec<i32>, target: i32) -> Option<usize> {',
                '',
                '    let n = arr.len();  // [2] Get the total number of items',
                '    let mut fib2: usize = 0;  // [3] Two Fibonacci steps back, starts at zero',
                '    let mut fib1: usize = 1;  // [4] One Fibonacci step back, starts at one',
                '    let mut fib: usize = fib1 + fib2;  // [5] Current Fibonacci number',
                '',
                '    while fib < n {  // [6] Grow Fibonacci numbers until one covers the whole vector',
                '        fib2 = fib1;  // [7] Shift the smaller number up',
                '        fib1 = fib;  // [8] Shift the current number up',
                '        fib = fib1 + fib2;  // [9] Make a new bigger Fibonacci number',
                '    }',
                '',
                '    let mut offset: i64 = -1;  // [10] Keeps track of where we eliminated up to',
                '',
                '    while fib > 1 {  // [11] Keep going while there is more than one item to check',
                '        let i = ((offset + fib2 as i64) as usize).min(n - 1);  // [12] Pick a position using the smaller Fibonacci number',
                '',
                '        if arr[i] < target {  // [13] If this item is too small, look further right',
                '            fib = fib1;  // [14] Move down one Fibonacci step',
                '            fib1 = fib2;  // [15] Shift the numbers down',
                '            fib2 = fib - fib1;  // [16] Get the new smaller Fibonacci number',
                '            offset = i as i64;  // [17] Move our starting point forward',
                '        } else if arr[i] > target {  // [18] If this item is too big, look further left',
                '            fib = fib2;  // [19] Move down two Fibonacci steps',
                '            fib1 = fib1 - fib2;  // [20] Shift the numbers down',
                '            fib2 = fib - fib1;  // [21] Get the new smaller Fibonacci number',
                '        } else {  // [22] The item matches the target',
                '            return Some(i);  // [23] We found it, give back its position',
                '        }',
                '    }',
                '',
                '    if fib1 == 1 && arr[(offset + 1) as usize] == target {  // [24] Check the last remaining item',
                '        return Some((offset + 1) as usize);  // [25] We found it at the last spot',
                '    }',
                '    None  // [26] We checked everything and did not find it',
                '}',
            ],
        },

        interpolationSearch: {
            pseudo: [
                '# Interpolation Search on sorted array A',
                'procedure interpolationSearch(A, target):',
                '    low = 0; high = length(A) - 1  # [2] initialise bounds',
                '    while low <= high and target >= A[low] and target <= A[high]:  # [3] check bounds',
                '        pos = low + floor((target - A[low]) * (high - low) / (A[high] - A[low]))  # [4] estimate position',
                '        if A[pos] == target:  # [5] check probe',
                '            return pos  # found  # [6]',
                '        ',
                '        if A[pos] < target:  # [8] target is to the right',
                '            low = pos + 1  # [9]',
                '        else:',
                '            high = pos - 1  # [11]',
                '    return -1  # not found  # [13]',
            ],
            python: [
                '# Interpolation Search on sorted list A',
                'def interpolation_search(arr: list[int], target: int) -> int:',
                '    low: int = 0',
                '    high: int = len(arr) - 1  # [2] initialise bounds',
                '    while low <= high and target >= arr[low] and target <= arr[high]:  # [3] check bounds',
                '        if arr[low] == arr[high]:',
                '            return low if arr[low] == target else -1',
                '        pos: int = low + (target - arr[low]) * (high - low) // (arr[high] - arr[low])  # [4] estimate position',
                '        if arr[pos] == target:  # [5] check probe',
                '            return pos  # [6] found',
                '        if arr[pos] < target:  # [8] target is to the right',
                '            low = pos + 1  # [9]',
                '        else:',
                '            high = pos - 1  # [11]',
                '    return -1  # [13] not found',
            ],
            java: [
                '// Interpolation Search on sorted array',
                'int interpolationSearch(int[] arr, int target) {',
                '    int low = 0, high = arr.length - 1;  // [2] initialise bounds',
                '    while (low <= high && target >= arr[low] && target <= arr[high]) {  // [3] check bounds',
                '        if (arr[low] == arr[high]) {',
                '            return arr[low] == target ? low : -1;',
                '        }',
                '        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);  // [4] estimate position',
                '        if (arr[pos] == target) return pos;  // [5][6] found',
                '        if (arr[pos] < target) {  // [8]',
                '            low = pos + 1;  // [9]',
                '        } else {',
                '            high = pos - 1;  // [11]',
                '        }',
                '    }',
                '    return -1;  // [13] not found',
                '}',
            ],
            cpp: [
                '// Interpolation Search on sorted vector',
                'int interpolationSearch(vector<int>& arr, int target) {',
                '    int low = 0, high = (int)arr.size() - 1;  // [2] initialise bounds',
                '    while (low <= high && target >= arr[low] && target <= arr[high]) {  // [3] check bounds',
                '        if (arr[low] == arr[high]) {',
                '            return arr[low] == target ? low : -1;',
                '        }',
                '        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);  // [4] estimate position',
                '        if (arr[pos] == target) return pos;  // [5][6] found',
                '        if (arr[pos] < target) {  // [8]',
                '            low = pos + 1;  // [9]',
                '        } else {',
                '            high = pos - 1;  // [11]',
                '        }',
                '    }',
                '    return -1;  // [13] not found',
                '}',
            ],
            c: [
                '// Interpolation Search on sorted array',
                'int interpolationSearch(int *arr, int n, int target) {',
                '    int low = 0, high = n - 1;  // [2] initialise bounds',
                '    while (low <= high && target >= arr[low] && target <= arr[high]) {  // [3] check bounds',
                '        if (arr[low] == arr[high]) {',
                '            return arr[low] == target ? low : -1;',
                '        }',
                '        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);  // [4] estimate position',
                '        if (arr[pos] == target) return pos;  // [5][6] found',
                '        if (arr[pos] < target) {  // [8]',
                '            low = pos + 1;  // [9]',
                '        } else {',
                '            high = pos - 1;  // [11]',
                '        }',
                '    }',
                '    return -1;  // [13] not found',
                '}',
            ],
            csharp: [
                '// Interpolation Search on sorted array',
                'int InterpolationSearch(int[] arr, int target) {',
                '    int low = 0, high = arr.Length - 1;  // [2] initialise bounds',
                '    while (low <= high && target >= arr[low] && target <= arr[high]) {  // [3] check bounds',
                '        if (arr[low] == arr[high]) {',
                '            return arr[low] == target ? low : -1;',
                '        }',
                '        int pos = low + (target - arr[low]) * (high - low) / (arr[high] - arr[low]);  // [4] estimate position',
                '        if (arr[pos] == target) return pos;  // [5][6] found',
                '        if (arr[pos] < target) {  // [8]',
                '            low = pos + 1;  // [9]',
                '        } else {',
                '            high = pos - 1;  // [11]',
                '        }',
                '    }',
                '    return -1;  // [13] not found',
                '}',
            ],
            javascript: [
                '// Interpolation Search on sorted array',
                'function interpolationSearch(arr, target) {',
                '    let low = 0, high = arr.length - 1;  // [2] initialise bounds',
                '    while (low <= high && target >= arr[low] && target <= arr[high]) {  // [3] check bounds',
                '        if (arr[low] === arr[high]) {',
                '            return arr[low] === target ? low : -1;',
                '        }',
                '        const pos = low + Math.floor((target - arr[low]) * (high - low) / (arr[high] - arr[low]));  // [4] estimate position',
                '        if (arr[pos] === target) return pos;  // [5][6] found',
                '        if (arr[pos] < target) {  // [8]',
                '            low = pos + 1;  // [9]',
                '        } else {',
                '            high = pos - 1;  // [11]',
                '        }',
                '    }',
                '    return -1;  // [13] not found',
                '}',
            ],
            typescript: [
                '// Interpolation Search on sorted array',
                'function interpolationSearch(arr: number[], target: number): number {',
                '    let low: number = 0, high: number = arr.length - 1;  // [2] initialise bounds',
                '    while (low <= high && target >= arr[low] && target <= arr[high]) {  // [3] check bounds',
                '        if (arr[low] === arr[high]) {',
                '            return arr[low] === target ? low : -1;',
                '        }',
                '        const pos: number = low + Math.floor((target - arr[low]) * (high - low) / (arr[high] - arr[low]));  // [4] estimate position',
                '        if (arr[pos] === target) return pos;  // [5][6] found',
                '        if (arr[pos] < target) {  // [8]',
                '            low = pos + 1;  // [9]',
                '        } else {',
                '            high = pos - 1;  // [11]',
                '        }',
                '    }',
                '    return -1;  // [13] not found',
                '}',
            ],
            go: [
                '// Interpolation Search on sorted slice',
                'func interpolationSearch(arr []int, target int) int {',
                '    low, high := 0, len(arr)-1  // [2] initialise bounds',
                '    for low <= high && target >= arr[low] && target <= arr[high] {  // [3] check bounds',
                '        if arr[low] == arr[high] {',
                '            if arr[low] == target { return low }',
                '            return -1',
                '        }',
                '        pos := low + (target-arr[low])*(high-low)/(arr[high]-arr[low])  // [4] estimate position',
                '        if arr[pos] == target { return pos }  // [5][6] found',
                '        if arr[pos] < target {  // [8]',
                '            low = pos + 1  // [9]',
                '        } else {',
                '            high = pos - 1  // [11]',
                '        }',
                '    }',
                '    return -1  // [13] not found',
                '}',
            ],
            rust: [
                '// Interpolation Search on sorted vector',
                'fn interpolation_search(arr: &[i32], target: i32) -> Option<usize> {',
                '    let mut low: usize = 0;',
                '    let mut high: usize = arr.len() - 1;  // [2] initialise bounds',
                '    while low <= high && target >= arr[low] && target <= arr[high] {  // [3] check bounds',
                '        if arr[low] == arr[high] {',
                '            return if arr[low] == target { Some(low) } else { None };',
                '        }',
                '        let pos = (low as i64 + (target - arr[low]) as i64 * (high - low) as i64',
                '            / (arr[high] - arr[low]) as i64) as usize;  // [4] estimate position',
                '        if arr[pos] == target { return Some(pos); }  // [5][6] found',
                '        if arr[pos] < target {  // [8]',
                '            low = pos + 1;  // [9]',
                '        } else {',
                '            high = pos - 1;  // [11]',
                '        }',
                '    }',
                '    None  // [13] not found',
                '}',
            ],
        },

        exponentialSearch: {
            pseudo: [
                '# Exponential Search on sorted array A',
                'procedure exponentialSearch(A, target):',
                '    n = length(A)',
                '    if A[0] == target: return 0  # [2] check first element',
                '    bound = 1  # [3] start with index 1',
                '    while bound < n and A[bound] <= target:  # [4] double until overshoot',
                '        bound = bound * 2  # [5]',
                '    # binary search in [bound/2, min(bound, n-1)]',
                '    low = floor(bound / 2); high = min(bound, n - 1)  # [7]',
                '    while low <= high:  # [8]',
                '        mid = floor((low + high) / 2)  # [9]',
                '        if A[mid] == target: return mid  # [10]',
                '        ',
                '        if A[mid] < target: low = mid + 1  # [12]',
                '        else: high = mid - 1  # [14]',
                '    return -1  # [16]',
            ],
            python: [
                '# Exponential Search on sorted list A',
                'def exponential_search(arr: list[int], target: int) -> int:',
                '    n: int = len(arr)',
                '    if arr[0] == target: return 0  # [2] check first element',
                '    bound: int = 1  # [3] start with index 1',
                '    while bound < n and arr[bound] <= target:  # [4] double until overshoot',
                '        bound *= 2  # [5]',
                '    low: int = bound // 2',
                '    high: int = min(bound, n - 1)  # [7]',
                '    while low <= high:  # [8]',
                '        mid: int = (low + high) // 2  # [9]',
                '        if arr[mid] == target: return mid  # [10]',
                '        if arr[mid] < target:  # [12]',
                '            low = mid + 1',
                '        else:',
                '            high = mid - 1  # [14]',
                '    return -1  # [16]',
            ],
            java: [
                '// Exponential Search on sorted array',
                'int exponentialSearch(int[] arr, int target) {',
                '    int n = arr.length;',
                '    if (arr[0] == target) return 0;  // [2] check first element',
                '    int bound = 1;  // [3] start with index 1',
                '    while (bound < n && arr[bound] <= target) bound *= 2;  // [4][5]',
                '    int low = bound / 2, high = Math.min(bound, n - 1);  // [7]',
                '    while (low <= high) {  // [8]',
                '        int mid = (low + high) / 2;  // [9]',
                '        if (arr[mid] == target) return mid;  // [10]',
                '        if (arr[mid] < target) {  // [12]',
                '            low = mid + 1;',
                '        } else {',
                '            high = mid - 1;  // [14]',
                '        }',
                '    }',
                '    return -1;  // [16]',
                '}',
            ],
            cpp: [
                '// Exponential Search on sorted vector',
                'int exponentialSearch(vector<int>& arr, int target) {',
                '    int n = (int)arr.size();',
                '    if (arr[0] == target) return 0;  // [2] check first element',
                '    int bound = 1;  // [3] start with index 1',
                '    while (bound < n && arr[bound] <= target) bound *= 2;  // [4][5]',
                '    int low = bound / 2, high = min(bound, n - 1);  // [7]',
                '    while (low <= high) {  // [8]',
                '        int mid = (low + high) / 2;  // [9]',
                '        if (arr[mid] == target) return mid;  // [10]',
                '        if (arr[mid] < target) {  // [12]',
                '            low = mid + 1;',
                '        } else {',
                '            high = mid - 1;  // [14]',
                '        }',
                '    }',
                '    return -1;  // [16]',
                '}',
            ],
            c: [
                '// Exponential Search on sorted array',
                'int exponentialSearch(int *arr, int n, int target) {',
                '    if (arr[0] == target) return 0;  // [2] check first element',
                '    int bound = 1;  // [3] start with index 1',
                '    while (bound < n && arr[bound] <= target) bound *= 2;  // [4][5]',
                '    int low = bound / 2, high = (bound < n) ? bound : n - 1;  // [7]',
                '    while (low <= high) {  // [8]',
                '        int mid = (low + high) / 2;  // [9]',
                '        if (arr[mid] == target) return mid;  // [10]',
                '        if (arr[mid] < target) {  // [12]',
                '            low = mid + 1;',
                '        } else {',
                '            high = mid - 1;  // [14]',
                '        }',
                '    }',
                '    return -1;  // [16]',
                '}',
            ],
            csharp: [
                '// Exponential Search on sorted array',
                'int ExponentialSearch(int[] arr, int target) {',
                '    int n = arr.Length;',
                '    if (arr[0] == target) return 0;  // [2] check first element',
                '    int bound = 1;  // [3] start with index 1',
                '    while (bound < n && arr[bound] <= target) bound *= 2;  // [4][5]',
                '    int low = bound / 2, high = Math.Min(bound, n - 1);  // [7]',
                '    while (low <= high) {  // [8]',
                '        int mid = (low + high) / 2;  // [9]',
                '        if (arr[mid] == target) return mid;  // [10]',
                '        if (arr[mid] < target) {  // [12]',
                '            low = mid + 1;',
                '        } else {',
                '            high = mid - 1;  // [14]',
                '        }',
                '    }',
                '    return -1;  // [16]',
                '}',
            ],
            javascript: [
                '// Exponential Search on sorted array',
                'function exponentialSearch(arr, target) {',
                '    const n = arr.length;',
                '    if (arr[0] === target) return 0;  // [2] check first element',
                '    let bound = 1;  // [3] start with index 1',
                '    while (bound < n && arr[bound] <= target) bound *= 2;  // [4][5]',
                '    let low = Math.floor(bound / 2);',
                '    let high = Math.min(bound, n - 1);  // [7]',
                '    while (low <= high) {  // [8]',
                '        const mid = Math.floor((low + high) / 2);  // [9]',
                '        if (arr[mid] === target) return mid;  // [10]',
                '        if (arr[mid] < target) {  // [12]',
                '            low = mid + 1;',
                '        } else {',
                '            high = mid - 1;  // [14]',
                '        }',
                '    }',
                '    return -1;  // [16]',
                '}',
            ],
            typescript: [
                '// Exponential Search on sorted array',
                'function exponentialSearch(arr: number[], target: number): number {',
                '    const n: number = arr.length;',
                '    if (arr[0] === target) return 0;  // [2] check first element',
                '    let bound: number = 1;  // [3] start with index 1',
                '    while (bound < n && arr[bound] <= target) bound *= 2;  // [4][5]',
                '    let low: number = Math.floor(bound / 2);',
                '    let high: number = Math.min(bound, n - 1);  // [7]',
                '    while (low <= high) {  // [8]',
                '        const mid: number = Math.floor((low + high) / 2);  // [9]',
                '        if (arr[mid] === target) return mid;  // [10]',
                '        if (arr[mid] < target) {  // [12]',
                '            low = mid + 1;',
                '        } else {',
                '            high = mid - 1;  // [14]',
                '        }',
                '    }',
                '    return -1;  // [16]',
                '}',
            ],
            go: [
                '// Exponential Search on sorted slice',
                'func exponentialSearch(arr []int, target int) int {',
                '    n := len(arr)',
                '    if arr[0] == target { return 0 }  // [2] check first element',
                '    bound := 1  // [3] start with index 1',
                '    for bound < n && arr[bound] <= target { bound *= 2 }  // [4][5]',
                '    low := bound / 2',
                '    high := bound',
                '    if high >= n { high = n - 1 }  // [7]',
                '    for low <= high {  // [8]',
                '        mid := (low + high) / 2  // [9]',
                '        if arr[mid] == target { return mid }  // [10]',
                '        if arr[mid] < target {  // [12]',
                '            low = mid + 1',
                '        } else {',
                '            high = mid - 1  // [14]',
                '        }',
                '    }',
                '    return -1  // [16]',
                '}',
            ],
            rust: [
                '// Exponential Search on sorted vector',
                'fn exponential_search(arr: &[i32], target: i32) -> Option<usize> {',
                '    let n = arr.len();',
                '    if arr[0] == target { return Some(0); }  // [2] check first element',
                '    let mut bound: usize = 1;  // [3] start with index 1',
                '    while bound < n && arr[bound] <= target { bound *= 2; }  // [4][5]',
                '    let low = bound / 2;',
                '    let high = (bound).min(n - 1);  // [7]',
                '    let mut lo = low;',
                '    let mut hi = high;',
                '    while lo <= hi {  // [8]',
                '        let mid = (lo + hi) / 2;  // [9]',
                '        if arr[mid] == target { return Some(mid); }  // [10]',
                '        if arr[mid] < target {  // [12]',
                '            lo = mid + 1;',
                '        } else if mid == 0 {',
                '            break;',
                '        } else {',
                '            hi = mid - 1;  // [14]',
                '        }',
                '    }',
                '    None  // [16]',
                '}',
            ],
        },

        sentinelLinearSearch: {
            pseudo: [
                '# Sentinel Linear Search',
                'procedure sentinelLinearSearch(A, target):',
                '    n = length(A)',
                '    last = A[n-1]  # [2] save last element',
                '    A[n-1] = target  # [3] place sentinel',
                '    i = 0  # [4]',
                '    while A[i] != target:  # [5] scan — sentinel guarantees termination',
                '        i = i + 1  # [6]',
                '    A[n-1] = last  # [8] restore last element',
                '    if i < n-1 or A[n-1] == target:  # [9] was it a real find?',
                '        return i  # [10]',
                '    return -1  # [12]',
            ],
            python: [
                '# Sentinel Linear Search',
                'def sentinel_linear_search(arr: list[int], target: int) -> int:',
                '    n: int = len(arr)',
                '    last: int = arr[n - 1]  # [2] save last element',
                '    arr[n - 1] = target  # [3] place sentinel',
                '    i: int = 0  # [4]',
                '    while arr[i] != target:  # [5] scan — sentinel guarantees termination',
                '        i += 1  # [6]',
                '    arr[n - 1] = last  # [8] restore last element',
                '    if i < n - 1 or arr[n - 1] == target:  # [9] was it a real find?',
                '        return i  # [10]',
                '    return -1  # [12]',
            ],
            java: [
                '// Sentinel Linear Search',
                'int sentinelLinearSearch(int[] arr, int target) {',
                '    int n = arr.length;',
                '    int last = arr[n - 1];  // [2] save last element',
                '    arr[n - 1] = target;  // [3] place sentinel',
                '    int i = 0;  // [4]',
                '    while (arr[i] != target) i++;  // [5][6] scan — sentinel guarantees termination',
                '    arr[n - 1] = last;  // [8] restore last element',
                '    if (i < n - 1 || arr[n - 1] == target) {  // [9] was it a real find?',
                '        return i;  // [10]',
                '    }',
                '    return -1;  // [12]',
                '}',
            ],
            cpp: [
                '// Sentinel Linear Search',
                'int sentinelLinearSearch(vector<int>& arr, int target) {',
                '    int n = (int)arr.size();',
                '    int last = arr[n - 1];  // [2] save last element',
                '    arr[n - 1] = target;  // [3] place sentinel',
                '    int i = 0;  // [4]',
                '    while (arr[i] != target) i++;  // [5][6] scan — sentinel guarantees termination',
                '    arr[n - 1] = last;  // [8] restore last element',
                '    if (i < n - 1 || arr[n - 1] == target) {  // [9] was it a real find?',
                '        return i;  // [10]',
                '    }',
                '    return -1;  // [12]',
                '}',
            ],
            c: [
                '// Sentinel Linear Search',
                'int sentinelLinearSearch(int *arr, int n, int target) {',
                '    int last = arr[n - 1];  // [2] save last element',
                '    arr[n - 1] = target;  // [3] place sentinel',
                '    int i = 0;  // [4]',
                '    while (arr[i] != target) i++;  // [5][6] scan — sentinel guarantees termination',
                '    arr[n - 1] = last;  // [8] restore last element',
                '    if (i < n - 1 || arr[n - 1] == target) {  // [9] was it a real find?',
                '        return i;  // [10]',
                '    }',
                '    return -1;  // [12]',
                '}',
            ],
            csharp: [
                '// Sentinel Linear Search',
                'int SentinelLinearSearch(int[] arr, int target) {',
                '    int n = arr.Length;',
                '    int last = arr[n - 1];  // [2] save last element',
                '    arr[n - 1] = target;  // [3] place sentinel',
                '    int i = 0;  // [4]',
                '    while (arr[i] != target) i++;  // [5][6] scan — sentinel guarantees termination',
                '    arr[n - 1] = last;  // [8] restore last element',
                '    if (i < n - 1 || arr[n - 1] == target) {  // [9] was it a real find?',
                '        return i;  // [10]',
                '    }',
                '    return -1;  // [12]',
                '}',
            ],
            javascript: [
                '// Sentinel Linear Search',
                'function sentinelLinearSearch(arr, target) {',
                '    const n = arr.length;',
                '    const last = arr[n - 1];  // [2] save last element',
                '    arr[n - 1] = target;  // [3] place sentinel',
                '    let i = 0;  // [4]',
                '    while (arr[i] !== target) i++;  // [5][6] scan — sentinel guarantees termination',
                '    arr[n - 1] = last;  // [8] restore last element',
                '    if (i < n - 1 || arr[n - 1] === target) {  // [9] was it a real find?',
                '        return i;  // [10]',
                '    }',
                '    return -1;  // [12]',
                '}',
            ],
            typescript: [
                '// Sentinel Linear Search',
                'function sentinelLinearSearch(arr: number[], target: number): number {',
                '    const n: number = arr.length;',
                '    const last: number = arr[n - 1];  // [2] save last element',
                '    arr[n - 1] = target;  // [3] place sentinel',
                '    let i: number = 0;  // [4]',
                '    while (arr[i] !== target) i++;  // [5][6] scan — sentinel guarantees termination',
                '    arr[n - 1] = last;  // [8] restore last element',
                '    if (i < n - 1 || arr[n - 1] === target) {  // [9] was it a real find?',
                '        return i;  // [10]',
                '    }',
                '    return -1;  // [12]',
                '}',
            ],
            go: [
                '// Sentinel Linear Search',
                'func sentinelLinearSearch(arr []int, target int) int {',
                '    n := len(arr)',
                '    last := arr[n-1]  // [2] save last element',
                '    arr[n-1] = target  // [3] place sentinel',
                '    i := 0  // [4]',
                '    for arr[i] != target { i++ }  // [5][6] scan — sentinel guarantees termination',
                '    arr[n-1] = last  // [8] restore last element',
                '    if i < n-1 || arr[n-1] == target {  // [9] was it a real find?',
                '        return i  // [10]',
                '    }',
                '    return -1  // [12]',
                '}',
            ],
            rust: [
                '// Sentinel Linear Search',
                'fn sentinel_linear_search(arr: &mut Vec<i32>, target: i32) -> Option<usize> {',
                '    let n = arr.len();',
                '    let last = arr[n - 1];  // [2] save last element',
                '    arr[n - 1] = target;  // [3] place sentinel',
                '    let mut i: usize = 0;  // [4]',
                '    while arr[i] != target { i += 1; }  // [5][6] scan — sentinel guarantees termination',
                '    arr[n - 1] = last;  // [8] restore last element',
                '    if i < n - 1 || arr[n - 1] == target {  // [9] was it a real find?',
                '        return Some(i);  // [10]',
                '    }',
                '    None  // [12]',
                '}',
            ],
        },
    };

    // ─── Complexity Info ───

    /** @type {Object.<string, {name: string, best: string, average: string, worst: string, space: string, description: string}>} */
    const COMPLEXITY = {
        linearSearch: {
            name: 'Linear Search',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Start at the beginning and check each item one by one. ' +
                'If you find what you are looking for, stop. ' +
                'If you reach the end without finding it, it is not there. ' +
                'Simple but slow for large lists.',
            useCase:
                'Use when the list is small, unsorted, or you only need to search once. ' +
                'Also the only option when items are not in any particular order. ' +
                'Common in everyday tasks like scanning a grocery list or reading emails from top to bottom.',
            avoid:
                'Avoid when the list is large and already sorted. Binary Search will be ' +
                'much faster in that case. Also avoid if you need to search the same list ' +
                'many times, because sorting it once and using Binary Search saves time overall.',
            realWorld:
                'The most common search in practice. Used when searching unsorted data: finding a name in a contact list, ' +
                'scanning a log file for an error message, or checking if a username exists in a database. ' +
                'Powers the `Array.prototype.indexOf()` and `Array.prototype.includes()` methods in JavaScript. ' +
                'Also used in string matching (naive substring search).',
            mentalModel:
                'Walk through every element one by one. Like looking for your keys by checking every surface ' +
                'in the room systematically.',
            difficulty: 'Easy',
            patterns: ['Search', 'Sequential', 'Linear'],
            leetcodeTags: ['search', 'array', 'basic', 'interview-common'],
        },
        binarySearch: {
            name: 'Binary Search',
            best: 'O(1)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(1)',
            description:
                'Only works on a sorted list. Look at the middle item. ' +
                'If it is your target, you are done. If your target is smaller, ' +
                'throw away the right half. If bigger, throw away the left half. ' +
                'Repeat with what is left. Each step cuts the list in half.',
            useCase:
                'Use when the list is already sorted and you need to search it many times. ' +
                'This is how a dictionary works: you open to the middle, then flip left or right. ' +
                'Used in databases, spell checkers, and finding items in sorted files.',
            avoid:
                'Cannot be used on an unsorted list. If items are added or removed often, ' +
                'keeping the list sorted is expensive. Also not worth it if you only search once, ' +
                'because sorting the list first takes longer than just doing a Linear Search.',
            realWorld:
                'Used everywhere sorted data needs fast lookup: dictionary lookups, spell checkers, ' +
                'database indexes (B-trees use binary search within nodes), version control systems ' +
                '(Git uses binary search for bisecting commits to find bugs), and auto-complete systems. ' +
                'Powers Python\'s `bisect` module and Java\'s `Arrays.binarySearch()`.',
            mentalModel:
                'Like searching for a word in a dictionary. Open to the middle, if your word comes earlier ' +
                'go to the first half, if later go to the second half. Repeat until you find it or run out of pages.',
            difficulty: 'Easy',
            patterns: ['Modified Binary Search', 'Two Pointers', 'Divide and Conquer'],
            leetcodeTags: ['binary-search', 'search', 'array', 'easy', 'interview-common']
        },
        jumpSearch: {
            name: 'Jump Search',
            best: 'O(1)',
            average: 'O(\u221an)',
            worst: 'O(\u221an)',
            space: 'O(1)',
            description:
                'Only works on a sorted list. Jump forward by a fixed number of steps ' +
                'equal to the square root of the list length. Once you jump past the target, ' +
                'go back to the last jump point and walk forward one item at a time. ' +
                'It is like skipping pages in a book, then reading line by line.',
            useCase:
                'Use when the list is sorted and you want something simpler than Binary Search. ' +
                'Good when jumping backward is expensive, like on linked lists that only go forward. ' +
                'Works well for medium-sized sorted data where you want a balance of speed and simplicity.',
            avoid:
                'Avoid when the list is unsorted, because Jump Search needs items in order. ' +
                'For very large sorted lists, Binary Search is faster. Also not a good choice when ' +
                'the list changes often, since keeping it sorted adds extra work.',
            realWorld:
                'Used in systems where sequential access is much faster than random access, such as searching data on ' +
                'magnetic tape or in compressed files where jumping to a specific block is expensive. Also applied in ' +
                'inverted index searching in search engines and in some database implementations for block-level data scanning.',
        },
        ternarySearch: {
            name: 'Ternary Search',
            best: 'O(1)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(1)',
            description:
                'Only works on a sorted list. Instead of splitting in half like Binary Search, ' +
                'it splits the list into three equal parts and checks two dividing points. ' +
                'If the target is not at either point, two thirds of the list are thrown away. ' +
                'Each step removes more of the list, but does two comparisons instead of one.',
            useCase:
                'Use when the list is sorted and you want to narrow down the search area quickly. ' +
                'Helpful in math problems where you need to find the peak or valley of a function. ' +
                'Works well when comparison is cheap but the search space is very large.',
            avoid:
                'Avoid when the list is unsorted, because Ternary Search needs items in order. ' +
                'For most practical cases Binary Search is faster because it does fewer comparisons. ' +
                'Not worth the extra complexity unless you are solving optimization problems on unimodal functions.',
            realWorld:
                'Used in optimization problems to find the maximum or minimum of a unimodal function (peak finding). ' +
                'Applied in numerical methods for finding roots, in computer graphics for ray-surface intersection tests, ' +
                'and in some implementations of the `pow()` function in math libraries. ' +
                'Also used in competitive programming for ternary search on answer problems.',
        },
        fibonacciSearch: {
            name: 'Fibonacci Search',
            best: 'O(1)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(1)',
            description:
                'Only works on a sorted list. Uses Fibonacci numbers to decide where to look next. ' +
                'Instead of dividing the list in half, it uses addition and subtraction to pick positions. ' +
                'This avoids costly division operations and accesses nearby memory locations, ' +
                'which can be faster on some hardware.',
            useCase:
                'Use when the list is sorted and stored in a way where reading nearby items is fast ' +
                'but reading far-away items is slow, like on a hard drive or tape. ' +
                'Good when you want to avoid division and only use addition and subtraction.',
            avoid:
                'Avoid when the list is unsorted or when you have fast random access to any position. ' +
                'On modern computers with fast memory, Binary Search is usually just as fast and simpler. ' +
                'Also not a good choice for very small lists where Linear Search would be easier.',
            realWorld:
                'Used in systems where division operations are expensive, such as some embedded processors without ' +
                'hardware division. Applied in searching on systems with Fibonacci coding compression. ' +
                'Historically relevant for searching on tape drives where the access pattern aligned with Fibonacci numbers. ' +
                'Also used in some specialized database index structures.',
        },
        interpolationSearch: {
            name: 'Interpolation Search',
            best: 'O(1)',
            average: 'O(log log n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Like binary search but probes using value interpolation to estimate where the target likely sits. ' +
                'Works like guessing where "Smith" is in a phone book — you open near the S section rather than the middle.',
            useCase:
                'Best on large, uniformly distributed sorted arrays where the probe formula lands close to the target quickly.',
            avoid:
                'Avoid with non-uniform distributions (clustered values); the formula can produce bad probes, degrading to O(n). ' +
                'Also avoid with very small arrays where binary search is simpler.',
            realWorld:
                'Used in phone book lookups and dictionary searches where values are uniformly distributed ' +
                '(names starting with "M" are roughly in the middle). Applied in database indexing for uniformly distributed keys, ' +
                'in numerical tables for fast value lookups, and in some implementations of the `std::lower_bound` ' +
                'optimization for known distributions.',
        },
        exponentialSearch: {
            name: 'Exponential Search',
            best: 'O(1)',
            average: 'O(log n)',
            worst: 'O(log n)',
            space: 'O(1)',
            description:
                'Doubles an index (1\u21922\u21924\u21928...) until overshooting the target, then binary searches the identified range. ' +
                'Combines range-finding with binary search.',
            useCase:
                'Ideal for unbounded or very large sorted arrays where the target is near the beginning. ' +
                'Also useful when array size is unknown.',
            avoid:
                'No advantage over binary search on small or medium bounded arrays. ' +
                'Slightly more complex for the same O(log n) result.',
            realWorld:
                'Used when searching unbounded or infinite streams (e.g., searching a geometrically growing log file). ' +
                'Applied in networking for finding the optimal packet size, in file systems for locating data in sparse files, ' +
                'and as a preprocessing step before binary search when the array size is unknown. ' +
                'Common in distributed systems for range queries on sorted partitions.',
        },
        sentinelLinearSearch: {
            name: 'Sentinel Linear Search',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Places the target at the end of the array as a sentinel, eliminating the need for a bounds check in the inner loop. ' +
                'Guaranteed to find the sentinel, so the loop only needs one condition.',
            useCase:
                'Minor optimisation over standard linear search in performance-critical loops. ' +
                'Useful when reducing branch instructions matters.',
            avoid:
                'Only marginally faster than linear search. ' +
                'Avoid when the array cannot be temporarily modified. ' +
                'Binary search is far better on sorted data.',
            realWorld:
                'Used in high-performance implementations of linear search where the inner loop must be as tight as possible. ' +
                'Applied in low-level string matching routines, in embedded systems with strict timing constraints, ' +
                'and in some C standard library `memchr()` implementations. The technique of placing a sentinel at the end ' +
                'eliminates one comparison per iteration.',
        },
    };

    /**
     * Linear Search generator.
     *
     * @param {number[]} arr - The array to search.
     * @param {number} target - The value to find.
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* linearSearch(arr, target) {
        for (let i = 0; i < arr.length; i++) {
            yield { type: 'check', indices: [i], codeLine: 2 };
            if (arr[i] === target) {
                yield { type: 'found', indices: [i], codeLine: 3 };
                return;
            }
        }
        yield { type: 'notFound', indices: [], codeLine: 4 };
    }

    /**
     * Binary Search generator. Expects a sorted array.
     *
     * @param {number[]} arr - The sorted array to search.
     * @param {number} target - The value to find.
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* binarySearch(arr, target) {
        let low = 0;
        let high = arr.length - 1;

        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            yield { type: 'check', indices: [mid], codeLine: 4 };

            if (arr[mid] === target) {
                yield { type: 'found', indices: [mid], codeLine: 5 };
                return;
            } else if (arr[mid] < target) {
                // Eliminate left half
                for (let i = low; i <= mid; i++) {
                    yield { type: 'eliminate', indices: [i], codeLine: 8 };
                }
                low = mid + 1;
            } else {
                // Eliminate right half
                for (let i = mid; i <= high; i++) {
                    yield { type: 'eliminate', indices: [i], codeLine: 10 };
                }
                high = mid - 1;
            }
        }
        yield { type: 'notFound', indices: [], codeLine: 11 };
    }

    /**
     * Jump Search generator. Expects a sorted array.
     *
     * @param {number[]} arr - The sorted array to search.
     * @param {number} target - The value to find.
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* jumpSearch(arr, target) {
        const n = arr.length;
        const step = Math.floor(Math.sqrt(n));
        let blockEnd = step;
        let prev = 0;

        // Jump phase: skip ahead by blocks of size sqrt(n)
        while (blockEnd < n && arr[Math.min(blockEnd, n) - 1] < target) {
            yield { type: 'check', indices: [Math.min(blockEnd, n) - 1], codeLine: 5 };
            // Eliminate the block we just skipped
            for (let i = prev; i < Math.min(blockEnd, n); i++) {
                yield { type: 'eliminate', indices: [i], codeLine: 6 };
            }
            prev = blockEnd;
            blockEnd += step;
            if (prev >= n) {
                yield { type: 'notFound', indices: [], codeLine: 9 };
                return;
            }
        }

        // Check the boundary element at end of jump phase
        if (blockEnd >= n || arr[Math.min(blockEnd, n) - 1] >= target) {
            yield { type: 'check', indices: [Math.min(blockEnd, n) - 1], codeLine: 5 };
        }

        // Linear phase: walk through the identified block
        const upperBound = Math.min(blockEnd, n);
        while (prev < upperBound) {
            yield { type: 'check', indices: [prev], codeLine: 10 };
            if (arr[prev] === target) {
                yield { type: 'found', indices: [prev], codeLine: 14 };
                return;
            }
            if (arr[prev] > target) {
                break;
            }
            prev++;
        }

        yield { type: 'notFound', indices: [], codeLine: 16 };
    }

    /**
     * Ternary Search generator. Expects a sorted array.
     *
     * @param {number[]} arr - The sorted array to search.
     * @param {number} target - The value to find.
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* ternarySearch(arr, target) {
        let low = 0;
        let high = arr.length - 1;

        while (low <= high) {
            const mid1 = low + Math.floor((high - low) / 3);
            const mid2 = high - Math.floor((high - low) / 3);

            yield { type: 'check', indices: [mid1], codeLine: 5 };
            if (arr[mid1] === target) {
                yield { type: 'found', indices: [mid1], codeLine: 7 };
                return;
            }

            yield { type: 'check', indices: [mid2], codeLine: 6 };
            if (arr[mid2] === target) {
                yield { type: 'found', indices: [mid2], codeLine: 9 };
                return;
            }

            if (target < arr[mid1]) {
                // Eliminate middle and right thirds
                for (let i = mid1; i <= high; i++) {
                    yield { type: 'eliminate', indices: [i], codeLine: 11 };
                }
                high = mid1 - 1;
            } else if (target > arr[mid2]) {
                // Eliminate left and middle thirds
                for (let i = low; i <= mid2; i++) {
                    yield { type: 'eliminate', indices: [i], codeLine: 13 };
                }
                low = mid2 + 1;
            } else {
                // Eliminate first and last thirds
                for (let i = low; i <= mid1; i++) {
                    yield { type: 'eliminate', indices: [i], codeLine: 15 };
                }
                for (let i = mid2; i <= high; i++) {
                    yield { type: 'eliminate', indices: [i], codeLine: 15 };
                }
                low = mid1 + 1;
                high = mid2 - 1;
            }
        }
        yield { type: 'notFound', indices: [], codeLine: 18 };
    }

    /**
     * Fibonacci Search generator. Expects a sorted array.
     *
     * @param {number[]} arr - The sorted array to search.
     * @param {number} target - The value to find.
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* fibonacciSearch(arr, target) {
        const n = arr.length;
        let fib2 = 0;
        let fib1 = 1;
        let fib = fib1 + fib2;

        while (fib < n) {
            fib2 = fib1;
            fib1 = fib;
            fib = fib1 + fib2;
        }

        let offset = -1;

        while (fib > 1) {
            const i = Math.min(offset + fib2, n - 1);
            yield { type: 'check', indices: [i], codeLine: 12 };

            if (arr[i] < target) {
                // Eliminate everything up to i
                for (let j = offset + 1; j <= i; j++) {
                    yield { type: 'eliminate', indices: [j], codeLine: 13 };
                }
                fib = fib1;
                fib1 = fib2;
                fib2 = fib - fib1;
                offset = i;
            } else if (arr[i] > target) {
                // Eliminate everything from i onward in this segment
                for (let j = i; j <= Math.min(offset + fib, n - 1); j++) {
                    yield { type: 'eliminate', indices: [j], codeLine: 18 };
                }
                fib = fib2;
                fib1 = fib1 - fib2;
                fib2 = fib - fib1;
            } else {
                yield { type: 'found', indices: [i], codeLine: 22 };
                return;
            }
        }

        // Check the last remaining element
        if (fib1 === 1 && offset + 1 < n) {
            yield { type: 'check', indices: [offset + 1], codeLine: 24 };
            if (arr[offset + 1] === target) {
                yield { type: 'found', indices: [offset + 1], codeLine: 24 };
                return;
            }
        }

        yield { type: 'notFound', indices: [], codeLine: 26 };
    }

    /**
     * Interpolation Search generator. Expects a sorted array.
     *
     * Estimates the probe position using linear interpolation based on the value
     * distribution, allowing it to converge quickly on uniformly distributed data.
     *
     * @param {number[]} arr - The sorted array to search.
     * @param {number} target - The value to find.
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     * @returns {number} Index of target, or -1 if not found.
     */
    function* interpolationSearch(arr, target) {
        let low = 0, high = arr.length - 1;
        while (low <= high && target >= arr[low] && target <= arr[high]) {
            if (arr[low] === arr[high]) {
                // Uniform values edge case
                if (arr[low] === target) {
                    yield { type: 'found', indices: [low], codeLine: 6 };
                    return low;
                }
                break;
            }
            const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
            yield { type: 'check', indices: [pos], codeLine: 4 };
            yield { type: 'compare', indices: [low, high], codeLine: 3 };
            if (arr[pos] === target) {
                yield { type: 'found', indices: [pos], codeLine: 6 };
                return pos;
            }
            if (arr[pos] < target) {
                yield { type: 'eliminate', indices: Array.from({ length: pos - low + 1 }, (_, i) => low + i), codeLine: 9 };
                low = pos + 1;
            } else {
                yield { type: 'eliminate', indices: Array.from({ length: high - pos + 1 }, (_, i) => pos + i), codeLine: 11 };
                high = pos - 1;
            }
        }
        yield { type: 'notFound', indices: [], codeLine: 13 };
        return -1;
    }

    /**
     * Exponential Search generator. Expects a sorted array.
     *
     * Doubles the bound index (1, 2, 4, 8, ...) until arr[bound] >= target,
     * then performs binary search over the identified range [bound/2, bound].
     *
     * @param {number[]} arr - The sorted array to search.
     * @param {number} target - The value to find.
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     * @returns {number} Index of target, or -1 if not found.
     */
    function* exponentialSearch(arr, target) {
        const n = arr.length;
        if (arr[0] === target) {
            yield { type: 'found', indices: [0], codeLine: 2 };
            return 0;
        }
        yield { type: 'check', indices: [0], codeLine: 2 };
        let bound = 1;
        while (bound < n && arr[bound] <= target) {
            yield { type: 'check', indices: [bound], codeLine: 4 };
            bound *= 2;
        }
        let low = Math.floor(bound / 2);
        let high = Math.min(bound, n - 1);
        yield { type: 'compare', indices: [low, high], codeLine: 7 };
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            yield { type: 'check', indices: [mid], codeLine: 9 };
            if (arr[mid] === target) {
                yield { type: 'found', indices: [mid], codeLine: 10 };
                return mid;
            }
            if (arr[mid] < target) {
                yield { type: 'eliminate', indices: Array.from({ length: mid - low + 1 }, (_, i) => low + i), codeLine: 12 };
                low = mid + 1;
            } else {
                yield { type: 'eliminate', indices: Array.from({ length: high - mid + 1 }, (_, i) => mid + i), codeLine: 14 };
                high = mid - 1;
            }
        }
        yield { type: 'notFound', indices: [], codeLine: 16 };
        return -1;
    }

    /**
     * Sentinel Linear Search generator. Works on unsorted arrays.
     *
     * Temporarily places the target at the last position as a sentinel so the
     * scan loop requires only one condition per iteration (no bounds check).
     * The array is restored before the function returns.
     *
     * @param {number[]} arr - The array to search (may be unsorted).
     * @param {number} target - The value to find.
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     * @returns {number} Index of target, or -1 if not found.
     */
    function* sentinelLinearSearch(arr, target) {
        const n = arr.length;
        const last = arr[n - 1];
        arr[n - 1] = target; // place sentinel
        let i = 0;
        while (arr[i] !== target) {
            yield { type: 'check', indices: [i], codeLine: 5 };
            i++;
        }
        arr[n - 1] = last; // restore
        yield { type: 'check', indices: [i], codeLine: 5 };
        if (i < n - 1 || arr[n - 1] === target) {
            yield { type: 'found', indices: [i], codeLine: 10 };
            return i;
        }
        yield { type: 'notFound', indices: [], codeLine: 12 };
        return -1;
    }

    return {
        CODE,
        COMPLEXITY,
        linearSearch,
        binarySearch,
        jumpSearch,
        ternarySearch,
        fibonacciSearch,
        interpolationSearch,
        exponentialSearch,
        sentinelLinearSearch,
    };
})();

export default SearchingAlgorithms;
