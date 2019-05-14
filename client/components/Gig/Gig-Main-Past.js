import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import GigList from './Gig-List'
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
      <h1>PastGigList</h1>
    )
  }
}

export default PastGigList
