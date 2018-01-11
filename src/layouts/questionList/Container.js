import { connect } from 'react-redux'
import ContractList from './ContractList'

import { listContracts } from '../../contracts/ContractActions'


const mapStateToProps = (state, ownProps) => {
  return {
    selectedContract: state.contracts.contract || {'contractOptions': {}}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getList: () => {
      dispatch(listContracts())
    }
  }
}

const ContractListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractList)

export default ContractListContainer
