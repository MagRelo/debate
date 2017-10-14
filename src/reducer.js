import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import messageReducer from './layouts/messages/MessageReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  messages: messageReducer
})

export default reducer
