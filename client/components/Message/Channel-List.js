import React from 'react'
import ChannelItem from './Channel-Item'

const ChannelList = (props) => {
  const { channels, messages, currentBooker, currentDeejay } = props

  if (currentBooker) {
    return (
      <div className="channel-list-items">
        {
          channels.map(channel => {
            let channelMessages = messages.filter(message => (
                message.channelId === channel.id
            ))
            return (
              <ChannelItem channel={channel} messages={channelMessages} currentBooker={currentBooker} key={channel.id} />
            )
          })
        }
      </div>
    )
  }

  if (currentDeejay) {
    return (
      <div className="channel-list-items">
        {
          channels.map(channel => {
            let channelMessages = messages.filter(message => (
              message.channelId === channel.id
            ))
            return (
              <ChannelItem channel={channel} messages={channelMessages} currentDeejay={currentDeejay} key={channel.id} />
            )
          })
        }
      </div>
    )
  }
}

export default ChannelList
