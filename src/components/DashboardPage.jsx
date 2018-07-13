import React from 'react';

import BoardList from './BoardList.jsx';
//import Invites from './Invites.jsx';
import * as boardActions from '../actions/boards.js';
import { connect } from 'react-redux';
// import Header from './Header.jsx'; 

const mapDispatchToProps = dispatch => {
  return {
    addBoard: (name, userId) => dispatch(boardActions.addBoard(name, userId)),
    getBoards: userId => dispatch(boardActions.getBoards(userId)),
    getInvites: userId => dispatch(boardActions.getInvites(userId))
  };
};

const mapStateToProps = store => {
  return {
    boards: store.boards,
  };
};

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('component did mount');

    if (this.props.boards.length === 0) {
      console.log('hello');
      this.props.getBoards(this.props.match.params.id);
    }
  }

  render() {
    return (
      <div className="dashboard-page">
        {/* <Header match={this.props.match} history={this.props.history} /> */}
        {/* <Invites getInvites ={this.props.getInvites} userID={this.props.match.params.id}/> */}
        <BoardList
          userID={this.props.match.params.id}
          history={this.props.history}
          addBoard={this.props.addBoard}
          boards={this.props.boards}
        />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
