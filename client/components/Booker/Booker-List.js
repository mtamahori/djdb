import React from 'react';
import BookerItem from './Booker-Item';
require('../../../public/stylesheets/bookerList.css')

const BookerList = props => {
  const { bookers, currentGig, currentDeejay } = props;
  return (
    <div className="booker-list-items">
      {bookers.map(booker => (
        <BookerItem booker={booker} key={booker.id} currentGig={currentGig} currentDeejay={currentDeejay} />
      ))}
    </div>
  );
};

export default BookerList;
