export const SET_IMAGE = 'SET_IMAGE';

export const USERS_REQUEST = 'USERS_REQUEST';
export const USERS_SUCCESS = 'USERS SUCCESS';
export const USERS_FAILURE = 'USERS FAILURE';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER SUCCESS';
export const USER_FAILURE = 'USER FAILURE';

export const GAMES_REQUEST = 'GAMES_REQUEST';
export const GAMES_SUCCESS = 'GAMES_SUCCESS';
export const GAMES_FAILURE = 'GAMES_FAILURE';

export const GAME_REQUEST = 'GAME_REQUEST';
export const GAME_SUCCESS = 'GAME_SUCCESS';
export const GAME_FAILURE = 'GAME_FAILURE';

export const setImage = (id) => ({
  type: SET_IMAGE,
  id,
});

export const usersRequest = () => ({
  type: USERS_REQUEST,
});

export const usersSuccess = (users) => ({
  type: USERS_SUCCESS,
  users,
});

export const usersFailure = (e) => ({
  type: USERS_FAILURE,
  e,
});

export const userRequest = (id) => ({
  type: USER_REQUEST,
  id,
});

export const userSuccess = (user) => ({
  type: USER_SUCCESS,
  user,
});

export const userFailure = (e) => ({
  type: USER_FAILURE,
  e,
});

export const gameRequest = (id) => ({
  type: GAME_REQUEST,
  id,
});

export const gameSuccess = (game) => ({
  type: GAME_SUCCESS,
  game,
});

export const gameFailure = (e) => ({
  type: GAME_FAILURE,
  e,
});
