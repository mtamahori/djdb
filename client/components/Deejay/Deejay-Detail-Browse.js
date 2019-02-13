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

  render() {
    const { currentDeejayBrowse } = this.props;
    const { currentGig } = this.props.location.state;


    if (!currentDeejayBrowse) {
      return <div>Loading!</div>
    }

    else if (currentDeejayBrowse) {
      return (
        <div>
        <h3>Deejay Details</h3>
          {
            <List key={currentDeejayBrowse.id} >
              <List.Item icon='users' content={currentDeejayBrowse.name} />
              <List.Item icon='marker' content='Chicago, IL' />
              <List.Item icon='mail' content={currentDeejayBrowse.email} />
              <List.Item icon='phone' content={currentDeejayBrowse.phone} />
            </List>
          }
          {
            !currentGig.deejayId &&
            currentGig.deejayInvites.indexOf(currentDeejayBrowse.id) === -1 &&
            currentGig.deejayApplicants.indexOf(currentDeejayBrowse.id) === -1 &&
            <Button
              size='massive'
              onClick={(event) => this.handleBookingInvite(event)}
              >
              Send Booking Request
            </Button>
          }
          {
            currentGig.deejayApplicants.indexOf(currentDeejayBrowse.id) !== -1 &&
            <div>
            <Button
              size='massive'
              onClick={(event) => this.handleBookingAccept(event)}
              >
              Accept Booking Request
            </Button>
            <Button
              size='massive'
              onClick={(event) => this.handleBookingDecline(event)}
              >
              Decline Booking Request
            </Button>
            </div>
          }
        </div>
      )
    }
  }

  handleBookingInvite(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props
    const { currentGig } = this.props.location.state
    if (currentGig.deejayInvites.indexOf(currentDeejayBrowse.id) === -1) {
      currentGig.deejayInvites.push(currentDeejayBrowse.id);
      updateGig(currentGig);
      history.push('/booker')
    }
    else {
      console.log('You have already sent a booking request to this Deejay!')
    }
  }

  handleBookingAccept(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props
    const { currentGig } = this.props.location.state
    if (!currentGig.deejayId) {
      currentGig.deejayId = currentDeejayBrowse.id;
      updateGig(currentGig);
    }
  }

  handleBookingDecline(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props
    const { currentGig } = this.props.location.state
      // currentGig.declinedApps.push(currentDeejayBrowse.id);
      updateGig(currentGig);
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

