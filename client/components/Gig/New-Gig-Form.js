import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGig } from '../../store'

class NewGigForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateGig = this.handleCreateGig.bind(this)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateGig} >
          <div>
            <h3>Create New Gig</h3>
            <h4>
              <input name="name" type="text" required placeholder="Name" />
            </h4>
            <h4> Date <br />
              <select name="date1" type="text" placeholder=""  >
                <option value="">--</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
              <select name="date2" type="text" placeholder=""  >
                <option value="">--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
              <select name="date3" type="text" placeholder=""  >
                <option value="">----</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </h4>
            <h4> Time <br />
              <select name="time1" type="text" placeholder=""  >
                  <option value="">--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select name="time2" type="text" placeholder=""  >
                  <option value="">--</option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select name="time3" type="text" placeholder=""  >
                  <option value="">--</option>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
              </select>
            </h4>
            <h4>
              <input name="location" type="text" required placeholder="Location" />
            </h4>
            <h4>
              <input name="compensation" type="text" required placeholder="Compensation" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    )
  }

  handleCreateGig(event) {
    event.preventDefault();
    const { createGig, currentBooker, currentDeejay } = this.props
    let newGig;
    let dateInput = event.target.date3.value + '/' + event.target.date1.value + '/' + event.target.date2.value;
    let timeInput = event.target.time1.value + ':' + event.target.time2.value + event.target.time3.value;

    if (currentBooker) {
      newGig = {
        bookerId: currentBooker.id,
        name: event.target.name.value,
        date: dateInput,
        time: timeInput,
        location: event.target.location.value,
        compensation: event.target.compensation.value
      }
    }

    else if (currentDeejay) {
      newGig = {
        deejayId: currentDeejay.id,
        name: event.target.name.value,
        date: dateInput,
        time: timeInput,
        location: event.target.location.value,
        compensation: event.target.compensation.value
      }
    }

    createGig(newGig);
    event.target.name.value = '';
    event.target.date1.value = '';
    event.target.date2.value = '';
    event.target.date3.value = '';
    event.target.time1.value = '';
    event.target.time2.value = '';
    event.target.time3.value = '';
    event.target.location.value = '';
    event.target.compensation.value = '';
  }

}

const mapState = ({ gigs }) => ({ gigs })
const mapDispatch = ({ createGig })

export default connect(mapState, mapDispatch)(NewGigForm)
