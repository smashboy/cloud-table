import { 
  SET_GENERATED_TABLE, 
  SET_CELL_VALUE, CLEAR_ALL_CELLS
} from '../constants';

const initialState = {

  // Table limits
  colsMax: 20,
  rowsMax: 500,
  cellValueMaxLength: 150,

  // Total number of rows and columns in table:
  colsAmount: 0,
  rowsAmount: 0,

  // List of rows
  // Each row consists of array of cells (2D Array)
  rows: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_GENERATED_TABLE:
      const { rowsAmount, colsAmount, rows } = payload;
      return { ...state, rows, rowsAmount, colsAmount };
    case SET_CELL_VALUE:
      return {
        ...state,
        rows: Object.assign([...state.rows], {
          [payload.rowIndex]: Object.assign([...state.rows[payload.rowIndex]], {
            [payload.colIndex]: payload
          })
        })
      };
    case CLEAR_ALL_CELLS:
      return {
        ...state,
        rows: state.rows.map(row => 
          row.map(cell => ({ ...cell, value: '' }))
        )
      }
    default:
      return state;
  }
}