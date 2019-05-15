import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { GigList } from '../index'
import dateFns from 'date-fns'

class OpenGigList extends Component {
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
        >Open Bookings
        </Button>
        {
          this.state.view && this.renderOpenGigList()
        }
      </div>
    )
  }

  renderOpenGigList() {
    const { currentBooker, gigs } = this.props;
    let openGigs;

    openGigs = gigs.filter(gig => {
      return (
        gig.bookerId === currentBooker.id &&
        gig.deejayId === null &&
        this.futureDateCheck(gig)
      )
    })

    return (
      openGigs.length ?
      <GigList currentBooker={currentBooker} gigs={openGigs} /> :
      <h3>You Have No Open Bookings Right Now</h3>
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

export default OpenGigList
