/**
 * Visual polish enhancement module.
 *
 * Provides additional colour themes beyond dark/light, confetti on
 * algorithm completion, and smooth theme transitions. Fully decoupled
 * from core logic via the event bus.
 *
 * Subscribes to: algorithm:complete
 * Emits: none
 *
 * @module enhancements/visual-polish
 */

import EventBus from '../event-bus.js';

const CONFETTI_COUNT = 60;
const CONFETTI_DURATION_MS = 2500;
const STORAGE_KEY = 'dsa-visualizer-color-theme';

/** @type {string[]} */
const CONFETTI_COLORS = [
    '#22c55e', '#3b82f6', '#f59e0b', '#ef4444',
    '#8b5cf6', '#06b6d4', '#ec4899', '#f97316',
];

/**
 * Theme definitions keyed by theme ID.
 * Each theme overrides a subset of CSS custom properties on :root.
 *
 * @type {Object.<string, { label: string, vars: Object.<string, string> }>}
 */
const THEMES = {
    ocean: {
        label: 'Ocean',
        vars: {
            '--bg-primary': '#0c1929',
            '--bg-secondary': '#132f4c',
            '--bg-tertiary': '#1a3a5c',
            '--text-primary': '#bee3f8',
            '--text-secondary': '#63b3ed',
            '--text-muted': '#4a7ab5',
            '--accent': '#38bdf8',
            '--accent-hover': '#7dd3fc',
            '--bar-default': '#38bdf8',
            '--bar-compare': '#fbbf24',
            '--bar-swap': '#f87171',
            '--bar-sorted': '#34d399',
            '--bar-found': '#fcd34d',
            '--bar-searching': '#a78bfa',
            '--highlight-line': 'rgba(56, 189, 248, 0.15)',
            '--highlight-border': '#38bdf8',
            '--code-bg': '#0c1929',
            '--border-color': '#1e4976',
            '--btn-bg': '#1e4976',
            '--btn-hover': '#275e8a',
            '--btn-success': '#1a3a2a',
            '--btn-success-hover': '#245540',
            '--btn-warning': '#3a2a1a',
            '--btn-warning-hover': '#554024',
            '--btn-danger': '#3a1a1a',
            '--btn-danger-hover': '#552424',
            '--btn-info': '#1a2a3a',
            '--btn-info-hover': '#244055',
            '--btn-glow': '0 0 0 transparent',
        },
    },
    forest: {
        label: 'Forest',
        vars: {
            '--bg-primary': '#0f1f13',
            '--bg-secondary': '#1a3322',
            '--bg-tertiary': '#244230',
            '--text-primary': '#bbf7d0',
            '--text-secondary': '#6ee7b7',
            '--text-muted': '#3d8b63',
            '--accent': '#22c55e',
            '--accent-hover': '#4ade80',
            '--bar-default': '#4ade80',
            '--bar-compare': '#fbbf24',
            '--bar-swap': '#f87171',
            '--bar-sorted': '#86efac',
            '--bar-found': '#fde68a',
            '--bar-searching': '#c084fc',
            '--highlight-line': 'rgba(34, 197, 94, 0.15)',
            '--highlight-border': '#22c55e',
            '--code-bg': '#0f1f13',
            '--border-color': '#2d5a3d',
            '--btn-bg': '#2d5a3d',
            '--btn-hover': '#3a7050',
            '--btn-success': '#1a3a2a',
            '--btn-success-hover': '#245540',
            '--btn-warning': '#3a2a1a',
            '--btn-warning-hover': '#554024',
            '--btn-danger': '#3a1a1a',
            '--btn-danger-hover': '#552424',
            '--btn-info': '#1a2a3a',
            '--btn-info-hover': '#244055',
            '--btn-glow': '0 0 0 transparent',
        },
    },
    sunset: {
        label: 'Sunset',
        vars: {
            '--bg-primary': '#1c0f0a',
            '--bg-secondary': '#2d1a10',
            '--bg-tertiary': '#3e2518',
            '--text-primary': '#fed7aa',
            '--text-secondary': '#fb923c',
            '--text-muted': '#b45309',
            '--accent': '#f97316',
            '--accent-hover': '#fb923c',
            '--bar-default': '#fb923c',
            '--bar-compare': '#fde68a',
            '--bar-swap': '#f87171',
            '--bar-sorted': '#fbbf24',
            '--bar-found': '#fdba74',
            '--bar-searching': '#e879f9',
            '--highlight-line': 'rgba(249, 115, 22, 0.15)',
            '--highlight-border': '#f97316',
            '--code-bg': '#1c0f0a',
            '--border-color': '#5c3418',
            '--btn-bg': '#5c3418',
            '--btn-hover': '#7a4520',
            '--btn-success': '#1a3a2a',
            '--btn-success-hover': '#245540',
            '--btn-warning': '#3a2a1a',
            '--btn-warning-hover': '#554024',
            '--btn-danger': '#3a1a1a',
            '--btn-danger-hover': '#552424',
            '--btn-info': '#1a2a3a',
            '--btn-info-hover': '#244055',
            '--btn-glow': '0 0 0 transparent',
        },
    },
    neon: {
        label: 'Neon',
        vars: {
            '--bg-primary': '#0a0a12',
            '--bg-secondary': '#12121f',
            '--bg-tertiary': '#1a1a2e',
            '--text-primary': '#e0e0ff',
            '--text-secondary': '#8888cc',
            '--text-muted': '#555588',
            '--accent': '#00ffff',
            '--accent-hover': '#33ffff',
            '--bar-default': '#00ffff',
            '--bar-compare': '#ff00ff',
            '--bar-swap': '#ff3366',
            '--bar-sorted': '#00ff88',
            '--bar-found': '#ffff00',
            '--bar-searching': '#8855ff',
            '--highlight-line': 'rgba(0, 255, 255, 0.12)',
            '--highlight-border': '#00ffff',
            '--code-bg': '#0a0a12',
            '--border-color': '#2a2a4a',
            '--btn-bg': '#1a1a3a',
            '--btn-hover': '#2a2a5a',
            '--btn-success': '#0a2a1a',
            '--btn-success-hover': '#104030',
            '--btn-warning': '#2a1a0a',
            '--btn-warning-hover': '#403010',
            '--btn-danger': '#2a0a0a',
            '--btn-danger-hover': '#401010',
            '--btn-info': '#0a1a2a',
            '--btn-info-hover': '#102a40',
            '--btn-glow': '0 0 8px rgba(0, 255, 255, 0.3), 0 0 2px rgba(0, 255, 255, 0.5)',
        },
    },
    monochrome: {
        label: 'Mono',
        vars: {
            '--bg-primary': '#111111',
            '--bg-secondary': '#1a1a1a',
            '--bg-tertiary': '#252525',
            '--text-primary': '#e0e0e0',
            '--text-secondary': '#a0a0a0',
            '--text-muted': '#666666',
            '--accent': '#d4d4d4',
            '--accent-hover': '#e5e5e5',
            '--bar-default': '#d4d4d4',
            '--bar-compare': '#ffffff',
            '--bar-swap': '#a3a3a3',
            '--bar-sorted': '#737373',
            '--bar-found': '#e5e5e5',
            '--bar-searching': '#a3a3a3',
            '--highlight-line': 'rgba(212, 212, 212, 0.1)',
            '--highlight-border': '#d4d4d4',
            '--code-bg': '#111111',
            '--border-color': '#333333',
            '--btn-bg': '#333333',
            '--btn-hover': '#404040',
            '--btn-success': '#1a2a1a',
            '--btn-success-hover': '#244024',
            '--btn-warning': '#2a2a1a',
            '--btn-warning-hover': '#404024',
            '--btn-danger': '#2a1a1a',
            '--btn-danger-hover': '#402424',
            '--btn-info': '#1a1a2a',
            '--btn-info-hover': '#242440',
            '--btn-glow': '0 0 0 transparent',
        },
    },
};

