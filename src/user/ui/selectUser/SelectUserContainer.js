import { connect } from 'react-redux'
import SelectUserForm from './SelectUserForm'
import { selectUser, getUsers } from '../../userActions'

const mapStateToProps = (state, ownProps) => {
  return {
    userList: state.user.userList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (userId) => {
      dispatch(selectUser(userId))
    },
    getUsers: (userId) => {
      dispatch(getUsers(userId))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectUserForm)

export default SignUpFormContainer
