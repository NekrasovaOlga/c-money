import {
  AUTH_REQUEST,
  AUTH_REQUEST_CREATE_ACC,
  AUTH_REQUEST_ERROR,
  AUTH_REQUEST_SUCCESS,
} from './authAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        loading: true,
        error: '',
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: '',
      };
    case AUTH_REQUEST_CREATE_ACC:
      return {
        ...state,
        data: [...state.data, action.data],
        loading: false,
        error: '',
      };
    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};
