import React, { useState } from "react";
import { useCreation } from "../hooks";

const CreationDemo: React.FC<any> = () => {
  const [flag, setFlag] = useState(false);

  const getNowData = () => Math.random();

  const nowData = useCreation(() => getNowData(), []);

  return (
    <div className="hook">
      <div className="hook-head">
        <h2>useCreation</h2>
        <h3>正常的函数： {getNowData()}</h3>
        <h3>useCreation包裹后的： {nowData}</h3>
      </div>
      <div className="content">
        <button
          onClick={() => {
            setFlag((v) => !v);
          }}
        >
          切换状态{JSON.stringify(flag)}
        </button>
      </div>
    </div>
  );
};

export default CreationDemo;
