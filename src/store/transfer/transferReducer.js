import { TRANSFER_FUNDS_ERROR, TRANSFER_FUNDS_SUCCESS } from './transferAction';

const initialState = {
  loading: false,
  error: '',
};

export const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSFER_FUNDS_SUCCESS:
      return {
        loading: true,
        error: '',
      };
    case TRANSFER_FUNDS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
