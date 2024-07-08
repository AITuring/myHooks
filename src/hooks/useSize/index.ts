import ResizeObserver from "resize-observer-polyfill";
import { RefObject, useEffect, useState } from "react";

type Size = {
    width: number;
    height: number;
};

type ResizeObserverEntryType = {
    target: HTMLElement;
    contentRect: {
        width: number;
        height: number;
        // 其他属性...
    };
    // 其他属性...
};

const useSize = (targetRef: RefObject<HTMLElement>): Size | undefined => {
    const [size, setSize] = useState<Size | undefined>(() => {
        const el = targetRef.current;
        return el ? { width: el.clientWidth, height: el.clientHeight } : undefined;
    });

    useEffect(() => {
        const el = targetRef.current;
        if (!el) return;
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach(entry => {
                const {clientWidth, clientHeight} = entry.target;
                setSize({ width: clientWidth, height: clientHeight });
            })
        });
        resizeObserver.observe(el);

        return () => {
            resizeObserver.disconnect();
        }
    }, []);

    return size;

}

export default useSize;
