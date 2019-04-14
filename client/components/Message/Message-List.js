import React from 'react'
import { List } from 'semantic-ui-react'
import MessageItem from './Message-Item'

const MessageList = (props) => {
  const { messages } = props;
  return (
    <div>
      {
        messages.map(message => (
          <MessageItem message={message} key={message.id} />
        ))
      }
    </div>
  )
}

export default MessageList
