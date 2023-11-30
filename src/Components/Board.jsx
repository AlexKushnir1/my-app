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
      <h2 style={{ color: 'white' }}>Current Sign: {gameState.sign}</h2>
      <div className="board">
        {squares}
      </div>
      <button onClick={startNewGame}>Нова гра</button>
      {gameState.winner ? <h1 className="winner" style={{ color: 'white' }}>Winner: {gameState.winner}</h1> : null}
      {gameState.tie ? <h1 className="tie" style={{ color: 'white' }}>Tie</h1> : null}
    </div>
  );
}

export default Board;
