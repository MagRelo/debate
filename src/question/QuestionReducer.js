const initialState = {
  loading: null,
  questionList: [],
  question: '',
  answerOne: 'default',
  answerTwo: 'default',
  comments: [],
  commentLoading: false
}

const questionReducer = (state = initialState, action) => {

  if (action.type === 'QUESTION_LIST_UPDATE')
  {
    return Object.assign({}, state, {
      loading: false,
      questionList: action.payload
    })
  }

  if (action.type === 'QUESTION_UPDATED')
  {
    return Object.assign({}, state, {
      loading: false,
      commentLoading: false,
      voteLoading: false,
      question: action.payload.question,
      answerOne: action.payload.answerOne,
      answerTwo: action.payload.answerTwo,
      comments: action.payload.comments
    })
  }

  if (action.type === 'COMMENT_SUBMITTED')
  {
    return Object.assign({}, state, {
      commentLoading: true
    })
  }

  if (action.type === 'VOTE_SUBMITTED')
  {
    return Object.assign({}, state, {
      voteLoading: true
    })
  }

  return state
}

export default questionReducer
