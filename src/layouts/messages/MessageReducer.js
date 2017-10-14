const initialState = {
  loading: null,
  messages: null
}

const messageReducer = (state = initialState, action) => {

  if (action.type === 'MESSAGE_SUBMITTED')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  // if (action.type === 'USER_LOGGED_OUT')
  // {
  //   return Object.assign({}, state, {
  //     data: null
  //   })
  // }

  return state
}

export default messageReducer
