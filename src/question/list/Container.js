import { connect } from 'react-redux'
import Layout from './Layout'
import { listQuestions } from '../QuestionActions'

const mapStateToProps = (state, ownProps) => {
  return {
    questionList: state.question.questionList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listQuestions: () => {
      dispatch(listQuestions())
    }
  }
}

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default ListContainer
