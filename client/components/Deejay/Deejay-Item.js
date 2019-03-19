import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

const DeejayItem = props => {
  const { deejay, currentGig } = props;
  return (
    <div>
      <NavLink
        activeClassName="active"
        to={{
          pathname: `/deejays/${deejay.id}`,
          state: {
            currentGig: currentGig
          }
        }}
      >
        <Card link>
          <Card.Content>
            <Card.Header>{deejay.name}</Card.Header>
            <Card.Description>{deejay.email}</Card.Description>
            <Card.Description>{deejay.phone}</Card.Description>
          </Card.Content>
        </Card>
      </NavLink>
    </div>
  );
};

export default DeejayItem;
