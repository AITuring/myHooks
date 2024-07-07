import { renderHook } from "@testing-library/react-hooks";
import { vi, describe, it } from "vitest";
import useMemoizedFn from ".";
import { useState } from "react";

describe("useMemoizedFn", () => {
    it("should return the same function instance across renders", () => {
        const fn = vi.fn();
        const { result, rerender } = renderHook(() => useMemoizedFn(fn));
        const firstInstance = result.current;
        rerender();
        const secondInstance = result.current;
        expect(firstInstance).toBe(secondInstance);
    });

    it("should call the memorized function with latest props",() => {
        let count = 0;
        const {result, rerender} = renderHook(() => useMemoizedFn(() => count));

        count++;
        rerender();
        expect(result.current()).toBe(1);
    });

    it("should correctly maintain function identity after prop changes", () => {
        const initialFn = vi.fn();
        const updatedFn = vi.fn();

        const {result, rerender} = renderHook(({fn}) => useMemoizedFn(fn), {
            initialProps: {fn: initialFn}
        });

        const firstInstance = result.current;
        rerender({fn: updatedFn});
        const secondInstance = result.current;

        expect(firstInstance).toBe(secondInstance);
    });

    it("should call the latest function when invoked", () => {
        let count = 0;
        const {result, rerender} = renderHook(() => useMemoizedFn(() => count));

        count++;
        rerender();
        expect(result.current()).toBe(1);
    });

    it("should maintain stable function reference ", () => {
        const {result, rerender} = renderHook(() => {
            const [count, setCount] = useState(0);
            const memoizedFn = useMemoizedFn(() => count);
            return {
                setCount,
                memoizedFn
            }
        });

        const firstFn = result.current.memoizedFn;
        result.current.setCount(1);
        rerender();
        const secondFn = result.current.memoizedFn;
        expect(firstFn).toBe(secondFn);
    });
});
