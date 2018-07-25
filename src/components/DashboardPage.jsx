import React from 'react';

import BoardList from './BoardList.jsx';
import * as boardActions from '../actions/boards.js';
import * as inviteActions from '../actions/invites.js';

import { connect } from 'react-redux';
// import Header from './Header.jsx'; 

const mapDispatchToProps = dispatch => {
  return {
    addBoard: (name, userId) => dispatch(boardActions.addBoard(name, userId)),
    getBoards: userId => dispatch(boardActions.getBoards(userId)),
    getInvites: userId => dispatch(inviteActions.getInvites(userId))
  };
};

const mapStateToProps = store => {
  return {
    boards: store.boards,
    invites: store.invites
  };
};

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    console.log('component did mount');

    if (this.props.boards.length === 0) {
      await this.props.getInvites(this.props.match.params.id);
      await this.props.getBoards(this.props.match.params.id);
    }
  }

  render() {
    console.log('Dashboard props', this.props);
    return (
      <div className="dashboard-page">
        {/* <Header match={this.props.match} history={this.props.history} /> */}
        <BoardList
          userID={this.props.match.params.id}
          history={this.props.history}
          addBoard={this.props.addBoard}
          boards={this.props.boards}
        />
        <div>Invites:</div>
        <div>
          {this.props.invites.map(invite => <button>Accept Invite</button>)}
        </div>
      </div>

    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
