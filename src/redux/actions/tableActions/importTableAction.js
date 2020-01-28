import CsvParse from 'csv-parse';

// Later for UI
// import {
//   SET_ERROR, CLEAR_ERROR,
//   importTableError
// } from '../../constants';

import generateTableAction from './generateTableAction';

const importCsvAction = event => dispatch => {

  const file = event.target.files[0];

  if (!file) return;

  const fileExtension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();

  if (fileExtension !== 'csv') {
    alert('Please select valid csv file.');
    return;
  }

  const reader = new FileReader();
  reader.readAsBinaryString(file);

  reader.onloadend = readerEvent => {

    // Don't know why react-csv(export btn) add those weird symbols
    const validCsvData = readerEvent.target.result.split('ï»¿').pop();

    CsvParse(validCsvData, (err, output) => {
      
      if (err) {
        alert('Unknown error, please try again.');
        return;
      }

      const rowsAmount = output.length;
      const colsAmount = output[0].length;

      dispatch(generateTableAction({ rowsAmount, colsAmount, data: output }));
    });
  }
}

export default importCsvAction;