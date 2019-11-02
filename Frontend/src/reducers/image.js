import { SET_IMAGE } from '../actions';

const initialState = {
  image: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGE:
      return {
        image: action.image,
      };
    default:
      return state;
  }
};
