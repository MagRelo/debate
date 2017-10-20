import { connect } from 'react-redux'
import Network from './Network'
import getUsers from '../../user/userActions'


const mapStateToProps = (state, ownProps) => {
  return {
    feedList: state.messages.networkFeed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers:()=>{
      dispatch(getUsers())
    }
  }
}

const NetworkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Network)

export default NetworkContainer
