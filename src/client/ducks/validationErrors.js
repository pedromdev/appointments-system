import {createDuck} from 'redux-duck';

const duck = createDuck('validation-errors', 'appointments');

const ADD_ERROR = duck.defineType('ADD');
const UPDATE_VALIDATION_ERRORS = duck.defineType('UPDATE');

export default duck.createReducer({
  [ADD_ERROR]: (state, action) => {
    if (!Array.isArray(state.fields)) state.fields = [];

    state.fields.push(action.payload);
    return { ...state };
  },
  [UPDATE_VALIDATION_ERRORS]: (state, action) => {
    return action.payload;
  }
}, {})

export const addError = duck.createAction(ADD_ERROR);
export const updateValidationErrors = duck.createAction(UPDATE_VALIDATION_ERRORS);

