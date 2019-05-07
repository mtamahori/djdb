import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import MessageItem from './Message-Item'

class MessageList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currentBooker, currentDeejay } = this.props;
    return (
      <div>
        {
          currentBooker && this.renderBookerMessageList()
        }
        {
          currentDeejay && this.renderDeejayMessageList()}
      </div>
    )
  }

  renderBookerMessageList() {
    const { messages, channel } = this.props;

    let channelMessages = messages.filter(message => (
      message.channelId === channel.id))

    return (
      <List divided relaxed>
        {
          channelMessages.map(message => {
            if (message.bookerId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="right">
                    <List.Description>
                      { message.content }
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
            else if (message.deejayId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="left">
                    <List.Description>
                      { message.content }
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
          })
        }
      </List>
    )
  }

  renderDeejayMessageList() {
    const { messages, channel } = this.props;

    let channelMessages = messages.filter(message => (
      message.channelId === channel.id))

    return (
      <List divided relaxed>
        {
          channelMessages.map(message => {
            if (message.deejayId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="right">
                    <List.Description>
                      { message.content }
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
            else if (message.bookerId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="left">
                    <List.Description>
                      { message.content }
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
          })
        }
      </List>
    )
  }
}

const mapState = ({ messages }) => ({ messages });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(MessageList)
