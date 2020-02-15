import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MakeStore } from 'next-redux-wrapper';

import tableReducer from './reducers/tableReducer';
import uiReducer from './reducers/uiReducer';

import { TableHistoryStateInterface, UiStateInterface } from './interfaces';

const middleware = [thunk];

const reducers = combineReducers({
  table: tableReducer,
  ui: uiReducer
});

export interface storeStateInterface {
  table: TableHistoryStateInterface
  ui: UiStateInterface
}

/**
* @param initialState the store's initial state (on the client side, the state of the server-side store is passed here)
*/

export const makeStore: MakeStore = (initialState: storeStateInterface) => (
  createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
));