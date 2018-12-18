import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGig } from '../../store'

class NewGigForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateGig = this.handleCreateGig.bind(this)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateGig} >
          <div>
            <h3>Create New Gig</h3>
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

  handleCreateGig(event) {
    event.preventDefault();
    const { createGig, currentBooker } = this.props
    const newGig = {
      bookerId: currentBooker.id,
      name: event.target.name.value,
      date: event.target.date.value,
      time: event.target.time.value,
      location: event.target.location.value,
      compensation: event.target.compensation.value
    }
    createGig(newGig);
    event.target.name.value = '';
    event.target.date.value = '';
    event.target.time.value = '';
    event.target.location.value = '';
    event.target.compensation.value = '';
  }

}

const mapState = ({ gigs }) => ({ gigs })
const mapDispatch = ({ createGig })

export default connect(mapState, mapDispatch)(NewGigForm)
