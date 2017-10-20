import { connect } from 'react-redux'
import UserLayout from './UserLayout'

const mapStateToProps = (state, ownProps) => {
  return {
    feedList: state.messages.userFeed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const NetworkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLayout)

export default NetworkContainer
