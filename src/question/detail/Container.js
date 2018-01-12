import { connect } from 'react-redux'
import Detail from './Layout'
import { getQuestion, commentSubmit, voteSubmit } from '../QuestionActions'

const mapStateToProps = (state, ownProps) => {
  return {
    question: state.question.question,
    answerOne: state.question.answerOne,
    answerTwo: state.question.answerTwo,
    voteLoading: state.question.voteLoading,
    comments: state.question.comments,
    commentLoading: state.question.commentLoading    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getQuestion: (text) => {
      dispatch(getQuestion(text))
    },
    commentSubmit: (comment, questionId, user) => {
      dispatch(commentSubmit(comment, questionId, user))
    },
    voteSubmit: (vote, questionId, user) => {
      dispatch(voteSubmit(vote, questionId, user))
    },
  }
}

const DetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)

export default DetailContainer
