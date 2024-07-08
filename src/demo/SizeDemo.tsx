import { useRef } from "react";
import { useSize } from "../hooks";
import "./demo.css";

const SizeDemo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const size = useSize(ref);

    return (
        <div className="hook" ref={ref}>
            <div className="hook-head">
                <h2>useSize</h2>
                <h3> width: {size?.width}px</h3>
                <h3>height: {size?.height}px</h3>
            </div>
            <div className="content">
                改变窗口大小试试看
            </div>
        </div>
    );
};

export default SizeDemo;
