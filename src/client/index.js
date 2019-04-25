import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';

import registerServiceWorker from './registerServiceWorker';

import store from './reduxStore';
import client from './apolloClient';

import {LazyImport} from './helpers';
import AppProvider from './components/AppProvider/AppProvider';
import { NotFound, BackendError, Signup, Signin, PasswordReset } from './pages';

import './assets/scss/main.scss';

const Dashboard = LazyImport({
  loader: () => import('./containers/Dashboard')
});

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
