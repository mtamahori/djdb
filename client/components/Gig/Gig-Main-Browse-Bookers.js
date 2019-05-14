import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import BookerList from '../index'
import dateFns from 'date-fns'

class BrowseBookerList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: false
    }
  }

  render() {
    return (
      <h1>BrowseBookerList</h1>
    )
  }
}

export default BrowseBookerList
