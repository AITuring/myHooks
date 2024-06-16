import { useEffect,useRef } from "react";

const usePrevious = <T>(value:T): T | undefined => {
    const ref = useRef<T>();
    console.log(ref.current,ref)
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;
