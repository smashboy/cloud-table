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

      dispatch({
        type: CLEAR_LOADING_UI,
        payload: importCsvLoading
      });

      const validCsvData = readerEvent.target.result;
      
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

      CsvParse(validCsvData, parseConfig, (err, output) => {
        
        if (err) {
          dispatch({
            type: SET_ERROR,
            payload: {[importCsvError]: err.message}
          });
        } else {
          dispatch({
            type: CLEAR_ERROR,
            payload: importCsvError
          });
        }

        const errors = getState().ui.errors;

        if (!errors[importCsvError]) {

          const rowsAmount = output.length;
          const colsAmount = output[0].length;

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