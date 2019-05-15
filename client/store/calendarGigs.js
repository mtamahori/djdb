// INITIAL STATE

const defaultGigs = [];

// ACTION TYPES

const SET_CALENDAR_GIGS = 'SET_CALENDAR_GIGS'

// ACTION CREATORS

export const setCalendarGigs = (gigs) => ({ type: SET_CALENDAR_GIGS, gigs })

// REDUCER

export default function(state = defaultGigs, action) {

  switch (action.type) {

    case SET_CALENDAR_GIGS:
      return action.gigs

    default:
      return state
  }
}
