import axios from 'axios'
import socket from '../socket'

// INITIAL STATE

const defaultMessages = [];

// ACTION TYPES

const INIT_MESSAGES = 'INIT_MESSAGES'
const ADD_MESSAGE = 'ADD_MESSAGE'
const EDIT_MESSAGE = 'EDIT_MESSAGE'
const REMOVE_MESSAGE = 'REMOVE_MESSAGE'

// ACTION CREATORS

const initMessages = (messages) => ({ type: INIT_MESSAGES, messages })
export const addMessage = (message) => ({ type: ADD_MESSAGE, message })
const editMessage = (message) => ({ type: EDIT_MESSAGE, message })
const removeMessage = (message) => ({ type: REMOVE_MESSAGE, message })

// THUNKS

export const fetchMessages = () => dispatch => {
  axios
    .get('/api/messages')
    .then(res => dispatch(initMessages(res.data)))
    .catch(err => console.error('Fetching messages unsuccessful', err))
}

export const createMessage = (message) => dispatch => {
  axios
    .post('/api/messages', message)
    .then(res => {
      dispatch(addMessage(res.data))
      socket.emit('new-message', res.data)
    })
    .catch(err => console.error('Creating message unsuccessful', err))
}

export const updateMessage = (message) => dispatch => {
  axios
    .put(`/api/messages/${message.id}`)
    .then(res => dispatch(editMessage(res.data)))
    .catch(err => console.error('Updating message unsuccessful', err))
}

export const deleteMessage = (message) => dispatch => {
  dispatch(removeMessage(message))
  axios
    .delete(`/api/messages/${message.id}`)
    .catch(err => console.error('Deleting message unsuccessful', err))
}

// REDUCER

export default function(state = defaultMessages, action) {

    switch (action.type) {

      case INIT_MESSAGES:
        return action.messages

      case ADD_MESSAGE:
        return [...state, action.message]

      case EDIT_MESSAGE:
        return state.map(message => (message.id === action.message.id ? action.message : message))

      case REMOVE_MESSAGE:
        return state.filter(message => message.id !== action.message.id)

      default:
        return state

    }
}

