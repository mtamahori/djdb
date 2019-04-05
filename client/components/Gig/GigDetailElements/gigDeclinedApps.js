import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

const GigDeclinedApps = props => {
  const { currentGig, deejays, currentBooker } = props;
    const declinedApplicants = deejays.filter(deejay => (
      currentGig.declinedApps.includes(deejay.id)
    ))
    return (
      <div>
        <h3>Declined Applicants (below)</h3>
        <DeejayList deejays={declinedApplicants} currentGig={currentGig} currentBooker={currentBooker} />
      </div>
    )
}

export default GigDeclinedApps;
