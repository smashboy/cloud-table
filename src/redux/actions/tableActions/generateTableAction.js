import { 
  SET_GENERATED_TABLE,
  // SET_ERROR, CLEAR_ERROR,
  SET_LOADING_UI, CLEAR_LOADING_UI,
  generateTableRowsMaxError, 
  generateTableColsMaxError,
  generateTableLoading
} from '../../constants';

const generateTableAction = ({ rowsAmount, colsAmount, data = [] }) => (dispatch, getState) => {

  const tableState = getState().table;

  //  !!! Those dispatches will be uncommented, when UI is ready !!!

  if (rowsAmount < 1 || rowsAmount > tableState.rowsMax) {
    alert(`Rows range exceeded: 1-${tableState.rowsMax}`);
    return;
    // dispatch({
    //   type: SET_ERROR,
    //   payload: {[generateTableRowsMaxError]: `Rows range exceeded: 1-${tableState.rowsMax}`}
    // });
  } 
  // else {
  //   dispatch({
  //     type: CLEAR_ERROR,
  //     payload: generateTableRowsMaxError
  //   });
  // }

  if (colsAmount < 1 || colsAmount > tableState.colsMax) {
    alert(`Columns range exceeded: 1-${tableState.colsMax}`);
    return;
    // dispatch({
    //   type: SET_ERROR,
    //   payload: {[generateTableColsMaxError]: `Columns range exceeded: 1-${tableState.colsMax}`}
    // });
  } 
  // else {
  //   dispatch({
  //     type: CLEAR_ERROR,
  //     payload: generateTableColsMaxError
  //   });
  // }

  const errors = getState().ui.errors;

  if (!errors[generateTableRowsMaxError] && !errors[generateTableColsMaxError]) {

    // If table is too big it may take some time to build it,
    // so we need to show user that app did not freezed and it's process
    dispatch({
      type: SET_LOADING_UI,
      payload: generateTableLoading
    });

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

    dispatch({
      type: CLEAR_LOADING_UI,
      payload: generateTableLoading
    });
  }
}

export default generateTableAction;