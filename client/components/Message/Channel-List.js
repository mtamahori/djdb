import React from 'react'
import { List } from 'semantic-ui-react'
import ChannelItem from './Channel-Item'

const ChannelList = (props) => {
  const { channels, currentBooker, currentDeejay } = props

  if (currentBooker) {
    return (
      <List divided relaxed className="channel-list-items">
        {
          channels.map(channel => {
            return (
              <ChannelItem channel={channel} currentBooker={currentBooker} key={channel.id} />
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
            return (
              <ChannelItem channel={channel} currentDeejay={currentDeejay} key={channel.id} />
            )
          })
        }
      </List>
    )
  }
}

export default ChannelList
