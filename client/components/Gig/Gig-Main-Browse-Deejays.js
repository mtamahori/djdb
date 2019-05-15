import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { FilterDeejays } from '../index'

class BrowseDeejayList extends Component {
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
        >Browse Deejays
        </Button>
        {
          this.state.view && this.renderBrowseDeejays()
        }
      </div>
    )
  }

  renderBrowseDeejays() {
    const { deejays, currentBooker } = this.props
    return (
      <FilterDeejays deejays={deejays} currentBooker={currentBooker} />
    )
  }
}

export default BrowseDeejayList
