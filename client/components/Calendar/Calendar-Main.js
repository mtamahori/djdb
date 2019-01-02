import React, { Component } from 'react'
import { connect } from 'react-redux'

class CalendarMain extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>{this.renderFullCalendar()}</div>
      </div>
    )
  }

  renderFullCalendar() {
    return (
      <div>
        <h3>FULL CALENDAR COMING SOON</h3>
      </div>
    )
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(CalendarMain);
