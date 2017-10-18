import { connect } from 'react-redux'
import Feed from './FeedLayout'
import { getMessages } from '../messages/MessageActions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (userId) => {
      dispatch(getMessages(userId))
    }
  }
}

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)

export default FeedContainer
