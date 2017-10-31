import { connect } from 'react-redux'
import followToggle from './tokenPriceChart'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const FollowToggleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(followToggle)

export default FollowToggleContainer
