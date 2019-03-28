import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewMessageForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>newMessageForm</h1>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(NewMessageForm)
