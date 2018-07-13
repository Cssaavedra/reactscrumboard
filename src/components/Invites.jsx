import React from 'react';


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
    //   const example =this.props.getInvites(this.props.userId);
    //   console.log('I am example and I ran',example);
    

    return (
        {invitesArray}
    );
  }
}

export default BoardList;