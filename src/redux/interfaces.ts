import TableHistoryModel from '../../models/Table/TableHistory';
import CellModel from '../../models/Table/Cell';
import { ErrorType } from './types';

// States
export interface TableHistoryStateInterface extends TableHistoryModel {
  colsMax: number;
  rowsMax: number;
  editableCell: CellModel | null
}

export interface UiStateInterface {
  loading: string[];
  errors: ErrorType;
}
