import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { render } from 'react-dom';

import {LazyImport} from './src/helpers';
import AppProvider from './src/components/AppProvider/AppProvider';
import { NotFound, BackendError, Signup, Signin, PasswordReset } from './src/pages';

import registerServiceWorker from './registerServiceWorker';

const Dashboard = LazyImport({
  loader: () => import('./src/containers/Dashboard')
});

render(
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
  , document.getElementById('root'));

registerServiceWorker();
