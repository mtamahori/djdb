import axios from 'axios'

// INITIAL STATE

const defaultDeejays = [];

// ACTION TYPES

const INIT_DEEJAYS = 'INIT_DEEJAYS'
const GET_DEEJAY = 'GET_DEEJAY'
const ADD_DEEJAY = 'ADD_DEEJAY'
const EDIT_DEEJAY = 'EDIT_DEEJAY'
const REMOVE_DEEJAY = 'REMOVE_DEEJAY'

// ACTION CREATORS

const initDeejays = (deejays) => ({ type: INIT_DEEJAYS, deejays })
const getDeejay = (deejay) => ({ type: GET_DEEJAY, deejay })
const addDeejay = (deejay) => ({ type: ADD_DEEJAY, deejay })
const editDeejay = (deejay) => ({ type: EDIT_DEEJAY, deejay })
const removeDeejay = (deejay) => ({ type: REMOVE_DEEJAY, deejay })

// THUNK CREATORS

export const fetchDeejays = () => dispatch => {
  axios
    .get('/api/deejays')
    .then(res => dispatch(initDeejays(res.data)))
    .catch(err => console.error('Fetching deejays unsuccessful', err))
}

export const fetchDeejay = (deejay) => dispatch => {
  axios
    .get(`/api/deejays/${deejay.id}`)
    .then(res => dispatch(getDeejay(res.data)))
    .catch(err => console.error('Fetching deejay unsuccessful', err))
}

export const createDeejay = (deejay) => dispatch => {
  axios
    .post('/api/deejays', deejay)
    .then(res => dispatch(addDeejay(res.data)))
    .catch(err => console.error('Creating deejay unsuccessful', err))
}

export const updateDeejay = (deejay) => dispatch => {
  axios
    .put(`/api/deejays/${deejay.id}`, deejay)
    .then(res => dispatch(editDeejay(res.data)))
    .catch(err => console.error('Updating deejay unsuccessful', err))
}

export const deleteDeejay = (deejay) => dispatch => {
  dispatch(removeDeejay(deejay))
  axios
    .delete(`/api/deejays/${deejay.id}`)
    .catch(err => console.error('Deleting deejay unsuccessful', err))
}

// REDUCER

export default function(state = defaultDeejays, action) {
  switch (action.type) {

    case INIT_DEEJAYS:
      return action.deejays

    case GET_DEEJAY:
      return action.deejay

    case ADD_DEEJAY:
      return [...state, action.deejay]

    case EDIT_DEEJAY:
      return state.map(deejay => (deejay.id === action.deejay.id ? action.deejay : deejay))

    case REMOVE_DEEJAY:
      return state.filter(deejay => deejay.id !== action.deejay.id)

    default:
      return state
  }
}
