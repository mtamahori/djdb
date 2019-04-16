import React from 'react'

const MessageItem = (props) => {
  const { message } = props;
  return (
    <div>
      <h4>author: { message.deejayId || message.bookerId }</h4>
      <h5>content: { message.content }</h5>
    </div>
  )
}

export default MessageItem
