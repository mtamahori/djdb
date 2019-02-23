import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

const GigDeclinedInvs = props => {
  const { currentGig, deejays } = props;
    const declinedInvites = deejays.filter(deejay => (
      currentGig.declinedInvs.includes(deejay.id)
    ))
    return (
      <div>
        <h3>Declined Invites (below)</h3>
        <DeejayList deejays={declinedInvites} currentGig={currentGig} />
      </div>
    )
}

export default GigDeclinedInvs;
