import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import DeejayList from '../index'
import dateFns from 'date-fns'

class BrowseDeejayList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: false
    }
  }

  render() {
    return (
      <h1>BrowseDeejayList</h1>
    )
  }
}

export default BrowseDeejayList
