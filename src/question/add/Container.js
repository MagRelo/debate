import { connect } from 'react-redux'
import Add from './Layout'
import { addQuestion } from '../QuestionActions'

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuestion: (question, user) => {
      dispatch(addQuestion(question, user))
    }
  }
}

const AddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)

export default AddContainer
