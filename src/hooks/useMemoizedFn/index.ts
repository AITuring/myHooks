/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useMemo } from "react";

type AnyFunction = (this: any, ...args: any[]) => any;

type PickFunction<T extends AnyFunction> = (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
) => ReturnType<T>;

const useMemoizedFn = <T extends AnyFunction>(fn: T): T => {
    const fnRef = useRef<T>(fn);

    // 更新最新的函数引用
    // why not write `fnRef.current = fn`?
    // https://github.com/alibaba/hooks/issues/728
    fnRef.current = useMemo<T>(() => fn, [fn]);

    const memoizedFn = useRef<PickFunction<T>>();
    if (!memoizedFn.current) {
        memoizedFn.current = function (this, ...args) {
            return fnRef.current.apply(this, args);
        };
    }

    return memoizedFn.current as T;

    // const memoizedFn = (...args: Parameters<T>): ReturnType<T> => {
    //     return fnRef.current(...args);
    // };

    // return memoizedFn as T;
    // 没注释代码使用了 useRef 来创建 memoizedFn，这个引用对象在组件的整个生命周期内保持不变。这样做的好处是确保 memoizedFn 的地址在组件的整个生命周期内保持不变，且不需要每次重新创建函数。
    // 注释代码直接创建了一个函数 memoizedFn 并返回它。这段代码每次 useMemoizedFn 被调用时，都会创建一个新的函数对象，这意味着每次返回的函数地址都会变化。
    // 函数地址变化：

    // 在没注释代码中，memoizedFn 只会在第一次渲染时创建，之后不会再改变，这确保了 memoizedFn 的地址在整个生命周期内保持不变。
    // 在注释代码中，每次 useMemoizedFn 调用时都会创建一个新的函数对象，这会导致 memoizedFn 的地址每次都会变化。

    // 在 React 中，如果你传递给子组件的函数地址变化了，即使函数的逻辑没有变化，React 仍然会认为这是一个新的属性值，这可能导致子组件的重新渲染。而在使用 React.memo 的时候，这一点尤其重要，因为 React.memo 是基于浅比较来决定是否重新渲染组件的。

    // 未注释代码确保了 memoizedFn 的地址在整个组件生命周期内不变，这样传递给 ExpensiveTree 组件的 showCount 属性在 count 改变时不会变化，从而避免了不必要的重新渲染。
    // 注释代码每次 count 改变时都会创建一个新的 memoizedFn，导致传递给 ExpensiveTree 组件的 showCount 属性变化，从而导致组件重新渲染。
};

export default useMemoizedFn;
