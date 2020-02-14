import { UiEnums, TableEnum } from './enums';
import TableHistoryModel from '../models/Table/TableHistory';
import TableModel from '../models/Table/Table';

export interface TableHistoryStateInterface extends TableHistoryModel {
  colsMax: number,
  rowsMax: number
}

export interface DispatchGeneratedTableInterface {
  type: TableEnum,
  payload: TableModel
}

export interface UiStateInterface {
  loading: string[],
  errors: ErrorInterface
}

export interface ErrorInterface {
  [key: string]: string 
}

export interface DispactchErrorInterface {
  type: UiEnums,
  payload: ErrorInterface
}

export interface DispactchErrorClearInterface {
  type: UiEnums
}

export interface DispatchLoadingInterface {
  type: UiEnums,
  payload: string
}
