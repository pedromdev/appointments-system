import { createDuck } from 'redux-duck';

const duck = createDuck('locale', 'appointments');

const UPDATE_LOCALE = duck.defineType('UPDATE');

export default duck.createReducer({
  [UPDATE_LOCALE]: (state, action) => {
    const {locale} = action.payload;

    localStorage.setItem('locale', locale);

    return locale;
  }
}, localStorage.getItem('locale') || navigator.language);

export const updateLocale = duck.createAction(UPDATE_LOCALE);