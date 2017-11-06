import { connect } from 'react-redux'
import tokenDetailComponent from './tokenDetailComponent'
import { followUser, unFollowUser} from '../../userActions'

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.data._id,
    availableBalance: state.user.data.balance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buyTokens: (userId, targetId, tokens) => {
      dispatch(followUser(userId, targetId, tokens))
    },
    sellTokens: (userId, targetId, tokens) => {
      dispatch(unFollowUser(userId, targetId, tokens))
    },
    burnTokens: (userId, targetId, tokens) => {
      console.warn("TBD!")
    }
  }
}

const tokenDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(tokenDetailComponent)

export default tokenDetailContainer
