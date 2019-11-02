import { combineReducers } from 'redux';
import games from './games';
import image from './image';
import users from './users';
import rounds from './rounds';

export default combineReducers({
  games,
  image,
  users,
  rounds,
});
