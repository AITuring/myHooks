import { useRef, useEffect } from "react";

const useLatest = <T>(value: T): React.MutableRefObject<T> => {
    const ref = useRef<T>(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
};

export default useLatest;
