import React, { useState, useEffect } from "react";
import "./Game.css";
import Board from "./Board";
import { createSession } from "../createSession";
import { getGameState } from "../getGameState";
import { makeMove } from "../makeMove";

export const BASE_URL = "http://34.118.92.227:8080";

const Game = () => {
  const [gameState, setGameState] = useState({
    gameField: Array(3).fill(Array(3).fill(null)),
    winner: null, // Winner (null or 'x' or 'o')
    sign: null,
    tie: null,
  });

  const [sessionState, setSessionState] = useState(null);

  const onMakeMove = async (x, y) => {
    try {
      if (sessionState) {
        const updatedState = await makeMove(sessionState, x, y);
        setGameState(updatedState);
      } else {
        const newSession = await startNewGame();
        const updatedState = await makeMove(newSession, x, y);
        setGameState(updatedState);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const startNewGame = async () => {
    try {
      const session = await createSession();
      setSessionState(session);

      const gameState = await getGameState(session);
      setGameState(gameState);

      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="wrapper">
      <Board gameState={gameState} makeMove={onMakeMove} startNewGame={startNewGame} />
    </div>
  );
};

export default Game;
