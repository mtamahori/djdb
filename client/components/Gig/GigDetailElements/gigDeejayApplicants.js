import React from 'react'
import DeejayList from '../../Deejay/Deejay-List'

const GigDeejayApplicants = props => {
  const { currentGig, deejays } = props;
    const deejayApplicants = deejays.filter(deejay => (
      currentGig.deejayApplicants.indexOf(deejay.id) !== -1 &&
      currentGig.declinedApps.indexOf(deejay.id) === -1 &&
      currentGig.declinedInvs.indexOf(deejay.id) === -1
    ))

    return (
      <div>
        <h3>Deejay Applicants (below)</h3>
        <DeejayList deejays={deejayApplicants} currentGig={currentGig} />
      </div>
    )
}

export default GigDeejayApplicants;
