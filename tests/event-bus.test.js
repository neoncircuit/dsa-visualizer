import { describe, it, expect, beforeEach, vi } from 'vitest';
import EventBus from '../src/static/js/event-bus.js';

describe('EventBus', () => {
    beforeEach(() => {
        EventBus.clear();
    });

    describe('on', () => {
        it('calls handler when event is emitted', () => {
            const handler = vi.fn();
            EventBus.on('test', handler);
            EventBus.emit('test', { data: 42 });
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith({ data: 42 });
        });

        it('supports multiple handlers on the same event', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();
            EventBus.on('test', handler1);
            EventBus.on('test', handler2);
            EventBus.emit('test');
            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
        });

        it('does not call handlers for different events', () => {
            const handler = vi.fn();
            EventBus.on('a', handler);
            EventBus.emit('b');
            expect(handler).not.toHaveBeenCalled();
        });

        it('returns an unsubscribe function', () => {
            const handler = vi.fn();
            const unsub = EventBus.on('test', handler);
            unsub();
            EventBus.emit('test');
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('off', () => {
        it('removes a specific handler', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();
            EventBus.on('test', handler1);
            EventBus.on('test', handler2);
            EventBus.off('test', handler1);
            EventBus.emit('test');
            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).toHaveBeenCalledTimes(1);
        });

        it('does nothing when removing a handler that was never registered', () => {
            const handler = vi.fn();
            EventBus.off('test', handler);
            expect(() => EventBus.emit('test')).not.toThrow();
        });
    });

    describe('emit', () => {
        it('passes payload to all handlers', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();
            EventBus.on('test', handler1);
            EventBus.on('test', handler2);
            EventBus.emit('test', { key: 'value' });
            expect(handler1).toHaveBeenCalledWith({ key: 'value' });
            expect(handler2).toHaveBeenCalledWith({ key: 'value' });
        });

        it('continues calling handlers if one throws', () => {
            const handler1 = vi.fn(() => { throw new Error('boom'); });
            const handler2 = vi.fn();
            EventBus.on('test', handler1);
            EventBus.on('test', handler2);
            expect(() => EventBus.emit('test')).not.toThrow();
            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
        });

        it('works without a payload', () => {
            const handler = vi.fn();
            EventBus.on('test', handler);
            EventBus.emit('test');
            expect(handler).toHaveBeenCalledWith(undefined);
        });
    });

    describe('once', () => {
        it('calls handler only once', () => {
            const handler = vi.fn();
            EventBus.once('test', handler);
            EventBus.emit('test');
            EventBus.emit('test');
            EventBus.emit('test');
            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('returns an unsubscribe function', () => {
            const handler = vi.fn();
            const unsub = EventBus.once('test', handler);
            unsub();
            EventBus.emit('test');
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('clear', () => {
        it('removes all handlers for a specific event', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();
            EventBus.on('a', handler1);
            EventBus.on('a', handler2);
            EventBus.on('b', vi.fn());
            EventBus.clear('a');
            EventBus.emit('a');
            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).not.toHaveBeenCalled();
        });

        it('removes all handlers when no event is specified', () => {
            const handlerA = vi.fn();
            const handlerB = vi.fn();
            EventBus.on('a', handlerA);
            EventBus.on('b', handlerB);
            EventBus.clear();
            EventBus.emit('a');
            EventBus.emit('b');
            expect(handlerA).not.toHaveBeenCalled();
            expect(handlerB).not.toHaveBeenCalled();
        });
    });
});
