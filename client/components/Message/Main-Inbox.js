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
    const { channels } = this.props;
    const { currentBooker } = this.props.location.state;

    let bookerChannels = channels.filter(channel => {
      return (
        channel.bookerId === currentBooker.id
      )
    })

    return (
      <ChannelList channels={bookerChannels} currentBooker={currentBooker} />
    )
  }

  renderDeejayChannels() {
    const { channels } = this.props;
    const { currentDeejay } = this.props.location.state;

    let deejayChannels = channels.filter(channel => {
      return (
        channel.deejayId === currentDeejay.id
      )
    })

    return (
      <ChannelList channels={deejayChannels} currentDeejay={currentDeejay} />
    )
  }
}

const mapState = ({ channels }) => ({ channels });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(MainInbox)
