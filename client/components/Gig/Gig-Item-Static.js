import React from 'react'
import dateFns from 'date-fns'
import { Card } from 'semantic-ui-react'

// SIMPLE COMPONENT FOR PROVIDING A GIG'S CORE DETAILS WITHOUT LINKING TO A gigDetail COMPONENT
// THIS IS RENDERED IN gigListStatic, WHICH IS THEN RENDERED IN BOOKER/DEEJAY DETAILS AS THEIR PAST GIG HISTORY

const GigItemStatic = (props) => {
  const { gig } = props;
  const gigDateArr = gig.date.split('/')
  const gigYear = gigDateArr[0]
  const gigMonth = gigDateArr[1]
  const gigDate = gigDateArr[2]
  const formattedDate = dateFns.format(new Date(gigYear, gigMonth, gigDate), 'MMMM D, YYYY')
  return (
    <div>
        <Card>
          <Card.Content>
            <Card.Header>{gig.name}</Card.Header>
            <Card.Description>{formattedDate}</Card.Description>
            <Card.Description>{gig.time}</Card.Description>
            <Card.Description>{gig.location}</Card.Description>
            <Card.Description>{gig.styleTags.map(tag => {return tag + '! '})}</Card.Description>
          </Card.Content>
        </Card>
    </div>
  )
}

export default GigItemStatic;
