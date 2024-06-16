import { renderHook, act } from "@testing-library/react-hooks";
import { useState } from 'react';
import useLatest from "./index";


describe("useLatest", () => {
  it("should return the latest value", () => {
    const { result, rerender } = renderHook(({value}) => useLatest(value), {
        initialProps: { value: 0 }
    });
    expect(result.current.current).toBe(0);

    rerender({ value: 1 });
    expect(result.current.current).toBe(1);

    rerender({ value: 2 });
    expect(result.current.current).toBe(2);
  });



  it("should not change the ref between renders", () => {
    const { result, rerender } = renderHook(({ value }) => useLatest(value), { initialProps: { value: 0 } });

    const firstRef = result.current;
    rerender({ value: 2 });
    const secondRef = result.current;
    expect(firstRef).toBe(secondRef);
    expect(result.current.current).toBe(2);
  });

  it('should work with useState', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const latestCount = useLatest(count);
      return { count, setCount, latestCount };
    });

    expect(result.current.latestCount.current).toBe(0);

    act(() => {
      result.current.setCount(1);
    });
    expect(result.current.latestCount.current).toBe(1);

    act(() => {
      result.current.setCount(2);
    });
    expect(result.current.latestCount.current).toBe(2);
  });
});
