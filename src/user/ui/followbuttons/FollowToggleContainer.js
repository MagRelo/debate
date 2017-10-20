import { connect } from 'react-redux'
import followToggle from './followToggle'
import { followUser, unFollowUser, getUsers } from '../../userActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    followUserClick: (event, userId, targetId) => {
      event.preventDefault();
      dispatch(followUser(userId, targetId))
    },
    unFollowUserClick: (event, userId, targetId) => {
      event.preventDefault()
      dispatch(unFollowUser(userId, targetId))
    },
    getUsers: (event) => {
      event.preventDefault()
      dispatch(getUsers())
    }
  }
}

const FollowToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(followToggle)

export default FollowToggleContainer
