import { connect } from 'react-redux'
import FormComponent from './formComponent'
import { followUser, unFollowUser} from '../../userActions'

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

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormComponent)

export default FormContainer
