import { authRequestAsunc, authRequestSuccess } from '../auth/authAction';

export const TRANSFER_FUNDS_SUCCESS = 'TRANSFER_FUNDS_SUCCESS';
export const TRANSFER_FUNDS_SUCCESS_MODAL = 'TRANSFER_FUNDS_SUCCESS_MODAL';

export const TRANSFER_FUNDS_ERROR = 'TRANSFER_FUNDS_ERROR';

export const transferFundsSuccess = () => ({
  type: TRANSFER_FUNDS_SUCCESS,
});

export const transferFundsSuccessModal = (success) => ({
  type: TRANSFER_FUNDS_SUCCESS_MODAL,
  success,
});

export const transferFundsError = (error) => ({
  type: TRANSFER_FUNDS_ERROR,
  error,
});

export const transferRequestAsync = (data) => (dispatch, getState) => {
  const token = getState().token.token;

  if (!token) return;
  dispatch(authRequestAsunc());
  fetch('https://bedecked-spectrum-chill.glitch.me/transfer-funds', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.payload) {
        dispatch(transferFundsSuccessModal(true));
      }
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
