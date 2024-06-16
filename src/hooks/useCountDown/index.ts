import {useState, useEffect, useRef} from "react";

interface CountDown {
    time: number,
    start: () => void
}

const useCountDown = (maxDuration: number):CountDown => {
    const [time, setTime] = useState<number>(maxDuration);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    const start = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        setTime(maxDuration)
        intervalRef.current = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 1 && intervalRef.current) {
                    clearInterval(intervalRef.current)
                }

                return prevTime - 1
            })
        }, 1000)
    }

    return {time, start}
}

export default useCountDown;