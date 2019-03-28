import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import bookers from './bookers'
import deejays from './deejays'
import gigs from './gigs'
import messages from './messages'
// import ui from './ui'

const reducer = combineReducers({ user, bookers, deejays, gigs, messages })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './bookers'
export * from './deejays'
export * from './gigs'
export * from './messages'
// export * from './ui'
