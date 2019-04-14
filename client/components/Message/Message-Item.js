import React from 'react'

const MessageItem = (props) => {
  const { message } = props;
  return (
    <div>
      <h5>author: { message.deejayId || message.bookerId }</h5>
      <h4>{message.content}</h4>
    </div>
  )
}

export default MessageItem
