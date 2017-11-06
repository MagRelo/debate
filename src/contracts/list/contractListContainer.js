import { connect } from 'react-redux'
import contractListComponent from './contractListComponent'
import {listContracts} from '../ContractActions'

const mapStateToProps = (state, ownProps) => {
  return {
    globalList: state.contracts.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadList: ()=>{
      dispatch(listContracts())
    }
  }
}

const contractListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(contractListComponent)

export default contractListContainer
