import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'
import { submitUser } from '../../userActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitUser: (name, avatarUrl) => {
      dispatch(submitUser(name, avatarUrl))
    }
  }
}

const SignUpFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)

export default SignUpFormContainer
