import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { storeStateType } from './store';
import TableModel from '../../models/Table/Table';
import { UiEnum, TableEnum, ErrorKeysEnum, LoadingKeysEnum } from './enums';

type MyExtraArg = undefined;
export type MyThunkResultType<R> = ThunkAction<R, storeStateType, MyExtraArg, Action>;

// It is important to use Action as last type argument, does not work with any.
export type MyThunkDispatchType = ThunkDispatch<storeStateType, MyExtraArg, Action>;

// Dispatches -> Table
export type DispatchGeneratedTableType = {
  type: TableEnum.SET_GENERATED_TABLE,
  payload: TableModel
}
  
export type DispatchClearTableType = {
  type: TableEnum.CLEAR_ALL_CELLS
}
  
// Dispatches -> UI
export type DispactchErrorType = {
  type: UiEnum.SET_ERROR,
  payload: ErrorType
}
  
export type DispactchErrorClearType = {
  type: UiEnum.CLEAR_ERROR,
  payload: ErrorKeysEnum
}
  
export type DispatchLoadingType = {
  type: UiEnum.SET_LOADING_UI,
  payload: LoadingKeysEnum
}
  
export type DispatchLoadingClearType = {
  type: UiEnum.CLEAR_LOADING_UI,
  payload: LoadingKeysEnum
}
  
// Action props
export type GenerateTableActionPropsType = {
  rowsAmount: number,
  colsAmount: number,
  data?: string[][],
  validateDataOnly?: boolean
}
  
// other 
export type ErrorType = {
  [key: string]: string
}