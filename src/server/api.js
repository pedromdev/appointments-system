import express from 'express';
import pick from 'lodash.pick';
import User from "./models/User";
import jwt from "./configurations/jwt";
import {RESPONSE_ERRORS} from "./constants";

const api = express();

const errorHandler = (req, res) => e => {
  let status = 500;
  let data = { ...e, ...RESPONSE_ERRORS.INTERNAL_SERVER_ERROR };

  if (e.name === 'ValidationError') {
    status = 422;
    data = {
      message: 'Erro na validação dos dados enviados. Por favor, verifique os dados e tente novamente.',
      type: e.name,
      fields: Object.keys(e.errors).map(field => e.errors[field].properties)
    };
  }

  res.status(status).send(data);
};

const generateUserToken = (req, res, status = 200) => user => {
  res.status(status).send({
    token: user.getToken()
  });
};

api.post('/signup', (req, res) => {
  const data = pick(req.body, [
    'name',
    'email',
    'password',
  ]);
  const user = new User(data);
  user.save()
    .then(generateUserToken(req, res, 201))
    .catch(errorHandler(req, res));
});

api.post('/signin', (req, res) => {
  const data = pick(req.body, [
    'email',
    'password',
  ]);
  User.findOne({ email: data.email })
    .then(user => {
      if (!user || !user.checkPassword(data.password)) {
        return res.status(422).send({
          message: 'E-mail e/ou senha incorretos',
          type: 'ValidationError',
          fields: [],
        });
      }

      generateUserToken(req, res)(user);
    })
    .catch(errorHandler(req, res));
});

api.get('/guest', (req, res) => {
  res.send({
    token: jwt.sign({
      sub: 'guest',
      scope: 'auth'
    })
  })
});

export default api;