const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_DUCK_TEXT = 'UPDATE_DUCK_TEXT'

export const openModal = () => {
  return {
    type: OPEN_MODAL,
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  }
}

export const updateDuckText = (newDuckText) => {
  return {
    type: UPDATE_DUCK_TEXT,
    newDuckText,
  }
}

const initialState = {
  duckText: '',
  isOpen: false,
}

const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL :
      return {
        duckText: '',
        isOpen: false,
      }
    case UPDATE_DUCK_TEXT :
      return {
        ...state,
        duckText: action.newDuckText,
      }
    default :
      return state
  }
}

export default modal
