import { connect } from 'react-redux'
import Detail from './Layout'
// import { commentSubmit } from '../MessageActions'

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.messages,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onCommentSubmit: (text) => {
    //   dispatch(commentSubmit(text))
    // }
  }
}

const DetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)

export default DetailContainer
