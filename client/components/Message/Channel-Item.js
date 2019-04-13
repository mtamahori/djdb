import React from 'react'
import { NavLink } from 'react-router-dom'
import dateFns from 'date-fns'

const ChannelItem = (props) => {
  const { channel, messages, currentBooker, currentDeejay } = props;

  if (currentBooker) {
    return (
      <div>
        <NavLink
          activeClassName="active"
          to={{
            pathname: `/booker/channels/${channel.id}`,
            state: {
              channel: channel,
              messages: messages,
              currentBooker: currentBooker
            }
          }}
          >
          <h3>{channel.name}</h3>
        </NavLink>
      </div>
    )
  }

  if (currentDeejay) {
    return (
      <div>
        <NavLink
          activeClassName="active"
          to={{
            pathname: `/deejay/channels/${channel.id}`,
            state: {
              channel: channel,
              messages: messages,
              currentDeejay: currentDeejay
            }
          }}
          >
          <h3>{channel.name}</h3>
        </NavLink>
      </div>
    )
  }
}

export default ChannelItem
