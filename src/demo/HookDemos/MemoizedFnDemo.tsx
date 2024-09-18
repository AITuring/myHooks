import { useMemoizedFn } from "@/hooks";
import React, { useCallback, useRef, useState } from "react";
import {Button, Card} from '@/components'

const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
    const renderCountRef = useRef(0);
    renderCountRef.current += 1;

    return (
        <div>
            <p>Render Count: {renderCountRef.current}</p>
            <Button onClick={showCount}>
                showParentCount
            </Button>
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
        <Card
        title="useMemoizedFn"
        content={
            <>
            <h3>count: {count}</h3>
            <h3>Component with useCallback function:</h3>
                <ExpensiveTree showCount={callbackFn} />
                <h3>Component with useMemoizedFn function:</h3>
                <ExpensiveTree showCount={memoizedFn} />
            </>
        }
        operation={
            <Button
                onClick={() => {
                    setCount((c) => c + 1);
                }}
            >
                Add Count
            </Button>
        }
        />
    );
};

export default MemoizedFnDemo;
