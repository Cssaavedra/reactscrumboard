import React from 'react';
import BoardIcon from './BoardIcon.jsx';

import FlipMove from 'react-flip-move';

class BoardList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
      
    };
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }
  render() {
    const Boards = this.props.boards.map(board => (
      <BoardIcon
        history={this.props.history}
        userID={this.props.userID}
        boardId={board.board_id}
        name={board.title}
        key={board.board_id}
      />
    ));

    return (
      <div className='board-list'>
        <div>
          <h1>Welcome To Your Board List!</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="project name"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <button
              onClick={e => {
                e.preventDefault();
                this.props.addBoard(this.state.value, this.props.userID);
              }}
            >
              Add New Project
          </button>
          </form>
          <FlipMove duration={400} easing="ease-in-out">
            {Boards}
          </FlipMove>
        </div>
      </div>
    );
  }
}

export default BoardList;
