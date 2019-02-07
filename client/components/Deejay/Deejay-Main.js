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
          <NavLink activeClassName="active" to="/deejay/new">
            <Button size="massive">Create Deejay Profile</Button>
          </NavLink>
          :
          <div>

            <DeejayDetail currentDeejay={currentDeejay} />
            <CalendarMain currentDeejay={currentDeejay} />
            <GigMain currentDeejay={currentDeejay} />

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
