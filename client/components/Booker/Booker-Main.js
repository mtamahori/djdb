import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import BookerDetail from './Booker-Detail'

class BookerMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentBooker } = this.props;
    return (
      <div>
        <h3>Booker Main Portal</h3>
        {
          currentBooker === undefined
          ?
          <NavLink activeClassName="active" to="/bookers/new">
            <Button size="massive">Create Booker Profile</Button>
          </NavLink>
          :
          <BookerDetail key={currentBooker.id} />
        }
      </div>
    )
  }
}

const mapState = ({ user, bookers }) => {
  return {
    user,
    bookers,
    currentBooker: bookers.filter(booker => booker.userId === user.id)[0]
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BookerMain)
