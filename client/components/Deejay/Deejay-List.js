import React from 'react';
import DeejayItem from './Deejay-Item';
require('../../../public/stylesheets/deejayList.css')

const DeejayList = props => {
  const { deejays, currentGig } = props;
  return (
    <div className="deejay-list-items">
      {deejays.map(deejay => (
        <DeejayItem deejay={deejay} key={deejay.id} currentGig={currentGig} />
      ))}
    </div>
  );
};

export default DeejayList;
