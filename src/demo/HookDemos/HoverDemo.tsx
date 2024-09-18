import { useRef } from "react";
import { useHover } from "@/hooks";
import { Card } from "@/components";

const HoverDemo: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isHovering = useHover(ref);

    return (
        <Card
            title="useHover"
            content={
                <div ref={ref}>
                {isHovering ? "hovering 😁" : "Not hovering 🤔"}
            </div>
            }
        />
    );
};

export default HoverDemo;
