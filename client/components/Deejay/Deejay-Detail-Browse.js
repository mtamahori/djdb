import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateGig } from '../../store'
import { List, Button } from 'semantic-ui-react'
import history from '../../history'

class DeejayDetailBrowse extends Component {
  constructor (props) {
    super(props)

    this.handleBookingInvite = this.handleBookingInvite.bind(this);
    this.handleBookingAccept = this.handleBookingAccept.bind(this);
    this.handleBookingDecline = this.handleBookingDecline.bind(this);
  }

  render () {
    const { currentDeejayBrowse } = this.props;
    const { currentGig } = this.props.location.state;

    if (!currentGig) {
      this.renderDeejayDetails(currentDeejayBrowse);
    }
    else {
      const conditions = this.getBools();
      const bools = `${conditions.isCurrentGig}-${conditions.isCurrentDeejayBrowse}-${conditions.hasDeejay}-${conditions.isGigDeejay}-${conditions.isApplicant}-${conditions.isInvite}-${conditions.hasDeclinedApp}-${conditions.hasDeclinedInv}`
      return (
        <div>
          {
            this.renderDeejayDetails(currentDeejayBrowse)
          }
          {{
            ['true-true-false-false-false-false-false-false']: this.renderSendBookingRequest(), //eslint-disable-line no-useless-computed-key
            ['true-true-false-false-false-true-false-false']: this.renderRetractBookingRequest(), //eslint-disable-line no-useless-computed-key
            ['true-true-false-false-true-false-false-false']: this.renderAcceptDeclineBookingRequest(), //eslint-disable-line no-useless-computed-key
            ['true-true-true-true-false-false-false-false']: this.renderRetractBooking() //eslint-disable-line no-useless-computed-key
          }[bools]}
        </div>
      )
    }
  }

  getBools() {
    const { currentDeejayBrowse } = this.props;
    const { currentGig } = this.props.location.state;
    return {
      isCurrentGig: !!currentGig,
      isCurrentDeejayBrowse: !!currentDeejayBrowse,
      hasDeejay: !!currentGig.deejayId,
      isGigDeejay: currentGig.deejayId === currentDeejayBrowse.id,
      isApplicant: currentGig.deejayApplicants.includes(currentDeejayBrowse.id),
      isInvite: currentGig.deejayInvites.includes(currentDeejayBrowse.id),
      hasDeclinedApp: currentGig.declinedApps.includes(currentDeejayBrowse.id),
      hasDeclinedInv: currentGig.declinedInvs.includes(currentDeejayBrowse.id)
    }
  }

  renderDeejayDetails(deejay) {
    return (
      <div>
        <h3>Deejay Details</h3>
        {
          <List key={deejay.id} >
            <List.Item icon="users" content={deejay.name} />
            <List.Item icon="marker" content="Chicago, IL" />
            <List.Item icon="mail" content={deejay.email} />
            <List.Item icon="phone" content={deejay.phone} />
          </List>
        }
      </div>
    )
  }

  renderSendBookingRequest() {
    return (
      <div>
        <Button
          size="massive"
          onClick={(event) => this.handleBookingInvite(event)}
        >Send Booking Request
        </Button>
      </div>
    )
  }

  renderRetractBookingRequest() {
    return (
      <div>
        <Button
          size="massive"
          onClick={(event) => this.handleBookingRetractInvite(event)}
        >Retract Booking Request
        </Button>
      </div>
    )
  }

  renderAcceptDeclineBookingRequest() {
    return (
      <div>
        <Button
          size="massive"
          onClick={(event) => this.handleBookingAccept(event)}
        >Accept Booking Request
        </Button>
        <Button
          size="massive"
          onClick={(event) => this.handleBookingDecline(event)}
        >Decline Booking Request
        </Button>
      </div>
    )
  }

  renderRetractBooking() {
    return (
      <div>
        <Button
          size="massive"
          onClick={(event) => this.handleBookingRetract(event)}
        >Retract Booking
        </Button>
      </div>
    )
  }

  handleBookingInvite(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props
    const { currentGig } = this.props.location.state
    currentGig.deejayInvites.push(currentDeejayBrowse.id);
    updateGig(currentGig);
    history.push('/booker');
  }

  handleBookingAccept(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props;
    const { currentGig } = this.props.location.state;
    for (let i = 0; i < currentGig.deejayApplicants.length; i++) {
      if (currentGig.deejayApplicants[i] === currentDeejayBrowse.id) {
        currentGig.deejayApplicants.splice(i, 1)
        break;
      }
    }
    currentGig.deejayId = currentDeejayBrowse.id;
    updateGig(currentGig);
    history.push('/booker');
  }

  handleBookingDecline(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props;
    const { currentGig } = this.props.location.state;
    for (let i = 0; i < currentGig.deejayApplicants.length; i++) {
      if (currentGig.deejayApplicants[i] === currentDeejayBrowse.id) {
        currentGig.deejayApplicants.splice(i, 1)
        currentGig.declinedApps.push(currentDeejayBrowse.id);
        break;
      }
    }
    updateGig(currentGig);
    history.push('/booker');
  }

  handleBookingRetractInvite(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props;
    const { currentGig } = this.props.location.state;
    for (let i = 0; i < currentGig.deejayInvites.length; i++) {
      if (currentGig.deejayInvites[i] === currentDeejayBrowse.id) {
        currentGig.deejayInvites.splice(i, 1)
        currentGig.declinedInvs.push(currentDeejayBrowse.id);
        break;
      }
    }
    updateGig(currentGig);
    history.push('/booker')
  }

  handleBookingRetract(event) {
    event.preventDefault();
    const { updateGig } = this.props;
    const { currentGig } = this.props.location.state;
    currentGig.deejayId = null;
    updateGig(currentGig);
    history.push('/booker')
  }
}

const mapState = ({ user, deejays }, ownProps) => {
  const deejayParamId = Number(ownProps.match.params.id)
  return {
    user,
    deejays,
    currentDeejayBrowse: deejays.filter(deejay => deejay.id === deejayParamId)[0]
  }
}
const mapDispatch = { updateGig };

export default connect(mapState, mapDispatch)(DeejayDetailBrowse)
