import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal'
import {
  newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import { formatDuck } from 'helpers/utils'

ReactModal.setAppElement('#app')

const Modal = (props) => {
  const submitDuck = () => {
    // console.log('Duck', props.duckText)
    // console.log('User', props.user)
    props.duckFanout(formatDuck(props.duckText, props.user))
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      Duck
      <ReactModal
        style={modalStyles}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel='Modal'>
        <div className={newDuckTop}>
          <span>Compose new Duck</span>
          <span className={pointer} onClick={props.closeModal}>X</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
            Duck
        </button>
      </ReactModal>
    </span>
  )
}

const modalStyles = {
  content: {
    width: 350,
    height: 220,
    margin: '0 auto',
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

const { object, string, func, bool } = PropTypes
Modal.propTypes = {
  duckText: string.isRequired,
  isOpen: bool.isRequired,
  user: object.isRequired,
  isSubmitDisabled: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
  updateDuckText: func.isRequired,
  duckFanout: func.isRequired,
}

export default Modal
