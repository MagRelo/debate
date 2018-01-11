import { connect } from 'react-redux'
import Layout from './Layout'
// import {  } from '../QuestionActions'

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

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default ListContainer
