import { parseString } from "./parseString";
import { BASE_URL } from "./Components/Game";

export const createSession = async (sessionData) => {
  try {
    const { session_id } = sessionData;
    console.log(session_id);
    let response = null;
    if (session_id){
      response = await fetch(`${BASE_URL}/new_game?session_id=${session_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  } else{
    response = await fetch(`${BASE_URL}/new_game`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

    const text = await response.text();
    const responseText = parseString(text);

    return responseText;
  } catch (error) {
    throw new Error(error.message);
  }
};
