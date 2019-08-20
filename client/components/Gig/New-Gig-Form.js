import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGig } from '../../store'
import history from '../../history'
import { Form, Message } from 'semantic-ui-react'
require('../../../public/stylesheets/sidebar.css')

// FOR BOOKERS
// CREATE NEW GIG

class NewGigForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateGig = this.handleCreateGig.bind(this);

    this.state = {
      createdBool: false,
      name: '',
      date1: '',
      date2: '',
      date3: '',
      startTime1: '',
      startTime2: '',
      startTime3: '',
      endTime1: '',
      endTime2: '',
      endTime3: '',
      location: '',
      compensation: ''
    }
  }

  render() {
    const months = [
      { key: 'January', text: 'January', value: '0' },
      { key: 'February', text: 'February', value: '1' },
      { key: 'March', text: 'March', value: '2' },
      { key: 'April', text: 'April', value: '3' },
      { key: 'May', text: 'May', value: '4' },
      { key: 'June', text: 'June', value: '5' },
      { key: 'July', text: 'July', value: '6' },
      { key: 'August', text: 'August', value: '7' },
      { key: 'September', text: 'September', value: '8' },
      { key: 'October', text: 'October', value: '9' },
      { key: 'November', text: 'November', value: '10' },
      { key: 'December', text: 'December', value: '11' }
    ]
    const dates = [
      { key: '1', text: '1', value: '1' },
      { key: '2', text: '2', value: '2' },
      { key: '3', text: '3', value: '3' },
      { key: '4', text: '4', value: '4' },
      { key: '5', text: '5', value: '5' },
      { key: '6', text: '6', value: '6' },
      { key: '7', text: '7', value: '7' },
      { key: '8', text: '8', value: '8' },
      { key: '9', text: '9', value: '9' },
      { key: '10', text: '10', value: '10' },
      { key: '11', text: '11', value: '11' },
      { key: '12', text: '12', value: '12' },
      { key: '13', text: '13', value: '13' },
      { key: '14', text: '14', value: '14' },
      { key: '15', text: '15', value: '15' },
      { key: '16', text: '16', value: '16' },
      { key: '17', text: '17', value: '17' },
      { key: '18', text: '18', value: '18' },
      { key: '19', text: '19', value: '19' },
      { key: '20', text: '20', value: '20' },
      { key: '21', text: '21', value: '21' },
      { key: '22', text: '22', value: '22' },
      { key: '23', text: '23', value: '23' },
      { key: '24', text: '24', value: '24' },
      { key: '25', text: '25', value: '25' },
      { key: '26', text: '26', value: '26' },
      { key: '27', text: '27', value: '27' },
      { key: '28', text: '28', value: '28' },
      { key: '29', text: '29', value: '29' },
      { key: '30', text: '30', value: '30' },
      { key: '31', text: '31', value: '31' },
    ]
    const years = [
      { key: '2019', text: '2019', value: '2019' },
      { key: '2020', text: '2020', value: '2020' }
    ]
    const hours = [
      { key: '1', text: '1', value: '1' },
      { key: '2', text: '2', value: '2' },
      { key: '3', text: '3', value: '3' },
      { key: '4', text: '4', value: '4' },
      { key: '5', text: '5', value: '5' },
      { key: '6', text: '6', value: '6' },
      { key: '7', text: '7', value: '7' },
      { key: '8', text: '8', value: '8' },
      { key: '9', text: '9', value: '9' },
      { key: '10', text: '10', value: '10' },
      { key: '11', text: '11', value: '11' },
      { key: '12', text: '12', value: '12' },
    ]
    const minutes = [
      { key: '00', text: '00', value: '00' },
      { key: '15', text: '15', value: '15' },
      { key: '30', text: '30', value: '30' },
      { key: '45', text: '45', value: '45' },
    ]
    const ampm = [
      { key: 'am', text: 'AM', value: 'am' },
      { key: 'pm', text: 'PM', value: 'pm' }
    ]

    let { name, date1, date2, date3, startTime1, startTime2, startTime3, endTime1, endTime2, endTime3, location, compensation } = this.state

    return (
      <div className="new-gig-form-container">
        <Form success={this.state.createdBool} onSubmit={(event) => this.handleCreateGig(event, name, date1, date2, date3, startTime1, startTime2, startTime3, endTime1, endTime2, endTime3, location, compensation)} width={2}>

          <Form.Group  width={2}>
            <Form.Input name="name" placeholder="Name" value={name} onChange={this.handleName.bind(this)}>
            </Form.Input>
            <Form.Dropdown name="date1" placeholder="Month" fluid selection options={months} value={date1} onChange={this.handleDate1.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="date2" placeholder="Date" fluid selection options={dates} value={date2} onChange={this.handleDate2.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="date3" placeholder="Year" fluid selection options={years} value={date3} onChange={this.handleDate3.bind(this)}>
            </Form.Dropdown>
          </Form.Group>


          <Form.Group width={2}>
            <h2>_Start Time</h2>
            <Form.Dropdown name="startTime1" placeholder="Hour" fluid selection options={hours} value={startTime1} onChange={this.handleStartTime1.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="startTime2" placeholder="Minute" fluid selection options={minutes} value={startTime2} onChange={this.handleStartTime2.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="startTime3" placeholder="AM/PM" fluid selection options={ampm} value={startTime3} onChange={this.handleStartTime3.bind(this)}>
            </Form.Dropdown>
          </Form.Group>

          <Form.Group width={2}>
            <h2>_End Time</h2>
            <Form.Dropdown name="endTime1" placeholder="Hour" fluid selection options={hours} value={endTime1} onChange={this.handleEndTime1.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="endTime2" placeholder="Minute" fluid selection options={minutes} value={endTime2} onChange={this.handleEndTime2.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="endTime3" placeholder="AM/PM" fluid selection options={ampm} value={endTime3} onChange={this.handleEndTime3.bind(this)}>
            </Form.Dropdown>
          </Form.Group>

          <Form.Group  width={2}>
            <Form.Input name="location" placeholder="Location" value={location} onChange={this.handleLocation.bind(this)}>
            </Form.Input>
            <Form.Input name="compensation" placeholder="Compensation" value={compensation} onChange={this.handleCompensation.bind(this)}>
            </Form.Input>
          </Form.Group>

          <Message success header="New Gig Created Successfully" />


          <Form.Button type="submit" value="submit">
            Submit
          </Form.Button>
        </Form>
      </div>
    )
  }

  handleName(event) {
    this.setState({ name: event.target.value })
  }

  handleLocation(event) {
    this.setState({ location: event.target.value })
  }

  handleCompensation(event) {
    this.setState({ compensation: event.target.value })
  }

  handleDate1 = (event, data) => {
    this.setState({ date1: data.value })
  }

  handleDate2 = (event, data) => {
    this.setState({ date2: data.value })
  }

  handleDate3 = (event, data) => {
    this.setState({ date3: data.value })
  }

  handleStartTime1 = (event, data) => {
    this.setState({ startTime1: data.value })
  }

  handleStartTime2 = (event, data) => {
    this.setState({ startTime2: data.value })
  }

  handleStartTime3 = (event, data) => {
    this.setState({ startTime3: data.value })
  }

  handleEndTime1 = (event, data) => {
    this.setState( { endTime1: data.value } )
  }

  handleEndTime2 = (event, data) => {
    this.setState( { endTime2: data.value })
  }

  handleEndTime3 = (event, data) => {
    this.setState( { endTime3: data.value })
  }

  handleCreateGig(event, name, date1, date2, date3, startTime1, startTime2, startTime3, endTime1, endTime2, endTime3, location, compensation) {
    event.preventDefault();
    const { gigs, createGig, currentBooker, currentDeejay } = this.props
    let newGig;

    let dateInput = date3 + '/' + date1 + '/' + date2;
    let startTime = startTime1 + ':' + startTime2 + startTime3;
    let endTime = endTime1 + ':' + endTime2 + endTime3;

    // THIS IS SOMEWHAT BRITTLE
    // because if there are gigs being created at the same time, there could be an issue with asynchronicity as the database updates
    let idArr = gigs.map(gig => gig.id)
    let lastId = Math.max(...idArr)
    let newId = lastId + 1;

    if (currentBooker) {
      newGig = {
        id: newId,
        bookerId: currentBooker.id,
        name: name,
        date: dateInput,
        time: startTime + ' - ' + endTime,
        location: location,
        compensation: compensation
      }
      createGig(newGig)
      this.setState({ createdBool: true })
      history.push(`/gigs/${newId}`);
    }
  }
}

const mapState = ({ gigs }) => ({ gigs })
const mapDispatch = ({ createGig })

export default connect(mapState, mapDispatch)(NewGigForm)
