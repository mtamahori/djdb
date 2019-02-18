import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import GigList from '../Gig/Gig-List'
import dateFns from 'date-fns'

class GigPendingInvites extends Component {
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
        this.renderGigPendingInvites()
        }
      </div>
    )
  }

  renderGigPendingInvites() {
    const { currentBooker, gigs } = this.props;

    const gigPendingInvites = gigs.filter(gig => {
      return (
        gig.deejayId === null &&
        gig.bookerId === currentBooker.id &&
        gig.deejayInvites.length &&
        this.futureDateCheck(gig)
      )
    })

    return (
      gigPendingInvites.length
      ?
      <GigList currentBooker={currentBooker} gigs={gigPendingInvites} />
      :
      <h3>You Have No Outgoing Pending Booking Requests Right Now</h3>
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

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(GigPendingInvites)
