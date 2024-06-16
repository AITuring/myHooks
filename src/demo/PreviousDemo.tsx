import { useState } from "react";
import { usePrevious } from "../hooks";
import "./demo.css";

const PreviousDemo: React.FC = () => {
  const [count, setCount] = useState(10);
  const prevCount = usePrevious(count);

  return (
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
  );
};

export default PreviousDemo;
