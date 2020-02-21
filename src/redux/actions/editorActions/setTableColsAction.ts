import { TableEnum } from '../../enums';
import { SetTableColsActionType } from '../../types';

const setTableColsAction: SetTableColsActionType = ({ colIndex, shouldDelete = false }) => (dispatch, getState) => {

  const currentEditorState = getState().editor;
  const { colsMax, history, currentTableIndex } = currentEditorState;
  const { colsAmount } = history[currentTableIndex];

  if (shouldDelete) {
    dispatch({
      type: TableEnum.DELETE_COL,
      payload: colIndex
    });
    return;
  }

  if (colsAmount + 1 > colsMax) {
    alert(`Columns range exceeded: 1-${colsMax}`);
    return;
  }

  dispatch({
    type: TableEnum.ADD_COL,
    payload: colIndex
  });
}

export default setTableColsAction;