import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

const GigDeclinedInvs = props => {
  const { currentGig, deejays, currentBooker } = props;
    const declinedInvites = deejays.filter(deejay => (
      currentGig.declinedInvs.includes(deejay.id)
    ))
    return (
      <div>
        <h3>Declined Invites (below)</h3>
        <DeejayList deejays={declinedInvites} currentGig={currentGig} currentBooker={currentBooker} />
      </div>
    )
}

export default GigDeclinedInvs;
