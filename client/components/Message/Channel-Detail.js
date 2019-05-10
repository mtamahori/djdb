import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewMessageForm from './New-Message-Form'
import MessageList from './Message-List'
import { updateChannel } from '../../store'
import dateFns from 'date-fns'

class ChannelDetail extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { channel, currentBooker, currentDeejay } = this.props.location.state
    const { updateChannel } = this.props
    const now = Date.now()
    let readChannel;
    console.log('MOUNT channel', channel)
    if (currentBooker) {
      readChannel = {
        id: channel.id,
        name: channel.name + ' edited',
        deejayId: channel.deejayId,
        bookerId: channel.bookerId,
        deejayLastRead: channel.deejayLastRead,
        bookerLastRead: now
      }
      console.log('READ channel', readChannel)
    }
    updateChannel(readChannel)
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
const mapDispatch = ({ updateChannel })

export default connect(mapState, mapDispatch)(ChannelDetail)
