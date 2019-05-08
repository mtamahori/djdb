import React, { Component } from 'react'
import { List, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class ChannelItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { channel, channelMessages, currentBooker, currentDeejay } = this.props;

    if (currentBooker) {
      return (
        <List.Item>
          <NavLink
            activeClassName="active"
            onClick={() => {this.handleClick()}}
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
          <NavLink
            activeClassName="active"
            onClick={() => {this.handleClick()}}
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

  handleClick() {
    //some state update that clears the "new messages" notification badge
  }
}

export default ChannelItem;
