import { GAMES_SUCCESS, GAMES_REQUEST } from '../actions';

const initialState = {
  loading: false,
  byId: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GAMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: action.games.reduce(
          (acc, game) => ({
            ...acc,
            [game.id]: game,
          }),
          {},
        ),
      };
    default:
      return state;
  }
};
