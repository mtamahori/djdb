import React, { Component } from 'react'
import { connect } from 'react-redux'

class BookerMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Booker Main Portal</h3>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BookerMain)
