import CsvParse from 'csv-parse';

import {
  SET_ERROR, CLEAR_ERROR,
  SET_LOADING_UI, CLEAR_LOADING_UI,
  importCsvError, importCsvLoading
} from '../../constants';

import generateTableAction from './generateTableAction';

const importCsvAction = event => (dispatch, getState) => {
  // Using promise, because of reader.onloadend
  return new Promise(resolve => {
    const file = event.target.files[0];

    if (!file) return;

    const fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();

    if (fileExtension !== 'csv') {
      dispatch({
        type: SET_ERROR,
        payload: {[importCsvError]: 'Please select a valid csv file.'}
      });
      return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    dispatch({
      type: SET_LOADING_UI,
      payload: importCsvLoading
    });

    reader.onloadend = readerEvent => {

      // Don't know why react-csv(export btn) add those weird symbols
      const validCsvData = readerEvent.target.result.split('ï»¿').pop();

      CsvParse(validCsvData, (err, output) => {
        
        if (err) {
          dispatch({
            type: importCsvError,
            payload: 'Unknown parse error, please try again.'
          });
        } else {
          dispatch({
            type: CLEAR_ERROR,
            payload: importCsvError
          });
        }

        const rowsAmount = output.length;
        const colsAmount = output[0].length;

        const errors = getState().ui.errors;

        if (!errors[importCsvError]) {

          dispatch({
            type: CLEAR_LOADING_UI,
            payload: importCsvLoading
          });

          const success = dispatch(generateTableAction({ rowsAmount, colsAmount, data: output }));
          // Trigger modal close
          resolve(success);
        } else {
          resolve();
        }
      });
    }
  });
}

export default importCsvAction;