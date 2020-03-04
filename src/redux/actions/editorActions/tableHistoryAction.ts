import { TableEnum } from '../../enums';
import { TableHistoryActionType } from '../../types';

const tableHistoryAction: TableHistoryActionType  = (undo) => (dispatch) => {
  undo ? dispatch({ type: TableEnum.UNDO_TABLE }) : dispatch({ type: TableEnum.REDO_TABLE });
}

export default tableHistoryAction;
