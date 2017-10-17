import { connect } from 'react-redux'
import Feed from './FeedLayout'
import { getMessages } from './FeedActions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.user.messages,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: () => {
      dispatch(getMessages())
    }
  }
}

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)

export default FeedContainer
