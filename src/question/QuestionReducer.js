const initialState = {
  loading: null,
  networkFeed: [],
  userFeed: []
}

const messageReducer = (state = initialState, action) => {

  if (action.type === 'MESSAGE_SUBMITTED')
  {
    return Object.assign({}, state, {
      loading: true,
      networkFeed : [ ...state.networkFeed, {
        id: 'temp-optimistic-update',
        actor: {
          name: 'todd'
        },
        object: {
          text: action.payload
        }
      }]

    })
  }

  if (action.type === 'MESSAGE_LIST_UPDATE')
  {
    return Object.assign({}, state, {
      loading: false,
      userFeed: action.payload
    })
  }

  return state
}

export default messageReducer
