import { useState } from "react";
import { useCountDown, usePrevious } from "./hooks";
import "./hooktest.css";

const HookTest: React.FC = () => {
  const [count, setCount] = useState(10);
  const prevCount = usePrevious(count);

  const { time, start, pause, reset, formattedTime } = useCountDown(300, {
    interval: 1000,
    stopTime: 0,
    onEnd: () => {
      alert("计时结束");
    },
  });

  return (
    <div className="board">
      <div className="hook">
        <div className="hook-head">
          <h2>useCountDown</h2>
          <h3>{time}s</h3>
          <h3>{formattedTime}</h3>
        </div>
        <div className="content">
          <button onClick={start}>开始计时</button>
          <button onClick={pause}>停止计时</button>
          <button onClick={reset}>重置计时</button>
        </div>
      </div>
      <div className="hook">
        <div className="hook-head">
          <h2>usePrevious</h2>
          <h3>current count: {count}</h3>
          <h3>previous count: {prevCount}</h3>
        </div>
        <div className="content">
          <button onClick={() => setCount(count * 2)}>改变</button>
        </div>
      </div>
    </div>
  );
};

export default HookTest;
