import { ROUND_SUCCESS, ROUND_REQUEST, FINISH_SUCCESS } from '../actions';

const initialState = {
  loading: false,
  //   byId: {},
  round: undefined,
  finsihed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ROUND_SUCCESS:
      return {
        ...state,
        loading: false,
        // byId: action.rounds.reduce(
        //   (acc, round) => ({
        //     ...acc,
        //     [round.id]: round,
        //   }),
        //   {},
        // ),
        round: action.round,
      };
    case FINISH_SUCCESS:
      return {
        ...state,
        finished: true,
      };
    default:
      return state;
  }
};
