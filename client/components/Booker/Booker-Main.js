import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Grid, Button } from 'semantic-ui-react'
import CalendarMain from '../Calendar/Calendar-Main'
import { BookerDetail, GigMain, GigApplications, GigPendingInvites, NewBookerForm, MainInbox } from '../index'


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
