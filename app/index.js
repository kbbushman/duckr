import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import getRoutes from './config/routes'
import restricted from 'helpers/restricted'
import * as reducers from 'redux/modules'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(combineReducers(reducers), composeEnhancers(
  applyMiddleware(thunk)
))

const checkAuth = (component) => {
  return restricted(component, store)
}

ReactDom.render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app')
)
