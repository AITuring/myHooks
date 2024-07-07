/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

type AnyFunction = (...args: any[]) => any;


const useMemoizedFn = <T extends AnyFunction>(fn: T): T => {
    const fnRef = useRef(fn);

    // 更新最新的函数引用
    fnRef.current = fn;

    const memoizedFn = (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args);
    };

    return memoizedFn as T;
};


export default useMemoizedFn;
