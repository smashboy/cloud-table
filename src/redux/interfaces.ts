import { UiEnum, TableEnum, ErrorKeysEnum, LoadingKeysEnum } from './enums';
import TableHistoryModel from '../../models/Table/TableHistory';
import TableModel from '../../models/Table/Table';

// States
export interface TableHistoryStateInterface extends TableHistoryModel {
  colsMax: number,
  rowsMax: number
}

export interface UiStateInterface {
  loading: string[],
  errors: ErrorInterface
}

// Dispatches -> Table
export interface DispatchGeneratedTableInterface {
  type: TableEnum,
  payload: TableModel
}

// Dispatches -> UI
export interface DispactchErrorInterface {
  type: UiEnum,
  payload: ErrorInterface
}

export interface DispactchErrorClearInterface {
  type: UiEnum
  payload: ErrorKeysEnum
}

export interface DispatchLoadingInterface {
  type: UiEnum,
  payload: LoadingKeysEnum
}

// Action props
export interface GenerateTableActionPropsInterface {
  rowsAmount: number,
  colsAmount: number,
  data?: string[][],
  validateDataOnly?: boolean
}

// other 
export interface ErrorInterface {
  [key: string]: string 
}
