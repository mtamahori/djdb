import React from 'react'
import { NavLink } from 'react-router-dom'
import dateFns from 'date-fns'

const ChannelItem = (props) => {
  const { channel, currentBooker, currentDeejay } = props;

  if (currentBooker) {
    return (
      <div>
        <NavLink
          activeClassName="active"
          to={{
            pathname: `/inbox/booker/channels/${channel.id}`,
            state: {
              channel: channel,
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
            pathname: `/inbox/deejay/channels/${channel.id}`,
            state: {
              channel: channel,
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
