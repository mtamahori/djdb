import React from 'react'
import GigDeejayInvites from './GigDetailElements/gigDeejayInvites'
import GigDeejayApplicants from './GigDetailElements/gigDeejayApplicants'
import GigDeclinedInvs from './GigDetailElements/gigDeclinedInvs'
import GigDeclinedApps from './GigDetailElements/gigDeclinedApps'
import GigDeejayList from './GigDetailElements/gigDeejayList'
import GigUpdateGig from './GigDetailElements/gigUpdateGig'
import GigDeleteGig from './GigDetailElements/gigDeleteGig'
require('../../../public/stylesheets/gigDetail.css')

const GigDetailBooker = props => {
  const { currentGig, deejays, currentBooker, handleUpdateGig, handleDeleteGig } = props;
  return (
    <div>
      {
        currentGig.deejayInvites.length &&
        <GigDeejayInvites currentGig={currentGig} deejays={deejays} />
      }
      {
        currentGig.deejayApplicants.length &&
        <GigDeejayApplicants currentGig={currentGig} deejays={deejays} />
      }
      {
        currentGig.declinedInvs.length &&
        <GigDeclinedInvs currentGig={currentGig} deejays={deejays} />
      }
      {
        currentGig.declinedApps.length &&
        <GigDeclinedApps currentGig={currentGig} deejays={deejays} />
      }
      {
        !currentGig.deejayId &&
        <GigDeejayList currentGig={currentGig} deejays={deejays} />
      }
      {
        currentGig.bookerId === currentBooker.id &&
        <div>
          <GigUpdateGig handleUpdateGig={handleUpdateGig} />
          <GigDeleteGig handleDeleteGig={handleDeleteGig} />
        </div>
      }
    </div>
  )
}

export default GigDetailBooker;
