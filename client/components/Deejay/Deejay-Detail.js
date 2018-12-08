import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDeejay } from '../../store'

// COMPONENT

class DeejayDetail extends Component {
  constructor(props) {
    super(props)

    this.handleUpdateDeejay = this.handleUpdateDeejay.bind(this)
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
    const { deejays, currentDeejay } = this.props
    return (
      <div>
        {
          deejays
            .filter(deejay => deejay.id === currentDeejay.id)
            .map(deejay => (
              <div key={deejay.id} >
                <h4>{deejay.name}</h4>
                <h4>{deejay.email}</h4>
                <h4>{deejay.phone}</h4>
              </div>
            ))
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
              <input name="name" type="text" required placeholder="Name" />
            </h4>
            <h4>
              <input name="email" type="text" required placeholder="Email" />
            </h4>
            <h4>
              <input name="phone" type="text" required placeholder="Phone #" />
            </h4>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    )
  }

  handleUpdateDeejay(event) {
    const { updateDeejay, currentDeejay } = this.props;
    const deejay = {
      id: currentDeejay.id,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    }
    updateDeejay(deejay);
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
  }
}

// CONTAINER

const mapState = ({ deejays }, ownProps ) => {
  const deejayParamId = Number(ownProps.match.params.id)
  return {
    deejays,
    currentDeejay: deejays.filter(deejay => deejay.id === deejayParamId)[0]
  }
};
const mapDispatch = { updateDeejay }

export default connect(mapState, mapDispatch)(DeejayDetail)
