import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { FilterDeejays } from '../index'

// FOR BOOKERS
// BROWSE DEEJAYS USING SEARCH/FILTER
// RENDERED IN BookerMain

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
          onClick={() => this.setState(state => ({
            view: !state.view
          }))}
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
