import { useCountDown } from "./hooks";

const HookTest: React.FC = () => {
  const { time, start, pause, reset, formattedTime } = useCountDown(30, {
    interval: 1000,
    stopTime: 0,
    onEnd: () => {
      alert("计时结束");
    },
  });
  return (
    <div>
    <h1>useCountDown</h1>
      <h2>{time}</h2>
      <h2>{formattedTime}</h2>
      <button onClick={start}>开始计时</button>
      <button onClick={pause}>停止计时</button>
      <button onClick={reset}>重置计时</button>
    </div>
  );
};

export default HookTest;
