import { renderHook } from "@testing-library/react-hooks";
import usePrevious from "./index";

describe("usePrevious", () => {
  it("should return undefined on initial render", () => {
    const { result } = renderHook(() => usePrevious(0));
    expect(result.current).toBeUndefined();
  });
  it("should return the previous value", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });
    rerender({ value: 1 });
    expect(result.current).toBe(0);

    rerender({ value: 2 });
    expect(result.current).toBe(1);
  });

  it('should return previous value for different types', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
        initialProps: { value: 'initial' },
    });
    rerender({ value: "updated" });
    expect(result.current).toBe('initial');
    rerender({ value: true });
    expect(result.current).toBe("updated");
    rerender({ value: 1 });
    expect(result.current).toBe(true);
  })
});


