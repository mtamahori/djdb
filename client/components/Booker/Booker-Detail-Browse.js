import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
require('../../../public/stylesheets/profile.css')

class BookerDetailBrowse extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentBookerBrowse } = this.props;

    if (!currentBookerBrowse) {
      return <div>Loading!</div>
    }

    else if (currentBookerBrowse) {
      return (
        <div className="booker-profile-detail">
          <h3>Booker Details</h3>
          {
            <List key={currentBookerBrowse.id}>
              <List.Item icon="users" content={currentBookerBrowse.name} />
              <List.Item icon="marker" content="Chicago, IL" />
              <List.Item icon="mail" content={currentBookerBrowse.email} />
              <List.Item icon="phone" content={currentBookerBrowse.phone} />
            </List>
          }
        </div>
      )
    }
  }
}

const mapState = ({ user, bookers }, ownProps) => {
  const bookerParamId = Number(ownProps.match.params.id)
  return {
    user,
    bookers,
    currentBookerBrowse: bookers.filter(booker => booker.id === bookerParamId)[0]
  }
}

const mapDispatch = null;

export default connect(
  mapState,
  mapDispatch
)(BookerDetailBrowse);
