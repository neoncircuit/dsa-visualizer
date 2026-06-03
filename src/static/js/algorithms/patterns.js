/**
 * Pattern-based Algorithms for Interview Preparation
 *
 * Implements algorithms based on common LeetCode patterns:
 * - Sliding Window
 * - Prefix Sum
 * - Monotonic Stack
 * - Overlapping Intervals
 *
 * @module PatternAlgorithms
 */

const PatternAlgorithms = (() => {
    'use strict';

    // ─── Sliding Window: Maximum Sum of Subarray of Size K ───

    const CODE = {
        slidingWindowMaxSum: {
            pseudo: [
                '# Step 1: Initialize window with first k elements',
                'function maxSumSubarray(arr, k):',
                '',
                '    n = length(arr)',
                '    if n < k:',
                '        return None  # Not enough elements',
                '',
                '    window_sum = sum of first k elements  # [1] Initialize window',
                '    max_sum = window_sum  # [2] Track maximum',
                '',
                '    for i from k to n-1:  # [3] Slide window',
                '        window_sum = window_sum - arr[i-k] + arr[i]  # [4] Update window',
                '        max_sum = max(max_sum, window_sum)  # [5] Update maximum',
                '',
                '    return max_sum  # [6] Return result',
            ],
            python: [
                '# Step 1: Initialize window with first k elements',
                'def max_sum_subarray(arr: list[int], k: int) -> int:',
                '',
                '    n = len(arr)',
                '    if n < k:',
                '        return None  # Not enough elements',
                '',
                '    window_sum = sum(arr[:k])  # [1] Initialize window',
                '    max_sum = window_sum  # [2] Track maximum',
                '',
                '    for i in range(k, n):  # [3] Slide window',
                '        window_sum = window_sum - arr[i-k] + arr[i]  # [4] Update window',
                '        max_sum = max(max_sum, window_sum)  # [5] Update maximum',
                '',
                '    return max_sum  # [6] Return result',
            ],
            java: [
                '// Step 1: Initialize window with first k elements',
                'public int maxSumSubarray(int[] arr, int k) {',
                '',
                '    int n = arr.length;',
                '    if (n < k) return -1;  // Not enough elements',
                '',
                '    int windowSum = 0;',
                '    for (int i = 0; i < k; i++) {',
                '        windowSum += arr[i];  // [1] Initialize window',
                '    }',
                '    int maxSum = windowSum;  // [2] Track maximum',
                '',
                '    for (int i = k; i < n; i++) {  // [3] Slide window',
                '        windowSum = windowSum - arr[i-k] + arr[i];  // [4] Update window',
                '        maxSum = Math.max(maxSum, windowSum);  // [5] Update maximum',
                '    }',
                '',
                '    return maxSum;  // [6] Return result',
                '}',
            ],
            c: [
                '// Step 1: Initialize window with first k elements',
                'int maxSumSubarray(int* arr, int n, int k) {',
                '',
                '    if (n < k) return -1;  // Not enough elements',
                '',
                '    int windowSum = 0;',
                '    for (int i = 0; i < k; i++) {',
                '        windowSum += arr[i];  // [1] Initialize window',
                '    }',
                '    int maxSum = windowSum;  // [2] Track maximum',
                '',
                '    for (int i = k; i < n; i++) {  // [3] Slide window',
                '        windowSum = windowSum - arr[i-k] + arr[i];  // [4] Update window',
                '        if (windowSum > maxSum) maxSum = windowSum;  // [5] Update maximum',
                '    }',
                '',
                '    return maxSum;  // [6] Return result',
                '}',
            ],
            csharp: [
                '// Step 1: Initialize window with first k elements',
                'public int MaxSumSubarray(int[] arr, int k) {',
                '',
                '    int n = arr.Length;',
                '    if (n < k) return -1;  // Not enough elements',
                '',
                '    int windowSum = 0;',
                '    for (int i = 0; i < k; i++) {',
                '        windowSum += arr[i];  // [1] Initialize window',
                '    }',
                '    int maxSum = windowSum;  // [2] Track maximum',
                '',
                '    for (int i = k; i < n; i++) {  // [3] Slide window',
                '        windowSum = windowSum - arr[i-k] + arr[i];  // [4] Update window',
                '        maxSum = Math.Max(maxSum, windowSum);  // [5] Update maximum',
                '    }',
                '',
                '    return maxSum;  // [6] Return result',
                '}',
            ],
            javascript: [
                '// Step 1: Initialize window with first k elements',
                'function maxSumSubarray(arr, k) {',
                '',
                '    const n = arr.length;',
                '    if (n < k) return null;  // Not enough elements',
                '',
                '    let windowSum = 0;',
                '    for (let i = 0; i < k; i++) {',
                '        windowSum += arr[i];  // [1] Initialize window',
                '    }',
                '    let maxSum = windowSum;  // [2] Track maximum',
                '',
                '    for (let i = k; i < n; i++) {  // [3] Slide window',
                '        windowSum = windowSum - arr[i-k] + arr[i];  // [4] Update window',
                '        maxSum = Math.max(maxSum, windowSum);  // [5] Update maximum',
                '    }',
                '',
                '    return maxSum;  // [6] Return result',
                '}',
            ],
        },
        prefixSumRangeSum: {
            pseudo: [
                '# Step 1: Build prefix sum array where prefix[i] = sum of arr[0..i]',
                'function rangeSum(arr, left, right):',
                '',
                '    n = length(arr)',
                '    prefix = array of size n  # [1] Create prefix array',
                '    prefix[0] = arr[0]',
                '',
                '    for i from 1 to n-1:  # [2] Build prefix sums',
                '        prefix[i] = prefix[i-1] + arr[i]',
                '',
                '    # Answer range sum query in O(1)',
                '    if left == 0:',
                '        return prefix[right]  # [3] Left edge case',
                '    else:',
                '        return prefix[right] - prefix[left-1]  # [4] Use formula',
            ],
            python: [
                '# Step 1: Build prefix sum array where prefix[i] = sum of arr[0..i]',
                'def range_sum(arr: list[int], left: int, right: int) -> int:',
                '',
                '    n = len(arr)',
                '    prefix = [0] * n  # [1] Create prefix array',
                '    prefix[0] = arr[0]',
                '',
                '    for i in range(1, n):  # [2] Build prefix sums',
                '        prefix[i] = prefix[i-1] + arr[i]',
                '',
                '    # Answer range sum query in O(1)',
                '    if left == 0:',
                '        return prefix[right]  # [3] Left edge case',
                '    else:',
                '        return prefix[right] - prefix[left-1]  # [4] Use formula',
            ],
            java: [
                '// Step 1: Build prefix sum array where prefix[i] = sum of arr[0..i]',
                'public int rangeSum(int[] arr, int left, int right) {',
                '',
                '    int n = arr.length;',
                '    int[] prefix = new int[n];  // [1] Create prefix array',
                '    prefix[0] = arr[0];',
                '',
                '    for (int i = 1; i < n; i++) {  // [2] Build prefix sums',
                '        prefix[i] = prefix[i-1] + arr[i];',
                '    }',
                '',
                '    // Answer range sum query in O(1)',
                '    if (left == 0) {',
                '        return prefix[right];  // [3] Left edge case',
                '    } else {',
                '        return prefix[right] - prefix[left-1];  // [4] Use formula',
                '    }',
                '}',
            ],
            c: [
                '// Step 1: Build prefix sum array where prefix[i] = sum of arr[0..i]',
                'int rangeSum(int* arr, int n, int left, int right) {',
                '',
                '    int* prefix = malloc(n * sizeof(int));',
                '    prefix[0] = arr[0];',
                '',
                '    for (int i = 1; i < n; i++) {  // [2] Build prefix sums',
                '        prefix[i] = prefix[i-1] + arr[i];',
                '    }',
                '',
                '    // Answer range sum query in O(1)',
                '    if (left == 0) {',
                '        return prefix[right];  // [3] Left edge case',
                '    } else {',
                '        return prefix[right] - prefix[left-1];  // [4] Use formula',
                '    }',
                '}',
            ],
            csharp: [
                '// Step 1: Build prefix sum array where prefix[i] = sum of arr[0..i]',
                'public int RangeSum(int[] arr, int left, int right) {',
                '',
                '    int n = arr.Length;',
                '    int[] prefix = new int[n];  // [1] Create prefix array',
                '    prefix[0] = arr[0];',
                '',
                '    for (int i = 1; i < n; i++) {  // [2] Build prefix sums',
                '        prefix[i] = prefix[i-1] + arr[i];',
                '    }',
                '',
                '    // Answer range sum query in O(1)',
                '    if (left == 0) {',
                '        return prefix[right];  // [3] Left edge case',
                '    } else {',
                '        return prefix[right] - prefix[left-1];  // [4] Use formula',
                '    }',
                '}',
            ],
            javascript: [
                '// Step 1: Build prefix sum array where prefix[i] = sum of arr[0..i]',
                'function rangeSum(arr, left, right) {',
                '',
                '    const n = arr.length;',
                '    const prefix = new Array(n);  // [1] Create prefix array',
                '    prefix[0] = arr[0];',
                '',
                '    for (let i = 1; i < n; i++) {  // [2] Build prefix sums',
                '        prefix[i] = prefix[i-1] + arr[i];',
                '    }',
                '',
                '    // Answer range sum query in O(1)',
                '    if (left === 0) {',
                '        return prefix[right];  // [3] Left edge case',
                '    } else {',
                '        return prefix[right] - prefix[left-1];  // [4] Use formula',
                '    }',
                '}',
            ],
        },
        monotonicStackNextGreater: {
            pseudo: [
                '# Step 1: Use stack to track indices of elements waiting for next greater',
                'function nextGreater(arr):',
                '',
                '    n = length(arr)',
                '    result = array filled with -1  # [1] Initialize result',
                '    stack = empty stack  # [2] Initialize stack',
                '',
                '    for i from 0 to n-1:  # [3] Iterate through array',
                '        while stack not empty AND arr[i] > arr[stack.top]:  # [4] Found greater element',
                '            idx = stack.pop()  # [5] Pop smaller element',
                '            result[idx] = arr[i]  # [6] Update result',
                '        stack.push(i)  # [7] Push current index',
                '',
                '    return result  # [8] Return result array',
            ],
            python: [
                '# Step 1: Use stack to track indices of elements waiting for next greater',
                'def next_greater(arr: list[int]) -> list[int]:',
                '',
                '    n = len(arr)',
                '    result = [-1] * n  # [1] Initialize result',
                '    stack = []  # [2] Initialize stack',
                '',
                '    for i in range(n):  # [3] Iterate through array',
                '        while stack and arr[i] > arr[stack[-1]]:  # [4] Found greater element',
                '            idx = stack.pop()  # [5] Pop smaller element',
                '            result[idx] = arr[i]  # [6] Update result',
                '        stack.append(i)  # [7] Push current index',
                '',
                '    return result  # [8] Return result array',
            ],
            java: [
                '// Step 1: Use stack to track indices of elements waiting for next greater',
                'public int[] nextGreater(int[] arr) {',
                '',
                '    int n = arr.length;',
                '    int[] result = new int[n];',
                '    Arrays.fill(result, -1);  // [1] Initialize result',
                '    Deque<Integer> stack = new ArrayDeque<>();  // [2] Initialize stack',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Iterate through array',
                '        while (!stack.isEmpty() && arr[i] > arr[stack.peek()]) {  // [4] Found greater element',
                '            int idx = stack.pop();  // [5] Pop smaller element',
                '            result[idx] = arr[i];  // [6] Update result',
                '        }',
                '        stack.push(i);  // [7] Push current index',
                '    }',
                '',
                '    return result;  // [8] Return result array',
                '}',
            ],
            c: [
                '// Step 1: Use stack to track indices of elements waiting for next greater',
                'int* next_greater(int* arr, int n) {',
                '',
                '    int* result = malloc(n * sizeof(int));',
                '    for (int i = 0; i < n; i++) result[i] = -1;  // [1] Initialize result',
                '    int* stack = malloc(n * sizeof(int));',
                '    int stack_top = -1;',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Iterate through array',
                '        while (stack_top >= 0 && arr[i] > arr[stack[stack_top]]) {  // [4] Found greater',
                '            int idx = stack[stack_top--];  // [5] Pop element',
                '            result[idx] = arr[i];  // [6] Update result',
                '        }',
                '        stack[++stack_top] = i;  // [7] Push current index',
                '    }',
                '    return result;  // [8] Return result',
                '}',
            ],
            csharp: [
                '// Step 1: Use stack to track indices of elements waiting for next greater',
                'public int[] NextGreater(int[] arr) {',
                '',
                '    int n = arr.Length;',
                '    int[] result = new int[n];',
                '    for (int i = 0; i < n; i++) result[i] = -1;  // [1] Initialize result',
                '    Stack<int> stack = new Stack<int>();  // [2] Initialize stack',
                '',
                '    for (int i = 0; i < n; i++) {  // [3] Iterate through array',
                '        while (stack.Count > 0 && arr[i] > arr[stack.Peek()]) {  // [4] Found greater',
                '            int idx = stack.Pop();  // [5] Pop element',
                '            result[idx] = arr[i];  // [6] Update result',
                '        }',
                '        stack.Push(i);  // [7] Push current index',
                '    }',
                '    return result;  // [8] Return result',
                '}',
            ],
            javascript: [
                '// Step 1: Use stack to track indices of elements waiting for next greater',
                'function nextGreater(arr) {',
                '',
                '    const n = arr.length;',
                '    const result = new Array(n).fill(-1);  // [1] Initialize result',
                '    const stack = [];  // [2] Initialize stack',
                '',
                '    for (let i = 0; i < n; i++) {  // [3] Iterate through array',
                '        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {  // [4] Found greater',
                '            const idx = stack.pop();  // [5] Pop element',
                '            result[idx] = arr[i];  // [6] Update result',
                '        }',
                '        stack.push(i);  // [7] Push current index',
                '    }',
                '    return result;  // [8] Return result',
                '}',
            ],
        },
        overlappingIntervalsMerge: {
            pseudo: [
                '# Step 1: Sort intervals by start time',
                'function mergeIntervals(intervals):',
                '',
                '    if intervals is empty:',
                '        return []  # [1] Handle empty input',
                '',
                '    sort intervals by start time  # [2] Sort intervals',
                '',
                '    merged = []  # [3] Initialize result',
                '    for interval in intervals:',
                '        if merged is empty OR merged.last.end < interval.start:',
                '            merged.append(interval)  # [4] No overlap, add as new',
                '        else:',
                '            merged.last.end = max(merged.last.end, interval.end)  # [5] Merge intervals',
                '',
                '    return merged  # [6] Return result',
            ],
            python: [
                '# Step 1: Sort intervals by start time',
                'def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:',
                '',
                '    if not intervals:  # [1] Handle empty input',
                '        return []',
                '',
                '    intervals.sort(key=lambda x: x[0])  # [2] Sort intervals',
                '',
                '    merged = []  # [3] Initialize result',
                '    for interval in intervals:',
                '        if not merged or merged[-1][1] < interval[0]:  # [4] No overlap',
                '            merged.append(interval)  # [5] Add as new interval',
                '        else:',
                '            merged[-1][1] = max(merged[-1][1], interval[1])  # [6] Merge intervals',
                '',
                '    return merged  # [7] Return result',
            ],
            java: [
                '// Step 1: Sort intervals by start time',
                'public List<int[]> mergeIntervals(int[][] intervals) {',
                '',
                '    if (intervals.length == 0) {  // [1] Handle empty input',
                '        return new ArrayList<>();',
                '    }',
                '',
                '    // [2] Sort intervals by start time',
                '    Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));',
                '',
                '    List<int[]> merged = new ArrayList<>();  // [3] Initialize result',
                '    for (int[] interval : intervals) {',
                '        if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {  // [4] No overlap',
                '            merged.add(interval);  // [5] Add as new interval',
                '        } else {',
                '            merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);  // [6] Merge intervals',
                '        }',
                '    }',
                '',
                '    return merged;  // [7] Return result',
                '}',
            ],
            c: [
                '// Step 1: Sort intervals by start time',
                'int** mergeIntervals(int** intervals, int num_intervals) {',
                '',
                '    if (num_intervals == 0) {  // [1] Handle empty input',
                '        return NULL;',
                '    }',
                '',
                '    // [2] Sort intervals by start time',
                '    qsort(intervals, num_intervals, sizeof(int*), compareIntervals);',
                '',
                '    int** merged = malloc(num_intervals * sizeof(int*));',
                '    int merged_count = 0;',
                '    for (int i = 0; i < num_intervals; i++) {',
                '        if (merged_count == 0 || merged[merged_count - 1][1] < intervals[i][0]) {  // [4] No overlap',
                '            merged[merged_count++] = intervals[i];  // [5] Add as new interval',
                '        } else {',
                '            merged[merged_count - 1][1] = MAX(merged[merged_count - 1][1], intervals[i][1]);  // [6] Merge intervals',
                '        }',
                '    }',
                '    return merged;',
                '}',
            ],
            csharp: [
                '// Step 1: Sort intervals by start time',
                'public List<int[]> MergeIntervals(int[][] intervals) {',
                '',
                '    if (intervals.Length == 0) {  // [1] Handle empty input',
                '        return new List<int[]>();',
                '    }',
                '',
                '    // [2] Sort intervals by start time',
                '    Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));',
                '',
                '    List<int[]> merged = new List<int[]>();  // [3] Initialize result',
                '    foreach (var interval in intervals) {',
                '        if (merged.Count == 0 || merged[merged.Count - 1][1] < interval[0]) {  // [4] No overlap',
                '            merged.Add(interval);  // [5] Add as new interval',
                '        } else {',
                '            merged[merged.Count - 1][1] = Math.Max(merged[merged.Count - 1][1], interval[1]);  // [6] Merge intervals',
                '        }',
                '    }',
                '',
                '    return merged;  // [7] Return result',
                '}',
            ],
            javascript: [
                '// Step 1: Sort intervals by start time',
                'function mergeIntervals(intervals) {',
                '',
                '    if (!intervals || intervals.length === 0) {  // [1] Handle empty input',
                '        return [];',
                '    }',
                '',
                '    // [2] Sort intervals by start time',
                '    intervals.sort((a, b) => a[0] - b[0]);',
                '',
                '    const merged = [];  // [3] Initialize result',
                '    for (const interval of intervals) {',
                '        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {  // [4] No overlap',
                '            merged.push(interval);  // [5] Add as new interval',
                '        } else {',
                '            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);  // [6] Merge intervals',
                '        }',
                '    }',
                '',
                '    return merged;  // [7] Return result',
                '}',
            ],
        },
        twoPointersTargetSum: {
            pseudo: [
                '# Step 1: Sort array, then use two pointers from both ends',
                'function twoSumSorted(arr, target):',
                '',
                '    left = 0  # [1] Left pointer at start',
                '    right = length(arr) - 1  # [2] Right pointer at end',
                '',
                '    while left < right:  # [3] Pointers have not crossed',
                '        current_sum = arr[left] + arr[right]  # [4] Compute sum',
                '',
                '        if current_sum == target:  # [5] Found pair',
                '            return [left, right]',
                '        else if current_sum < target:  # [6] Need larger sum',
                '            left = left + 1  # [7] Move left pointer right',
                '        else:  # [8] Need smaller sum',
                '            right = right - 1  # [9] Move right pointer left',
                '',
                '    return None  # [10] No pair found',
            ],
            python: [
                '# Step 1: Sort array, then use two pointers from both ends',
                'def two_sum_sorted(arr: list[int], target: int) -> list[int] | None:',
                '',
                '    left = 0  # [1] Left pointer at start',
                '    right = len(arr) - 1  # [2] Right pointer at end',
                '',
                '    while left < right:  # [3] Pointers have not crossed',
                '        current_sum = arr[left] + arr[right]  # [4] Compute sum',
                '',
                '        if current_sum == target:  # [5] Found pair',
                '            return [left, right]',
                '        elif current_sum < target:  # [6] Need larger sum',
                '            left += 1  # [7] Move left pointer right',
                '        else:  # [8] Need smaller sum',
                '            right -= 1  # [9] Move right pointer left',
                '',
                '    return None  # [10] No pair found',
            ],
            java: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'public int[] twoSumSorted(int[] arr, int target) {',
                '',
                '    int left = 0;  // [1] Left pointer at start',
                '    int right = arr.length - 1;  // [2] Right pointer at end',
                '',
                '    while (left < right) {  // [3] Pointers have not crossed',
                '        int currentSum = arr[left] + arr[right];  // [4] Compute sum',
                '',
                '        if (currentSum == target) {  // [5] Found pair',
                '            return new int[]{left, right};',
                '        } else if (currentSum < target) {  // [6] Need larger sum',
                '            left++;  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right--;  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return null;  // [10] No pair found',
                '}',
            ],
            c: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'int* twoSumSorted(int* arr, int n, int target) {',
                '',
                '    int left = 0;  // [1] Left pointer at start',
                '    int right = n - 1;  // [2] Right pointer at end',
                '',
                '    while (left < right) {  // [3] Pointers have not crossed',
                '        int currentSum = arr[left] + arr[right];  // [4] Compute sum',
                '',
                '        if (currentSum == target) {  // [5] Found pair',
                '            int* result = malloc(2 * sizeof(int));',
                '            result[0] = left; result[1] = right;',
                '            return result;',
                '        } else if (currentSum < target) {  // [6] Need larger sum',
                '            left++;  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right--;  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return NULL;  // [10] No pair found',
                '}',
            ],
            cpp: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'vector<int> twoSumSorted(vector<int>& arr, int target) {',
                '',
                '    int left = 0;  // [1] Left pointer at start',
                '    int right = arr.size() - 1;  // [2] Right pointer at end',
                '',
                '    while (left < right) {  // [3] Pointers have not crossed',
                '        int currentSum = arr[left] + arr[right];  // [4] Compute sum',
                '',
                '        if (currentSum == target) {  // [5] Found pair',
                '            return {left, right};',
                '        } else if (currentSum < target) {  // [6] Need larger sum',
                '            left++;  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right--;  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return {};  // [10] No pair found',
                '}',
            ],
            csharp: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'public int[] TwoSumSorted(int[] arr, int target) {',
                '',
                '    int left = 0;  // [1] Left pointer at start',
                '    int right = arr.Length - 1;  // [2] Right pointer at end',
                '',
                '    while (left < right) {  // [3] Pointers have not crossed',
                '        int currentSum = arr[left] + arr[right];  // [4] Compute sum',
                '',
                '        if (currentSum == target) {  // [5] Found pair',
                '            return new int[] { left, right };',
                '        } else if (currentSum < target) {  // [6] Need larger sum',
                '            left++;  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right--;  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return null;  // [10] No pair found',
                '}',
            ],
            javascript: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'function twoSumSorted(arr, target) {',
                '',
                '    let left = 0;  // [1] Left pointer at start',
                '    let right = arr.length - 1;  // [2] Right pointer at end',
                '',
                '    while (left < right) {  // [3] Pointers have not crossed',
                '        const currentSum = arr[left] + arr[right];  // [4] Compute sum',
                '',
                '        if (currentSum === target) {  // [5] Found pair',
                '            return [left, right];',
                '        } else if (currentSum < target) {  // [6] Need larger sum',
                '            left++;  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right--;  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return null;  // [10] No pair found',
                '}',
            ],
            typescript: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'function twoSumSorted(arr: number[], target: number): number[] | null {',
                '',
                '    let left = 0;  // [1] Left pointer at start',
                '    let right = arr.length - 1;  // [2] Right pointer at end',
                '',
                '    while (left < right) {  // [3] Pointers have not crossed',
                '        const currentSum = arr[left] + arr[right];  // [4] Compute sum',
                '',
                '        if (currentSum === target) {  // [5] Found pair',
                '            return [left, right];',
                '        } else if (currentSum < target) {  // [6] Need larger sum',
                '            left++;  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right--;  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return null;  // [10] No pair found',
                '}',
            ],
            go: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'func twoSumSorted(arr []int, target int) []int {',
                '',
                '    left := 0  // [1] Left pointer at start',
                '    right := len(arr) - 1  // [2] Right pointer at end',
                '',
                '    for left < right {  // [3] Pointers have not crossed',
                '        currentSum := arr[left] + arr[right]  // [4] Compute sum',
                '',
                '        if currentSum == target {  // [5] Found pair',
                '            return []int{left, right}',
                '        } else if currentSum < target {  // [6] Need larger sum',
                '            left++  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right--  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return nil  // [10] No pair found',
                '}',
            ],
            rust: [
                '// Step 1: Sort array, then use two pointers from both ends',
                'fn two_sum_sorted(arr: &[i32], target: i32) -> Option<(usize, usize)> {',
                '',
                '    let mut left = 0;  // [1] Left pointer at start',
                '    let mut right = arr.len() - 1;  // [2] Right pointer at end',
                '',
                '    while left < right {  // [3] Pointers have not crossed',
                '        let current_sum = arr[left] + arr[right];  // [4] Compute sum',
                '',
                '        if current_sum == target {  // [5] Found pair',
                '            return Some((left, right));',
                '        } else if current_sum < target {  // [6] Need larger sum',
                '            left += 1;  // [7] Move left pointer right',
                '        } else {  // [8] Need smaller sum',
                '            right -= 1;  // [9] Move right pointer left',
                '        }',
                '    }',
                '',
                '    return None;  // [10] No pair found',
                '}',
            ],
        },
    };

    const COMPLEXITY = {
        slidingWindowMaxSum: {
            name: 'Sliding Window - Max Sum Subarray (Size K)',
            best: 'O(k)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Find the maximum sum of any subarray of size k using the sliding window technique. ' +
                'Instead of recalculating the sum for every subarray (which would be O(n*k)), ' +
                'we maintain a running sum of the current window. As we slide the window one element to the right, ' +
                'we subtract the element leaving the window and add the new element entering. This reduces the time ' +
                'complexity from O(n*k) to O(n) since we only touch each element once.',
            useCase:
                'Use when you need to find the maximum/minimum sum of a subarray of a fixed size k. ' +
                'Common in problems like "find maximum average of subarray of size k", "maximum sum subarray of size k", ' +
                'and any problem involving consecutive elements of a fixed window. Essential for optimizing O(n*k) brute force solutions.',
            avoid:
                'Avoid when the window size varies significantly (use dynamic sliding window instead). ' +
                'Not suitable when you need to track multiple window sizes simultaneously. ' +
                'If k is very close to n (array length), just use a simple linear scan.',
            realWorld:
                'Used in network traffic analysis (average bandwidth over last k seconds), stock market analysis ' +
                '(moving average over k days), sensor data processing (filtering noise over k readings), ' +
                'and performance monitoring (average CPU usage over last k minutes). Powers the "time series analysis" ' +
                'in monitoring tools and the "consecutive k elements" optimization in streaming data processing.',
            mentalModel:
                'Like measuring the total weight of k people standing in a line. As the line moves forward, ' +
                'one person leaves and one person joins - you just subtract the leaver\'s weight and add the joiner\'s weight ' +
                'instead of recounting everyone.',
            difficulty: 'Easy',
            patterns: ['Sliding Window', 'Arrays', 'Fixed Window'],
            leetcodeTags: ['sliding-window', 'array', 'subarray', 'easy', 'interview-common'],
        },
        prefixSumRangeSum: {
            name: 'Prefix Sum - Range Sum Query',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(n)',
            description:
                'Answer range sum queries in O(1) time after O(n) preprocessing. ' +
                'Build a prefix sum array where prefix[i] contains the sum of all elements from index 0 to i. ' +
                'Then, the sum of elements from left to right is prefix[right] - prefix[left-1]. ' +
                'This transforms multiple O(n) queries into O(1) lookups with a one-time O(n) preprocessing cost.',
            useCase:
                'Use when you have multiple range sum queries on the same array. ' +
                'Essential for problems like "sum of elements between indices i and j", "range sum queries", ' +
                'and "find subarray with given sum". Common in streaming data analysis, financial calculations, ' +
                'and any scenario requiring cumulative sums or range lookups.',
            avoid:
                'Avoid when you only need one range sum (just calculate it directly). ' +
                'Not suitable when the array is frequently updated (rebuilding prefix array is O(n)). ' +
                'If memory is constrained and array is very large, consider calculating sums on-the-fly.',
            realWorld:
                'Used in financial systems (calculating moving averages, portfolio balances over time ranges), ' +
                'database systems (range queries on indexed columns), gaming leaderboards (score tracking over time periods), ' +
                'and network monitoring (bandwidth usage in time windows). Powers the "time range aggregation" in analytics ' +
                'platforms and the "cumulative sum" calculation in spreadsheets.',
            mentalModel:
                'Like keeping a running total on a scoreboard. Instead of recounting all points between round A and B, ' +
                'you just check the total at B minus the total before A. The difference gives you the points in that range.',
            difficulty: 'Easy',
            patterns: ['Prefix Sum', 'Arrays', 'Range Query'],
            leetcodeTags: ['prefix-sum', 'array', 'range-query', 'easy', 'interview-common'],
        },
        monotonicStackNextGreater: {
            name: 'Monotonic Stack - Next Greater Element',
            best: 'O(n)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(n)',
            description:
                'Find the next greater element for each element in the array using a monotonic stack. ' +
                'The stack maintains indices in decreasing order of their values. When we encounter a new element, ' +
                'we pop all elements smaller than it from the stack and update their "next greater" result. ' +
                'This achieves O(n) time because each element is pushed and popped at most once.',
            useCase:
                'Use when you need to find the next greater/smaller element for each position in an array. ' +
                'Essential for problems like "next greater temperature", "stock span problem", and "next greater element I/II/III". ' +
                'Common in temperature monitoring, price tracking, and any scenario requiring future value prediction.',
            avoid:
                'Avoid when you only need the next greater for a single element (just scan forward). ' +
                'Not suitable when the array is circular (use modulo arithmetic). ' +
                'If memory is extremely constrained, a nested loop might be acceptable for small arrays.',
            realWorld:
                'Used in weather forecasting (predicting when next warmer day will occur), stock market analysis ' +
                '(finding next higher price for sell orders), CPU temperature monitoring (thermal management), ' +
                'and price comparison engines (finding next better deal). Powers the "future prediction" in streaming analytics ' +
                'and the "next higher value" calculation in optimization systems.',
            mentalModel:
                'Like people standing in line sorted by height. When a taller person arrives, they become the "next greater" ' +
                'for all shorter people waiting in front of them who haven\'t found a taller person yet.',
            difficulty: 'Medium',
            patterns: ['Monotonic Stack', 'Arrays', 'Stack'],
            leetcodeTags: ['monotonic-stack', 'array', 'next-greater', 'medium', 'interview-common'],
        },
        overlappingIntervalsMerge: {
            name: 'Overlapping Intervals - Merge Intervals',
            best: 'O(n log n)',
            average: 'O(n log n)',
            worst: 'O(n log n)',
            space: 'O(n)',
            description:
                'Merge all overlapping intervals into a single list of non-overlapping intervals. ' +
                'Sort intervals by start time, then iterate through them. If the current interval overlaps with the last merged interval, ' +
                'merge them by updating the end time. If it doesn\'t overlap, add it to the merged list. This achieves O(n log n) time due to sorting.',
            useCase:
                'Use when you need to consolidate overlapping time ranges or intervals. ' +
                'Essential for problems like "merge intervals", "insert interval", "meeting rooms", and "employee free time". ' +
                'Common in scheduling systems, calendar applications, and resource allocation problems.',
            avoid:
                'Avoid when intervals are already non-overlapping (no merge needed). ' +
                'Not suitable when you need to preserve all original intervals (this modifies the list). ' +
                'If intervals are already sorted by start time, you can skip the initial sort for O(n) time.',
            realWorld:
                'Used in calendar applications (merging overlapping events), meeting room schedulers (finding available time slots), ' +
                'network monitoring (merging overlapping alert periods), and resource allocation (consolidating booking windows). ' +
                'Powers the "find available time" feature in scheduling tools and the "merge calendars" operation in productivity apps.',
            mentalModel:
                'Like merging overlapping time blocks on a calendar. If a new event overlaps with an existing block, expand the block to cover both. ' +
                'If it doesn\'t overlap, add it as a separate block.',
            difficulty: 'Medium',
            patterns: ['Overlapping Intervals', 'Arrays', 'Sorting', 'Intervals'],
            leetcodeTags: ['intervals', 'merge', 'sorting', 'medium', 'interview-common'],
        },
        twoPointersTargetSum: {
            name: 'Two Pointers - Two Sum (Sorted Array)',
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
            space: 'O(1)',
            description:
                'Find two numbers in a sorted array that add up to a target sum using two pointers starting at opposite ends. ' +
                'If the sum is too small, advance the left pointer right to increase it. If the sum is too large, move the right pointer left to decrease it. ' +
                'Each iteration eliminates at least one element, so the algorithm terminates in at most n steps.',
            useCase:
                'Use when searching a sorted array for a pair, triplet, or subarray meeting a numeric constraint. ' +
                'The canonical patterns are: two sum on sorted input, three sum (reduce to two sum), valid palindrome check, ' +
                'and container with most water. Whenever brute force would be O(n²), two pointers often reduces it to O(n).',
            avoid:
                'Avoid on unsorted arrays without the ability to sort first (sorting changes indices). ' +
                'Not suitable when you need all pairs (can be O(n²) output anyway). ' +
                'If the array is not sorted and sorting is prohibited, use a hash map for O(n) time instead.',
            realWorld:
                'Used in recommendation engines (find two items whose combined score equals a budget), in compression algorithms ' +
                '(find complementary byte pairs), and in signal processing (find two frequency components that sum to a target). ' +
                'Powers the "find matching transactions" feature in financial reconciliation tools and the pair-matching step in merge sort.',
            mentalModel:
                'Like squeezing a folded strip of numbers from both ends. If the two numbers you are touching sum to too little, ' +
                'release the left side and grab the next one. Too much — release the right side. Stop when the two fingers touch.',
            difficulty: 'Easy',
            patterns: ['Two Pointers', 'Arrays', 'Sorting'],
            leetcodeTags: ['two-pointers', 'array', 'sorting', 'easy', 'interview-common'],
        },
    };

    // ─── Generator Functions ───

    /**
     * Sliding Window Max Sum generator. Yields visualization steps.
     *
     * @param {number[]} arr - The input array.
     * @param {number} k - The window size.
     * @yields {{ type: string, indices: number[], codeLine: number, window?: number[], maxSum?: number, currentSum?: number }}
     * @returns {number | undefined} The maximum sum found, or undefined if invalid input.
     */
    function* slidingWindowMaxSum(arr, k) {
        const n = arr.length;

        // Validate input
        if (n < k) {
            yield { type: 'error', indices: [0], codeLine: 3 };
            return undefined;
        }

        // Step 1: Initialize window with first k elements
        let windowSum = 0;
        const initialWindow = [];
        for (let i = 0; i < k; i++) {
            windowSum += arr[i];
            initialWindow.push(i);
            yield { type: 'init', indices: [i], codeLine: 6 };
        }

        let maxSum = windowSum;
        yield {
            type: 'initial-max',
            indices: initialWindow,
            codeLine: 7,
            window: [...initialWindow],
            maxSum: maxSum,
            currentSum: windowSum
        };

        // Step 2: Slide window through the array
        for (let i = k; i < n; i++) {
            // Calculate previous window indices for visualization
            const prevWindowStart = i - k;
            const prevWindow = [];
            for (let j = prevWindowStart; j < i; j++) {
                prevWindow.push(j);
            }

            // Update window sum
            windowSum = windowSum - arr[i - k] + arr[i];
            yield {
                type: 'slide',
                indices: [i - k, i],
                codeLine: 10,
                window: [...prevWindow, i],
                currentSum: windowSum,
                removed: arr[i - k],
                added: arr[i]
            };

            // Update max if needed
            if (windowSum > maxSum) {
                maxSum = windowSum;
                const currentWindow = [];
                for (let j = i - k + 1; j <= i; j++) {
                    currentWindow.push(j);
                }
                yield {
                    type: 'new-max',
                    indices: currentWindow,
                    codeLine: 11,
                    window: currentWindow,
                    maxSum: maxSum,
                    currentSum: windowSum
                };
            }
        }

        // Return result
        yield {
            type: 'complete',
            indices: [],
            codeLine: 13,
            maxSum: maxSum
        };

        return maxSum;
    }

    /**
     * Prefix Sum Range Sum generator. Yields visualization steps.
     *
     * @param {number[]} arr - The input array.
     * @param {number} left - The left index of the range (inclusive).
     * @param {number} right - The right index of the range (inclusive).
     * @yields {{ type: string, indices: number[], codeLine: number, prefix?: number[], range?: number[], result?: number }}
     * @returns {number} The sum of elements from left to right.
     */
    function* prefixSumRangeSum(arr, left, right) {
        const n = arr.length;

        // Validate input
        if (left < 0 || right >= n || left > right) {
            yield { type: 'error', indices: [0], codeLine: 1 };
            return 0;
        }

        // Step 1: Build prefix sum array
        const prefix = [];
        for (let i = 0; i < n; i++) {
            if (i === 0) {
                prefix.push(arr[i]);
            } else {
                prefix.push(prefix[prefix.length - 1] + arr[i]);
            }
            yield { type: 'build-prefix', indices: [i], codeLine: 5, prefix: [...prefix] };
        }

        // Step 2: Calculate range sum
        const range = [];
        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        let result;
        if (left === 0) {
            result = prefix[right];
            yield {
                type: 'query-range',
                indices: range,
                codeLine: 10,
                prefix: [...prefix],
                range: range,
                result: result,
                formula: `prefix[${right}] = ${prefix[right]}`
            };
        } else {
            result = prefix[right] - prefix[left - 1];
            yield {
                type: 'query-range',
                indices: range,
                codeLine: 12,
                prefix: [...prefix],
                range: range,
                result: result,
                formula: `prefix[${right}] - prefix[${left}-1] = ${prefix[right]} - ${prefix[left - 1]} = ${result}`
            };
        }

        return result;
    }

    /**
     * Monotonic Stack Next Greater generator. Yields visualization steps.
     *
     * @param {number[]} arr - The input array.
     * @yields {{ type: string, indices: number[], codeLine: number, stack?: number[], result?: number[], current?: number, greaterFor?: number }}
     * @returns {number[]} The result array where result[i] is the next greater element for arr[i], or -1.
     */
    function* monotonicStackNextGreater(arr) {
        const n = arr.length;

        // Initialize
        const result = new Array(n).fill(-1);
        const stack = [];

        yield { type: 'init', indices: [], codeLine: 3, result: [...result], stack: [...stack] };

        // Process each element
        for (let i = 0; i < n; i++) {
            // Pop smaller elements and update their result
            while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
                const popped = stack.pop();
                result[popped] = arr[i];
                yield {
                    type: 'pop-stack',
                    indices: [popped, i],
                    codeLine: 6,
                    result: [...result],
                    stack: [...stack],
                    current: arr[i],
                    greaterFor: popped,
                    value: arr[i]
                };
            }

            // Push current index
            stack.push(i);
            yield {
                type: 'push-stack',
                indices: [i],
                codeLine: 8,
                stack: [...stack],
                current: arr[i],
                result: [...result]
            };
        }

        yield { type: 'complete', indices: [], codeLine: 9, result: [...result], stack: [...stack] };

        return result;
    }

    /**
     * Overlapping Intervals Merge generator. Yields visualization steps.
     *
     * @param {number[][]} intervals - Array of intervals where each interval is [start, end].
     * @yields {{ type: string, indices: number[], codeLine: number, merged?: number[][], current?: number[], result?: number[] }}
     * @returns {number[][]} The merged non-overlapping intervals.
     */
    function* overlappingIntervalsMerge(intervals) {
        if (!intervals || intervals.length === 0) {
            yield { type: 'complete', indices: [], codeLine: 1, merged: [], result: [] };
            return [];
        }

        // Sort intervals by start time
        const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
        yield { type: 'sorted', indices: [], codeLine: 3, merged: [], result: [...sorted] };

        const merged = [];
        for (let i = 0; i < sorted.length; i++) {
            const current = sorted[i];

            if (merged.length === 0 || merged[merged.length - 1][1] < current[0]) {
                // No overlap, add as new interval
                merged.push(current);
                yield {
                    type: 'analyze-interval',
                    indices: [i],
                    codeLine: 6,
                    merged: [...merged],
                    current: current,
                    result: [...merged]
                };
            } else {
                // Overlap, merge with previous interval
                merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], current[1]);
                yield {
                    type: 'merge-interval',
                    indices: [i],
                    codeLine: 7,
                    merged: [...merged],
                    current: current,
                    result: [...merged],
                    previous: merged[merged.length - 1]
                };
            }
        }

        yield { type: 'complete', indices: [], codeLine: 8, merged: [...merged], result: [...merged] };

        return merged;
    }

    // ─── Two Pointers: Two Sum (Sorted) ───

    /**
     * Finds two indices in a sorted array whose values sum to the target.
     *
     * @param {number[]} arr - Sorted array of integers.
     * @param {number} target - Target sum.
     * @yields {{ type: string, left: number, right: number, sum: number, codeLine: number }}
     * @returns {number[]|null} Pair of indices [left, right], or null if not found.
     */
    function* twoPointersTargetSum(arr) {
        // arr is pre-sorted by the caller
        const target = arr[0] + arr[arr.length - 1];

        let left = 0;
        let right = arr.length - 1;

        yield { type: 'init', indices: [left, right], left, right, codeLine: 1 };

        while (left < right) {
            const sum = arr[left] + arr[right];

            yield { type: 'compare', indices: [left, right], left, right, sum, target, codeLine: 4 };

            if (sum === target) {
                yield { type: 'found', indices: [left, right], left, right, sum, target, codeLine: 5 };
                return [left, right];
            } else if (sum < target) {
                yield { type: 'move-left', indices: [left, right], left, right, sum, target, codeLine: 7 };
                left++;
            } else {
                yield { type: 'move-right', indices: [left, right], left, right, sum, target, codeLine: 9 };
                right--;
            }
        }

        yield { type: 'not-found', indices: [left, right], left, right, codeLine: 10 };
        return null;
    }

    // ─── Public API ───

    return {
        CODE,
        COMPLEXITY,
        slidingWindowMaxSum,
        prefixSumRangeSum,
        monotonicStackNextGreater,
        overlappingIntervalsMerge,
        twoPointersTargetSum,
    };

})();

export default PatternAlgorithms;
