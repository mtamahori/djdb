import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GigList } from '../index'
import { updateGig, createChannel } from '../../store'
import { List, Button } from 'semantic-ui-react'
import history from '../../history'
import dateFns from 'date-fns'
require('../../../public/stylesheets/profile.css')

class DeejayDetailBrowse extends Component {
  constructor (props) {
    super(props)

    this.handleBookingInvite = this.handleBookingInvite.bind(this);
    this.handleBookingAccept = this.handleBookingAccept.bind(this);
    this.handleBookingDecline = this.handleBookingDecline.bind(this);
    this.handleCreateChannel = this.handleCreateChannel.bind(this);
  }

  render () {
    const { currentGig, currentBooker } = this.props.location.state;
    const { channels, currentDeejayBrowse } = this.props;

    let currentChannel;
    let channelCheck = channels.filter(channel => (channel.bookerId === currentBooker.id) && (channel.deejayId === currentDeejayBrowse.id))
    channelCheck.length ? currentChannel = channelCheck[0] : currentChannel = null;

    if (!currentDeejayBrowse) {
      return null;
    }

    if (!currentGig) {

      return (
        <div className="deejay-profile-container">
          {
            this.renderDeejayDetails(currentDeejayBrowse)
          }
          {
            currentChannel ?
            this.renderSendMessage(currentChannel, currentBooker) :
            this.renderCreateChannel()
          }
          {
            this.renderDeejayPastGigs(currentDeejayBrowse)
          }
        </div>
      )
    }

    else {
      const conditions = this.getBools();
      const bools = `${conditions.isCurrentGig}-${conditions.isCurrentDeejayBrowse}-${conditions.hasDeejay}-${conditions.isGigDeejay}-${conditions.isApplicant}-${conditions.isInvite}-${conditions.hasDeclinedApp}-${conditions.hasDeclinedInv}`
      return (
        <div className="deejay-profile-container">
          {
            this.renderDeejayDetails(currentDeejayBrowse)
          }
          {
            currentChannel ?
            this.renderSendMessage(currentChannel, currentBooker) :
            this.renderCreateChannel()
          }
          {{
            ['true-true-false-false-false-false-false-false']: this.renderSendBookingRequest(), //eslint-disable-line no-useless-computed-key
            ['true-true-false-false-false-true-false-false']: this.renderRetractBookingRequest(), //eslint-disable-line no-useless-computed-key
            ['true-true-false-false-true-false-false-false']: this.renderAcceptDeclineBookingRequest(), //eslint-disable-line no-useless-computed-key
            ['true-true-true-true-false-false-false-false']: this.renderRetractBooking() //eslint-disable-line no-useless-computed-key
          }[bools]}
          {
            this.renderDeejayPastGigs(currentDeejayBrowse)
          }
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
      <div className="deejay-profile-detail">
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

  renderDeejayPastGigs(currentDeejay) {
    const { gigs } = this.props;
    let pastGigs = gigs.filter(gig => {
      return (
        gig.deejayId === currentDeejay.id &&
        this.pastDateCheck(gig)
      )
    })
    return (
      pastGigs.length
      ?
      <div>
        <h3>This Deejay's Past Gigs:</h3>
        <GigList currentDeejay={currentDeejay} gigs={pastGigs} />
      </div>
      :
      <h3>This Deejay Has Not Played Out Yet</h3>
    )
  }

  renderCreateChannel() {
    return (
      <div>
        <Button
          size="massive"
          onClick={(event) => this.handleCreateChannel(event)}
        >Start a Chat Channel
        </Button>
      </div>
    )
  }

  renderSendMessage(channel, currentBooker) {
    return (
      <div>
        <NavLink
          activeClassName="active"
          to={{
            pathname: `/inbox/booker/channels/${channel.id}`,
            state: {
              channel: channel,
              currentBooker: currentBooker
            }
          }}
        >
          <Button
            size="massive"
            >Send Message
          </Button>
        </NavLink>
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
    const { currentGig } = this.props.location.state;
    let gigDateArr = currentGig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return (
      dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now()) &&
      <div>
        <Button
          size="massive"
          onClick={(event) => this.handleBookingRetract(event)}
        >Retract Booking
        </Button>
      </div>
    )
  }

  pastDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
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

  handleCreateChannel(event) {
    event.preventDefault();
    const { channels, createChannel, currentDeejayBrowse } = this.props;
    const { currentBooker } = this.props.location.state;
    const newChannel = {
      name: currentBooker.name + ' + ' + currentDeejayBrowse.name,
      deejayId: currentDeejayBrowse.id,
      bookerId: currentBooker.id,
      bookerLastRead: Date.now(),
      deejayLastRead: null
    }

    let channelCheck = channels.filter(channel => (channel.bookerId === currentBooker.id) && (channel.deejayId === currentDeejayBrowse.id))

    !channelCheck.length && createChannel(newChannel)

    history.push('/inbox')
  }
}

const mapState = ({ user, deejays, channels, gigs }, ownProps) => {
  const deejayParamId = Number(ownProps.match.params.id)
  return {
    user,
    deejays,
    channels,
    gigs,
    currentDeejayBrowse: deejays.filter(deejay => deejay.id === deejayParamId)[0]
  }
}
const mapDispatch = ({ updateGig, createChannel });

export default connect(mapState, mapDispatch)(DeejayDetailBrowse)
