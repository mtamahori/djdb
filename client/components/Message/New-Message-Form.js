import React, { Component } from 'react'
import { createMessage } from '../../store'
import { connect } from 'react-redux'

class NewMessageForm extends Component {
  constructor(props) {
    super(props)

    this.writeMessage = this.writeMessage.bind(this);
  }

  render() {
    return (
      <h6>newMessageForm</h6>
    )
  }


  writeMessage() {
    const { createMessage } = this.props;

  }
}

const mapState = null;
const mapDispatch = ({ createMessage });

export default connect(mapState, mapDispatch)(NewMessageForm)
