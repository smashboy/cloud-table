import { 
  SET_GENERATED_TABLE, SET_CELL_VALUE
} from '../types/tableTypes';

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
      return {...state, rows: payload};
    case SET_CELL_VALUE:
      return {
        ...state,
        rows: Object.assign([...state.rows], {
          [payload.rowIndex]: Object.assign([...state.rows[payload.rowIndex]], {
            [payload.colIndex]: payload
          })
        })
      };
    default:
      return state;
  }
}