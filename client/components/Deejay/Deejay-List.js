import React from 'react';
import DeejayItem from './Deejay-Item';

const DeejayList = props => {
  const { deejays, currentGig } = props;
  return (
    <div>
      {deejays.map(deejay => (
        <DeejayItem deejay={deejay} key={deejay.id} currentGig={currentGig} />
      ))}
    </div>
  );
};

export default DeejayList;
