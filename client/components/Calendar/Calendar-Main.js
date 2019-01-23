import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFns from 'date-fns'
import './calendar.css'

class CalendarMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date
    }

    //bindings
    // this.onDateClick = this.onDateClick.bind(this);
    // this.nextMonth = this.nextMonth.bind(this);
    // this.prevMonth = this.prevMonth.bind(this);
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
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>chevron_left</div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon" onClick={this.nextMonth}>chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {

  }

  renderCells() {

  }

  onDateClick = (day) => {

  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
  }
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(CalendarMain);
