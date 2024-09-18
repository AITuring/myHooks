import React from "react";
import { useFetchWithRetry } from "@/hooks";
import { Card } from "@/components";

interface DataType {
    // 根据你的数据结构定义类型
    id: number;
    name: string;
    // 其他字段...
}

const FetchWithRetryDemo: React.FC = () => {
    const url = "https://api.code.gov/projects";
    const maxRetries = 4; // 最大重试次数
    const { data, error, loading } = useFetchWithRetry<DataType[]>(
        url,
        maxRetries
    );

    if (loading) {
        return (
            <Card title="useFetchWithRetry" content={<div>Loading...</div>} />
        );
    }

    if (error) {
        return (
            <Card title="useFetchWithRetry" content={<div>Error: {error.message}</div>} />
        );
    }

    return (
        <Card
            title="useFetchWithRetry"
            content={
                <>
                    <h3>Data fetched successfully:</h3>
                    {JSON.stringify(data, null, 2)}
                </>
            }
        />
    );
};

export default FetchWithRetryDemo;
