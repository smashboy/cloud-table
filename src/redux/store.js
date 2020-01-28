import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import environment from '../utils/environment';

import tableReducer from './reducers/tableReducer';
import UIReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  table: tableReducer,
  ui: UIReducer
});

const store = createStore(
  reducers,
  initialState,
  environment.production ?
    compose(applyMiddleware(...middleware))
      :
    // DON'T FORGET to install redux dev tools chrome extension before running npm start
    // We dont need dev tools in prod
    // also they will break app in prod
    // Tools: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru
    compose(
      applyMiddleware(...middleware), 
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;