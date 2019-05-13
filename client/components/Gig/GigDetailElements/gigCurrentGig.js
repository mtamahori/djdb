import React from 'react'
import BookerItem from '../../Booker/Booker-Item'
import DeejayItem from '../../Deejay/Deejay-Item'
import dateFns from 'date-fns'
import { Card } from 'semantic-ui-react'

const GigCurrentGig = props => {
  const { currentGig, currentBooker, currentDeejay, gigs, deejays, bookers } = props
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
                <Card>
                  <Card.Content>
                    <Card.Header>{gig.name}</Card.Header>
                    <Card.Description>{formattedDate}</Card.Description>
                    <Card.Description>{gig.time}</Card.Description>
                    <Card.Description>{gig.location}</Card.Description>
                    <Card.Description>Styles: {gig.styleTags.map(tag => {return tag + ', '})}</Card.Description>
                    <Card.Description>${gig.compensation}</Card.Description>
                  </Card.Content>
                </Card>
                {
                  gigBooker &&
                  <div>
                    <h4>This Gig's Booker:</h4>
                    <BookerItem booker={gigBooker} key={gigBooker.id} currentGig={currentGig} currentDeejay={currentDeejay} />
                  </div>
                }
                {
                  gigDeejay &&
                  <div>
                    <h4>This Gig's Deejay:</h4>
                    <DeejayItem deejay={gigDeejay} key={gigDeejay.id} currentGig={currentGig} currentBooker={currentBooker} />
                  </div>
                }
              </div>
              )})
        }
      </div>
    )
}

export default GigCurrentGig;
