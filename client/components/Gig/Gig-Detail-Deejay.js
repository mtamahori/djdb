import React from 'react'
import dateFns from 'date-fns'
import GigBookingApplication from './GigDetailElements/gigBookingApplication'
import GigAcceptDeclineBookingRequest from './GigDetailElements/gigAcceptDeclineBookingRequest'
import GigRetractApplication from './GigDetailElements/gigRetractApplication'
import GigCancelBooking from './GigDetailElements/gigCancelBooking'

// FOR DEEJAYS
// PROVIDES DEEJAY-SPECIFIC DETAILS FOR THE GIG: APPLY/RETRACT, ACCEPT/DECLINE, CANCEL BOOKING

const getDeejayBools = (currentGig, currentDeejay) => {
  return {
    isCurrentDeejay: !!currentDeejay,
    hasDeejay: !!currentGig.deejayId,
    isGigDeejay: currentGig.deejayId === currentDeejay.id,
    isApplicant: currentGig.deejayApplicants.includes(currentDeejay.id),
    isInvite: currentGig.deejayInvites.includes(currentDeejay.id),
    hasDeclinedApp: currentGig.declinedApps.includes(currentDeejay.id),
    hasDeclinedInv: currentGig.declinedInvs.includes(currentDeejay.id),
  }
}

const GigDetailDeejay = props => {
  const { currentGig, currentDeejay, handleBookingApplication, handleRetractApplication, handleCancelBooking, handleBookingAccept, handleBookingDecline } = props;

  const deejayConditions = getDeejayBools(currentGig, currentDeejay);
  const deejayBools =
  `${deejayConditions.isCurrentDeejay}-${deejayConditions.hasDeejay}-${deejayConditions.isGigDeejay}-${deejayConditions.isApplicant}-${deejayConditions.isInvite}-${deejayConditions.hasDeclinedApp}-${deejayConditions.hasDeclinedInv}`

  let gigDateArr = currentGig.date.split('/')
  let gigYear = gigDateArr[0]
  let gigMonth = gigDateArr[1]
  let gigDate = gigDateArr[2]

  return (
    <div>

      {{
        ['true-false-false-false-false-false-false']: <GigBookingApplication handleBookingApplication={handleBookingApplication} />, //eslint-disable-line no-useless-computed-key
        ['true-false-false-false-true-false-false']: <GigAcceptDeclineBookingRequest handleBookingAccept={handleBookingAccept} handleBookingDecline={handleBookingDecline} />, //eslint-disable-line no-useless-computed-key
        ['true-false-false-true-false-false-false']: <GigRetractApplication handleRetractApplication={handleRetractApplication} /> //eslint-disable-line no-useless-computed-key
      }[deejayBools]}

      {
        deejayBools === ['true-true-true-false-false-true-true'] &&
        dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now()) &&
        <GigCancelBooking handleCancelBooking={handleCancelBooking} />
      }

    </div>
  )

}

export default GigDetailDeejay;
