import React from 'react'
import { List } from 'semantic-ui-react'

const MessageItem = (props) => {
  const { message } = props;
  return (
    <List.Item>
      <List.Content>
        <List.Description>
          { message.content }
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

export default MessageItem
