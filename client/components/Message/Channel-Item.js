import React, { Component } from 'react'
import { List, Label } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

// SINGLE CHANNEL NAME, HOUSED IN CHANNEL LIST

class ChannelItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { channel, unreadMessages, currentBooker, currentDeejay } = this.props;

    if (currentBooker) {
      return (
        <List.Item>
        {
          unreadMessages.length &&
          <Label>
            <List.Icon name="mail" /> {unreadMessages.length}
          </Label>
        }
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
        </List.Item>
      )
    }

    if (currentDeejay) {
      return (
        <List.Item>
        {
          unreadMessages.length &&
          <Label>
            <List.Icon name="mail" /> {unreadMessages.length}
          </Label>
        }
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
        </List.Item>
      )
    }
  }
}

export default ChannelItem;
