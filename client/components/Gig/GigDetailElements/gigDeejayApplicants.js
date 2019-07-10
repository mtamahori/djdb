import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

// FOR BOOKERS
// VIEW LIST OF DEEJAYS THAT HAVE APPLIED

const GigDeejayApplicants = props => {
  const { currentGig, deejays, currentBooker } = props;
    const deejayApplicants = deejays.filter(deejay => (
      currentGig.deejayApplicants.indexOf(deejay.id) !== -1 &&
      currentGig.declinedApps.indexOf(deejay.id) === -1 &&
      currentGig.declinedInvs.indexOf(deejay.id) === -1
    ))

    return (
      <div>
        <h3>Deejay Applicants (below)</h3>
        <DeejayList deejays={deejayApplicants} currentGig={currentGig} currentBooker={currentBooker} />
      </div>
    )
}

export default GigDeejayApplicants;
