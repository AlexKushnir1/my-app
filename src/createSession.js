import { parseString } from "./parseString";
import { BASE_URL } from "./Components/Game";

export const createSession = async (sessionState) => {
  try {
    const isSessionActive = sessionState ? `session_id=${sessionState.session_id}` : "";
    const response = await fetch(`${BASE_URL}/new_game?${isSessionActive}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();
    const responseText = parseString(text);

    return responseText;
  } catch (error) {
    throw new Error(error.message);
  }
};
