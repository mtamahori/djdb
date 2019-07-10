import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

// SINGLE DEEJAY NAME/CARD

const DeejayItem = props => {
  const { deejay, currentGig, currentBooker } = props;
  return (
    <div>
      <NavLink
        activeClassName="active"
        to={{
          pathname: `/deejays/${deejay.id}`,
          state: {
            currentGig: currentGig,
            currentBooker: currentBooker
          }
        }}
      >
        <Card link>
          <Card.Content>
            <Card.Header>{deejay.name}</Card.Header>
            <Card.Description>{deejay.styleTags.map(tag => {return tag + ', '})}</Card.Description>
          </Card.Content>
        </Card>
      </NavLink>
    </div>
  );
};

export default DeejayItem;
