import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import GigList from './Gig-List'
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
      <h1>UpcomingGigList</h1>
    )
  }
}

export default UpcomingGigList
