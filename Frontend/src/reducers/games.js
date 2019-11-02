import { GAME_SUCCESS } from '../actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_SUCCESS:
      return {
        ...state,
        [action.game.id]: action.game,
      };
    default:
      return state;
  }
};
