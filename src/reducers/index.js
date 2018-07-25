import { combineReducers } from 'redux';

// import all reducers here
import usersReducer from './usersReducer.js';
import boardsReducer from './boardsReducer.js';
import tasksReducer from './tasksReducer.js';
import storiesReducer from './storiesReducer.js';
import invitesReducer from './invitesReducer.js';


// combine reducers
const reducers = combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  stories: storiesReducer,
  tasks: tasksReducer,
  invites: invitesReducer
});

// make the combined reducers available for import
export default reducers;
