import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = ({ email, password }, callback) => async dispatch => {
  return axios.post('http://localhost:3090/signup', { email, password })
    .then((response) => {
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem('token', response.data.token);
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.error });
    });
};

export const signin = ({ email, password }, callback) => async dispatch => {
  return axios.post('http://localhost:3090/signin', { email, password })
    .then((response) => {
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem('token', response.data.token);
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.error });
    });
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};
