import { renderHook } from "@testing-library/react-hooks";
import { describe, vi, it, expect } from "vitest";
import useUpdateEffect from ".";


describe('useUpdateEffect', () => {
    it('should not call effect on initial mount', () => {
        const effect = vi.fn()
        renderHook(() => useUpdateEffect(effect, []));
        expect(effect).not.toHaveBeenCalled()
    });

    it('should call effect on dependency update', () => {
        const effect = vi.fn()
        const {rerender} = renderHook(({deps}) => useUpdateEffect(effect, deps), {
            initialProps: {deps: [1]}
        });

        expect(effect).not.toHaveBeenCalled();
        rerender({deps: [2]});
        expect(effect).toHaveBeenCalledTimes(1);
    })

    it('should not call effect if dependency does not change', () => {
        const effect = vi.fn();

        const {rerender} = renderHook(({deps}) => useUpdateEffect(effect, deps), {
            initialProps: {deps: [1]}
        });

        expect(effect).not.toHaveBeenCalled();
        rerender({deps: [1]});
        expect(effect).not.toHaveBeenCalled();
    })
})
