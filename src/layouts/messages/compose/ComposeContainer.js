import { connect } from 'react-redux'
import Compose from './Compose'
import { messageSubmit } from './ComposeActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageSubmit: (event) => {
      event.preventDefault();
      dispatch(messageSubmit())
    }
  }
}

const MessageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Compose)

export default MessageContainer
