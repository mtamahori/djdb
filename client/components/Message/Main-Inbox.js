import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChannelList from './Channel-List'

class MainInbox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currentBooker, currentDeejay } = this.props.location.state;
    return (
      <div>
      {
        currentBooker &&
        this.renderBookerChannels()
      }
      {
        currentDeejay &&
        this.renderDeejayChannels()
      }
      </div>
    )
  }

  renderBookerChannels() {
    const { channels, messages } = this.props;
    const { currentBooker } = this.props.location.state;

    let bookerChannels = channels.filter(channel => {
      return (
        channel.bookerId === currentBooker.id
      )
    })

    let bookerMessages = messages.filter(message => {
      return (
      bookerChannels.indexOf(message.channelId) !== 0
      )
    })

    return (
      <ChannelList channels={bookerChannels} messages={bookerMessages} currentBooker={currentBooker} />
    )
  }

  renderDeejayChannels() {
    const { channels, messages } = this.props;
    const { currentDeejay } = this.props.location.state;

    let deejayChannels = channels.filter(channel => {
      return (
        channel.deejayId === currentDeejay.id
      )
    })

    let deejayMessages = messages.filter(message => (
        deejayChannels.indexOf(message.channelId) !== 0
    ))

    return (
      <ChannelList channels={deejayChannels} messages={deejayMessages} currentDeejay={currentDeejay} />
    )
  }
}

const mapState = ({ channels, messages }) => ({ channels, messages });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(MainInbox)
