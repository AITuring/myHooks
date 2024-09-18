import { useInteractions, useFloating, useHover } from "@floating-ui/react";
import { useState } from "react";
import {Button} from '@/components';

export default function Popover() {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        strategy: "fixed",
    });

    const hover = useHover(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return (
        <>
            <Button ref={refs.setReference} {...getReferenceProps()}>
                hello
            </Button>
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    光光光光光
                </div>
            )}
        </>
    );
}
