import { 
  SET_GENERATED_TABLE,
  SET_ERROR, CLEAR_ERROR,
  generateTableRowsMaxError, generateTableColsMaxError,
  importCsvError
} from '../../constants';

const generateTableAction = ({ rowsAmount, colsAmount, data = [], validateOnly = false }) => (dispatch, getState) => {

  const tableState = getState().table;

  const { rowsMax, colsMax } = tableState;

  if (rowsAmount > rowsMax) {
    dispatch({
      type: SET_ERROR,
      payload: {[generateTableRowsMaxError]: `Rows range exceeded: 1-${rowsMax}`}
    });
  } else {
    dispatch({
      type: CLEAR_ERROR,
      payload: generateTableRowsMaxError
    });
  }

  if (colsAmount > colsMax) {
    dispatch({
      type: SET_ERROR,
      payload: {[generateTableColsMaxError]: `Columns range exceeded: 1-${colsMax}`}
    });
  } else {
    dispatch({
      type: CLEAR_ERROR,
      payload: generateTableColsMaxError
    });
  }

  // Import validation
  if (data.length > 0 && (rowsAmount > rowsMax || colsAmount > colsMax)) {
    dispatch({
      type: SET_ERROR,
      payload: {[importCsvError]:`Your table is too big. Max limits for rows is ${rowsMax} and columns ${colsMax}`}
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