import React from 'react'
import GigItem from './Gig-Item'

const GigList = (props) => {

  const { gigs, currentBooker, currentDeejay } = props;

  if (currentBooker) {
    return (
      <div>
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
      <div>
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
