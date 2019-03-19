import React from 'react'
import { NavLink } from 'react-router-dom'
import dateFns from 'date-fns'
import { Card } from 'semantic-ui-react'
require('../../../public/stylesheets/gigItem.css')

const GigItem = (props) => {
  const { gig, currentBooker, currentDeejay } = props;
  const gigDateArr = gig.date.split('/')
            const gigYear = gigDateArr[0]
            const gigMonth = gigDateArr[1]
            const gigDate = gigDateArr[2]

            const formattedDate = dateFns.format(
              new Date(gigYear, gigMonth, gigDate),
              'MMMM D, YYYY'
            )
  return (
    <div>
      <NavLink activeClassName="active"
      to={{
        pathname: `/gigs/${gig.id}`,
        state: {
          currentBooker: currentBooker,
          currentDeejay: currentDeejay
        }
      }}>
        <Card link>
          <Card.Content>
            <Card.Header>{gig.name}</Card.Header>
            <Card.Description>{formattedDate}</Card.Description>
            <Card.Description>{gig.time}</Card.Description>
            <Card.Description>{gig.location}</Card.Description>
            <Card.Description>${gig.compensation}</Card.Description>
          </Card.Content>
        </Card>
      </NavLink>
    </div>
  )
}

export default GigItem;


// <div>
// <NavLink activeClassName="active"
// to={{
//   pathname: `/gigs/${gig.id}`,
//   state: {
//     currentBooker: currentBooker,
//     currentDeejay: currentDeejay
//   }
// }}>
//   <h4>{gig.name}</h4>
// </NavLink>
// <h5>{formattedDate}</h5>
// <h5>{gig.time}</h5>
// <h5>{gig.location}</h5>
// <h5>{gig.compensation}</h5>
// </div>
