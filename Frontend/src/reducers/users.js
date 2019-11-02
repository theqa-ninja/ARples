import { USER_SUCCESS } from '../actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCESS:
      return {
        ...state,
        [action.user.id]: action.user,
      };
    default:
      return state;
  }
};
