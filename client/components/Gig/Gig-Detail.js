import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteGig, updateGig } from '../../store'
import history from '../../history'
import GigCurrentGig from './GigDetailElements/gigCurrentGig'
import GigDetailBooker from './Gig-Detail-Booker'
import GigDetailDeejay from './Gig-Detail-Deejay'
require('../../../public/stylesheets/gigDetail.css')

class GigDetail extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteGig = this.handleDeleteGig.bind(this)
    // this.handleUpdateGig = this.handleUpdateGig.bind(this)
    this.handleBookingAccept = this.handleBookingAccept.bind(this)
    this.handleBookingApplication = this.handleBookingApplication.bind(this)
    this.handleBookingDecline = this.handleBookingDecline.bind(this)
    this.handleCancelBooking = this.handleCancelBooking.bind(this)
    this.handleRetractApplication = this.handleRetractApplication.bind(this)
  }

  render() {
    const { currentGig, bookers, deejays, gigs } = this.props;

    let currentBooker;
    let currentDeejay;

    this.props.location.state
    ?
    { currentBooker, currentDeejay } = this.props.location.state
    :
    { currentBooker } = this.props;

    // console.log('CURRENTGIG', currentGig)
    // console.log('CURRENTBOOKER', currentBooker)

    if (!currentGig) {
      // console.log('NO CURRENT GIG')
      return <div>Loading!</div>
    }

    else {
      return (
      <div>
        {
          currentBooker &&
          <div>
            <GigCurrentGig
            currentBooker={currentBooker}
            currentGig={currentGig}
            bookers={bookers}
            deejays={deejays}
            gigs={gigs}
            />
            <GigDetailBooker
            currentBooker={currentBooker}
            currentGig={currentGig}
            deejays={deejays}
            handleDeleteGig={this.handleDeleteGig}
            />
          </div>
        }
        {
          currentDeejay &&
          <div>
            <GigCurrentGig
            currentDeejay={currentDeejay}
            currentGig={currentGig}
            bookers={bookers}
            deejays={deejays}
            gigs={gigs}
            />
            <GigDetailDeejay
            currentDeejay={currentDeejay}
            currentGig={currentGig}
            handleBookingApplication={this.handleBookingApplication}
            handleRetractApplication={this.handleRetractApplication}
            handleCancelBooking={this.handleCancelBooking}
            handleBookingAccept={this.handleBookingAccept}
            handleBookingDecline={this.handleBookingDecline}
            />
          </div>
        }
      </div>
    )}
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

  // handleUpdateGig(event) {
  //   event.preventDefault();
  //   const { updateGig, currentGig } = this.props;

  //   const getFormBools = () => {
  //     return (
  //       {
  //         name: !!event.target.name.value,
  //         date1: !!event.target.date1.value,
  //         date2: !!event.target.date2.value,
  //         date3: !!event.target.date3.value,
  //         startTime1: !!event.target.startTime1.value,
  //         startTime2: !!event.target.startTime1.value,
  //         startTime3: !!event.target.startTime1.value,
  //         endTime1: !!event.target.endTime1.value,
  //         endTime2: !!event.target.endTime1.value,
  //         endTime3: !!event.target.endTime1.value,
  //         location: !!event.target.location.value,
  //         compensation: !!event.target.compensation.value
  //       }
  //     )
  //   }
  //   const formConditions = getFormBools();
  //   const formBools = `${formConditions.name}-${formConditions.date1}-${formConditions.date2}-${formConditions.date3}-${formConditions.startTime1}-${formConditions.startTime2}-${formConditions.startTime3}-${formConditions.endTime1}-${formConditions.endTime2}-${formConditions.endTime3}-${formConditions.location}-${formConditions.compensation}`

  //   if (formBools === 'false-false-false-false-false-false-false-false-false-false-false-false') {
  //     alert("Please fill out at least one field")
  //   } else {

  //     // Use SemanticUI form component to set the default values for the update form as the values pulled from the database. This will avoid sending updates with empty fields

  //     let dateInput = event.target.date3.value + '/' + event.target.date1.value + '/' + event.target.date2.value;
  //     let startTimeInput = event.target.startTime1.value + ':' + event.target.startTime2.value + event.target.startTime3.value
  //     let endTimeInput = event.target.endTime1.value + ':' + event.target.endTime2.value + event.target.endTime3.value

  //     const gig = {
  //       id: currentGig.id,
  //       name: event.target.name.value || currentGig.name,
  //       date: dateInput || currentGig.date,
  //       time: startTimeInput + ' - ' + endTimeInput || currentGig.time,
  //       location: event.target.location.value || currentGig.location,
  //       compensation: event.target.compensation.value || currentGig.compensation
  //     }

  //     updateGig(gig);
  //     event.target.name.value = '';
  //     event.target.date1.value = '';
  //     event.target.date2.value = '';
  //     event.target.date3.value = '';
  //     event.target.startTime1.value = '';
  //     event.target.startTime2.value = '';
  //     event.target.startTime3.value = '';
  //     event.target.endTime1.value = '';
  //     event.target.endTime2.value = '';
  //     event.target.endTime3.value = '';
  //     event.target.location.value = '';
  //     event.target.compensation.value = '';
  //     history.push(`/gigs/${gig.id}`)
  //   }
  // }
}

    // consider computing currentBooker right here, rather than finding a way to pass it into this component after BOOKER creates a new GIG. a little messy, since it's otherwise passed top-down thru the component tree from BookerMain, but if it's only used for when a booker creates a gig, maybe it's not so bad?

const mapState = ({ gigs, deejays, bookers, user }, ownProps) => {
  const gigParamId = Number(ownProps.match.params.id)
  return {
    gigs,
    deejays,
    bookers,
    currentGig: gigs.filter(gig => gig.id === gigParamId)[0],
    currentBooker: bookers.filter(booker => booker.userId === user.id)[0]
  }
}
const mapDispatch = ({ deleteGig, updateGig })

export default connect(mapState, mapDispatch)(GigDetail)
