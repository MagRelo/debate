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
    selectUser: (name) => {
      dispatch(selectUser(name))
    },
    getUsers: (name) => {
      dispatch(getUsers(name))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectUserForm)

export default SignUpFormContainer
