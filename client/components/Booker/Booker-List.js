import React from 'react';
import BookerItem from './Booker-Item';

const BookerList = props => {
  const { bookers } = props;
  return (
    <div>
      <h3>Booker List</h3>
      {bookers.map(booker => (
        <BookerItem booker={booker} key={booker.id} />
      ))}
    </div>
  );
};

export default BookerList;
