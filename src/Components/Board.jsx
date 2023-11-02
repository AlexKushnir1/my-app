import React from 'react';
import './Board.css';
import Square from '../Components/Square';

const Board = ({ gameState, makeMove, startNewGame}) => {
  console.log("Creating Board: ", gameState)

  const squares = gameState.gameField.map((row,x)=> {
    return row.map((sign,y) => {
      return <Square
            key={`${x}-${y}`}
            x={x}
            y={y}
            makeMove={makeMove}
            sign={sign}
          />
    })
  })

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
