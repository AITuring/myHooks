import { useMemoizedFn } from "@/hooks";
import React, { useCallback, useRef, useState } from "react";
import "../demo.css";

const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
    const renderCountRef = useRef(0);
    renderCountRef.current += 1;

    return (
        <div>
            <p>Render Count: {renderCountRef.current}</p>
            <button type="button" onClick={showCount}>
                showParentCount
            </button>
        </div>
    );
});

const MemoizedFnDemo: React.FC = () => {
    const [count, setCount] = useState(0);

    const callbackFn = useCallback(() => {
        alert(`Current count is ${count}`);
    }, [count]);

    const memoizedFn = useMemoizedFn(() => {
        alert(`Current count is ${count}`);
    });

    return (
        <div className="hook">
            <div className="hook-head">
                <h2>useMemoizedFn</h2>
            </div>
            <div className="content">
                <h3>count: {count}</h3>
                <button
                    onClick={() => {
                        setCount((c) => c + 1);
                    }}
                >
                    Add Count
                </button>
                <h3>Component with useCallback function:</h3>
                <ExpensiveTree showCount={callbackFn} />
                <h3>Component with useMemoizedFn function:</h3>
                <ExpensiveTree showCount={memoizedFn} />
            </div>
        </div>
    );
};

export default MemoizedFnDemo;
