import {createDuck} from 'redux-duck';

const duck = createDuck('validation-errors', 'appointments');

const UPDATE_VALIDATION_ERRORS = duck.defineType('UPDATE');

export default duck.createReducer({
  [UPDATE_VALIDATION_ERRORS]: (state, action) => {
    return action.payload;
  }
}, {})

export const updateValidationErrors = duck.createAction(UPDATE_VALIDATION_ERRORS);

