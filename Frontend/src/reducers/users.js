import { USERS_SUCCESS } from '../actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_SUCCESS:
      return {
        ...state,
        loading: true,
        byId: action.users.reduce(
          (acc, user) => ({
            ...acc,
            [user.id]: user,
          }),
          {},
        ),
      };
    default:
      return state;
  }
};
