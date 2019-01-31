import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateGig } from '../../store'
import dateFns from 'date-fns'

// COMPONENT

class GigDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateGig = this.handleUpdateGig.bind(this)
  }

  render() {
    return (
      <div>
        <div>{this.renderCurrentGig()}</div>
        <div>{this.renderUpdateGig()}</div>
      </div>
    )
  }

  renderCurrentGig() {
    const { gigs, currentGig } = this.props
    return (
      <div>
        {
          gigs
            .filter(gig => gig.id === currentGig.id)
            .map(gig => {
              const gigYear = currentGig.date.split('/')[0]
              const gigMonth = currentGig.date.split('/')[1]
              const gigDate = currentGig.date.split('/')[2]

              const formattedDate = dateFns.format(
                new Date(gigYear, gigMonth, gigDate),
                'MMMM D, YYYY'
              )
              return (
              <div key={gig.id}>
                <h4>{gig.name}</h4>
                <h4>{formattedDate}</h4>
                <h4>{gig.time}</h4>
                <h4>{gig.location}</h4>
                <h4>{gig.compensation}</h4>
              </div>
              )}
            )
        }
      </div>
    )
  }

  renderUpdateGig() {
    return (
      <div>
        <form onSubmit={this.handleUpdateGig} >
          <div>
            <h3>Update Gig Details</h3>
            <h4> Name <br />
              <input name="name" type="text" placeholder="" />
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
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
              <select name="time2" type="text" placeholder=""  >
                  <option value="">--</option>
                  <option value="0">00</option>
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
            <h4> Location <br />
              <input name="location" type="text" placeholder="" />
            </h4>
            <h4> Compenstion <br />
              <input name="compensation" type="text" placeholder="" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    )
  }

  handleUpdateGig(event) {
    event.preventDefault();
    const { updateGig, currentGig } = this.props;

    let dateInput = event.target.date3.value + '/' + event.target.date1.value + '/' + event.target.date2.value;
    let timeInput = event.target.time1.value + ':' + event.target.time2.value + ' ' + event.target.time3.value

    if (
      event.target.name.value === '' &&
      dateInput === '' &&
      timeInput === '' &&
      event.target.location.value === '' &&
      event.target.compensation.value === ''
    ) {
      alert("Please fill out at least one field")
    } else {
      const gig = {
        id: currentGig.id,
        name: event.target.name.value || currentGig.name,
        date: dateInput || currentGig.date,
        time: timeInput || currentGig.time,
        location: event.target.location.value || currentGig.location,
        compensation: event.target.compensation.value || currentGig.compensation
      }
      updateGig(gig);
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

}

// CONTAINER

const mapState = ({ gigs }, ownProps) => {
  const gigParamId = Number(ownProps.match.params.id)
  return {
    gigs,
    currentGig: gigs.filter(gig => gig.id === gigParamId)[0]
  }
}
const mapDispatch = ({ updateGig })

export default connect(mapState, mapDispatch)(GigDetail)
