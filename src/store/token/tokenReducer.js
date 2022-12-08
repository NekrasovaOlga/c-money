import {
  DELETE_TOKEN,
  ERROR_AUTH,
  SUCCESS_TOKEN,
  UPDATE_TOKEN,
} from './tokenAction';

const initialState = {
  token: '',
  error: '',
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_TOKEN:
      return {
        ...state,
        error: '',
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
        error: '',
      };
    case DELETE_TOKEN:
      return {
        ...state,
        token: '',
        error: '',
      };
    case ERROR_AUTH:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
