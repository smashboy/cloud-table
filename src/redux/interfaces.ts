import TableHistoryModel from '../../models/Table/TableHistory';
import { ErrorType } from './types';

// States
export interface TableHistoryStateInterface extends TableHistoryModel {
  colsMax: number;
  rowsMax: number;
}

export interface UiStateInterface {
  loading: string[];
  errors: ErrorType;
}
