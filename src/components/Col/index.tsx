import React from 'react';
import style from './index.module.css';

interface ColProps {
  children?: React.ReactNode;
}

const Col: React.FC<ColProps> = ({children }) => {

  return <div className={style.col}>{children}</div>;
};

export default Col;
