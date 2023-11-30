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
    const response = await fetch('http://34.116.199.106:8080/move', {
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
    const fetchDataWithDelay = async () => {
      // Затримка в 2 секунди
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        const response = await fetch('http://34.116.199.106:8080/get_state', {
          method: 'GET'
        });
  
        if (response.ok) {
          const gameStateFromServer = await response.json();
          setGameState(gameStateFromServer);
        } else {
          throw Error("Failed to get state from server");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Викликати функцію із затримкою та отримати ідентифікатор інтервалу
    const intervalId = setInterval(fetchDataWithDelay, 1000);
  
    // Очищення інтервалу при відмонтажі компонента
    return () => clearInterval(intervalId);
  }, []);
  
  const startNewGame = async () => {
    const response = await fetch('http://34.116.199.106:8080/new_game', {
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