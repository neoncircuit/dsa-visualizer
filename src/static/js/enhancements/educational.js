/**
 * Educational enhancement module.
 *
 * Shows optional post-algorithm quizzes to reinforce learning.
 * Quizzes are multiple-choice with immediate feedback and explanations.
 * Scores are persisted to localStorage.
 *
 * Includes a Challenge Mode that randomly picks an algorithm,
 * auto-runs it, then presents a timed quiz.
 *
 * Subscribes to: algorithm:complete
 * Emits: none
 *
 * @module enhancements/educational
 */

import EventBus from '../event-bus.js';

const STORAGE_KEY = 'dsa-visualizer-quiz-scores';
const CHALLENGE_STORAGE_KEY = 'dsa-visualizer-challenge-scores';
const QUIZ_ENABLED_KEY = 'dsa-visualizer-quiz-enabled';
const CHALLENGE_TIMER_SECONDS = 15;

/**
 * Keep enhancement toolbar buttons in a stable left-to-right order.
 *
 * @returns {void}
 */
function orderEnhancementButtons() {
    const enhancements = document.getElementById('controls-enhancements');
    if (!enhancements) return;

    ['btn-challenge', 'btn-quiz', 'btn-drag'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) enhancements.appendChild(el);
    });
}

/**
 * Pool of algorithms suitable for challenge mode.
 * Only sorting algorithms are included since they auto-complete
 * without user interaction (searching needs a target, trees/graphs
 * have different execution models).
 *
 * @type {Array<{key: string, name: string}>}
 */
const CHALLENGE_ALGORITHMS = [
    { key: 'bubbleSort', name: 'Bubble Sort' },
    { key: 'selectionSort', name: 'Selection Sort' },
    { key: 'insertionSort', name: 'Insertion Sort' },
    { key: 'mergeSort', name: 'Merge Sort' },
    { key: 'quickSort', name: 'Quick Sort' },
    { key: 'heapSort', name: 'Heap Sort' },
    { key: 'shellSort', name: 'Shell Sort' },
    { key: 'countingSort', name: 'Counting Sort' },
    { key: 'gnomeSort', name: 'Gnome Sort' },
    { key: 'cocktailShakerSort', name: 'Cocktail Shaker Sort' },
    { key: 'pancakeSort', name: 'Pancake Sort' },
    { key: 'radixSort', name: 'Radix Sort' },
    { key: 'bucketSort', name: 'Bucket Sort' },
    { key: 'timSort', name: 'Tim Sort' },
    { key: 'combSort', name: 'Comb Sort' },
    { key: 'oddEvenSort', name: 'Odd-Even Sort' },
];

/**
 * Quiz question definitions keyed by algorithm family.
 *
 * @type {Object.<string, Array<{ question: string, options: string[], correct: number, explanation: string }>>}
 */
