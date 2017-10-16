const initialState = {
  loading: null,
  messages: []
}

const messageReducer = (state = initialState, action) => {

  if (action.type === 'MESSAGE_SUBMITTED')
  {
    return Object.assign({}, state, {
      loading: true
    })
  }

  if (action.type === 'MESSAGE_LIST_UPDATE')
  {
    return Object.assign({}, state, {
      loading: false,
      messages: action.payload
    })
  }

  return state
}

export default messageReducer
