import { Row, Col } from "./components";
import {
    CountDownDemo,
    PreviousDemo,
    LatestDemo,
    CreationDemo,
    FetchWithRetryDemo,
    UpdateEffectDemo,
    MemoizedFnDemo,
    SizeDemo,
} from "./demo";
import { usePerformanceMonitoring } from "./hooks";
import "./App.css";

function App() {
    // 性能监控
    const onPerformanceEntry = (entry: PerformanceEntry) => {
        // 这里可以处理捕获的性能数据
        console.log("性能监控捕获到条目：", entry);
    };

    // 使用 Hook 来监控性能
    usePerformanceMonitoring(onPerformanceEntry);

    // 白屏检测
    const observer = new MutationObserver((mutationsList) => {
        // 遍历每个 DOM 变化记录
        for (const mutation of mutationsList) {
            // 检查是否是节点的子节点发生了变化
            if (mutation.type === "childList") {
                // 检查页面是否还有子节点
                if (document.body.childNodes.length === 0) {
                    // 页面处于白屏状态
                    console.log("页面处于白屏状态");
                } else {
                    // 页面已经加载完成
                    console.log("页面加载完成");
                }
            }
        }
    });

    // 监视整个文档根节点的子节点变化
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });

    return (
        <div className="board">
            <h2>Hooks Demo</h2>
            <Row>
                <Col>
                    <CountDownDemo />
                </Col>
                <Col>
                    <PreviousDemo />
                </Col>
                <Col>
                    <LatestDemo />
                </Col>
            </Row>
            <Row>
                <Col>
                    <UpdateEffectDemo />
                </Col>
                <Col>
                    <CreationDemo />
                </Col>
                <Col>
                    <FetchWithRetryDemo />
                </Col>
            </Row>
            <Row>
                <Col>{/* <VirtualListDemo /> */}</Col>
                <Col>
                    <SizeDemo />
                </Col>
                <Col>
                    <MemoizedFnDemo />
                </Col>
            </Row>
        </div>
    );
}

export default App;
