export const TRANSFER_FUNDS_SUCCESS = 'TRANSFER_FUNDS_SUCCESS';
export const TRANSFER_FUNDS_ERROR = 'TRANSFER_FUNDS_ERROR';

export const transferFundsSuccess = () => ({
  type: TRANSFER_FUNDS_SUCCESS,
});

export const transferFundsError = (error) => ({
  type: TRANSFER_FUNDS_ERROR,
  error,
});

export const transferRequestAsync = (data) => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;

  fetch('http://localhost:3000/transfer-funds', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error === 'Invalid account to') {
        dispatch(
          transferFundsError(
            'Не указан счёт зачисления, или этого счёта не существует.'
          )
        );
      }
      if (data.error === 'Invalid amount') {
        dispatch(
          transferFundsError(
            'Не указана сумма перевода, или она отрицательная.'
          )
        );
      }
      if (data.error === 'Overdraft prevented') {
        dispatch(transferFundsError('Сумма списания больше доступной суммы.'));
      }
    });
};
