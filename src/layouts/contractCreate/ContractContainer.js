import { connect } from 'react-redux'
import Contract from './Contract'

import { getContract } from '../../contracts/ContractActions'


const mapStateToProps = (state, ownProps) => {
  return {
    selectedContract: state.contracts.contract || {'contractOptions': {}}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContract: (contractId) => {
      dispatch(getContract(contractId))
    }
  }
}

const ContractContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Contract)

export default ContractContainer
