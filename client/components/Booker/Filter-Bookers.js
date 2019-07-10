import React, { Component } from 'react'
import BookerItem from './Booker-Item'
require('../../../public/stylesheets/bookerList.css')

// FOR DEEJAYS
// SEARCH/FILTER COMPONENT FOR BROWSING BOOKERS

class FilterBookers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.handleInput = this.handleInput.bind(this)
  }

  render() {
    return (
      <div>
        {this.renderTextMatch()}
      </div>
    )
  }

  renderTextMatch() {
    const { bookers, currentDeejay } = this.props;

    const renderBookersByMatch = bookers.filter(booker => {
      return (
        booker.name.match(this.state.inputValue)
      )
    })

    return (
      <div className="booker-list-items">
        <form onChange={this.handleInput} >
          <input name="filter" type="text" placeholder="Search by Name" />
        </form>
          {
            renderBookersByMatch.map(booker => (
              <BookerItem booker={booker} key={booker.id} currentDeejay={currentDeejay} />
            ))
          }
      </div>
    )
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({ inputValue: event.target.value })
  }
}

export default FilterBookers;
