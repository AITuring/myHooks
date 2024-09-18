import { useState, useEffect } from "react";
import { useUpdateEffect } from "@/hooks";
import { Button, Card } from "@/components";

const UpdateEffectDemo: React.FC = () => {
    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);
    const [updateEffectCount, setUpdateEffectCount] = useState(0);

    useEffect(() => {
        setEffectCount((c) => c + 1);
    }, [count]);

    useUpdateEffect(() => {
        setUpdateEffectCount((c) => c + 1);
        return () => {
            // do something
        };
    }, [count]); // you can include deps array if necessary

    return (
        <Card
            title="useUpdateEffect"
            content={
                <>
                    <p>effectCount: {effectCount}</p>
                    <p>updateEffectCount: {updateEffectCount}</p>
                </>
            }
            operation={
                <Button onClick={() => setCount((prev) => prev + 1)}>
                    reRender
                </Button>
            }
        />
    );
};

export default UpdateEffectDemo;
