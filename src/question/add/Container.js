import { connect } from 'react-redux'
import Add from './Layout'
// import { messageSubmit } from '../QuestionActions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onMessageSubmit: (messageText, user) => {
    //   dispatch(messageSubmit(messageText, user))
    // }
  }
}

const AddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)

export default AddContainer