const QUIZZES = {
    bubbleSort: [
        {
            question: 'What is the worst-case time complexity of Bubble Sort?',
            options: ['O(n)', 'O(n log n)', 'O(n\u00B2)', 'O(2\u207F)'],
            correct: 2,
            explanation: 'Bubble Sort compares each element with every other element in the worst case, resulting in O(n\u00B2) comparisons.',
        },
        {
            question: 'When does Bubble Sort achieve its best-case performance?',
            options: ['When the array is reversed', 'When the array is already sorted', 'When all elements are equal', 'When the array size is a power of 2'],
            correct: 1,
            explanation: 'With an early-exit optimization, Bubble Sort detects that no swaps occurred in a pass and finishes in O(n).',
        },
        {
            question: 'Is Bubble Sort a stable sorting algorithm?',
            options: ['Yes, equal elements keep their original order', 'No, equal elements may be swapped', 'It depends on the implementation', 'Only for small arrays'],
            correct: 0,
            explanation: 'Bubble Sort only swaps when the left element is strictly greater, so equal elements are never reordered.',
        },
    ],
    selectionSort: [
        {
            question: 'How many swaps does Selection Sort perform in the worst case?',
            options: ['O(n log n)', 'O(n\u00B2)', 'O(n)', 'O(log n)'],
            correct: 2,
            explanation: 'Selection Sort makes at most n-1 swaps, one per pass. This makes it useful when write operations are expensive.',
        },
        {
            question: 'What is the time complexity of Selection Sort regardless of input?',
            options: ['O(n log n)', 'O(n)', 'O(n\u00B2)', 'O(n\u00B3)'],
            correct: 2,
            explanation: 'Selection Sort always scans the remaining unsorted portion, giving O(n\u00B2) in all cases.',
        },
    ],
    mergeSort: [
        {
            question: 'What is the space complexity of Merge Sort?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n\u00B2)'],
            correct: 2,
            explanation: 'Merge Sort requires O(n) auxiliary space for the temporary arrays used during the merge step.',
        },
        {
            question: 'Which strategy does Merge Sort use?',
            options: ['Greedy', 'Divide and conquer', 'Dynamic programming', 'Backtracking'],
            correct: 1,
            explanation: 'Merge Sort recursively divides the array in half, sorts each half, then merges the sorted halves back together.',
        },
        {
            question: 'What is Merge Sort best suited for?',
            options: ['Small arrays', 'Linked lists and external sorting', 'Nearly sorted data', 'Arrays with many duplicates'],
            correct: 1,
            explanation: 'Merge Sort performs well on linked lists (O(1) extra space) and is the basis for external sorting of large datasets that do not fit in memory.',
        },
    ],
    quickSort: [
        {
            question: 'What is the average-case time complexity of Quick Sort?',
            options: ['O(n)', 'O(n log n)', 'O(n\u00B2)', 'O(log n)'],
            correct: 1,
            explanation: 'With good pivot selection, Quick Sort recursively partitions the array into roughly equal halves, giving O(n log n) on average.',
        },
        {
            question: 'What causes Quick Sort to degrade to O(n\u00B2)?',
            options: ['When the array has duplicates', 'When the pivot is always the smallest or largest element', 'When the array is small', 'When the array is nearly sorted'],
            correct: 1,
            explanation: 'If the pivot consistently partitions the array into one empty and one full sub-array (e.g., already sorted with first-element pivot), the recursion depth becomes O(n).',
        },
    ],
    binarySearch: [
        {
            question: 'What precondition does Binary Search require?',
            options: ['The array must have even length', 'The array must be sorted', 'The array must contain unique elements', 'The array must be in descending order'],
            correct: 1,
            explanation: 'Binary Search works by repeatedly halving the search space, which only produces correct results when the array is sorted.',
        },
        {
            question: 'What is the time complexity of Binary Search?',
            options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
            correct: 1,
            explanation: 'Each comparison eliminates half the remaining elements, resulting in at most log\u2082(n) comparisons.',
        },
    ],
    heapSort: [
        {
            question: 'What data structure does Heap Sort use internally?',
            options: ['Stack', 'Queue', 'Binary heap', 'Binary search tree'],
            correct: 2,
            explanation: 'Heap Sort builds a max-heap (or min-heap) in place and repeatedly extracts the root to produce a sorted sequence.',
        },
        {
            question: 'What is the space complexity of Heap Sort?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correct: 0,
            explanation: 'Heap Sort is an in-place algorithm that rearranges elements within the original array, requiring only O(1) extra space.',
        },
    ],
};

/**
 * Get the quiz questions for a given algorithm key.
 * Falls back to a generic quiz if no specific questions exist.
 *
 * @param {string} algoKey - Algorithm identifier.
 * @returns {Array<{ question: string, options: string[], correct: number, explanation: string }>}
 */
function getQuizForAlgorithm(algoKey) {
    if (QUIZZES[algoKey]) return QUIZZES[algoKey];

    return [
        {
            question: `What category does ${algoKey.replace(/([A-Z])/g, ' $1').trim()} belong to?`,
            options: ['Sorting', 'Searching', 'Graph traversal', 'Dynamic programming'],
            correct: algoKey.toLowerCase().includes('sort') ? 0 : algoKey.toLowerCase().includes('search') ? 1 : 2,
            explanation: 'This algorithm falls into the category it was designed for. Review the info panel for details.',
        },
        {
            question: 'Why is understanding time complexity important?',
            options: ['It makes code run faster', 'It helps predict how the algorithm scales with input size', 'It reduces memory usage', 'It eliminates bugs'],
            correct: 1,
            explanation: 'Time complexity describes how the runtime grows relative to input size, allowing you to choose the right algorithm for your data.',
        },
    ];
}

