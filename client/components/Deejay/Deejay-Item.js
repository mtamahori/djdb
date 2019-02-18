import React from 'react';
import { NavLink } from 'react-router-dom';

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
        <h4>{deejay.name}</h4>
      </NavLink>
      <h5>{deejay.email}</h5>
      <h5>{deejay.phone}</h5>
    </div>
  );
};

export default DeejayItem;
