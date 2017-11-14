import { connect } from 'react-redux'
import CreateForm from './CreateForm'
import { createContract, generateWords } from '../ContractActions'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.data,
    searchWords: state.contracts.searchWords
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitContract: (currentUser, options) => {
      dispatch(createContract(currentUser, options))
    },
    getSearchWords: () => {
      dispatch(generateWords())
    }
  }
}

const CreateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm)

export default CreateContainer
