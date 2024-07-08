import { useRef } from "react";
import { useHover } from "../hooks";
import "./demo.css";

const HoverDemo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isHovering = useHover(ref);

    return (
        <div className="hook">
            <div className="hook-head">
                <h2>useHover</h2>
            </div>
            <div className="content" ref={ref}>
                {isHovering ? "Hover me" : "Not hovering"}
            </div>
        </div>
    );
};

export default HoverDemo;
