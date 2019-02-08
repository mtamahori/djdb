import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGig, fetchGig } from '../../store'
import history from '../../history'

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
            <h4> Start Time <br />
              <select name="startTime1" type="text" placeholder=""  >
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
              <select name="startTime2" type="text" placeholder=""  >
                  <option value="">--</option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select name="startTime3" type="text" placeholder=""  >
                  <option value="">--</option>
                  <option value="am">am</option>
                  <option value="pm">pm</option>
              </select>
            </h4>
            <h4> End Time <br />
              <select name="endTime1" type="text" placeholder=""  >
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
              <select name="endTime2" type="text" placeholder=""  >
                  <option value="">--</option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
              </select>
              <select name="endTime3" type="text" placeholder=""  >
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
