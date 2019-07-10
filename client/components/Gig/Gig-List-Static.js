import React from 'react'
import GigItemStatic from './Gig-Item-Static'
require('../../../public/stylesheets/gigList.css')

// RENDERED IN BOOKER/DEEJAY DETAILS AS THEIR PAST GIG HISTORY

const GigListStatic = props => {

  const { gigs } = props;

    return (
      <div className="gig-list-items">
        {
          gigs.map(gig => (
            <GigItemStatic gig={gig} key={gig.id} />
          ))
        }
      </div>
    )
}

export default GigListStatic;
