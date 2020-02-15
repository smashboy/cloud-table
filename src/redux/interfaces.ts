import { UiEnum, TableEnum, ErrorKeysEnum, LoadingKeysEnum } from './enums';
import TableHistoryModel from '../../models/Table/TableHistory';
import TableModel from '../../models/Table/Table';

export interface TableHistoryStateInterface extends TableHistoryModel {
  colsMax: number,
  rowsMax: number
}

export interface UiStateInterface {
  loading: string[],
  errors: ErrorInterface
}

export interface ErrorInterface {
  [key: string]: string 
}

export interface DispatchGeneratedTableInterface {
  type: TableEnum,
  payload: TableModel
}

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
