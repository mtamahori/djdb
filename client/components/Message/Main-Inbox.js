import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChannelList from './Channel-List'

// INBOX HOME

class MainInbox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currentBooker, currentDeejay } = this.props;
    return (
      <div>
      {
        currentBooker &&
        this.renderBookerChannels()
      }
      <br />
      <br />
      <br />
      <br />
      {
        currentDeejay &&
        this.renderDeejayChannels()
      }
      </div>
      )
    }

  renderBookerChannels() {
    const { channels, currentBooker } = this.props;

    let bookerChannels = channels.filter(channel => {
      return (
        channel.bookerId === currentBooker.id
      )
    })

    return (
      <div>
        <h3>Chats With Deejays</h3>
        <ChannelList channels={bookerChannels} currentBooker={currentBooker} />
      </div>

    )
  }

  renderDeejayChannels() {
    const { channels, currentDeejay } = this.props;

    let deejayChannels = channels.filter(channel => {
      return (
        channel.deejayId === currentDeejay.id
      )
    })

    return (
      <div>
        <h3>Chats With Bookers</h3>
        <ChannelList channels={deejayChannels} currentDeejay={currentDeejay} />
      </div>
    )
  }
}

const mapState = ({ user, bookers, deejays, channels }) => {
  return {
    user,
    channels,
    currentBooker: bookers.filter(booker => booker.userId === user.id)[0],
    currentDeejay: deejays.filter(deejay => deejay.userId === user.id)[0]
  }
}
const mapDispatch = null;

export default connect(mapState, mapDispatch)(MainInbox)
