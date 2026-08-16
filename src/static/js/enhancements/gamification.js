/**
 * Gamification enhancement module.
 *
 * Tracks daily streaks, session statistics, and unlockable achievements.
 * All state is persisted to localStorage so progress survives page reloads.
 *
 * Subscribes to: algorithm:complete, algorithm:compare:complete
 * Emits: none (achievement toasts are rendered directly)
 *
 * @module enhancements/gamification
 */

import EventBus from '../event-bus.js';

const STORAGE_KEY = 'dsa-visualizer-gamification';

/**
 * All sorting algorithm keys that count toward the Perfectionist achievement.
 *
 * @type {string[]}
 */
const ALL_SORTING_ALGOS = [
    'bubbleSort', 'selectionSort', 'insertionSort', 'mergeSort',
    'quickSort', 'heapSort', 'shellSort', 'countingSort',
    'gnomeSort', 'cocktailSort', 'pancakeSort', 'radixSort',
    'bucketSort', 'timSort', 'combSort', 'oddEvenSort',
    'bogoSort', 'thanosSort', 'stalinSort', 'sleepSort', 'miracleSort',
];

/**
 * Category keywords used to detect whether a user has explored all algorithm families.
 *
 * @type {string[]}
 */
const CATEGORY_KEYWORDS = ['sort', 'search', 'bst', 'avl', 'heap', 'bfs', 'dfs', 'dijkstra', 'kruskal', 'prim', 'bellman', 'topological', 'astar', 'linked'];

/**
 * Achievement definitions keyed by achievement ID.
 *
 * @type {Object.<string, { name: string, description: string, icon: string }>}
 */
