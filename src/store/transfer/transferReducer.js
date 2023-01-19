import {
  TRANSFER_FUNDS_ERROR,
  TRANSFER_FUNDS_SUCCESS,
  TRANSFER_FUNDS_SUCCESS_MODAL,
} from './transferAction';

const initialState = {
  loading: false,
  error: '',
  success: false,
};

export const transferReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSFER_FUNDS_SUCCESS:
      return {
        loading: true,
        error: '',
        success: false,
      };
    case TRANSFER_FUNDS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case TRANSFER_FUNDS_SUCCESS_MODAL:
      console.log(action);
      return {
        ...state,
        success: true,
      };
    default:
      return state;
  }
};
