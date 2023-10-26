import React from 'react';
import './Board.css';
import Square from '../Components/Square';

const Board = ({ makeMove, startNewGame }) => {
  // Масив для збереження компонентів Square
  const squares = [];

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      squares.push(
        <Square
          key={`${x}-${y}`}
          x={x}
          y={y}
          makeMove={makeMove}
          startNewGame={startNewGame}
        />
      );
    }
  }

  return (
    <div>
      <div className="board">
        {squares}
      </div>
      <button onClick={startNewGame}>Нова гра</button>
    </div>
  );
}

export default Board;






  // const renderSquare = (i) => {
  //   return (
  //     <Square
  //       value={props.squares[i]}
  //       onClick={() => props.onClick(i)}
  //     />
  //   );
  // };

  // return (
  //   <div>
  //     <div className="board-row">
  //       {renderSquare(0)}
  //       {renderSquare(1)}
  //       {renderSquare(2)}
  //     </div>
  //     <div className="board-row">
  //       {renderSquare(3)}
  //       {renderSquare(4)}
  //       {renderSquare(5)}
  //     </div>
  //     <div className="board-row">
  //       {renderSquare(6)}
  //       {renderSquare(7)}
  //       {renderSquare(8)}
  //     </div>
  //   </div>
  // );
