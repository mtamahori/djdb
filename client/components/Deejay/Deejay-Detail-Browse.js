import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'semantic-ui-react'

class DeejayDetailBrowse extends Component {
  constructor (props) {
    super(props)

    this.handleBookingInvite = this.handleBookingInvite.bind(this);
  }

  render() {
    const { currentDeejayBrowse } = this.props

    if (!currentDeejayBrowse) {
      return <div>Loading!</div>
    }

    else if (currentDeejayBrowse) {
      return (
        <div>
        <h3>Deejay Details</h3>
          {
            <List key={currentDeejayBrowse.id} >
              <List.Item icon='users' content={currentDeejayBrowse.name} />
              <List.Item icon='marker' content='Chicago, IL' />
              <List.Item icon='mail' content={currentDeejayBrowse.email} />
              <List.Item icon='phone' content={currentDeejayBrowse.phone} />
            </List>
          }
          <Button
            size='massive'
            onClick={this.handleBookingInvite()}>
            Send Booking Request
          </Button>
        </div>
      )
    }
  }

  handleBookingInvite(event) {
    event.preventDefault();
    const gig = {}
  }
}

const mapState = ({ user, deejays }, ownProps) => {
  const deejayParamId = Number(ownProps.match.params.id)
  return {
    user,
    deejays,
    currentDeejayBrowse: deejays.filter(deejay => deejay.id === deejayParamId)[0]
  }
}
const mapDispatch = null;

export default connect(mapState, mapDispatch)(DeejayDetailBrowse)

