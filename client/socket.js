import io from 'socket.io-client'
import store, { addMessage, addGig } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

socket.on('new-message', newMessage => {
  store.dispatch(addMessage(newMessage))
})

socket.on('new-gig', newGig => {
  store.dispatch(addGig(newGig))
})

export default socket
