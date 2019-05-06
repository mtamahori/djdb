import axios from 'axios'
import socket from '../socket'

// INITIAL STATE

const defaultGigs = [];

// ACTION TYPES

const INIT_GIGS = 'INIT_GIGS'
const ADD_GIG = 'ADD_GIG'
const EDIT_GIG = 'EDIT_GIG'
const REMOVE_GIG = 'REMOVE_GIG'

// ACTION CREATORS

const initGigs = (gigs) => ({ type: INIT_GIGS, gigs })
export const addGig = (gig) => ({ type: ADD_GIG, gig })
export const editGig = (gig) => ({ type: EDIT_GIG, gig })
export const removeGig = (gig) => ({ type: REMOVE_GIG, gig })

// THUNKS

export const fetchGigs = () => dispatch => {
  axios
    .get('/api/gigs')
    .then(res => dispatch(initGigs(res.data)))
    .catch(err => console.error('Fetching gigs unsuccessful', err))
}

export const createGig = (gig) => dispatch => {
  axios
    .post('/api/gigs', gig)
    .then(res => {
      dispatch(addGig(res.data))
      socket.emit('new-gig', res.data)
    })
    .catch(err => console.error('Creating gig unsuccessful', err))
}

export const updateGig = (gig) => dispatch => {
  axios
    .put(`/api/gigs/${gig.id}`, gig)
    .then(res => {
      dispatch(editGig(res.data))
      socket.emit('update-gig', res.data)
    })
    .catch(err => console.error('Updating gig unsuccessful', err))
}

export const deleteGig = (gig) => dispatch => {
  dispatch(removeGig(gig))
  socket.emit('delete-gig', gig)
  axios
    .delete(`/api/gigs/${gig.id}`)
    .catch(err => console.error('Deleting gig unsuccessful', err))
}

// REDUCER

export default function(state = defaultGigs, action) {

  switch (action.type) {

    case INIT_GIGS:
      return action.gigs

    case ADD_GIG:
      return [...state, action.gig]

    case EDIT_GIG:
      return state.map(gig => (gig.id === action.gig.id ? action.gig : gig))

    case REMOVE_GIG:
      return state.filter(gig => gig.id !== action.gig.id)

    default:
      return state

  }
}
