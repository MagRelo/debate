import { connect } from 'react-redux'
import CreateForm from './CreateForm'
import { createContract } from '../ContractActions'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitContract: (currentUser, options) => {
      dispatch(createContract(currentUser, options))
    }
  }
}

const CreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm)

export default CreateContainer
