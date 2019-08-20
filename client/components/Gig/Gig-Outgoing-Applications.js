import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import GigList from './Gig-List'
import dateFns from 'date-fns'
require('../../../public/stylesheets/sidebar.css')

// FOR DEEJAYS
// VIEWING OUTGOING BOOKING APPLICATION REQUESTS TO BOOKERS

class OutgoingApplications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: false
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => {
            this.state.view === false ?
            this.setState({ view: true }) :
            this.setState({ view: false })
          }}
          size="massive">
          Outgoing Booking Requests
        </Button>
        {
        this.state.view &&
        this.renderGigPendingApplications()
        }
      </div>
    )
  }

  renderGigPendingApplications() {
    const { currentDeejay, gigs } = this.props;

    const gigPendingApplications = gigs.filter(gig => {
      return (
        !gig.deejayId &&
        gig.deejayApplicants.indexOf(currentDeejay.id) !== -1 &&
        gig.declinedApps.indexOf(currentDeejay.id) === -1 &&
        gig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
        this.futureDateCheck(gig)
      )
    })

    return (
      gigPendingApplications.length
      ?
      <GigList currentDeejay={currentDeejay} gigs={gigPendingApplications} />
      :
      <h3>You Have Not Sent Any Booking Requests</h3>
    )
  }

  futureDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
  }
}

export default OutgoingApplications;
