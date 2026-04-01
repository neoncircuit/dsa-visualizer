/**
 * Lightweight event emitter for decoupled module communication.
 *
 * Enhancement modules subscribe to lifecycle events emitted by the core
 * application. This ensures modules are completely decoupled from main.js
 * and can be added, removed, or replaced without modifying core logic.
 *
 * @example
 * import EventBus from './event-bus.js';
 *
 * EventBus.on('algorithm:complete', (payload) => {
 *     console.log('Algorithm finished:', payload.algoKey);
 * });
 *
 * EventBus.emit('algorithm:complete', { algoKey: 'bubbleSort', ... });
 *
 * @module event-bus
 */

class EventEmitter {
    constructor() {
        /** @type {Map<string, Array<Function>>} */
        this.listeners = new Map();
    }

    /**
     * Subscribe to an event.
     *
     * @param {string} event - Event name.
     * @param {Function} callback - Handler function called when the event fires.
     * @returns {Function} Unsubscribe function.
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);

        return () => this.off(event, callback);
    }

    /**
     * Remove a previously registered event handler.
     *
     * @param {string} event - Event name.
     * @param {Function} callback - The exact function reference passed to on().
     * @returns {void}
     */
    off(event, callback) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    /**
     * Emit an event, calling all registered handlers.
     *
     * Errors in individual handlers are caught and logged so they
     * do not prevent other handlers from executing.
     *
     * @param {string} event - Event name.
     * @param {*} [payload] - Data to pass to handlers.
     * @returns {void}
     */
    emit(event, payload) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach((callback) => {
                try {
                    callback(payload);
                } catch (error) {
                    console.error(`Error in event handler for "${event}":`, error);
                }
            });
        }
    }

    /**
     * Subscribe to an event, but automatically unsubscribe after the first invocation.
     *
     * @param {string} event - Event name.
     * @param {Function} callback - Handler function called once.
     * @returns {Function} Unsubscribe function.
     */
    once(event, callback) {
        const wrapper = (payload) => {
            callback(payload);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    }

    /**
     * Remove all handlers for a specific event, or all events entirely.
     *
     * @param {string} [event] - Event name. If omitted, clears all handlers.
     * @returns {void}
     */
    clear(event) {
        if (event) {
            this.listeners.delete(event);
        } else {
            this.listeners.clear();
        }
    }
}

const EventBus = new EventEmitter();
export default EventBus;
