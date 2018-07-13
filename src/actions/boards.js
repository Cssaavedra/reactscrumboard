import * as types from '../constants/actionTypes.js';

export function addBoard(name, userId) {
  return async function (dispatch, getState) {

    const state = getState();
    const boards = state.boards.slice();

    const newBoard = {
      userId,
      title: name,
    };

    const response = await fetch('http://localhost:3000/boards', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    });

    const data = await response.json();
    console.log('returned data', data);
    boards.push(data);

    return dispatch({
      type: types.ADD_BOARD,
      boards,
    });
  };
}

export function getBoards(userId) {

  return async function (dispatch, getState) {
    const state = getState();
    const boards = state.boards.slice();

    const response = await fetch(`http://localhost:3000/boardsid`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId }),
    });
    const data = await response.json();
    console.log(data);

    data.forEach(board => boards.push(board));

    return dispatch({
      type: types.GET_BOARDS,
      boards,
    });
  };
}

export function deleteBoard(boardId) {
  return async function (dispatch, getState) {
    console.log('I am running in deleteBoard action');
    const boards = getState().boards.filter(board => board.board_id !== boardId);
    
    const response = await fetch('http://localhost:3000/boards', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ board_id: boardId }),
    });

    return dispatch({
      type: types.DELETE_BOARD,
      // boards,
    });
  };
}

export function getInvites(userId) {
  return async function (dispatch, getState) {
    console.log('I am running in getInvites action');
    const response = await fetch('http://localhost:3000/getInvites', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });

    return dispatch({
      type: types.GET_INVITES,
      boards,
    });
  };
}