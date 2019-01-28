import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDeejay } from '../../store'
import { List } from 'semantic-ui-react'

// COMPONENT

class DeejayDetail extends Component {
  constructor(props) {
    super(props);

    this.handleUpdateDeejay = this.handleUpdateDeejay.bind(this);
  }

  render() {
    return (
      <div>
        <div>{this.renderCurrentDeejay()}</div>
        <div>{this.renderUpdateDeejay()}</div>
      </div>
    );
  }

  renderCurrentDeejay() {
    const { currentDeejay } = this.props
    return (
      <div>
      <h3>Deejay Details</h3>
        {
          <List key={currentDeejay.id} >
            <List.Item icon='users' content={currentDeejay.name} />
            <List.Item icon='marker' content='Chicago, IL' />
            <List.Item icon='mail' content={currentDeejay.email} />
            <List.Item icon='phone' content={currentDeejay.phone} />
          </List>
        }
      </div>
    )
  }

  renderUpdateDeejay() {
    return (
      <div>
        <form onSubmit={this.handleUpdateDeejay} >
          <div>
            <h3>Update Deejay Details</h3>
            <h4>
              <input name="name" type="text" placeholder="Name" />
            </h4>
            <h4>
              <input name="email" type="text" placeholder="Email" />
            </h4>
            <h4>
              <input name="phone" type="text" placeholder="Phone #" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    )
  }

  handleUpdateDeejay(event) {
    event.preventDefault();
    const { updateDeejay, currentDeejay } = this.props;

    if (
      event.target.name.value === '' &&
      event.target.email.value === '' &&
      event.target.phone.value === ''
    ) {
      alert("Please fill out at least one field");
    } else {
      const deejay = {
        id: currentDeejay.id,
        name: event.target.name.value || currentDeejay.name,
        email: event.target.email.value || currentDeejay.email,
        phone: event.target.phone.value || currentDeejay.phone
      }
      updateDeejay(deejay);
      event.target.name.value = '';
      event.target.email.value = '';
      event.target.phone.value = '';
    }
  }
}

const mapState = ({ user, deejays }) => ({ user, deejays })
const mapDispatch = { updateDeejay }

export default connect(mapState, mapDispatch)(DeejayDetail)
