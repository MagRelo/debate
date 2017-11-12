import { connect } from 'react-redux'
import tokenDetailComponent from './tokenDetailComponent'
import { buyTokens, sellTokens, burnTokens, drainEscrow } from '../ContractActions'

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyTokens: (currentUser, targetId, tokensToPurchase, payment) => {
      dispatch(buyTokens(currentUser, targetId, tokensToPurchase, payment))
    },
    sellTokens: (currentUser, targetId, tokens) => {
      dispatch(sellTokens(currentUser, targetId, tokens))
    },
    burnTokens: (currentUser, targetId, tokens) => {
      dispatch(burnTokens(currentUser, targetId, tokens))
    },
    drainEscrow: (currentUser, targetId, spendAmount) => {
      dispatch(spendEscrow(currentUser, targetId, spendAmount))
    }

  }
}

const tokenDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(tokenDetailComponent)

export default tokenDetailContainer
