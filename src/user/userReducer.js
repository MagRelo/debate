const initialState = {
  data: null,
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

  return state
}

export default userReducer
