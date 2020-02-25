import { TableEnum } from '../enums';
import { TableHistoryStateInterface } from '../interfaces';
import TableModel from '../../../models/Table/Table';
import CellModel, { CellEditModeEnum } from '../../../models/Table/Cell';

const initialState: TableHistoryStateInterface = {

   // Table limits
   colsMax: 20,
   rowsMax: 20000, // table now can hold large amount of data
   
  // Using this limit to avoid a lot of unnecessary information
  // if history limit is reached, first element  will be removed
  historyLimit: 50,

  currentTableIndex: 0,

  // Index of editModal that should appear
  editModeIndex: null,

  history: [],
}

interface TableHistoryManagerPropsInterface {
  currentTableIndex: number;
  tableData: TableModel;
  history: TableModel[];
  historyLimit: number;
  updateHistory?: boolean // should we add new table version or edit selected one
}

interface TableHistoryManagerReturnInterface {
  updatedCurrentTableIndex: number;
  updatedTableHistory: TableModel[];
}

const tableHistoryManager = 
  ({ currentTableIndex, tableData, history, historyLimit, updateHistory = true }: TableHistoryManagerPropsInterface): TableHistoryManagerReturnInterface => {

  let updatedTableHistory: TableModel[] = [];
  let arrayShift: boolean = false;
  let updatedCurrentTableIndex: number;

  // Init setup
  if (history.length === 0) {
    updatedTableHistory = [...history, tableData];
    return { updatedTableHistory, updatedCurrentTableIndex: 0 };
  }

  // Clearing up space for new data
  if (history.length === historyLimit) {
    history.shift();
    arrayShift = true;
  }

  const limitChecker: number = arrayShift ? history.length : history.length - 1;

  // When cell edit mode changes, we should not add new table to history
  if (updateHistory) {
    updatedTableHistory = currentTableIndex < limitChecker 
      ? 
    [...history.slice(0, currentTableIndex + 1), tableData] 
      :
    [...history, tableData]; 
    updatedCurrentTableIndex = updatedTableHistory.length - 1;
  } else {
    updatedTableHistory = history.map((oldTableData: TableModel, index: number) => currentTableIndex === index ? tableData : oldTableData);
    updatedCurrentTableIndex = currentTableIndex;
  }

  return { updatedTableHistory, updatedCurrentTableIndex };
}

interface ReducerDispatchPropsInterface {
  type: TableEnum;
  payload: any;
}

// !!! SHOULD USE WHEN ALL ACTIONS AND DISPATCHES WILL BE REFACTORED !!!
// type ReducerDispatchProps = DispatchGeneratedTableInterface;

export default (state: TableHistoryStateInterface = initialState, { type, payload }: ReducerDispatchPropsInterface): TableHistoryStateInterface => {
  
  // Need this data in all cases
  const { history, historyLimit, currentTableIndex } = state;

  switch (type) {
    case TableEnum.SET_GENERATED_TABLE: {
      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData: payload, history, historyLimit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.SET_EDIT_MODE_ON: {
      const { rowIndex, colIndex } = payload;

      const tableData: TableModel = {
        ...history[currentTableIndex],
        rows: history[currentTableIndex].rows.map((row: CellModel[]) => 
          row.map(
            (cell: CellModel) => {
              if (cell.rowIndex === rowIndex && cell.colIndex === colIndex) {
                return payload;
              } else {
                return { ...cell, editMode: CellEditModeEnum.EDIT_MODE_OFF }
              }
            }
          )
        )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, historyLimit, currentTableIndex, updateHistory: false });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex, editModeIndex: { rowIndex, colIndex } };
    }
    case TableEnum.SET_EDIT_MODE_OFF: {
      const { rowIndex, colIndex, value, valueColor, cellColor } = payload;
      const oldData = history[currentTableIndex].rows[rowIndex][colIndex];

      // If no data has been changed, history should not be updated !!!
      const shouldUpdateHistory = (
        oldData.value !== value
          ||
        oldData.valueColor !== valueColor
          ||
        oldData.cellColor !== cellColor
      );

      const tableData: TableModel = {
        ...history[currentTableIndex],
        rows: Object.assign([...history[currentTableIndex].rows], {
          [rowIndex]: Object.assign([...history[currentTableIndex].rows[rowIndex]], {
            [colIndex]: payload
          })
        })
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, historyLimit, currentTableIndex, updateHistory: shouldUpdateHistory });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex, editModeIndex: null };
    }
    case TableEnum.CLEAR_ALL_CELLS: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        rows: history[currentTableIndex].rows.map((row: CellModel[]) => 
          row.map((cell: CellModel) => ({ ...cell, value: '' }))
        )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, historyLimit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.ADD_ROW: {
      const { rowIndex, newRow } = payload;

      const tableData: TableModel = {
        ...history[currentTableIndex],
        rowsAmount: history[currentTableIndex].rowsAmount + 1,
        rows: [
          ...history[currentTableIndex].rows.slice(0, rowIndex), 
          newRow,
          // Row indexes are shifting, because of new row
          ...history[currentTableIndex].rows.slice(rowIndex).map((row: CellModel[]) => row.map((cell: CellModel) => ({...cell, rowIndex: cell.rowIndex + 1})))
        ]
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, historyLimit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.ADD_COL: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        colsAmount: history[currentTableIndex].colsAmount + 1,
        rows: history[currentTableIndex].rows.map((row: CellModel[], rowIndex: number) => [
          ...row.slice(0, payload),
          {
            rowIndex: rowIndex,
            colIndex: payload,
            value: '',
            editMode: 0,
            valueColor: '#000000',
            cellColor: '#ffffff'
          },
          // Same thing, but with colIndex
          ...row.slice(payload).map((cell: CellModel) => ({...cell, colIndex: cell.colIndex + 1}))
        ])
      };
      
      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, historyLimit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.DELETE_ROW: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        rowsAmount: history[currentTableIndex].rowsAmount - 1,
        rows: history[currentTableIndex].rows
          .filter((row: CellModel[]) => row[0].rowIndex !== payload)
          .map((row: CellModel[], rowIndex: number) => 
            row.map((cell: CellModel) => ({...cell, rowIndex}))
          )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, historyLimit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.DELETE_COL: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        colsAmount:  history[currentTableIndex].colsAmount - 1,
        rows: history[currentTableIndex].rows
          .map(
            (row: CellModel[]) => row
              .filter((cell: CellModel) => cell.colIndex !== payload)
              .map((cell: CellModel, colIndex: number) => ({...cell, colIndex}))
          )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, historyLimit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    // We need to clear(cancel) all active editable cells 
    case TableEnum.UNDO_TABLE: {
      const newCurrentTableIndex = state.currentTableIndex - 1;
      const updatedTableHistory = history.map((tableData: TableModel) => ({ 
        ...tableData, 
        rows: tableData.rows.map((row: CellModel[]) => row.map((cellData: CellModel) => ({ ...cellData, editMode: CellEditModeEnum.EDIT_MODE_OFF })))
        })
      );
      return { ...state, currentTableIndex: newCurrentTableIndex, history: updatedTableHistory };
    }
    case TableEnum.REDO_TABLE: {
      const newCurrentTableIndex = state.currentTableIndex + 1;
      const updatedTableHistory = history.map((tableData: TableModel) => ({ 
        ...tableData, 
        rows: tableData.rows.map((row: CellModel[]) => row.map((cellData: CellModel) => ({ ...cellData, editMode: CellEditModeEnum.EDIT_MODE_OFF })))
        })
      );
      return { ...state, currentTableIndex: newCurrentTableIndex, history: updatedTableHistory };
    }
    default:
      return state;
  }
}