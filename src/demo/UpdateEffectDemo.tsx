import { useState, useEffect } from "react";
import { useUpdateEffect } from "../hooks";
import "./demo.css";

const UpdateEffectDemo: React.FC = () => {
    const [count, setCount] = useState(0);
    const [effectCount, setEffectCount] = useState(0);
    const [updateEffectCount, setUpdateEffectCount] = useState(0);

    useEffect(() => {
        console.log("useEffect", { count, effectCount });
        setEffectCount((c) => c + 1);
    }, [count]);

    useUpdateEffect(() => {
        console.log('useUpdateEffect', { count, updateEffectCount });
        setUpdateEffectCount((c) => c + 1);
        return () => {
            // do something
        };
    }, [count]); // you can include deps array if necessary

    console.log(count, effectCount, updateEffectCount);

    return (
        <div className="hook">
            <div className="hook-head">
                <h2>useUpdateEffect</h2>
                <p>effectCount: {effectCount}</p>
                <p>updateEffectCount: {updateEffectCount}</p>
            </div>
            <div className="content">
                <button onClick={() => setCount(prev => prev + 1)}>
                    reRender
                </button>
            </div>
        </div>
    );
};

export default UpdateEffectDemo;
