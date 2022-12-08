import { setToken } from '../../api/token';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const ERROR_AUTH = 'ERROR_AUTH';
export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';

export const succesToken = () => ({
  type: SUCCESS_TOKEN,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
  token: '',
});
export const tokenMiddlewere = (store) => (next) => (action) => {
  if (action.type === UPDATE_TOKEN) {
    setToken(action.token);
  }
  if (action.type === DELETE_TOKEN) {
    setToken('');
  }

  next(action);
};

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  token,
});

export const errorAuth = (error) => ({
  type: ERROR_AUTH,
  error,
});

export const tokenRequestAsunc = (login, password) => (dispatch, getState) => {
  if (!login || !password) return;
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.payload) {
        dispatch(updateToken(data.payload.token));
      } else {
        dispatch(errorAuth(data.error));
      }
    })
    .catch((err) => {
      console.log('Ошибка ', err);
    });
};
