/**
 * Extended sorting algorithm generators and metadata.
 *
 * Includes gnomeSort, cocktailShakerSort, pancakeSort, combSort, oddEvenSort,
 * radixSort, bucketSort, and timSort.
 *
 * Each generator yields step objects:
 * { type: 'compare'|'swap'|'overwrite'|'sorted', indices: number[], codeLine: object }
 */

// ─── Code Snippets (per language) ───

const CODE = {
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

        combSort: {
            pseudo: [
                '# Step 1: Start the comb sort procedure with list A',
                'procedure combSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '    gap = n  # [3] Start with a gap equal to the full length',
                '    shrink = 1.3  # [4] The shrink factor reduces the gap each pass',
                '    sorted = false  # [5] Assume the list is not yet sorted',
                '',
                '    while not sorted:  # [6] Keep going until no swaps occur with gap 1',
                '        gap = floor(gap / shrink)  # [7] Shrink the gap for this pass',
                '        if gap <= 1:  # [8] Ensure gap is at least 1',
                '            gap = 1  # [8] Minimum gap is 1 (acts like bubble sort)',
                '            sorted = true  # [9] Assume sorted unless we swap',
                '',
                '        for i = 0 to n - gap - 1:  # [10] Compare elements gap apart',
                '            if A[i] > A[i + gap]:  # [11] If left element is larger',
                '                swap A[i] and A[i + gap]  # [12] Swap them',
                '                sorted = false  # [13] A swap occurred, not sorted yet',
                '',
                '    return A  # [14] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with comb sort',
                'def comb_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '    gap: int = n  # [3] Start with a gap equal to the full length',
                '    shrink: float = 1.3  # [4] The shrink factor reduces the gap each pass',
                '    sorted_flag: bool = False  # [5] Assume the list is not yet sorted',
                '',
                '    while not sorted_flag:  # [6] Keep going until no swaps occur with gap 1',
                '        gap = int(gap / shrink)  # [7] Shrink the gap for this pass',
                '        if gap <= 1:  # [8] Ensure gap is at least 1',
                '            gap = 1  # [8] Minimum gap is 1',
                '            sorted_flag = True  # [9] Assume sorted unless we swap',
                '',
                '        for i in range(n - gap):  # [10] Compare elements gap apart',
                '            if arr[i] > arr[i + gap]:  # [11] If left element is larger',
                '                arr[i], arr[i + gap] = arr[i + gap], arr[i]  # [12] Swap them',
                '                sorted_flag = False  # [13] A swap occurred, not sorted yet',
                '',
                '    return arr  # [14] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using comb sort',
                'void combSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '    int gap = n;  // [3] Start with a gap equal to the full length',
                '    double shrink = 1.3;  // [4] The shrink factor reduces the gap each pass',
                '    boolean sorted = false;  // [5] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = (int)(gap / shrink);  // [7] Shrink the gap for this pass',
                '        if (gap <= 1) {  // [8] Ensure gap is at least 1',
                '            gap = 1;  // [8] Minimum gap is 1',
                '            sorted = true;  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for (int i = 0; i < n - gap; i++) {  // [10] Compare elements gap apart',
                '            if (arr[i] > arr[i + gap]) {  // [11] If left element is larger',
                '                int temp = arr[i];  // [12] Swap them',
                '                arr[i] = arr[i + gap];',
                '                arr[i + gap] = temp;',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using comb sort',
                'void combSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '    int gap = n;  // [3] Start with a gap equal to the full length',
                '    double shrink = 1.3;  // [4] The shrink factor reduces the gap each pass',
                '    bool sorted = false;  // [5] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = (int)(gap / shrink);  // [7] Shrink the gap for this pass',
                '        if (gap <= 1) {  // [8] Ensure gap is at least 1',
                '            gap = 1;  // [8] Minimum gap is 1',
                '            sorted = true;  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for (int i = 0; i < n - gap; i++) {  // [10] Compare elements gap apart',
                '            if (arr[i] > arr[i + gap]) {  // [11] If left element is larger',
                '                swap(arr[i], arr[i + gap]);  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using comb sort',
                'void combSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '    int gap = n;  // [3] Start with a gap equal to the full length',
                '    double shrink = 1.3;  // [4] The shrink factor reduces the gap each pass',
                '    int sorted = 0;  // [5] Assume the array is not yet sorted (0 = false)',
                '',
                '    while (!sorted) {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = (int)(gap / shrink);  // [7] Shrink the gap for this pass',
                '        if (gap <= 1) {  // [8] Ensure gap is at least 1',
                '            gap = 1;  // [8] Minimum gap is 1',
                '            sorted = 1;  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for (int i = 0; i < n - gap; i++) {  // [10] Compare elements gap apart',
                '            if (arr[i] > arr[i + gap]) {  // [11] If left element is larger',
                '                int temp = arr[i];  // [12] Swap them',
                '                arr[i] = arr[i + gap];',
                '                arr[i + gap] = temp;',
                '                sorted = 0;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using comb sort',
                'void CombSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '    int gap = n;  // [3] Start with a gap equal to the full length',
                '    double shrink = 1.3;  // [4] The shrink factor reduces the gap each pass',
                '    bool sorted = false;  // [5] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = (int)(gap / shrink);  // [7] Shrink the gap for this pass',
                '        if (gap <= 1) {  // [8] Ensure gap is at least 1',
                '            gap = 1;  // [8] Minimum gap is 1',
                '            sorted = true;  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for (int i = 0; i < n - gap; i++) {  // [10] Compare elements gap apart',
                '            if (arr[i] > arr[i + gap]) {  // [11] If left element is larger',
                '                (arr[i], arr[i + gap]) = (arr[i + gap], arr[i]);  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using comb sort',
                'function combSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '    let gap = n;  // [3] Start with a gap equal to the full length',
                '    const shrink = 1.3;  // [4] The shrink factor reduces the gap each pass',
                '    let sorted = false;  // [5] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = Math.floor(gap / shrink);  // [7] Shrink the gap for this pass',
                '        if (gap <= 1) {  // [8] Ensure gap is at least 1',
                '            gap = 1;  // [8] Minimum gap is 1',
                '            sorted = true;  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for (let i = 0; i < n - gap; i++) {  // [10] Compare elements gap apart',
                '            if (arr[i] > arr[i + gap]) {  // [11] If left element is larger',
                '                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr;  // [14] Return the sorted array',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using comb sort',
                'function combSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '    let gap: number = n;  // [3] Start with a gap equal to the full length',
                '    const shrink: number = 1.3;  // [4] The shrink factor reduces the gap each pass',
                '    let sorted: boolean = false;  // [5] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = Math.floor(gap / shrink);  // [7] Shrink the gap for this pass',
                '        if (gap <= 1) {  // [8] Ensure gap is at least 1',
                '            gap = 1;  // [8] Minimum gap is 1',
                '            sorted = true;  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for (let i: number = 0; i < n - gap; i++) {  // [10] Compare elements gap apart',
                '            if (arr[i] > arr[i + gap]) {  // [11] If left element is larger',
                '                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr;  // [14] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using comb sort',
                'func combSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '    gap := n  // [3] Start with a gap equal to the full length',
                '    shrink := 1.3  // [4] The shrink factor reduces the gap each pass',
                '    sorted := false  // [5] Assume the slice is not yet sorted',
                '',
                '    for !sorted {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = int(float64(gap) / shrink)  // [7] Shrink the gap for this pass',
                '        if gap <= 1 {  // [8] Ensure gap is at least 1',
                '            gap = 1  // [8] Minimum gap is 1',
                '            sorted = true  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for i := 0; i < n-gap; i++ {  // [10] Compare elements gap apart',
                '            if arr[i] > arr[i+gap] {  // [11] If left element is larger',
                '                arr[i], arr[i+gap] = arr[i+gap], arr[i]  // [12] Swap them',
                '                sorted = false  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr  // [14] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using comb sort',
                'fn comb_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '    let mut gap: usize = n;  // [3] Start with a gap equal to the full length',
                '    let shrink: f64 = 1.3;  // [4] The shrink factor reduces the gap each pass',
                '    let mut sorted: bool = false;  // [5] Assume the vector is not yet sorted',
                '',
                '    while !sorted {  // [6] Keep going until no swaps occur with gap 1',
                '        gap = (gap as f64 / shrink) as usize;  // [7] Shrink the gap for this pass',
                '        if gap <= 1 {  // [8] Ensure gap is at least 1',
                '            gap = 1;  // [8] Minimum gap is 1',
                '            sorted = true;  // [9] Assume sorted unless we swap',
                '        }',
                '',
                '        for i in 0..n - gap {  // [10] Compare elements gap apart',
                '            if arr[i] > arr[i + gap] {  // [11] If left element is larger',
                '                arr.swap(i, i + gap);  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
        },


        oddEvenSort: {
            pseudo: [
                '# Step 1: Start the odd-even sort procedure with list A',
                'procedure oddEvenSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '    sorted = false  # [3] Assume the list is not yet sorted',
                '',
                '    while not sorted:  # [4] Keep going until a full pass has no swaps',
                '        sorted = true  # [5] Assume sorted until a swap occurs',
                '',
                '        for i = 1 to n - 2 step 2:  # [6] Odd phase: compare pairs at (1,2), (3,4), ...',
                '            if A[i] > A[i + 1]:  # [7] If left element is larger',
                '                swap A[i] and A[i + 1]  # [8] Swap them',
                '                sorted = false  # [9] A swap occurred, not sorted yet',
                '',
                '        for i = 0 to n - 2 step 2:  # [10] Even phase: compare pairs at (0,1), (2,3), ...',
                '            if A[i] > A[i + 1]:  # [11] If left element is larger',
                '                swap A[i] and A[i + 1]  # [12] Swap them',
                '                sorted = false  # [13] A swap occurred, not sorted yet',
                '',
                '    return A  # [14] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with odd-even sort',
                'def odd_even_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '    sorted_flag: bool = False  # [3] Assume the list is not yet sorted',
                '',
                '    while not sorted_flag:  # [4] Keep going until a full pass has no swaps',
                '        sorted_flag = True  # [5] Assume sorted until a swap occurs',
                '',
                '        for i in range(1, n - 1, 2):  # [6] Odd phase: compare pairs at odd indices',
                '            if arr[i] > arr[i + 1]:  # [7] If left element is larger',
                '                arr[i], arr[i + 1] = arr[i + 1], arr[i]  # [8] Swap them',
                '                sorted_flag = False  # [9] A swap occurred, not sorted yet',
                '',
                '        for i in range(0, n - 1, 2):  # [10] Even phase: compare pairs at even indices',
                '            if arr[i] > arr[i + 1]:  # [11] If left element is larger',
                '                arr[i], arr[i + 1] = arr[i + 1], arr[i]  # [12] Swap them',
                '                sorted_flag = False  # [13] A swap occurred, not sorted yet',
                '',
                '    return arr  # [14] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using odd-even sort',
                'void oddEvenSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '    boolean sorted = false;  // [3] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [4] Keep going until a full pass has no swaps',
                '        sorted = true;  // [5] Assume sorted until a swap occurs',
                '',
                '        for (int i = 1; i < n - 1; i += 2) {  // [6] Odd phase',
                '            if (arr[i] > arr[i + 1]) {  // [7] If left element is larger',
                '                int temp = arr[i];  // [8] Swap them',
                '                arr[i] = arr[i + 1];',
                '                arr[i + 1] = temp;',
                '                sorted = false;  // [9] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '',
                '        for (int i = 0; i < n - 1; i += 2) {  // [10] Even phase',
                '            if (arr[i] > arr[i + 1]) {  // [11] If left element is larger',
                '                int temp = arr[i];  // [12] Swap them',
                '                arr[i] = arr[i + 1];',
                '                arr[i + 1] = temp;',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using odd-even sort',
                'void oddEvenSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '    bool sorted = false;  // [3] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [4] Keep going until a full pass has no swaps',
                '        sorted = true;  // [5] Assume sorted until a swap occurs',
                '',
                '        for (int i = 1; i < n - 1; i += 2) {  // [6] Odd phase',
                '            if (arr[i] > arr[i + 1]) {  // [7] If left element is larger',
                '                swap(arr[i], arr[i + 1]);  // [8] Swap them',
                '                sorted = false;  // [9] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '',
                '        for (int i = 0; i < n - 1; i += 2) {  // [10] Even phase',
                '            if (arr[i] > arr[i + 1]) {  // [11] If left element is larger',
                '                swap(arr[i], arr[i + 1]);  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using odd-even sort',
                'void oddEvenSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '    int sorted = 0;  // [3] Assume the array is not yet sorted (0 = false)',
                '',
                '    while (!sorted) {  // [4] Keep going until a full pass has no swaps',
                '        sorted = 1;  // [5] Assume sorted until a swap occurs',
                '',
                '        for (int i = 1; i < n - 1; i += 2) {  // [6] Odd phase',
                '            if (arr[i] > arr[i + 1]) {  // [7] If left element is larger',
                '                int temp = arr[i];  // [8] Swap them',
                '                arr[i] = arr[i + 1];',
                '                arr[i + 1] = temp;',
                '                sorted = 0;  // [9] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '',
                '        for (int i = 0; i < n - 1; i += 2) {  // [10] Even phase',
                '            if (arr[i] > arr[i + 1]) {  // [11] If left element is larger',
                '                int temp = arr[i];  // [12] Swap them',
                '                arr[i] = arr[i + 1];',
                '                arr[i + 1] = temp;',
                '                sorted = 0;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using odd-even sort',
                'void OddEvenSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '    bool sorted = false;  // [3] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [4] Keep going until a full pass has no swaps',
                '        sorted = true;  // [5] Assume sorted until a swap occurs',
                '',
                '        for (int i = 1; i < n - 1; i += 2) {  // [6] Odd phase',
                '            if (arr[i] > arr[i + 1]) {  // [7] If left element is larger',
                '                (arr[i], arr[i + 1]) = (arr[i + 1], arr[i]);  // [8] Swap them',
                '                sorted = false;  // [9] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '',
                '        for (int i = 0; i < n - 1; i += 2) {  // [10] Even phase',
                '            if (arr[i] > arr[i + 1]) {  // [11] If left element is larger',
                '                (arr[i], arr[i + 1]) = (arr[i + 1], arr[i]);  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using odd-even sort',
                'function oddEvenSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '    let sorted = false;  // [3] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [4] Keep going until a full pass has no swaps',
                '        sorted = true;  // [5] Assume sorted until a swap occurs',
                '',
                '        for (let i = 1; i < n - 1; i += 2) {  // [6] Odd phase',
                '            if (arr[i] > arr[i + 1]) {  // [7] If left element is larger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [8] Swap them',
                '                sorted = false;  // [9] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '',
                '        for (let i = 0; i < n - 1; i += 2) {  // [10] Even phase',
                '            if (arr[i] > arr[i + 1]) {  // [11] If left element is larger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr;  // [14] Return the sorted array',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using odd-even sort',
                'function oddEvenSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '    let sorted: boolean = false;  // [3] Assume the array is not yet sorted',
                '',
                '    while (!sorted) {  // [4] Keep going until a full pass has no swaps',
                '        sorted = true;  // [5] Assume sorted until a swap occurs',
                '',
                '        for (let i: number = 1; i < n - 1; i += 2) {  // [6] Odd phase',
                '            if (arr[i] > arr[i + 1]) {  // [7] If left element is larger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [8] Swap them',
                '                sorted = false;  // [9] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '',
                '        for (let i: number = 0; i < n - 1; i += 2) {  // [10] Even phase',
                '            if (arr[i] > arr[i + 1]) {  // [11] If left element is larger',
                '                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr;  // [14] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using odd-even sort',
                'func oddEvenSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '    sorted := false  // [3] Assume the slice is not yet sorted',
                '',
                '    for !sorted {  // [4] Keep going until a full pass has no swaps',
                '        sorted = true  // [5] Assume sorted until a swap occurs',
                '',
                '        for i := 1; i < n-1; i += 2 {  // [6] Odd phase',
                '            if arr[i] > arr[i+1] {  // [7] If left element is larger',
                '                arr[i], arr[i+1] = arr[i+1], arr[i]  // [8] Swap them',
                '                sorted = false  // [9] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '',
                '        for i := 0; i < n-1; i += 2 {  // [10] Even phase',
                '            if arr[i] > arr[i+1] {  // [11] If left element is larger',
                '                arr[i], arr[i+1] = arr[i+1], arr[i]  // [12] Swap them',
                '                sorted = false  // [13] A swap occurred, not sorted yet',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr  // [14] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using odd-even sort',
                'fn odd_even_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '    let mut sorted: bool = false;  // [3] Assume the vector is not yet sorted',
                '',
                '    while !sorted {  // [4] Keep going until a full pass has no swaps',
                '        sorted = true;  // [5] Assume sorted until a swap occurs',
                '',
                '        let mut i: usize = 1;  // [6] Odd phase: start at index 1',
                '        while i < n - 1 {  // [6] Compare pairs at odd indices',
                '            if arr[i] > arr[i + 1] {  // [7] If left element is larger',
                '                arr.swap(i, i + 1);  // [8] Swap them',
                '                sorted = false;  // [9] A swap occurred, not sorted yet',
                '            }',
                '            i += 2;',
                '        }',
                '',
                '        let mut i: usize = 0;  // [10] Even phase: start at index 0',
                '        while i < n - 1 {  // [10] Compare pairs at even indices',
                '            if arr[i] > arr[i + 1] {  // [11] If left element is larger',
                '                arr.swap(i, i + 1);  // [12] Swap them',
                '                sorted = false;  // [13] A swap occurred, not sorted yet',
                '            }',
                '            i += 2;',
                '        }',
                '    }',
                '}',
            ],
        },


        radixSort: {
            pseudo: [
                '# Step 1: Start the radix sort procedure with list A',
                'procedure radixSort(A):',
                '',
                '    max = maximum value in A  # [2] Find the largest number to know how many digits to process',
                '    exp = 1  # [3] Start with the least significant digit (ones place)',
                '',
                '    while max / exp > 0:  # [4] Process each digit position until we exceed the max',
                '        output = array of size n  # [5] Temporary array to hold sorted output',
                '        count = array of 10 zeros  # [6] Counting array for digits 0-9',
                '',
                '        for i = 0 to n - 1:  # [7] Count occurrences of each digit',
                '            digit = floor(A[i] / exp) mod 10  # [8] Extract the current digit',
                '            count[digit] = count[digit] + 1  # [8] Tally this digit',
                '',
                '        for i = 1 to 9:  # [9] Convert counts to cumulative positions',
                '            count[i] = count[i] + count[i - 1]  # [9] Each entry is the last index for that digit',
                '',
                '        for i = n - 1 down to 0:  # [10] Build output array from right to left (stable)',
                '            digit = floor(A[i] / exp) mod 10  # [11] Extract the current digit',
                '            count[digit] = count[digit] - 1  # [11] Find the position for this element',
                '            output[count[digit]] = A[i]  # [11] Place it in the output',
                '',
                '        copy output back to A  # [12] Copy the sorted output back to A',
                '        exp = exp * 10  # [13] Move to the next digit position',
                '',
                '    return A  # [14] Give back the fully sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with radix sort (LSD)',
                'def radix_sort(arr: list[int]) -> list[int]:',
                '',
                '    max_val: int = max(arr)  # [2] Find the largest number',
                '    exp: int = 1  # [3] Start with the ones place',
                '',
                '    while max_val // exp > 0:  # [4] Process each digit position',
                '        n: int = len(arr)',
                '        output: list[int] = [0] * n  # [5] Temporary output array',
                '        count: list[int] = [0] * 10  # [6] Count array for digits 0-9',
                '',
                '        for i in range(n):  # [7] Count each digit',
                '            digit: int = (arr[i] // exp) % 10  # [8] Extract current digit',
                '            count[digit] += 1  # [8] Tally the digit',
                '',
                '        for i in range(1, 10):  # [9] Make counts cumulative',
                '            count[i] += count[i - 1]  # [9] Cumulative sum',
                '',
                '        for i in range(n - 1, -1, -1):  # [10] Build output (right to left for stability)',
                '            digit: int = (arr[i] // exp) % 10  # [11] Extract current digit',
                '            count[digit] -= 1  # [11] Find position',
                '            output[count[digit]] = arr[i]  # [11] Place in output',
                '',
                '        arr[:] = output  # [12] Copy output back',
                '        exp *= 10  # [13] Move to next digit place',
                '',
                '    return arr  # [14] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using radix sort (LSD)',
                'void radixSort(int[] arr) {',
                '',
                '    int n = arr.length;',
                '    int max = Arrays.stream(arr).max().getAsInt();  // [2] Find the largest number',
                '    int exp = 1;  // [3] Start with the ones place',
                '',
                '    while (max / exp > 0) {  // [4] Process each digit position',
                '        int[] output = new int[n];  // [5] Temporary output array',
                '        int[] count = new int[10];  // [6] Count array for digits 0-9',
                '',
                '        for (int i = 0; i < n; i++) {  // [7] Count each digit',
                '            int digit = (arr[i] / exp) % 10;  // [8] Extract current digit',
                '            count[digit]++;  // [8] Tally the digit',
                '        }',
                '',
                '        for (int i = 1; i < 10; i++) {  // [9] Make counts cumulative',
                '            count[i] += count[i - 1];  // [9] Cumulative sum',
                '        }',
                '',
                '        for (int i = n - 1; i >= 0; i--) {  // [10] Build output right to left',
                '            int digit = (arr[i] / exp) % 10;  // [11] Extract current digit',
                '            output[--count[digit]] = arr[i];  // [11] Place in output',
                '        }',
                '',
                '        System.arraycopy(output, 0, arr, 0, n);  // [12] Copy output back',
                '        exp *= 10;  // [13] Move to next digit place',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using radix sort (LSD)',
                'void radixSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();',
                '    int max = *max_element(arr.begin(), arr.end());  // [2] Find the largest number',
                '    int exp = 1;  // [3] Start with the ones place',
                '',
                '    while (max / exp > 0) {  // [4] Process each digit position',
                '        vector<int> output(n, 0);  // [5] Temporary output array',
                '        vector<int> count(10, 0);  // [6] Count array for digits 0-9',
                '',
                '        for (int i = 0; i < n; i++) {  // [7] Count each digit',
                '            int digit = (arr[i] / exp) % 10;  // [8] Extract current digit',
                '            count[digit]++;  // [8] Tally the digit',
                '        }',
                '',
                '        for (int i = 1; i < 10; i++) {  // [9] Make counts cumulative',
                '            count[i] += count[i - 1];  // [9] Cumulative sum',
                '        }',
                '',
                '        for (int i = n - 1; i >= 0; i--) {  // [10] Build output right to left',
                '            int digit = (arr[i] / exp) % 10;  // [11] Extract current digit',
                '            output[--count[digit]] = arr[i];  // [11] Place in output',
                '        }',
                '',
                '        arr = output;  // [12] Copy output back',
                '        exp *= 10;  // [13] Move to next digit place',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using radix sort (LSD)',
                'void radixSort(int *arr, int n) {',
                '',
                '    int max = arr[0];  // [2] Find the largest number',
                '    for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];',
                '    int exp = 1;  // [3] Start with the ones place',
                '',
                '    while (max / exp > 0) {  // [4] Process each digit position',
                '        int output[n];  // [5] Temporary output array',
                '        int count[10] = {0};  // [6] Count array for digits 0-9',
                '',
                '        for (int i = 0; i < n; i++) {  // [7] Count each digit',
                '            int digit = (arr[i] / exp) % 10;  // [8] Extract current digit',
                '            count[digit]++;  // [8] Tally the digit',
                '        }',
                '',
                '        for (int i = 1; i < 10; i++) {  // [9] Make counts cumulative',
                '            count[i] += count[i - 1];  // [9] Cumulative sum',
                '        }',
                '',
                '        for (int i = n - 1; i >= 0; i--) {  // [10] Build output right to left',
                '            int digit = (arr[i] / exp) % 10;  // [11] Extract current digit',
                '            output[--count[digit]] = arr[i];  // [11] Place in output',
                '        }',
                '',
                '        for (int i = 0; i < n; i++) arr[i] = output[i];  // [12] Copy output back',
                '        exp *= 10;  // [13] Move to next digit place',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using radix sort (LSD)',
                'void RadixSort(int[] arr) {',
                '',
                '    int n = arr.Length;',
                '    int max = arr.Max();  // [2] Find the largest number',
                '    int exp = 1;  // [3] Start with the ones place',
                '',
                '    while (max / exp > 0) {  // [4] Process each digit position',
                '        int[] output = new int[n];  // [5] Temporary output array',
                '        int[] count = new int[10];  // [6] Count array for digits 0-9',
                '',
                '        for (int i = 0; i < n; i++) {  // [7] Count each digit',
                '            int digit = (arr[i] / exp) % 10;  // [8] Extract current digit',
                '            count[digit]++;  // [8] Tally the digit',
                '        }',
                '',
                '        for (int i = 1; i < 10; i++) {  // [9] Make counts cumulative',
                '            count[i] += count[i - 1];  // [9] Cumulative sum',
                '        }',
                '',
                '        for (int i = n - 1; i >= 0; i--) {  // [10] Build output right to left',
                '            int digit = (arr[i] / exp) % 10;  // [11] Extract current digit',
                '            output[--count[digit]] = arr[i];  // [11] Place in output',
                '        }',
                '',
                '        Array.Copy(output, arr, n);  // [12] Copy output back',
                '        exp *= 10;  // [13] Move to next digit place',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using radix sort (LSD)',
                'function radixSort(arr) {',
                '',
                '    const max = Math.max(...arr);  // [2] Find the largest number',
                '    let exp = 1;  // [3] Start with the ones place',
                '',
                '    while (Math.floor(max / exp) > 0) {  // [4] Process each digit position',
                '        const n = arr.length;',
                '        const output = new Array(n).fill(0);  // [5] Temporary output array',
                '        const count = new Array(10).fill(0);  // [6] Count array for digits 0-9',
                '',
                '        for (let i = 0; i < n; i++) {  // [7] Count each digit',
                '            const digit = Math.floor(arr[i] / exp) % 10;  // [8] Extract current digit',
                '            count[digit]++;  // [8] Tally the digit',
                '        }',
                '',
                '        for (let i = 1; i < 10; i++) {  // [9] Make counts cumulative',
                '            count[i] += count[i - 1];  // [9] Cumulative sum',
                '        }',
                '',
                '        for (let i = n - 1; i >= 0; i--) {  // [10] Build output right to left',
                '            const digit = Math.floor(arr[i] / exp) % 10;  // [11] Extract current digit',
                '            output[--count[digit]] = arr[i];  // [11] Place in output',
                '        }',
                '',
                '        for (let i = 0; i < n; i++) arr[i] = output[i];  // [12] Copy output back',
                '        exp *= 10;  // [13] Move to next digit place',
                '    }',
                '',
                '    return arr;  // [14] Return the sorted array',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using radix sort (LSD)',
                'function radixSort(arr: number[]): number[] {',
                '',
                '    const max: number = Math.max(...arr);  // [2] Find the largest number',
                '    let exp: number = 1;  // [3] Start with the ones place',
                '',
                '    while (Math.floor(max / exp) > 0) {  // [4] Process each digit position',
                '        const n: number = arr.length;',
                '        const output: number[] = new Array(n).fill(0);  // [5] Temporary output array',
                '        const count: number[] = new Array(10).fill(0);  // [6] Count array for digits 0-9',
                '',
                '        for (let i: number = 0; i < n; i++) {  // [7] Count each digit',
                '            const digit: number = Math.floor(arr[i] / exp) % 10;  // [8] Extract current digit',
                '            count[digit]++;  // [8] Tally the digit',
                '        }',
                '',
                '        for (let i: number = 1; i < 10; i++) {  // [9] Make counts cumulative',
                '            count[i] += count[i - 1];  // [9] Cumulative sum',
                '        }',
                '',
                '        for (let i: number = n - 1; i >= 0; i--) {  // [10] Build output right to left',
                '            const digit: number = Math.floor(arr[i] / exp) % 10;  // [11] Extract current digit',
                '            output[--count[digit]] = arr[i];  // [11] Place in output',
                '        }',
                '',
                '        for (let i: number = 0; i < n; i++) arr[i] = output[i];  // [12] Copy output back',
                '        exp *= 10;  // [13] Move to next digit place',
                '    }',
                '',
                '    return arr;  // [14] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using radix sort (LSD)',
                'func radixSort(arr []int) []int {',
                '',
                '    max := arr[0]  // [2] Find the largest number',
                '    for _, v := range arr { if v > max { max = v } }',
                '    exp := 1  // [3] Start with the ones place',
                '',
                '    for max/exp > 0 {  // [4] Process each digit position',
                '        n := len(arr)',
                '        output := make([]int, n)  // [5] Temporary output array',
                '        count := make([]int, 10)  // [6] Count array for digits 0-9',
                '',
                '        for i := 0; i < n; i++ {  // [7] Count each digit',
                '            digit := (arr[i] / exp) % 10  // [8] Extract current digit',
                '            count[digit]++  // [8] Tally the digit',
                '        }',
                '',
                '        for i := 1; i < 10; i++ {  // [9] Make counts cumulative',
                '            count[i] += count[i-1]  // [9] Cumulative sum',
                '        }',
                '',
                '        for i := n - 1; i >= 0; i-- {  // [10] Build output right to left',
                '            digit := (arr[i] / exp) % 10  // [11] Extract current digit',
                '            count[digit]--  // [11] Find position',
                '            output[count[digit]] = arr[i]  // [11] Place in output',
                '        }',
                '',
                '        copy(arr, output)  // [12] Copy output back',
                '        exp *= 10  // [13] Move to next digit place',
                '    }',
                '',
                '    return arr  // [14] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using radix sort (LSD)',
                'fn radix_sort(arr: &mut Vec<i32>) {',
                '',
                '    let max: i32 = *arr.iter().max().unwrap();  // [2] Find the largest number',
                '    let mut exp: i32 = 1;  // [3] Start with the ones place',
                '',
                '    while max / exp > 0 {  // [4] Process each digit position',
                '        let n: usize = arr.len();',
                '        let mut output: Vec<i32> = vec![0; n];  // [5] Temporary output array',
                '        let mut count: Vec<usize> = vec![0; 10];  // [6] Count array for digits 0-9',
                '',
                '        for i in 0..n {  // [7] Count each digit',
                '            let digit: usize = ((arr[i] / exp) % 10) as usize;  // [8] Extract current digit',
                '            count[digit] += 1;  // [8] Tally the digit',
                '        }',
                '',
                '        for i in 1..10 {  // [9] Make counts cumulative',
                '            count[i] += count[i - 1];  // [9] Cumulative sum',
                '        }',
                '',
                '        for i in (0..n).rev() {  // [10] Build output right to left',
                '            let digit: usize = ((arr[i] / exp) % 10) as usize;  // [11] Extract current digit',
                '            count[digit] -= 1;  // [11] Find position',
                '            output[count[digit]] = arr[i];  // [11] Place in output',
                '        }',
                '',
                '        arr.clone_from(&output);  // [12] Copy output back',
                '        exp *= 10;  // [13] Move to next digit place',
                '    }',
                '}',
            ],
        },


        bucketSort: {
            pseudo: [
                '# Step 1: Start the bucket sort procedure with list A',
                'procedure bucketSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '    bucketSize = 101 / n  # [3] Divide the [0,100] range into n equal buckets',
                '    buckets = n empty lists  # [4] Create n empty buckets',
                '',
                '    for i = 0 to n - 1:  # [5] Place each element in its bucket',
                '        b = floor(A[i] / bucketSize)  # [6] Determine which bucket it belongs to',
                '        if b >= n: b = n - 1  # [6] Clamp to last bucket for boundary values',
                '        append A[i] to buckets[b]  # [7] Add the element to that bucket',
                '',
                '    k = 0  # [8] Index for writing back to A',
                '    for each non-empty bucket b:  # [9] Process each bucket',
                '        insertion sort b  # [10] Sort the small bucket with insertion sort',
                '        for each element e in b:  # [11] Copy sorted bucket back to A',
                '            A[k] = e  # [12] Write element to output',
                '            k = k + 1  # [12] Advance the write index',
                '',
                '    return A  # [13] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with bucket sort',
                'def bucket_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items',
                '    bucket_size: float = 101 / n  # [3] Divide the [0,100] range into n buckets',
                '    buckets: list[list[int]] = [[] for _ in range(n)]  # [4] Create n empty buckets',
                '',
                '    for i in range(n):  # [5] Place each element in its bucket',
                '        b: int = int(arr[i] / bucket_size)  # [6] Determine which bucket',
                '        if b >= n: b = n - 1  # [6] Clamp to last bucket',
                '        buckets[b].append(arr[i])  # [7] Add element to bucket',
                '',
                '    k: int = 0  # [8] Write index for copying back',
                '    for bucket in buckets:  # [9] Process each bucket',
                '        bucket.sort()  # [10] Sort the small bucket (insertion sort in CPython)',
                '        for val in bucket:  # [11] Copy sorted bucket back',
                '            arr[k] = val  # [12] Write element to output',
                '            k += 1  # [12] Advance write index',
                '',
                '    return arr  # [13] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using bucket sort',
                'void bucketSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '    double bucketSize = 101.0 / n;  // [3] Divide [0,100] range into n buckets',
                '    List<List<Integer>> buckets = new ArrayList<>();  // [4] Create n empty buckets',
                '    for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());',
                '',
                '    for (int i = 0; i < n; i++) {  // [5] Place each element in its bucket',
                '        int b = (int)(arr[i] / bucketSize);  // [6] Determine which bucket',
                '        if (b >= n) b = n - 1;  // [6] Clamp to last bucket',
                '        buckets.get(b).add(arr[i]);  // [7] Add element to bucket',
                '    }',
                '',
                '    int k = 0;  // [8] Write index',
                '    for (List<Integer> bucket : buckets) {  // [9] Process each bucket',
                '        Collections.sort(bucket);  // [10] Sort the bucket',
                '        for (int val : bucket) {  // [11] Copy sorted bucket back',
                '            arr[k++] = val;  // [12] Write and advance',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using bucket sort',
                'void bucketSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '    double bucketSize = 101.0 / n;  // [3] Divide [0,100] range into n buckets',
                '    vector<vector<int>> buckets(n);  // [4] Create n empty buckets',
                '',
                '    for (int i = 0; i < n; i++) {  // [5] Place each element in its bucket',
                '        int b = (int)(arr[i] / bucketSize);  // [6] Determine which bucket',
                '        if (b >= n) b = n - 1;  // [6] Clamp to last bucket',
                '        buckets[b].push_back(arr[i]);  // [7] Add element to bucket',
                '    }',
                '',
                '    int k = 0;  // [8] Write index',
                '    for (auto& bucket : buckets) {  // [9] Process each bucket',
                '        sort(bucket.begin(), bucket.end());  // [10] Sort the bucket',
                '        for (int val : bucket) {  // [11] Copy sorted bucket back',
                '            arr[k++] = val;  // [12] Write and advance',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using bucket sort',
                'void bucketSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '    double bucketSize = 101.0 / n;  // [3] Divide [0,100] range into n buckets',
                '    // [4] Create n buckets using a 2D array (simplified)',
                '    int buckets[n][n]; int bucketLen[n];',
                '    for (int i = 0; i < n; i++) bucketLen[i] = 0;',
                '',
                '    for (int i = 0; i < n; i++) {  // [5] Place each element in its bucket',
                '        int b = (int)(arr[i] / bucketSize);  // [6] Determine which bucket',
                '        if (b >= n) b = n - 1;  // [6] Clamp to last bucket',
                '        buckets[b][bucketLen[b]++] = arr[i];  // [7] Add element to bucket',
                '    }',
                '',
                '    int k = 0;  // [8] Write index',
                '    for (int b = 0; b < n; b++) {  // [9] Process each bucket',
                '        // [10] Insertion sort the bucket',
                '        for (int i = 1; i < bucketLen[b]; i++) {',
                '            int key = buckets[b][i]; int j = i - 1;',
                '            while (j >= 0 && buckets[b][j] > key) { buckets[b][j+1] = buckets[b][j]; j--; }',
                '            buckets[b][j+1] = key;',
                '        }',
                '        for (int i = 0; i < bucketLen[b]; i++) arr[k++] = buckets[b][i];  // [12] Copy back',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using bucket sort',
                'void BucketSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '    double bucketSize = 101.0 / n;  // [3] Divide [0,100] range into n buckets',
                '    var buckets = new List<List<int>>();  // [4] Create n empty buckets',
                '    for (int i = 0; i < n; i++) buckets.Add(new List<int>());',
                '',
                '    for (int i = 0; i < n; i++) {  // [5] Place each element in its bucket',
                '        int b = (int)(arr[i] / bucketSize);  // [6] Determine which bucket',
                '        if (b >= n) b = n - 1;  // [6] Clamp to last bucket',
                '        buckets[b].Add(arr[i]);  // [7] Add element to bucket',
                '    }',
                '',
                '    int k = 0;  // [8] Write index',
                '    foreach (var bucket in buckets) {  // [9] Process each bucket',
                '        bucket.Sort();  // [10] Sort the bucket',
                '        foreach (var val in bucket) {  // [11] Copy sorted bucket back',
                '            arr[k++] = val;  // [12] Write and advance',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using bucket sort',
                'function bucketSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '    const bucketSize = 101 / n;  // [3] Divide [0,100] range into n buckets',
                '    const buckets = Array.from({ length: n }, () => []);  // [4] Create n empty buckets',
                '',
                '    for (let i = 0; i < n; i++) {  // [5] Place each element in its bucket',
                '        let b = Math.floor(arr[i] / bucketSize);  // [6] Determine which bucket',
                '        if (b >= n) b = n - 1;  // [6] Clamp to last bucket',
                '        buckets[b].push(arr[i]);  // [7] Add element to bucket',
                '    }',
                '',
                '    let k = 0;  // [8] Write index',
                '    for (const bucket of buckets) {  // [9] Process each bucket',
                '        bucket.sort((a, b) => a - b);  // [10] Sort the bucket',
                '        for (const val of bucket) {  // [11] Copy sorted bucket back',
                '            arr[k++] = val;  // [12] Write and advance',
                '        }',
                '    }',
                '',
                '    return arr;  // [13] Return the sorted array',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using bucket sort',
                'function bucketSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '    const bucketSize: number = 101 / n;  // [3] Divide [0,100] range into n buckets',
                '    const buckets: number[][] = Array.from({ length: n }, () => []);  // [4] Create n empty buckets',
                '',
                '    for (let i: number = 0; i < n; i++) {  // [5] Place each element in its bucket',
                '        let b: number = Math.floor(arr[i] / bucketSize);  // [6] Determine which bucket',
                '        if (b >= n) b = n - 1;  // [6] Clamp to last bucket',
                '        buckets[b].push(arr[i]);  // [7] Add element to bucket',
                '    }',
                '',
                '    let k: number = 0;  // [8] Write index',
                '    for (const bucket of buckets) {  // [9] Process each bucket',
                '        bucket.sort((a: number, b: number) => a - b);  // [10] Sort the bucket',
                '        for (const val of bucket) {  // [11] Copy sorted bucket back',
                '            arr[k++] = val;  // [12] Write and advance',
                '        }',
                '    }',
                '',
                '    return arr;  // [13] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using bucket sort',
                'func bucketSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '    bucketSize := 101.0 / float64(n)  // [3] Divide [0,100] range into n buckets',
                '    buckets := make([][]int, n)  // [4] Create n empty buckets',
                '    for i := range buckets { buckets[i] = []int{} }',
                '',
                '    for i := 0; i < n; i++ {  // [5] Place each element in its bucket',
                '        b := int(float64(arr[i]) / bucketSize)  // [6] Determine which bucket',
                '        if b >= n { b = n - 1 }  // [6] Clamp to last bucket',
                '        buckets[b] = append(buckets[b], arr[i])  // [7] Add element to bucket',
                '    }',
                '',
                '    k := 0  // [8] Write index',
                '    for _, bucket := range buckets {  // [9] Process each bucket',
                '        sort.Ints(bucket)  // [10] Sort the bucket',
                '        for _, val := range bucket {  // [11] Copy sorted bucket back',
                '            arr[k] = val  // [12] Write and advance',
                '            k++',
                '        }',
                '    }',
                '',
                '    return arr  // [13] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using bucket sort',
                'fn bucket_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '    let bucket_size: f64 = 101.0 / n as f64;  // [3] Divide [0,100] range into n buckets',
                '    let mut buckets: Vec<Vec<i32>> = vec![vec![]; n];  // [4] Create n empty buckets',
                '',
                '    for i in 0..n {  // [5] Place each element in its bucket',
                '        let mut b: usize = (arr[i] as f64 / bucket_size) as usize;  // [6] Determine which bucket',
                '        if b >= n { b = n - 1; }  // [6] Clamp to last bucket',
                '        buckets[b].push(arr[i]);  // [7] Add element to bucket',
                '    }',
                '',
                '    let mut k: usize = 0;  // [8] Write index',
                '    for bucket in &mut buckets {  // [9] Process each bucket',
                '        bucket.sort();  // [10] Sort the bucket',
                '        for &val in bucket.iter() {  // [11] Copy sorted bucket back',
                '            arr[k] = val;  // [12] Write and advance',
                '            k += 1;',
                '        }',
                '    }',
                '}',
            ],
        },


        timSort: {
            pseudo: [
                '# Step 1: Start the tim sort procedure with list A',
                'procedure timSort(A):',
                '',
                '    n = length(A)  # [2] Find out how many items are in the list',
                '    MIN_RUN = max(4, floor(n / 4))  # [3] Run size scales with array length',
                '',
                '    for start = 0 to n - 1 step MIN_RUN:  # [4] Sort each run with insertion sort',
                '        end = min(start + MIN_RUN - 1, n - 1)  # [5] Find end of this run',
                '        for i = start + 1 to end:  # [6] Insertion sort this run',
                '            key = A[i]  # [7] Pick the next element to insert',
                '            j = i - 1  # [7] Compare backwards through the sorted portion',
                '            while j >= start and A[j] > key:  # [8] Shift larger elements right',
                '                A[j + 1] = A[j]  # [9] Shift element one position right',
                '                j = j - 1  # [9] Move comparison pointer left',
                '            A[j + 1] = key  # [10] Insert key in its correct position',
                '',
                '    size = MIN_RUN  # [11] Start merging runs of size MIN_RUN',
                '    while size < n:  # [12] Keep merging until the whole array is one run',
                '        for left = 0 to n - 1 step 2 * size:  # [13] Merge adjacent run pairs',
                '            mid = min(left + size - 1, n - 1)  # [14] Find the midpoint',
                '            right = min(left + 2 * size - 1, n - 1)  # [15] Find the right end',
                '            if mid < right: merge A[left..mid] and A[mid+1..right]  # [16] Merge the two runs',
                '        size = size * 2  # [17] Double the run size for the next round',
                '',
                '    return A  # [18] Give back the sorted list',
            ],
            python: [
                '# Step 1: Take a list of numbers and sort it with tim sort',
                'def tim_sort(arr: list[int]) -> list[int]:',
                '',
                '    n: int = len(arr)  # [2] Get the number of items in the list',
                '    MIN_RUN: int = max(4, n // 4)  # [3] Run size scales with array length',
                '',
                '    for start in range(0, n, MIN_RUN):  # [4] Sort each run with insertion sort',
                '        end: int = min(start + MIN_RUN - 1, n - 1)  # [5] Find end of this run',
                '        for i in range(start + 1, end + 1):  # [6] Insertion sort this run',
                '            key: int = arr[i]  # [7] Pick the next element to insert',
                '            j: int = i - 1  # [7] Compare backwards',
                '            while j >= start and arr[j] > key:  # [8] Shift larger elements right',
                '                arr[j + 1] = arr[j]  # [9] Shift right',
                '                j -= 1  # [9] Move pointer left',
                '            arr[j + 1] = key  # [10] Insert key',
                '',
                '    size: int = MIN_RUN  # [11] Start merging',
                '    while size < n:  # [12] Keep merging',
                '        for left in range(0, n, 2 * size):  # [13] Merge adjacent pairs',
                '            mid: int = min(left + size - 1, n - 1)  # [14] Find midpoint',
                '            right: int = min(left + 2 * size - 1, n - 1)  # [15] Find right end',
                '            if mid < right:  # [16] Merge the two runs',
                '                left_part = arr[left:mid+1]',
                '                right_part = arr[mid+1:right+1]',
                '                i = j = 0; k = left',
                '                while i < len(left_part) and j < len(right_part):',
                '                    if left_part[i] <= right_part[j]: arr[k] = left_part[i]; i += 1',
                '                    else: arr[k] = right_part[j]; j += 1',
                '                    k += 1',
                '                while i < len(left_part): arr[k] = left_part[i]; i += 1; k += 1',
                '                while j < len(right_part): arr[k] = right_part[j]; j += 1; k += 1',
                '        size *= 2  # [17] Double the run size',
                '',
                '    return arr  # [18] Return the sorted list',
            ],
            java: [
                '// Step 1: Sort the array using tim sort',
                'void timSort(int[] arr) {',
                '',
                '    int n = arr.length;  // [2] Get the length of the array',
                '    int MIN_RUN = Math.max(4, n / 4);  // [3] Run size scales with array length',
                '',
                '    for (int start = 0; start < n; start += MIN_RUN) {  // [4] Sort each run',
                '        int end = Math.min(start + MIN_RUN - 1, n - 1);  // [5] Find end of run',
                '        for (int i = start + 1; i <= end; i++) {  // [6] Insertion sort',
                '            int key = arr[i];  // [7] Pick element to insert',
                '            int j = i - 1;  // [7] Compare backwards',
                '            while (j >= start && arr[j] > key) {  // [8] Shift right',
                '                arr[j + 1] = arr[j];  // [9] Shift',
                '                j--;  // [9] Move pointer',
                '            }',
                '            arr[j + 1] = key;  // [10] Insert key',
                '        }',
                '    }',
                '',
                '    for (int size = MIN_RUN; size < n; size *= 2) {  // [11-17] Merge runs',
                '        for (int left = 0; left < n; left += 2 * size) {  // [13] Merge pairs',
                '            int mid = Math.min(left + size - 1, n - 1);  // [14] Midpoint',
                '            int right = Math.min(left + 2 * size - 1, n - 1);  // [15] Right end',
                '            if (mid < right) {  // [16] Merge if two runs exist',
                '                int[] left_arr = Arrays.copyOfRange(arr, left, mid + 1);',
                '                int[] right_arr = Arrays.copyOfRange(arr, mid + 1, right + 1);',
                '                int i = 0, j = 0, k = left;',
                '                while (i < left_arr.length && j < right_arr.length)',
                '                    arr[k++] = (left_arr[i] <= right_arr[j]) ? left_arr[i++] : right_arr[j++];',
                '                while (i < left_arr.length) arr[k++] = left_arr[i++];',
                '                while (j < right_arr.length) arr[k++] = right_arr[j++];',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            cpp: [
                '// Step 1: Sort the array using tim sort',
                'void timSort(vector<int>& arr) {',
                '',
                '    int n = arr.size();  // [2] Get the number of items',
                '    int MIN_RUN = max(4, n / 4);  // [3] Run size scales with array length',
                '',
                '    for (int start = 0; start < n; start += MIN_RUN) {  // [4] Sort each run',
                '        int end = min(start + MIN_RUN - 1, n - 1);  // [5] Find end of run',
                '        for (int i = start + 1; i <= end; i++) {  // [6] Insertion sort',
                '            int key = arr[i];  // [7] Pick element to insert',
                '            int j = i - 1;  // [7] Compare backwards',
                '            while (j >= start && arr[j] > key) {  // [8] Shift right',
                '                arr[j + 1] = arr[j];  // [9] Shift',
                '                j--;  // [9] Move pointer',
                '            }',
                '            arr[j + 1] = key;  // [10] Insert key',
                '        }',
                '    }',
                '',
                '    for (int size = MIN_RUN; size < n; size *= 2) {  // [11-17] Merge runs',
                '        for (int left = 0; left < n; left += 2 * size) {  // [13] Merge pairs',
                '            int mid = min(left + size - 1, n - 1);  // [14] Midpoint',
                '            int right = min(left + 2 * size - 1, n - 1);  // [15] Right end',
                '            if (mid < right) {  // [16] Merge if two runs exist',
                '                vector<int> left_arr(arr.begin() + left, arr.begin() + mid + 1);',
                '                vector<int> right_arr(arr.begin() + mid + 1, arr.begin() + right + 1);',
                '                int i = 0, j = 0, k = left;',
                '                while (i < left_arr.size() && j < right_arr.size())',
                '                    arr[k++] = (left_arr[i] <= right_arr[j]) ? left_arr[i++] : right_arr[j++];',
                '                while (i < left_arr.size()) arr[k++] = left_arr[i++];',
                '                while (j < right_arr.size()) arr[k++] = right_arr[j++];',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Sort the array using tim sort',
                'void timSort(int *arr, int n) {',
                '',
                '    // [2] n is passed in as the length of the array',
                '    int MIN_RUN = (n / 4 > 4) ? n / 4 : 4;  // [3] Run size scales with array length',
                '',
                '    for (int start = 0; start < n; start += MIN_RUN) {  // [4] Sort each run',
                '        int end = start + MIN_RUN - 1; if (end >= n) end = n - 1;  // [5]',
                '        for (int i = start + 1; i <= end; i++) {  // [6] Insertion sort',
                '            int key = arr[i];  // [7] Pick element to insert',
                '            int j = i - 1;  // [7] Compare backwards',
                '            while (j >= start && arr[j] > key) {  // [8] Shift right',
                '                arr[j + 1] = arr[j]; j--;  // [9] Shift and move pointer',
                '            }',
                '            arr[j + 1] = key;  // [10] Insert key',
                '        }',
                '    }',
                '',
                '    for (int size = MIN_RUN; size < n; size *= 2) {  // [11-17] Merge runs',
                '        for (int left = 0; left < n; left += 2 * size) {',
                '            int mid = left + size - 1; if (mid >= n) mid = n - 1;  // [14]',
                '            int right = left + 2*size - 1; if (right >= n) right = n - 1;  // [15]',
                '            if (mid < right) {  // [16] Merge if two runs exist',
                '                int len1 = mid - left + 1, len2 = right - mid;',
                '                int L[len1], R[len2];',
                '                for (int i = 0; i < len1; i++) L[i] = arr[left + i];',
                '                for (int j = 0; j < len2; j++) R[j] = arr[mid + 1 + j];',
                '                int i = 0, j = 0, k = left;',
                '                while (i < len1 && j < len2) arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];',
                '                while (i < len1) arr[k++] = L[i++];',
                '                while (j < len2) arr[k++] = R[j++];',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Sort the array using tim sort',
                'void TimSort(int[] arr) {',
                '',
                '    int n = arr.Length;  // [2] Get the length of the array',
                '    int MIN_RUN = Math.Max(4, n / 4);  // [3] Run size scales with array length',
                '',
                '    for (int start = 0; start < n; start += MIN_RUN) {  // [4] Sort each run',
                '        int end = Math.Min(start + MIN_RUN - 1, n - 1);  // [5] Find end of run',
                '        for (int i = start + 1; i <= end; i++) {  // [6] Insertion sort',
                '            int key = arr[i];  // [7] Pick element to insert',
                '            int j = i - 1;  // [7] Compare backwards',
                '            while (j >= start && arr[j] > key) {  // [8] Shift right',
                '                arr[j + 1] = arr[j]; j--;  // [9] Shift and move pointer',
                '            }',
                '            arr[j + 1] = key;  // [10] Insert key',
                '        }',
                '    }',
                '',
                '    for (int size = MIN_RUN; size < n; size *= 2) {  // [11-17] Merge runs',
                '        for (int left = 0; left < n; left += 2 * size) {',
                '            int mid = Math.Min(left + size - 1, n - 1);  // [14]',
                '            int right = Math.Min(left + 2 * size - 1, n - 1);  // [15]',
                '            if (mid < right) {  // [16] Merge if two runs exist',
                '                int[] leftArr = arr[left..(mid+1)];',
                '                int[] rightArr = arr[(mid+1)..(right+1)];',
                '                int i = 0, j = 0, k = left;',
                '                while (i < leftArr.Length && j < rightArr.Length)',
                '                    arr[k++] = (leftArr[i] <= rightArr[j]) ? leftArr[i++] : rightArr[j++];',
                '                while (i < leftArr.Length) arr[k++] = leftArr[i++];',
                '                while (j < rightArr.Length) arr[k++] = rightArr[j++];',
                '            }',
                '        }',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Sort the array using tim sort',
                'function timSort(arr) {',
                '',
                '    const n = arr.length;  // [2] Get the length of the array',
                '    const MIN_RUN = Math.max(4, Math.floor(n / 4));  // [3] Run size scales with array length',
                '',
                '    for (let start = 0; start < n; start += MIN_RUN) {  // [4] Sort each run with insertion sort',
                '        const end = Math.min(start + MIN_RUN - 1, n - 1);  // [5] Find end of this run',
                '        for (let i = start + 1; i <= end; i++) {  // [6] Insertion sort the run',
                '            const key = arr[i];  // [7] Pick the element to insert',
                '            let j = i - 1;  // [7] Compare backwards through sorted portion',
                '            while (j >= start && arr[j] > key) {  // [8] Shift elements right',
                '                arr[j + 1] = arr[j];  // [9] Shift element right',
                '                j--;  // [9] Move pointer left',
                '            }',
                '            arr[j + 1] = key;  // [10] Insert key in correct position',
                '        }',
                '    }',
                '',
                '    for (let size = MIN_RUN; size < n; size *= 2) {  // [11] Merge runs, doubling size each time',
                '        for (let left = 0; left < n; left += 2 * size) {  // [13] Merge adjacent run pairs',
                '            const mid = Math.min(left + size - 1, n - 1);  // [14] Find midpoint',
                '            const right = Math.min(left + 2 * size - 1, n - 1);  // [15] Find right end',
                '            if (mid < right) {  // [16] Only merge if second run exists',
                '                const leftArr = arr.slice(left, mid + 1);',
                '                const rightArr = arr.slice(mid + 1, right + 1);',
                '                let i = 0, j = 0, k = left;',
                '                while (i < leftArr.length && j < rightArr.length)',
                '                    arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];',
                '                while (i < leftArr.length) arr[k++] = leftArr[i++];',
                '                while (j < rightArr.length) arr[k++] = rightArr[j++];',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr;  // [18] Return the sorted array',
                '}',
            ],
            typescript: [
                '// Step 1: Sort the array using tim sort',
                'function timSort(arr: number[]): number[] {',
                '',
                '    const n: number = arr.length;  // [2] Get the length of the array',
                '    const MIN_RUN: number = Math.max(4, Math.floor(n / 4));  // [3] Run size scales with array length',
                '',
                '    for (let start: number = 0; start < n; start += MIN_RUN) {  // [4] Sort each run',
                '        const end: number = Math.min(start + MIN_RUN - 1, n - 1);  // [5] Find end of run',
                '        for (let i: number = start + 1; i <= end; i++) {  // [6] Insertion sort',
                '            const key: number = arr[i];  // [7] Pick element to insert',
                '            let j: number = i - 1;  // [7] Compare backwards',
                '            while (j >= start && arr[j] > key) {  // [8] Shift right',
                '                arr[j + 1] = arr[j];  // [9] Shift element right',
                '                j--;  // [9] Move pointer left',
                '            }',
                '            arr[j + 1] = key;  // [10] Insert key',
                '        }',
                '    }',
                '',
                '    for (let size: number = MIN_RUN; size < n; size *= 2) {  // [11] Merge runs',
                '        for (let left: number = 0; left < n; left += 2 * size) {  // [13] Merge pairs',
                '            const mid: number = Math.min(left + size - 1, n - 1);  // [14] Midpoint',
                '            const right: number = Math.min(left + 2 * size - 1, n - 1);  // [15] Right end',
                '            if (mid < right) {  // [16] Merge if two runs exist',
                '                const leftArr: number[] = arr.slice(left, mid + 1);',
                '                const rightArr: number[] = arr.slice(mid + 1, right + 1);',
                '                let i: number = 0, j: number = 0, k: number = left;',
                '                while (i < leftArr.length && j < rightArr.length)',
                '                    arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];',
                '                while (i < leftArr.length) arr[k++] = leftArr[i++];',
                '                while (j < rightArr.length) arr[k++] = rightArr[j++];',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr;  // [18] Return the sorted array',
                '}',
            ],
            go: [
                '// Step 1: Sort the slice using tim sort',
                'func timSort(arr []int) []int {',
                '',
                '    n := len(arr)  // [2] Get the length of the slice',
                '    MIN_RUN := n / 4',
                '    if MIN_RUN < 4 { MIN_RUN = 4 }  // [3] Run size scales with array length',
                '',
                '    for start := 0; start < n; start += MIN_RUN {  // [4] Sort each run',
                '        end := start + MIN_RUN - 1',
                '        if end >= n { end = n - 1 }  // [5] Find end of run',
                '        for i := start + 1; i <= end; i++ {  // [6] Insertion sort',
                '            key := arr[i]  // [7] Pick element to insert',
                '            j := i - 1  // [7] Compare backwards',
                '            for j >= start && arr[j] > key {  // [8] Shift right',
                '                arr[j+1] = arr[j]  // [9] Shift',
                '                j--  // [9] Move pointer',
                '            }',
                '            arr[j+1] = key  // [10] Insert key',
                '        }',
                '    }',
                '',
                '    for size := MIN_RUN; size < n; size *= 2 {  // [11] Merge runs',
                '        for left := 0; left < n; left += 2 * size {  // [13] Merge pairs',
                '            mid := left + size - 1',
                '            if mid >= n { mid = n - 1 }  // [14] Midpoint',
                '            right := left + 2*size - 1',
                '            if right >= n { right = n - 1 }  // [15] Right end',
                '            if mid < right {  // [16] Merge if two runs exist',
                '                leftArr := append([]int{}, arr[left:mid+1]...)',
                '                rightArr := append([]int{}, arr[mid+1:right+1]...)',
                '                i, j, k := 0, 0, left',
                '                for i < len(leftArr) && j < len(rightArr) {',
                '                    if leftArr[i] <= rightArr[j] { arr[k] = leftArr[i]; i++ } else { arr[k] = rightArr[j]; j++ }',
                '                    k++',
                '                }',
                '                for i < len(leftArr) { arr[k] = leftArr[i]; i++; k++ }',
                '                for j < len(rightArr) { arr[k] = rightArr[j]; j++; k++ }',
                '            }',
                '        }',
                '    }',
                '',
                '    return arr  // [18] Return the sorted slice',
                '}',
            ],
            rust: [
                '// Step 1: Sort the vector using tim sort',
                'fn tim_sort(arr: &mut Vec<i32>) {',
                '',
                '    let n: usize = arr.len();  // [2] Get the length of the vector',
                '    let min_run: usize = if n / 4 > 4 { n / 4 } else { 4 };  // [3] Run size scales with length',
                '',
                '    let mut start: usize = 0;  // [4] Sort each run with insertion sort',
                '    while start < n {',
                '        let end: usize = if start + min_run - 1 < n { start + min_run - 1 } else { n - 1 };  // [5]',
                '        for i in (start + 1)..=end {  // [6] Insertion sort this run',
                '            let key: i32 = arr[i];  // [7] Pick element to insert',
                '            let mut j: usize = i;  // [7] Compare backwards',
                '            while j > start && arr[j - 1] > key {  // [8] Shift right',
                '                arr[j] = arr[j - 1];  // [9] Shift element right',
                '                j -= 1;  // [9] Move pointer left',
                '            }',
                '            arr[j] = key;  // [10] Insert key',
                '        }',
                '        start += min_run;',
                '    }',
                '',
                '    let mut size: usize = min_run;  // [11] Start merging runs',
                '    while size < n {  // [12] Keep merging until fully sorted',
                '        let mut left: usize = 0;  // [13] Merge adjacent run pairs',
                '        while left < n {',
                '            let mid: usize = if left + size - 1 < n { left + size - 1 } else { n - 1 };  // [14]',
                '            let right: usize = if left + 2*size - 1 < n { left + 2*size - 1 } else { n - 1 };  // [15]',
                '            if mid < right {  // [16] Merge if two runs exist',
                '                let left_arr: Vec<i32> = arr[left..=mid].to_vec();',
                '                let right_arr: Vec<i32> = arr[(mid+1)..=right].to_vec();',
                '                let (mut i, mut j, mut k) = (0, 0, left);',
                '                while i < left_arr.len() && j < right_arr.len() {',
                '                    if left_arr[i] <= right_arr[j] { arr[k] = left_arr[i]; i += 1; }',
                '                    else { arr[k] = right_arr[j]; j += 1; }',
                '                    k += 1;',
                '                }',
                '                while i < left_arr.len() { arr[k] = left_arr[i]; i += 1; k += 1; }',
                '                while j < right_arr.len() { arr[k] = right_arr[j]; j += 1; k += 1; }',
                '            }',
                '            left += 2 * size;',
                '        }',
                '        size *= 2;  // [17] Double the run size',
                '    }',
                '}',
            ],
        },

};

// ─── Complexity Info ───

/** @type {Object.<string, {name: string, best: string, average: string, worst: string, space: string, description: string}>} */
const COMPLEXITY = {
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

        combSort: {
            name: 'Comb Sort',
            best: 'O(n log n)',
            average: 'O(n^2)',
            worst: 'O(n^2)',
            space: 'O(1)',
            description:
                'Improvement over bubble sort using a gap greater than 1. ' +
                'Starts with a large gap and shrinks it by a shrink factor (1.3). ' +
                'Eliminates small values near the end faster than bubble sort.',
            useCase:
                'Use when you want something better than bubble sort but simpler than shell sort. ' +
                'Good for arrays with small values trapped at the end.',
            avoid:
                'For guaranteed O(n log n) performance, use merge sort or heap sort instead. ' +
                'The shrink factor is a heuristic that works well in practice but not guaranteed.',
        },

        oddEvenSort: {
            name: 'Odd-Even Sort',
            best: 'O(n)',
            average: 'O(n^2)',
            worst: 'O(n^2)',
            space: 'O(1)',
            description:
                'Parallel sorting variant of bubble sort. Sorts odd-even pairs in one pass, ' +
                'then even-odd pairs in the next. Designed for parallel processors.',
            useCase:
                'Use when implementing sorting on parallel hardware where multiple comparisons ' +
                'can happen simultaneously. The algorithm is designed for parallelization.',
            avoid:
                'On single-threaded systems, this is just bubble sort with extra steps. ' +
                'Use regular bubble sort or a better algorithm for sequential execution.',
        },

        radixSort: {
            name: 'Radix Sort',
            best: 'O(n * k)',
            average: 'O(n * k)',
            worst: 'O(n * k)',
            space: 'O(n + k)',
            description:
                'Non-comparative sorting that processes digits from least to most significant. ' +
                'Uses counting sort as a subroutine for each digit position. ' +
                'k is the number of digits in the maximum value.',
            useCase:
                'Use when sorting integers or strings with a fixed range. Extremely fast for numbers. ' +
                'Can beat O(n log n) comparison-based sorts when the range is reasonable.',
            avoid:
                'Not suitable for floating-point numbers or arbitrary-precision integers. ' +
                'Requires knowing the range of values beforehand. Use comparison sorts for unknown ranges.',
        },

        bucketSort: {
            name: 'Bucket Sort',
            best: 'O(n + k)',
            average: 'O(n + k)',
            worst: 'O(n^2)',
            space: 'O(n + k)',
            description:
                'Distributes elements into buckets based on value range, sorts each bucket ' +
                '(usually with insertion sort), then concatenates. k is the number of buckets.',
            useCase:
                'Use when input is uniformly distributed over a known range. ' +
                'Very efficient when the distribution assumption holds.',
            avoid:
                'Poor performance when values cluster in one bucket (degrades to insertion sort). ' +
                'Requires knowing the range of values. Use radix sort for integers.',
        },

        timSort: {
            name: 'Tim Sort',
            best: 'O(n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            space: 'O(n)',
            description:
                'Hybrid sorting algorithm derived from merge sort and insertion sort. ' +
                'Divides the array into small runs sorted with insertion sort, then merges them. ' +
                'Designed to perform well on real-world data that often has natural ordered subsequences.',
            useCase:
                'The default sort in Python and Java for good reason. Excellent on partially sorted data ' +
                'and real-world inputs. Combines the best of insertion sort (fast on small/sorted data) ' +
                'and merge sort (guaranteed O(n log n) worst case).',
            avoid:
                'Overkill for tiny arrays where simple insertion sort suffices. ' +
                'Requires O(n) extra space like merge sort. For purely random data with no natural runs, ' +
                'the overhead of detecting runs adds complexity without much benefit.',
        },

};

// ─── Generator Functions ───

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
     * Comb Sort generator.
     *
     * Improvement over bubble sort using a shrinking gap. Starts with a large gap
     * equal to the array length, reduces it by a factor of 1.3 each pass, and
     * continues until the gap is 1 and no swaps occur.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     */
    function* combSort(arr) {
        const n = arr.length;
        let gap = n;
        const shrink = 1.3;
        let sorted = false;

        while (!sorted) {
            gap = Math.floor(gap / shrink); // [7] Shrink the gap
            if (gap <= 1) {
                gap = 1;          // [8] Minimum gap is 1
                sorted = true;    // [9] Assume sorted unless a swap occurs
            }

            for (let i = 0; i < n - gap; i++) {
                yield { type: 'compare', indices: [i, i + gap], codeLine: 11 }; // [11] Compare elements gap apart
                if (arr[i] > arr[i + gap]) {
                    [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                    yield { type: 'swap', indices: [i, i + gap], codeLine: 12 }; // [12] Swap them
                    sorted = false; // [13] A swap occurred
                }
            }
        }

        // Mark all elements as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 14 }; // [14] Array is now sorted
        }
    }

    /**
     * Odd-Even Sort generator.
     *
     * A parallel-friendly variant of bubble sort. Alternates between comparing
     * odd-indexed pairs (1,2), (3,4), ... and even-indexed pairs (0,1), (2,3), ...
     * until a full pass produces no swaps.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     */
    function* oddEvenSort(arr) {
        const n = arr.length;
        let sorted = false;

        while (!sorted) {
            sorted = true; // [5] Assume sorted until a swap occurs

            // Odd phase: compare pairs at odd indices (1,2), (3,4), ...
            for (let i = 1; i < n - 1; i += 2) {
                yield { type: 'compare', indices: [i, i + 1], codeLine: 7 }; // [7] Compare odd-indexed pair
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    yield { type: 'swap', indices: [i, i + 1], codeLine: 8 }; // [8] Swap them
                    sorted = false; // [9] A swap occurred
                }
            }

            // Even phase: compare pairs at even indices (0,1), (2,3), ...
            for (let i = 0; i < n - 1; i += 2) {
                yield { type: 'compare', indices: [i, i + 1], codeLine: 11 }; // [11] Compare even-indexed pair
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    yield { type: 'swap', indices: [i, i + 1], codeLine: 12 }; // [12] Swap them
                    sorted = false; // [13] A swap occurred
                }
            }
        }

        // Mark all elements as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 14 }; // [14] Array is now sorted
        }
    }

    /**
     * Radix Sort generator (LSD — Least Significant Digit).
     *
     * Sorts integers by processing each digit position from least to most
     * significant. Uses a stable counting sort pass for each digit place
     * (ones, tens, hundreds, ...).
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     */
    function* radixSort(arr) {
        const n = arr.length;
        if (n === 0) return;

        const max = Math.max(...arr); // [2] Find the largest number

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) { // [4] Process each digit position
            const output = new Array(n).fill(0); // [5] Temporary output array
            const count = new Array(10).fill(0); // [6] Count array for digits 0-9

            // Count occurrences of each digit
            for (let i = 0; i < n; i++) {
                const digit = Math.floor(arr[i] / exp) % 10;
                count[digit]++;
                yield { type: 'compare', indices: [i], codeLine: 8 }; // [8] Reading the digit at this position
            }

            // Convert counts to cumulative positions
            for (let i = 1; i < 10; i++) {
                count[i] += count[i - 1]; // [9] Cumulative sum
            }

            // Build output array from right to left (preserves stability)
            for (let i = n - 1; i >= 0; i--) {
                const digit = Math.floor(arr[i] / exp) % 10;
                count[digit]--;
                output[count[digit]] = arr[i]; // [11] Place element in output
            }

            // Copy output back to arr and yield overwrite steps
            for (let i = 0; i < n; i++) {
                arr[i] = output[i];
                yield { type: 'overwrite', indices: [i], codeLine: 12 }; // [12] Writing sorted element back
            }
        }

        // Mark all elements as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 14 }; // [14] Array is now sorted
        }
    }

    /**
     * Bucket Sort generator.
     *
     * Distributes elements from the [0, 100] range into n equally-sized buckets,
     * sorts each non-empty bucket with insertion sort, then concatenates the
     * buckets back into the original array.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     */
    function* bucketSort(arr) {
        const n = arr.length;
        if (n === 0) return;

        const bucketSize = 101 / n; // [3] Divide [0,100] range into n buckets
        const buckets = Array.from({ length: n }, () => []); // [4] Create n empty buckets

        // Place each element into its corresponding bucket
        for (let i = 0; i < n; i++) {
            let b = Math.floor(arr[i] / bucketSize);
            if (b >= n) b = n - 1; // [6] Clamp to last bucket for boundary values
            buckets[b].push(arr[i]);
            yield { type: 'compare', indices: [i], codeLine: 7 }; // [7] Placing element into its bucket
        }

        // Sort each bucket with insertion sort and write back
        let k = 0;
        for (let b = 0; b < n; b++) {
            const bucket = buckets[b];

            // Insertion sort the bucket
            for (let i = 1; i < bucket.length; i++) {
                const key = bucket[i];
                let j = i - 1;
                while (j >= 0 && bucket[j] > key) {
                    bucket[j + 1] = bucket[j];
                    j--;
                }
                bucket[j + 1] = key; // [10] Sorted element placed in bucket
            }

            // Copy sorted bucket back to arr
            for (const val of bucket) {
                arr[k] = val;
                yield { type: 'overwrite', indices: [k], codeLine: 12 }; // [12] Writing element back to array
                k++;
            }
        }

        // Mark all elements as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 13 }; // [13] Array is now sorted
        }
    }

    /**
     * Tim Sort generator (simplified).
     *
     * A hybrid sort combining insertion sort for small runs and merge sort for
     * combining them. MIN_RUN scales with array size so small arrays use
     * appropriate run sizes. Yields compare and swap steps during insertion sort,
     * and overwrite steps during the merge phase.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     */
    function* timSort(arr) {
        const n = arr.length;
        if (n <= 1) return;

        const MIN_RUN = Math.max(4, Math.floor(n / 4)); // [3] Run size scales with array length

        // Phase 1: Sort each run using insertion sort
        for (let start = 0; start < n; start += MIN_RUN) { // [4] Process each run
            const end = Math.min(start + MIN_RUN - 1, n - 1); // [5] Find end of this run

            for (let i = start + 1; i <= end; i++) { // [6] Insertion sort the run
                const key = arr[i]; // [7] Pick element to insert
                let j = i - 1;

                yield { type: 'compare', indices: [i, j], codeLine: 8 }; // [8] Compare with sorted portion

                while (j >= start && arr[j] > key) {
                    arr[j + 1] = arr[j]; // [9] Shift element right
                    yield { type: 'swap', indices: [j + 1, j], codeLine: 9 }; // [9] Element shifted right
                    j--;
                    if (j >= start) {
                        yield { type: 'compare', indices: [i, j], codeLine: 8 }; // [8] Continue comparing
                    }
                }
                arr[j + 1] = key; // [10] Insert key in correct position
                yield { type: 'swap', indices: [j + 1], codeLine: 10 }; // [10] Key placed in position
            }
        }

        // Phase 2: Merge runs, doubling the run size each iteration
        for (let size = MIN_RUN; size < n; size *= 2) { // [12] Keep merging until fully sorted
            for (let left = 0; left < n; left += 2 * size) { // [13] Merge adjacent run pairs
                const mid = Math.min(left + size - 1, n - 1); // [14] Find midpoint
                const right = Math.min(left + 2 * size - 1, n - 1); // [15] Find right end

                if (mid >= right) continue; // [16] Only merge if a second run exists

                // Copy the two runs into temporary arrays
                const leftArr = arr.slice(left, mid + 1);
                const rightArr = arr.slice(mid + 1, right + 1);

                let i = 0, j = 0, k = left;

                while (i < leftArr.length && j < rightArr.length) {
                    yield { type: 'compare', indices: [left + i, mid + 1 + j], codeLine: 16 }; // [16] Comparing elements from two runs
                    if (leftArr[i] <= rightArr[j]) {
                        arr[k] = leftArr[i++];
                    } else {
                        arr[k] = rightArr[j++];
                    }
                    yield { type: 'overwrite', indices: [k], codeLine: 16 }; // [16] Placing merged element
                    k++;
                }

                // Copy remaining elements from left run
                while (i < leftArr.length) {
                    arr[k] = leftArr[i++];
                    yield { type: 'overwrite', indices: [k], codeLine: 16 }; // [16] Copying remaining left element
                    k++;
                }

                // Copy remaining elements from right run
                while (j < rightArr.length) {
                    arr[k] = rightArr[j++];
                    yield { type: 'overwrite', indices: [k], codeLine: 16 }; // [16] Copying remaining right element
                    k++;
                }
            }
        }

        // Mark all elements as sorted
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 18 }; // [18] Array is now sorted
        }
    }


export default { CODE, COMPLEXITY, gnomeSort, cocktailShakerSort, pancakeSort, combSort, oddEvenSort, radixSort, bucketSort, timSort };
