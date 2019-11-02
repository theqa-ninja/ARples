import axios from 'axios';
import { takeEvery, put } from 'redux-saga';
import {
  userSuccess,
  USER_REQUEST,
  gameSuccess,
  GAME_REQUEST,
} from '../actions';

function* userRequest({ id }) {
  const { data: user } = yield axios.get(`/user/:${id}`);
  yield put(userSuccess(user));
}

function* gameRequest({ id }) {
  const { data: game } = yield axios.get(`/game/:${id}`);
  yield put(gameSuccess(game));
}

export function* rootSaga() {
  yield takeEvery(USER_REQUEST, userRequest);
  yield takeEvery(GAME_REQUEST, gameRequest);
}