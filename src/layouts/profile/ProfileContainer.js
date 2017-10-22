import { connect } from 'react-redux'
import Profile from './Profile'
import getUsers from '../../user/userActions'


const mapStateToProps = (state, ownProps) => {
  return {
    userList: state.user.userList,
    userActivity: state.messages.userFeed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers:()=>{
      dispatch(getUsers())
    }
  }
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer
