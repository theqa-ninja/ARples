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

export const ROUND_REQUEST = 'ROUND_REQUEST';
export const ROUND_SUCCESS = 'ROUND_SUCCESS';
export const ROUND_FAILURE = 'ROUND_FAILURE';

export const ROUNDS_REQUEST = 'ROUNDS_REQUEST';
export const ROUNDS_SUCCESS = 'ROUNDS_SUCCESS';
export const ROUNDS_FAILURE = 'ROUNDS_FAILURE';

export const FINISH_REQUEST = 'FINISH_REQUEST';
export const FINISH_SUCCESS = 'FINISH_SUCCESS';

export const setImage = (image) => ({
  type: SET_IMAGE,
  image,
});

export const usersRequest = (ids) => ({
  type: USERS_REQUEST,
  ids,
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

export const gamesRequest = (ids) => ({
  type: GAMES_REQUEST,
  ids,
});

export const gamesSuccess = (games) => ({
  type: GAMES_SUCCESS,
  games,
});

export const gamesFailure = (e) => ({
  type: GAMES_FAILURE,
  e,
});

export const roundRequest = (id) => ({
  type: ROUND_REQUEST,
  id,
});

export const roundSuccess = (round) => ({
  type: ROUND_SUCCESS,
  round,
});

export const roundFailure = (e) => ({
  type: ROUND_FAILURE,
  e,
});

export const roundsRequest = (ids) => ({
  type: ROUNDS_REQUEST,
  ids,
});

export const roundsSuccess = (rounds) => ({
  type: ROUNDS_SUCCESS,
  rounds,
});

export const roundsError = (e) => ({
  type: ROUNDS_FAILURE,
  e,
});

export const finishRequest = () => ({
  type: FINISH_REQUEST,
});

export const finishSuccess = () => ({
  type: FINISH_SUCCESS,
});
