import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from './Board';

const Game = () => {
  const [gameState, setGameState] = useState({
    gameField: Array(3).fill(Array(3).fill(null)),
    winner: null,  // Переможець (null або 'x' або 'o')
  });

  const [currentSign, setCurrentSign] = useState("x");


  const makeMove = async (x, y) => {
    const response = await fetch('http://localhost:8080/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ x, y, sign: currentSign }),
    });

    if (response.ok) {
      console.log(x,y," x and y from square")
      const gameState = await response.json();
      setGameState(gameState)
    };
    setCurrentSign(currentSign === "x" ? "o" : "x");
  }

  useEffect(() => {
    console.log("Updating game state(useeffect) ",gameState);
  }, [gameState]);

  const startNewGame = async () => {
    const response = await fetch('http://localhost:8080/new_game', {
      method: 'POST',

    });
    if (response.ok) {
      const gameField = await response.json();
      console.log("Old gamestate:", gameState)
      console.log("New gamestate:", gameField)
      let newGameState = {
        gameField: gameField,
        winner: null
      }
      setGameState(newGameState);
      setCurrentSign("x")
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
        currentSign={currentSign}
        startNewGame={startNewGame}
      />
    </div>
  );
}

export default Game;