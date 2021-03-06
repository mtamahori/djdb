import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { me, fetchBookers, fetchDeejays, fetchGigs, fetchChannels, fetchMessages } from './store'
import {
  Landing,
  Login,
  Signup,
  UserHome,
  UserProfile,
  BookerMain,
  BookerDetailBrowse,
  DeejayMain,
  DeejayDetailBrowse,
  GigDetail,
  MainInbox,
  ChannelDetail,
} from './components'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          {isLoggedIn && (
            <Switch>
              <Route exact path="/home" component={UserHome} />

              <Route exact path="/user" component={UserProfile} />
              <Route exact path="/deejay" component={DeejayMain} />
              <Route exact path="/booker" component={BookerMain} />

              <Route exact path="/bookers/:id" component={BookerDetailBrowse} />
              <Route exact path="/deejays/:id" component={DeejayDetailBrowse} />
              <Route exact path="/gigs/:id" component={GigDetail} />

              <Route exact path="/inbox" component={MainInbox} />
              <Route exact path="/inbox/booker/channels/:id" component={ChannelDetail} />
              <Route exact path="/inbox/deejay/channels/:id" component={ChannelDetail} />

            </Switch>
          )}
          <Route exact path="/" component={Landing} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchBookers())
      dispatch(fetchDeejays())
      dispatch(fetchGigs())
      dispatch(fetchChannels())
      dispatch(fetchMessages())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
