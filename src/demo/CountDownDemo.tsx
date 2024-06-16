import { useCountDown } from "../hooks";
import './demo.css';

const CountDownDemo: React.FC = () => {

  const { time, start, pause, reset, formattedTime } = useCountDown(300, {
    interval: 1000,
    stopTime: 0,
    onEnd: () => {
      alert("计时结束");
    },
  });

  return (
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
  );
};

export default CountDownDemo;
