import { connect } from 'react-redux'
import CreateForm from './CreateForm'
import { createContract } from '../ContractActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitContract: (options) => {
      dispatch(createContract(options))
    }
  }
}

const CreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm)

export default CreateContainer
