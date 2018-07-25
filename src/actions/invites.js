import * as types from '../constants/actionTypes.js';

export function getInvites(userId) {
   return async function (dispatch, getState) {
      console.log(userId)
      const state = getState();
      const invites = state.invites.slice();
      
      const response = await fetch('http://localhost:3000/getinvites', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ user_id: userId }),
      });

      const data = await response.json();
      console.log('response from invites', data);
      data.forEach(invite => invites.push(invite));

      return dispatch({
         type: types.GET_INVITES,
         invites,
      });
   }
}