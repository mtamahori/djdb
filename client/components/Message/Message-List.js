import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import MessageItem from './Message-Item'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.renderMessageList()}
      </div>
    )
  }

  renderMessageList() {
    const { messages, channel } = this.props;

    let channelMessages = messages.filter(message => (
      message.channelId === channel.id))

    return (
      <List divided relaxed className="message-list-items">
        {
          channelMessages.map(message => (
            <List.Item as={MessageItem} message={message} key={message.id} />
          ))
        }
      </List>
    )
  }
}

const mapState = ({ messages }) => ({ messages });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(MessageList)
