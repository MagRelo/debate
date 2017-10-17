import { connect } from 'react-redux'
import Compose from './ComposeLayout'
import { messageSubmit } from './ComposeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageSubmit: (messageText, user) => {
      dispatch(messageSubmit(messageText, user))
    }
  }
}

const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose)

export default MessageContainer
