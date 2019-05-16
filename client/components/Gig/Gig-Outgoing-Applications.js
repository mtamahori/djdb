import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import GigList from './Gig-List'
import dateFns from 'date-fns'

// FOR BOOKERS
// VIEWING INCOMING BOOKING REQUESTS FROM DEEJAYS

class GigApplications extends Component {
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
          Incoming Booking Requests
        </Button>
        {
        this.state.view &&
        this.renderGigApplications()
        }
      </div>
    )
  }

  renderGigApplications() {
    const { currentBooker, gigs } = this.props;

    const gigApplications = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        gig.bookerId === currentBooker.id &&
        gig.deejayApplicants.length &&
        this.futureDateCheck(gig)
      )
    })

    return (
      gigApplications.length
      ?
      <GigList currentBooker={currentBooker} gigs={gigApplications} />
      :
      <h3>You Have No Booking Requests Right Now</h3>
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

export default GigApplications
