import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, Dispatch } from 'redux';

import { storeStateType } from './store';
import TableModel from '../../models/Table/Table';
import CellModel from '../../models/Table/Cell';
import { UiEnum, TableEnum, ErrorKeysEnum, LoadingKeysEnum } from './enums';

// Redux Thunk
type MyExtraArg = undefined;
export type MyThunkResultType<R> = ThunkAction<R, storeStateType, MyExtraArg, Action>;

// It is important to use Action as last type argument, does not work with any.
export type MyThunkDispatchType = ThunkDispatch<storeStateType, MyExtraArg, Action>;

// Thunk get global state function type
export type GetStateThunkType = () => storeStateType

// Dispatches -> Editor
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

//Actions
export type GenerateTableActionType = ({}: { rowsAmount: number, colsAmount: number, data?: string[][], validateDataOnly?: boolean }) => 
  (
    dispatch: Dispatch<DispactchErrorType | DispactchErrorClearType | DispatchGeneratedTableType>, 
    getState: GetStateThunkType
  ) => boolean

export type ImportCsvActionType = (file: File) => 
  (
    dispatch: Dispatch<DispactchErrorType | DispactchErrorClearType | DispatchLoadingType | DispatchLoadingClearType> & MyThunkDispatchType, 
    getState: GetStateThunkType
  ) => Promise<boolean>
  
export type ClearTableActionType = () => (dispatch: Dispatch) => void

export type SetEditModeActionType = (cellData: CellModel) => (dispatch: Dispatch) => void

export type TableHistoryActionType = (undo: boolean) => (dispatch: Dispatch) => void

export type SetTableColsActionType = ({}: { colIndex: number, shouldDelete?: boolean }) => (dispatch: Dispatch, getState: GetStateThunkType) => void

export type SetTableRowsActionType = ({}: { rowIndex: number, shouldDelete?: boolean }) => (dispatch: Dispatch, getState: GetStateThunkType) => void

// other 
export type ErrorType = {
  [key: string]: string
}