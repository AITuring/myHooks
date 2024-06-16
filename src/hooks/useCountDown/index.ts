import {useState, useEffect, useRef, useCallback, useMemo} from "react";

interface CountDown {
    time: number,
    formattedTime: string,
    start: () => void,
    pause: () => void,
    reset: () => void,
}

interface UseCountdownOptions {
    interval?: number;
    stopTime?: number;
    onEnd?: () => void;
}

const useCountDown = (maxDuration: number, options: UseCountdownOptions = {}):CountDown => {
    const {
        interval = 1000,
        stopTime = 0,
        onEnd
    } = options;

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
                if (prevTime <= stopTime + (interval / 1000)) {
                    clearTimer();
                    setActive(false);
                    if (onEnd) {
                        onEnd();
                    }
                    return stopTime;
                }
                return prevTime - (interval / 1000);
            });
        }, interval);
    } ,[isActive, clearTimer, interval, onEnd, stopTime])

    const pause = useCallback(() => {
        setActive(false);
        clearTimer();
    }, [clearTimer])

    const reset = useCallback(() => {
        setActive(false);
        clearTimer();
        setTime(maxDuration)
    }, [clearTimer, maxDuration])

    const formatTime = useCallback((milliseconds: number): string => {
        const hrs = Math.floor(milliseconds / 3600);
        const mins = Math.floor((milliseconds % 3600) / 60);
        const secs = milliseconds % 60;
        const formattedHrs = hrs > 0 ? `${hrs}小时` : '';
        const formattedMins = mins > 0 || hrs > 0 ? `${mins}分` : '';
        const formattedSecs = `${secs}秒`;
        return `${formattedHrs}${formattedMins}${formattedSecs}`;
    }, []);

    const formattedTime = useMemo(() => formatTime(time), [time, formatTime]);

    return {
        time,
        start,
        pause,
        reset,
        formattedTime
    }
}

export default useCountDown;