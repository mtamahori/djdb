import React from 'react';
import { NavLink } from 'react-router-dom';

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
        <h4>{booker.name}</h4>
      </NavLink>
      <h5>{booker.email}</h5>
      <h5>{booker.phone}</h5>
    </div>
  );
};

export default BookerItem;
