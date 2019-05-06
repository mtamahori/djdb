import io from 'socket.io-client'
import store, { addMessage, addChannel, addGig, editGig, removeGig } from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

socket.on('new-message', newMessage => {
  store.dispatch(addMessage(newMessage))
})

socket.on('new-channel', newChannel => {
  store.dispatch(addChannel(newChannel))
})

socket.on('new-gig', newGig => {
  store.dispatch(addGig(newGig))
})

socket.on('update-gig', gig => {
  store.dispatch(editGig(gig))
})

socket.on('delete-gig', gig => {
  store.dispatch(removeGig(gig))
})

export default socket
