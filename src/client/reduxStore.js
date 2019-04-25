import { createStore, combineReducers, applyMiddleware } from 'redux';

import * as reducers from './ducks';

import multiActions from "./middlewares/multiActions";
import asyncActions from "./middlewares/asyncActions";

const rootReducer = combineReducers(reducers);

export default createStore(
  rootReducer,
  applyMiddleware(
    multiActions,
    asyncActions
  )
)