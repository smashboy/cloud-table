import { ADD_NEW_COL, DELETE_COL } from '../../constants';

const updateTableColsAction = ({ colIndex, shouldDelete = false }) => (dispatch, getState) => {

  const currentTable = getState().table;
  const { colsAmount, colsMax } = currentTable;

  if (shouldDelete) {
    dispatch({
      type: DELETE_COL,
      payload: colIndex
    });
    return;
  }

  if (colsAmount + 1 > colsMax) {
    alert(`Cols range exceeded: 1-${colsMax}`);
    return;
  }

  dispatch({
    type: ADD_NEW_COL,
    payload: colIndex
  });
}

export default updateTableColsAction;