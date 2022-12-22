import { infoIdClearRequest } from '../ext/extAction';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
export const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';
export const AUTH_REQUEST_CREATE_ACC = 'AUTH_REQUEST_CREATE_ACC';

export const authRequset = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = (data) => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestCreateAcc = (data) => ({
  type: AUTH_REQUEST_CREATE_ACC,
  data,
});

export const authRequestError = (err) => ({
  type: AUTH_REQUEST_ERROR,
  err,
});

export const authRequestAsunc = () => (dispatch, getState) => {
  const token = getState().token.token;
  const loading = getState().auth.loading;
  if (!token || loading) return;

  fetch('https://bedecked-spectrum-chill.glitch.me/accounts', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => dispatch(authRequestSuccess(data.payload)));
};

export const authCreateAccAsunc = () => (dispatch, getState) => {
  const token = getState().token.token;
  const loading = getState().auth.loading;
  dispatch(infoIdClearRequest());

  if (!token || loading) return;

  fetch('https://bedecked-spectrum-chill.glitch.me/create-account', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => dispatch(authRequestCreateAcc(data.payload)));
};
