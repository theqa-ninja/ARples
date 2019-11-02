import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';
import {
  userSuccess,
  USER_REQUEST,
  gameSuccess,
  GAME_REQUEST,
  ROUND_REQUEST,
  roundSuccess,
  usersSuccess,
  USERS_REQUEST,
  GAMES_REQUEST,
  ROUNDS_REQUEST,
  roundsSuccess,
  gamesSuccess,
} from '../actions';

const baseUrl = 'http://localhost:3000';

function* userRequest({ id }) {
  const { data: user } = yield axios.get(`${baseUrl}/user/${id}`);
  yield put(userSuccess(user));
}

function* gameRequest({ id }) {
  const { data: game } = yield axios.get(`${baseUrl}/game/${id}`);
  yield put(gameSuccess(game));
}

function* roundRequest({ id }) {
  const { data: round } = yield axios.get(`${baseUrl}/round/${id}`);
  yield put(roundSuccess(round));
}

function* usersRequest({ ids }) {
  const responses = yield Promise.all(
    ids.map((id) => axios.get(`${baseUrl}/user/${id}`)),
  );
  const users = responses.map((response) => response.data);
  yield put(usersSuccess(users));
}

function* gamesRequest({ ids }) {
  const responses = yield Promise.all(
    ids.map((id) => axios.get(`${baseUrl}/game/${id}`)),
  );
  const games = responses.map((response) => response.data);
  yield put(gamesSuccess(games));
}

function* roundsRequest({ ids }) {
  const responses = yield Promise.all(
    ids.map((id) => axios.get(`${baseUrl}/round/${id}`)),
  );
  const rounds = responses.map((response) => response.data);
  yield put(roundsSuccess(rounds));
}

export default function* rootSaga() {
  yield takeLatest(USER_REQUEST, userRequest);
  yield takeLatest(GAME_REQUEST, gameRequest);
  yield takeLatest(ROUND_REQUEST, roundRequest);

  yield takeLatest(USERS_REQUEST, usersRequest);
  yield takeLatest(GAMES_REQUEST, gamesRequest);
  yield takeLatest(ROUNDS_REQUEST, roundsRequest);
}
