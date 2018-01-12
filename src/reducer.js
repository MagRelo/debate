import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import web3Reducer from './util/web3/web3Reducer'

import userReducer from './user/userReducer'
import questionReducer from './question/QuestionReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  question: questionReducer,
  web3: web3Reducer
})

export default reducer
