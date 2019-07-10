import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteGig, updateGig } from '../../store'
import history from '../../history'
import GigCurrentGig from './GigDetailElements/gigCurrentGig'
import GigDetailBooker from './Gig-Detail-Booker'
import GigDetailDeejay from './Gig-Detail-Deejay'
require('../../../public/stylesheets/gigDetail.css')

// PARENT COMPONENT FOR OTHER DETAIL COMPONENTS
// PROVIDES THE GIG'S CORE DETAILS VIA gigCurrentGig
// PROVIDES BOOKER-SPECIFIC DETAILS VIA gigDetailBooker
// PROVIDES DEEJAY-SPECIFIC DETAILS VIA gigDetailDeejay

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

    if (!currentGig) {
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
}

    // note: currentBooker is only used here for when booker creates a gig

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
