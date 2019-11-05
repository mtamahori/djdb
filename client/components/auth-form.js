import React from 'react'
import { connect } from 'react-redux'
import PropTypes from  'prop-types'
import { auth } from '../store'
import { Form, Button, Message } from 'semantic-ui-react'
require('../../public/stylesheets/authForm.css')

const AuthForm = ({ name, displayName, handleSubmit, error }) => {
  return (
    <div className="auth-form-container">
      <Form onSubmit={handleSubmit} name={name} success>
        <h4>Username</h4>
        <Form.Input fluid name="username" placeholder="Username" />
        <h4>Password</h4>
        <Form.Input fluid name="password" placeholder="Password" />
        <br />
        <Form.Button type="submit">{displayName}</Form.Button>
        {
          error && error.response &&
          <Message
            negative
            header="Oops!"
            content={error.response.data}
            />
        }
      </Form>
      <br />
          <Button href="/auth/soundcloud">
            Use Soundcloud Credentials
          </Button>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      event.preventDefault()
      const formName = event.target.name
      const username = event.target.username.value
      const password = event.target.password.value
      dispatch(auth(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
