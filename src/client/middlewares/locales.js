import counterpart from 'counterpart';
import {UPDATE_LOCALE} from '../ducks/locale';

let addedLocales = [];

export default store => next => action => {
  if (action.type === UPDATE_LOCALE) {
    let promise;

    switch (action.payload.locale) {
      case 'en':
        promise = import('../locales/en');
        break;
      case 'pt':
        promise = import('../locales/pt');
        break;
    }

    if (promise instanceof Promise) {
      return promise.then(({default: locale}) => {
        if (addedLocales.indexOf(action.payload.locale) > -1) return;

        counterpart.registerTranslations(action.payload.locale, locale);
        counterpart.setLocale(action.payload.locale);
        addedLocales.push(action.payload.locale);
        next(action);
      });
    }
  }

  next(action);
}