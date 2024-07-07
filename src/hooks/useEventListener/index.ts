import { useEffect, useRef } from "react";

type EventHandler = (event: Event) => void;

const useEventListener = (eventName: string, handler: EventHandler, element: EventTarget = window) => {
    const savedHandler = useRef<EventHandler | undefined>();

    useEffect(() => {
        savedHandler.current = handler

    },[handler])

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (! isSupported) {
            return;
        }

        const eventListener = (event: Event) => {
            if (savedHandler.current) {
                savedHandler.current(event)
            }
        };
        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName,eventListener);
        }
    }, [eventName, element]);
}

export default useEventListener;