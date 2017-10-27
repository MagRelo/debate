import { connect } from 'react-redux'
import WalletListComponent from './walletListComponent'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const walletListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletListComponent)

export default walletListContainer
