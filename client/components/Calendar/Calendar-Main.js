import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFns from 'date-fns'

class CalendarMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date
    }
  }


  render() {
    return (
      <div className="calendar-main">
        <div>{this.renderHeader()}</div>
        <div>{this.renderDays()}</div>
        <div>{this.renderCells()}</div>
      </div>
    )
  }

  renderHeader() {

  }

  renderDays() {

  }

  renderCells() {

  }

  onDateClick = (day) => {

  }

  nextMonth = () => {

  }

  prevMonth = () => {

  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(CalendarMain);