const ACHIEVEMENT_DEFS = {
    'first-sort': {
        name: 'First Sort',
        description: 'Complete your first sorting algorithm',
        icon: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12',
    },
    'speed-demon': {
        name: 'Speed Demon',
        description: 'Complete an algorithm under 1 second',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    'perfectionist': {
        name: 'Perfectionist',
        description: 'Complete all sorting algorithms',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    'explorer': {
        name: 'Explorer',
        description: 'Try algorithms from all categories',
        icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    },
    'comparator': {
        name: 'Comparator',
        description: 'Use compare mode 10 times',
        icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
    },
    'night-owl': {
        name: 'Night Owl',
        description: 'Use the app between midnight and 5 AM',
        icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
    },
    'marathon': {
        name: 'Marathon',
        description: 'Run 100 algorithms in one session',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    },
    'quick-learner': {
        name: 'Quick Learner',
        description: 'Complete 5 different algorithms in 5 minutes',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
};

const Gamification = {
    /** @type {{ streak: number, lastActiveDate: string|null, sessionCount: number, completedAlgorithms: string[], compareModeCount: number, totalAlgorithmsRun: number, achievements: string[], recentCompletions: Array<{ algoKey: string, timestamp: number }> }} */
    state: {
        streak: 0,
        lastActiveDate: null,
        sessionCount: 0,
        completedAlgorithms: [],
        compareModeCount: 0,
        totalAlgorithmsRun: 0,
        achievements: [],
        recentCompletions: [],
    },

    /**
     * Initialise the gamification module.
     *
     * Loads persisted state, checks streak continuity, and subscribes
     * to lifecycle events.
     *
     * @returns {void}
     */
    init() {
        this.loadState();
        this.checkStreak();
        this.renderStreakCounter();

        EventBus.on('algorithm:complete', this.onComplete.bind(this));
        EventBus.on('algorithm:compare:complete', this.onCompareComplete.bind(this));
    },

    /**
     * Load persisted state from localStorage.
     *
     * @returns {void}
     */
    loadState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            }
        } catch {
            // Corrupted data -- start fresh.
        }
    },

    /**
     * Persist current state to localStorage.
     *
     * @returns {void}
     */
    saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        } catch {
            // Storage full or unavailable.
        }
    },

    /**
     * Check and update the daily streak.
     *
     * The streak increments if the user was active yesterday and is active
     * again today. It resets if more than one day has been missed.
     *
     * @returns {void}
     */
    checkStreak() {
        const today = new Date().toDateString();
        const lastActive = this.state.lastActiveDate;

        if (!lastActive) return;

        const lastDate = new Date(lastActive);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate.toDateString() !== yesterday.toDateString() && lastDate.toDateString() !== today) {
            this.state.streak = 0;
            this.saveState();
        }
    },

    /**
     * Handle algorithm completion event.
     *
     * Updates streak, tracks the algorithm, and checks achievements.
     *
     * @param {{ algoKey: string, stats: { comparisons: number, swaps: number, elapsedMs: number } }} payload
     * @returns {void}
     */
    onComplete(payload) {
        const { algoKey, stats } = payload;

        const today = new Date().toDateString();
        if (this.state.lastActiveDate !== today) {
            this.state.streak++;
            this.state.lastActiveDate = today;
        }

        if (!this.state.completedAlgorithms.includes(algoKey)) {
            this.state.completedAlgorithms.push(algoKey);
        }

        this.state.sessionCount++;
        this.state.recentCompletions.push({ algoKey, timestamp: Date.now() });

        const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
        this.state.recentCompletions = this.state.recentCompletions.filter(
            (c) => c.timestamp > fiveMinutesAgo,
        );

        this.checkAchievements(algoKey, stats);
        this.saveState();
        this.renderStreakCounter();
    },

    /**
     * Handle compare mode completion event.
     *
     * @returns {void}
     */
    onCompareComplete() {
        this.state.compareModeCount++;
        this.tryUnlock('comparator', this.state.compareModeCount >= 10);
        this.saveState();
    },

    /**
     * Run all achievement checks for a completed algorithm.
     *
     * @param {string} algoKey - The algorithm key.
     * @param {{ elapsedMs: number }} stats - Completion statistics.
     * @returns {void}
     */
    checkAchievements(algoKey, stats) {
        if (algoKey.toLowerCase().includes('sort')) {
            this.tryUnlock('first-sort', true);
        }

        this.tryUnlock('speed-demon', stats.elapsedMs < 1000);

        const allSortsComplete = ALL_SORTING_ALGOS.every((a) =>
            this.state.completedAlgorithms.includes(a),
        );
        this.tryUnlock('perfectionist', allSortsComplete);

        const exploredAll = CATEGORY_KEYWORDS.some((kw) =>
            this.state.completedAlgorithms.some((algo) => algo.toLowerCase().includes(kw)),
        );
        this.tryUnlock('explorer', exploredAll);

        this.tryUnlock('marathon', this.state.sessionCount >= 100);

        const uniqueRecent = new Set(this.state.recentCompletions.map((c) => c.algoKey));
        this.tryUnlock('quick-learner', uniqueRecent.size >= 5);

        const hour = new Date().getHours();
        this.tryUnlock('night-owl', hour >= 0 && hour < 5);
    },

    /**
     * Attempt to unlock an achievement.
     *
     * @param {string} id - Achievement identifier.
     * @param {boolean} condition - Whether the unlock condition is met.
     * @returns {void}
     */
    tryUnlock(id, condition) {
        if (condition && !this.state.achievements.includes(id)) {
            this.state.achievements.push(id);
            this.showAchievementToast(id);
        }
    },

    /**
     * Render an achievement unlock toast notification.
     *
     * @param {string} id - Achievement identifier.
     * @returns {void}
     */
    showAchievementToast(id) {
        const def = ACHIEVEMENT_DEFS[id];
        if (!def) return;

        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <svg class="achievement-icon" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round">
                <path d="${def.icon}"/>
            </svg>
            <div class="achievement-content">
                <div class="achievement-title">Achievement Unlocked</div>
                <div class="achievement-name">${def.name}</div>
            </div>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    },

    /**
     * Render the streak counter badge in the header.
     *
     * @returns {void}
     */
    renderStreakCounter() {
        let counter = document.getElementById('streak-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'streak-counter';
            counter.className = 'streak-badge';
            counter.innerHTML = `
                <svg class="streak-icon" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round"
                     stroke-linejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <span class="streak-value">0</span>
            `;
            const paramsRow = document.getElementById('controls-params')
                || document.querySelector('.controls-bar');
            if (paramsRow) paramsRow.prepend(counter);
        }
        counter.querySelector('.streak-value').textContent = this.state.streak;
    },
};

export default Gamification;
