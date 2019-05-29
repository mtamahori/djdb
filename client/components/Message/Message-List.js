import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import dateFns from 'date-fns'
require('../../../public/stylesheets/messageList.css')

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
            let date = dateFns.format(message.timestamp, 'MMM Do, YYYY')
            let time = dateFns.format(message.timestamp, 'hh:mm a')
            if (message.bookerId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="right">
                    <List.Description className="message-content">
                      { message.content }
                    </List.Description>
                    <List.Description as="h6" className="message-timestamp">
                      { time } on { date }
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
            else if (message.deejayId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="left">
                    <List.Description className="message-content">
                      { message.content }
                    </List.Description>
                    <List.Description as="h6" className="message-timestamp">
                     { time } on { date }
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
            let date = dateFns.format(message.timestamp, 'MMM Do, YYYY')
            let time = dateFns.format(message.timestamp, 'hh:mm a')
            if (message.deejayId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="right">
                    <List.Description className="message-content">
                      { message.content }
                    </List.Description>
                    <List.Description as="h6" className="message-timestamp">
                      { time } on { date }
                    </List.Description>
                  </List.Content>
                </List.Item>
              )
            }
            else if (message.bookerId) {
              return (
                <List.Item key={message.id}>
                  <List.Content floated="left">
                    <List.Description className="message-content">
                      { message.content }
                    </List.Description>
                    <List.Description as="h6" className="message-timestamp">
                      { time } on { date }
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
