import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateGig } from '../../store'

// COMPONENT

class GigDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateGig = this.handleUpdateGig.bind(this)
  }

  render() {
    return (
      <div>
        <div>{this.renderCurrentGig()}</div>
        <div>{this.renderUpdateGig()}</div>
      </div>
    )
  }

  renderCurrentGig() {
    const { gigs, currentGig } = this.props
    return (
      <div>
        {
          gigs
            .filter(gig => gig.id === currentGig.id)
            .map(gig => (
              <div key={gig.id}>
                <h4>{gig.name}</h4>
                <h4>{gig.date}</h4>
                <h4>{gig.time}</h4>
                <h4>{gig.location}</h4>
                <h4>{gig.compensation}</h4>
              </div>
            ))
        }
      </div>
    )
  }

  renderUpdateGig() {
    return (
      <div>
        <form onSubmit={this.handleUpdateGig} >
          <div>
            <h3>Update Gig Details</h3>
            <h4>
              <input name="name" type="text" required placeholder="Name" />
            </h4>
            <h4>
              <input name="date" type="text" required placeholder="Date" />
            </h4>
            <h4>
              <input name="time" type="text" required placeholder="Time" />
            </h4>
            <h4>
              <input name="location" type="text" required placeholder="Location" />
            </h4>
            <h4>
              <input name="compensation" type="text" required placeholder="Compensation" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    )
  }

  handleUpdateGig(event) {
    event.preventDefault();
    const { updateGig, currentGig } = this.props;
    const gig = {
      id: currentGig.id,
      name: event.target.name.value,
      date: event.target.date.value,
      time: event.target.time.value,
      location: event.target.location.value,
      compensation: event.target.compensation.value
    }
    updateGig(gig);
    event.target.name.value = '';
    event.target.date.value = '';
    event.target.time.value = '';
    event.target.location.value = '';
    event.target.compensation.value = '';
  }

}

// CONTAINER

const mapState = ({ gigs }, ownProps) => {
  const gigParamId = Number(ownProps.match.params.id)
  return {
    gigs,
    currentGig: gigs.filter(gig => gig.id === gigParamId)[0]
  }
}
const mapDispatch = ({ updateGig })

export default connect(mapState, mapDispatch)(GigDetail)
