import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import DeejayDetail from './Deejay-Detail'
import CalendarMain from '../Calendar/Calendar-Main'
import GigMain from '../Gig/Gig-Main'

class DeejayMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentDeejay } = this.props;
    return (
      <div>
        <h3>Deejay Main Portal</h3>
        {
          currentDeejay === undefined
          ?
          <NavLink activeClassName="active" to="/deejays/new">
            <Button size="massive">Create Deejay Profile</Button>
          </NavLink>
          :
          <div>

            <DeejayDetail currentDeejay={currentDeejay} />
            <CalendarMain currentDeejay={currentDeejay} />

          {/*<GigMain currentDeejay={currentDeejay} />

              GigMain needs to be able to render its gigs based on the user's current status as a booker or deejay. Basically need a field on global state that indicates whether you are in either mode. Relying on the press of a button would be bad; rather, whenver a user hits a route that is either booker or deejay,then the state field is set. Read up more on CONTEXT and PORTALS and consider using those as ways to handle this piece of state, which is pretty essential to the central functionality of the app.*/}

          </div>
        }
      </div>
    )
  }
}

const mapState = ({ user, deejays }) => {
  return {
    user,
    deejays,
    currentDeejay: deejays.filter(deejay => deejay.userId === user.id)[0]
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayMain)
