import { renderHook, act } from "@testing-library/react-hooks";
import useCountDown from "./index";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.useFakeTimers();

describe("useCountDown", () => {
  const maxDuration = 50; // 50s
  const interval = 1000; // 1s

  beforeEach(() => {
    vi.clearAllTimers();
  });

  it("should initialize with the correct time", () => {
    const { result } = renderHook(() => useCountDown(maxDuration));
    expect(result.current.time).toBe(maxDuration);
    expect(result.current.formattedTime).toBe("50秒");
  });

  it("should start the countdown", () => {
    const { result } = renderHook(() =>
      useCountDown(maxDuration, { interval })
    );
    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(interval);
    });
    expect(result.current.time).toBe(maxDuration - interval / 1000);
    expect(result.current.formattedTime).toBe("49秒");
  });

  it("should pause the countdown", () => {
    const { result } = renderHook(() =>
      useCountDown(maxDuration, { interval })
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(interval);
    });

    act(() => {
      result.current.pause();
    });

    const pausedTime = result.current.time;

    act(() => {
      vi.advanceTimersByTime(interval);
    });

    expect(result.current.time).toBe(pausedTime);
    expect(result.current.formattedTime).toBe("49秒");
  });

  it("should reset the countdown", () => {
    const { result } = renderHook(() =>
      useCountDown(maxDuration, { interval })
    );
    act(() => {
      result.current.start();
    });
    act(() => {
      vi.advanceTimersByTime(interval);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.time).toBe(maxDuration);
    expect(result.current.formattedTime).toBe("50秒");
  });

  it("should call onEnd callback when countdown ends", () => {
    const onEnd = vi.fn();
    const { result } = renderHook(() =>
      useCountDown(maxDuration, { interval, stopTime: 0, onEnd })
    );

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(maxDuration * 1000);
    });

    expect(onEnd).toHaveBeenCalled();
    expect(result.current.time).toBe(0);
    expect(result.current.formattedTime).toBe("0秒");
  });
});
