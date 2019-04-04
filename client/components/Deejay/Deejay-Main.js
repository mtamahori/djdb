import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'
import DeejayDetail from './Deejay-Detail'
import CalendarMain from '../Calendar/Calendar-Main'
import GigMain from '../Gig/Gig-Main'
import GigInvites from './Gig-Invites'
import GigPendingApplications from './Gig-Pending-Applications'
import NewDeejayForm from './New-Deejay-Form'

class DeejayMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentDeejay, gigs } = this.props;
    return (
      <div>
        {
          currentDeejay === undefined
          ?
          <NewDeejayForm />
          :
          <div>
            <CalendarMain currentDeejay={currentDeejay} />
            <Grid>
              <Grid.Row columns={1} textAlign="center">
                <Grid.Column>
                  <DeejayDetail currentDeejay={currentDeejay} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3} textAlign="center">
                <Grid.Column>
                  <GigInvites currentDeejay={currentDeejay} gigs={gigs} />
                </Grid.Column>
                <Grid.Column>
                <NavLink
                  activeClassName="active"
                  to={{
                    pathname: '/deejay/messages',
                    state: {
                      currentDeejay: currentDeejay
                    }
                  }}>
                  <Button size="massive" >Messages</Button>
                </NavLink>
                </Grid.Column>
                <Grid.Column>
                  <GigPendingApplications currentDeejay={currentDeejay} gigs={gigs} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <GigMain currentDeejay={currentDeejay} />
          </div>
        }
      </div>
    )
  }
}

const mapState = ({ user, gigs, deejays }) => {
  return {
    user,
    gigs,
    deejays,
    currentDeejay: deejays.filter(deejay => deejay.userId === user.id)[0]
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayMain)
