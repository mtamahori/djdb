import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

class DeejayDetailBrowse extends Component {
  constructor (props) {
    super(props)
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
        </div>
      )
    }
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

