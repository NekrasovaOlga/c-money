import {
  ALL_CURRENCIES,
  ALL_CURRENCIES_ERROR,
  ALL_CURRENCIES_FEED,
  ALL_CURRENCIES_SUCCESS,
  ALL_CURRENCIES_USER,
  INFO_ID,
  INFO_ID_CLEAR,
  INFO_ID_REQUEST,
} from './extAction';

const initialState = {
  data: [],
  currentUser: [],
  id: '',
  infoCart: [],
  error: '',
};

export const extReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_CURRENCIES_SUCCESS:
      return {
        ...state,
        error: '',
      };
    case INFO_ID_CLEAR:
      return {
        ...state,
        infoCart: '',
      };
    case ALL_CURRENCIES_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ALL_CURRENCIES:
      return {
        ...state,
        data: action.data,
      };
    case ALL_CURRENCIES_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case INFO_ID:
      return {
        ...state,
        id: action.id,
      };
    case INFO_ID_REQUEST:
      return {
        ...state,
        infoCart: action.data,
      };
    case ALL_CURRENCIES_FEED:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.from === action.data.from) {
            return {
              from: item.from,
              to: action.data.to,
              rate: action.data.rate,
              change: action.data.change,
            };
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};
