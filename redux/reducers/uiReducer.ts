import { UiEnums } from '../enums';

import { 
  UiStateInterface, DispactchErrorInterface, 
  DispatchLoadingInterface, ErrorInterface 
} from '../interfaces';

const initialState: UiStateInterface = {

  // In loading we save only key of component that should change like current state -> loading state,
  loading: [],

  // In errors we save key and attached message
  // E.g {createTableError: "Unable to create table, please try again later"}
  errors: {}
};

type ReducerDispatchProps = DispactchErrorInterface | DispatchLoadingInterface | any

/**
 * 
 * UI reducer is needed for separating actual data from UI related data,
 * E.g (errors, components loading state)
 * 
 */
export default (state: UiStateInterface = initialState, { type, payload }: ReducerDispatchProps): UiStateInterface => {
  switch (type) {
    case UiEnums.SET_ERROR:
      return {...state, errors: Object.assign({}, state.errors, payload)};
    case UiEnums.CLEAR_ERROR:
      return {
        ...state, 
        errors: Object.keys(state.errors)
        .filter((key: string) => key !== payload)
        .reduce((result: ErrorInterface, current: string) => {
          result[current] = state.errors[current];
          return result;
        }, {})
      };
    case UiEnums.SET_LOADING_UI:
      return {...state, loading: state.loading.concat(payload)};
    case UiEnums.CLEAR_LOADING_UI:
      return {...state, loading: state.loading.filter(loader => loader !== payload)};
    default:
      return state;
  }
}