const ADD_LISTENER = 'ADD_LISTENER'

export const addListener = (listenerId) => {
  return {
    type: ADD_LISTENER,
    listenerId,
  }
}

const listeners = (state = {}, action) => {
  switch (action.type) {
    case ADD_LISTENER :
      return {
        ...state,
        [action.listenerId]: true,
      }
    default :
      return state
  }
}

export default listeners
