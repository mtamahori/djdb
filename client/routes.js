import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { me, fetchBookers, fetchDeejays, fetchGigs } from './store'
import {
  Landing,
  Login,
  Signup,
  UserHome,
  UserProfile,
  BookerMain,
  BookerList,
  BookerDetail,
  NewBookerForm,
  DeejayMain,
  DeejayList,
  DeejayDetail,
  NewDeejayForm,
  GigList,
  GigDetail
} from './components'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn, isBooker, isDeejay } = this.props

    return (
      <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/user" component={UserProfile} />
            <Route exact path="/bookers" component={BookerMain} />
            {!isBooker && (
              <Route exact path="/bookers/new" component={NewBookerForm} />
            )}
            <Route exact path="/bookers/list" component={BookerList} />
            <Route exact path="/bookers/:id" component={BookerDetail} />
            <Route exact path="/deejays" component={DeejayMain} />
            {!isDeejay && (
              <Route exact path="/deejays/new" component={NewDeejayForm} />
            )}
            <Route exact path="/deejays/list" component={DeejayList} />
            <Route exact path="/deejays/:id" component={DeejayDetail} />
            <Route exact path="/gigs/:id" component={GigDetail} />
            </Switch>
          )}
          <Route component={Landing} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isBooker: !!state.bookers.filter(booker => booker.userId === state.user.id)[0],
    isDeejay: !!state.deejays.filter(deejay => deejay.userId === state.user.id)[0]
  }
}

// Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchBookers())
      dispatch(fetchDeejays())
      dispatch(fetchGigs())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isBooker: PropTypes.bool.isRequired
}
