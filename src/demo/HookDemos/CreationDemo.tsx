import React, { useState } from "react";
import { useCreation } from "@/hooks";
import { Button, Card } from "@/components";

const CreationDemo: React.FC = () => {
    const [flag, setFlag] = useState(false);

    const getNowData = () => Math.random();

    const nowData = useCreation(() => getNowData(), []);

    return (
        <Card
            title="useCreation"
            content={
                <>
                    <h3>正常的函数： {getNowData()}</h3>
                    <h3>useCreation包裹后的： {nowData}</h3>
                </>
            }
            operation={
                <Button
                    onClick={() => {
                        setFlag((v) => !v);
                    }}
                >
                    切换状态{JSON.stringify(flag)}
                </Button>
            }
        />
    );
};

export default CreationDemo;
