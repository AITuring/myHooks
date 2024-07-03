import { useState,useEffect } from "react";


interface FetchState<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

const useFetchWithRetry = <T>(url:string, maxRetries: number = 3): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [retry, setRetry] = useState<number>(0);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }

            const result: T = await response.json();
            setData(result);
            setError(null);
        } catch(error) {
            setError(error as Error);
            console.error('Fetching data failed:', error);
        } finally {
            setLoading(true);
        }
    }

    useEffect(() => {
        if (retry >= maxRetries) {
            return;
        }
        setLoading(true);
        fetchData();

        const retryInterval = 5000;

        const retryTimeout = setTimeout(()=> {
            setRetry(prev => prev + 1);
        }, retryInterval);

        return () => clearTimeout(retryTimeout);

    },[retry,url,maxRetries])

    return {data,error,loading}

}

export default useFetchWithRetry;