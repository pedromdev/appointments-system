import { createDuck } from 'redux-duck';

const duck = createDuck('locale', 'appointments');

export const UPDATE_LOCALE = duck.defineType('UPDATE');

const initialLocale = localStorage.getItem('locale') || navigator.language;

export default duck.createReducer({
  [UPDATE_LOCALE]: (state, action) => {
    const {locale} = action.payload;

    localStorage.setItem('locale', locale);

    return locale;
  }
}, initialLocale);

export const updateLocale = duck.createAction(UPDATE_LOCALE);