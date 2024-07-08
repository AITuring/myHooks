import { renderHook } from "@testing-library/react-hooks";
import { vi, describe, it, expect } from "vitest";
import useHover, { HoverOptions } from ".";
import { useRef } from "react";

describe("useHover", () => {
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement("div");
        document.body.appendChild(element);
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it("should call onEnter when mouse enter", () => {
        const onEnter = vi.fn();
        const options: HoverOptions = { onEnter };

        const { result } = renderHook(() => {
            const ref = useRef<HTMLElement>(element);
            return useHover(ref, options);
        });

        element.dispatchEvent(new MouseEvent("mouseenter"));
        expect(onEnter).toHaveBeenCalled();
        expect(result.current).toBe(true);
    });

    it("should call onLeave when mouse leave", () => {
        const onLeave = vi.fn();
        const options: HoverOptions = { onLeave };
        const { result } = renderHook(() => {
            const ref = useRef<HTMLElement>(element);
            return useHover(ref, options);
        });

        element.dispatchEvent(new Event("mouseenter"));
        element.dispatchEvent(new MouseEvent("mouseleave"));
        expect(onLeave).toHaveBeenCalled();
        expect(result.current).toBe(false);
    });

    it("should call onChange with correct values", () => {
        const onChange = vi.fn();
        const options: HoverOptions = { onChange };

        const { result } = renderHook(() => {
            const ref = useRef<HTMLElement>(element);
            return useHover(ref, options);
        });

        element.dispatchEvent(new Event("mouseenter"));
        expect(onChange).toHaveBeenCalledWith(true);
        expect(result.current).toBe(true);

        element.dispatchEvent(new Event("mouseleave"));
        expect(onChange).toHaveBeenCalledWith(false);
        expect(result.current).toBe(false);
    });

    it("should update isEnter state correctly", () => {
        const { result } = renderHook(() => {
            const ref = useRef<HTMLElement>(element);
            return useHover(ref);
        });

        element.dispatchEvent(new Event("mouseenter"));
        expect(result.current).toBe(true);

        element.dispatchEvent(new Event("mouseleave"));
        expect(result.current).toBe(false);
    });
});
