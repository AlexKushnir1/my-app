import { BASE_URL } from "./Components/Game";

export const makeMove = async (sessionData, x, y) => {
  try {
    const { session_id, game_id } = sessionData;
    const response = await fetch(`${BASE_URL}/move?session_id=${session_id}&game_id=${game_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y }),
    });

    const gameState = await response.json();

    return gameState;
  } catch (error) {
    throw new Error(error.message);
  }
};
