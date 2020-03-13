import User from '../models/User'
import jwt from '../configurations/jwt'
import { RESPONSE_ERRORS } from '../constants'
import pick from 'lodash.pick'

export const authenticate = async (req, res) => {
  const jwtToken = req.header('Authorization')

  if (!jwt.verify(jwtToken)) {
    return res.status(401).send({
      errors: [RESPONSE_ERRORS.UNAUTHORIZED]
    })
  }

  const token = jwt.decode(jwtToken)

  if (token.scope !== 'auth') {
    return res.status(401).send({
      errors: [RESPONSE_ERRORS.UNAUTHORIZED]
    })
  }

  req.token = token

  if (token.sub !== 'guest') {
    req.user = await User.findById(token.sub)

    if (!req.user) {
      return res.status(401).send({
        errors: [RESPONSE_ERRORS.UNAUTHORIZED]
      })
    }
  }

  return pick(req, ['user', 'token'])
}
