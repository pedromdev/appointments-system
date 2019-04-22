import {LazyImport} from '../helpers'

// // Authentication
const PasswordReset = LazyImport({
  loader: () => import('./Authentication/PasswordReset')
});
const Signin = LazyImport({
  loader: () => import('./Authentication/Signin')
});
const Signup = LazyImport({
  loader: () => import('./Authentication/Signin')
});

// Errors
const NotFound = LazyImport({
  loader: () => import('./Errors/NotFound')
});
const BackendError = LazyImport({
  loader: () => import('./Errors/BackendError')
});

// export {default as PasswordReset} from './Authentication/PasswordReset';
// export {default as Signin} from './Authentication/Signin';
// export {default as Signup} from './Authentication/Signup';
// export {default as NotFound} from './Errors/NotFound';
// export {default as BackendError} from './Errors/BackendError';

export {
  PasswordReset,
  Signin,
  Signup,
  NotFound,
  BackendError
}