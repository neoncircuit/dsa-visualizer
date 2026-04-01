/**
 * Meme sorting algorithm generators and metadata.
 *
 * Includes bogoSort, thanosSort, and stalinSort — joke algorithms that demonstrate
 * absurd or destructive approaches to sorting.
 *
 * Each generator yields step objects:
 * { type: 'compare'|'swap'|'overwrite'|'sorted', indices: number[], codeLine: object }
 */

// ─── Code Snippets (per language) ───

const CODE = {
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

        sleepSort: {
            pseudo: [
                '# Sleep Sort: each element sleeps for time = its value',
                'procedure sleepSort(A):',
                '',
                '    n = length(A)  # [2] How many items are in the list',
                '    result = []  # [2] Collect results as threads finish',
                '',
                '    for each value v in A:  # [4] Launch a thread for each element',
                '        sleep(v)  # [5] Sleep for a duration equal to the value',
                '        append v to result  # [6] Wake up and record the value',
                '',
                '    copy result back to A  # [8] Write the sorted result back',
                '    return A  # [8] Give back the sorted list',
            ],
            python: [
                '# Sleep Sort: each element sleeps for time equal to its value',
                'def sleep_sort(arr: list[int]) -> list[int]:',
                '',
                '    import threading',
                '    result: list[int] = []  # [2] Collect values as threads finish',
                '',
                '    def thread_fn(v: int) -> None:',
                '        time.sleep(v)  # [5] Sleep for v seconds',
                '        result.append(v)  # [6] Wake up and record the value',
                '',
                '    threads = [threading.Thread(target=thread_fn, args=(v,))',
                '               for v in arr]  # [4] Create a thread for each element',
                '',
                '    for t in threads:',
                '        t.start()  # [4] Launch all threads',
                '    for t in threads:',
                '        t.join()  # [8] Wait for all threads to finish',
                '',
                '    arr[:] = result  # [8] Copy sorted result back',
                '    return arr',
            ],
            java: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'void sleepSort(int[] arr) throws InterruptedException {',
                '',
                '    List<Integer> result = new ArrayList<>();  // [2] Collect results as threads finish',
                '',
                '    List<Thread> threads = new ArrayList<>();',
                '    for (int v : arr) {  // [4] Create a thread for each element',
                '        final int val = v;',
                '        threads.add(new Thread(() -> {',
                '            try {',
                '                Thread.sleep(val);  // [5] Sleep for val milliseconds',
                '            } catch (InterruptedException e) {}',
                '            synchronized (result) { result.add(val); }  // [6] Wake up and record',
                '        }));',
                '    }',
                '',
                '    for (Thread t : threads) t.start();  // [4] Launch all threads',
                '    for (Thread t : threads) t.join();   // [8] Wait for all threads',
                '',
                '    for (int i = 0; i < arr.length; i++) arr[i] = result.get(i);  // [8] Copy back',
                '}',
            ],
            cpp: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'void sleepSort(vector<int>& arr) {',
                '',
                '    vector<int> result;  // [2] Collect results as threads finish',
                '    mutex mtx;',
                '',
                '    vector<thread> threads;',
                '    for (int v : arr) {  // [4] Create a thread for each element',
                '        threads.emplace_back([v, &result, &mtx]() {',
                '            this_thread::sleep_for(milliseconds(v));  // [5] Sleep for v ms',
                '            lock_guard<mutex> lock(mtx);',
                '            result.push_back(v);  // [6] Wake up and record',
                '        });',
                '    }',
                '',
                '    for (auto& t : threads) t.join();  // [8] Wait for all threads',
                '    arr = result;  // [8] Copy sorted result back',
                '}',
            ],
            javascript: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'function sleepSort(arr) {',
                '',
                '    const result = [];  // [2] Collect results as promises resolve',
                '',
                '    const promises = arr.map(v =>  // [4] Create a promise for each element',
                '        new Promise(resolve => {',
                '            setTimeout(() => {',
                '                result.push(v);  // [6] Wake up and record the value',
                '                resolve();',
                '            }, v);  // [5] Sleep for v milliseconds',
                '        })',
                '    );',
                '',
                '    return Promise.all(promises).then(() => {',
                '        arr.splice(0, arr.length, ...result);  // [8] Copy sorted result back',
                '        return arr;',
                '    });',
                '}',
            ],
            c: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'void sleepSort(int *arr, int n) {',
                '',
                '    // Requires POSIX threads',
                '    int result[n];  // [2] Collect results as threads finish',
                '    int idx = 0;',
                '',
                '    for (int i = 0; i < n; i++) {  // [4] Create a thread for each element',
                '        pthread_t t;',
                '        pthread_create(&t, NULL, thread_fn, &arr[i]);  // [4] Launch thread',
                '        // thread_fn: sleep(arr[i]), then append to result  // [5][6]',
                '    }',
                '',
                '    // Join all threads  // [8]',
                '    // Copy result back to arr  // [8]',
                '}',
            ],
            csharp: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'async Task SleepSort(int[] arr) {',
                '',
                '    var result = new System.Collections.Concurrent.ConcurrentBag<int>();  // [2]',
                '',
                '    var tasks = arr.Select(v => Task.Run(async () => {  // [4] Task per element',
                '        await Task.Delay(v);  // [5] Sleep for v milliseconds',
                '        result.Add(v);  // [6] Wake up and record',
                '    }));',
                '',
                '    await Task.WhenAll(tasks);  // [8] Wait for all tasks',
                '    var sorted = result.OrderBy(x => x).ToArray();',
                '    Array.Copy(sorted, arr, arr.Length);  // [8] Copy sorted result back',
                '}',
            ],
            typescript: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'async function sleepSort(arr: number[]): Promise<number[]> {',
                '',
                '    const result: number[] = [];  // [2] Collect results as promises resolve',
                '',
                '    const promises = arr.map((v: number) =>  // [4] Create a promise for each element',
                '        new Promise<void>(resolve => {',
                '            setTimeout(() => {',
                '                result.push(v);  // [6] Wake up and record the value',
                '                resolve();',
                '            }, v);  // [5] Sleep for v milliseconds',
                '        })',
                '    );',
                '',
                '    await Promise.all(promises);  // [8] Wait for all timeouts',
                '    arr.splice(0, arr.length, ...result);  // [8] Copy sorted result back',
                '    return arr;',
                '}',
            ],
            go: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'func sleepSort(arr []int) []int {',
                '',
                '    result := make([]int, 0, len(arr))  // [2] Collect results as goroutines finish',
                '    var mu sync.Mutex',
                '    var wg sync.WaitGroup',
                '',
                '    for _, v := range arr {  // [4] Launch a goroutine for each element',
                '        wg.Add(1)',
                '        go func(val int) {',
                '            defer wg.Done()',
                '            time.Sleep(time.Duration(val) * time.Millisecond)  // [5] Sleep for val ms',
                '            mu.Lock()',
                '            result = append(result, val)  // [6] Wake up and record',
                '            mu.Unlock()',
                '        }(v)',
                '    }',
                '',
                '    wg.Wait()  // [8] Wait for all goroutines',
                '    copy(arr, result)  // [8] Copy sorted result back',
                '    return arr',
                '}',
            ],
            rust: [
                '// Sleep Sort: each element sleeps for time equal to its value',
                'fn sleep_sort(arr: &mut Vec<i32>) {',
                '',
                '    use std::{sync::{Arc, Mutex}, thread, time::Duration};',
                '',
                '    let result = Arc::new(Mutex::new(Vec::new()));  // [2] Shared result buffer',
                '',
                '    let handles: Vec<_> = arr.iter().map(|&v| {  // [4] Spawn a thread per element',
                '        let result = Arc::clone(&result);',
                '        thread::spawn(move || {',
                '            thread::sleep(Duration::from_millis(v as u64));  // [5] Sleep for v ms',
                '            result.lock().unwrap().push(v);  // [6] Wake up and record',
                '        })',
                '    }).collect();',
                '',
                '    for h in handles { h.join().unwrap(); }  // [8] Wait for all threads',
                '    *arr = result.lock().unwrap().clone();  // [8] Copy sorted result back',
                '}',
            ],
        },

        miracleSort: {
            pseudo: [
                '# Miracle Sort: wait for cosmic rays to sort the array',
                'procedure miracleSort(A):',
                '',
                '    while not isSorted(A):  # [2] Keep checking if sorted',
                '        for i = 0 to length(A) - 2:  # [3] Scan each adjacent pair',
                '            compare A[i] and A[i+1]  # [4] Hope they are in order',
                '',
                '        wait for miracle  # [6] Cosmic intervention expected here',
                '',
                '    return A  # [8] Sorted by miracle',
            ],
            python: [
                '# Miracle Sort: wait for cosmic rays to sort the array',
                'def miracle_sort(arr: list[int]) -> list[int]:',
                '',
                '    def is_sorted(a: list[int]) -> bool:',
                '        return all(a[i] <= a[i+1] for i in range(len(a)-1))',
                '',
                '    while not is_sorted(arr):  # [2] Keep checking if sorted',
                '        for i in range(len(arr) - 1):  # [3] Scan each adjacent pair',
                '            _ = arr[i] <= arr[i + 1]  # [4] Hope they are in order',
                '',
                '        pass  # [6] Wait for a miracle (cosmic ray intervention)',
                '',
                '    return arr  # [8] Sorted by miracle',
            ],
            java: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'int[] miracleSort(int[] arr) {',
                '',
                '    while (!isSorted(arr)) {  // [2] Keep checking if sorted',
                '        for (int i = 0; i < arr.length - 1; i++) {  // [3] Scan each adjacent pair',
                '            boolean _ = arr[i] <= arr[i + 1];  // [4] Hope they are in order',
                '        }',
                '        // wait for miracle  // [6] Cosmic intervention expected',
                '    }',
                '',
                '    return arr;  // [8] Sorted by miracle',
                '}',
            ],
            cpp: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'void miracleSort(vector<int>& arr) {',
                '',
                '    while (!isSorted(arr)) {  // [2] Keep checking if sorted',
                '        for (int i = 0; i < arr.size() - 1; i++) {  // [3] Scan each adjacent pair',
                '            (void)(arr[i] <= arr[i + 1]);  // [4] Hope they are in order',
                '        }',
                '        // wait for miracle  // [6] Cosmic intervention expected',
                '    }',
                '}',
            ],
            javascript: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'function miracleSort(arr) {',
                '',
                '    const isSorted = a => a.every((v, i) => i === 0 || a[i - 1] <= v);',
                '',
                '    while (!isSorted(arr)) {  // [2] Keep checking if sorted',
                '        for (let i = 0; i < arr.length - 1; i++) {  // [3] Scan each adjacent pair',
                '            void (arr[i] <= arr[i + 1]);  // [4] Hope they are in order',
                '        }',
                '        // wait for miracle  // [6] Cosmic intervention expected',
                '    }',
                '',
                '    return arr;  // [8] Sorted by miracle',
                '}',
            ],
            c: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'void miracleSort(int *arr, int n) {',
                '',
                '    while (!isSorted(arr, n)) {  // [2] Keep checking if sorted',
                '        for (int i = 0; i < n - 1; i++) {  // [3] Scan each adjacent pair',
                '            (void)(arr[i] <= arr[i + 1]);  // [4] Hope they are in order',
                '        }',
                '        /* wait for miracle */  // [6] Cosmic intervention expected',
                '    }',
                '}',
            ],
            csharp: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'int[] MiracleSort(int[] arr) {',
                '',
                '    bool IsSorted(int[] a) => Enumerable.Range(0, a.Length - 1)',
                '                                         .All(i => a[i] <= a[i + 1]);',
                '',
                '    while (!IsSorted(arr)) {  // [2] Keep checking if sorted',
                '        for (int i = 0; i < arr.Length - 1; i++) {  // [3] Scan each adjacent pair',
                '            _ = arr[i] <= arr[i + 1];  // [4] Hope they are in order',
                '        }',
                '        // wait for miracle  // [6] Cosmic intervention expected',
                '    }',
                '',
                '    return arr;  // [8] Sorted by miracle',
                '}',
            ],
            typescript: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'function miracleSort(arr: number[]): number[] {',
                '',
                '    const isSorted = (a: number[]): boolean =>',
                '        a.every((v: number, i: number) => i === 0 || a[i - 1] <= v);',
                '',
                '    while (!isSorted(arr)) {  // [2] Keep checking if sorted',
                '        for (let i: number = 0; i < arr.length - 1; i++) {  // [3] Scan each adjacent pair',
                '            void (arr[i] <= arr[i + 1]);  // [4] Hope they are in order',
                '        }',
                '        // wait for miracle  // [6] Cosmic intervention expected',
                '    }',
                '',
                '    return arr;  // [8] Sorted by miracle',
                '}',
            ],
            go: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'func miracleSort(arr []int) []int {',
                '',
                '    isSorted := func(a []int) bool {',
                '        for i := 0; i < len(a)-1; i++ {',
                '            if a[i] > a[i+1] { return false }',
                '        }',
                '        return true',
                '    }',
                '',
                '    for !isSorted(arr) {  // [2] Keep checking if sorted',
                '        for i := 0; i < len(arr)-1; i++ {  // [3] Scan each adjacent pair',
                '            _ = arr[i] <= arr[i+1]  // [4] Hope they are in order',
                '        }',
                '        // wait for miracle  // [6] Cosmic intervention expected',
                '    }',
                '',
                '    return arr  // [8] Sorted by miracle',
                '}',
            ],
            rust: [
                '// Miracle Sort: wait for cosmic rays to sort the array',
                'fn miracle_sort(arr: &mut Vec<i32>) {',
                '',
                '    let is_sorted = |a: &Vec<i32>| -> bool {',
                '        a.windows(2).all(|w| w[0] <= w[1])',
                '    };',
                '',
                '    while !is_sorted(arr) {  // [2] Keep checking if sorted',
                '        for i in 0..arr.len() - 1 {  // [3] Scan each adjacent pair',
                '            let _ = arr[i] <= arr[i + 1];  // [4] Hope they are in order',
                '        }',
                '        // wait for miracle  // [6] Cosmic intervention expected',
                '    }',
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
            realWorld:
                'No real-world applications exist. Bogo Sort is a teaching tool used to illustrate why ' +
                'algorithm analysis matters and why random shuffling is not a viable sorting strategy. ' +
                'Sometimes used as a benchmark for "worst possible sort" in computer science education ' +
                'and April Fools\' day code submissions.',
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
            realWorld:
                'No real-world applications exist. Thanos Sort is a humorous take on the idea of reducing ' +
                'problem size by removing data. The name references the Marvel villain who erased half of ' +
                'all life. Occasionally referenced in tech talks about data loss and the importance of ' +
                'backup strategies.',
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
            realWorld:
                'No real-world applications exist. Stalin Sort is a satirical algorithm that removes elements ' +
                'violating sorted order rather than rearranging them. Used as a joke in programming communities ' +
                'and to illustrate the difference between sorting and filtering. The name references the ' +
                'Soviet leader\'s practice of erasing people from photographs.',
        },


        sleepSort: {
            name: 'Sleep Sort',
            best: 'O(n)',
            average: 'O(n log n)',
            worst: 'O(n * max)',
            space: 'O(max)',
            description:
                'Creates a separate thread for each value that sleeps for value milliseconds. ' +
                'When a thread wakes, it appends its value to the result. ' +
                'The result is naturally sorted by wake-up time.',
            useCase:
                'Use when you want to demonstrate the absurdity of exploiting language features ' +
                'instead of using proper algorithms. Great for April Fools jokes.',
            avoid:
                'Avoid for any real sorting task. The timing depends on the maximum value, ' +
                'and thread scheduling is unpredictable. This is a novelty algorithm.',
            realWorld:
                'No real-world applications exist. Sleep Sort is a novelty algorithm that exploits ' +
                'concurrent timers. However, the concept of value-proportional scheduling appears in ' +
                'some real-time systems where tasks are prioritized by urgency. Used in programming ' +
                'education to teach concurrency concepts.',
        },


        miracleSort: {
            name: 'Miracle Sort',
            best: 'O(n)',
            average: 'O(?)',
            worst: 'O(∞)',
            space: 'O(1)',
            description:
                'Checks if the array is sorted. If not, waits and checks again, hoping for a miracle. ' +
                'Relies on cosmic rays, quantum fluctuations, or divine intervention to sort the array.',
            useCase:
                'Use when you have exhausted all conventional algorithms and turned to faith-based computing. ' +
                'Sometimes arrays sort themselves through sheer optimism.',
            avoid:
                'Avoid when you have deadlines. The probability of a miracle occurring is inversely ' +
                'proportional to how badly you need the array sorted. Not recommended for production.',
            realWorld:
                'No real-world applications exist. Miracle Sort is a joke about waiting for cosmic rays ' +
                '(radiation-induced bit flips) to sort data. However, the concept of relying on ' +
                'environmental interference is analogous to "waiting for a monkey to type Shakespeare." ' +
                'Used to illustrate that algorithms must actively solve problems rather than passively waiting.',
        },

};

