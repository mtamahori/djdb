import React, { Component } from 'react'
import { connect } from 'react-redux'
import DeejayDetail from './Deejay-Detail'
import CalendarMain from '../Calendar/Calendar-Main'
import GigMain from '../Gig/Gig-Main'
import GigInvites from './Gig-Invites'
import GigPendingApplications from './Gig-Pending-Applications'
import NewDeejayForm from './New-Deejay-Form'

class DeejayMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentDeejay, gigs } = this.props;
    return (
      <div>
        {
          currentDeejay === undefined
          ?
          <NewDeejayForm />
          :
          <div>
            <CalendarMain currentDeejay={currentDeejay} />
            <DeejayDetail currentDeejay={currentDeejay} />
            <GigInvites currentDeejay={currentDeejay} gigs={gigs} />
            <GigPendingApplications currentDeejay={currentDeejay} gigs={gigs} />
            <GigMain currentDeejay={currentDeejay} />
          </div>
        }
      </div>
    )
  }
}

const mapState = ({ user, gigs, deejays }) => {
  return {
    user,
    gigs,
    deejays,
    currentDeejay: deejays.filter(deejay => deejay.userId === user.id)[0]
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayMain)
