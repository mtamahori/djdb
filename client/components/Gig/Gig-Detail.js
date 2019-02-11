import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteGig, updateGig } from '../../store'
import { Button } from 'semantic-ui-react'
import DeejayList from '../Deejay/Deejay-List'
import DeejayItem from '../Deejay/Deejay-Item'
import BookerItem from '../Booker/Booker-Item'
import history from '../../history'
import dateFns from 'date-fns'

// COMPONENT

class GigDetail extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteGig = this.handleDeleteGig.bind(this)
    this.handleUpdateGig = this.handleUpdateGig.bind(this)
  }

  render() {
    const { currentGig } = this.props;
    let currentBooker;
    let currentDeejay;

    // so stupid and brittle but whatever
    this.props.location.state ? {currentBooker, currentDeejay} = this.props.location.state : {currentBooker, currentDeejay} = null;

    // console.log('PROPS', this.props)
    // console.log('CURRENT this.props.location.state PASSED FROM NAVLINK', this.props.location.state)

    if (!currentGig) {
      return <div>Loading!</div>
    }

    else if (currentGig) {
      return (
      <div>
        <div>{this.renderCurrentGig()}</div>
        {
          currentDeejay &&
          !currentGig.deejayId &&
          <div>{this.renderBookingApplication()}</div>
        }
        {
          currentBooker &&
          currentGig.deejayApplicants.length &&
          <div>{this.renderDeejayApplicants()}</div>
        }
        {
          currentBooker &&
          !currentGig.deejayId &&
          <div>{this.renderDeejayList()}</div>
        }
        {
          currentBooker &&
          currentGig.bookerId === currentBooker.id &&
          <div>
            <div>{this.renderUpdateGig()}</div>
            <div>{this.renderDeleteGig()}</div>
          </div>
        }
      </div>
    )}
  }

  renderCurrentGig() {
    const { currentGig, gigs, deejays, bookers } = this.props
    return (
      <div>
        {
          gigs
            .filter(gig => gig.id === currentGig.id)
            .map(gig => {
              const gigDateArr = currentGig.date.split('/')
              const gigYear = gigDateArr[0]
              const gigMonth = gigDateArr[1]
              const gigDate = gigDateArr[2]
              let gigDeejay;
              let gigBooker;

              currentGig.deejayId ? gigDeejay = deejays.filter(deejay => deejay.id === currentGig.deejayId)[0] : gigDeejay = null;
              currentGig.bookerId ? gigBooker = bookers.filter(booker => booker.id === currentGig.bookerId)[0] : gigBooker = null;

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
                {
                  gigBooker &&
                  <div>
                    <h4>This Gig's Booker:</h4>
                    <BookerItem booker={gigBooker} key={gigBooker.id} currentGig={currentGig} />
                  </div>
                }
                {
                  gigDeejay &&
                  <div>
                    <h4>This Gig's Deejay:</h4>
                    <DeejayItem deejay={gigDeejay} key={gigDeejay.id} currentGig={currentGig} />
                  </div>
                }
              </div>
              )}
            )
        }
      </div>
    )
  }

  renderBookingApplication() {
    return (
      <Button
            size='massive'
            onClick={(event) => this.handleBookingApplication(event)}
            >
            Send Booking Request
      </Button>
    )
  }

  renderDeejayApplicants() {
    const { currentGig, deejays } = this.props;
    const deejayApplicants = deejays.filter(deejay => (
      currentGig.deejayApplicants.indexOf(deejay.id) !== -1)
    )

    return (
      <div>
        <h3>Deejay Applicants (below)</h3>
        <DeejayList deejays={deejayApplicants} currentGig={currentGig} />
      </div>
    )
  }

  renderDeejayList() {
    const { currentGig, deejays } = this.props;
    return (
      <div>
        <h3>Deejays You Can Book (below)</h3>
        <DeejayList deejays={deejays} currentGig={currentGig} />
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

  renderDeleteGig() {
    return (
      <button onClick={this.handleDeleteGig} type="button" >
        Delete Gig
      </button>
    )
  }

  handleBookingApplication(event) {
    event.preventDefault();
    const { updateGig, currentGig } = this.props
    const { currentDeejay } = this.props.location.state
    if ((currentGig.deejayApplicants.indexOf(currentDeejay.id) === -1) && !currentGig.deejayId) {
      currentGig.deejayApplicants.push(currentDeejay.id);
      updateGig(currentGig);
      history.push('/deejay')
    }
    else {
      console.log('You have already sent a booking request to this booker!')
    }
  }

  handleDeleteGig(event) {
    event.stopPropagation();
    const { deleteGig, currentGig } = this.props;
    deleteGig(currentGig);
    history.push('/home')
  }

  handleUpdateGig(event) {
    event.preventDefault();
    const { updateGig, currentGig } = this.props;

    let dateInput = event.target.date3.value + '/' + event.target.date1.value + '/' + event.target.date2.value;
    let startTimeInput = event.target.startTime1.value + ':' + event.target.startTime2.value + event.target.startTime3.value
    let endtTimeInput = event.target.endTime1.value + ':' + event.target.endTime2.value + event.target.startTime3.value

    if (
      event.target.name.value === '' &&
      dateInput === '' &&
      startTimeInput === '' &&
      endTimeInput === '' &&
      event.target.location.value === '' &&
      event.target.compensation.value === ''
    ) {
      alert("Please fill out at least one field")
    } else {
      const gig = {
        id: currentGig.id,
        name: event.target.name.value || currentGig.name,
        date: dateInput || currentGig.date,
        time: startTimeInput + ' - ' + endTimeInput || currentGig.time,
        location: event.target.location.value || currentGig.location,
        compensation: event.target.compensation.value || currentGig.compensation
      }
      updateGig(gig);
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

    history.push(`/gigs/:${gig.id}`)
  }



}

// CONTAINER

const mapState = ({ gigs, deejays, bookers }, ownProps) => {
  const gigParamId = Number(ownProps.match.params.id)
  return {
    gigs,
    deejays,
    bookers,
    currentGig: gigs.filter(gig => gig.id === gigParamId)[0]
  }
}
const mapDispatch = ({ deleteGig, updateGig })

export default connect(mapState, mapDispatch)(GigDetail)
