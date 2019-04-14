import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createMessage } from '../../store'
import { Button } from 'semantic-ui-react'
import NewMessageForm from './New-Message-Form'
import MessageList from './Message-List'

class ChannelDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currentBooker, currentDeejay } = this.props.location.state;
      return (
        <div>
        {
          currentBooker &&
          this.renderBookerChannelDetail()
        }
        {
          currentDeejay &&
          this.renderDeejayChannelDetail()
        }
        </div>
      )
  }

  renderBookerChannelDetail() {
    const { channel, messages, currentBooker } = this.props.location.state;

    return (
      <div>
        <h3>{channel.name}</h3>
        <div>
          <MessageList messages={messages} />
        </div>
        <div>
          <NewMessageForm currentBooker={currentBooker} />
        </div>
      </div>
    )
  }

  renderDeejayChannelDetail() {
    const { channel, messages, currentDeejay } = this.props.location.state;

    return (
      <div>
        <h3>{channel.name}</h3>
        <div>
          <MessageList messages={messages} />
        </div>
        <div>
          <NewMessageForm currentDeejay={currentDeejay} />
        </div>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = ({ createMessage });

export default connect(mapState, mapDispatch)(ChannelDetail)
