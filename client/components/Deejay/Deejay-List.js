import React from 'react';
import DeejayItem from './Deejay-Item';
require('../../../public/stylesheets/deejayList.css')

// LIST OF DEEJAY NAMES/CARDS

const DeejayList = props => {
  const { deejays, currentGig, currentBooker } = props;
  return (
    <div className="deejay-list-items">
      {deejays.map(deejay => (
        <DeejayItem deejay={deejay} key={deejay.id} currentGig={currentGig} currentBooker={currentBooker} />
      ))}
    </div>
  );
};

export default DeejayList;
