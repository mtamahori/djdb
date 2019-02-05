import React, { Component } from 'react'
import { connect } from 'react-redux'
import GigItem from './Gig-Item'

class FilterGigs extends Component {
  constructor(props) {
    super(props);

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
    const { gigs } = this.props

    const renderGigsByMatch = gigs.filter(gig => {
      return (
        gig.name.match(this.state.inputValue) ||
        gig.location.match(this.state.inputValue)
      )
    })

    return (
      <div>
        <form onChange={this.handleInput} >
          <input name="filter" type="text" placeholder="Search" />
        </form>
          {
            renderGigsByMatch.map(gig => (
              <GigItem gig={gig} key={gig.id} />
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

const mapState = null;
const mapDispatch= null;

export default connect(mapState, mapDispatch)(FilterGigs)
