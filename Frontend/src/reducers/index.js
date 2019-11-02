import { combineReducers } from 'redux';
import games from './games';
import image from './image';
import users from './users';

export default combineReducers({
  games,
  image,
  users,
});
