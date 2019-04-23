import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import MessageItem from './Message-Item'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { messages, channel } = this.props;
    let channelMessages = messages.filter(message => (
      message.channelId === channel.id))

    return (
    <div>
      {
        channelMessages.map(message => (
          <MessageItem message={message} key={message.id} />
        ))
      }
    </div>
    )
  }
}

const mapState = ({ messages }) => ({ messages });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(MessageList)
