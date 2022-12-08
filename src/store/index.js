import {
  combineReducers,
  createStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import { tokenReducer } from './token/tokenReducer';
import { tokenMiddlewere } from './token/tokenAction';

import { authReducer } from './auth/authReducer';

import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { extReducer } from './ext/extReducer';
import { transferReducer } from './transfer/transferReducer';

const rootReducer = combineReducers({
  token: tokenReducer,
  auth: authReducer,
  ext: extReducer,
  transfer: transferReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(tokenMiddlewere, thunkMiddleware))
);
