import { GAMES_SUCCESS } from '../actions';

const initialState = {
  loading: false,
  byId: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GAMES_SUCCESS:
      return {
        ...state,
        loading: true,
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
