import io from 'socket.io-client'
import store, { addMessage } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

socket.on('new-message', newMessage => {
  store.dispatch(addMessage(newMessage))
})

export default socket
