/**
 * Sorting algorithm generators.
 *
 * Each algorithm is a generator function that yields step objects:
 * { type: 'compare'|'swap'|'overwrite'|'sorted'|'partition', indices: number[], codeLine: object }
 *
 * codeLine maps language keys to line numbers in the corresponding code snippet.
 */

const SortingAlgorithms = (() => {

    // ─── Code Snippets (per language) ───

    const CODE = {
        bubbleSort: {
            pseudo: [
                '# Step 1: Start the bubble sort procedure with list A',
                'procedure bubbleSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '',
                '    for i = 0 to n - 1:  # [3] Go through the list n times',
                '        swapped = false  # [4] We have not swapped anything yet in this pass',
                '',
                '        for j = 0 to n - i - 2:  # [5] Look at each pair of neighbors that is not yet sorted',
                '            if A[j] > A[j + 1]:  # [6] If the left neighbor is bigger than the right one',
                '                swap A[j] and A[j + 1]  # [7] Swap them so the smaller one comes first',
                '                swapped = true  # [8] Remember that we made a swap',
                '',
                '        if not swapped:  # [9] If nothing was swapped, the list is already sorted',
                '            break  # [10] Stop early because we are done',
                '',
                '    return A  # [11] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with bubble sort',
                'def bubble_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '',
                '    for i in range(n):  # [3] Repeat for each position in the list',
                '        swapped: bool = False  # [4] No swaps have happened yet in this pass',
                '',
                '        for j in range(n - i - 1):  # [5] Walk through the unsorted part of the list',
                '            if arr[j] > arr[j + 1]:  # [6] Check if the left item is bigger than the right item',
                '                arr[j], arr[j + 1] = arr[j + 1], arr[j]  # [7] Swap the two items so the smaller one is first',
                '                swapped = True  # [8] Mark that we made a swap',
                '',
                '        if not swapped:  # [9] If no swaps happened, the list is sorted',
                '            break  # [10] Leave the loop early',
                '',
                '    return arr  # [11] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using bubble sort',
                'void bubbleSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Loop through the array n times',
                '        boolean swapped = false;  // [4] Track whether we swapped anything',
                '',
                '        for (int j = 0; j < n - i - 1; j++) {  // [5] Compare each pair of neighbors',
                '            if (arr[j] > arr[j + 1]) {  // [6] If the left one is bigger than the right one',
                '                int temp = arr[j];  // [7] Save the left value in a temporary spot',
                '                arr[j] = arr[j + 1];  // [7] Move the right value to the left spot',
                '                arr[j + 1] = temp;  // [7] Put the saved value in the right spot',
                '                swapped = true;  // [8] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        if (!swapped) break;  // [9] If nothing was swapped, stop early',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using bubble sort',
                'void bubbleSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Go through the array n times',
                '        bool swapped = false;  // [4] No swaps yet in this pass',
                '',
                '        for (int j = 0; j < n - i - 1; j++) {  // [5] Compare each pair of neighbors',
                '            if (arr[j] > arr[j + 1]) {  // [6] If the left one is bigger',
                '                swap(arr[j], arr[j + 1]);  // [7] Swap the two items',
                '                swapped = true;  // [8] Mark that a swap happened',
                '            }',
                '        }',
                '',
                '        if (!swapped) break;  // [9] If no swaps happened, we are done',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using bubble sort',
                'function bubbleSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i = 0; i < n; i++) {  // [3] Loop through the array n times',
                '        let swapped = false;  // [4] Track whether any swap happened',
                '',
                '        for (let j = 0; j < n - i - 1; j++) {  // [5] Compare each pair of neighbors',
                '            if (arr[j] > arr[j + 1]) {  // [6] If the left one is bigger than the right one',
                '                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // [7] Swap the two items',
                '                swapped = true;  // [8] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        if (!swapped) break;  // [9] If nothing was swapped, stop early',
                '    }',
                '',
                '    return arr;  // [11] Return the sorted array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using bubble sort',
                'void bubbleSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Loop through the array n times',
                '        int swapped = 0;  // [4] Track whether any swap happened',
                '',
                '        for (int j = 0; j < n - i - 1; j++) {  // [5] Compare each pair of neighbors',
                '            if (arr[j] > arr[j + 1]) {  // [6] If the left one is bigger than the right one',
                '                int temp = arr[j];  // [7] Save the left value',
                '                arr[j] = arr[j + 1];  // [7] Move the right value to the left',
                '                arr[j + 1] = temp;  // [7] Put the saved value on the right',
                '                swapped = 1;  // [8] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        if (!swapped) break;  // [9] If nothing was swapped, stop early',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using bubble sort',
                'void BubbleSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Loop through the array n times',
                '        bool swapped = false;  // [4] Track whether any swap happened',
                '',
                '        for (int j = 0; j < n - i - 1; j++) {  // [5] Compare each pair of neighbors',
                '            if (arr[j] > arr[j + 1]) {  // [6] If the left one is bigger than the right one',
                '                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);  // [7] Swap the two items',
                '                swapped = true;  // [8] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        if (!swapped) break;  // [9] If nothing was swapped, stop early',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using bubble sort',
                'function bubbleSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i: number = 0; i < n; i++) {  // [3] Loop through the array n times',
                '        let swapped: boolean = false;  // [4] Track whether any swap happened',
                '',
                '        for (let j: number = 0; j < n - i - 1; j++) {  // [5] Compare each pair of neighbors',
                '            if (arr[j] > arr[j + 1]) {  // [6] If the left one is bigger than the right one',
                '                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];  // [7] Swap the two items',
                '                swapped = true;  // [8] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        if (!swapped) break;  // [9] If nothing was swapped, stop early',
                '    }',
                '',
                '    return arr;  // [11] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using bubble sort',
                'func bubbleSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '',
                '    for i := 0; i < n; i++ {  // [3] Loop through the slice n times',
                '        swapped := false  // [4] Track whether any swap happened',
                '',
                '        for j := 0; j < n-i-1; j++ {  // [5] Compare each pair of neighbors',
                '            if arr[j] > arr[j+1] {  // [6] If the left one is bigger than the right one',
                '                arr[j], arr[j+1] = arr[j+1], arr[j]  // [7] Swap the two items',
                '                swapped = true  // [8] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        if !swapped { break }  // [9] If nothing was swapped, stop early',
                '    }',
                '',
                '    return arr  // [11] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using bubble sort',
                'fn bubble_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '',
                '    for i in 0..n {  // [3] Loop through the vector n times',
                '        let mut swapped: bool = false;  // [4] Track whether any swap happened',
                '',
                '        for j in 0..n - i - 1 {  // [5] Compare each pair of neighbors',
                '            if arr[j] > arr[j + 1] {  // [6] If the left one is bigger than the right one',
                '                arr.swap(j, j + 1);  // [7] Swap the two items',
                '                swapped = true;  // [8] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        if !swapped { break; }  // [9] If nothing was swapped, stop early',
                '    }',
                '}',
            ],
        },

        selectionSort: {
            pseudo: [
                '# Step 1: Start the selection sort procedure with list A',
                'procedure selectionSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '',
                '    for i = 0 to n - 1:  # [3] Go through each position in the list',
                '        minIdx = i  # [4] Assume the current position has the smallest value',
                '',
                '        for j = i + 1 to n - 1:  # [5] Look at every item after position i',
                '            if A[j] < A[minIdx]:  # [6] If we find something smaller',
                '                minIdx = j  # [7] Remember where the new smallest item is',
                '',
                '        if minIdx != i:  # [8] If the smallest item is not already in the right spot',
                '            swap A[i] and A[minIdx]  # [9] Swap it into the right spot',
                '',
                '    return A  # [10] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with selection sort',
                'def selection_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '',
                '    for i in range(n):  # [3] Go through each position in the list',
                '        min_idx: int = i  # [4] Start by assuming the smallest is at position i',
                '',
                '        for j in range(i + 1, n):  # [5] Check every item after position i',
                '            if arr[j] < arr[min_idx]:  # [6] If this item is smaller than our current smallest',
                '                min_idx = j  # [7] Update the position of the smallest item',
                '',
                '        if min_idx != i:  # [8] If the smallest is not already in the right place',
                '            arr[i], arr[min_idx] = arr[min_idx], arr[i]  # [9] Swap it into the correct position',
                '',
                '    return arr  # [10] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using selection sort',
                'void selectionSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Go through each position',
                '        int minIdx = i;  // [4] Assume the smallest is at position i',
                '',
                '        for (int j = i + 1; j < n; j++) {  // [5] Look at every item after i',
                '            if (arr[j] < arr[minIdx]) {  // [6] If we find a smaller item',
                '                minIdx = j;  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if (minIdx != i) {  // [8] If the smallest is not at position i',
                '            int temp = arr[i];  // [9] Save the value at position i',
                '            arr[i] = arr[minIdx];  // [9] Put the smallest value at position i',
                '            arr[minIdx] = temp;  // [9] Put the saved value where the smallest was',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using selection sort',
                'void selectionSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Go through each position',
                '        int minIdx = i;  // [4] Assume the smallest is at position i',
                '',
                '        for (int j = i + 1; j < n; j++) {  // [5] Look at every item after i',
                '            if (arr[j] < arr[minIdx]) {  // [6] If we find a smaller item',
                '                minIdx = j;  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if (minIdx != i) {  // [8] If the smallest is not at position i',
                '            swap(arr[i], arr[minIdx]);  // [9] Swap the smallest into position i',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using selection sort',
                'function selectionSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i = 0; i < n; i++) {  // [3] Go through each position',
                '        let minIdx = i;  // [4] Assume the smallest is at position i',
                '',
                '        for (let j = i + 1; j < n; j++) {  // [5] Look at every item after i',
                '            if (arr[j] < arr[minIdx]) {  // [6] If we find a smaller item',
                '                minIdx = j;  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if (minIdx !== i) {  // [8] If the smallest is not at position i',
                '            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];  // [9] Swap the smallest into position i',
                '        }',
                '    }',
                '',
                '    return arr;  // [10] Return the sorted array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using selection sort',
                'void selectionSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Go through each position',
                '        int minIdx = i;  // [4] Assume the smallest is at position i',
                '',
                '        for (int j = i + 1; j < n; j++) {  // [5] Look at every item after i',
                '            if (arr[j] < arr[minIdx]) {  // [6] If we find a smaller item',
                '                minIdx = j;  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if (minIdx != i) {  // [8] If the smallest is not at position i',
                '            int temp = arr[i];  // [9] Save the value at position i',
                '            arr[i] = arr[minIdx];  // [9] Put the smallest value at position i',
                '            arr[minIdx] = temp;  // [9] Put the saved value where the smallest was',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using selection sort',
                'void SelectionSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Go through each position',
                '        int minIdx = i;  // [4] Assume the smallest is at position i',
                '',
                '        for (int j = i + 1; j < n; j++) {  // [5] Look at every item after i',
                '            if (arr[j] < arr[minIdx]) {  // [6] If we find a smaller item',
                '                minIdx = j;  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if (minIdx != i) {  // [8] If the smallest is not at position i',
                '            (arr[i], arr[minIdx]) = (arr[minIdx], arr[i]);  // [9] Swap the smallest into position i',
                '        }',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using selection sort',
                'function selectionSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i: number = 0; i < n; i++) {  // [3] Go through each position',
                '        let minIdx: number = i;  // [4] Assume the smallest is at position i',
                '',
                '        for (let j: number = i + 1; j < n; j++) {  // [5] Look at every item after i',
                '            if (arr[j] < arr[minIdx]) {  // [6] If we find a smaller item',
                '                minIdx = j;  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if (minIdx !== i) {  // [8] If the smallest is not at position i',
                '            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];  // [9] Swap the smallest into position i',
                '        }',
                '    }',
                '',
                '    return arr;  // [10] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using selection sort',
                'func selectionSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '',
                '    for i := 0; i < n; i++ {  // [3] Go through each position',
                '        minIdx := i  // [4] Assume the smallest is at position i',
                '',
                '        for j := i + 1; j < n; j++ {  // [5] Look at every item after i',
                '            if arr[j] < arr[minIdx] {  // [6] If we find a smaller item',
                '                minIdx = j  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if minIdx != i {  // [8] If the smallest is not at position i',
                '            arr[i], arr[minIdx] = arr[minIdx], arr[i]  // [9] Swap the smallest into position i',
                '        }',
                '    }',
                '',
                '    return arr  // [10] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using selection sort',
                'fn selection_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '',
                '    for i in 0..n {  // [3] Go through each position',
                '        let mut min_idx: usize = i;  // [4] Assume the smallest is at position i',
                '',
                '        for j in (i + 1)..n {  // [5] Look at every item after i',
                '            if arr[j] < arr[min_idx] {  // [6] If we find a smaller item',
                '                min_idx = j;  // [7] Remember its position',
                '            }',
                '        }',
                '',
                '        if min_idx != i {  // [8] If the smallest is not at position i',
                '            arr.swap(i, min_idx);  // [9] Swap the smallest into position i',
                '        }',
                '    }',
                '}',
            ],
        },

        insertionSort: {
            pseudo: [
                '# Step 1: Start the insertion sort procedure with list A',
                'procedure insertionSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '',
                '    for i = 1 to n - 1:  # [3] Start at the second item (the first is already "sorted")',
                '        key = A[i]  # [4] Pick up the current item to insert',
                '        j = i - 1  # [5] Start comparing with the item just before it',
                '',
                '        while j >= 0 and A[j] > key:  # [6] Move bigger items one spot to the right',
                '            A[j + 1] = A[j]  # [7] Shift this item one spot to the right',
                '            j = j - 1  # [8] Move to the next item on the left',
                '        A[j + 1] = key  # [9] Put the picked-up item in the empty spot',
                '',
                '    return A  # [10] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with insertion sort',
                'def insertion_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '',
                '    for i in range(1, n):  # [3] Start from the second item',
                '        key: int = arr[i]  # [4] Save the item we want to insert',
                '        j: int = i - 1  # [5] Start looking at the item just before it',
                '',
                '        while j >= 0 and arr[j] > key:  # [6] Keep moving left while items are bigger than key',
                '            arr[j + 1] = arr[j]  # [7] Shift this bigger item one spot to the right',
                '            j -= 1  # [8] Move one more spot to the left',
                '        arr[j + 1] = key  # [9] Drop the key into the correct spot',
                '',
                '    return arr  # [10] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using insertion sort',
                'void insertionSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (int i = 1; i < n; i++) {  // [3] Start from the second item',
                '        int key = arr[i];  // [4] Save the item we want to insert',
                '        int j = i - 1;  // [5] Start comparing with the item before it',
                '',
                '        while (j >= 0 && arr[j] > key) {  // [6] Move bigger items one spot to the right',
                '            arr[j + 1] = arr[j];  // [7] Shift this item to the right',
                '            j--;  // [8] Move one spot to the left',
                '        }',
                '        arr[j + 1] = key;  // [9] Put the key in the correct spot',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using insertion sort',
                'void insertionSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '',
                '    for (int i = 1; i < n; i++) {  // [3] Start from the second item',
                '        int key = arr[i];  // [4] Save the item we want to insert',
                '        int j = i - 1;  // [5] Start comparing with the item before it',
                '',
                '        while (j >= 0 && arr[j] > key) {  // [6] Move bigger items one spot to the right',
                '            arr[j + 1] = arr[j];  // [7] Shift this item to the right',
                '            j--;  // [8] Move one spot to the left',
                '        }',
                '        arr[j + 1] = key;  // [9] Put the key in the correct spot',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using insertion sort',
                'function insertionSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i = 1; i < n; i++) {  // [3] Start from the second item',
                '        const key = arr[i];  // [4] Save the item we want to insert',
                '        let j = i - 1;  // [5] Start comparing with the item before it',
                '',
                '        while (j >= 0 && arr[j] > key) {  // [6] Move bigger items one spot to the right',
                '            arr[j + 1] = arr[j];  // [7] Shift this item to the right',
                '            j--;  // [8] Move one spot to the left',
                '        }',
                '        arr[j + 1] = key;  // [9] Put the key in the correct spot',
                '    }',
                '',
                '    return arr;  // [10] Return the sorted array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using insertion sort',
                'void insertionSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '',
                '    for (int i = 1; i < n; i++) {  // [3] Start from the second item',
                '        int key = arr[i];  // [4] Save the item we want to insert',
                '        int j = i - 1;  // [5] Start comparing with the item before it',
                '',
                '        while (j >= 0 && arr[j] > key) {  // [6] Move bigger items one spot to the right',
                '            arr[j + 1] = arr[j];  // [7] Shift this item to the right',
                '            j--;  // [8] Move one spot to the left',
                '        }',
                '        arr[j + 1] = key;  // [9] Put the key in the correct spot',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using insertion sort',
                'void InsertionSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '',
                '    for (int i = 1; i < n; i++) {  // [3] Start from the second item',
                '        int key = arr[i];  // [4] Save the item we want to insert',
                '        int j = i - 1;  // [5] Start comparing with the item before it',
                '',
                '        while (j >= 0 && arr[j] > key) {  // [6] Move bigger items one spot to the right',
                '            arr[j + 1] = arr[j];  // [7] Shift this item to the right',
                '            j--;  // [8] Move one spot to the left',
                '        }',
                '        arr[j + 1] = key;  // [9] Put the key in the correct spot',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using insertion sort',
                'function insertionSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i: number = 1; i < n; i++) {  // [3] Start from the second item',
                '        const key: number = arr[i];  // [4] Save the item we want to insert',
                '        let j: number = i - 1;  // [5] Start comparing with the item before it',
                '',
                '        while (j >= 0 && arr[j] > key) {  // [6] Move bigger items one spot to the right',
                '            arr[j + 1] = arr[j];  // [7] Shift this item to the right',
                '            j--;  // [8] Move one spot to the left',
                '        }',
                '        arr[j + 1] = key;  // [9] Put the key in the correct spot',
                '    }',
                '',
                '    return arr;  // [10] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using insertion sort',
                'func insertionSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '',
                '    for i := 1; i < n; i++ {  // [3] Start from the second item',
                '        key := arr[i]  // [4] Save the item we want to insert',
                '        j := i - 1  // [5] Start comparing with the item before it',
                '',
                '        for j >= 0 && arr[j] > key {  // [6] Move bigger items one spot to the right',
                '            arr[j+1] = arr[j]  // [7] Shift this item to the right',
                '            j--  // [8] Move one spot to the left',
                '        }',
                '        arr[j+1] = key  // [9] Put the key in the correct spot',
                '    }',
                '',
                '    return arr  // [10] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using insertion sort',
                'fn insertion_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '',
                '    for i in 1..n {  // [3] Start from the second item',
                '        let key: i32 = arr[i];  // [4] Save the item we want to insert',
                '        let mut j: usize = i;  // [5] Start comparing with the item before it',
                '',
                '        while j > 0 && arr[j - 1] > key {  // [6] Move bigger items one spot to the right',
                '            arr[j] = arr[j - 1];  // [7] Shift this item to the right',
                '            j -= 1;  // [8] Move one spot to the left',
                '        }',
                '        arr[j] = key;  // [9] Put the key in the correct spot',
                '    }',
                '}',
            ],
        },

        mergeSort: {
            pseudo: [
                '# Step 1: Sort a section of list A from "left" to "right"',
                'procedure mergeSort(A, left, right):',
                '',
                '    if left >= right:  # [2] If the section has one or zero items, it is already sorted',
                '        return  # [3] Nothing to do, so stop here',
                '',
                '    mid = (left + right) / 2  # [4] Find the middle point of the section',
                '    mergeSort(A, left, mid)  # [5] Sort the left half',
                '    mergeSort(A, mid + 1, right)  # [6] Sort the right half',
                '    merge(A, left, mid, right)  # [7] Combine the two sorted halves into one sorted section',
                '',
                '# Step 8: Merge two sorted halves back together',
                'procedure merge(A, left, mid, right):',
                '',
                '    create temp arrays L and R  # [9] Make a copy of the left half',
                '    copy A[left..mid] into L  # [9] Copy items from the left half into L',
                '    copy A[mid+1..right] into R  # [10] Copy items from the right half into R',
                '    i = 0, j = 0, k = left  # [11] Start at the beginning of L, R, and the output spot',
                '',
                '    while i < len(L) and j < len(R):  # [12] While both halves still have items left',
                '        if L[i] <= R[j]:  # [13] If the left item is smaller or equal, use it',
                '            A[k] = L[i]; i++  # [14] Put the left item into the list and move forward',
                '        else:  # [15] Otherwise, the right item is smaller',
                '            A[k] = R[j]; j++  # [16] Put the right item into the list and move forward',
                '        k++  # [17] Move to the next output spot',
                '',
                '    copy remaining L into A  # [18] Put any leftover items from L into the list',
                '    copy remaining R into A  # [19] Put any leftover items from R into the list',
            ],
            python: [
                '# Step 1: Sort a section of the list from "left" to "right"',
                'def merge_sort(arr: list[int], left: int, right: int) -> None:',
                '',
                '    if left >= right:  # [2] If the section has one or zero items, stop',
                '        return  # [3] Nothing to sort',
                '',
                '    mid: int = (left + right) // 2  # [4] Find the middle of the section',
                '    merge_sort(arr, left, mid)  # [5] Sort the left half',
                '    merge_sort(arr, mid + 1, right)  # [6] Sort the right half',
                '    merge(arr, left, mid, right)  # [7] Combine the two sorted halves',
                '',
                '# Step 8: Merge two sorted halves back together',
                'def merge(arr: list[int], left: int, mid: int, right: int) -> None:',
                '',
                '    L: list[int] = arr[left:mid + 1]  # [9] Copy the left half into a temporary list',
                '    R: list[int] = arr[mid + 1:right + 1]  # [10] Copy the right half into a temporary list',
                '    i: int = j = 0  # [11] Start counters for L, R, and the output position',
                '    k: int = left  # [11] Start writing back at the left position',
                '',
                '    while i < len(L) and j < len(R):  # [12] While both halves have items left',
                '        if L[i] <= R[j]:  # [13] If the left item is smaller or equal',
                '            arr[k] = L[i]; i += 1  # [14] Use the left item and move forward in L',
                '        else:  # [15] Otherwise the right item is smaller',
                '            arr[k] = R[j]; j += 1  # [16] Use the right item and move forward in R',
                '        k += 1  # [17] Move to the next output spot',
                '',
                '    while i < len(L):  # [18] Copy any remaining items from the left half',
                '        arr[k] = L[i]; i += 1; k += 1  # [18] Put the left item in and move all counters forward',
                '    while j < len(R):  # [19] Copy any remaining items from the right half',
                '        arr[k] = R[j]; j += 1; k += 1  # [19] Put the right item in and move all counters forward',
            ],
            java: [
                '// Step 1: Sort a section of the array from left to right',
                'void mergeSort(int[] arr, int left, int right) {',
                '',
                '    if (left >= right) return;  // [2] If the section has one or zero items, stop',
                '',
                '    int mid = (left + right) / 2;  // [4] Find the middle of the section',
                '    mergeSort(arr, left, mid);  // [5] Sort the left half',
                '    mergeSort(arr, mid + 1, right);  // [6] Sort the right half',
                '    merge(arr, left, mid, right);  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'void merge(int[] arr, int l, int m, int r) {',
                '',
                '    int[] L = Arrays.copyOfRange(arr, l, m + 1);  // [9] Copy the left half into a temporary array',
                '    int[] R = Arrays.copyOfRange(arr, m + 1, r + 1);  // [10] Copy the right half into a temporary array',
                '    int i = 0, j = 0, k = l;  // [11] Start counters for L, R, and the output position',
                '',
                '    while (i < L.length && j < R.length) {  // [12] While both halves have items left',
                '        if (L[i] <= R[j]) {  // [13] If the left item is smaller or equal',
                '            arr[k++] = L[i++];  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k++] = R[j++];  // [16] Use the right item',
                '        }',
                '    }',
                '',
                '    while (i < L.length) arr[k++] = L[i++];  // [18] Copy any remaining left items',
                '    while (j < R.length) arr[k++] = R[j++];  // [19] Copy any remaining right items',
                '}',
            ],
            cpp: [
                '// Step 1: Sort a section of the array from left to right',
                'void mergeSort(vector<int>& arr, int left, int right) {',
                '',
                '    if (left >= right) return;  // [2] If the section has one or zero items, stop',
                '',
                '    int mid = (left + right) / 2;  // [4] Find the middle of the section',
                '    mergeSort(arr, left, mid);  // [5] Sort the left half',
                '    mergeSort(arr, mid + 1, right);  // [6] Sort the right half',
                '    merge(arr, left, mid, right);  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'void merge(vector<int>& arr, int l, int m, int r) {',
                '',
                '    vector<int> L(arr.begin()+l, arr.begin()+m+1);  // [9] Copy the left half into a temporary vector',
                '    vector<int> R(arr.begin()+m+1, arr.begin()+r+1);  // [10] Copy the right half into a temporary vector',
                '    int i = 0, j = 0, k = l;  // [11] Start counters for L, R, and the output position',
                '',
                '    while (i < L.size() && j < R.size()) {  // [12] While both halves have items left',
                '        if (L[i] <= R[j]) {  // [13] If the left item is smaller or equal',
                '            arr[k++] = L[i++];  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k++] = R[j++];  // [16] Use the right item',
                '        }',
                '    }',
                '',
                '    while (i < L.size()) arr[k++] = L[i++];  // [18] Copy any remaining left items',
                '    while (j < R.size()) arr[k++] = R[j++];  // [19] Copy any remaining right items',
                '}',
            ],
            javascript: [
                '// Step 1: Sort a section of the array from left to right',
                'function mergeSort(arr, left, right) {',
                '',
                '    if (left >= right) return;  // [2] If the section has one or zero items, stop',
                '',
                '    const mid = Math.floor((left + right) / 2);  // [4] Find the middle of the section',
                '    mergeSort(arr, left, mid);  // [5] Sort the left half',
                '    mergeSort(arr, mid + 1, right);  // [6] Sort the right half',
                '    merge(arr, left, mid, right);  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'function merge(arr, left, mid, right) {',
                '',
                '    const L = arr.slice(left, mid + 1);  // [9] Copy the left half into a temporary array',
                '    const R = arr.slice(mid + 1, right + 1);  // [10] Copy the right half into a temporary array',
                '    let i = 0, j = 0, k = left;  // [11] Start counters for L, R, and the output position',
                '',
                '    while (i < L.length && j < R.length) {  // [12] While both halves have items left',
                '        if (L[i] <= R[j]) {  // [13] If the left item is smaller or equal',
                '            arr[k++] = L[i++];  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k++] = R[j++];  // [16] Use the right item',
                '        }',
                '    }',
                '',
                '    while (i < L.length) arr[k++] = L[i++];  // [18] Copy any remaining left items',
                '    while (j < R.length) arr[k++] = R[j++];  // [19] Copy any remaining right items',
                '}',
            ],
            c: [
                '// Step 1: Sort a section of the array from left to right',
                'void mergeSort(int *arr, int left, int right) {',
                '',
                '    if (left >= right) return;  // [2] If the section has one or zero items, stop',
                '',
                '    int mid = (left + right) / 2;  // [4] Find the middle of the section',
                '    mergeSort(arr, left, mid);  // [5] Sort the left half',
                '    mergeSort(arr, mid + 1, right);  // [6] Sort the right half',
                '    merge(arr, left, mid, right);  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'void merge(int *arr, int l, int m, int r) {',
                '',
                '    int lLen = m - l + 1, rLen = r - m;',
                '    int L[lLen], R[rLen];  // [9] Allocate temporary arrays for both halves',
                '    for (int i = 0; i < lLen; i++) L[i] = arr[l + i];  // [9] Copy the left half',
                '    for (int j = 0; j < rLen; j++) R[j] = arr[m + 1 + j];  // [10] Copy the right half',
                '    int i = 0, j = 0, k = l;  // [11] Start counters for L, R, and the output position',
                '',
                '    while (i < lLen && j < rLen) {  // [12] While both halves have items left',
                '        if (L[i] <= R[j]) {  // [13] If the left item is smaller or equal',
                '            arr[k++] = L[i++];  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k++] = R[j++];  // [16] Use the right item',
                '        }',
                '    }',
                '',
                '    while (i < lLen) arr[k++] = L[i++];  // [18] Copy any remaining left items',
                '    while (j < rLen) arr[k++] = R[j++];  // [19] Copy any remaining right items',
                '}',
            ],
            csharp: [
                '// Step 1: Sort a section of the array from left to right',
                'void MergeSort(int[] arr, int left, int right) {',
                '',
                '    if (left >= right) return;  // [2] If the section has one or zero items, stop',
                '',
                '    int mid = (left + right) / 2;  // [4] Find the middle of the section',
                '    MergeSort(arr, left, mid);  // [5] Sort the left half',
                '    MergeSort(arr, mid + 1, right);  // [6] Sort the right half',
                '    Merge(arr, left, mid, right);  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'void Merge(int[] arr, int l, int m, int r) {',
                '',
                '    int[] L = arr[l..(m + 1)];  // [9] Copy the left half into a temporary array',
                '    int[] R = arr[(m + 1)..(r + 1)];  // [10] Copy the right half into a temporary array',
                '    int i = 0, j = 0, k = l;  // [11] Start counters for L, R, and the output position',
                '',
                '    while (i < L.Length && j < R.Length) {  // [12] While both halves have items left',
                '        if (L[i] <= R[j]) {  // [13] If the left item is smaller or equal',
                '            arr[k++] = L[i++];  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k++] = R[j++];  // [16] Use the right item',
                '        }',
                '    }',
                '',
                '    while (i < L.Length) arr[k++] = L[i++];  // [18] Copy any remaining left items',
                '    while (j < R.Length) arr[k++] = R[j++];  // [19] Copy any remaining right items',
                '}',
            ],
            typescript: [
                '// Step 1: Sort a section of the array from left to right',
                'function mergeSort(arr: number[], left: number, right: number): void {',
                '',
                '    if (left >= right) return;  // [2] If the section has one or zero items, stop',
                '',
                '    const mid: number = Math.floor((left + right) / 2);  // [4] Find the middle of the section',
                '    mergeSort(arr, left, mid);  // [5] Sort the left half',
                '    mergeSort(arr, mid + 1, right);  // [6] Sort the right half',
                '    merge(arr, left, mid, right);  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'function merge(arr: number[], left: number, mid: number, right: number): void {',
                '',
                '    const L: number[] = arr.slice(left, mid + 1);  // [9] Copy the left half into a temporary array',
                '    const R: number[] = arr.slice(mid + 1, right + 1);  // [10] Copy the right half into a temporary array',
                '    let i: number = 0, j: number = 0, k: number = left;  // [11] Start counters for L, R, and the output position',
                '',
                '    while (i < L.length && j < R.length) {  // [12] While both halves have items left',
                '        if (L[i] <= R[j]) {  // [13] If the left item is smaller or equal',
                '            arr[k++] = L[i++];  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k++] = R[j++];  // [16] Use the right item',
                '        }',
                '    }',
                '',
                '    while (i < L.length) arr[k++] = L[i++];  // [18] Copy any remaining left items',
                '    while (j < R.length) arr[k++] = R[j++];  // [19] Copy any remaining right items',
                '}',
            ],
            go: [
                '// Step 1: Sort a section of the slice from left to right',
                'func mergeSort(arr []int, left, right int) {',
                '',
                '    if left >= right { return }  // [2] If the section has one or zero items, stop',
                '',
                '    mid := (left + right) / 2  // [4] Find the middle of the section',
                '    mergeSort(arr, left, mid)  // [5] Sort the left half',
                '    mergeSort(arr, mid+1, right)  // [6] Sort the right half',
                '    merge(arr, left, mid, right)  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'func merge(arr []int, l, m, r int) {',
                '',
                '    L := append([]int{}, arr[l:m+1]...)  // [9] Copy the left half into a temporary slice',
                '    R := append([]int{}, arr[m+1:r+1]...)  // [10] Copy the right half into a temporary slice',
                '    i, j, k := 0, 0, l  // [11] Start counters for L, R, and the output position',
                '',
                '    for i < len(L) && j < len(R) {  // [12] While both halves have items left',
                '        if L[i] <= R[j] {  // [13] If the left item is smaller or equal',
                '            arr[k] = L[i]; i++  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k] = R[j]; j++  // [16] Use the right item',
                '        }',
                '        k++  // [17] Move to the next output spot',
                '    }',
                '',
                '    for i < len(L) { arr[k] = L[i]; i++; k++ }  // [18] Copy any remaining left items',
                '    for j < len(R) { arr[k] = R[j]; j++; k++ }  // [19] Copy any remaining right items',
                '}',
            ],
            rust: [
                '// Step 1: Sort a section of the vector from left to right',
                'fn merge_sort(arr: &mut Vec<i32>, left: usize, right: usize) {',
                '',
                '    if left >= right { return; }  // [2] If the section has one or zero items, stop',
                '',
                '    let mid: usize = (left + right) / 2;  // [4] Find the middle of the section',
                '    merge_sort(arr, left, mid);  // [5] Sort the left half',
                '    merge_sort(arr, mid + 1, right);  // [6] Sort the right half',
                '    merge(arr, left, mid, right);  // [7] Combine the two sorted halves',
                '}',
                '',
                '// Step 8: Merge two sorted halves back together',
                'fn merge(arr: &mut Vec<i32>, l: usize, m: usize, r: usize) {',
                '',
                '    let left_half: Vec<i32> = arr[l..=m].to_vec();  // [9] Copy the left half',
                '    let right_half: Vec<i32> = arr[m + 1..=r].to_vec();  // [10] Copy the right half',
                '    let (mut i, mut j, mut k) = (0, 0, l);  // [11] Start counters for both halves and the output position',
                '',
                '    while i < left_half.len() && j < right_half.len() {  // [12] While both halves have items left',
                '        if left_half[i] <= right_half[j] {  // [13] If the left item is smaller or equal',
                '            arr[k] = left_half[i]; i += 1;  // [14] Use the left item',
                '        } else {  // [15] Otherwise the right item is smaller',
                '            arr[k] = right_half[j]; j += 1;  // [16] Use the right item',
                '        }',
                '        k += 1;  // [17] Move to the next output spot',
                '    }',
                '',
                '    while i < left_half.len() { arr[k] = left_half[i]; i += 1; k += 1; }  // [18] Copy remaining left items',
                '    while j < right_half.len() { arr[k] = right_half[j]; j += 1; k += 1; }  // [19] Copy remaining right items',
                '}',
            ],
        },

        quickSort: {
            pseudo: [
                '# Step 1: Sort a section of list A from "low" to "high"',
                'procedure quickSort(A, low, high):',
                '',
                '    if low < high:  # [2] Only sort if there are at least two items',
                '        pivotIdx = partition(A, low, high)  # [3] Put the pivot in the right spot and get its position',
                '        quickSort(A, low, pivotIdx - 1)  # [4] Sort everything to the left of the pivot',
                '        quickSort(A, pivotIdx + 1, high)  # [5] Sort everything to the right of the pivot',
                '',
                '# Step 6: Move items smaller than the pivot to the left, bigger to the right',
                'procedure partition(A, low, high):',
                '',
                '    pivot = A[high]  # [7] Use the last item as the pivot',
                '    i = low - 1  # [8] Start the boundary before the first item',
                '',
                '    for j = low to high - 1:  # [9] Look at each item from low to high - 1',
                '        if A[j] <= pivot:  # [10] If this item is less than or equal to the pivot',
                '            i = i + 1  # [11] Move the boundary one spot to the right',
                '            swap A[i] and A[j]  # [12] Swap this item into the left group',
                '',
                '    swap A[i + 1] and A[high]  # [13] Put the pivot between the two groups',
                '    return i + 1  # [14] Tell the caller where the pivot ended up',
            ],
            python: [
                '# Step 1: Sort a section of the list from "low" to "high"',
                'def quick_sort(arr: list[int], low: int, high: int) -> None:',
                '',
                '    if low < high:  # [2] Only sort if there are at least two items',
                '        pivot_idx: int = partition(arr, low, high)  # [3] Partition and get the pivot position',
                '        quick_sort(arr, low, pivot_idx - 1)  # [4] Sort the left side of the pivot',
                '        quick_sort(arr, pivot_idx + 1, high)  # [5] Sort the right side of the pivot',
                '',
                '# Step 6: Move smaller items left and bigger items right of the pivot',
                'def partition(arr: list[int], low: int, high: int) -> int:',
                '',
                '    pivot: int = arr[high]  # [7] Use the last item as the pivot',
                '    i: int = low - 1  # [8] Start the boundary before the first item',
                '',
                '    for j in range(low, high):  # [9] Look at each item from low to high - 1',
                '        if arr[j] <= pivot:  # [10] If this item is less than or equal to the pivot',
                '            i += 1  # [11] Move the boundary one spot to the right',
                '            arr[i], arr[j] = arr[j], arr[i]  # [12] Swap this item into the left group',
                '',
                '    arr[i + 1], arr[high] = arr[high], arr[i + 1]  # [13] Put the pivot between the two groups',
                '    return i + 1  # [14] Return the final position of the pivot',
            ],
            java: [
                '// Step 1: Sort a section of the array from low to high',
                'void quickSort(int[] arr, int low, int high) {',
                '',
                '    if (low < high) {  // [2] Only sort if there are at least two items',
                '        int pivotIdx = partition(arr, low, high);  // [3] Partition and get the pivot position',
                '        quickSort(arr, low, pivotIdx - 1);  // [4] Sort the left side of the pivot',
                '        quickSort(arr, pivotIdx + 1, high);  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'int partition(int[] arr, int low, int high) {',
                '',
                '    int pivot = arr[high];  // [7] Use the last item as the pivot',
                '    int i = low - 1;  // [8] Start the boundary before the first item',
                '',
                '    for (int j = low; j < high; j++) {  // [9] Look at each item from low to high - 1',
                '        if (arr[j] <= pivot) {  // [10] If this item is less than or equal to the pivot',
                '            i++;  // [11] Move the boundary one spot to the right',
                '            int temp = arr[i];  // [12] Save the value at the boundary',
                '            arr[i] = arr[j];  // [12] Put the smaller item at the boundary',
                '            arr[j] = temp;  // [12] Put the saved value where the smaller item was',
                '        }',
                '    }',
                '',
                '    int temp = arr[i + 1];  // [13] Save the value next to the boundary',
                '    arr[i + 1] = arr[high];  // [13] Put the pivot next to the boundary',
                '    arr[high] = temp;  // [13] Put the saved value where the pivot was',
                '    return i + 1;  // [14] Return the final position of the pivot',
                '}',
            ],
            cpp: [
                '// Step 1: Sort a section of the array from low to high',
                'void quickSort(vector<int>& arr, int low, int high) {',
                '',
                '    if (low < high) {  // [2] Only sort if there are at least two items',
                '        int pivotIdx = partition(arr, low, high);  // [3] Partition and get the pivot position',
                '        quickSort(arr, low, pivotIdx - 1);  // [4] Sort the left side of the pivot',
                '        quickSort(arr, pivotIdx + 1, high);  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'int partition(vector<int>& arr, int low, int high) {',
                '',
                '    int pivot = arr[high];  // [7] Use the last item as the pivot',
                '    int i = low - 1;  // [8] Start the boundary before the first item',
                '',
                '    for (int j = low; j < high; j++) {  // [9] Look at each item from low to high - 1',
                '        if (arr[j] <= pivot) {  // [10] If this item is less than or equal to the pivot',
                '            i++;  // [11] Move the boundary one spot to the right',
                '            swap(arr[i], arr[j]);  // [12] Swap this item into the left group',
                '        }',
                '    }',
                '',
                '    swap(arr[i + 1], arr[high]);  // [13] Put the pivot between the two groups',
                '    return i + 1;  // [14] Return the final position of the pivot',
                '}',
            ],
            javascript: [
                '// Step 1: Sort a section of the array from low to high',
                'function quickSort(arr, low, high) {',
                '',
                '    if (low < high) {  // [2] Only sort if there are at least two items',
                '        const pivotIdx = partition(arr, low, high);  // [3] Partition and get the pivot position',
                '        quickSort(arr, low, pivotIdx - 1);  // [4] Sort the left side of the pivot',
                '        quickSort(arr, pivotIdx + 1, high);  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'function partition(arr, low, high) {',
                '',
                '    const pivot = arr[high];  // [7] Use the last item as the pivot',
                '    let i = low - 1;  // [8] Start the boundary before the first item',
                '',
                '    for (let j = low; j < high; j++) {  // [9] Look at each item from low to high - 1',
                '        if (arr[j] <= pivot) {  // [10] If this item is less than or equal to the pivot',
                '            i++;  // [11] Move the boundary one spot to the right',
                '            [arr[i], arr[j]] = [arr[j], arr[i]];  // [12] Swap this item into the left group',
                '        }',
                '    }',
                '',
                '    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  // [13] Put the pivot between the two groups',
                '    return i + 1;  // [14] Return the final position of the pivot',
                '}',
            ],
            c: [
                '// Step 1: Sort a section of the array from low to high',
                'void quickSort(int *arr, int low, int high) {',
                '',
                '    if (low < high) {  // [2] Only sort if there are at least two items',
                '        int pivotIdx = partition(arr, low, high);  // [3] Partition and get the pivot position',
                '        quickSort(arr, low, pivotIdx - 1);  // [4] Sort the left side of the pivot',
                '        quickSort(arr, pivotIdx + 1, high);  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'int partition(int *arr, int low, int high) {',
                '',
                '    int pivot = arr[high];  // [7] Use the last item as the pivot',
                '    int i = low - 1;  // [8] Start the boundary before the first item',
                '',
                '    for (int j = low; j < high; j++) {  // [9] Look at each item from low to high - 1',
                '        if (arr[j] <= pivot) {  // [10] If this item is less than or equal to the pivot',
                '            i++;  // [11] Move the boundary one spot to the right',
                '            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;  // [12] Swap this item into the left group',
                '        }',
                '    }',
                '',
                '    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;  // [13] Put the pivot between the two groups',
                '    return i + 1;  // [14] Return the final position of the pivot',
                '}',
            ],
            csharp: [
                '// Step 1: Sort a section of the array from low to high',
                'void QuickSort(int[] arr, int low, int high) {',
                '',
                '    if (low < high) {  // [2] Only sort if there are at least two items',
                '        int pivotIdx = Partition(arr, low, high);  // [3] Partition and get the pivot position',
                '        QuickSort(arr, low, pivotIdx - 1);  // [4] Sort the left side of the pivot',
                '        QuickSort(arr, pivotIdx + 1, high);  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'int Partition(int[] arr, int low, int high) {',
                '',
                '    int pivot = arr[high];  // [7] Use the last item as the pivot',
                '    int i = low - 1;  // [8] Start the boundary before the first item',
                '',
                '    for (int j = low; j < high; j++) {  // [9] Look at each item from low to high - 1',
                '        if (arr[j] <= pivot) {  // [10] If this item is less than or equal to the pivot',
                '            i++;  // [11] Move the boundary one spot to the right',
                '            (arr[i], arr[j]) = (arr[j], arr[i]);  // [12] Swap this item into the left group',
                '        }',
                '    }',
                '',
                '    (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);  // [13] Put the pivot between the two groups',
                '    return i + 1;  // [14] Return the final position of the pivot',
                '}',
            ],
            typescript: [
                '// Step 1: Sort a section of the array from low to high',
                'function quickSort(arr: number[], low: number, high: number): void {',
                '',
                '    if (low < high) {  // [2] Only sort if there are at least two items',
                '        const pivotIdx: number = partition(arr, low, high);  // [3] Partition and get the pivot position',
                '        quickSort(arr, low, pivotIdx - 1);  // [4] Sort the left side of the pivot',
                '        quickSort(arr, pivotIdx + 1, high);  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'function partition(arr: number[], low: number, high: number): number {',
                '',
                '    const pivot: number = arr[high];  // [7] Use the last item as the pivot',
                '    let i: number = low - 1;  // [8] Start the boundary before the first item',
                '',
                '    for (let j: number = low; j < high; j++) {  // [9] Look at each item from low to high - 1',
                '        if (arr[j] <= pivot) {  // [10] If this item is less than or equal to the pivot',
                '            i++;  // [11] Move the boundary one spot to the right',
                '            [arr[i], arr[j]] = [arr[j], arr[i]];  // [12] Swap this item into the left group',
                '        }',
                '    }',
                '',
                '    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  // [13] Put the pivot between the two groups',
                '    return i + 1;  // [14] Return the final position of the pivot',
                '}',
            ],
            go: [
                '// Step 1: Sort a section of the slice from low to high',
                'func quickSort(arr []int, low, high int) {',
                '',
                '    if low < high {  // [2] Only sort if there are at least two items',
                '        pivotIdx := partition(arr, low, high)  // [3] Partition and get the pivot position',
                '        quickSort(arr, low, pivotIdx-1)  // [4] Sort the left side of the pivot',
                '        quickSort(arr, pivotIdx+1, high)  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'func partition(arr []int, low, high int) int {',
                '',
                '    pivot := arr[high]  // [7] Use the last item as the pivot',
                '    i := low - 1  // [8] Start the boundary before the first item',
                '',
                '    for j := low; j < high; j++ {  // [9] Look at each item from low to high - 1',
                '        if arr[j] <= pivot {  // [10] If this item is less than or equal to the pivot',
                '            i++  // [11] Move the boundary one spot to the right',
                '            arr[i], arr[j] = arr[j], arr[i]  // [12] Swap this item into the left group',
                '        }',
                '    }',
                '',
                '    arr[i+1], arr[high] = arr[high], arr[i+1]  // [13] Put the pivot between the two groups',
                '    return i + 1  // [14] Return the final position of the pivot',
                '}',
            ],
            rust: [
                '// Step 1: Sort a section of the vector from low to high',
                'fn quick_sort(arr: &mut Vec<i32>, low: usize, high: usize) {',
                '',
                '    if low < high {  // [2] Only sort if there are at least two items',
                '        let pivot_idx: usize = partition(arr, low, high);  // [3] Partition and get the pivot position',
                '        if pivot_idx > 0 { quick_sort(arr, low, pivot_idx - 1); }  // [4] Sort the left side',
                '        quick_sort(arr, pivot_idx + 1, high);  // [5] Sort the right side of the pivot',
                '    }',
                '}',
                '',
                '// Step 6: Move smaller items left and bigger items right of the pivot',
                'fn partition(arr: &mut Vec<i32>, low: usize, high: usize) -> usize {',
                '',
                '    let pivot: i32 = arr[high];  // [7] Use the last item as the pivot',
                '    let mut i: usize = low;  // [8] Start the boundary at the first item',
                '',
                '    for j in low..high {  // [9] Look at each item from low to high - 1',
                '        if arr[j] <= pivot {  // [10] If this item is less than or equal to the pivot',
                '            arr.swap(i, j);  // [12] Swap this item into the left group',
                '            i += 1;  // [11] Move the boundary one spot to the right',
                '        }',
                '    }',
                '',
                '    arr.swap(i, high);  // [13] Put the pivot between the two groups',
                '    i  // [14] Return the final position of the pivot',
                '}',
            ],
        },

        countingSort: {
            pseudo: [
                '# Step 1: Start the counting sort procedure with list A',
                'procedure countingSort(A):',
                '',
                '    max = findMax(A)  # [2] Find the biggest number in the list',
                '',
                '    count = array of (max + 1) zeros  # [3] Make a count list with enough room for every value',
                '',
                '    for i = 0 to length(A) - 1:  # [4] Go through each item in the list',
                '        count[A[i]] = count[A[i]] + 1  # [5] Add one to the count for that value',
                '',
                '    idx = 0  # [6] Start writing back at the beginning of the list',
                '    for val = 0 to max:  # [7] Go through every possible value from 0 to max',
                '        while count[val] > 0:  # [8] While there are copies of this value left',
                '            A[idx] = val  # [9] Put the value into the list',
                '            idx = idx + 1  # [10] Move to the next spot',
                '            count[val] = count[val] - 1  # [11] One fewer copy left to place',
                '',
                '    return A  # [12] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with counting sort',
                'def counting_sort(arr: list[int]) -> list[int]:',
                '',
                '    max_val: int = max(arr)  # [2] Find the biggest number in the list',
                '',
                '    count: list[int] = [0] * (max_val + 1)  # [3] Make a count list filled with zeros',
                '',
                '    for i in range(len(arr)):  # [4] Go through each item in the list',
                '        count[arr[i]] += 1  # [5] Add one to the count for that value',
                '',
                '    idx: int = 0  # [6] Start writing back at the beginning',
                '    for val in range(max_val + 1):  # [7] Go through every possible value from 0 to max',
                '        while count[val] > 0:  # [8] While there are copies of this value left',
                '            arr[idx] = val  # [9] Put the value into the list',
                '            idx += 1  # [10] Move to the next spot',
                '            count[val] -= 1  # [11] One fewer copy left to place',
                '',
                '    return arr  # [12] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using counting sort',
                'void countingSort(int[] arr) {',
                '',
                '    int max = Arrays.stream(arr).max().getAsInt();  // [2] Find the biggest number in the array',
                '',
                '    int[] count = new int[max + 1];  // [3] Make a count array filled with zeros',
                '',
                '    for (int i = 0; i < arr.length; i++) {  // [4] Go through each item in the array',
                '        count[arr[i]]++;  // [5] Add one to the count for that value',
                '    }',
                '',
                '    int idx = 0;  // [6] Start writing back at the beginning',
                '    for (int val = 0; val <= max; val++) {  // [7] Go through every possible value from 0 to max',
                '        while (count[val] > 0) {  // [8] While there are copies of this value left',
                '            arr[idx] = val;  // [9] Put the value into the array',
                '            idx++;  // [10] Move to the next spot',
                '            count[val]--;  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using counting sort',
                'void countingSort(vector<int>& arr) {',
                '',
                '    int max = *max_element(arr.begin(), arr.end());  // [2] Find the biggest number in the array',
                '',
                '    vector<int> count(max + 1, 0);  // [3] Make a count array filled with zeros',
                '',
                '    for (int i = 0; i < arr.size(); i++) {  // [4] Go through each item in the array',
                '        count[arr[i]]++;  // [5] Add one to the count for that value',
                '    }',
                '',
                '    int idx = 0;  // [6] Start writing back at the beginning',
                '    for (int val = 0; val <= max; val++) {  // [7] Go through every possible value from 0 to max',
                '        while (count[val] > 0) {  // [8] While there are copies of this value left',
                '            arr[idx] = val;  // [9] Put the value into the array',
                '            idx++;  // [10] Move to the next spot',
                '            count[val]--;  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using counting sort',
                'function countingSort(arr) {',
                '',
                '    const max = Math.max(...arr);  // [2] Find the biggest number in the array',
                '',
                '    const count = new Array(max + 1).fill(0);  // [3] Make a count array filled with zeros',
                '',
                '    for (let i = 0; i < arr.length; i++) {  // [4] Go through each item in the array',
                '        count[arr[i]]++;  // [5] Add one to the count for that value',
                '    }',
                '',
                '    let idx = 0;  // [6] Start writing back at the beginning',
                '    for (let val = 0; val <= max; val++) {  // [7] Go through every possible value from 0 to max',
                '        while (count[val] > 0) {  // [8] While there are copies of this value left',
                '            arr[idx] = val;  // [9] Put the value into the array',
                '            idx++;  // [10] Move to the next spot',
                '            count[val]--;  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '',
                '    return arr;  // [12] Return the sorted array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using counting sort',
                'void countingSort(int *arr, int n) {',
                '',
                '    int max = arr[0];',
                '    for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];  // [2] Find the biggest number',
                '',
                '    int *count = calloc(max + 1, sizeof(int));  // [3] Make a count array filled with zeros',
                '',
                '    for (int i = 0; i < n; i++) {  // [4] Go through each item in the array',
                '        count[arr[i]]++;  // [5] Add one to the count for that value',
                '    }',
                '',
                '    int idx = 0;  // [6] Start writing back at the beginning',
                '    for (int val = 0; val <= max; val++) {  // [7] Go through every possible value from 0 to max',
                '        while (count[val] > 0) {  // [8] While there are copies of this value left',
                '            arr[idx] = val;  // [9] Put the value into the array',
                '            idx++;  // [10] Move to the next spot',
                '            count[val]--;  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '    free(count);',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using counting sort',
                'void CountingSort(int[] arr) {',
                '',
                '    int max = arr.Max();  // [2] Find the biggest number in the array',
                '',
                '    int[] count = new int[max + 1];  // [3] Make a count array filled with zeros',
                '',
                '    for (int i = 0; i < arr.Length; i++) {  // [4] Go through each item in the array',
                '        count[arr[i]]++;  // [5] Add one to the count for that value',
                '    }',
                '',
                '    int idx = 0;  // [6] Start writing back at the beginning',
                '    for (int val = 0; val <= max; val++) {  // [7] Go through every possible value from 0 to max',
                '        while (count[val] > 0) {  // [8] While there are copies of this value left',
                '            arr[idx] = val;  // [9] Put the value into the array',
                '            idx++;  // [10] Move to the next spot',
                '            count[val]--;  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using counting sort',
                'function countingSort(arr: number[]): number[] {',
                '',
                '    const max: number = Math.max(...arr);  // [2] Find the biggest number in the array',
                '',
                '    const count: number[] = new Array(max + 1).fill(0);  // [3] Make a count array filled with zeros',
                '',
                '    for (let i: number = 0; i < arr.length; i++) {  // [4] Go through each item in the array',
                '        count[arr[i]]++;  // [5] Add one to the count for that value',
                '    }',
                '',
                '    let idx: number = 0;  // [6] Start writing back at the beginning',
                '    for (let val: number = 0; val <= max; val++) {  // [7] Go through every possible value from 0 to max',
                '        while (count[val] > 0) {  // [8] While there are copies of this value left',
                '            arr[idx] = val;  // [9] Put the value into the array',
                '            idx++;  // [10] Move to the next spot',
                '            count[val]--;  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '',
                '    return arr;  // [12] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using counting sort',
                'func countingSort(arr []int) []int {',
                '',
                '    max := arr[0]',
                '    for _, v := range arr { if v > max { max = v } }  // [2] Find the biggest number',
                '',
                '    count := make([]int, max+1)  // [3] Make a count slice filled with zeros',
                '',
                '    for i := 0; i < len(arr); i++ {  // [4] Go through each item in the slice',
                '        count[arr[i]]++  // [5] Add one to the count for that value',
                '    }',
                '',
                '    idx := 0  // [6] Start writing back at the beginning',
                '    for val := 0; val <= max; val++ {  // [7] Go through every possible value from 0 to max',
                '        for count[val] > 0 {  // [8] While there are copies of this value left',
                '            arr[idx] = val  // [9] Put the value into the slice',
                '            idx++  // [10] Move to the next spot',
                '            count[val]--  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '',
                '    return arr  // [12] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using counting sort',
                'fn counting_sort(arr: &mut Vec<i32>) {',
                '',
                '    let max: i32 = *arr.iter().max().unwrap();  // [2] Find the biggest number in the vector',
                '',
                '    let mut count: Vec<usize> = vec![0; (max + 1) as usize];  // [3] Make a count vector filled with zeros',
                '',
                '    for i in 0..arr.len() {  // [4] Go through each item in the vector',
                '        count[arr[i] as usize] += 1;  // [5] Add one to the count for that value',
                '    }',
                '',
                '    let mut idx: usize = 0;  // [6] Start writing back at the beginning',
                '    for val in 0..=max {  // [7] Go through every possible value from 0 to max',
                '        while count[val as usize] > 0 {  // [8] While there are copies of this value left',
                '            arr[idx] = val;  // [9] Put the value into the vector',
                '            idx += 1;  // [10] Move to the next spot',
                '            count[val as usize] -= 1;  // [11] One fewer copy left to place',
                '        }',
                '    }',
                '}',
            ],
        },

        heapSort: {
            pseudo: [
                '# Step 1: Sort list A using heap sort',
                'procedure heapSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '',
                '    for i = n/2 - 1 down to 0:  # [3] Build a max heap from the bottom up',
                '        heapify(A, n, i)  # [4] Make sure the subtree rooted at i is a valid heap',
                '',
                '    for i = n - 1 down to 1:  # [5] Pull out the biggest item one at a time',
                '        swap A[0] and A[i]  # [6] Move the biggest item to the end',
                '        heapify(A, i, 0)  # [7] Fix the heap with the remaining items',
                '',
                '# Step 8: Make sure the subtree at index i is a valid max heap',
                'procedure heapify(A, size, i):',
                '',
                '    largest = i  # [9] Start by assuming the parent is the biggest',
                '    left = 2 * i + 1  # [10] Find the left child',
                '    right = 2 * i + 2  # [11] Find the right child',
                '',
                '    if left < size and A[left] > A[largest]:  # [12] If left child is bigger than the parent',
                '        largest = left  # [13] The left child is the new biggest',
                '    if right < size and A[right] > A[largest]:  # [14] If right child is bigger than the current biggest',
                '        largest = right  # [15] The right child is the new biggest',
                '',
                '    if largest != i:  # [16] If the biggest is not the parent',
                '        swap A[i] and A[largest]  # [17] Swap the parent with the biggest child',
                '        heapify(A, size, largest)  # [18] Fix the subtree that was changed',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with heap sort',
                'def heap_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '',
                '    for i in range(n // 2 - 1, -1, -1):  # [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i)  # [4] Make each subtree a valid heap',
                '',
                '    for i in range(n - 1, 0, -1):  # [5] Pull out the biggest item one at a time',
                '        arr[0], arr[i] = arr[i], arr[0]  # [6] Move the biggest item to the end',
                '        heapify(arr, i, 0)  # [7] Fix the heap with the remaining items',
                '',
                '    return arr  # [8] Return the sorted list',
                '',
                '# Step 9: Make sure the subtree at index i is a valid max heap',
                'def heapify(arr: list[int], size: int, i: int) -> None:',
                '',
                '    largest: int = i  # [10] Start by assuming the parent is the biggest',
                '    left: int = 2 * i + 1  # [11] Find the left child position',
                '    right: int = 2 * i + 2  # [12] Find the right child position',
                '',
                '    if left < size and arr[left] > arr[largest]:  # [13] If left child is bigger',
                '        largest = left  # [14] Update biggest to left child',
                '    if right < size and arr[right] > arr[largest]:  # [15] If right child is bigger',
                '        largest = right  # [16] Update biggest to right child',
                '',
                '    if largest != i:  # [17] If the biggest is not the parent',
                '        arr[i], arr[largest] = arr[largest], arr[i]  # [18] Swap parent with biggest child',
                '        heapify(arr, size, largest)  # [19] Fix the subtree that was changed',
            ],
            java: [
                '// Step 1: Sort the array using heap sort',
                'void heapSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (int i = n / 2 - 1; i >= 0; i--) {  // [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i);  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for (int i = n - 1; i > 0; i--) {  // [5] Pull out the biggest item one at a time',
                '        int temp = arr[0];  // [6] Save the biggest item',
                '        arr[0] = arr[i];  // [6] Move the last item to the front',
                '        arr[i] = temp;  // [6] Put the biggest item at the end',
                '        heapify(arr, i, 0);  // [7] Fix the heap with the remaining items',
                '    }',
                '}',
                '',
                '// Step 8: Make sure the subtree at index i is a valid max heap',
                'void heapify(int[] arr, int size, int i) {',
                '',
                '    int largest = i;  // [9] Start by assuming the parent is the biggest',
                '    int left = 2 * i + 1;  // [10] Find the left child',
                '    int right = 2 * i + 2;  // [11] Find the right child',
                '',
                '    if (left < size && arr[left] > arr[largest]) {  // [12] If left child is bigger',
                '        largest = left;  // [13] Update biggest to left child',
                '    }',
                '    if (right < size && arr[right] > arr[largest]) {  // [14] If right child is bigger',
                '        largest = right;  // [15] Update biggest to right child',
                '    }',
                '',
                '    if (largest != i) {  // [16] If the biggest is not the parent',
                '        int temp = arr[i];  // [17] Save the parent value',
                '        arr[i] = arr[largest];  // [17] Move the biggest child up',
                '        arr[largest] = temp;  // [17] Put the parent value where the child was',
                '        heapify(arr, size, largest);  // [18] Fix the subtree that was changed',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using heap sort',
                'void heapSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '',
                '    for (int i = n / 2 - 1; i >= 0; i--) {  // [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i);  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for (int i = n - 1; i > 0; i--) {  // [5] Pull out the biggest item one at a time',
                '        swap(arr[0], arr[i]);  // [6] Move the biggest item to the end',
                '        heapify(arr, i, 0);  // [7] Fix the heap with the remaining items',
                '    }',
                '}',
                '',
                '// Step 8: Make sure the subtree at index i is a valid max heap',
                'void heapify(vector<int>& arr, int size, int i) {',
                '',
                '    int largest = i;  // [9] Start by assuming the parent is the biggest',
                '    int left = 2 * i + 1;  // [10] Find the left child',
                '    int right = 2 * i + 2;  // [11] Find the right child',
                '',
                '    if (left < size && arr[left] > arr[largest]) {  // [12] If left child is bigger',
                '        largest = left;  // [13] Update biggest to left child',
                '    }',
                '    if (right < size && arr[right] > arr[largest]) {  // [14] If right child is bigger',
                '        largest = right;  // [15] Update biggest to right child',
                '    }',
                '',
                '    if (largest != i) {  // [16] If the biggest is not the parent',
                '        swap(arr[i], arr[largest]);  // [17] Swap parent with biggest child',
                '        heapify(arr, size, largest);  // [18] Fix the subtree that was changed',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using heap sort',
                'function heapSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {  // [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i);  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for (let i = n - 1; i > 0; i--) {  // [5] Pull out the biggest item one at a time',
                '        [arr[0], arr[i]] = [arr[i], arr[0]];  // [6] Move the biggest item to the end',
                '        heapify(arr, i, 0);  // [7] Fix the heap with the remaining items',
                '    }',
                '',
                '    return arr;  // [8] Return the sorted array',
                '}',
                '',
                '// Step 9: Make sure the subtree at index i is a valid max heap',
                'function heapify(arr, size, i) {',
                '',
                '    let largest = i;  // [10] Start by assuming the parent is the biggest',
                '    const left = 2 * i + 1;  // [11] Find the left child',
                '    const right = 2 * i + 2;  // [12] Find the right child',
                '',
                '    if (left < size && arr[left] > arr[largest]) {  // [13] If left child is bigger',
                '        largest = left;  // [14] Update biggest to left child',
                '    }',
                '    if (right < size && arr[right] > arr[largest]) {  // [15] If right child is bigger',
                '        largest = right;  // [16] Update biggest to right child',
                '    }',
                '',
                '    if (largest !== i) {  // [17] If the biggest is not the parent',
                '        [arr[i], arr[largest]] = [arr[largest], arr[i]];  // [18] Swap parent with biggest child',
                '        heapify(arr, size, largest);  // [19] Fix the subtree that was changed',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using heap sort',
                'void heapSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '',
                '    for (int i = n / 2 - 1; i >= 0; i--) {  // [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i);  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for (int i = n - 1; i > 0; i--) {  // [5] Pull out the biggest item one at a time',
                '        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;  // [6] Move the biggest item to the end',
                '        heapify(arr, i, 0);  // [7] Fix the heap with the remaining items',
                '    }',
                '}',
                '',
                '// Step 8: Make sure the subtree at index i is a valid max heap',
                'void heapify(int *arr, int size, int i) {',
                '',
                '    int largest = i;  // [9] Start by assuming the parent is the biggest',
                '    int left = 2 * i + 1;  // [10] Find the left child',
                '    int right = 2 * i + 2;  // [11] Find the right child',
                '',
                '    if (left < size && arr[left] > arr[largest]) {  // [12] If left child is bigger',
                '        largest = left;  // [13] Update biggest to left child',
                '    }',
                '    if (right < size && arr[right] > arr[largest]) {  // [14] If right child is bigger',
                '        largest = right;  // [15] Update biggest to right child',
                '    }',
                '',
                '    if (largest != i) {  // [16] If the biggest is not the parent',
                '        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;  // [17] Swap parent with biggest child',
                '        heapify(arr, size, largest);  // [18] Fix the subtree that was changed',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using heap sort',
                'void HeapSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '',
                '    for (int i = n / 2 - 1; i >= 0; i--) {  // [3] Build a max heap from the bottom up',
                '        Heapify(arr, n, i);  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for (int i = n - 1; i > 0; i--) {  // [5] Pull out the biggest item one at a time',
                '        (arr[0], arr[i]) = (arr[i], arr[0]);  // [6] Move the biggest item to the end',
                '        Heapify(arr, i, 0);  // [7] Fix the heap with the remaining items',
                '    }',
                '}',
                '',
                '// Step 8: Make sure the subtree at index i is a valid max heap',
                'void Heapify(int[] arr, int size, int i) {',
                '',
                '    int largest = i;  // [9] Start by assuming the parent is the biggest',
                '    int left = 2 * i + 1;  // [10] Find the left child',
                '    int right = 2 * i + 2;  // [11] Find the right child',
                '',
                '    if (left < size && arr[left] > arr[largest]) {  // [12] If left child is bigger',
                '        largest = left;  // [13] Update biggest to left child',
                '    }',
                '    if (right < size && arr[right] > arr[largest]) {  // [14] If right child is bigger',
                '        largest = right;  // [15] Update biggest to right child',
                '    }',
                '',
                '    if (largest != i) {  // [16] If the biggest is not the parent',
                '        (arr[i], arr[largest]) = (arr[largest], arr[i]);  // [17] Swap parent with biggest child',
                '        Heapify(arr, size, largest);  // [18] Fix the subtree that was changed',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using heap sort',
                'function heapSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let i: number = Math.floor(n / 2) - 1; i >= 0; i--) {  // [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i);  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for (let i: number = n - 1; i > 0; i--) {  // [5] Pull out the biggest item one at a time',
                '        [arr[0], arr[i]] = [arr[i], arr[0]];  // [6] Move the biggest item to the end',
                '        heapify(arr, i, 0);  // [7] Fix the heap with the remaining items',
                '    }',
                '',
                '    return arr;  // [8] Return the sorted array',
                '}',
                '',
                '// Step 9: Make sure the subtree at index i is a valid max heap',
                'function heapify(arr: number[], size: number, i: number): void {',
                '',
                '    let largest: number = i;  // [10] Start by assuming the parent is the biggest',
                '    const left: number = 2 * i + 1;  // [11] Find the left child',
                '    const right: number = 2 * i + 2;  // [12] Find the right child',
                '',
                '    if (left < size && arr[left] > arr[largest]) {  // [13] If left child is bigger',
                '        largest = left;  // [14] Update biggest to left child',
                '    }',
                '    if (right < size && arr[right] > arr[largest]) {  // [15] If right child is bigger',
                '        largest = right;  // [16] Update biggest to right child',
                '    }',
                '',
                '    if (largest !== i) {  // [17] If the biggest is not the parent',
                '        [arr[i], arr[largest]] = [arr[largest], arr[i]];  // [18] Swap parent with biggest child',
                '        heapify(arr, size, largest);  // [19] Fix the subtree that was changed',
                '    }',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using heap sort',
                'func heapSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '',
                '    for i := n/2 - 1; i >= 0; i-- {  // [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i)  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for i := n - 1; i > 0; i-- {  // [5] Pull out the biggest item one at a time',
                '        arr[0], arr[i] = arr[i], arr[0]  // [6] Move the biggest item to the end',
                '        heapify(arr, i, 0)  // [7] Fix the heap with the remaining items',
                '    }',
                '',
                '    return arr  // [8] Return the sorted slice',
                '}',
                '',
                '// Step 9: Make sure the subtree at index i is a valid max heap',
                'func heapify(arr []int, size, i int) {',
                '',
                '    largest := i  // [10] Start by assuming the parent is the biggest',
                '    left := 2*i + 1  // [11] Find the left child',
                '    right := 2*i + 2  // [12] Find the right child',
                '',
                '    if left < size && arr[left] > arr[largest] {  // [13] If left child is bigger',
                '        largest = left  // [14] Update biggest to left child',
                '    }',
                '    if right < size && arr[right] > arr[largest] {  // [15] If right child is bigger',
                '        largest = right  // [16] Update biggest to right child',
                '    }',
                '',
                '    if largest != i {  // [17] If the biggest is not the parent',
                '        arr[i], arr[largest] = arr[largest], arr[i]  // [18] Swap parent with biggest child',
                '        heapify(arr, size, largest)  // [19] Fix the subtree that was changed',
                '    }',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using heap sort',
                'fn heap_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '',
                '    for i in (0..n / 2).rev() {  // [3] Build a max heap from the bottom up',
                '        heapify(arr, n, i);  // [4] Make each subtree a valid heap',
                '    }',
                '',
                '    for i in (1..n).rev() {  // [5] Pull out the biggest item one at a time',
                '        arr.swap(0, i);  // [6] Move the biggest item to the end',
                '        heapify(arr, i, 0);  // [7] Fix the heap with the remaining items',
                '    }',
                '}',
                '',
                '// Step 8: Make sure the subtree at index i is a valid max heap',
                'fn heapify(arr: &mut Vec<i32>, size: usize, i: usize) {',
                '',
                '    let mut largest: usize = i;  // [9] Start by assuming the parent is the biggest',
                '    let left: usize = 2 * i + 1;  // [10] Find the left child',
                '    let right: usize = 2 * i + 2;  // [11] Find the right child',
                '',
                '    if left < size && arr[left] > arr[largest] {  // [12] If left child is bigger',
                '        largest = left;  // [13] Update biggest to left child',
                '    }',
                '    if right < size && arr[right] > arr[largest] {  // [14] If right child is bigger',
                '        largest = right;  // [15] Update biggest to right child',
                '    }',
                '',
                '    if largest != i {  // [16] If the biggest is not the parent',
                '        arr.swap(i, largest);  // [17] Swap parent with biggest child',
                '        heapify(arr, size, largest);  // [18] Fix the subtree that was changed',
                '    }',
                '}',
            ],
        },

        shellSort: {
            pseudo: [
                '# Step 1: Sort list A using shell sort',
                'procedure shellSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '    gap = n / 2  # [3] Start with a big gap between compared items',
                '',
                '    while gap > 0:  # [4] Keep going until the gap is zero',
                '',
                '        for i = gap to n - 1:  # [5] Look at each item starting from the gap position',
                '            temp = A[i]  # [6] Save the current item',
                '            j = i  # [7] Start comparing at the current position',
                '',
                '            while j >= gap and A[j - gap] > temp:  # [8] If the item gap spots back is bigger',
                '                A[j] = A[j - gap]  # [9] Move that bigger item forward by gap spots',
                '                j = j - gap  # [10] Jump back another gap spots',
                '',
                '            A[j] = temp  # [11] Put the saved item in the right spot',
                '',
                '        gap = gap / 2  # [12] Make the gap smaller for the next round',
                '',
                '    return A  # [13] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with shell sort',
                'def shell_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '    gap: int = n // 2  # [3] Start with a big gap between compared items',
                '',
                '    while gap > 0:  # [4] Keep going until the gap is zero',
                '',
                '        for i in range(gap, n):  # [5] Look at each item starting from the gap position',
                '            temp: int = arr[i]  # [6] Save the current item',
                '            j: int = i  # [7] Start comparing at the current position',
                '',
                '            while j >= gap and arr[j - gap] > temp:  # [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap]  # [9] Move that bigger item forward by gap spots',
                '                j -= gap  # [10] Jump back another gap spots',
                '',
                '            arr[j] = temp  # [11] Put the saved item in the right spot',
                '',
                '        gap //= 2  # [12] Make the gap smaller for the next round',
                '',
                '    return arr  # [13] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using shell sort',
                'void shellSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (int gap = n / 2; gap > 0; gap /= 2) {  // [3] Start with a big gap and shrink it each round',
                '',
                '        for (int i = gap; i < n; i++) {  // [5] Look at each item starting from the gap position',
                '            int temp = arr[i];  // [6] Save the current item',
                '            int j = i;  // [7] Start comparing at the current position',
                '',
                '            while (j >= gap && arr[j - gap] > temp) {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap];  // [9] Move that bigger item forward',
                '                j -= gap;  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp;  // [11] Put the saved item in the right spot',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using shell sort',
                'void shellSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '',
                '    for (int gap = n / 2; gap > 0; gap /= 2) {  // [3] Start with a big gap and shrink it each round',
                '',
                '        for (int i = gap; i < n; i++) {  // [5] Look at each item starting from the gap position',
                '            int temp = arr[i];  // [6] Save the current item',
                '            int j = i;  // [7] Start comparing at the current position',
                '',
                '            while (j >= gap && arr[j - gap] > temp) {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap];  // [9] Move that bigger item forward',
                '                j -= gap;  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp;  // [11] Put the saved item in the right spot',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using shell sort',
                'function shellSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {  // [3] Start with a big gap and shrink it',
                '',
                '        for (let i = gap; i < n; i++) {  // [5] Look at each item starting from the gap position',
                '            const temp = arr[i];  // [6] Save the current item',
                '            let j = i;  // [7] Start comparing at the current position',
                '',
                '            while (j >= gap && arr[j - gap] > temp) {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap];  // [9] Move that bigger item forward',
                '                j -= gap;  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp;  // [11] Put the saved item in the right spot',
                '        }',
                '    }',
                '',
                '    return arr;  // [13] Return the sorted array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using shell sort',
                'void shellSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '    // [3] Start with a big gap and shrink it each round',
                '    for (int gap = n / 2; gap > 0; gap /= 2) {',
                '',
                '        for (int i = gap; i < n; i++) {  // [5] Look at each item starting from the gap position',
                '            int temp = arr[i];  // [6] Save the current item',
                '            int j = i;  // [7] Start comparing at the current position',
                '',
                '            while (j >= gap && arr[j - gap] > temp) {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap];  // [9] Move that bigger item forward',
                '                j -= gap;  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp;  // [11] Put the saved item in the right spot',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using shell sort',
                'void ShellSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '    // [3] Start with a big gap and shrink it each round',
                '    for (int gap = n / 2; gap > 0; gap /= 2) {',
                '',
                '        for (int i = gap; i < n; i++) {  // [5] Look at each item starting from the gap position',
                '            int temp = arr[i];  // [6] Save the current item',
                '            int j = i;  // [7] Start comparing at the current position',
                '',
                '            while (j >= gap && arr[j - gap] > temp) {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap];  // [9] Move that bigger item forward',
                '                j -= gap;  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp;  // [11] Put the saved item in the right spot',
                '        }',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using shell sort',
                'function shellSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '    // [3] Start with a big gap and shrink it each round',
                '    for (let gap: number = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {',
                '',
                '        for (let i: number = gap; i < n; i++) {  // [5] Look at each item starting from the gap position',
                '            const temp: number = arr[i];  // [6] Save the current item',
                '            let j: number = i;  // [7] Start comparing at the current position',
                '',
                '            while (j >= gap && arr[j - gap] > temp) {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap];  // [9] Move that bigger item forward',
                '                j -= gap;  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp;  // [11] Put the saved item in the right spot',
                '        }',
                '    }',
                '',
                '    return arr;  // [13] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using shell sort',
                'func shellSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '    // [3] Start with a big gap and shrink it each round',
                '    for gap := n / 2; gap > 0; gap /= 2 {',
                '',
                '        for i := gap; i < n; i++ {  // [5] Look at each item starting from the gap position',
                '            temp := arr[i]  // [6] Save the current item',
                '            j := i  // [7] Start comparing at the current position',
                '',
                '            for j >= gap && arr[j-gap] > temp {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j-gap]  // [9] Move that bigger item forward',
                '                j -= gap  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp  // [11] Put the saved item in the right spot',
                '        }',
                '    }',
                '',
                '    return arr  // [13] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using shell sort',
                'fn shell_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '    // [3] Start with a big gap and shrink it each round',
                '    let mut gap: usize = n / 2;',
                '    while gap > 0 {',
                '',
                '        for i in gap..n {  // [5] Look at each item starting from the gap position',
                '            let temp: i32 = arr[i];  // [6] Save the current item',
                '            let mut j: usize = i;  // [7] Start comparing at the current position',
                '',
                '            while j >= gap && arr[j - gap] > temp {  // [8] If the item gap spots back is bigger',
                '                arr[j] = arr[j - gap];  // [9] Move that bigger item forward',
                '                j -= gap;  // [10] Jump back another gap spots',
                '            }',
                '',
                '            arr[j] = temp;  // [11] Put the saved item in the right spot',
                '        }',
                '        gap /= 2;  // [12] Make the gap smaller for the next round',
                '    }',
                '}',
            ],
        },

        gnomeSort: {
            pseudo: [
                '# Step 1: Start the gnome sort procedure with list A',
                'procedure gnomeSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '    i = 0  # [3] Start at the beginning of the list',
                '',
                '    while i < n:  # [4] Keep going until we reach the end',
                '        if i == 0 or A[i] >= A[i - 1]:  # [5] If we are at the start or the current item is in order',
                '            i = i + 1  # [6] Move forward one step',
                '        else:  # [7] Otherwise the current item is out of order',
                '            swap A[i] and A[i - 1]  # [8] Swap it with the one before it',
                '            i = i - 1  # [9] Move backward one step to check again',
                '',
                '    return A  # [10] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with gnome sort',
                'def gnome_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '    i: int = 0  # [3] Start at the beginning of the list',
                '',
                '    while i < n:  # [4] Keep going until we reach the end',
                '        if i == 0 or arr[i] >= arr[i - 1]:  # [5] If at the start or current item is in order',
                '            i += 1  # [6] Move forward one step',
                '        else:  # [7] Otherwise the current item is out of order',
                '            arr[i], arr[i - 1] = arr[i - 1], arr[i]  # [8] Swap it with the one before it',
                '            i -= 1  # [9] Move backward one step to check again',
                '',
                '    return arr  # [10] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using gnome sort',
                'void gnomeSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '    int i = 0;  // [3] Start at the beginning of the array',
                '',
                '    while (i < n) {  // [4] Keep going until we reach the end',
                '        if (i == 0 || arr[i] >= arr[i - 1]) {  // [5] If at the start or current item is in order',
                '            i++;  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            int temp = arr[i];  // [8] Save the current item',
                '            arr[i] = arr[i - 1];  // [8] Move the previous item forward',
                '            arr[i - 1] = temp;  // [8] Put the saved item in the previous spot',
                '            i--;  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using gnome sort',
                'void gnomeSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '    int i = 0;  // [3] Start at the beginning of the array',
                '',
                '    while (i < n) {  // [4] Keep going until we reach the end',
                '        if (i == 0 || arr[i] >= arr[i - 1]) {  // [5] If at the start or current item is in order',
                '            i++;  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            swap(arr[i], arr[i - 1]);  // [8] Swap it with the one before it',
                '            i--;  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using gnome sort',
                'function gnomeSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '    let i = 0;  // [3] Start at the beginning of the array',
                '',
                '    while (i < n) {  // [4] Keep going until we reach the end',
                '        if (i === 0 || arr[i] >= arr[i - 1]) {  // [5] If at the start or current item is in order',
                '            i++;  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];  // [8] Swap it with the one before it',
                '            i--;  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '',
                '    return arr;  // [10] Return the sorted array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using gnome sort',
                'void gnomeSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '    int i = 0;  // [3] Start at the beginning of the array',
                '',
                '    while (i < n) {  // [4] Keep going until we reach the end',
                '        if (i == 0 || arr[i] >= arr[i - 1]) {  // [5] If at the start or current item is in order',
                '            i++;  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            int temp = arr[i]; arr[i] = arr[i-1]; arr[i-1] = temp;  // [8] Swap it with the one before it',
                '            i--;  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using gnome sort',
                'void GnomeSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '    int i = 0;  // [3] Start at the beginning of the array',
                '',
                '    while (i < n) {  // [4] Keep going until we reach the end',
                '        if (i == 0 || arr[i] >= arr[i - 1]) {  // [5] If at the start or current item is in order',
                '            i++;  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            (arr[i], arr[i - 1]) = (arr[i - 1], arr[i]);  // [8] Swap it with the one before it',
                '            i--;  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using gnome sort',
                'function gnomeSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '    let i: number = 0;  // [3] Start at the beginning of the array',
                '',
                '    while (i < n) {  // [4] Keep going until we reach the end',
                '        if (i === 0 || arr[i] >= arr[i - 1]) {  // [5] If at the start or current item is in order',
                '            i++;  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];  // [8] Swap it with the one before it',
                '            i--;  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '',
                '    return arr;  // [10] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using gnome sort',
                'func gnomeSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '    i := 0  // [3] Start at the beginning of the slice',
                '',
                '    for i < n {  // [4] Keep going until we reach the end',
                '        if i == 0 || arr[i] >= arr[i-1] {  // [5] If at the start or current item is in order',
                '            i++  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            arr[i], arr[i-1] = arr[i-1], arr[i]  // [8] Swap it with the one before it',
                '            i--  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '',
                '    return arr  // [10] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using gnome sort',
                'fn gnome_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '    let mut i: usize = 0;  // [3] Start at the beginning of the vector',
                '',
                '    while i < n {  // [4] Keep going until we reach the end',
                '        if i == 0 || arr[i] >= arr[i - 1] {  // [5] If at the start or current item is in order',
                '            i += 1;  // [6] Move forward one step',
                '        } else {  // [7] Otherwise the current item is out of order',
                '            arr.swap(i, i - 1);  // [8] Swap it with the one before it',
                '            i -= 1;  // [9] Move backward one step to check again',
                '        }',
                '    }',
                '}',
            ],
        },

        cocktailShakerSort: {
            pseudo: [
                '# Step 1: Start the cocktail shaker sort procedure with list A',
                'procedure cocktailShakerSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '    start = 0  # [3] The beginning of the unsorted section',
                '    end = n - 1  # [4] The end of the unsorted section',
                '    swapped = true  # [5] Assume we need at least one pass',
                '',
                '    while swapped:  # [6] Keep going as long as we swapped something',
                '        swapped = false  # [7] Reset the swap flag for this pass',
                '',
                '        for i = start to end - 1:  # [8] Go left to right through the unsorted part',
                '            if A[i] > A[i + 1]:  # [9] If the left item is bigger than the right one',
                '                swap A[i] and A[i + 1]  # [10] Swap them so the smaller one comes first',
                '                swapped = true  # [11] Remember that we made a swap',
                '',
                '        end = end - 1  # [12] The last item is now in the right spot',
                '',
                '        for i = end - 1 down to start:  # [13] Go right to left through the unsorted part',
                '            if A[i] > A[i + 1]:  # [14] If the left item is bigger than the right one',
                '                swap A[i] and A[i + 1]  # [15] Swap them so the smaller one comes first',
                '                swapped = true  # [16] Remember that we made a swap',
                '',
                '        start = start + 1  # [17] The first item is now in the right spot',
                '',
                '    return A  # [18] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with cocktail shaker sort',
                'def cocktail_shaker_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '    start: int = 0  # [3] The beginning of the unsorted section',
                '    end: int = n - 1  # [4] The end of the unsorted section',
                '    swapped: bool = True  # [5] Assume we need at least one pass',
                '',
                '    while swapped:  # [6] Keep going as long as we swapped something',
                '        swapped = False  # [7] Reset the swap flag for this pass',
                '',
                '        for i in range(start, end):  # [8] Go left to right through the unsorted part',
                '            if arr[i] > arr[i + 1]:  # [9] If the left item is bigger than the right one',
                '                arr[i], arr[i + 1] = arr[i + 1], arr[i]  # [10] Swap them',
                '                swapped = True  # [11] Remember that we made a swap',
                '',
                '        end -= 1  # [12] The last item is now in the right spot',
                '',
                '        for i in range(end - 1, start - 1, -1):  # [13] Go right to left through the unsorted part',
                '            if arr[i] > arr[i + 1]:  # [14] If the left item is bigger than the right one',
                '                arr[i], arr[i + 1] = arr[i + 1], arr[i]  # [15] Swap them',
                '                swapped = True  # [16] Remember that we made a swap',
                '',
                '        start += 1  # [17] The first item is now in the right spot',
                '',
                '    return arr  # [18] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using cocktail shaker sort',
                'void cocktailShakerSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '    int start = 0;  // [3] The beginning of the unsorted section',
                '    int end = n - 1;  // [4] The end of the unsorted section',
                '    boolean swapped = true;  // [5] Assume we need at least one pass',
                '',
                '    while (swapped) {  // [6] Keep going as long as we swapped something',
                '        swapped = false;  // [7] Reset the swap flag',
                '',
                '        for (int i = start; i < end; i++) {  // [8] Go left to right',
                '            if (arr[i] > arr[i + 1]) {  // [9] If the left item is bigger',
                '                int temp = arr[i];  // [10] Save the left item',
                '                arr[i] = arr[i + 1];  // [10] Move the right item left',
                '                arr[i + 1] = temp;  // [10] Put the saved item on the right',
                '                swapped = true;  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end--;  // [12] The last item is now sorted',
                '',
                '        for (int i = end - 1; i >= start; i--) {  // [13] Go right to left',
                '            if (arr[i] > arr[i + 1]) {  // [14] If the left item is bigger',
                '                int temp = arr[i];  // [15] Save the left item',
                '                arr[i] = arr[i + 1];  // [15] Move the right item left',
                '                arr[i + 1] = temp;  // [15] Put the saved item on the right',
                '                swapped = true;  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start++;  // [17] The first item is now sorted',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using cocktail shaker sort',
                'void cocktailShakerSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '    int start = 0;  // [3] The beginning of the unsorted section',
                '    int end = n - 1;  // [4] The end of the unsorted section',
                '    bool swapped = true;  // [5] Assume we need at least one pass',
                '',
                '    while (swapped) {  // [6] Keep going as long as we swapped something',
                '        swapped = false;  // [7] Reset the swap flag',
                '',
                '        for (int i = start; i < end; i++) {  // [8] Go left to right',
                '            if (arr[i] > arr[i + 1]) {  // [9] If the left item is bigger',
                '                swap(arr[i], arr[i + 1]);  // [10] Swap them',
                '                swapped = true;  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end--;  // [12] The last item is now sorted',
                '',
                '        for (int i = end - 1; i >= start; i--) {  // [13] Go right to left',
                '            if (arr[i] > arr[i + 1]) {  // [14] If the left item is bigger',
                '                swap(arr[i], arr[i + 1]);  // [15] Swap them',
                '                swapped = true;  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start++;  // [17] The first item is now sorted',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using cocktail shaker sort',
                'function cocktailShakerSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '    let start = 0;  // [3] The beginning of the unsorted section',
                '    let end = n - 1;  // [4] The end of the unsorted section',
                '    let swapped = true;  // [5] Assume we need at least one pass',
                '',
                '    while (swapped) {  // [6] Keep going as long as we swapped something',
                '        swapped = false;  // [7] Reset the swap flag',
                '',
                '        for (let i = start; i < end; i++) {  // [8] Go left to right',
                '            if (arr[i] > arr[i + 1]) {  // [9] If the left item is bigger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [10] Swap them',
                '                swapped = true;  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end--;  // [12] The last item is now sorted',
                '',
                '        for (let i = end - 1; i >= start; i--) {  // [13] Go right to left',
                '            if (arr[i] > arr[i + 1]) {  // [14] If the left item is bigger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [15] Swap them',
                '                swapped = true;  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start++;  // [17] The first item is now sorted',
                '    }',
                '',
                '    return arr;  // [18] Return the sorted array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using cocktail shaker sort',
                'void cocktailShakerSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '    int start = 0;  // [3] The beginning of the unsorted section',
                '    int end = n - 1;  // [4] The end of the unsorted section',
                '    int swapped = 1;  // [5] Assume we need at least one pass',
                '',
                '    while (swapped) {  // [6] Keep going as long as we swapped something',
                '        swapped = 0;  // [7] Reset the swap flag',
                '',
                '        for (int i = start; i < end; i++) {  // [8] Go left to right',
                '            if (arr[i] > arr[i + 1]) {  // [9] If the left item is bigger',
                '                int temp = arr[i]; arr[i] = arr[i+1]; arr[i+1] = temp;  // [10] Swap them',
                '                swapped = 1;  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end--;  // [12] The last item is now sorted',
                '',
                '        for (int i = end - 1; i >= start; i--) {  // [13] Go right to left',
                '            if (arr[i] > arr[i + 1]) {  // [14] If the left item is bigger',
                '                int temp = arr[i]; arr[i] = arr[i+1]; arr[i+1] = temp;  // [15] Swap them',
                '                swapped = 1;  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start++;  // [17] The first item is now sorted',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using cocktail shaker sort',
                'void CocktailShakerSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '    int start = 0;  // [3] The beginning of the unsorted section',
                '    int end = n - 1;  // [4] The end of the unsorted section',
                '    bool swapped = true;  // [5] Assume we need at least one pass',
                '',
                '    while (swapped) {  // [6] Keep going as long as we swapped something',
                '        swapped = false;  // [7] Reset the swap flag',
                '',
                '        for (int i = start; i < end; i++) {  // [8] Go left to right',
                '            if (arr[i] > arr[i + 1]) {  // [9] If the left item is bigger',
                '                (arr[i], arr[i + 1]) = (arr[i + 1], arr[i]);  // [10] Swap them',
                '                swapped = true;  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end--;  // [12] The last item is now sorted',
                '',
                '        for (int i = end - 1; i >= start; i--) {  // [13] Go right to left',
                '            if (arr[i] > arr[i + 1]) {  // [14] If the left item is bigger',
                '                (arr[i], arr[i + 1]) = (arr[i + 1], arr[i]);  // [15] Swap them',
                '                swapped = true;  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start++;  // [17] The first item is now sorted',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using cocktail shaker sort',
                'function cocktailShakerSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '    let start: number = 0;  // [3] The beginning of the unsorted section',
                '    let end: number = n - 1;  // [4] The end of the unsorted section',
                '    let swapped: boolean = true;  // [5] Assume we need at least one pass',
                '',
                '    while (swapped) {  // [6] Keep going as long as we swapped something',
                '        swapped = false;  // [7] Reset the swap flag',
                '',
                '        for (let i: number = start; i < end; i++) {  // [8] Go left to right',
                '            if (arr[i] > arr[i + 1]) {  // [9] If the left item is bigger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [10] Swap them',
                '                swapped = true;  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end--;  // [12] The last item is now sorted',
                '',
                '        for (let i: number = end - 1; i >= start; i--) {  // [13] Go right to left',
                '            if (arr[i] > arr[i + 1]) {  // [14] If the left item is bigger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [15] Swap them',
                '                swapped = true;  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start++;  // [17] The first item is now sorted',
                '    }',
                '',
                '    return arr;  // [18] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using cocktail shaker sort',
                'func cocktailShakerSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '    start := 0  // [3] The beginning of the unsorted section',
                '    end := n - 1  // [4] The end of the unsorted section',
                '    swapped := true  // [5] Assume we need at least one pass',
                '',
                '    for swapped {  // [6] Keep going as long as we swapped something',
                '        swapped = false  // [7] Reset the swap flag',
                '',
                '        for i := start; i < end; i++ {  // [8] Go left to right',
                '            if arr[i] > arr[i+1] {  // [9] If the left item is bigger',
                '                arr[i], arr[i+1] = arr[i+1], arr[i]  // [10] Swap them',
                '                swapped = true  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end--  // [12] The last item is now sorted',
                '',
                '        for i := end - 1; i >= start; i-- {  // [13] Go right to left',
                '            if arr[i] > arr[i+1] {  // [14] If the left item is bigger',
                '                arr[i], arr[i+1] = arr[i+1], arr[i]  // [15] Swap them',
                '                swapped = true  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start++  // [17] The first item is now sorted',
                '    }',
                '',
                '    return arr  // [18] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using cocktail shaker sort',
                'fn cocktail_shaker_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '    let mut start: usize = 0;  // [3] The beginning of the unsorted section',
                '    let mut end: usize = n - 1;  // [4] The end of the unsorted section',
                '    let mut swapped: bool = true;  // [5] Assume we need at least one pass',
                '',
                '    while swapped {  // [6] Keep going as long as we swapped something',
                '        swapped = false;  // [7] Reset the swap flag',
                '',
                '        for i in start..end {  // [8] Go left to right',
                '            if arr[i] > arr[i + 1] {  // [9] If the left item is bigger',
                '                arr.swap(i, i + 1);  // [10] Swap them',
                '                swapped = true;  // [11] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        end -= 1;  // [12] The last item is now sorted',
                '',
                '        for i in (start..end).rev() {  // [13] Go right to left',
                '            if arr[i] > arr[i + 1] {  // [14] If the left item is bigger',
                '                arr.swap(i, i + 1);  // [15] Swap them',
                '                swapped = true;  // [16] Remember that we swapped',
                '            }',
                '        }',
                '',
                '        start += 1;  // [17] The first item is now sorted',
                '    }',
                '}',
            ],
        },

        pancakeSort: {
            pseudo: [
                '# Step 1: Start the pancake sort procedure with list A',
                'procedure pancakeSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '',
                '    for size = n down to 2:  # [3] Shrink the unsorted section one item at a time',
                '        maxIdx = findMaxIndex(A, 0, size - 1)  # [4] Find where the biggest item is in the unsorted part',
                '',
                '        if maxIdx != size - 1:  # [5] If the biggest item is not already at the end',
                '            if maxIdx != 0:  # [6] If the biggest item is not at the front',
                '                flip(A, 0, maxIdx)  # [7] Flip from the start to bring the biggest to the front',
                '            flip(A, 0, size - 1)  # [8] Flip from the start to put the biggest at the end',
                '',
                '    return A  # [9] Give back the sorted list',
                '',
                '# Step 10: Flip a section of the list from index i to index j',
                'procedure flip(A, i, j):',
                '',
                '    while i < j:  # [11] While the two ends have not met',
                '        swap A[i] and A[j]  # [12] Swap the items at the two ends',
                '        i = i + 1  # [13] Move the left end inward',
                '        j = j - 1  # [14] Move the right end inward',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with pancake sort',
                'def pancake_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '',
                '    for size in range(n, 1, -1):  # [3] Shrink the unsorted section one item at a time',
                '        max_idx: int = arr.index(max(arr[:size]))  # [4] Find where the biggest item is',
                '',
                '        if max_idx != size - 1:  # [5] If the biggest is not already at the end',
                '            if max_idx != 0:  # [6] If the biggest is not at the front',
                '                arr[:max_idx + 1] = arr[:max_idx + 1][::-1]  # [7] Flip to bring it to the front',
                '            arr[:size] = arr[:size][::-1]  # [8] Flip to put it at the end',
                '',
                '    return arr  # [9] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using pancake sort',
                'void pancakeSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (int size = n; size > 1; size--) {  // [3] Shrink the unsorted section one at a time',
                '        int maxIdx = 0;  // [4] Assume the biggest is at the start',
                '        for (int i = 1; i < size; i++) {  // [4] Look through the unsorted part',
                '            if (arr[i] > arr[maxIdx]) maxIdx = i;  // [4] Update if we find a bigger item',
                '        }',
                '',
                '        if (maxIdx != size - 1) {  // [5] If the biggest is not at the end',
                '            if (maxIdx != 0) flip(arr, 0, maxIdx);  // [7] Flip to bring it to the front',
                '            flip(arr, 0, size - 1);  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '}',
                '',
                '// Step 10: Flip a section of the array from index i to index j',
                'void flip(int[] arr, int i, int j) {',
                '',
                '    while (i < j) {  // [11] While the two ends have not met',
                '        int temp = arr[i];  // [12] Save the left item',
                '        arr[i] = arr[j];  // [12] Move the right item to the left',
                '        arr[j] = temp;  // [12] Put the saved item on the right',
                '        i++;  // [13] Move the left end inward',
                '        j--;  // [14] Move the right end inward',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using pancake sort',
                'void pancakeSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '',
                '    for (int size = n; size > 1; size--) {  // [3] Shrink the unsorted section one at a time',
                '        int maxIdx = max_element(arr.begin(), arr.begin() + size) - arr.begin();  // [4] Find the biggest item',
                '',
                '        if (maxIdx != size - 1) {  // [5] If the biggest is not at the end',
                '            if (maxIdx != 0) reverse(arr.begin(), arr.begin() + maxIdx + 1);  // [7] Flip to bring it to the front',
                '            reverse(arr.begin(), arr.begin() + size);  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using pancake sort',
                'function pancakeSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let size = n; size > 1; size--) {  // [3] Shrink the unsorted section one at a time',
                '        let maxIdx = 0;  // [4] Assume the biggest is at the start',
                '        for (let i = 1; i < size; i++) {  // [4] Look through the unsorted part',
                '            if (arr[i] > arr[maxIdx]) maxIdx = i;  // [4] Update if we find a bigger item',
                '        }',
                '',
                '        if (maxIdx !== size - 1) {  // [5] If the biggest is not at the end',
                '            if (maxIdx !== 0) flip(arr, 0, maxIdx);  // [7] Flip to bring it to the front',
                '            flip(arr, 0, size - 1);  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '',
                '    return arr;  // [9] Return the sorted array',
                '}',
                '',
                '// Step 10: Flip a section of the array from index i to index j',
                'function flip(arr, i, j) {',
                '',
                '    while (i < j) {  // [11] While the two ends have not met',
                '        [arr[i], arr[j]] = [arr[j], arr[i]];  // [12] Swap the items at the two ends',
                '        i++;  // [13] Move the left end inward',
                '        j--;  // [14] Move the right end inward',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using pancake sort',
                'void pancakeSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '',
                '    for (int size = n; size > 1; size--) {  // [3] Shrink the unsorted section one at a time',
                '        int maxIdx = 0;',
                '        for (int i = 1; i < size; i++) {  // [4] Find the biggest item in the unsorted part',
                '            if (arr[i] > arr[maxIdx]) maxIdx = i;',
                '        }',
                '',
                '        if (maxIdx != size - 1) {  // [5] If the biggest is not at the end',
                '            if (maxIdx != 0) flip(arr, 0, maxIdx);  // [7] Flip to bring it to the front',
                '            flip(arr, 0, size - 1);  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '}',
                '',
                '// Step 10: Flip a section of the array from index i to index j',
                'void flip(int *arr, int i, int j) {',
                '',
                '    while (i < j) {  // [11] While the two ends have not met',
                '        int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;  // [12] Swap the items at the two ends',
                '        i++;  // [13] Move the left end inward',
                '        j--;  // [14] Move the right end inward',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using pancake sort',
                'void PancakeSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '',
                '    for (int size = n; size > 1; size--) {  // [3] Shrink the unsorted section one at a time',
                '        int maxIdx = 0;',
                '        for (int i = 1; i < size; i++) {  // [4] Find the biggest item in the unsorted part',
                '            if (arr[i] > arr[maxIdx]) maxIdx = i;',
                '        }',
                '',
                '        if (maxIdx != size - 1) {  // [5] If the biggest is not at the end',
                '            if (maxIdx != 0) Flip(arr, 0, maxIdx);  // [7] Flip to bring it to the front',
                '            Flip(arr, 0, size - 1);  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '}',
                '',
                '// Step 10: Flip a section of the array from index i to index j',
                'void Flip(int[] arr, int i, int j) {',
                '',
                '    while (i < j) {  // [11] While the two ends have not met',
                '        (arr[i], arr[j]) = (arr[j], arr[i]);  // [12] Swap the items at the two ends',
                '        i++;  // [13] Move the left end inward',
                '        j--;  // [14] Move the right end inward',
                '    }',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using pancake sort',
                'function pancakeSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '',
                '    for (let size: number = n; size > 1; size--) {  // [3] Shrink the unsorted section one at a time',
                '        let maxIdx: number = 0;',
                '        for (let i: number = 1; i < size; i++) {  // [4] Find the biggest item in the unsorted part',
                '            if (arr[i] > arr[maxIdx]) maxIdx = i;',
                '        }',
                '',
                '        if (maxIdx !== size - 1) {  // [5] If the biggest is not at the end',
                '            if (maxIdx !== 0) flip(arr, 0, maxIdx);  // [7] Flip to bring it to the front',
                '            flip(arr, 0, size - 1);  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '',
                '    return arr;  // [9] Return the sorted array',
                '}',
                '',
                '// Step 10: Flip a section of the array from index i to index j',
                'function flip(arr: number[], i: number, j: number): void {',
                '',
                '    while (i < j) {  // [11] While the two ends have not met',
                '        [arr[i], arr[j]] = [arr[j], arr[i]];  // [12] Swap the items at the two ends',
                '        i++;  // [13] Move the left end inward',
                '        j--;  // [14] Move the right end inward',
                '    }',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using pancake sort',
                'func pancakeSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '',
                '    for size := n; size > 1; size-- {  // [3] Shrink the unsorted section one at a time',
                '        maxIdx := 0',
                '        for i := 1; i < size; i++ {  // [4] Find the biggest item in the unsorted part',
                '            if arr[i] > arr[maxIdx] { maxIdx = i }',
                '        }',
                '',
                '        if maxIdx != size-1 {  // [5] If the biggest is not at the end',
                '            if maxIdx != 0 { flip(arr, 0, maxIdx) }  // [7] Flip to bring it to the front',
                '            flip(arr, 0, size-1)  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '',
                '    return arr  // [9] Return the sorted slice',
                '}',
                '',
                '// Step 10: Flip a section of the slice from index i to index j',
                'func flip(arr []int, i, j int) {',
                '',
                '    for i < j {  // [11] While the two ends have not met',
                '        arr[i], arr[j] = arr[j], arr[i]  // [12] Swap the items at the two ends',
                '        i++  // [13] Move the left end inward',
                '        j--  // [14] Move the right end inward',
                '    }',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using pancake sort',
                'fn pancake_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '',
                '    for size in (2..=n).rev() {  // [3] Shrink the unsorted section one at a time',
                '        let max_idx: usize = arr[..size]  // [4] Find the biggest item in the unsorted part',
                '            .iter().enumerate().max_by_key(|&(_, v)| v).map(|(i, _)| i).unwrap();',
                '',
                '        if max_idx != size - 1 {  // [5] If the biggest is not at the end',
                '            if max_idx != 0 { flip(arr, 0, max_idx); }  // [7] Flip to bring it to the front',
                '            flip(arr, 0, size - 1);  // [8] Flip to put it at the end',
                '        }',
                '    }',
                '}',
                '',
                '// Step 10: Flip a section of the vector from index i to index j',
                'fn flip(arr: &mut Vec<i32>, mut i: usize, mut j: usize) {',
                '',
                '    while i < j {  // [11] While the two ends have not met',
                '        arr.swap(i, j);  // [12] Swap the items at the two ends',
                '        i += 1;  // [13] Move the left end inward',
                '        j -= 1;  // [14] Move the right end inward',
                '    }',
                '}',
            ],
        },

        bogoSort: {
            pseudo: [
                '# Step 1: Start the bogo sort procedure with list A',
                'procedure bogoSort(A):',
                '',
                '    maxTries = 1000  # [2] Set a limit so we do not loop forever',
                '',
                '    for attempt = 1 to maxTries:  # [3] Try up to 1000 times',
                '',
                '        if isSorted(A):  # [4] Check if the list is already in order',
                '            return A  # [5] If yes, we are done',
                '',
                '        shuffle(A)  # [6] Randomly rearrange all the items',
                '',
                '    return A  # [7] Give back whatever we have after all tries',
                '',
                '# Step 8: Check if list A is sorted from small to big',
                'procedure isSorted(A):',
                '',
                '    for i = 0 to length(A) - 2:  # [9] Look at each pair of neighbors',
                '        if A[i] > A[i + 1]:  # [10] If the left one is bigger than the right one',
                '            return false  # [11] The list is not sorted',
                '',
                '    return true  # [12] All pairs are in order, so the list is sorted',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with bogo sort',
                'def bogo_sort(arr: list[int]) -> list[int]:',
                '',
                '    max_tries: int = 1000  # [2] Set a limit so we do not loop forever',
                '',
                '    for attempt in range(max_tries):  # [3] Try up to 1000 times',
                '',
                '        if is_sorted(arr):  # [4] Check if the list is already in order',
                '            return arr  # [5] If yes, we are done',
                '',
                '        random.shuffle(arr)  # [6] Randomly rearrange all the items',
                '',
                '    return arr  # [7] Give back whatever we have after all tries',
                '',
                '# Step 8: Check if list is sorted from small to big',
                'def is_sorted(arr: list[int]) -> bool:',
                '',
                '    for i in range(len(arr) - 1):  # [9] Look at each pair of neighbors',
                '        if arr[i] > arr[i + 1]:  # [10] If the left one is bigger than the right one',
                '            return False  # [11] The list is not sorted',
                '',
                '    return True  # [12] All pairs are in order',
            ],
            java: [
                '// Step 1: Sort the array using bogo sort',
                'void bogoSort(int[] arr) {',
                '',
                '    int maxTries = 1000;  // [2] Set a limit so we do not loop forever',
                '',
                '    for (int attempt = 0; attempt < maxTries; attempt++) {  // [3] Try up to 1000 times',
                '',
                '        if (isSorted(arr)) {  // [4] Check if the array is already in order',
                '            return;  // [5] If yes, we are done',
                '        }',
                '',
                '        shuffle(arr);  // [6] Randomly rearrange all the items',
                '    }',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'boolean isSorted(int[] arr) {',
                '',
                '    for (int i = 0; i < arr.length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using bogo sort',
                'void bogoSort(vector<int>& arr) {',
                '',
                '    int maxTries = 1000;  // [2] Set a limit so we do not loop forever',
                '',
                '    for (int attempt = 0; attempt < maxTries; attempt++) {  // [3] Try up to 1000 times',
                '',
                '        if (isSorted(arr)) {  // [4] Check if the array is already in order',
                '            return;  // [5] If yes, we are done',
                '        }',
                '',
                '        random_shuffle(arr.begin(), arr.end());  // [6] Randomly rearrange all the items',
                '    }',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'bool isSorted(vector<int>& arr) {',
                '',
                '    for (int i = 0; i < arr.size() - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using bogo sort',
                'function bogoSort(arr) {',
                '',
                '    const maxTries = 1000;  // [2] Set a limit so we do not loop forever',
                '',
                '    for (let attempt = 0; attempt < maxTries; attempt++) {  // [3] Try up to 1000 times',
                '',
                '        if (isSorted(arr)) {  // [4] Check if the array is already in order',
                '            return arr;  // [5] If yes, we are done',
                '        }',
                '',
                '        shuffle(arr);  // [6] Randomly rearrange all the items',
                '    }',
                '',
                '    return arr;  // [7] Return whatever we have after all tries',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'function isSorted(arr) {',
                '',
                '    for (let i = 0; i < arr.length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using bogo sort',
                'void bogoSort(int *arr, int n) {',
                '',
                '    int maxTries = 1000;  // [2] Set a limit so we do not loop forever',
                '',
                '    for (int attempt = 0; attempt < maxTries; attempt++) {  // [3] Try up to 1000 times',
                '',
                '        if (isSorted(arr, n)) {  // [4] Check if the array is already in order',
                '            return;  // [5] If yes, we are done',
                '        }',
                '',
                '        shuffle(arr, n);  // [6] Randomly rearrange all the items',
                '    }',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'int isSorted(int *arr, int n) {',
                '',
                '    for (int i = 0; i < n - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return 0;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return 1;  // [12] All pairs are in order',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using bogo sort',
                'void BogoSort(int[] arr) {',
                '',
                '    int maxTries = 1000;  // [2] Set a limit so we do not loop forever',
                '',
                '    for (int attempt = 0; attempt < maxTries; attempt++) {  // [3] Try up to 1000 times',
                '',
                '        if (IsSorted(arr)) {  // [4] Check if the array is already in order',
                '            return;  // [5] If yes, we are done',
                '        }',
                '',
                '        Shuffle(arr);  // [6] Randomly rearrange all the items',
                '    }',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'bool IsSorted(int[] arr) {',
                '',
                '    for (int i = 0; i < arr.Length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using bogo sort',
                'function bogoSort(arr: number[]): number[] {',
                '',
                '    const maxTries: number = 1000;  // [2] Set a limit so we do not loop forever',
                '',
                '    for (let attempt: number = 0; attempt < maxTries; attempt++) {  // [3] Try up to 1000 times',
                '',
                '        if (isSorted(arr)) {  // [4] Check if the array is already in order',
                '            return arr;  // [5] If yes, we are done',
                '        }',
                '',
                '        shuffle(arr);  // [6] Randomly rearrange all the items',
                '    }',
                '',
                '    return arr;  // [7] Return whatever we have after all tries',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'function isSorted(arr: number[]): boolean {',
                '',
                '    for (let i: number = 0; i < arr.length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using bogo sort',
                'func bogoSort(arr []int) []int {',
                '',
                '    maxTries := 1000  // [2] Set a limit so we do not loop forever',
                '',
                '    for attempt := 0; attempt < maxTries; attempt++ {  // [3] Try up to 1000 times',
                '',
                '        if isSorted(arr) {  // [4] Check if the slice is already in order',
                '            return arr  // [5] If yes, we are done',
                '        }',
                '',
                '        shuffle(arr)  // [6] Randomly rearrange all the items',
                '    }',
                '',
                '    return arr  // [7] Return whatever we have after all tries',
                '}',
                '',
                '// Step 8: Check if the slice is sorted from small to big',
                'func isSorted(arr []int) bool {',
                '',
                '    for i := 0; i < len(arr)-1; i++ {  // [9] Look at each pair of neighbors',
                '        if arr[i] > arr[i+1] {  // [10] If the left one is bigger than the right one',
                '            return false  // [11] The slice is not sorted',
                '        }',
                '    }',
                '',
                '    return true  // [12] All pairs are in order',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using bogo sort',
                'fn bogo_sort(arr: &mut Vec<i32>) {',
                '',
                '    let max_tries: usize = 1000;  // [2] Set a limit so we do not loop forever',
                '',
                '    for _ in 0..max_tries {  // [3] Try up to 1000 times',
                '',
                '        if is_sorted(arr) {  // [4] Check if the vector is already in order',
                '            return;  // [5] If yes, we are done',
                '        }',
                '',
                '        shuffle(arr);  // [6] Randomly rearrange all the items',
                '    }',
                '}',
                '',
                '// Step 8: Check if the vector is sorted from small to big',
                'fn is_sorted(arr: &Vec<i32>) -> bool {',
                '',
                '    for i in 0..arr.len() - 1 {  // [9] Look at each pair of neighbors',
                '        if arr[i] > arr[i + 1] {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The vector is not sorted',
                '        }',
                '    }',
                '',
                '    true  // [12] All pairs are in order',
                '}',
            ],
        },

        thanosSort: {
            pseudo: [
                '# Step 1: Start the thanos sort procedure with list A',
                'procedure thanosSort(A):',
                '',
                '    while not isSorted(A) and length(A) > 1:  # [2] Keep going until sorted or only one item left',
                '',
                '        half = length(A) / 2  # [3] Find the halfway point',
                '',
                '        for i = 0 to length(A) - 1:  # [4] Look at each item in the list',
                '            randomly mark item for removal  # [5] Flip a coin to decide if this item survives',
                '',
                '        remove about half the items  # [6] Snap away the marked items',
                '',
                '    return A  # [7] Give back whatever survived',
                '',
                '# Step 8: Check if list A is sorted from small to big',
                'procedure isSorted(A):',
                '',
                '    for i = 0 to length(A) - 2:  # [9] Look at each pair of neighbors',
                '        if A[i] > A[i + 1]:  # [10] If the left one is bigger than the right one',
                '            return false  # [11] The list is not sorted',
                '',
                '    return true  # [12] All pairs are in order',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with thanos sort',
                'def thanos_sort(arr: list[int]) -> list[int]:',
                '',
                '    while not is_sorted(arr) and len(arr) > 1:  # [2] Keep going until sorted or one item left',
                '',
                '        half: int = len(arr) // 2  # [3] Find the halfway point',
                '',
                '        survivors: list[int] = []  # [4] Make an empty list for survivors',
                '        for item in arr:  # [5] Look at each item',
                '            if random.random() < 0.5:  # [5] Flip a coin for each item',
                '                survivors.append(item)  # [6] This item survives the snap',
                '',
                '        arr = survivors if survivors else [arr[0]]  # [6] Use survivors, keep at least one',
                '',
                '    return arr  # [7] Return whatever survived',
                '',
                '# Step 8: Check if list is sorted from small to big',
                'def is_sorted(arr: list[int]) -> bool:',
                '',
                '    for i in range(len(arr) - 1):  # [9] Look at each pair of neighbors',
                '        if arr[i] > arr[i + 1]:  # [10] If the left one is bigger than the right one',
                '            return False  # [11] The list is not sorted',
                '',
                '    return True  # [12] All pairs are in order',
            ],
            java: [
                '// Step 1: Sort the array using thanos sort',
                'int[] thanosSort(int[] arr) {',
                '',
                '    while (!isSorted(arr) && arr.length > 1) {  // [2] Keep going until sorted or one item left',
                '',
                '        int half = arr.length / 2;  // [3] Find the halfway point',
                '',
                '        List<Integer> survivors = new ArrayList<>();  // [4] Make a list for survivors',
                '        for (int item : arr) {  // [5] Look at each item',
                '            if (Math.random() < 0.5) {  // [5] Flip a coin for each item',
                '                survivors.add(item);  // [6] This item survives the snap',
                '            }',
                '        }',
                '',
                '        arr = survivors.stream().mapToInt(i -> i).toArray();  // [6] Keep the survivors',
                '    }',
                '',
                '    return arr;  // [7] Return whatever survived',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'boolean isSorted(int[] arr) {',
                '',
                '    for (int i = 0; i < arr.length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using thanos sort',
                'vector<int> thanosSort(vector<int> arr) {',
                '',
                '    while (!isSorted(arr) && arr.size() > 1) {  // [2] Keep going until sorted or one item left',
                '',
                '        int half = arr.size() / 2;  // [3] Find the halfway point',
                '',
                '        vector<int> survivors;  // [4] Make a list for survivors',
                '        for (int item : arr) {  // [5] Look at each item',
                '            if (rand() % 2 == 0) {  // [5] Flip a coin for each item',
                '                survivors.push_back(item);  // [6] This item survives the snap',
                '            }',
                '        }',
                '',
                '        arr = survivors.empty() ? vector<int>{arr[0]} : survivors;  // [6] Keep the survivors',
                '    }',
                '',
                '    return arr;  // [7] Return whatever survived',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'bool isSorted(vector<int>& arr) {',
                '',
                '    for (int i = 0; i < arr.size() - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using thanos sort',
                'function thanosSort(arr) {',
                '',
                '    while (!isSorted(arr) && arr.length > 1) {  // [2] Keep going until sorted or one item left',
                '',
                '        const half = Math.floor(arr.length / 2);  // [3] Find the halfway point',
                '',
                '        const survivors = [];  // [4] Make a list for survivors',
                '        for (const item of arr) {  // [5] Look at each item',
                '            if (Math.random() < 0.5) {  // [5] Flip a coin for each item',
                '                survivors.push(item);  // [6] This item survives the snap',
                '            }',
                '        }',
                '',
                '        arr = survivors.length > 0 ? survivors : [arr[0]];  // [6] Keep the survivors',
                '    }',
                '',
                '    return arr;  // [7] Return whatever survived',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'function isSorted(arr) {',
                '',
                '    for (let i = 0; i < arr.length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using thanos sort',
                'int* thanosSort(int *arr, int *n) {',
                '',
                '    while (!isSorted(arr, *n) && *n > 1) {  // [2] Keep going until sorted or one item left',
                '',
                '        int half = *n / 2;  // [3] Find the halfway point',
                '',
                '        int writeIdx = 0;',
                '        for (int i = 0; i < *n; i++) {  // [5] Look at each item',
                '            if (rand() % 2 == 0) {  // [5] Flip a coin for each item',
                '                arr[writeIdx++] = arr[i];  // [6] This item survives the snap',
                '            }',
                '        }',
                '',
                '        *n = writeIdx > 0 ? writeIdx : 1;  // [6] Keep the survivors',
                '    }',
                '',
                '    return arr;  // [7] Return whatever survived',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'int isSorted(int *arr, int n) {',
                '',
                '    for (int i = 0; i < n - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return 0;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return 1;  // [12] All pairs are in order',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using thanos sort',
                'int[] ThanosSort(int[] arr) {',
                '',
                '    while (!IsSorted(arr) && arr.Length > 1) {  // [2] Keep going until sorted or one item left',
                '',
                '        int half = arr.Length / 2;  // [3] Find the halfway point',
                '',
                '        var survivors = new System.Collections.Generic.List<int>();  // [4] Make a list for survivors',
                '        foreach (int item in arr) {  // [5] Look at each item',
                '            if (new Random().NextDouble() < 0.5) {  // [5] Flip a coin for each item',
                '                survivors.Add(item);  // [6] This item survives the snap',
                '            }',
                '        }',
                '',
                '        arr = survivors.Count > 0 ? survivors.ToArray() : new[] { arr[0] };  // [6] Keep the survivors',
                '    }',
                '',
                '    return arr;  // [7] Return whatever survived',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'bool IsSorted(int[] arr) {',
                '',
                '    for (int i = 0; i < arr.Length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using thanos sort',
                'function thanosSort(arr: number[]): number[] {',
                '',
                '    while (!isSorted(arr) && arr.length > 1) {  // [2] Keep going until sorted or one item left',
                '',
                '        const half: number = Math.floor(arr.length / 2);  // [3] Find the halfway point',
                '',
                '        const survivors: number[] = [];  // [4] Make a list for survivors',
                '        for (const item of arr) {  // [5] Look at each item',
                '            if (Math.random() < 0.5) {  // [5] Flip a coin for each item',
                '                survivors.push(item);  // [6] This item survives the snap',
                '            }',
                '        }',
                '',
                '        arr = survivors.length > 0 ? survivors : [arr[0]];  // [6] Keep the survivors',
                '    }',
                '',
                '    return arr;  // [7] Return whatever survived',
                '}',
                '',
                '// Step 8: Check if the array is sorted from small to big',
                'function isSorted(arr: number[]): boolean {',
                '',
                '    for (let i: number = 0; i < arr.length - 1; i++) {  // [9] Look at each pair of neighbors',
                '        if (arr[i] > arr[i + 1]) {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The array is not sorted',
                '        }',
                '    }',
                '',
                '    return true;  // [12] All pairs are in order',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using thanos sort',
                'func thanosSort(arr []int) []int {',
                '',
                '    for !isSorted(arr) && len(arr) > 1 {  // [2] Keep going until sorted or one item left',
                '',
                '        _ = len(arr) / 2  // [3] Find the halfway point',
                '',
                '        survivors := []int{}  // [4] Make a slice for survivors',
                '        for _, item := range arr {  // [5] Look at each item',
                '            if rand.Float64() < 0.5 {  // [5] Flip a coin for each item',
                '                survivors = append(survivors, item)  // [6] This item survives the snap',
                '            }',
                '        }',
                '',
                '        if len(survivors) == 0 { survivors = []int{arr[0]} }',
                '        arr = survivors  // [6] Keep the survivors',
                '    }',
                '',
                '    return arr  // [7] Return whatever survived',
                '}',
                '',
                '// Step 8: Check if the slice is sorted from small to big',
                'func isSorted(arr []int) bool {',
                '',
                '    for i := 0; i < len(arr)-1; i++ {  // [9] Look at each pair of neighbors',
                '        if arr[i] > arr[i+1] {  // [10] If the left one is bigger than the right one',
                '            return false  // [11] The slice is not sorted',
                '        }',
                '    }',
                '',
                '    return true  // [12] All pairs are in order',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using thanos sort',
                'fn thanos_sort(arr: &mut Vec<i32>) {',
                '',
                '    while !is_sorted(arr) && arr.len() > 1 {  // [2] Keep going until sorted or one item left',
                '',
                '        let _half: usize = arr.len() / 2;  // [3] Find the halfway point',
                '',
                '        let survivors: Vec<i32> = arr  // [4] Make a list for survivors',
                '            .iter().filter(|_| rand::random::<bool>())  // [5] Flip a coin for each item',
                '            .copied().collect();  // [6] Collect the surviving items',
                '',
                '        *arr = if survivors.is_empty() { vec![arr[0]] } else { survivors };  // [6] Keep the survivors',
                '    }',
                '}',
                '',
                '// Step 8: Check if the vector is sorted from small to big',
                'fn is_sorted(arr: &Vec<i32>) -> bool {',
                '',
                '    for i in 0..arr.len() - 1 {  // [9] Look at each pair of neighbors',
                '        if arr[i] > arr[i + 1] {  // [10] If the left one is bigger than the right one',
                '            return false;  // [11] The vector is not sorted',
                '        }',
                '    }',
                '',
                '    true  // [12] All pairs are in order',
                '}',
            ],
        },

        stalinSort: {
            pseudo: [
                '# Step 1: Start the stalin sort procedure with list A',
                'procedure stalinSort(A):',
                '',
                '    max = A[0]  # [2] The first item is always accepted',
                '    writeIdx = 1  # [3] The next spot to write a surviving item',
                '',
                '    for i = 1 to length(A) - 1:  # [4] Walk through every item after the first',
                '',
                '        if A[i] >= max:  # [5] If this item is big enough to stay',
                '            max = A[i]  # [6] Update the biggest value we have seen',
                '            A[writeIdx] = A[i]  # [7] Write it to the next open spot',
                '            writeIdx = writeIdx + 1  # [8] Move the write spot forward',
                '',
                '    remove items from writeIdx to end  # [9] Chop off the leftover spots at the end',
                '',
                '    return A  # [10] Give back the sorted (but shorter) list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with stalin sort',
                'def stalin_sort(arr: list[int]) -> list[int]:',
                '',
                '    max_val: int = arr[0]  # [2] The first item is always accepted',
                '    write_idx: int = 1  # [3] The next spot to write a surviving item',
                '',
                '    for i in range(1, len(arr)):  # [4] Walk through every item after the first',
                '',
                '        if arr[i] >= max_val:  # [5] If this item is big enough to stay',
                '            max_val = arr[i]  # [6] Update the biggest value we have seen',
                '            arr[write_idx] = arr[i]  # [7] Write it to the next open spot',
                '            write_idx += 1  # [8] Move the write spot forward',
                '',
                '    del arr[write_idx:]  # [9] Chop off the leftover spots at the end',
                '',
                '    return arr  # [10] Return the sorted (but shorter) list',
            ],
            java: [
                '// Step 1: Sort the array using stalin sort',
                'int[] stalinSort(int[] arr) {',
                '',
                '    int max = arr[0];  // [2] The first item is always accepted',
                '    int writeIdx = 1;  // [3] The next spot to write a surviving item',
                '',
                '    for (int i = 1; i < arr.length; i++) {  // [4] Walk through every item after the first',
                '',
                '        if (arr[i] >= max) {  // [5] If this item is big enough to stay',
                '            max = arr[i];  // [6] Update the biggest value we have seen',
                '            arr[writeIdx] = arr[i];  // [7] Write it to the next open spot',
                '            writeIdx++;  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    return Arrays.copyOf(arr, writeIdx);  // [9] Return only the surviving items',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using stalin sort',
                'void stalinSort(vector<int>& arr) {',
                '',
                '    int max = arr[0];  // [2] The first item is always accepted',
                '    int writeIdx = 1;  // [3] The next spot to write a surviving item',
                '',
                '    for (int i = 1; i < arr.size(); i++) {  // [4] Walk through every item after the first',
                '',
                '        if (arr[i] >= max) {  // [5] If this item is big enough to stay',
                '            max = arr[i];  // [6] Update the biggest value we have seen',
                '            arr[writeIdx] = arr[i];  // [7] Write it to the next open spot',
                '            writeIdx++;  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    arr.resize(writeIdx);  // [9] Chop off the leftover spots at the end',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using stalin sort',
                'function stalinSort(arr) {',
                '',
                '    let max = arr[0];  // [2] The first item is always accepted',
                '    let writeIdx = 1;  // [3] The next spot to write a surviving item',
                '',
                '    for (let i = 1; i < arr.length; i++) {  // [4] Walk through every item after the first',
                '',
                '        if (arr[i] >= max) {  // [5] If this item is big enough to stay',
                '            max = arr[i];  // [6] Update the biggest value we have seen',
                '            arr[writeIdx] = arr[i];  // [7] Write it to the next open spot',
                '            writeIdx++;  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    arr.length = writeIdx;  // [9] Chop off the leftover spots at the end',
                '',
                '    return arr;  // [10] Return the sorted (but shorter) array',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using stalin sort',
                'int stalinSort(int *arr, int n) {',
                '',
                '    int max = arr[0];  // [2] The first item is always accepted',
                '    int writeIdx = 1;  // [3] The next spot to write a surviving item',
                '',
                '    for (int i = 1; i < n; i++) {  // [4] Walk through every item after the first',
                '',
                '        if (arr[i] >= max) {  // [5] If this item is big enough to stay',
                '            max = arr[i];  // [6] Update the biggest value we have seen',
                '            arr[writeIdx] = arr[i];  // [7] Write it to the next open spot',
                '            writeIdx++;  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    return writeIdx;  // [9] Return the new length (caller truncates the array)',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using stalin sort',
                'int[] StalinSort(int[] arr) {',
                '',
                '    int max = arr[0];  // [2] The first item is always accepted',
                '    int writeIdx = 1;  // [3] The next spot to write a surviving item',
                '',
                '    for (int i = 1; i < arr.Length; i++) {  // [4] Walk through every item after the first',
                '',
                '        if (arr[i] >= max) {  // [5] If this item is big enough to stay',
                '            max = arr[i];  // [6] Update the biggest value we have seen',
                '            arr[writeIdx] = arr[i];  // [7] Write it to the next open spot',
                '            writeIdx++;  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    return arr[..writeIdx];  // [9] Return only the surviving items',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using stalin sort',
                'function stalinSort(arr: number[]): number[] {',
                '',
                '    let max: number = arr[0];  // [2] The first item is always accepted',
                '    let writeIdx: number = 1;  // [3] The next spot to write a surviving item',
                '',
                '    for (let i: number = 1; i < arr.length; i++) {  // [4] Walk through every item after the first',
                '',
                '        if (arr[i] >= max) {  // [5] If this item is big enough to stay',
                '            max = arr[i];  // [6] Update the biggest value we have seen',
                '            arr[writeIdx] = arr[i];  // [7] Write it to the next open spot',
                '            writeIdx++;  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    arr.length = writeIdx;  // [9] Chop off the leftover spots at the end',
                '',
                '    return arr;  // [10] Return the sorted (but shorter) array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using stalin sort',
                'func stalinSort(arr []int) []int {',
                '',
                '    max := arr[0]  // [2] The first item is always accepted',
                '    writeIdx := 1  // [3] The next spot to write a surviving item',
                '',
                '    for i := 1; i < len(arr); i++ {  // [4] Walk through every item after the first',
                '',
                '        if arr[i] >= max {  // [5] If this item is big enough to stay',
                '            max = arr[i]  // [6] Update the biggest value we have seen',
                '            arr[writeIdx] = arr[i]  // [7] Write it to the next open spot',
                '            writeIdx++  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    return arr[:writeIdx]  // [9] Return only the surviving items',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using stalin sort',
                'fn stalin_sort(arr: &mut Vec<i32>) {',
                '',
                '    let mut max: i32 = arr[0];  // [2] The first item is always accepted',
                '    let mut write_idx: usize = 1;  // [3] The next spot to write a surviving item',
                '',
                '    for i in 1..arr.len() {  // [4] Walk through every item after the first',
                '',
                '        if arr[i] >= max {  // [5] If this item is big enough to stay',
                '            max = arr[i];  // [6] Update the biggest value we have seen',
                '            arr[write_idx] = arr[i];  // [7] Write it to the next open spot',
                '            write_idx += 1;  // [8] Move the write spot forward',
                '        }',
                '    }',
                '',
                '    arr.truncate(write_idx);  // [9] Chop off the leftover spots at the end',
                '}',
            ],
        },
    };

    // ─── Complexity Info ───

    /** @type {Object.<string, {name: string, best: string, average: string, worst: string, space: string, description: string}>} */
    const COMPLEXITY = {
        bubbleSort: {
            name: 'Bubble Sort',
            best: 'O(n)',
            average: 'O(n\u00B2)',
            worst: 'O(n\u00B2)',
            space: 'O(1)',
            description:
                'Look at two neighbors side by side. If the left one is bigger, swap them. ' +
                'Keep doing this from start to end. After each pass, the biggest unsorted number ' +
                '"bubbles up" to its correct spot. Repeat until nothing swaps.',
            useCase:
                'Good for teaching beginners how sorting works. Also useful when the list is ' +
                'already almost sorted (only a few items are out of place), since it finishes ' +
                'early when no swaps are needed. Not a good choice for large lists.',
            avoid:
                'Avoid for medium or large lists. It compares every pair many times, making it ' +
                'one of the slowest sorts. Use Insertion Sort instead for small or nearly sorted data, ' +
                'or Merge/Quick Sort for anything bigger.',
        },
        selectionSort: {
            name: 'Selection Sort',
            best: 'O(n\u00B2)',
            average: 'O(n\u00B2)',
            worst: 'O(n\u00B2)',
            space: 'O(1)',
            description:
                'Scan the whole list to find the smallest number. Put it in the first spot. ' +
                'Now scan the rest to find the next smallest. Put it in the second spot. ' +
                'Keep picking the smallest from what is left until everything is in order.',
            useCase:
                'Works well when memory is very limited, because it only swaps items in place ' +
                'and never needs extra space. Good for small lists. The number of swaps is always ' +
                'low (at most one per pass), which is helpful when writing to memory is expensive.',
            avoid:
                'Avoid for large lists. It always takes the same amount of time even if the list ' +
                'is already sorted. Not stable either, so equal items may get rearranged. ' +
                'Insertion Sort is almost always a better choice for small data.',
        },
        insertionSort: {
            name: 'Insertion Sort',
            best: 'O(n)',
            average: 'O(n\u00B2)',
            worst: 'O(n\u00B2)',
            space: 'O(1)',
            description:
                'Think of sorting cards in your hand. Pick up one card at a time and slide it ' +
                'into the right place among the cards you already hold. Each new card is compared ' +
                'with the sorted cards and inserted where it fits.',
            useCase:
                'The best choice for small lists or lists that are already mostly sorted. ' +
                'Many real-world sorting libraries (like Python\'s Timsort) use Insertion Sort ' +
                'for small chunks. Also great for sorting data as it arrives one piece at a time.',
            avoid:
                'Avoid for large, randomly ordered lists. Each new item may need to shift many ' +
                'others over, making it slow. For big data, Merge Sort or Quick Sort will be ' +
                'much faster.',
        },
        mergeSort: {
            name: 'Merge Sort',
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            space: 'O(n)',
            description:
                'Split the list in half, again and again, until each piece has one item. ' +
                'One item is already sorted. Now merge pieces back together in order: ' +
                'compare the fronts of two pieces, pick the smaller one, repeat. ' +
                'The result is a fully sorted list.',
            useCase:
                'Used when you need a guaranteed fast sort no matter what the input looks like. ' +
                'Great for sorting linked lists (no random access needed). Also the go-to choice ' +
                'when the data is too large to fit in memory and must be sorted in chunks on disk.',
            avoid:
                'Avoid when memory is tight. It needs a full copy of the list as extra space. ' +
                'For small lists, the overhead of splitting and merging is not worth it. ' +
                'Insertion Sort will be faster for lists under about 20 items.',
        },
        quickSort: {
            name: 'Quick Sort',
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n\u00B2)',
            space: 'O(log n)',
            description:
                'Pick one number as the "pivot". Move everything smaller to its left ' +
                'and everything bigger to its right. Now the pivot is in the right spot. ' +
                'Do the same thing for the left group and the right group. ' +
                'Keep going until every number is in place.',
            useCase:
                'The fastest general-purpose sort in practice. Used by most programming languages ' +
                'as their default sort (C, Java for primitives). Works best when data fits in memory. ' +
                'Avoid when the list is already sorted (worst case), or use a random pivot to prevent it.',
            avoid:
                'Avoid when the list is already sorted or nearly sorted (hits worst case O(n^2)). ' +
                'Not stable, so equal items may swap order. Also avoid when you need guaranteed ' +
                'speed. Use Merge Sort instead if worst-case performance matters.',
        },
        countingSort: {
            name: 'Counting Sort',
            best: 'O(n + k)',
            average: 'O(n + k)',
            worst: 'O(n + k)',
            space: 'O(k)',
            description:
                'Find the biggest number in the list (call it k). Make a count array of size k + 1, ' +
                'all zeros. Go through the list and count how many times each value appears. ' +
                'Then walk through the count array and write each value back into the list ' +
                'the right number of times. The list is now sorted.',
            useCase:
                'Best when the numbers are small non-negative integers and the range (k) is not ' +
                'much bigger than the number of items (n). Runs in linear time, which is faster ' +
                'than any comparison-based sort. Great for sorting grades, ages, or pixel values.',
            avoid:
                'Avoid when the range of values is very large compared to the number of items, ' +
                'because the count array wastes memory. Not suitable for negative numbers or ' +
                'floating-point values without extra work. Also not a stable sort in this simple form.',
        },
        heapSort: {
            name: 'Heap Sort',
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            space: 'O(1)',
            description:
                'Turn the list into a "max heap", a tree shape where every parent is bigger than ' +
                'its children. The biggest item is always at the top. Swap it to the end of the list, ' +
                'shrink the heap by one, and fix the tree. Repeat until every item has been pulled out in order.',
            useCase:
                'Use when you need guaranteed O(n log n) time and cannot afford extra memory. ' +
                'Unlike Merge Sort, it sorts in place with O(1) extra space. Good for embedded systems ' +
                'or any situation where memory is limited and worst-case speed matters.',
            avoid:
                'Avoid when you need a stable sort (equal items may get rearranged). Also slower in ' +
                'practice than Quick Sort due to poor cache behavior, since it jumps around the array. ' +
                'For most general-purpose sorting, Quick Sort or Merge Sort will be faster.',
        },
        gnomeSort: {
            name: 'Gnome Sort',
            best: 'O(n)',
            average: 'O(n\u00B2)',
            worst: 'O(n\u00B2)',
            space: 'O(1)',
            description:
                'Start at the beginning of the list. If the current item is bigger than or equal to the ' +
                'one before it, move forward. If it is smaller, swap them and move backward. Keep going ' +
                'until you reach the end. It is like a garden gnome sorting flower pots by moving them one at a time.',
            useCase:
                'Good for learning how sorting works because the logic is very simple. Works well on lists ' +
                'that are already almost sorted, since the gnome barely needs to move backward. Easy to ' +
                'implement with very little code.',
            avoid:
                'Avoid for large or randomly ordered lists. It moves backward one step at a time, which is ' +
                'slow. Insertion Sort does the same job but faster because it shifts items instead of swapping. ' +
                'Use Merge Sort or Quick Sort for big data.',
        },
        cocktailShakerSort: {
            name: 'Cocktail Shaker Sort',
            best: 'O(n)',
            average: 'O(n\u00B2)',
            worst: 'O(n\u00B2)',
            space: 'O(1)',
            description:
                'Like Bubble Sort, but instead of only going left to right, it alternates direction. ' +
                'First pass goes left to right, bubbling the biggest item to the end. Next pass goes ' +
                'right to left, bubbling the smallest item to the front. Repeat until no swaps happen.',
            useCase:
                'Slightly better than Bubble Sort when small items are stuck near the end of the list ' +
                '(the "turtle" problem). Good for teaching how bidirectional passes can improve a simple sort. ' +
                'Works well on nearly sorted lists.',
            avoid:
                'Avoid for medium or large lists. It is still O(n^2) and not much faster than Bubble Sort ' +
                'in practice. Use Insertion Sort for small or nearly sorted data, or Merge Sort and Quick Sort ' +
                'for anything bigger.',
        },
        pancakeSort: {
            name: 'Pancake Sort',
            best: 'O(n)',
            average: 'O(n\u00B2)',
            worst: 'O(n\u00B2)',
            space: 'O(1)',
            description:
                'Imagine a stack of pancakes you can only sort by flipping the top part of the stack. ' +
                'Find the biggest unsorted pancake, flip the stack to bring it to the top, then flip again ' +
                'to put it at the bottom of the unsorted part. Repeat for the next biggest, and so on.',
            useCase:
                'Mainly used as a fun puzzle and teaching tool. Useful when the only operation you can do ' +
                'is reversing a section from the start. It shows how sorting can work with very limited operations. ' +
                'Not used in real-world applications.',
            avoid:
                'Avoid for any practical sorting task. It is slow and does many unnecessary swaps compared to ' +
                'other algorithms. Use Insertion Sort for small lists or Merge Sort and Quick Sort for larger ones. ' +
                'It is best kept as a puzzle, not a tool.',
        },
        shellSort: {
            name: 'Shell Sort',
            best: 'O(n log n)',
            average: 'O(n^(4/3))',
            worst: 'O(n^(3/2))',
            space: 'O(1)',
            description:
                'An improved version of Insertion Sort. Instead of comparing neighbors, compare items ' +
                'that are far apart. Start with a big gap and keep making it smaller. Each pass partially ' +
                'sorts the list so that the final pass (gap = 1, regular Insertion Sort) has very little work to do.',
            useCase:
                'A good middle-ground sort that is easy to implement and faster than basic O(n^2) sorts. ' +
                'Works well for medium-sized lists and when you want something simple that beats Insertion Sort ' +
                'without the complexity of Merge Sort or Quick Sort.',
            avoid:
                'Avoid for very large datasets where O(n log n) algorithms like Merge Sort or Quick Sort ' +
                'will be noticeably faster. The exact speed depends on the gap sequence chosen, which can be ' +
                'tricky to tune. Not stable, so equal items may get rearranged.',
        },
        bogoSort: {
            name: 'Bogo Sort',
            best: 'O(n)',
            average: 'O(n \u00D7 n!)',
            worst: 'O(\u221E)',
            space: 'O(1)',
            description:
                'Randomly shuffle the entire list, then check if it happens to be sorted. ' +
                'If not, shuffle again. Keep shuffling and checking until you get lucky or give up. ' +
                'It is the monkey-with-a-typewriter approach to sorting.',
            useCase:
                'Never use this for real work. It exists purely as a joke and a teaching tool to show ' +
                'why random guessing is a terrible strategy. Great for making computer science students laugh ' +
                'and appreciate how clever real sorting algorithms are.',
            avoid:
                'Avoid for literally everything. Even a list of 10 items could take millions of shuffles. ' +
                'The expected time grows faster than exponentially. If you use this in production, ' +
                'your code reviewer will cry. We cap it at 1000 tries so your browser does not freeze.',
        },
        thanosSort: {
            name: 'Thanos Sort',
            best: 'O(n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            space: 'O(n)',
            description:
                'Check if the list is sorted. If not, randomly eliminate about half the elements ' +
                '(the "snap"). Check again. Keep snapping until what remains is sorted or only one ' +
                'element is left. Perfectly balanced, as all things should be.',
            useCase:
                'Use when you do not care about keeping all your data and just want the survivors to be in order. ' +
                'Great for parties, memes, and making your colleagues question your sanity. ' +
                'Also a fun way to teach that "sorting" by deleting data is cheating.',
            avoid:
                'Avoid when you actually need all your data to survive. This algorithm solves the sorting problem ' +
                'by making the problem smaller, not by doing real work. Half your data disappears each round. ' +
                'If your boss asks why the database is empty, do not blame Thanos.',
        },
        stalinSort: {
            name: 'Stalin Sort',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Walk through the list once. The first element always stays. For every element after that, ' +
                'if it is smaller than the previous kept element, remove it. What remains is sorted. ' +
                'Elements that do not conform are sent to the gulag.',
            useCase:
                'Use when speed matters more than accuracy and you are fine losing data. ' +
                'It always runs in O(n) time, which is faster than any real sorting algorithm. ' +
                'Perfect for when you want to impress someone with Big-O notation while horrifying them with the output.',
            avoid:
                'Avoid when you need all your data to survive the sorting process. This is not really sorting, ' +
                'it is filtering with extra propaganda. The output is sorted but incomplete. ' +
                'Use a real algorithm like Merge Sort or Quick Sort if you value your data.',
        },
    };

    // ─── Generator Functions ───

    /**
     * Bubble Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* bubbleSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                yield { type: 'compare', indices: [j, j + 1], codeLine: 5 };
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapped = true;
                    yield { type: 'swap', indices: [j, j + 1], codeLine: 6 };
                }
            }
            yield { type: 'sorted', indices: [n - i - 1], codeLine: 8 };
            if (!swapped) break;
        }
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 10 };
        }
    }

    /**
     * Selection Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* selectionSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                yield { type: 'compare', indices: [minIdx, j], codeLine: 5 };
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                yield { type: 'swap', indices: [i, minIdx], codeLine: 8 };
            }
            yield { type: 'sorted', indices: [i], codeLine: 8 };
        }
    }

    /**
     * Insertion Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* insertionSort(arr) {
        const n = arr.length;
        yield { type: 'sorted', indices: [0], codeLine: 2 };
        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;
            yield { type: 'compare', indices: [i], codeLine: 3 };
            while (j >= 0 && arr[j] > key) {
                yield { type: 'compare', indices: [j, j + 1], codeLine: 5 };
                arr[j + 1] = arr[j];
                yield { type: 'overwrite', indices: [j + 1], codeLine: 6 };
                j--;
            }
            arr[j + 1] = key;
            yield { type: 'overwrite', indices: [j + 1], codeLine: 8 };
            for (let k = 0; k <= i; k++) {
                yield { type: 'sorted', indices: [k], codeLine: 8 };
            }
        }
    }

    /**
     * Merge Sort generator (iterative step tracking for visualization).
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* mergeSort(arr) {
        yield* mergeSortHelper(arr, 0, arr.length - 1);
        for (let i = 0; i < arr.length; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 0 };
        }
    }

    /**
     * Recursive merge sort helper.
     *
     * @param {number[]} arr - The array to sort.
     * @param {number} left - Left bound index.
     * @param {number} right - Right bound index.
     * @yields {object} Step objects.
     */
    function* mergeSortHelper(arr, left, right) {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        yield* mergeSortHelper(arr, left, mid);
        yield* mergeSortHelper(arr, mid + 1, right);
        yield* merge(arr, left, mid, right);
    }

    /**
     * Merge procedure for merge sort.
     *
     * @param {number[]} arr - The array.
     * @param {number} left - Left bound.
     * @param {number} mid - Midpoint.
     * @param {number} right - Right bound.
     * @yields {object} Step objects.
     */
    function* merge(arr, left, mid, right) {
        const L = arr.slice(left, mid + 1);
        const R = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        while (i < L.length && j < R.length) {
            yield { type: 'compare', indices: [left + i, mid + 1 + j], codeLine: 13 };
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
                yield { type: 'overwrite', indices: [k], codeLine: 15 };
            } else {
                arr[k] = R[j];
                j++;
                yield { type: 'overwrite', indices: [k], codeLine: 17 };
            }
            k++;
        }
        while (i < L.length) {
            arr[k] = L[i];
            yield { type: 'overwrite', indices: [k], codeLine: 19 };
            i++;
            k++;
        }
        while (j < R.length) {
            arr[k] = R[j];
            yield { type: 'overwrite', indices: [k], codeLine: 20 };
            j++;
            k++;
        }
    }

    /**
     * Quick Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* quickSort(arr) {
        yield* quickSortHelper(arr, 0, arr.length - 1);
        for (let i = 0; i < arr.length; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 0 };
        }
    }

    /**
     * Recursive quick sort helper.
     *
     * @param {number[]} arr - The array.
     * @param {number} low - Low bound.
     * @param {number} high - High bound.
     * @yields {object} Step objects.
     */
    function* quickSortHelper(arr, low, high) {
        if (low < high) {
            const pivotIdx = yield* partition(arr, low, high);
            yield { type: 'sorted', indices: [pivotIdx], codeLine: 2 };
            yield* quickSortHelper(arr, low, pivotIdx - 1);
            yield* quickSortHelper(arr, pivotIdx + 1, high);
        } else if (low === high) {
            yield { type: 'sorted', indices: [low], codeLine: 0 };
        }
    }

    /**
     * Partition procedure for quick sort.
     *
     * @param {number[]} arr - The array.
     * @param {number} low - Low bound.
     * @param {number} high - High bound (pivot).
     * @yields {object} Step objects.
     * @returns {number} The final pivot index.
     */
    function* partition(arr, low, high) {
        yield { type: 'pivot', indices: [high], codeLine: 7 };
        let i = low - 1;
        for (let j = low; j < high; j++) {
            yield { type: 'compare', indices: [j, high], codeLine: 10 };
            if (arr[j] <= arr[high]) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                yield { type: 'swap', indices: [i, j], codeLine: 12 };
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        yield { type: 'swap', indices: [i + 1, high], codeLine: 13 };
        return i + 1;
    }

    /**
     * Counting Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* countingSort(arr) {
        const n = arr.length;

        // Find max value
        let max = arr[0];
        for (let i = 1; i < n; i++) {
            yield { type: 'compare', indices: [i], codeLine: 2 };
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        // Create count array
        const count = new Array(max + 1).fill(0);

        // Count occurrences
        for (let i = 0; i < n; i++) {
            count[arr[i]]++;
            yield { type: 'compare', indices: [i], codeLine: 5 };
        }

        // Rebuild array from counts
        let idx = 0;
        for (let val = 0; val <= max; val++) {
            while (count[val] > 0) {
                arr[idx] = val;
                yield { type: 'overwrite', indices: [idx], codeLine: 9 };
                idx++;
                count[val]--;
            }
        }

        // Mark all as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 12 };
        }
    }

    /**
     * Heap Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* heapSort(arr) {
        const n = arr.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            yield* heapify(arr, n, i);
        }

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            yield { type: 'compare', indices: [0, i], codeLine: 5 };
            [arr[0], arr[i]] = [arr[i], arr[0]];
            yield { type: 'swap', indices: [0, i], codeLine: 6 };
            yield { type: 'sorted', indices: [i], codeLine: 6 };
            yield* heapify(arr, i, 0);
        }

        // Mark all as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 8 };
        }
    }

    /**
     * Heapify helper for heap sort.
     *
     * @param {number[]} arr - The array.
     * @param {number} size - The heap size.
     * @param {number} i - The root index of the subtree.
     * @yields {object} Step objects.
     */
    function* heapify(arr, size, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < size) {
            yield { type: 'compare', indices: [left, largest], codeLine: 12 };
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }
        if (right < size) {
            yield { type: 'compare', indices: [right, largest], codeLine: 14 };
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            yield { type: 'swap', indices: [i, largest], codeLine: 17 };
            yield* heapify(arr, size, largest);
        }
    }

    /**
     * Shell Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* shellSort(arr) {
        const n = arr.length;

        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                const temp = arr[i];
                let j = i;

                while (j >= gap) {
                    yield { type: 'compare', indices: [j, j - gap], codeLine: 8 };
                    if (arr[j - gap] > temp) {
                        arr[j] = arr[j - gap];
                        yield { type: 'overwrite', indices: [j], codeLine: 9 };
                        j -= gap;
                    } else {
                        break;
                    }
                }

                arr[j] = temp;
                yield { type: 'overwrite', indices: [j], codeLine: 11 };
            }
        }

        // Mark all as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 13 };
        }
    }

    /**
     * Gnome Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* gnomeSort(arr) {
        const n = arr.length;
        let i = 0;

        while (i < n) {
            if (i === 0 || arr[i] >= arr[i - 1]) {
                yield { type: 'compare', indices: i > 0 ? [i, i - 1] : [i], codeLine: 5 };
                i++;
            } else {
                yield { type: 'compare', indices: [i, i - 1], codeLine: 5 };
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                yield { type: 'swap', indices: [i, i - 1], codeLine: 8 };
                i--;
            }
        }

        // Mark all as sorted
        for (let k = 0; k < n; k++) {
            yield { type: 'sorted', indices: [k], codeLine: 10 };
        }
    }

    /**
     * Cocktail Shaker Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* cocktailShakerSort(arr) {
        const n = arr.length;
        let start = 0;
        let end = n - 1;
        let swapped = true;

        while (swapped) {
            swapped = false;

            // Left to right pass
            for (let i = start; i < end; i++) {
                yield { type: 'compare', indices: [i, i + 1], codeLine: 9 };
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swapped = true;
                    yield { type: 'swap', indices: [i, i + 1], codeLine: 10 };
                }
            }
            yield { type: 'sorted', indices: [end], codeLine: 12 };
            end--;

            if (!swapped) break;

            // Right to left pass
            for (let i = end - 1; i >= start; i--) {
                yield { type: 'compare', indices: [i, i + 1], codeLine: 14 };
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    swapped = true;
                    yield { type: 'swap', indices: [i, i + 1], codeLine: 15 };
                }
            }
            yield { type: 'sorted', indices: [start], codeLine: 17 };
            start++;
        }

        // Mark all as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 18 };
        }
    }

    /**
     * Flip helper for pancake sort - reverses arr from index i to index j.
     *
     * @param {number[]} arr - The array.
     * @param {number} i - Start index.
     * @param {number} j - End index.
     * @yields {object} Step objects.
     */
    function* pancakeFlip(arr, i, j) {
        while (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            yield { type: 'swap', indices: [i, j], codeLine: 12 };
            i++;
            j--;
        }
    }

    /**
     * Pancake Sort generator.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* pancakeSort(arr) {
        const n = arr.length;

        for (let size = n; size > 1; size--) {
            // Find index of maximum in arr[0..size-1]
            let maxIdx = 0;
            for (let i = 1; i < size; i++) {
                yield { type: 'compare', indices: [i, maxIdx], codeLine: 4 };
                if (arr[i] > arr[maxIdx]) {
                    maxIdx = i;
                }
            }

            if (maxIdx !== size - 1) {
                // Flip to bring max to front
                if (maxIdx !== 0) {
                    yield* pancakeFlip(arr, 0, maxIdx);
                }
                // Flip to put max at its correct position
                yield* pancakeFlip(arr, 0, size - 1);
            }

            yield { type: 'sorted', indices: [size - 1], codeLine: 8 };
        }

        // Mark all as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 9 };
        }
    }

    /**
     * Bogo Sort generator.
     *
     * Shuffles the array randomly and checks if sorted. Repeats up to 1000 times.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* bogoSort(arr) {
        const n = arr.length;
        const maxTries = 1000;

        for (let attempt = 0; attempt < maxTries; attempt++) {
            // Check if sorted
            let sorted = true;
            for (let i = 0; i < n - 1; i++) {
                yield { type: 'compare', indices: [i, i + 1], codeLine: 9 };
                if (arr[i] > arr[i + 1]) {
                    sorted = false;
                    break;
                }
            }

            if (sorted) {
                // Mark all as sorted
                for (let i = 0; i < n; i++) {
                    yield { type: 'sorted', indices: [i], codeLine: 5 };
                }
                return;
            }

            // Fisher-Yates shuffle
            for (let i = n - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
                yield { type: 'swap', indices: [i, j], codeLine: 6 };
            }
        }

        // Ran out of attempts, mark whatever we have
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 7 };
        }
    }

    /**
     * Thanos Sort generator.
     *
     * Checks if sorted; if not, randomly eliminates about half the elements. Repeats.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* thanosSort(arr) {
        let n = arr.length;

        while (n > 1) {
            // Check if sorted
            let sorted = true;
            for (let i = 0; i < n - 1; i++) {
                yield { type: 'compare', indices: [i, i + 1], codeLine: 9 };
                if (arr[i] > arr[i + 1]) {
                    sorted = false;
                    break;
                }
            }

            if (sorted) break;

            // The snap: randomly decide which elements survive
            const survive = [];
            for (let i = 0; i < n; i++) {
                if (Math.random() < 0.5) {
                    survive.push(i);
                }
            }

            // Ensure at least one survives
            if (survive.length === 0) {
                survive.push(Math.floor(Math.random() * n));
            }

            // Show eliminated elements
            const surviveSet = new Set(survive);
            for (let i = 0; i < n; i++) {
                if (!surviveSet.has(i)) {
                    yield { type: 'compare', indices: [i], codeLine: 5 };
                }
            }

            // Compact survivors to the front
            let writeIdx = 0;
            for (const idx of survive) {
                if (writeIdx !== idx) {
                    arr[writeIdx] = arr[idx];
                    yield { type: 'overwrite', indices: [writeIdx], codeLine: 6 };
                }
                writeIdx++;
            }

            // Clear the eliminated slots visually
            for (let i = writeIdx; i < n; i++) {
                arr[i] = 0;
                yield { type: 'overwrite', indices: [i], codeLine: 6 };
            }

            n = writeIdx;
        }

        // Trim the array to surviving length
        arr.length = n;

        // Mark all as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 7 };
        }
    }

    /**
     * Stalin Sort generator.
     *
     * Walks through the array once. Any element smaller than the previous kept
     * element is removed. What remains is sorted.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {object} Step object with type, indices, and codeLine.
     */
    function* stalinSort(arr) {
        const n = arr.length;
        if (n === 0) return;

        let maxVal = arr[0];
        let writeIdx = 1;

        yield { type: 'sorted', indices: [0], codeLine: 2 };

        for (let i = 1; i < n; i++) {
            yield { type: 'compare', indices: [i, writeIdx - 1], codeLine: 5 };

            if (arr[i] >= maxVal) {
                // This element survives
                maxVal = arr[i];
                arr[writeIdx] = arr[i];
                if (writeIdx !== i) {
                    yield { type: 'overwrite', indices: [writeIdx], codeLine: 7 };
                }
                yield { type: 'sorted', indices: [writeIdx], codeLine: 7 };
                writeIdx++;
            } else {
                // This element is eliminated
                yield { type: 'compare', indices: [i], codeLine: 5 };
            }
        }

        // Clear the eliminated slots
        for (let i = writeIdx; i < n; i++) {
            arr[i] = 0;
            yield { type: 'overwrite', indices: [i], codeLine: 9 };
        }

        // Trim the array
        arr.length = writeIdx;
    }

    return { CODE, COMPLEXITY, bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, countingSort, heapSort, shellSort, gnomeSort, cocktailShakerSort, pancakeSort, bogoSort, thanosSort, stalinSort };
})();

export default SortingAlgorithms;
