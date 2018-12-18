
import React from 'react'
import GigItem from './Gig-Item'

const BrowseGigList = (props) => {
    const { gigs } = props;
    return (
      <div>
        <h3>Open Gigs</h3>
        {
          gigs.map(gig => (
            <GigItem gig={gig} key={gig.id} />
          ))
        }
      </div>
    )
}

export default BrowseGigList;
