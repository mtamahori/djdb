import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import { CalendarMain, GigMain, GigInvites, GigPendingApplications, NewDeejayForm } from '../index'

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
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <GigInvites currentDeejay={currentDeejay} gigs={gigs} />
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

const mapState = ({ user, gigs, deejays, bookers }) => {
  return {
    user,
    gigs,
    deejays,
    bookers,
    currentDeejay: deejays.filter(deejay => deejay.userId === user.id)[0]
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayMain)
