import { BASE_URL } from "./Components/Game";

export const getGameState = async (responseText) => {
  try {
    const { session_id, game_id } = responseText;
    const gameState = await fetch(`${BASE_URL}/get_state?session_id=${session_id}&game_id=${game_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await gameState.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
