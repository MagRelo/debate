import { connect } from 'react-redux'
import tokenDetailComponent from './tokenDetailComponent'
import { buyTokens, sellTokens, burnTokens, drainEscrow } from '../ContractActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyTokens: (targetId, tokensToPurchase, payment) => {
      dispatch(buyTokens(targetId, tokensToPurchase, payment))
    },
    sellTokens: (targetId, tokens) => {
      dispatch(sellTokens(targetId, tokens))
    },
    burnTokens: (targetId, tokens) => {
      dispatch(burnTokens(targetId, tokens))
    },
    drainEscrow: (targetId, spendAmount) => {
      dispatch(spendEscrow(targetId, spendAmount))
    }

  }
}

const tokenDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(tokenDetailComponent)

export default tokenDetailContainer
