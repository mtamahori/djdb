import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChannelList from './Channel-List'

class MainInbox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>MainInbox</h1>
    )
  }

}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(MainInbox)
