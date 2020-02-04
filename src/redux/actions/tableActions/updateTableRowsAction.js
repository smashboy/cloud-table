import { ADD_ROW, DELETE_ROW } from '../../constants';

const updateTableRowsAction = ({ rowIndex, shouldDelete = false }) => (dispatch, getState) => {

  const currentTableState = getState().table;
  const { rowsMax, tableHistory, currentTableIndex } = currentTableState;
  const { colsAmount, rowsAmount } = tableHistory[currentTableIndex];

  let newRow = [];

  if (shouldDelete) {
    dispatch({
      type: DELETE_ROW,
      payload: rowIndex
    });
    return;
  }

  if (rowsAmount + 1 > rowsMax) {
    alert(`Rows range exceeded: 1-${rowsMax}`);
    return;
  }

  for (let i = 0; i < colsAmount; i++) {
    newRow.push({
      rowIndex: rowIndex,
      colIndex: i,
      value: ''
    });
  }

  dispatch({
    type: ADD_ROW,
    payload: { newRow, rowIndex }
  });
}

export default updateTableRowsAction;