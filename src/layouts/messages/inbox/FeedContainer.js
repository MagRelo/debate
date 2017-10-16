import { connect } from 'react-redux'
import Feed from './Feed'
import { getMessages } from './FeedActions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages
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