// ─── Generator Functions ───

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


    /**
     * Sleep Sort generator.
     *
     * Simulates the thread-sleep approach: shows all elements launching as threads,
     * then places each element into its sorted position in value order, yielding
     * searching (sleeping), overwrite (waking), and sorted steps.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     */
    function* sleepSort(arr) {
        const n = arr.length;

        // Show all elements as "threads starting"
        for (let i = 0; i < n; i++) {
            yield { type: 'compare', indices: [i], codeLine: 4 };
        }

        // Build sorted order by value (simulate threads waking by value order)
        const indexed = arr.map((v, i) => ({ v, i })).sort((a, b) => a.v - b.v);
        const result = [];

        for (const { v } of indexed) {
            yield { type: 'searching', indices: [result.length], codeLine: 5 };
            result.push(v);
            arr[result.length - 1] = v;
            yield { type: 'overwrite', indices: [result.length - 1], codeLine: 6 };
            yield { type: 'sorted', indices: [result.length - 1], codeLine: 8 };
        }
    }

    /**
     * Miracle Sort generator.
     *
     * Simulates the cosmic-ray approach: repeatedly scans adjacent pairs hoping
     * for a miracle. After a fixed number of futile passes the miracle happens
     * and the array is sorted, marking all elements sorted.
     *
     * @param {number[]} arr - The array to sort (mutated in place).
     * @yields {{ type: string, indices: number[], codeLine: number }} Step object.
     */
    function* miracleSort(arr) {
        const n = arr.length;
        const MAX_MIRACLES = 3;

        for (let pass = 0; pass < MAX_MIRACLES; pass++) {
            // Scan adjacent pairs — hoping for a miracle
            for (let i = 0; i < n - 1; i++) {
                yield { type: 'compare', indices: [i, i + 1], codeLine: 4 };
            }
            yield { type: 'notFound', indices: [], codeLine: 6 };
        }

        // The miracle happens — sort it
        arr.sort((a, b) => a - b);
        for (let i = 0; i < n; i++) {
            yield { type: 'sorted', indices: [i], codeLine: 8 };
        }
    }


export default { CODE, COMPLEXITY, bogoSort, thanosSort, stalinSort, sleepSort, miracleSort };
