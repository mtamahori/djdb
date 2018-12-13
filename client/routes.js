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
  BookerMain,
  BookerList,
  BookerDetail,
  DeejayList,
  DeejayDetail,
  GigList,
  GigDetail
} from './components'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/bookers" component={BookerMain} />
            <Route exact path="/bookers/list" component={BookerList} />
            <Route path="/bookers/:id" component={BookerDetail} />
            <Route exact path="/deejays" component={DeejayList} />
            <Route path="/deejays/:id" component={DeejayDetail} />
            <Route exact path="/gigs" component={GigList} />
            <Route path="/gigs/:id" component={GigDetail} />
            </Switch>
          )}
          <Route component={Landing} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
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
  isLoggedIn: PropTypes.bool.isRequired
}
