import { useCountDown } from "./hooks";

const HookTest: React.FC = () => {
  const { time, start } = useCountDown(10);
  return (
    <div>
    <h1>useCountDown</h1>
      <h2>{time}</h2>
      <button onClick={() => start()}>开始计时</button>
    </div>
  );
};

export default HookTest;
