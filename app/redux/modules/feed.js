import { addListener } from 'redux/modules/listeners'
import { listenToFeed, removeListenToFeed } from 'helpers/api'
import { addMultipleDucks } from 'redux/modules/ducks'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const REMOVE_FEED_LISTENER = 'REMOVE_FEED_LISTENER'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

export const settingFeedListener = () => {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

export const settingFeedListenerError = (error) => {
  console.warn(error)
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feeds.',
  }
}

export const settingFeedListenerSuccess = (duckIds) => {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds,
  }
}

export const removeFeedListener = (duckIds) => {
  return {
    type: REMOVE_FEED_LISTENER,
  }
}

export const addNewDuckIdToFeed = (duckId) => {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId,
  }
}

export const resetNewDucksAvailable = () => {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE,
  }
}

export const setAndHandleFeedListener = () => {
  return (dispatch, getState) => {
    if (getState().listeners.feed === true) {
      return
    }

    dispatch(addListener('feed'))
    dispatch(settingFeedListener())

    listenToFeed(({feed, sortedIds}, initialFetch) => {
      dispatch(addMultipleDucks(feed))
      initialFetch === true
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewDuckIdToFeed(sortedIds[0]))
      initialFetch = false
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

export const handleRemoveFeedListener = () => {
  return dispatch => {
    dispatch(removeFeedListener())
    removeListenToFeed()
  }
}

const initialState = {
  newDucksAvailable: false,
  newDucksToAdd: [],
  isFetching: false,
  error: '',
  duckIds: [],
}

const feed = (state = initialState, action) => {
  switch (action.type) {
    case SETTING_FEED_LISTENER :
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_FEED_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_FEED_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      }
    case REMOVE_FEED_LISTENER :
      return {
        ...state,
        isFetching: false,
      }
    case ADD_NEW_DUCK_ID_TO_FEED :
      return {
        ...state,
        newDucksToAdd: [action.duckId, ...state.newDucksToAdd],
        newDucksAvailable: true,
      }
    case RESET_NEW_DUCKS_AVAILABLE :
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksToAdd: [],
        newDucksAvailable: false,
      }
    default :
      return state
  }
}

export default feed
