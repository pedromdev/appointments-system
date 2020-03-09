import User from '../models/User'
import jwt from '../configurations/jwt'
import { RESPONSE_ERRORS } from '../constants'

export const authenticate = (req, res, next) => {
  if (!jwt.verify(req.header('Authorization'))) {
    return res.status(401).send({
      errors: [RESPONSE_ERRORS.UNAUTHORIZED]
    })
  }

  const token = jwt.decode(req.header('Authorization'))

  if (token.scope !== 'auth') {
    return res.status(401).send({
      errors: [RESPONSE_ERRORS.UNAUTHORIZED]
    })
  }

  req.token = token

  if (token.sub === 'guest') return next()

  User.findById(token.sub)
    .then(user => {
      if (!user) {
        return Promise.reject()
      }

      req.user = user
      next()
    })
    .catch(() => {
      res.status(401).send({
        errors: [RESPONSE_ERRORS.UNAUTHORIZED]
      })
    })
}
