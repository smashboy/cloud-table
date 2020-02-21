import CsvParse from 'csv-parse';

import { ErrorKeysEnum, UiEnum, LoadingKeysEnum } from '../../enums';
import generateTableAction from './generateTableAction';
import { ImportCsvActionType } from '../../types';

const importCsvAction: ImportCsvActionType = (file) => (dispatch, getState) => {
  return new Promise<boolean>((resolve, reject) => {

    const fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();

    if (fileExtension !== 'csv') {
      dispatch({
        type: UiEnum.SET_ERROR,
        payload: {[ErrorKeysEnum.IMPORT_CSV_ERROR]: 'Please select a valid csv file.'}
      });
      return;
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.readAsBinaryString(file);

    dispatch({
      type: UiEnum.SET_LOADING_UI,
      payload: LoadingKeysEnum.IMPORT_CSV_LOADING
    });

    reader.onload = () => {
      dispatch({
        type: UiEnum.CLEAR_LOADING_UI,
        payload: LoadingKeysEnum.IMPORT_CSV_LOADING
      });

      const validCsvData = reader.result as string;
      // Don't know why react-csv(export btn) add those weird symbols
      const validCsvDataSplit = validCsvData.split('ï»¿').pop() || '';

      const parseConfig = { 
        ltrim: true, 
        rtrim: true, 
        delimiter: ',', 
        quote: '"', 
        trim: true,
        bom: true,
        relax: true,
        skip_empty_lines: true
      };

      const errors = getState().ui.errors;

      CsvParse(validCsvDataSplit, parseConfig, (err: any, output: string[][]) => {

        if (err) {
          dispatch({
            type: UiEnum.SET_ERROR,
            payload: {[ErrorKeysEnum.IMPORT_CSV_ERROR]: err.message}
          });
          return;
        } else if (!err && errors[ErrorKeysEnum.IMPORT_CSV_ERROR]) {
          dispatch({
            type: UiEnum.CLEAR_ERROR,
            payload: ErrorKeysEnum.IMPORT_CSV_ERROR
          });
        }

        const errorsStateAfterValidaiton = getState().ui.errors;

        if (!errorsStateAfterValidaiton[ErrorKeysEnum.IMPORT_CSV_ERROR]) {
          const rowsAmount = output.length;
          const colsAmount = output[0].length;
          const success = dispatch(generateTableAction({ rowsAmount, colsAmount, data: output }));
          resolve(success);
        } else {
          resolve(false);
        }
      });
    }
  });
}

export default importCsvAction;