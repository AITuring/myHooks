import { useState, useEffect } from "react";
import { useLatest } from "@/hooks";
import { Card } from "@/components";

const LatestDemo: React.FC = () => {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const latestCountRef = useLatest(count);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(latestCountRef.current + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount2(count2 + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card
            title="useLatest"
            content={
                <>
                    <h3>default count: {count2}</h3>
                    <h3>latest count: {count}</h3>
                </>
            }
        />
    );
};

export default LatestDemo;
