import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ApolloProvider} from 'react-apollo';
import counterpart from 'counterpart';

import registerServiceWorker from './registerServiceWorker';

import store from './reduxStore';
import client from './apolloClient';

import {LazyImport} from './helpers';
import AppProvider from './components/AppProvider/AppProvider';
import {BackendError, NotFound, PasswordReset, Signin, Signup} from './pages';

import {updateLocale} from './ducks/locale';

import './assets/scss/main.scss';

const Dashboard = LazyImport({
  loader: () => import('./containers/Dashboard')
});

const locale = localStorage.getItem('locale') || navigator.language;

store.dispatch(updateLocale({locale}));

let Root = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/404" component={NotFound} />
            <Route exact path="/500" component={BackendError} />
            <Route exact path="/forgot" component={PasswordReset} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
      </AppProvider>
    </ApolloProvider>
  </Provider>
);

render(
  <Root/>,
  document.getElementById('root')
);

registerServiceWorker();
