import { 
  SET_GENERATED_TABLE, 
  SET_CELL_VALUE, CLEAR_ALL_CELLS,
  ADD_ROW, ADD_COL,
  DELETE_ROW, DELETE_COL,
  UNDO_TABLE, REDO_TABLE
} from '../constants';

const initialState = {

  // Table limits
  colsMax: 20,
  rowsMax: 10000, // table now can hold large amount of data

  // Using this limit to avoid a lot of unnecessary information
  // if history limit is reached, first element  will be removed
  tableHistoryLimit: 50,

  currentTableIndex: null,

  tableHistory: []
};

const tableHistoryManager = ({ currentTableIndex, tableData, tableHistory, tableHistoryLimit }) => {

  let updatedTableHistory = [];
  let arrayShift = false;

  // Init setup
  if (tableHistory.length === 0) {
    updatedTableHistory = [...tableHistory, tableData];
    return { updatedTableHistory, updatedCurrentTableIndex: 0 };
  }

  // Clearing up space for new data
  if (tableHistory.length === tableHistoryLimit) {
    tableHistory.shift();
    arrayShift = true;
  }

  const limitChecker = arrayShift ? tableHistory.length : tableHistory.length - 1;

  updatedTableHistory = currentTableIndex < limitChecker 
      ? 
    [...tableHistory.slice(0, currentTableIndex + 1), tableData] 
      :
    [...tableHistory, tableData];

  return { updatedTableHistory, updatedCurrentTableIndex: updatedTableHistory.length - 1 };
}

export default (state = initialState, { type, payload }) => {
  
  // Need this data in all cases
  const { tableHistory, tableHistoryLimit, currentTableIndex } = state;

  switch (type) {
    case SET_GENERATED_TABLE: {
      const { rowsAmount, colsAmount, rows } = payload;

      const tableData = {
        rows, rowsAmount, colsAmount 
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, tableHistory, tableHistoryLimit, currentTableIndex });
      return { ...state, tableHistory: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case SET_CELL_VALUE: {
      const { rowIndex, colIndex } = payload;

      const tableData = {
        ...tableHistory[currentTableIndex],
        rows: Object.assign([...tableHistory[currentTableIndex].rows], {
          [rowIndex]: Object.assign([...tableHistory[currentTableIndex].rows[rowIndex]], {
            [colIndex]: payload
          })
        })
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, tableHistory, tableHistoryLimit, currentTableIndex });
      return { ...state, tableHistory: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case CLEAR_ALL_CELLS: {
      const tableData = {
        ...tableHistory[currentTableIndex],
        rows: tableHistory[currentTableIndex].rows.map(row => 
          row.map(cell => ({ ...cell, value: '' }))
        )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, tableHistory, tableHistoryLimit, currentTableIndex });
      return { ...state, tableHistory: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case ADD_ROW: {
      const { rowIndex, newRow } = payload;

      const tableData = {
        ...tableHistory[currentTableIndex],
        rowsAmount: tableHistory[currentTableIndex].rowsAmount + 1,
        rows: [
          ...tableHistory[currentTableIndex].rows.slice(0, rowIndex), 
          newRow,
          // Row indexes are shifting, because of new row
          ...tableHistory[currentTableIndex].rows.slice(rowIndex).map(row => row.map(cell => ({...cell, rowIndex: cell.rowIndex + 1})))
        ]
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, tableHistory, tableHistoryLimit, currentTableIndex });
      return { ...state, tableHistory: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case ADD_COL: {
      const tableData = {
        ...tableHistory[currentTableIndex],
        colsAmount: tableHistory[currentTableIndex].colsAmount + 1,
        rows: tableHistory[currentTableIndex].rows.map((row, rowIndex) => [
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
      
      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, tableHistory, tableHistoryLimit, currentTableIndex });
      return { ...state, tableHistory: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case DELETE_ROW: {
      const tableData = {
        ...tableHistory[currentTableIndex],
        rowsAmount: tableHistory[currentTableIndex].rowsAmount - 1,
        rows: tableHistory[currentTableIndex].rows
          .filter(row => row[0].rowIndex !== payload)
          .map((row, rowIndex) => 
            row.map(cell => ({...cell, rowIndex}))
          )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, tableHistory, tableHistoryLimit, currentTableIndex });
      return { ...state, tableHistory: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case DELETE_COL: {
      const tableData = {
        ...tableHistory[currentTableIndex],
        colsAmount:  tableHistory[currentTableIndex].colsAmount - 1,
        rows: tableHistory[currentTableIndex].rows
          .map(
            row => row
              .filter(cell => cell.colIndex !== payload)
              .map((cell, colIndex) => ({...cell, colIndex}))
          )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, tableHistory, tableHistoryLimit, currentTableIndex });
      return { ...state, tableHistory: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case UNDO_TABLE:
      return { ...state, currentTableIndex: state.currentTableIndex - 1 };
    case REDO_TABLE:
      return { ...state, currentTableIndex: state.currentTableIndex + 1 };
    default:
      return state;
  }
}