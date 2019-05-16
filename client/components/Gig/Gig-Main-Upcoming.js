import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCalendarGigs } from '../../store'
import { Button } from 'semantic-ui-react'
import { GigList } from '../index'
import dateFns from 'date-fns'

class UpcomingGigList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
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
      upcomingGigs = this.getBookerUpcomingGigs(currentBooker, gigs)
      return (
        upcomingGigs.length ?
        <GigList currentBooker={currentBooker} gigs={upcomingGigs} /> :
        <h3>You Have No Upcoming Bookings Right Now</h3>
      )
    }

    else if (currentDeejay) {
      upcomingGigs = this.getDeejayUpcomingGigs(currentDeejay, gigs)
      return (
        upcomingGigs.length ?
        <GigList currentDeejay={currentDeejay} gigs={upcomingGigs} /> :
        <h3>You Have No Upcoming Bookings Right Now</h3>
      )
    }
  }

  handleClick(event) {
    const { currentBooker, currentDeejay, gigs, setCalendarGigs } = this.props;
    let upcomingGigs;

    event.preventDefault();
    this.setState(state => ({
      view: !state.view
    }))

    if (currentBooker) {
      upcomingGigs = this.getBookerUpcomingGigs(currentBooker, gigs)
      return (
        upcomingGigs.length &&
        this.state.view === false &&
        setCalendarGigs(upcomingGigs)
      )
    }

    else if (currentDeejay) {
      upcomingGigs = this.getDeejayUpcomingGigs(currentDeejay, gigs)
      return (
        upcomingGigs.length &&
        this.state.view === false &&
        setCalendarGigs(upcomingGigs)
      )
    }
  }

  getBookerUpcomingGigs(currentBooker, gigs) {
    return gigs.filter(gig => {
      return (
        gig.bookerId === currentBooker.id &&
        gig.deejayId !== null &&
        this.futureDateCheck(gig)
      )
    })
  }

  getDeejayUpcomingGigs(currentDeejay, gigs) {
    return gigs.filter(gig => {
      return (
        gig.deejayId === currentDeejay.id &&
        gig.bookerId !== null &&
        this.futureDateCheck(gig)
      )
    })
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
const mapDispatch = ({ setCalendarGigs });

export default connect(mapState, mapDispatch)(UpcomingGigList)
