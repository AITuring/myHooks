import React from "react";
import { useFetchWithRetry } from "../hooks";
import "./demo.css";

interface DataType {
  // 根据你的数据结构定义类型
  id: number;
  name: string;
  // 其他字段...
}

const FetchWithRetryDemo: React.FC = () => {
  const url = "https://v.api.aa1.cn/api/bilibili-rs";
  const maxRetries = 4; // 最大重试次数
  const { data, error, loading } = useFetchWithRetry<DataType[]>(
    url,
    maxRetries
  );

  if (loading) {
    return (
      <div className="hook">
        <div className="hook-head">
          <h2>useFetchWithRetry</h2>
        </div>
        <div className="content">loading</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hook">
        <div className="hook-head">
          <h2>useFetchWithRetry</h2>
        </div>
        <div className="content">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="hook">
      <div className="hook-head">
        <h2>useFetchWithRetry</h2>
      </div>
      <div className="content">
        <h3>Data fetched successfully:</h3>
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
};

export default FetchWithRetryDemo;
