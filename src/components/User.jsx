import React from 'react'

import * as boardActions from '../actions/boards.js';
import { connect } from 'react-redux';
// import Header from './Header.jsx'; 


class User extends React.Component {
   constructor() {
      super();

   }

   async handleClick(userId, boardId) {
      console.log(userId, boardId)
      const response = await fetch('http://localhost:3000/sendInvite',
         {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId, board_id: boardId }),
         }
      );
      const data = await response.json();
      console.log(data);
   }

   render() {
      console.log('user props', this.props)
      return (
         <div>
            <div>{this.props.name}</div>
            <img src={this.props.picture} alt="" srcset="" />
            <button onClick={() => this.handleClick(this.props.id, this.props.boardId)}>Send Invite</button>
         </div>
      )
   }
}

export default User;
