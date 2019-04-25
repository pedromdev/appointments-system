export default store => next => action =>
  Array.isArray(action) ?
    action.filter(Boolean).forEach(store.dispatch) :
    next(action);