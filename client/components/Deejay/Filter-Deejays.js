import React, { Component } from 'react'
import DeejayItem from './Deejay-Item'
require('../../../public/stylesheets/deejayList.css')

// FOR BOOKERS
// SEARCH/FILTER COMPONENT FOR BROWSING DEEJAYS

class FilterDeejays extends Component {
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
    const { deejays, currentBooker } = this.props;

    const renderDeejaysByMatch = deejays.filter(deejay => {
      let tags = deejay.styleTags.join(',');
      return (
        deejay.name.match(this.state.inputValue) ||
        tags.match(this.state.inputValue)
      )
    })

    return (
      <div className="deejay-list-items">
        <form onChange={this.handleInput} >
          <input name="filter" type="text" placeholder="Search by Name / Style" />
        </form>
          {
            renderDeejaysByMatch.map(deejay => (
              <DeejayItem deejay={deejay} key={deejay.id} currentBooker={currentBooker} />
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

export default FilterDeejays;
