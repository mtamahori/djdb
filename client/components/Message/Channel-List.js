import React from 'react'
import { List } from 'semantic-ui-react'
import ChannelItem from './Channel-Item'

const ChannelList = (props) => {
  const { channels, messages, currentBooker, currentDeejay } = props

  if (currentBooker) {
    return (
      <List divided relaxed className="channel-list-items">
        {
          channels.map(channel => {
            let channelMessages = messages.filter(message => (
                message.channelId === channel.id
            ))
            return (
              <List.Item as={ChannelItem} channel={channel} messages={channelMessages} currentBooker={currentBooker} key={channel.id} />
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
              message.channelId === channel.id
            ))
            return (
              <List.Item as={ChannelItem} channel={channel} messages={channelMessages} currentDeejay={currentDeejay} key={channel.id} />
            )
          })
        }
      </List>
    )
  }
}

export default ChannelList
