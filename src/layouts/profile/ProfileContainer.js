import { connect } from 'react-redux'
import Profile from './Profile'
import getUsers from '../../user/userActions'


const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.data,
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
