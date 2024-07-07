import React from 'react';
import style from './index.module.css';

interface RowProps {
  children: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ children }) => {
  return <div className={style.row}>{children}</div>;
};

export default Row;
