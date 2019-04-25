import {updateValidationErrors} from "../ducks/validationErrors";

export default store => next => action =>
  action instanceof Promise ?
    action.then(data => {
      store.dispatch([
        updateValidationErrors({}),
        data
      ])
    }).catch(e => {
      if (e.response && e.response.data.type === 'ValidationError') {
        return store.dispatch(updateValidationErrors(e.response.data))
      }

      throw e;
    }) :
    next(action);