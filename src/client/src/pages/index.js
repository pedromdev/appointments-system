import {LazyImport} from '../helpers'

// // Authentication
const PasswordReset = LazyImport({
  loader: () => import('./Authentication/PasswordReset')
});
const Signin = LazyImport({
  loader: () => import('./Authentication/Signin')
});
const Signup = LazyImport({
  loader: () => import('./Authentication/Signup')
});

// Errors
const NotFound = LazyImport({
  loader: () => import('./Errors/NotFound')
});
const BackendError = LazyImport({
  loader: () => import('./Errors/BackendError')
});

export {
  PasswordReset,
  Signin,
  Signup,
  NotFound,
  BackendError
}