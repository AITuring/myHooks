import { useEffect } from "react";

const usePerformanceMonitoring = (callback: (entry: PerformanceEntry) => void) => {
    useEffect(() => {
        // 创建 PerformanceObserver 实例
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (typeof callback === "function") {
                    callback(entry);
                }
                console.log(entry);
            });
        });

        // 选择要观察的性能条目类型
        const observeTypes = [
            "longtask",
            "first-input",
            "largest-contentful-paint",
            "layout-shift",
            // 可以根据需要添加更多的条目类型
        ];

        // 注册观察者
        observer.observe({ entryTypes: observeTypes });

        // 清理函数，用于取消观察
        return () => {
            observer.disconnect();
        };
    }, [callback]); // 依赖项数组包含 callback，当 callback 变化时重新创建观察者
};

export default usePerformanceMonitoring;
