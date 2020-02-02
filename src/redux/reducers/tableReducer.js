import { 
  SET_GENERATED_TABLE, 
  SET_CELL_VALUE, CLEAR_ALL_CELLS,
  ADD_NEW_ROW, ADD_NEW_COL,
  DELETE_ROW, DELETE_COL
} from '../constants';

const initialState = {

  // Table limits
  colsMax: 20,
  rowsMax: 500,

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
      };
    case ADD_NEW_ROW:
      const { rowIndex, newRow } = payload;
      return {
        ...state,
        rowsAmount: state.rowsAmount + 1,
        rows: [
          ...state.rows.slice(0, rowIndex), 
          newRow,
          // Row indexes are shifting, because of new row
          ...state.rows.slice(rowIndex).map(row => row.map(cell => ({...cell, rowIndex: cell.rowIndex + 1})))
        ]
      };
    case ADD_NEW_COL:
      return {
        ...state,
        colsAmount: state.colsAmount + 1,
        rows: state.rows.map((row, rowIndex) => [
          ...row.slice(0, payload),
          {
            rowIndex: rowIndex,
            colIndex: payload,
            value: ''
          },
          // Same thing, but with colIndex
          ...row.slice(payload).map(cell => ({...cell, colIndex: cell.colIndex + 1}))
        ])
      };
    case DELETE_ROW:
      return {
        ...state,
        rowsAmount: state.rowsAmount - 1,
        rows: state.rows
          .filter(row => row[0].rowIndex !== payload)
          .map((row, rowIndex) => 
            row.map(cell => ({...cell, rowIndex}))
          )
      };
    case DELETE_COL:
      return {
        ...state,
        colsAmount: state.colsAmount - 1,
        rows: state.rows
          .map(
            row => row
              .filter(cell => cell.colIndex !== payload)
              .map((cell, colIndex) => ({...cell, colIndex}))
          )
      };
    default:
      return state;
  }
}