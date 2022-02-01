import axios from "axios";
import { config } from "../utils/configs";

import { UPDATE_CHARACTER, USER_LOADING, UPDATE_INBATTLE, UPDATE_BATTLE, UPDATE_AFTER_BATTLE, CLEAR_BATTLE } from "./types";

//Update user's character
const updateCharacter = () => dispatch => {
  dispatch({
    type: USER_LOADING,
    payload: true
  });
  axios.get(`${config.SERVER_URI}/api/characters`).then(res => {
    dispatch({
      type: UPDATE_CHARACTER,
      payload: res.data.character
    });
    dispatch({
      type: USER_LOADING,
      payload: false
    });
  }).catch(err => console.log(err));
};

const findBattle = () => dispatch => {
  dispatch({ type: CLEAR_BATTLE });
  axios.get(`${config.SERVER_URI}/api/characters/findBattle`).then(res => {
    dispatch({
      type: UPDATE_INBATTLE,
      payload: res.data
    });
  }).catch(err => console.log(err));
};

const getBattle = () => dispatch => {
  dispatch({
    type: USER_LOADING,
    payload: true
  });
  axios.get(`${config.SERVER_URI}/api/characters/getBattle`).then(res => {
    let battle = res.data;
    if (!battle) {
      dispatch({
        type: UPDATE_INBATTLE,
        payload: false
      });
    }
    else {
      dispatch({
        type: UPDATE_BATTLE,
        payload: battle
      });
    }
    dispatch({
      type: USER_LOADING,
      payload: false
    });
  }).catch(err => console.log(err));
};

const attack = () => dispatch => {
  axios.get(`${config.SERVER_URI}/api/characters/attack`).then(res => {
    if (!res.data.inBattle) {
      if (res.data.character && res.data.info) {
        dispatch([{
          type: UPDATE_AFTER_BATTLE,
          payload: res.data.info
        }, {
          type: UPDATE_CHARACTER,
          payload: res.data.character
        }]);
      }
      dispatch({
        type: UPDATE_INBATTLE,
        payload: false
      });
    }
    else {
      let battle = res.data.battle;
      dispatch({
        type: UPDATE_BATTLE,
        payload: battle
      });
    }
  });
};

const clearBattle = () => dispatch => {
  dispatch({ type: CLEAR_BATTLE });
}

const actions = {
  updateCharacter,
  findBattle,
  getBattle,
  attack,
  clearBattle
};

export default actions;
