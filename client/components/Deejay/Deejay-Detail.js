import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteDeejay, updateDeejay } from '../../store'
import { List } from 'semantic-ui-react'

// COMPONENT

class DeejayDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateDeejay = this.handleUpdateDeejay.bind(this);
    this.handleDeleteDeejay = this.handleDeleteDeejay.bind(this);
  }

  render() {
      return (
        <div>
          <div>{this.renderCurrentDeejay()}</div>
          <div>{this.renderUpdateDeejay()}</div>
        </div>
      )
    }

  renderCurrentDeejay() {
    const { currentDeejay } = this.props

    if (!currentDeejay) {
      return <div>Loading!</div>
    }

    else if (currentDeejay) {
      return (
        <div>
        <h3>Your Deejay Profile</h3>
          {
            <List key={currentDeejay.id} >
              <List.Item icon='users' content={currentDeejay.name} />
              <List.Item icon='marker' content='Chicago, IL' />
              <List.Item icon='mail' content={currentDeejay.email} />
              <List.Item icon='phone' content={currentDeejay.phone} />
              <button onClick={this.handleDeleteDeejay} type="button" >
                Delete Deejay
              </button>
            </List>
          }
        </div>
      )
    }
  }

  renderUpdateDeejay() {
    return (
      <div>
        <form onSubmit={this.handleUpdateDeejay} >
          <div>
            <h3>Update Deejay Details</h3>
            <h4>
              Name <br />
              <input name="name" type="text" placeholder="" />
            </h4>
            <h4>
              Email <br />
              <input name="email" type="text" placeholder="" />
            </h4>
            <h4>
              Phone # <br />
              <input name="phone1" type="text" maxLength="3" placeholder="" />
              <input name="phone2" type="text" maxLength="3" placeholder="" />
              <input name="phone3" type="text" maxLength="4" placeholder="" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    )
  }

  handleDeleteDeejay(event) {
    event.stopPropagation();
    const { deleteDeejay, deejay } = this.props;
    deleteDeejay(deejay);
  }

  handleUpdateDeejay(event) {
    event.preventDefault();
    const { updateDeejay, currentDeejay } = this.props;

    let phoneInput = event.target.phone1.value + event.target.phone2.value + event.target.phone3.value;

    if (
      event.target.name.value === '' &&
      event.target.email.value === '' &&
      phoneInput === ''
    ) {
      alert("Please fill out at least one field");
    } else {
      const deejay = {
        id: currentDeejay.id,
        name: event.target.name.value || currentDeejay.name,
        email: event.target.email.value || currentDeejay.email,
        phone: phoneInput || currentDeejay.phone
      }
      updateDeejay(deejay);
      event.target.name.value = '';
      event.target.email.value = '';
      event.target.phone1.value = '';
      event.target.phone2.value = '';
      event.target.phone3.value = '';
    }
  }
}

const mapState = ({ user, deejays }) => ({ user, deejays })
const mapDispatch = { deleteDeejay, updateDeejay }

export default connect(mapState, mapDispatch)(DeejayDetail)
