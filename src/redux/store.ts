import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { MakeStore } from 'next-redux-wrapper';

import tableReducer from './reducers/tableReducer';
import uiReducer from './reducers/uiReducer';

const middleware = [thunk];

const reducers = combineReducers({
  table: tableReducer,
  ui: uiReducer
});

export type storeStateType = ReturnType<typeof reducers>;

/**
* @param initialState the store's initial state (on the client side, the state of the server-side store is passed here)
*/
export const makeStore: MakeStore = (initialState: storeStateType): Store => (
  createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
));