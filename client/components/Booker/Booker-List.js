import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BookerListItem from './Booker-List-Item'

// COMPONENT

class BookerList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { bookers } = this.props;
    return (
      <div>
         <h3>Booker List</h3>
        {
          bookers
            .map(booker => (
              <BookerListItem booker={booker} key={booker.id} />
            ))
        }
      </div>
    )
  }
}

// CONTAINER

const mapState = ({ bookers }) => ({ bookers });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(BookerList)
