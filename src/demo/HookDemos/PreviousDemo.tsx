import { useState } from "react";
import { usePrevious } from "@/hooks";
import {Button, Card} from '@/components'

const PreviousDemo: React.FC = () => {
    const [count, setCount] = useState(10);
    const prevCount = usePrevious(count);

    return (
        <Card
            title="usePrevious"
            content={
                <>
                <h3>current count: {count}</h3>
                <h3>previous count: {prevCount}</h3></>
            }
            operation={
                <Button onClick={() => setCount(count * 2)}>改变</Button>
            }
            />
    );
};

export default PreviousDemo;
