import React, { Component } from 'react'
import { createMessage } from '../../store'
import { connect } from 'react-redux'

class NewMessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ''
    }

    this.writeMessage = this.writeMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.submitMessage}>
        <div>
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.writeMessage}
            placeholder="Text Input"
          />
          <span>
            <button type="submit">Submit</button>
          </span>
        </div>
      </form>
    );
  }

  writeMessage(event) {
    event.preventDefault();
    this.setState({ content: event.target.value })
  }

  submitMessage(event) {
    event.preventDefault();
    const { createMessage, channel, currentBooker, currentDeejay } = this.props;
    const newContent = this.state.content;
    const now = Date.now();
    let newMessage;
    if (currentBooker) {
      newMessage = {
        content: newContent,
        timestamp: now,
        bookerId: currentBooker.id,
        channelId: channel.id
      }
    }
    if (currentDeejay) {
      newMessage = {
        content: newContent,
        timestamp: now,
        deejayId: currentDeejay.id,
        channelId: channel.id
      }
    }
    console.log('submitMessage', newMessage)
    createMessage(newMessage)
    this.setState({ content: ''});
  }
}

const mapState = null;
const mapDispatch = ({ createMessage });

export default connect(mapState, mapDispatch)(NewMessageForm)
