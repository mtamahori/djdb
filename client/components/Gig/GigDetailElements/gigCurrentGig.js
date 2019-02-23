import React from 'react'
import BookerItem from '../../Booker/Booker-Item'
import DeejayItem from '../../Deejay/Deejay-Item'
import dateFns from 'date-fns'

const GigCurrentGig = props => {
  const { currentGig, gigs, deejays, bookers } = props
    return (
      <div>
        {
          gigs
            .filter(gig => gig.id === currentGig.id)
            .map(gig => {
              const gigDateArr = currentGig.date.split('/')
              const gigYear = gigDateArr[0]
              const gigMonth = gigDateArr[1]
              const gigDate = gigDateArr[2]
              let gigDeejay;
              let gigBooker;

              currentGig.deejayId ? gigDeejay = deejays.filter(deejay => deejay.id === currentGig.deejayId)[0] : gigDeejay = null;
              currentGig.bookerId ? gigBooker = bookers.filter(booker => booker.id === currentGig.bookerId)[0] : gigBooker = null;

              const formattedDate = dateFns.format(
                new Date(gigYear, gigMonth, gigDate),
                'MMMM D, YYYY'
              )
              return (
              <div key={gig.id}>
                <h4>{gig.name}</h4>
                <h4>{formattedDate}</h4>
                <h4>{gig.time}</h4>
                <h4>{gig.location}</h4>
                <h4>{gig.compensation}</h4>
                {
                  gigBooker &&
                  <div>
                    <h4>This Gig's Booker:</h4>
                    <BookerItem booker={gigBooker} key={gigBooker.id} currentGig={currentGig} />
                  </div>
                }
                {
                  gigDeejay &&
                  <div>
                    <h4>This Gig's Deejay:</h4>
                    <DeejayItem deejay={gigDeejay} key={gigDeejay.id} currentGig={currentGig} />
                  </div>
                }
              </div>
              )}
            )
        }
      </div>
    )
}

export default GigCurrentGig;
