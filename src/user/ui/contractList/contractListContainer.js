import { connect } from 'react-redux'
import contractListComponent from './contractListComponent'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const contractListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(contractListComponent)

export default contractListContainer
