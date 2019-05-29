import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'
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
      <Form id="new-message-form" onSubmit={this.submitMessage}>
        <div>
          <Form.Input
            fluid
            className="form-control"
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.writeMessage}
            placeholder="Write your message here"
          />
            <Form.Button type="submit">Submit</Form.Button>
        </div>
      </Form>
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
    createMessage(newMessage)
    this.setState({ content: ''});
  }
}

const mapState = null;
const mapDispatch = ({ createMessage });

export default connect(mapState, mapDispatch)(NewMessageForm)
