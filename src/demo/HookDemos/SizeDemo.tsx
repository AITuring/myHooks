import { useRef } from "react";
import { useSize } from "@/hooks";
import { Card } from "@/components";

const SizeDemo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const size = useSize(ref);
    console.log("size", size);

    return (
        <Card
            ref={ref}
            title="useSize"
            content={
                <>
                    <h3> width: {size?.width}px</h3>
                    <h3>height: {size?.height}px</h3>
                </>
            }
            operation={<div>改变窗口大小试试😜</div>}
        />
    );
};

export default SizeDemo;
