import { TableEnum } from '../enums';

import { TableHistoryStateInterface, DispatchGeneratedTableInterface } from '../interfaces';
import TableModel from '../../models/Table/Table';
import CellModel from '../../models/Table/Cell';

const initialState: TableHistoryStateInterface = {

   // Table limits
   colsMax: 20,
   rowsMax: 10000, // table now can hold large amount of data
   
  // Using this limit to avoid a lot of unnecessary information
  // if history limit is reached, first element  will be removed
  limit: 50,

  currentTableIndex: 0,

  history: [],
}

interface tableHistoryManagerPropsInterface {
  currentTableIndex: number,
  tableData: TableModel,
  history: TableModel[],
  limit: number
}

interface tableHistoryManagerReturnInterface {
  updatedCurrentTableIndex: number,
  updatedTableHistory: TableModel[]
}

const tableHistoryManager = 
  ({ currentTableIndex, tableData, history, limit }: tableHistoryManagerPropsInterface): tableHistoryManagerReturnInterface => {

  let updatedTableHistory: TableModel[] = [];
  let arrayShift: boolean = false;

  // Init setup
  if (history.length === 0) {
    updatedTableHistory = [...history, tableData];
    return { updatedTableHistory, updatedCurrentTableIndex: 0 };
  }

  // Clearing up space for new data
  if (history.length === limit) {
    history.shift();
    arrayShift = true;
  }

  const limitChecker: number = arrayShift ? history.length : history.length - 1;

  updatedTableHistory = currentTableIndex < limitChecker 
      ? 
    [...history.slice(0, currentTableIndex + 1), tableData] 
      :
    [...history, tableData];

  return { updatedTableHistory, updatedCurrentTableIndex: updatedTableHistory.length - 1 };
}

interface reducerActionPropsInterface {
  type: TableEnum,
  payload: any
}

type ReducerDispatchProps = DispatchGeneratedTableInterface;

export default (state: TableHistoryStateInterface = initialState, { type, payload }: reducerActionPropsInterface): TableHistoryStateInterface => {
  
  // Need this data in all cases
  const { history, limit, currentTableIndex } = state;

  switch (type) {
    case TableEnum.SET_GENERATED_TABLE: {
      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData: payload, history, limit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.SET_CELL_VALUE: {
      const { rowIndex, colIndex } = payload;

      const tableData: TableModel = {
        ...history[currentTableIndex],
        rows: Object.assign([...history[currentTableIndex].rows], {
          [rowIndex]: Object.assign([...history[currentTableIndex].rows[rowIndex]], {
            [colIndex]: payload
          })
        })
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, limit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.CLEAR_ALL_CELLS: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        rows: history[currentTableIndex].rows.map(row => 
          row.map((cell: CellModel) => ({ ...cell, value: '' }))
        )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, limit, currentTableIndex });
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
          ...history[currentTableIndex].rows.slice(rowIndex).map(row => row.map((cell: CellModel) => ({...cell, rowIndex: cell.rowIndex + 1})))
        ]
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, limit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.ADD_COL: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        colsAmount: history[currentTableIndex].colsAmount + 1,
        rows: history[currentTableIndex].rows.map((row, rowIndex) => [
          ...row.slice(0, payload),
          {
            rowIndex: rowIndex,
            colIndex: payload,
            value: '',
            editMode: 0
          },
          // Same thing, but with colIndex
          ...row.slice(payload).map((cell: CellModel) => ({...cell, colIndex: cell.colIndex + 1}))
        ])
      };
      
      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, limit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.DELETE_ROW: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        rowsAmount: history[currentTableIndex].rowsAmount - 1,
        rows: history[currentTableIndex].rows
          .filter(row => row[0].rowIndex !== payload)
          .map((row, rowIndex) => 
            row.map((cell: CellModel) => ({...cell, rowIndex}))
          )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, limit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.DELETE_COL: {
      const tableData: TableModel = {
        ...history[currentTableIndex],
        colsAmount:  history[currentTableIndex].colsAmount - 1,
        rows: history[currentTableIndex].rows
          .map(
            row => row
              .filter((cell: CellModel) => cell.colIndex !== payload)
              .map((cell: CellModel, colIndex: number) => ({...cell, colIndex}))
          )
      };

      const { updatedCurrentTableIndex, updatedTableHistory } = tableHistoryManager({ tableData, history, limit, currentTableIndex });
      return { ...state, history: updatedTableHistory, currentTableIndex: updatedCurrentTableIndex };
    }
    case TableEnum.UNDO_TABLE:
      return { ...state, currentTableIndex: state.currentTableIndex - 1 };
    case TableEnum.REDO_TABLE:
      return { ...state, currentTableIndex: state.currentTableIndex + 1 };
    default:
      return state;
  }
}