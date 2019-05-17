import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authMixcloud } from '../store'
import { Form } from 'semantic-ui-react'
require('../../public/stylesheets/authForm.css')

class AuthMixcloud extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render() {
    const { name, displayName, error } = this.props
    return (
      <div className="auth-form-container">
      <h3>Use Your Mixcloud Credentials</h3>
        <Form onSubmit={this.handleSubmit} name={name} success>
          <h4>Email</h4>
          <Form.Input fluid name="email" placeholder="Email" />
          <h4>Password</h4>
          <Form.Input fluid name="password" placeholder="Password" />
          <br />
          <Form.Button href="/auth/mixcloud" type="submit">{displayName}</Form.Button>
          {
            error && error.response &&
            <div>
              {error.response.data}
            </div>
          }
        </Form>
      </div>
    )
  }

  handleSubmit(event) {
    event.preventDefault();
    // const { authMixcloud } = this.props;
    // const formName = event.target.name;
    // const email = event.target.email;
    // const password = event.target.password;
    // authMixcloud(email, password, formName )
  }
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
    displayName: 'Signup',
    error: state.user.error
  }
}

const mapDispatch = ({ authMixcloud });

export const MixcloudLogin = connect(mapLogin, mapDispatch)(AuthMixcloud)
export const MixcloudSignup = connect(mapSignup, mapDispatch)(AuthMixcloud)
