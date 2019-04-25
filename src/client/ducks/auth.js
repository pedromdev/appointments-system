import { createDuck } from 'redux-duck';
import axios from "axios/index";

const duck = createDuck('auth', 'appointments');

const UPDATE_TOKEN = duck.defineType('UPDATE_TOKEN');

export default duck.createReducer({
  [UPDATE_TOKEN]: (state, action) => {
    const { token } = action.payload;

    localStorage.setItem('token', token);

    return { ...state, token };
  }
}, {
  token: localStorage.getItem('token')
});

export const updateToken = duck.createAction(UPDATE_TOKEN);

export const signup = async (name, email, password) => {
  const { data } = await axios.post('/api/signup', { name, email, password });

  return updateToken(data);
};

export const signin = async (email, password) => {
  const { data } = await axios.post('/api/signin', { email, password });

  return updateToken(data);
};

export const guest = async () => {
  const { data } = await axios.get('/api/guest');

  return updateToken(data);
};