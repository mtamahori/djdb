import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { GigList } from '../index'
import dateFns from 'date-fns'

class UpcomingGigList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: false
    }
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => this.setState(state => ({
            view: !state.view
          }))}
          size="massive"
        >Upcoming Bookings
        </Button>
        {
          this.state.view && this.renderUpcomingGigList()
        }
      </div>
    )
  }

  renderUpcomingGigList() {
    const { gigs, currentBooker, currentDeejay } = this.props;
    let upcomingGigs;

    if (currentBooker) {
      upcomingGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          gig.deejayId !== null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        upcomingGigs.length ?
        <GigList currentBooker={currentBooker} gigs={upcomingGigs} /> :
        <h3>You Have No Upcoming Bookings Right Now</h3>
      )
    }

    else if (currentDeejay) {
      upcomingGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          gig.bookerId !== null &&
          this.futureDateCheck(gig)
        )
      })
      return (
        upcomingGigs.length ?
        <GigList currentDeejay={currentDeejay} gigs={upcomingGigs} /> :
        <h3>You Have No Upcoming Bookings Right Now</h3>
      )
    }
  }

  futureDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
  }
}

export default UpcomingGigList
