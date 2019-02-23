import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

const GigDeclinedApps = props => {
  const { currentGig, deejays } = props;
    const declinedApplicants = deejays.filter(deejay => (
      currentGig.declinedApps.includes(deejay.id)
    ))
    return (
      <div>
        <h3>Declined Applicants (below)</h3>
        <DeejayList deejays={declinedApplicants} currentGig={currentGig} />
      </div>
    )
}

export default GigDeclinedApps;
