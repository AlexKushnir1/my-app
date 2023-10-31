import React from 'react';
import './Board.css';
import Square from '../Components/Square';

const Board = ({ gameState, makeMove, startNewGame}) => {
  // Масив для збереження компонентів Square
  const squares = [];
  console.log("Creating Board: ", gameState)

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      // console.log(x,y,{x},{y},"in a board")
      squares.push(
        <Square
          key={`${x}-${y}`}
          x={x}
          y={y}
          makeMove={makeMove}
          sign={gameState.gameField[x][y]}
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
      {gameState.winner ? <h1 className="winner">Winner: {gameState.winner}</h1> : null}
    </div>
  );
}

export default Board;
