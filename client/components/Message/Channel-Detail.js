import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewMessageForm from './New-Message-Form'
import MessageList from './Message-List'
import MessageItem from './Message-Item'

class ChannelDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>channelDetail</h1>
    )
  }

}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(ChannelDetail)
