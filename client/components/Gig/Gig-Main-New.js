import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { NewGigForm } from '../index'

class NewGig extends Component {
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
        >+ New Booking
        </Button>
        {
          this.state.view && this.renderNewGigForm()
        }
      </div>
    )
  }

  renderNewGigForm() {
    const { currentBooker } = this.props;
    return (
      <NewGigForm currentBooker={currentBooker} key={currentBooker.id} />
    )
  }
}

export default NewGig
