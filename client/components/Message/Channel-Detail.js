import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    const { channel, currentBooker } = this.props.location.state;

    return (
      <div className="channel-detail">
        <h3>{channel.name}</h3>
        <div>
          <MessageList channel={channel} currentBooker={currentBooker}/>
        </div>
        <div>
          <NewMessageForm channel={channel} currentBooker={currentBooker} />
        </div>
      </div>
    )
  }

  renderDeejayChannelDetail() {
    const { channel, currentDeejay } = this.props.location.state;

    return (
      <div className="channel-detail">
        <h3>{channel.name}</h3>
        <div>
          <MessageList channel={channel} currentDeejay={currentDeejay} />
        </div>
        <div>
          <NewMessageForm channel={channel} currentDeejay={currentDeejay} />
        </div>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ChannelDetail)
