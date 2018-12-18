import React, { Component } from 'react'
import { connect } from 'react-redux'

class CalendarMain extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>CALENDAR COMING SOON</h3>
        <h3>CALENDAR</h3>
        <h3>CALENDAR</h3>
        <h3>CALENDAR</h3>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(CalendarMain);
