import { ROUNDS_SUCCESS } from '../actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUNDS_SUCCESS:
      return {
        ...state,
        loading: true,
        byId: action.rounds.reduce(
          (acc, round) => ({
            ...acc,
            [round.id]: round,
          }),
          {},
        ),
      };
    default:
      return state;
  }
};
