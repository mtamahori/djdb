import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGig, fetchGig } from '../../store'
import history from '../../history'
import { Button, Form } from 'semantic-ui-react'

class NewGigForm extends Component {
  constructor(props) {
    super(props);

    this.handleCreateGig=this.handleCreateGig.bind(this);
  }

  render() {
    return (
      <div className="new-gig-form-container">
        <Form>

        </Form>
      </div>
    )
  }
}
