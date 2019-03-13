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
      createdBool: false
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
            <Form.Input name="name" type="text" placeholder="Name">
            </Form.Input>
            <Form.Dropdown name="date1" type="text" placeholder="Month" fluid selection options={months}>
            </Form.Dropdown>
            <Form.Dropdown name="date2" type="text" placeholder="Date" fluid selection options={dates}>
            </Form.Dropdown>
            <Form.Dropdown name="date3" type="text" placeholder="Year" fluid selection options={years}>
            </Form.Dropdown>
          </Form.Group>
          

          <Form.Group  width={2}>
            <Form.Dropdown name="startTime1" type="text" placeholder="Hour" fluid selection options={hours}>
            </Form.Dropdown>
            <Form.Dropdown name="startTime2" type="text"   placeholder="Minute" fluid selection options={minutes}>
            </Form.Dropdown>
            <Form.Dropdown name="startTime3" type="text" placeholder="AM/PM" fluid selection options={ampm}>
            </Form.Dropdown>
          </Form.Group>
          
          <Form.Group  width={2}>
            <Form.Dropdown name="endTime1" type="text" placeholder="Hour" fluid selection options={hours}>
            </Form.Dropdown>
            <Form.Dropdown name="endTime2" type="text" placeholder="Minute" fluid selection options={minutes}>
            </Form.Dropdown>
            <Form.Dropdown name="endTime3" type="text" placeholder="AM/PM" fluid selection options={ampm}>
            </Form.Dropdown>
          </Form.Group>
          
          <Form.Group  width={2}>
            <Form.Input name="location" type="text" placeholder="Location">
            </Form.Input>
            <Form.Input name="compensation" type="text" placeholder="Compensation">
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

  handleCreateGig(event) {
    event.preventDefault();
    const { gigs, createGig, currentBooker, currentDeejay } = this.props
    let newGig;

    console.log('EVENT', event.target)

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
