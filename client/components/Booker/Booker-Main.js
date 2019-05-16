import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { NewBookerForm, CalendarMain, GigApplications, GigPendingInvites, PastGigList, UpcomingGigList, OpenGigList, NewGig, BrowseDeejayList } from '../index'


class BookerMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentBooker, gigs, deejays } = this.props;
    return (
      <div>
        {
          currentBooker === undefined ?
          <NewBookerForm /> :

          <div>
            <CalendarMain currentBooker={currentBooker} />

            <br />
            <br />

            <Grid>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <GigApplications gigs={gigs} currentBooker={currentBooker} />
                </Grid.Column>
                <Grid.Column>
                  <GigPendingInvites gigs={gigs} currentBooker={currentBooker} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={3} textAlign="center">
                <Grid.Column>
                  <NewGig currentBooker={currentBooker} />
                </Grid.Column>
                <Grid.Column>
                  <BrowseDeejayList deejays={deejays} currentBooker={currentBooker} />
                </Grid.Column>
                <Grid.Column>
                  <OpenGigList gigs={gigs} currentBooker={currentBooker} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <PastGigList gigs={gigs} currentBooker={currentBooker} />
                </Grid.Column>
                <Grid.Column>
                  <UpcomingGigList gigs={gigs} currentBooker={currentBooker} />
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </div>
        }
      </div>
    )
  }
}

const mapState = ({ user, bookers, deejays, gigs }) => {
  return {
    user,
    gigs,
    bookers,
    deejays,
    currentBooker: bookers.filter(booker => booker.userId === user.id)[0]
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BookerMain)
