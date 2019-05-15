import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { GigList } from '../index'
import dateFns from 'date-fns'

class PastGigList extends Component {
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
          onClick={() => {
            this.state.view === false ?
            this.setState({ view: true }) :
            this.setState({ view: false })
          }}
          size="massive"
        >Past Bookings
        </Button>
        {
          this.state.view && this.renderPastGigList()
        }
      </div>
    )
  }

  renderPastGigList() {
    const { currentBooker, currentDeejay, gigs } = this.props;
    let pastGigs;

    if (currentBooker) {
      pastGigs = gigs.filter(gig => {
        return (
          gig.bookerId === currentBooker.id &&
          this.pastDateCheck(gig)
        )
      })
      return (
        pastGigs.length ?
        <GigList currentBooker={currentBooker} gigs={pastGigs} /> :
        <h3>You Have No Past Gigs Yet</h3>
      )
    }

    else if (currentDeejay) {
      pastGigs = gigs.filter(gig => {
        return (
          gig.deejayId === currentDeejay.id &&
          this.pastDateCheck(gig)
        )
      })
      return (
        pastGigs.length ?
        <GigList currentDeejay={currentDeejay } gigs={pastGigs} /> :
        <h3>You Have No Past Gigs Yet</h3>
      )
    }
  }

  pastDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
  }
}

export default PastGigList
