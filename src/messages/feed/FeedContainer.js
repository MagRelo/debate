import { connect } from 'react-redux'
import Feed from './FeedLayout'
import { getMessages, getTimeline } from '../MessageActions'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (userId) => {
      dispatch(getMessages(userId))
    },
    getTimeline: (userId) => {
      dispatch(getTimeline(userId))
    },
  }
}

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)

export default FeedContainer
