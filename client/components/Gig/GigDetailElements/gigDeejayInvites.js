import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

const GigDeejayInvites = props => {
  const { currentGig, deejays, currentBooker } = props;
    const deejayInvites = deejays.filter(deejay => (
      currentGig.deejayInvites.includes(deejay.id) &&
      currentGig.declinedApps.indexOf(deejay.id) === -1 &&
      currentGig.declinedInvs.indexOf(deejay.id) === -1
    ))
    return (
      <div>
        <h3>Deejay Invites (below)</h3>
        <DeejayList deejays={deejayInvites} currentGig={currentGig} currentBooker={currentBooker} />
      </div>
    )
}

export default GigDeejayInvites;
