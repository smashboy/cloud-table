import { TableEnum, ErrorKeysEnum, UiEnum } from '../../enums';
import { Dispatch } from 'redux';

import { storeStateType } from '../../store';
import { CellEditModeEnum } from '../../../../models/Table/Cell';
import { DispactchErrorType, DispactchErrorClearType, DispatchGeneratedTableType, GenerateTableActionPropsType } from '../../types';
import CellModel from '../../../../models/Table/Cell';
import { MyThunkResultType } from '../../types';

/**
 * Generate table action is used to validate table data or create new table structure with or without specified data 
 * @param rowsAmount
 * amount of table rows. Max rows amount specified in tableReducer
 * @param colsAmount 
 * amount of table cols. Max cols amount specified in tableReducer
 * @param data (optional)
 * cells value data. If not specified table will be created with empty cells
 * @param validateOnly (optional)
 * function will only check if params are valid and table won't be created
 */

type DispatchPropType = Dispatch<DispactchErrorType | DispactchErrorClearType | DispatchGeneratedTableType>;

const generateTableAction = ({ rowsAmount, colsAmount, data = [], validateDataOnly = false }: GenerateTableActionPropsType): MyThunkResultType<boolean> => 
  (dispatch: DispatchPropType, getState: () => storeStateType) => {

  const state = getState();

  const { table, ui } = state;

  const { rowsMax, colsMax } = table;
  const { errors } = ui;

  const importDataIsEmpty: boolean = data.length === 0;

  if (importDataIsEmpty && rowsAmount > rowsMax) {
    dispatch({
      type: UiEnum.SET_ERROR,
      payload: {[ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR]: `Rows range exceeded: 1-${rowsMax}`}
    });
  } else if (importDataIsEmpty && (rowsAmount <= rowsMax && errors[ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR])) {
    dispatch({
      type: UiEnum.CLEAR_ERROR,
      payload: ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR
    });
  }

  if (importDataIsEmpty && colsAmount > colsMax) {
    dispatch({
      type: UiEnum.SET_ERROR,
      payload: {[ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR]: `Rows range exceeded: 1-${colsMax}`}
    });
  } else if (importDataIsEmpty && (colsAmount <= colsMax && errors[ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR])) {
    dispatch({
      type: UiEnum.CLEAR_ERROR,
      payload: ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR
    });
  }

  // Import validation
  if (data.length > 0 && (rowsAmount > rowsMax || colsAmount > colsMax)) {
    dispatch({
      type: UiEnum.SET_ERROR,
      payload: {[ErrorKeysEnum.IMPORT_CSV_ERROR]:`Your table is too big. Max limits for rows is ${rowsMax} and columns ${colsMax}`}
    });
  } else if (data.length > 0 && (rowsAmount <= rowsMax && colsAmount <= colsMax && errors[ErrorKeysEnum.IMPORT_CSV_ERROR])) {
    dispatch({
      type: UiEnum.CLEAR_ERROR,
      payload: ErrorKeysEnum.IMPORT_CSV_ERROR
    });
  }

  const errorsStateAfterValidaiton = getState().ui.errors;

  if (
    (!validateDataOnly && importDataIsEmpty && !errorsStateAfterValidaiton[ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR] && !errorsStateAfterValidaiton[ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR])
      ||
    (!validateDataOnly && !importDataIsEmpty && !errorsStateAfterValidaiton[ErrorKeysEnum.IMPORT_CSV_ERROR])
  ) {

    let rows: CellModel[][] = [];

    // Saving cell data to 2D Array
    for (let i = 0; i < rowsAmount; i++) {
      rows.push([]);
      for (let j = 0; j < colsAmount; j++) {
        rows[i].push({
          rowIndex: i,
          colIndex: j,
          value: data.length > 0 ? data[i][j].replace('Â', '') : '', // Didn't find better fix for Â symbol then just replacing it,
          editMode: CellEditModeEnum.EDIT_MODE_OFF
        });
      }
    }

    dispatch({
      type: TableEnum.SET_GENERATED_TABLE,
      payload: { rowsAmount, colsAmount, rows }
    });

    // Trigger modal close
    return true;
  } else {
    return false;
  }
}

export default generateTableAction;