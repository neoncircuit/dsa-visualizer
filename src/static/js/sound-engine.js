/**
 * Sound Engine module.
 *
 * Generates tonal sounds using the Web Audio API to accompany
 * algorithm visualization. Each bar's value maps to a pitch,
 * giving an auditory representation of the data.
 */

const SoundEngine = (() => {
    let audioCtx = null;
    let enabled = true;
    let volume = 0.3;

    // Frequency range for mapping values to pitch (Hz)
    const MIN_FREQ = 200;
    const MAX_FREQ = 800;

    /**
     * Lazily initialize the AudioContext (requires user gesture).
     */
    function ensureContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    /**
     * Play a tone corresponding to a value within the array range.
     *
     * @param {number} value - The array element value.
     * @param {number} maxValue - The maximum value in the array.
     * @param {number} duration - Tone duration in milliseconds.
     * @param {string} type - Oscillator waveform type.
     */
    function playTone(value, maxValue, duration = 50, type = 'sine') {
        if (!enabled || !audioCtx) return;

        const ratio = value / Math.max(maxValue, 1);
        const frequency = MIN_FREQ + ratio * (MAX_FREQ - MIN_FREQ);

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + duration / 1000);
    }

    /**
     * Play a sound for a comparison operation.
     *
     * @param {number} value - The value being compared.
     * @param {number} maxValue - The max value in the array.
     */
    function playCompare(value, maxValue) {
        playTone(value, maxValue, 40, 'sine');
    }

    /**
     * Play a sound for a swap operation.
     *
     * @param {number} value - The value being swapped.
     * @param {number} maxValue - The max value in the array.
     */
    function playSwap(value, maxValue) {
        playTone(value, maxValue, 60, 'triangle');
    }

    /**
     * Play a completion sound (ascending arpeggio).
     */
    function playComplete() {
        if (!enabled || !audioCtx) return;

        const notes = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
        notes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.1);
            gain.gain.setValueAtTime(volume * 0.5, audioCtx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.1 + 0.2);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(audioCtx.currentTime + i * 0.1);
            osc.stop(audioCtx.currentTime + i * 0.1 + 0.2);
        });
    }

    /**
     * Play a "not found" sound (descending tone).
     */
    function playNotFound() {
        if (!enabled || !audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(volume * 0.4, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.3);
    }

    /**
     * Toggle sound on/off.
     *
     * @returns {boolean} New enabled state.
     */
    function toggle() {
        enabled = !enabled;
        return enabled;
    }

    /**
     * Check if sound is currently enabled.
     *
     * @returns {boolean} True if enabled.
     */
    function isEnabled() {
        return enabled;
    }

    /**
     * Set the volume level.
     *
     * @param {number} val - Volume between 0 and 1.
     */
    function setVolume(val) {
        volume = Math.max(0, Math.min(1, val));
    }

    return { ensureContext, playCompare, playSwap, playComplete, playNotFound, toggle, isEnabled, setVolume };
})();

export default SoundEngine;
