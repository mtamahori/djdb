import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { NewDeejayForm, CalendarMain, GigInvites, GigPendingApplications, PastGigList, UpcomingGigList, BrowseGigList, BrowseBookerList } from '../index'

class DeejayMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentDeejay, gigs, bookers } = this.props;
    return (
      <div>
        {
          currentDeejay === undefined ?
          <NewDeejayForm /> :

          <div>
            <CalendarMain currentDeejay={currentDeejay} />

            <Grid>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <GigInvites gigs={gigs} currentDeejay={currentDeejay} />
                </Grid.Column>
                <Grid.Column>
                  <GigPendingApplications gigs={gigs} currentDeejay={currentDeejay} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1} textAlign="center">
                <Grid.Column>
                  <BrowseGigList gigs={gigs} currentDeejay={currentDeejay} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <PastGigList gigs={gigs} currentDeejay={currentDeejay} />
                </Grid.Column>
                <Grid.Column>
                  <UpcomingGigList gigs={gigs} currentDeejay={currentDeejay} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={1} textAlign="center">
                <Grid.Column>
                  <BrowseBookerList bookers={bookers} currentDeejay={currentDeejay} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
