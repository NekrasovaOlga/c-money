export const ALL_CURRENCIES_SUCCESS = 'ALL_CURRENCIES_SUCCESS';
export const ALL_CURRENCIES_ERROR = 'ALL_CURRENCIES_ERROR';

export const ALL_CURRENCIES = 'ALL_CURRENCIES';
export const ALL_CURRENCIES_FEED = 'ALL_CURRENCIES_FEED';
export const ALL_CURRENCIES_USER = 'ALL_CURRENCIES_USER';
export const INFO_ID = 'INFO_ID';
export const INFO_ID_CLEAR = 'INFO_ID_CLEAR';
export const INFO_ID_REQUEST = 'INFO_ID_REQUEST';

const socket = new WebSocket(
  'wss://bedecked-spectrum-chill.glitch.me/currency-feed'
);

export const allCurrenciesSuccess = () => ({
  type: ALL_CURRENCIES_SUCCESS,
});

export const infoIdClearRequest = () => ({
  type: INFO_ID_CLEAR,
});

export const allCurrenciesError = (error) => ({
  type: ALL_CURRENCIES_ERROR,
  error,
});

export const allCurrenciesRequest = (data) => ({
  type: ALL_CURRENCIES,
  data,
});

export const allCurrenciesFeedRequest = (data) => ({
  type: ALL_CURRENCIES_FEED,
  data,
});

export const allCurrenciesUserRequest = (currentUser) => ({
  type: ALL_CURRENCIES_USER,
  currentUser,
});

export const infoIDRequest = (id) => ({
  type: INFO_ID,
  id,
});

export const infoIDRequestCart = (data) => ({
  type: INFO_ID_REQUEST,
  data,
});
export const allCurrenciesAsuncRequest = () => (dispatch, getState) => {
  fetch('https://bedecked-spectrum-chill.glitch.me/all-currencies', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const list = data.payload.map((item) => {
        return { from: item, to: item, rate: 0, change: 0 };
      });
      dispatch(allCurrenciesRequest(list));
    });
};

export const currencyFeedAsuncRequest = () => (dispatch, getState) => {
  const data = getState().ext.data;

  if (data.length === 0) return;
  socket.onmessage = function (event) {
    const currencyFeed = JSON.parse(event.data);
    dispatch(allCurrenciesFeedRequest(currencyFeed));
  };
};

export const currencyUserAsuncRequest = () => (dispatch, getState) => {
  const token = getState().token.token;
  if (!token) return;

  fetch('https://bedecked-spectrum-chill.glitch.me/currencies', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const list = Object.values(data.payload);
      dispatch(allCurrenciesUserRequest(list));
    });
};

export const currencBuyAsync = (data) => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;
  fetch('https://bedecked-spectrum-chill.glitch.me/currency-buy', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.payload) {
        const list = Object.values(data.payload);
        dispatch(allCurrenciesUserRequest(list));
      } else {
        if (data.error === 'Invalid amount') {
          dispatch(allCurrenciesError('Неверная сумма перевода.'));
        }
        if (data.error === 'Not enough currency') {
          dispatch(
            allCurrenciesError('На валютном счете недостаточно средств.')
          );
        }
        if (data.error === 'Overdraft prevented') {
          dispatch(
            allCurrenciesError('Сумма списания больше доступной суммы.')
          );
        }
      }
    });
};

export const accounIdAsuncRequest = (newId) => (dispatch, getState) => {
  let id = getState().ext.id;
  if (newId) {
    id = newId;
  }
  const token = getState().token.token;

  if (!token || !id) return;

  fetch(`https://bedecked-spectrum-chill.glitch.me/account/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(infoIDRequestCart(data.payload));
    });
};
