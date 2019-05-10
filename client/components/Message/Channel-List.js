import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import ChannelItem from './Channel-Item'
import dateFns from 'date-fns'

class ChannelList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { channels, messages, currentBooker, currentDeejay } = this.props;

    if (currentBooker) {
      return (
        <List divided relaxed className="channel-list-items">
          {
            channels.map(channel => {

              let channelMessages = messages.filter(message => (
                message.channelId === channel.id))

              let unreadMessages = channelMessages.filter(message => {
                return (dateFns.isAfter(message.timestamp, channel.bookerLastRead) && message.bookerId === null)
              });

              return (
                <ChannelItem channel={channel} unreadMessages={unreadMessages} currentBooker={currentBooker} key={channel.id} />
              )
            })
          }
        </List>
      )
    }

    if (currentDeejay) {
      return (
        <List divided relaxed className="channel-list-items">
          {
            channels.map(channel => {
              let channelMessages = messages.filter(message => (
                message.channelId === channel.id))
              return (
                <ChannelItem channel={channel} channelMessages={channelMessages} currentDeejay={currentDeejay} key={channel.id} />
              )
            })
          }
        </List>
      )
    }
  }
}

// only providing messages in order to render # of unreads correctly for the corresponding channel

const mapState = ({ messages }) => ({ messages });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ChannelList)
