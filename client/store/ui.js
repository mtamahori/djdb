import axios from 'axios'
import history from 'history'

// INITIAL STATE

const defaultUI = {
  modeDeejay: false,
  modeBooker: false,
  currentMode: {}
}

// ACTION TYPES

const SET_DEEJAY = 'SET_DEEJAY'
const SET_BOOKER = 'SET_BOOKER'

// ACTION CREATORS

const setDeejay = deejay => ({ type: SET_DEEJAY, deejay })
const setBooker = booker => ({ type: SET_BOOKER, booker })

// THUNK CREATORS

export const fetchDeejay = (deejay) => dispatch => {
  axios
    .get(`/api/deejays/${deejay.id}`)
    .then(res => dispatch(setDeejay(res.data)))
    .catch(err => console.error('Fetching deejay unsuccessful', err))
}

export const fetchBooker = booker => dispatch => {
  axios
    .get(`/api/bookers/${booker.id}`)
    .then(res => dispatch(setBooker(res.data)))
    .catch(err => console.error('Fetching booker unsuccessful', err))
}

// REDUCER

export default function(state = defaultUI, action) {

  switch (action.type) {

    case SET_BOOKER:
      return Object.assign({}, state, {
        modeBooker: true,
        modeDeejay: false,
        currentMode: action.booker
      })

    case SET_DEEJAY:
      return Object.assign({}, state, {
        modeBooker: false,
        modeDeejay: true,
        currentMode: action.deejay
      })

    default:
      return state
  }

}
