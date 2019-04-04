import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

const GigDeejayList = props => {
  const { currentBooker, currentGig, deejays } = props;
    const eligibleDeejays = deejays.filter(deejay => (
      currentGig.deejayApplicants.indexOf(deejay.id) === -1 &&
      currentGig.deejayInvites.indexOf(deejay.id) === -1 &&
      currentGig.declinedApps.indexOf(deejay.id) === -1 &&
      currentGig.declinedInvs.indexOf(deejay.id) === -1
      ))
    return (
      <div>
        <h3>Deejays You Can Book (below)</h3>
        <DeejayList deejays={eligibleDeejays} currentGig={currentGig} currentBooker={currentBooker} />
      </div>
    )
}

export default GigDeejayList;
