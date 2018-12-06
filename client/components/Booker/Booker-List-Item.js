import React from 'react'

const BookerListItem = (props) => {
  const { booker } = props;
  return (
    <div>
      <h4>{booker.name}</h4>
      <h5>{booker.email}</h5>
      <h5>{booker.phone}</h5>
    </div>
  )
}

export default BookerListItem;
