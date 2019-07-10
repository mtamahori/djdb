import React from 'react'
import GigItem from './Gig-Item'
require('../../../public/stylesheets/gigList.css')

// LIST OF GIG CARDS

const GigList = props => {

  const { gigs, currentBooker, currentDeejay } = props;

  if (currentBooker) {
    return (
      <div className="gig-list-items">
        {
          gigs.map(gig => (
            <GigItem gig={gig} key={gig.id} currentBooker={currentBooker} />
          ))
        }
      </div>
    )
  }

  else if (currentDeejay) {
    return (
      <div className="gig-list-items">
        {
          gigs.map(gig => (
            <GigItem gig={gig} key={gig.id} currentDeejay={currentDeejay} />
          ))
        }
      </div>
    )
  }
}

export default GigList;
