/**
 * Recorder module.
 *
 * Captures the current browser tab as a video using the MediaRecorder API.
 * Supports multiple quality presets optimized for different output formats.
 */

const Recorder = (() => {
    /** @type {MediaRecorder|null} */
    let mediaRecorder = null;
    /** @type {Blob[]} */
    let chunks = [];
    /** @type {MediaStream|null} */
    let stream = null;
    /** @type {boolean} */
    let recording = false;

    /**
     * Quality presets mapping resolution and bitrate.
     *
     * @type {Object.<string, {label: string, width: number, height: number, bitrate: number, fps: number}>}
     */
    const PRESETS = {
        'shorts-1080': {
            label: 'Shorts 1080p (1080x1920)',
            width: 1080,
            height: 1920,
            bitrate: 8_000_000,
            fps: 60,
        },
        'shorts-720': {
            label: 'Shorts 720p (720x1280)',
            width: 720,
            height: 1280,
            bitrate: 5_000_000,
            fps: 60,
        },
        'landscape-1080': {
            label: 'Landscape 1080p (1920x1080)',
            width: 1920,
            height: 1080,
            bitrate: 8_000_000,
            fps: 60,
        },
        'landscape-720': {
            label: 'Landscape 720p (1280x720)',
            width: 1280,
            height: 720,
            bitrate: 5_000_000,
            fps: 30,
        },
        'landscape-4k': {
            label: 'Landscape 4K (3840x2160)',
            width: 3840,
            height: 2160,
            bitrate: 20_000_000,
            fps: 60,
        },
        'shorts-4k': {
            label: 'Shorts 4K (2160x3840)',
            width: 2160,
            height: 3840,
            bitrate: 20_000_000,
            fps: 60,
        },
    };

    /**
     * Get all available quality presets.
     *
     * @returns {Object.<string, {label: string}>} Preset keys and labels.
     */
    function getPresets() {
        return PRESETS;
    }

    /**
     * Check if currently recording.
     *
     * @returns {boolean} True if recording.
     */
    function isRecording() {
        return recording;
    }

    /**
     * Start recording the current browser tab.
     *
     * @param {string} presetKey - The quality preset key to use.
     * @param {function} onStop - Callback when recording stops (receives Blob URL).
     * @returns {Promise<boolean>} True if recording started successfully.
     */
    async function start(presetKey, onStop) {
        if (recording) return false;

        const preset = PRESETS[presetKey] || PRESETS['landscape-1080'];

        try {
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: { ideal: preset.width },
                    height: { ideal: preset.height },
                    frameRate: { ideal: preset.fps },
                    displaySurface: 'browser',
                },
                audio: true,
                preferCurrentTab: true,
            });

            chunks = [];

            const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
                ? 'video/webm;codecs=vp9,opus'
                : MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')
                    ? 'video/webm;codecs=vp8,opus'
                    : 'video/webm';

            mediaRecorder = new MediaRecorder(stream, {
                mimeType,
                videoBitsPerSecond: preset.bitrate,
            });

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: mimeType });
                const url = URL.createObjectURL(blob);
                recording = false;
                cleanup();

                // Auto-download the file
                const a = document.createElement('a');
                a.href = url;
                a.download = `dsa-visualizer-${Date.now()}.webm`;
                a.click();

                if (onStop) onStop(url);
            };

            // If user stops sharing via browser UI, handle gracefully
            stream.getVideoTracks()[0].onended = () => {
                if (recording) stop();
            };

            mediaRecorder.start(100);
            recording = true;
            return true;
        } catch (err) {
            console.warn('Recording failed:', err.message);
            cleanup();
            return false;
        }
    }

    /**
     * Stop the current recording. Triggers file download.
     *
     * @returns {void}
     */
    function stop() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        recording = false;
    }

    /**
     * Clean up media streams.
     *
     * @returns {void}
     */
    function cleanup() {
        if (stream) {
            stream.getTracks().forEach((t) => t.stop());
            stream = null;
        }
        mediaRecorder = null;
    }

    return { getPresets, isRecording, start, stop };
})();

export default Recorder;
