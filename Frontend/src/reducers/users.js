import { USERS_SUCCESS, USERS_REQUEST } from '../actions';

const initialState = {
  loading: false,
  byId: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
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
