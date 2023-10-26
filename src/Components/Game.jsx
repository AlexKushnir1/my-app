import React, { useState, useEffect } from 'react';
import './Game.css';
import Board from './Board';

const Game = () => {
  const [gameState, setGameState] = useState({
    gameField: [], // Матриця 3x3
    winner: null,  // Переможець (null або 'x' або 'o')
  });

  const makeMove = async (x, y, sign) => {
    const response = await fetch('http://localhost:8080/move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ x, y, sign }),
    });

    if (response.ok) {
      const responseBody = await response.json();
      setGameState(responseBody);
    } else {
      // Обробка помилки
    }
  };

  const startNewGame = async () => {
    const response = await fetch('http://localhost:8080/new_game');
  
    if (response.ok) {
      const gameStateFromServer = await response.json();
      setGameState(gameStateFromServer);
    } else {
      // Обробка помилки
    }
  };

  // Здійснюємо запит на сервер після кожного оновлення гри
  useEffect(() => {
    const fetchGameData = async () => {
      const response = await fetch('http://localhost:8080/move');
      if (response.ok) {
        const responseBody = await response.json();
        setGameState(responseBody);
      } else {
        // Обробка помилки
      }
    };

    fetchGameData();
  }, [gameState.gameField]);

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