import { parseString } from "./parseString";
import { BASE_URL } from "./Components/Game";

export const createSession = async () => {
  try {
    const response = await fetch(`${BASE_URL}/new_game`, {
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
