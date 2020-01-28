/**
 * 
 * UI reducer is needed for separating actual data from UI related data,
 * E.g (errors, components loading state)
 * 
 */

import { 
  SET_ERROR, CLEAR_ERROR,
  SET_LOADING_UI, CLEAR_LOADING_UI
} from '../constants';

const initialState = {

  // In loading we save only key of component that should change like current state -> loading state,
  loading: [],

  // In errors we save key and attached message
  // E.g {createTableError: "Unable to create table, please try again later"}
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERROR:
      return {...state, errors: Object.assign({}, state.errors, payload)};
    case CLEAR_ERROR:
        if (state.errors[payload]) {
          delete state.errors[payload];
        }
      return {...state, errors: state.errors};
    case SET_LOADING_UI:
      return {...state, loading: state.loading.concat(payload)};
    case CLEAR_LOADING_UI:
      return {...state, loading: state.loading.filter(loader => loader !== payload)};
    default:
      return state;
  }
}