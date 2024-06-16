import {useState, useEffect, useRef, useCallback} from "react";

interface CountDown {
    time: number,
    start: () => void,
    pause: () => void,
    reset: () => void,
}

const useCountDown = (maxDuration: number):CountDown => {
    const [time, setTime] = useState<number>(maxDuration);
    const [isActive, setActive] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // 清除定时器
    const clearTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = null;
    }, [])

    useEffect(() => {
        return () => {
            clearTimer();
        }
    }, [clearTimer])

    const start = useCallback(() => {
        if (isActive) return;

        setActive(true);

        intervalRef.current = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 1) {
                    clearTimer();
                    setActive(false);
                    return 0;
                }
                return prevTime - 1
            });
        }, 1000);
    } ,[isActive, clearTimer])

    const pause = useCallback(() => {
        setActive(false);
        clearTimer();
    }, [clearTimer])

    const reset = useCallback(() => {
        setActive(false);
        clearTimer();
        setTime(maxDuration)
    }, [clearTimer, maxDuration])

    return {
        time,
        start,
        pause,
        reset
    }
}

export default useCountDown;