import { TableEnum } from '../../enums';
import CellModel from '../../../../models/Table/Cell';
import { SetTableRowsActionType } from '../../types';
import generateDefaultCell from '../../../utils/generateDefaultCell';

const setTableRowsAction: SetTableRowsActionType = ({ rowIndex, shouldDelete = false }) => (dispatch, getState) => {

  const currentEditorState = getState().editor;
  const { rowsMax, history, currentTableIndex } = currentEditorState;
  const { rowsAmount, colsAmount } = history[currentTableIndex];

  let newRow: CellModel[] = [];

  if (shouldDelete) {
    dispatch({
      type: TableEnum.DELETE_ROW,
      payload: rowIndex
    });
    return;
  }

  if (rowsAmount + 1 > rowsMax) {
    alert(`Rows range exceeded: 1-${rowsMax}`);
    return;
  }

  for (let i = 0; i < colsAmount; i++) {
    newRow.push(generateDefaultCell({
      rowIndex,
      colIndex: i
    }));
  }

  dispatch({
    type: TableEnum.ADD_ROW,
    payload: { newRow, rowIndex }
  });
}

export default setTableRowsAction;