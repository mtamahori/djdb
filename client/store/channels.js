import axios from 'axios'
import socket from '../socket'

// INITIAL STATE

const defaultChannels = [];

// ACTION TYPES

const INIT_CHANNELS = 'INIT_CHANNELS'
const ADD_CHANNEL = 'ADD_CHANNEL'
const EDIT_CHANNEL = 'EDIT_CHANNEL'
const REMOVE_CHANNEL = 'REMOVE_CHANNEL'

// ACTION CREATORS

const initChannels = (channels) => ({ type: INIT_CHANNELS, channels })
export const addChannel = (channel) => ({ type: ADD_CHANNEL, channel })
const editChannel = (channel) => ({ type: EDIT_CHANNEL, channel })
const removeChannel = (channel) => ({ type: REMOVE_CHANNEL, channel })

// THUNKS

export const fetchChannels = () => (dispatch) => {
  axios
    .get('/api/channels')
    .then(res => dispatch(initChannels(res.data)))
    .catch(err => console.error('Fetching channels unsuccessful', err))
}

export const createChannel = (channel) => (dispatch) => {
  axios
    .post('/api/channels', channel)
    .then(res => {
      dispatch(addChannel(res.data))
      socket.emit('new-channel', res.data)
    })
    .catch(err => console.error('Creating channel unsuccessful', err))
}

export const updateChannel = (channel) => (dispatch) => {
  axios
    .put(`/api/channels/${channel.id}`, channel)
    .then(res => {
      dispatch(editChannel(res.data))
    })
    .catch(err => console.error('Updating channel unsuccessful', err))
}

export const deleteChannel = (channel) => (dispatch) => {
  dispatch(removeChannel(channel))
  axios
    .delete(`/api/channels/${channel.id}`)
    .catch(err => console.error('Deleting channel unsuccessful', err))
}

// REDUCER

export default function(state = defaultChannels, action) {

  switch (action.type) {

    case INIT_CHANNELS:
      return action.channels

    case ADD_CHANNEL:
      return [...state, action.channel]

    case EDIT_CHANNEL:
      return state.map(channel => (channel.id === action.channel.id ? action.channel : channel))

    case REMOVE_CHANNEL:
      return state.filter(channel => channel.id !== action.channel.id)

    default:
      return state;

  }
}
