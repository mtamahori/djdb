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
    const { gigs } = this.props

    const renderGigsByName = gigs.filter(gig => (gig.name.match(this.state.inputValue)))
    const renderGigsByLocation = gigs.filter(gig => (gig.location.match(this.state.inputValue)))
    // renderGigsByCompensation

    return (
      <div>
        <form onChange={this.handleInput} >
          <input name="filter" type="text" placeholder="Search" />
        </form>
          {
            renderGigsByName.map(gig => (
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
