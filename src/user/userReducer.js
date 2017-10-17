const initialState = {
  data: {},
  userList: [],
  loading: false
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN')
  {
    return Object.assign({}, state, {
      data: action.payload,
      loading: false
    })
  }


  if (action.type === 'MESSAGE_SUBMITTED')
  {
    return Object.assign({}, state, {
      loading: true
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  if (action.type === 'USER_LIST_UPDATE')
  {
    return Object.assign({}, state, {
      userList: action.payload
    })
  }

  if (action.type === 'USER_SIGNUP')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  return state
}

export default userReducer
