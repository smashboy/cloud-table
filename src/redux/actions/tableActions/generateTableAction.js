import { 
  SET_GENERATED_TABLE,
  SET_ERROR, CLEAR_ERROR,
  generateTableRowsMaxError, generateTableColsMaxError,
  importCsvError
} from '../../constants';

const generateTableAction = ({ rowsAmount, colsAmount, data = [], validateOnly = false }) => (dispatch, getState) => {

  const tableState = getState().table;

  if (rowsAmount > tableState.rowsMax) {
    dispatch({
      type: SET_ERROR,
      payload: {[generateTableRowsMaxError]: `Rows range exceeded: 1-${tableState.rowsMax}`}
    });
  } else {
    dispatch({
      type: CLEAR_ERROR,
      payload: generateTableRowsMaxError
    });
  }

  if (colsAmount > tableState.colsMax) {
    dispatch({
      type: SET_ERROR,
      payload: {[generateTableColsMaxError]: `Columns range exceeded: 1-${tableState.colsMax}`}
    });
  } else {
    dispatch({
      type: CLEAR_ERROR,
      payload: generateTableColsMaxError
    });
  }

  // Import validation
  if (data.length > 0 && (rowsAmount > tableState.rowsMax || colsAmount > tableState.colsMax)) {
    dispatch({
      type: SET_ERROR,
      payload: {[importCsvError]:`Your table is too big. Max limits for rows is ${tableState.rowsMax} and columns ${tableState.colsMax}`}
    });
  } else {
    dispatch({
      type: CLEAR_ERROR,
      payload: importCsvError
    });
  }

  const errors = getState().ui.errors;

  if (!validateOnly && !errors[generateTableRowsMaxError] && !errors[generateTableColsMaxError] && !errors[importCsvError]) {

    let rows = [];

    // Saving cell data to 2D Array
    for (let i = 0; i < rowsAmount; i++) {
      rows.push([]);
      for (let j = 0; j < colsAmount; j++) {
        rows[i].push({
          rowIndex: i,
          colIndex: j,
          value: data.length > 0 ? data[i][j].replace('Â', '') : '', // Didn't find better fix for Â symbol then just replacing it
        });
      }
    }

    dispatch({
      type: SET_GENERATED_TABLE,
      payload: { rowsAmount, colsAmount, rows }
    });

    // Trigger modal close
    return true;
  } else {
    return false;
  }
}

export default generateTableAction;