const Educational = {
    /** @type {Object.<string, { correct: number, total: number }>} */
    scores: {},

    /** @type {Object.<string, { correct: number, total: number, best: number }>} */
    challengeScores: {},

    /** @type {boolean} */
    enabled: true,

    /** @type {boolean} Whether a challenge is currently in progress. */
    _challengeActive: false,

    /**
     * Initialise the educational module.
     *
     * Loads saved scores and quiz preference from localStorage,
     * and subscribes to algorithm completion events.
     *
     * @returns {void}
     */
    init() {
        this.loadScores();
        this.loadChallengeScores();
        this.loadPreference();
        this.injectToggleButton();
        this.injectChallengeButton();
        EventBus.on('algorithm:complete', this.onComplete.bind(this));
    },

    /**
     * Load quiz scores from localStorage.
     *
     * @returns {void}
     */
    loadScores() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) this.scores = JSON.parse(saved);
        } catch { /* ignore */ }
    },

    /**
     * Save current scores to localStorage.
     *
     * @returns {void}
     */
    saveScores() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.scores));
        } catch { /* ignore */ }
    },

    /**
     * Load challenge mode scores from localStorage.
     *
     * @returns {void}
     */
    loadChallengeScores() {
        try {
            const saved = localStorage.getItem(CHALLENGE_STORAGE_KEY);
            if (saved) this.challengeScores = JSON.parse(saved);
        } catch { /* ignore */ }
    },

    /**
     * Save challenge mode scores to localStorage.
     *
     * @returns {void}
     */
    saveChallengeScores() {
        try {
            localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(this.challengeScores));
        } catch { /* ignore */ }
    },

    /**
     * Load the quiz enabled preference.
     *
     * @returns {void}
     */
    loadPreference() {
        const saved = localStorage.getItem(QUIZ_ENABLED_KEY);
        if (saved !== null) this.enabled = saved === 'true';
    },

    /**
     * Save the quiz enabled preference.
     *
     * @returns {void}
     */
    savePreference() {
        localStorage.setItem(QUIZ_ENABLED_KEY, String(this.enabled));
    },

    /**
     * Inject a toggle button into the controls bar enhancements group.
     *
     * @returns {void}
     */
    injectToggleButton() {
        const enhancements = document.getElementById('controls-enhancements');
        if (!enhancements || document.getElementById('btn-quiz')) return;

        const btn = document.createElement('button');
        btn.id = 'btn-quiz';
        btn.title = 'Toggle post-algorithm quizzes';
        btn.textContent = 'Quiz';
        btn.className = this.enabled ? 'btn quiz-btn quiz-btn-active' : 'btn quiz-btn';

        btn.addEventListener('click', () => {
            this.enabled = !this.enabled;
            btn.className = this.enabled ? 'btn quiz-btn quiz-btn-active' : 'btn quiz-btn';
            this.savePreference();
        });

        enhancements.appendChild(btn);
        orderEnhancementButtons();
    },

    /**
     * Inject a Challenge Mode button into the controls bar enhancements group.
     *
     * The button triggers a random algorithm run followed by a timed quiz.
     *
     * @returns {void}
     */
    injectChallengeButton() {
        const enhancements = document.getElementById('controls-enhancements');
        if (!enhancements || document.getElementById('btn-challenge')) return;

        const btn = document.createElement('button');
        btn.id = 'btn-challenge';
        btn.title = 'Challenge Mode: random algorithm + timed quiz';
        btn.textContent = 'Challenge';
        btn.className = 'btn challenge-btn';

        btn.addEventListener('click', () => this.startChallenge());

        enhancements.appendChild(btn);
        orderEnhancementButtons();
    },

    /**
     * Handle algorithm completion by showing the quiz modal.
     * In challenge mode, the quiz is shown with a timer.
     *
     * @param {{ algoKey: string }} payload
     * @returns {void}
     */
    onComplete(payload) {
        if (this._challengeActive) {
            this._challengeActive = false;
            this.showQuiz(payload.algoKey, { timed: true });
            return;
        }
        if (!this.enabled) return;
        this.showQuiz(payload.algoKey);
    },

    /**
     * Start a Challenge Mode run.
     *
     * Selects a random sorting algorithm, programs the algorithm
     * select dropdown, resets the visualizer, and auto-plays.
     * On completion the quiz modal is shown with a per-question timer.
     *
     * @returns {void}
     */
    startChallenge() {
        if (this._challengeActive) return;

        const entry = CHALLENGE_ALGORITHMS[Math.floor(Math.random() * CHALLENGE_ALGORITHMS.length)];
        const select = document.getElementById('algorithm-select');
        if (!select) return;

        select.value = entry.key;
        select.dispatchEvent(new Event('change'));

        this._challengeActive = true;

        const btnPlay = document.getElementById('btn-play');
        if (btnPlay) {
            setTimeout(() => btnPlay.click(), 300);
        }
    },

    /**
     * Display the quiz modal for a given algorithm.
     *
     * @param {string} algoKey - Algorithm identifier.
     * @param {{ timed?: boolean }} [options] - Display options.
     * @returns {void}
     */
    showQuiz(algoKey, options = {}) {
        const { timed = false } = options;
        const questions = getQuizForAlgorithm(algoKey);
        if (!questions.length) return;

        let currentIndex = 0;
        let correctCount = 0;
        let timerInterval = null;
        let timeRemaining = CHALLENGE_TIMER_SECONDS;

        const modal = document.createElement('div');
        modal.className = 'quiz-modal-overlay';
        modal.innerHTML = `
            <div class="quiz-modal">
                <div class="quiz-header">
                    <h2>${timed ? 'Challenge Mode' : 'Quick Quiz'}</h2>
                    <button class="quiz-close" title="Close">&times;</button>
                </div>
                <div class="quiz-progress">
                    <span class="quiz-progress-text">1 / ${questions.length}</span>
                    <div class="quiz-progress-bar"><div class="quiz-progress-fill"></div></div>
                    ${timed ? '<span class="quiz-timer"></span>' : ''}
                </div>
                <div class="quiz-body">
                    <p class="quiz-question"></p>
                    <div class="quiz-options"></div>
                    <div class="quiz-feedback hidden"></div>
                </div>
                <div class="quiz-actions">
                    <button class="quiz-btn quiz-btn-next hidden">Next</button>
                    <button class="quiz-btn quiz-btn-finish hidden">Done</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.quiz-close');
        const questionEl = modal.querySelector('.quiz-question');
        const optionsEl = modal.querySelector('.quiz-options');
        const feedbackEl = modal.querySelector('.quiz-feedback');
        const progressText = modal.querySelector('.quiz-progress-text');
        const progressFill = modal.querySelector('.quiz-progress-fill');
        const nextBtn = modal.querySelector('.quiz-btn-next');
        const finishBtn = modal.querySelector('.quiz-btn-finish');
        const timerEl = modal.querySelector('.quiz-timer');

        /**
         * Start the countdown timer for the current question.
         * Auto-advances to the next question when time expires.
         *
         * @returns {void}
         */
        function startTimer() {
            if (!timed) return;
            clearInterval(timerInterval);
            timeRemaining = CHALLENGE_TIMER_SECONDS;
            updateTimerDisplay();
            timerInterval = setInterval(() => {
                timeRemaining--;
                updateTimerDisplay();
                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    handleAnswer(-1, null);
                }
            }, 1000);
        }

        /**
         * Update the timer display element.
         *
         * @returns {void}
         */
        function updateTimerDisplay() {
            if (timerEl) {
                timerEl.textContent = `${timeRemaining}s`;
                timerEl.classList.toggle('quiz-timer-warning', timeRemaining <= 5);
            }
        }

        /**
         * Render the current question and its options.
         *
         * @returns {void}
         */
        function renderQuestion() {
            const q = questions[currentIndex];
            questionEl.textContent = q.question;
            progressText.textContent = `${currentIndex + 1} / ${questions.length}`;
            progressFill.style.width = `${((currentIndex) / questions.length) * 100}%`;

            optionsEl.innerHTML = '';
            feedbackEl.className = 'quiz-feedback hidden';
            nextBtn.classList.add('hidden');
            finishBtn.classList.add('hidden');

            q.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.textContent = opt;
                btn.addEventListener('click', () => handleAnswer(i, btn));
                optionsEl.appendChild(btn);
            });

            startTimer();
        }

        /**
         * Process the user's answer (or timeout).
         *
         * @param {number} selected - Index of the selected option, or -1 for timeout.
         * @param {HTMLButtonElement|null} selectedBtn - The clicked button, or null.
         * @returns {void}
         */
        function handleAnswer(selected, selectedBtn) {
            clearInterval(timerInterval);
            const q = questions[currentIndex];
            const isCorrect = selected === q.correct;
            const timedOut = selected === -1;

            optionsEl.querySelectorAll('.quiz-option').forEach((btn, i) => {
                btn.disabled = true;
                if (i === q.correct) btn.classList.add('quiz-option-correct');
                if (i === selected && !isCorrect) btn.classList.add('quiz-option-wrong');
            });

            if (isCorrect) correctCount++;

            feedbackEl.className = 'quiz-feedback';
            if (timedOut) {
                feedbackEl.classList.add('quiz-feedback-wrong');
                feedbackEl.textContent = `Time's up! ${q.explanation}`;
            } else {
                feedbackEl.classList.add(isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong');
                feedbackEl.textContent = q.explanation;
            }

            if (currentIndex < questions.length - 1) {
                nextBtn.classList.remove('hidden');
            } else {
                finishBtn.classList.remove('hidden');
                progressFill.style.width = '100%';
            }
        }

        nextBtn.addEventListener('click', () => {
            currentIndex++;
            renderQuestion();
        });

        finishBtn.addEventListener('click', () => {
            clearInterval(timerInterval);

            if (timed) {
                const prev = this.challengeScores[algoKey] || { correct: 0, total: 0, best: 0 };
                const score = correctCount;
                this.challengeScores[algoKey] = {
                    correct: prev.correct + correctCount,
                    total: prev.total + questions.length,
                    best: Math.max(prev.best, score),
                };
                this.saveChallengeScores();
            }

            const prev = this.scores[algoKey] || { correct: 0, total: 0 };
            this.scores[algoKey] = {
                correct: prev.correct + correctCount,
                total: prev.total + questions.length,
            };
            this.saveScores();

            modal.remove();
        });

        closeBtn.addEventListener('click', () => {
            clearInterval(timerInterval);
            modal.remove();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                clearInterval(timerInterval);
                modal.remove();
            }
        });

        renderQuestion();
    },
};

export default Educational;
