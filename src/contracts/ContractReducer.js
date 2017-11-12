const initialState = {
  loading: false,
  contract: {contractOptions: {}},
  list: []
}

const contractReducer = (state = initialState, action) => {

  if (action.type === 'REQUEST_SENT')
  {
    return Object.assign({}, state, {
      loading: true
    })
  }
  if (action.type === 'LIST_UPDATE')
  {
    return Object.assign({}, state, {
      loading: false,
      list: action.payload,
      contract: null
    })
  }
  if (action.type === 'CONTRACT_UPDATE')
  {
    return Object.assign({}, state, {
      loading: false,
      contract: action.payload
    })
  }

  return state
}

export default contractReducer
