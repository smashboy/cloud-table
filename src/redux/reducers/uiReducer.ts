import { UiEnum } from '../enums';

import { 
  UiStateInterface, DispactchErrorInterface, 
  DispatchLoadingInterface, ErrorInterface,
  DispactchErrorClearInterface 
} from '../interfaces';

const initialState: UiStateInterface = {

  // In loading we save only key of component that should change like current state -> loading state,
  loading: [],

  // In errors we save key and attached message
  // E.g {createTableError: "Unable to create table, please try again later"}
  errors: {}
};

type ReducerDispatchPropsType = DispactchErrorInterface & DispatchLoadingInterface & DispactchErrorClearInterface

/**
 * 
 * UI reducer is needed for separating actual data from UI related data,
 * E.g (errors, components loading state)
 * 
 */
export default (state: UiStateInterface = initialState, { type, payload }: ReducerDispatchPropsType): UiStateInterface => {
  switch (type) {
    case UiEnum.SET_ERROR:
      return {...state, errors: Object.assign({}, state.errors, payload)};
    case UiEnum.CLEAR_ERROR:
      return {
        ...state, 
        errors: Object.keys(state.errors)
        .filter((key: string) => key !== payload)
        .reduce((result: ErrorInterface, current: string) => {
          result[current] = state.errors[current];
          return result;
        }, {})
      };
    case UiEnum.SET_LOADING_UI:
      return {...state, loading: state.loading.concat(payload)};
    case UiEnum.CLEAR_LOADING_UI:
      return {...state, loading: state.loading.filter(loader => loader !== payload)};
    default:
      return state;
  }
}