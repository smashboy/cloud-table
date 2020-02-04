import { ADD_COL, DELETE_COL } from '../../constants';

const updateTableColsAction = ({ colIndex, shouldDelete = false }) => (dispatch, getState) => {

  const currentTableState = getState().table;
  const { tableHistory, currentTableIndex, colsMax } = currentTableState;
  const { colsAmount } = tableHistory[currentTableIndex];

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
    type: ADD_COL,
    payload: colIndex
  });
}

export default updateTableColsAction;