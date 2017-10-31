import { connect } from 'react-redux'
import followToggle from './followToggle'
import { followUser, unFollowUser, getUsers } from '../../userActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    followUserClick: (event, userId, targetId, tokens) => {
      event.preventDefault();
      dispatch(followUser(userId, targetId, tokens))
    },
    unFollowUserClick: (event, userId, targetId, tokens) => {
      event.preventDefault()
      dispatch(unFollowUser(userId, targetId, tokens))
    }
  }
}

const FollowToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(followToggle)

export default FollowToggleContainer
