// INITIAL STATE

const defaultGigs = [];

// ACTION TYPES

const SET_CALENDAR_GIGS = 'SET_CALENDAR_GIGS'
const CLEAR_CALENDAR = 'CLEAR_CALENDAR'

// ACTION CREATORS

export const setCalendarGigs = (gigs) => ({ type: SET_CALENDAR_GIGS, gigs })
export const clearCalendar = () => ({ type: CLEAR_CALENDAR })

// REDUCER

export default function(state = defaultGigs, action) {

  switch (action.type) {

    case SET_CALENDAR_GIGS:
      return action.gigs

    case CLEAR_CALENDAR:
      return defaultGigs

    default:
      return state
  }
}
