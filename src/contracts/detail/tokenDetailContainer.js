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
      console.warn("burn TBD!")
    },
    drainEscrow: (targetId, tokens) => {
      console.warn("drain TBD!")
    }

  }
}

const tokenDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(tokenDetailComponent)

export default tokenDetailContainer
