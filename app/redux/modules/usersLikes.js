import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementNumberOfLikes, decrementNumberOfLikes,
} from 'helpers/api'

export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_FAILURE = 'FETCHING_LIKES_FAILURE'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

export const fetchingLikes = () => {
  return {
    type: FETCHING_LIKES,
  }
}

export const fetchingLikesFailure = (error) => {
  console.warn(error)
  return {
    type: FETCHING_LIKES_FAILURE,
    error: 'Error fetching likes',
  }
}

export const fetchingLikesSuccess = (likes) => {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes,
  }
}

export const addLike = (duckId) => {
  return {
    type: ADD_LIKE,
    duckId,
  }
}

export const removeLike = (duckId) => {
  return {
    type: REMOVE_LIKE,
    duckId,
  }
}

export const addAndHandleLike = (duckId, e) => {
  e.stopPropagation()
  return (dispatch, getState) => {
    dispatch(addLike(duckId))

    const uid = getState().users.authedId
    Promise.all([
      saveToUsersLikes(uid, duckId),
      incrementNumberOfLikes(duckId),
    ]).catch((error) => {
      console.warn(error)
      dispatch(removeLike(duckId))
    })
  }
}

export const handleDeleteLike = (duckId, e) => {
  e.stopPropagation()
  return (dispatch, getState) => {
    dispatch(removeLike(duckId))

    const uid = getState().users.authedId
    Promise.all([
      deleteFromUsersLikes(uid, duckId),
      decrementNumberOfLikes(duckId),
    ]).catch((error) => {
      console.warn(error)
      dispatch(addLike(duckId))
    })
  }
}

export const setUsersLikes = () => {
  return (dispatch, getState) => {
    const uid = getState().users.authedId
    dispatch(fetchingLikes)
    fetchUsersLikes(uid)
      .then((likes) => dispatch(fetchingLikesSuccess(likes)))
      .catch((error) => dispatch(fetchingLikesFailure(error)))
  }
}

const initialState = {
  isFetching: false,
  error: '',
}

const usersLikes = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_LIKES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: '',
        ...action.likes,
      }
    case ADD_LIKE:
      return {
        ...state,
        [action.duckId]: true,
      }
    case REMOVE_LIKE:
      return Object.keys(state)
        .filter((duckId) => action.duckId !== duckId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default:
      return state
  }
}

export default usersLikes
