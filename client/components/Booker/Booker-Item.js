import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import deejays from '../../store/deejays';

const BookerItem = props => {
  const { booker, currentGig } = props;
  return (
    <div>
      <NavLink
        activeClassName="active"
        to={{
          pathname: `/bookers/${booker.id}`,
          state: {
            currentGig: currentGig
          }
        }}
      >
        <Card link>
          <Card.Content>
            <Card.Header>{booker.name}</Card.Header>
            <Card.Description>{booker.email}</Card.Description>
            <Card.Description>{booker.phone}</Card.Description>
          </Card.Content>
        </Card>
      </NavLink>
    </div>
  );
};

export default BookerItem;
