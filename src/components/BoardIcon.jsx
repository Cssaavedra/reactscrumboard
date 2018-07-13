import React from 'react';
import Row from './Row.jsx';

import { connect } from 'react-redux';

import { deleteBoard } from '../actions/boards.js';

class BoardIcon extends React.Component {
  // let clickedButton = false;
  constructor() {
    super();
    this.state = {
      showModal: false
    };

  }

  render() {

    return (
      <div
        className="board-icon"
        style={{
          border: '2.5px solid black',
          height: '20%',
          width: '50%',
          padding: '4px 4px',
        }}
      >
        <div>

          <h2>Project Names</h2>
          <button
            className="button_clear--small"
            onClick={() => {
              this.props.deleteBoard(this.props.boardId);
            }}
          >
            X
          </button>
          <button onClick={() => {
            this.props.history.push(`/test/${this.props.boardId}/${this.props.name}`);
          }}>View Board</button>

          <p>{this.props.name}</p>
        </div>
      </div >
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBoard: boardId => dispatch(deleteBoard(boardId))
  }
};

export default connect(
  undefined,
  mapDispatchToProps
)(BoardIcon);
