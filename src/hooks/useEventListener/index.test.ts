import { renderHook } from '@testing-library/react-hooks';
import { vi, describe, it, expect } from 'vitest';
import useEventListener from '.';

describe('useEventListener', () => {
  it('should attach and detach event listener', () => {
    const element = document.createElement('div');
    const handler = vi.fn();

    // First render to attach the event listener
    const { unmount } = renderHook(() => useEventListener('click', handler, element));

    // Trigger event to check if handler is called
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);

    // Unmount hook to check if event listener is removed
    unmount();

    // Trigger event to check if handler is not called after unmount
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);  // Should still be 1, since listener should have been removed
  });

  it('should update event handler', () => {
    const element = document.createElement('div');
    const initialHandler = vi.fn();
    const updatedHandler = vi.fn();

    // First render with initial handler
    const { rerender, unmount } = renderHook(
      ({ handler }) => useEventListener('click', handler, element),
      { initialProps: { handler: initialHandler } }
    );

    // Trigger event to check if initial handler is called
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(initialHandler).toHaveBeenCalledTimes(1);
    expect(updatedHandler).not.toHaveBeenCalled();

    // Update handler
    rerender({ handler: updatedHandler });

    // Trigger event to check if updated handler is called
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(initialHandler).toHaveBeenCalledTimes(1); // Initial handler should not be called again
    expect(updatedHandler).toHaveBeenCalledTimes(1); // Updated handler should be called once

    // Clean up
    unmount();
});
});
