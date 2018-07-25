import * as types from '../constants/actionTypes';

export default (state = [], action) => {
   let invites;
   switch (action.type) {
      case (types.GET_INVITES):
         invites = action.invites;
         return invites
      default:
         return state;
   }
}