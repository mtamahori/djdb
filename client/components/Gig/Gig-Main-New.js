import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

class NewGig extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: false
    }
  }

  render() {
    return (
      <h1>NewGig</h1>
    )
  }
}

export default NewGig
