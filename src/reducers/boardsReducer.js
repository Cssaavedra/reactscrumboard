import * as types from '../constants/actionTypes';

export default (state = [], action) => {
  let boards;
  switch (action.type) {
    case types.ADD_BOARD:
      boards = action.boards;
      console.log('new state boards', boards);
      return boards;
    case types.GET_BOARDS:
      boards = action.boards;
      return boards;
    case types.GET_BOARDS:
      boards = action.boards;
      return boards;
    case types.DELETE_BOARD:
      boards = action.boards;
      return boards;
    case types.GET_INVITES: 
      return boards;
    default:
      return state;
  }
};
