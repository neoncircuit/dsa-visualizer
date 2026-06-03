/**
 * Feature flags for optional modules.
 *
 * Controls which enhancement modules are active.
 * Set a flag to false to disable a module without removing its code.
 *
 * @type {Object.<string, boolean>}
 */
const FEATURES = {
    FEEDBACK: true,
    VISUAL_POLISH: true,
    GAMIFICATION: true,
    EDUCATIONAL: true,
    INTERACTIVITY: true,
    INTERVIEW_PREP: true,
};

export default FEATURES;
