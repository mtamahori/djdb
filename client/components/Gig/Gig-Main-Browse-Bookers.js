import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import FilterBookers from '../index'

class BrowseBookerList extends Component {
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
        >Browse Bookers
        </Button>
        {
          this.state.view && this.renderBrowseBookers()
        }
      </div>
    )
  }

  renderBrowseBookers() {
    const { bookers, currentDeejay } = this.props
    return (
      <FilterBookers bookers={bookers} currentDeejay={currentDeejay} />
    )
  }
}

export default BrowseBookerList
