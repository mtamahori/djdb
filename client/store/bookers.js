import axios from 'axios'

// INITIAL STATE

const defaultBookers = [];

// ACTION TYPES

const INIT_BOOKERS = 'INIT_BOOKERS'
const ADD_BOOKER = 'ADD_BOOKER'
const EDIT_BOOKER = 'EDIT_BOOKER'
const REMOVE_BOOKER = 'REMOVE_BOOKER'

// ACTION CREATORS

const initBookers =  (bookers) => ({ type: INIT_BOOKERS, bookers })
const addBooker = (booker) => ({ type: ADD_BOOKER, booker })
const editBooker = (booker) => ({ type: EDIT_BOOKER, booker })
const removeBooker = (booker) => ({ type: REMOVE_BOOKER, booker })

// THUNK CREATORS

export const fetchBookers = () => dispatch => {
  axios
    .get('/api/bookers')
    .then(res => dispatch(initBookers(res.data)))
    .catch(err => console.error('Fetching bookers unsuccessful', err))
}

export const createBooker = booker => dispatch => {
  axios
    .post('/api/bookers', booker)
    .then(res => dispatch(addBooker(res.data)))
    .catch(err => console.error('Creating booker unsuccessful', err))
}

export const updateBooker = booker => dispatch => {
  axios
    .put(`/api/bookers/${booker.id}`, booker)
    .then(res => dispatch(editBooker(res.data)))
    .catch(err => console.error('Updating booker unsuccessful', err))
}

export const deleteBooker = booker => dispatch => {
  dispatch(removeBooker(booker))
  axios
    .delete(`/api/bookers/${booker.id}`)
    .catch(err => console.error('Deleting booker unsuccessful', err))
}

// REDUCER

export default function(state = defaultBookers, action) {

  switch (action.type) {

    case INIT_BOOKERS:
      return action.bookers

    case ADD_BOOKER:
      return [...state, action.booker]

    case EDIT_BOOKER:
      return state.map(booker => (action.booker.id === booker.id ? action.booker : booker))

    case REMOVE_BOOKER:
      return state.filter(booker => booker.id !== action.booker.id)

    default:
      return state
  }

}
