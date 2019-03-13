import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGig, fetchGig } from '../../store'
import history from '../../history'
import { Form, Message, Button } from 'semantic-ui-react'
require('../../../public/stylesheets/newGig.css')

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
      { text: 'January', value: '0' },
      { text: 'February', value: '1' },
      { text: 'March', value: '2' },
      { text: 'April', value: '3' },
      { text: 'May', value: '4' },
      { text: 'June', value: '5' },
      { text: 'July', value: '6' },
      { text: 'August', value: '7' },
      { text: 'September', value: '8' },
      { text: 'October', value: '9' },
      { text: 'November', value: '10' },
      { text: 'December', value: '11' }
    ]
    const dates = [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
      { text: '4', value: '4' },
      { text: '5', value: '5' },
      { text: '6', value: '6' },
      { text: '7', value: '7' },
      { text: '8', value: '8' },
      { text: '9', value: '9' },
      { text: '10', value: '10' },
      { text: '11', value: '11' },
      { text: '12', value: '12' },
      { text: '13', value: '13' },
      { text: '14', value: '14' },
      { text: '15', value: '15' },
      { text: '16', value: '16' },
      { text: '17', value: '17' },
      { text: '18', value: '18' },
      { text: '19', value: '19' },
      { text: '20', value: '20' },
      { text: '21', value: '21' },
      { text: '22', value: '22' },
      { text: '23', value: '23' },
      { text: '24', value: '24' },
      { text: '25', value: '25' },
      { text: '26', value: '26' },
      { text: '27', value: '27' },
      { text: '28', value: '28' },
      { text: '29', value: '29' },
      { text: '30', value: '30' },
      { text: '31', value: '31' },
    ]
    const years = [
      { text: '2019', value: '2019' },
      { text: '2020', value: '2020' }
    ]
    const hours = [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
      { text: '4', value: '4' },
      { text: '5', value: '5' },
      { text: '6', value: '6' },
      { text: '7', value: '7' },
      { text: '8', value: '8' },
      { text: '9', value: '9' },
      { text: '10', value: '10' },
      { text: '11', value: '11' },
      { text: '12', value: '12' },
    ]
    const minutes = [
      { text: '00', value: '00' },
      { text: '15', value: '15' },
      { text: '30', value: '30' },
      { text: '45', value: '45' },
    ]
    const ampm = [
      { text: 'AM', value: 'am' },
      { text: 'PM', value: 'pm' }
    ]
    return (
      <div className="new-gig-form-container">
        <Form success={this.state.createdBool} onSubmit={this.handleCreateGig} width={2}>

          <Form.Group  width={2}>
            <Form.Input name="name" placeholder="Name" value={this.state.name} onChange={this.handleName.bind(this)}>
            </Form.Input>
            <Form.Dropdown name="date1" placeholder="Month" fluid selection options={months} value={this.state.date1} onChange={this.handleDate1.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="date2" placeholder="Date" fluid selection options={dates} value={this.state.date2} onChange={this.handleDate2.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="date3" placeholder="Year" fluid selection options={years} value={this.state.date3} onChange={this.handleDate3.bind(this)}>
            </Form.Dropdown>
          </Form.Group>


          <Form.Group  width={2}>
            <Form.Dropdown name="startTime1" placeholder="Hour" fluid selection options={hours} value={this.state.startTime1} onChange={this.handleStartTime1.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="startTime2"   placeholder="Minute" fluid selection options={minutes} value={this.state.startTime2} onChange={this.handleStartTime2.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="startTime3" placeholder="AM/PM" fluid selection options={ampm} value={this.state.startTime3} onChange={this.handleStartTime3.bind(this)}>
            </Form.Dropdown>
          </Form.Group>

          <Form.Group  width={2}>
            <Form.Dropdown name="endTime1" placeholder="Hour" fluid selection options={hours} value={this.state.endTime1} onChange={this.handleEndTime1.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="endTime2" placeholder="Minute" fluid selection options={minutes} value={this.state.endTime2} onChange={this.handleEndTime2.bind(this)}>
            </Form.Dropdown>
            <Form.Dropdown name="endTime3" placeholder="AM/PM" fluid selection options={ampm} value={this.state.endTime3} onChange={this.handleEndTime3.bind(this)}>
            </Form.Dropdown>
          </Form.Group>

          <Form.Group  width={2}>
            <Form.Input name="location" placeholder="Location" value={this.state.location} onChange={this.handleLocation.bind(this)}>
            </Form.Input>
            <Form.Input name="compensation" placeholder="Compensation" value={this.state.compensation} onChange={this.handleCompensation.bind(this)}>
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

  handleDate1(data) {
    this.setState({ date1: data.value })
  }

  handleDate2(data) {
    this.setState({ date2: data.value })
  }

  handleDate3(data) {
    this.setState({ date3: data.value })
  }

  handleStartTime1(data) {
    this.setState({ startTime1: data.value })
  }

  handleStartTime2(data) {
    this.setState({ startTime2: data.value })
  }

  handleStartTime3(data) {
    this.setState({ startTime3: data.value })
  }

  handleEndTime1(data) {
    this.setState( { endTime1: data.value } )
  }

  handleEndTime2(data) {
    this.setState( { endTime2: data.value })
  }

  handleEndTime3(data) {
    this.setState( { endTime3: data.value })
  }

  handleCreateGig(event) {
    event.preventDefault();
    const { gigs, createGig, currentBooker, currentDeejay } = this.props
    let newGig;

    let dateInput = event.target.date3.value + '/' + event.target.date1.value + '/' + event.target.date2.value;
    let startTime = event.target.startTime1.value + ':' + event.target.startTime2.value + event.target.startTime3.value;
    let endTime = event.target.endTime1.value + ':' + event.target.endTime2.value + event.target.endTime3.value;

    let idArr = gigs.map(gig => gig.id)
    let lastId = Math.max(...idArr)
    let newId = lastId + 1;

    if (currentBooker) {
      newGig = {
        id: newId,
        bookerId: currentBooker.id,
        name: event.target.name.value,
        date: dateInput,
        time: startTime + ' - ' + endTime,
        location: event.target.location.value,
        compensation: event.target.compensation.value
      }
      createGig(newGig)
      this.setState({ createdBool: true })
      history.push(`/gigs/${newId}`);
    }

    else if (currentDeejay) {
      newGig = {
        id: newId,
        deejayId: currentDeejay.id,
        name: event.target.name.value,
        date: dateInput,
        time: startTime + '-' + endTime,
        location: event.target.location.value,
        compensation: event.target.compensation.value
      }
      createGig(newGig);
      this.setState({ createdBool: true })
      history.push(`/gigs/${newId}/`);
    }

    event.target.name.value = '';
    event.target.date1.value = '';
    event.target.date2.value = '';
    event.target.date3.value = '';
    event.target.startTime1.value = '';
    event.target.startTime2.value = '';
    event.target.startTime3.value = '';
    event.target.endTime1.value = '';
    event.target.endTime2.value = '';
    event.target.endTime3.value = '';
    event.target.location.value = '';
    event.target.compensation.value = '';
  }

}

const mapState = ({ gigs }) => ({ gigs })
const mapDispatch = ({ createGig, fetchGig })

export default connect(mapState, mapDispatch)(NewGigForm)
