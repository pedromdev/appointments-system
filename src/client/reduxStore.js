import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import * as reducers from './ducks';

import multiActions from "./middlewares/multiActions";
import asyncActions from "./middlewares/asyncActions";

const rootReducer = combineReducers(reducers);

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

export default createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      multiActions,
      asyncActions
    )
  )
)