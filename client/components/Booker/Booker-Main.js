import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import BookerDetail from './Booker-Detail'
import CalendarMain from '../Calendar/Calendar-Main'
import GigMain from '../Gig/Gig-Main'
import GigApplications from './Gig-Applications'
import GigPendingInvites from './Gig-Pending-Invites'
import NewBookerForm from './New-Booker-Form'


class BookerMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentBooker, gigs } = this.props;
    return (
      <div>
        {
          currentBooker === undefined
          ?
          <NewBookerForm />
          :
          <div>
            <CalendarMain currentBooker={currentBooker} />
            <Grid>
              <Grid.Row columns={1} textAlign="center">
                <Grid.Column>
                  <BookerDetail currentBooker={currentBooker} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2} textAlign="center">
                <Grid.Column>
                  <GigApplications gigs={gigs} currentBooker={currentBooker} />
                </Grid.Column>
                <Grid.Column>
                  <GigPendingInvites gigs={gigs} currentBooker={currentBooker} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <GigMain currentBooker={currentBooker} />
          </div>
        }
      </div>
    )
  }
}

const mapState = ({ user, bookers, gigs }) => {
  return {
    user,
    gigs,
    bookers,
    currentBooker: bookers.filter(booker => booker.userId === user.id)[0]
  }
};
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BookerMain)
