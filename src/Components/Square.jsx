import React from "react";
import './Square.css';

export const Square = ({x,y,sign,makeMove}) => {
  return (
    <button className="square" onClick={() => makeMove(x,y)}>
      {sign}
    </button>
  );
}
export default Square;


