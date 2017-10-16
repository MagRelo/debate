import { connect } from 'react-redux'
import Compose from './ComposeLayout'
import { messageSubmit } from './ComposeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageSubmit: (messageText) => {
      dispatch(messageSubmit(messageText))
    }
  }
}

const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose)

export default MessageContainer
