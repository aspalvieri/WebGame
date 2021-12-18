import axios from "axios";
import { config } from "../utils/configs";

import { UPDATE_CHARACTER } from "./types";

//Update user's character
export const updateCharacter = async (char) => {
  if (char) {
    return {
      type: UPDATE_CHARACTER,
      payload: char
    };
  }
  else {
    return {
      type: UPDATE_CHARACTER,
      payload: await axios.get(`${config.SERVER_URI}/api/characters`).then(res => res.data.character).catch(err => console.log(err))
    }
  }
};
