import React from 'react'
import GigItem from './Gig-Item'

const GigList = (props) => {
  const { gigs } = props;
    return (
      <div>
        {
          gigs.map(gig => (
            <GigItem gig={gig} key={gig.id} />
          ))
        }
      </div>
    )
}

export default GigList;
