import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import messageReducer from './messages/MessageReducer'
import contractReducer from './contracts/ContractReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  messages: messageReducer,
  contracts: contractReducer
})

export default reducer
