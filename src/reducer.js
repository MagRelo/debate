import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import web3Reducer from './util/web3/web3Reducer'

import userReducer from './user/userReducer'
import messageReducer from './messages/MessageReducer'
import contractReducer from './contracts/ContractReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  messages: messageReducer,
  contracts: contractReducer,
  web3: web3Reducer
})

export default reducer
