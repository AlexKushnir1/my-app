import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from './Board';

const Game = () => {
  const [gameState, setGameState] = useState({
    gameField: Array(3).fill(Array(3).fill(null)),
    winner: null,  // Winner (null or 'x' or 'o')
    sign : null,
    tie : null
  });

  const makeMove = async (x, y) => {
    const response = await fetch('http://localhost:8080/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ x, y }),
    });

    if (response.ok) {
      const gameState = await response.json();
      setGameState(gameState)
    };
  }

  useEffect(() => {
    console.log("Updating game state(useeffect) ",gameState);
  }, [gameState]);

  const startNewGame = async () => {
    const response = await fetch('http://localhost:8080/new_game', {
      method: 'POST'
    });
    if (response.ok) {
      const gameFieldFromServer = await response.json();
      console.log("Old gamestate:", gameState)
      console.log("New game field from a server:", gameFieldFromServer)
      let newGameState = {
        gameField: gameFieldFromServer,
        winner: null,
        sign: null,
        tie: false
      }
      setGameState(newGameState);
      console.log("Gamestate updated")
    } else {
      throw Error("Failed starting new game")
    };
  }

  return (
    <div className="wrapper">
      <Board
        gameState={gameState}
        makeMove={makeMove}
        startNewGame={startNewGame}
      />
    </div>
  );
}

export default Game;