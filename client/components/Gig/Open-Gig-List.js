import React from 'react'
import GigItem from './Gig-Item'

const OpenGigList = (props) => {
    const { gigs } = props;
    return (
      <div>
        <h3>Open Gig List</h3>
        {
          gigs.map(gig => (
            <GigItem gig={gig} key={gig.id} />
          ))
        }
      </div>
    )
}

export default OpenGigList;
