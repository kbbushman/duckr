import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'

// class ModalContainer extends Component {
//   render () {
//     return (
//       <Modal />
//     )
//   }
// }

const mapStateToProps = ({modal, users}, props) => {
  const duckTextLength = modal.duckText.length
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({...modalActionCreators, ...ducksActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
