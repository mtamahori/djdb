import React, { Component } from 'react'
import GigItem from './Gig-Item'
import { Grid } from 'semantic-ui-react'

// FOR DEEJAYS
// SEARCH/FILTER FOR BROWSING GIGS

class FilterGigs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
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
    const { openGigs, currentDeejay } = this.props;

    const renderGigsByMatch = openGigs.filter(gig => {
        let tags = gig.styleTags.join(',');
      return (
        gig.name.match(this.state.inputValue) ||
        gig.location.match(this.state.inputValue) ||
        tags.match(this.state.inputValue)
      )
    })

    return (
      <div className="gig-list-items">
        <form onChange={this.handleInput} >
          <input name="filter" type="text" placeholder="Search by Name / Location / Style" />
        </form>
        <br />
        <Grid
          className="gig-list"
          columns="equal"
          textAlign="center"
          relaxed
          stackable>
          {
            renderGigsByMatch.map(gig => (
              <GigItem gig={gig} key={gig.id} currentDeejay={currentDeejay} />
            ))
          }
        </Grid>
      </div>
    )
  }

  handleInput(event) {
    event.preventDefault();
    this.setState({ inputValue: event.target.value })
  }
}

export default FilterGigs