const VisualPolish = {
    /** @type {number|null} */
    _timeoutId: null,

    /** @type {string|null} */
    _activeTheme: null,

    /**
     * Initialise the visual polish module.
     *
     * Restores a saved colour theme and injects the theme selector
     * into the controls bar. Subscribes to completion events for confetti.
     *
     * @returns {void}
     */
    init() {
        this.loadSavedTheme();
        this.injectThemeSelector();
        EventBus.on('algorithm:complete', this.onComplete.bind(this));
    },

    /**
     * Handle algorithm completion by triggering a confetti burst.
     *
     * @returns {void}
     */
    onComplete() {
        this.triggerConfetti();
    },

    /**
     * Spawn confetti particles over the visualizer panel.
     *
     * Each particle is a small div with a random colour, size, and
     * horizontal velocity. Particles animate downward and fade out
     * over CONFETTI_DURATION_MS before being removed from the DOM.
     *
     * @returns {void}
     */
    triggerConfetti() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
        }

        const container = document.getElementById('viz-panel');
        if (!container) return;

        const rect = container.getBoundingClientRect();

        for (let i = 0; i < CONFETTI_COUNT; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';

            const size = Math.random() * 8 + 4;
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + rect.height * 0.3;
            const drift = (Math.random() - 0.5) * 200;
            const rotation = Math.random() * 720 - 360;
            const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
            const delay = Math.random() * 300;

            particle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                animation-delay: ${delay}ms;
                --drift: ${drift}px;
                --rotation: ${rotation}deg;
            `;

            document.body.appendChild(particle);
        }

        this._timeoutId = setTimeout(() => {
            document.querySelectorAll('.confetti-particle').forEach((el) => el.remove());
            this._timeoutId = null;
        }, CONFETTI_DURATION_MS + 500);
    },

    /**
     * Apply a colour theme by overriding CSS custom properties on :root.
     *
     * @param {string} themeId - One of 'ocean', 'forest', 'sunset', 'monochrome'.
     * @returns {void}
     */
    applyTheme(themeId) {
        const theme = THEMES[themeId];
        if (!theme) return;

        const root = document.documentElement;
        Object.entries(theme.vars).forEach(([prop, value]) => {
            root.style.setProperty(prop, value);
        });

        this._activeTheme = themeId;
        localStorage.setItem(STORAGE_KEY, themeId);
    },

    /**
     * Clear a previously applied colour theme, reverting to the
     * browser-defined CSS custom properties.
     *
     * @returns {void}
     */
    clearTheme() {
        const theme = THEMES[this._activeTheme];
        if (!theme) return;

        const root = document.documentElement;
        Object.keys(theme.vars).forEach((prop) => {
            root.style.removeProperty(prop);
        });

        this._activeTheme = null;
        localStorage.removeItem(STORAGE_KEY);
    },

    /**
     * Restore a saved colour theme from localStorage.
     *
     * @returns {void}
     */
    loadSavedTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && THEMES[saved]) {
            this.applyTheme(saved);
        }
    },

    /**
     * Inject a theme selector dropdown next to the theme toggle button.
     *
     * @returns {void}
     */
    injectThemeSelector() {
        const themeBtn = document.getElementById('btn-theme');
        if (!themeBtn) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'theme-selector-wrapper';

        const select = document.createElement('select');
        select.id = 'color-theme-select';
        select.title = 'Color theme';

        const defaultOpt = document.createElement('option');
        defaultOpt.value = '';
        defaultOpt.textContent = 'Default';
        select.appendChild(defaultOpt);

        Object.entries(THEMES).forEach(([id, theme]) => {
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = theme.label;
            if (this._activeTheme === id) opt.selected = true;
            select.appendChild(opt);
        });

        select.addEventListener('change', () => {
            const value = select.value;
            if (value) {
                this.applyTheme(value);
            } else {
                this.clearTheme();
            }
        });

        wrapper.appendChild(select);
        themeBtn.parentNode.insertBefore(wrapper, themeBtn);
    },
};

export default VisualPolish;
