import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteGig, updateGig } from '../../store'
import history from '../../history'
import dateFns from 'date-fns'

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

    this.props.location.state
    ?
    {currentBooker, currentDeejay} = this.props.location.state
    :
    console.log('')

    if (!currentGig) {
      return <div>Loading!</div>
    }

    else {
      const deejayConditions = this.getDeejayBools();
      const deejayBools = `${deejayConditions.isCurrentDeejay}-${deejayConditions.isCurrentBooker}-${deejayConditions.hasDeejay}-${deejayConditions.isGigDeejay}-${deejayConditions.isGigBooker}-${deejayConditions.isApplicant}-${deejayConditions.isInvite}-${deejayConditions.hasDeclinedApp}-${deejayConditions.hasDeclinedInv}`

      const bookerConditions = this.getBookerBools();
      const bookerBools = `${bookerConditions.isCurrentBooker}-${bookerConditions.declinedApps}-${bookerConditions.declinedInvs}`;

      let gigDateArr = currentGig.date.split('/')
      let gigYear = gigDateArr[0]
      let gigMonth = gigDateArr[1]
      let gigDate = gigDateArr[2]

      return (
      <div>
        {
          this.renderCurrentGig()
        }

        {{
          ['true-false-false-false-false-false-false']: this.renderBookingApplication(),
          ['true-false-false-false-true-false-false']: this.renderAcceptDeclineBookingRequest(),
          ['true-false-false-true-false-false-false']: this.renderRetractApplication()
        }[deejayBools]}

        {
          deejayBools === ['true-true-true-false-false-true-true'] &&
          dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now()) &&
          this.renderCancelBooking()
        }

        {{
          ['']: this.renderDeejayInvites(),
          ['']: this.renderDeejayApplicants(),
          ['']: this.renderDeclinedInvs(),
          ['']: this.renderDeclinedApps(),
          ['']: this.renderDeejayList(),
        }[bookerBools]}

        {
          // currentDeejay &&
          // !currentGig.deejayId &&
          // currentGig.deejayApplicants.indexOf(currentDeejay.id) === -1 &&
          // currentGig.deejayInvites.indexOf(currentDeejay.id) === -1 &&
          // currentGig.declinedApps.indexOf(currentDeejay.id) === -1 &&
          // currentGig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
          // <div>{this.renderBookingApplication()}</div>
        }
        {
          // currentDeejay &&
          // !currentGig.deejayId &&
          // currentGig.deejayInvites.indexOf(currentDeejay.id) !== -1 &&
          // currentGig.declinedApps.indexOf(currentDeejay.id) === -1 &&
          // currentGig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
          // <div>{this.renderAcceptDeclineBookingRequest()}</div>
        }
        {
          // currentDeejay &&
          // !currentGig.deejayId &&
          // currentGig.deejayApplicants.indexOf(currentDeejay.id) !== -1 &&
          // currentGig.declinedApps.indexOf(currentDeejay.id) === -1 &&
          // currentGig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
          // <div>{this.renderRetractApplication()}</div>
        }
        {
          // dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now()) &&
          // currentDeejay &&
          // currentGig.deejayId === currentDeejay.id &&
          // currentGig.declinedApps.indexOf(currentDeejay.id) === -1 &&
          // currentGig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
          // <div>{this.renderCancelBooking()}</div>
        }

        {
          currentBooker &&
          currentGig.deejayInvites.length &&
          <div>{this.renderDeejayInvites()}</div>
        }
        {
          currentBooker &&
          currentGig.deejayApplicants.length &&
          <div>{this.renderDeejayApplicants()}</div>
        }
        {
          currentBooker &&
          currentGig.declinedApps.length &&
          <div>{this.renderDeclinedApps()}</div>
        }
        {
          currentBooker &&
          currentGig.declinedInvs.length &&
          <div>{this.renderDeclinedInvs()}</div>
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

  getDeejayBools() {
    const { currentGig } = this.props;
    const { currentDeejay } = this.props.location.state;
    return {
      isCurrentDeejay: !!currentDeejay,
      hasDeejay: !!currentGig.deejayId,
      isGigDeejay: currentGig.deejayId === currentDeejay.id,
      isApplicant: currentGig.deejayApplicants.includes(currentDeejay.id),
      isInvite: currentGig.deejayInvites.includes(currentDeejay.id),
      hasDeclinedApp: currentGig.declinedApps.includes(currentDeejay.id),
      hasDeclinedInv: currentGig.declinedInvs.includes(currentDeejay.id),
    }
  }

  getBookerBools() {
    const {currentGig} = this.props;
    const { currentBooker } = this.props.location.state;
    return {
      isCurrentBooker: !!currentBooker,
      isGigBooker: currentGig.bookerId === currentBooker.id,
      declinedApps: !!currentGig.declinedApps.length,
      declinedInvs: !!currentGig.declinedInvs.length
    }
  }

  handleBookingApplication(event) {
    event.preventDefault();
    const { currentGig, updateGig } = this.props;
    const { currentDeejay } = this.props.location.state;
    if ((currentGig.deejayApplicants.indexOf(currentDeejay.id) === -1) && !currentGig.deejayId) {
      currentGig.deejayApplicants.push(currentDeejay.id);
      updateGig(currentGig);
      history.push('/deejay')
    }
    else {
      console.log('You have already sent a booking request to this booker!')
    }
  }

  handleBookingAccept(event) {
    event.preventDefault();
    const { currentGig, updateGig } = this.props;
    const { currentDeejay } = this.props.location.state;

    for (let i = 0; i < currentGig.deejayInvites.length; i++) {
      if (currentGig.deejayInvites[i] === currentDeejay.id) {
        currentGig.deejayInvites.splice(i, 1)
        break;
      }
    }

    currentGig.deejayId = currentDeejay.id;
    updateGig(currentGig);
    history.push('/deejay');
  }

  handleBookingDecline(event) {
    event.preventDefault();
    const { currentGig, updateGig } = this.props;
    const { currentDeejay } = this.props.location.state;

    for (let i = 0; i < currentGig.deejayInvites.length; i++) {
      if (currentGig.deejayInvites[i] === currentDeejay.id) {
        currentGig.deejayInvites.splice(i, 1)
        break;
      }
    }

    currentGig.declinedInvs.push(currentDeejay.id);
    updateGig(currentGig);
    history.push('/deejay')
  }

  handleRetractApplication(event) {
    event.preventDefault();
    const { currentGig, updateGig } = this.props;
    const { currentDeejay } = this.props.location.state;

    for (let i = 0; i < currentGig.deejayApplicants.length; i++) {
      if (currentGig.deejayApplicants[i] === currentDeejay.id) {
        currentGig.deejayApplicants.splice(i, 1)
        break;
      }
    }

    currentGig.declinedApps.push(currentDeejay.id);
    updateGig(currentGig);
    history.push('/deejay')
  }

  handleCancelBooking(event) {
    event.preventDefault();
    const { currentGig, updateGig } = this.props;

    for (let i = 0; i < currentGig.deejayApplicants.length; i++) {
      if (currentGig.deejayApplicants[i] === currentGig.deejayId) {
        currentGig.deejayApplicants.splice(i, 1)
        currentGig.declinedApps.push(currentGig.deejayId)
        break;
      }
    }

    for (let i = 0; i < currentGig.deejayInvites.length; i++) {
      if (currentGig.deejayInvites[i] === currentGig.deejayId) {
        currentGig.deejayInvites.splice(i, 1)
        currentGig.declinedInvs.push(currentGig.deejayId)
        break;
      }
    }

    currentGig.deejayId = null;
    updateGig(currentGig);
    history.push('/deejay')
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

    const getFormBools = () => {
      return (
        {
          name: !!event.target.name.value,
          date1: !!event.target.date1.value,
          date2: !!event.target.date2.value,
          date3: !!event.target.date3.value,
          startTime1: !!event.target.startTime1.value,
          startTime2: !!event.target.startTime1.value,
          startTime3: !!event.target.startTime1.value,
          endTime1: !!event.target.endTime1.value,
          endTime2: !!event.target.endTime1.value,
          endTime3: !!event.target.endTime1.value,
          location: !!event.target.location.value,
          compensation: !!event.target.compensation.value
        }
      )
    }
    const formConditions = getFormBools();
    const formBools = `${formConditions.name}-${formConditions.date1}-${formConditions.date2}-${formConditions.date3}-${formConditions.startTime1}-${formConditions.startTime2}-${formConditions.startTime3}-${formConditions.endTime1}-${formConditions.endTime2}-${formConditions.endTime3}-${formConditions.location}-${formConditions.compensation}`

    if (formBools === 'false-false-false-false-false-false-false-false-false-false-false-false') {
      alert("Please fill out at least one field")
    } else {

      // Use SemanticUI form component to set the default values for the update form as the values pulled from the database. This will avoid sending updates with empty fields

      let dateInput = event.target.date3.value + '/' + event.target.date1.value + '/' + event.target.date2.value;
      let startTimeInput = event.target.startTime1.value + ':' + event.target.startTime2.value + event.target.startTime3.value
      let endTimeInput = event.target.endTime1.value + ':' + event.target.endTime2.value + event.target.endTime3.value

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
      history.push(`/gigs/${gig.id}`)
    }
  }
}

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
