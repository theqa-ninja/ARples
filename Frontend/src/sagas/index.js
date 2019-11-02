import axios from 'axios';
import { takeLatest, put, select } from 'redux-saga/effects';
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
  FINISH_REQUEST,
  finishSuccess,
} from '../actions';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://arples-back.herokuapp.com'
    : 'http://localhost:3000';

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

function* finishRequest() {
  const image = yield select((state) => state.image.image);
  const roundId = yield select((state) => state.rounds.round.id);
  yield axios.post(`${baseUrl}/submit/${roundId}`, image);
  yield put(finishSuccess());
}

export default function* rootSaga() {
  yield takeLatest(USER_REQUEST, userRequest);
  yield takeLatest(GAME_REQUEST, gameRequest);
  yield takeLatest(ROUND_REQUEST, roundRequest);

  yield takeLatest(USERS_REQUEST, usersRequest);
  yield takeLatest(GAMES_REQUEST, gamesRequest);
  yield takeLatest(ROUNDS_REQUEST, roundsRequest);

  yield takeLatest(FINISH_REQUEST, finishRequest);
}
