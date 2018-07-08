import * as types from '../constants/actionTypes.js';

export function addBoard({ name }) {
  return async function(dispatch, getState) {
    const state = getState();
    console.log(state);
    const boards = state.boards;
    const newBoard = {
      name,
      stories: [],
      tasks: [],
    };

    boards.push(newBoard);
    return dispatch({
      type: types.ADD_BOARD,
      boards,
    });
  };
}
