import React, { useState } from 'react';
import { connect } from 'react-redux';
import generateTableAction from '../../redux/actions/tableActions/generateTableAction';
import { 
  generateTableLoading, 
  // generateTableColsMaxError, 
  // generateTableRowsMaxError 
} from '../../redux/constants';

const GenerateTableForm = props => {

  const { limits: { colsMax, rowsMax }, loadingState, generateTableAction } = props;

  // For inputs values we don't need redux, 
  // because we don't use inputs data outside this component
  // if data is not valid
  const [inputState, setInput] = useState({
    rowsInput: 5,
    colsInput: 5
  });

  const { rowsInput, colsInput } = inputState;

  const inputChangeHandler = event => {
    // If user is dum-dum and enters float number or a negative number
    // or user is trying to pass bunch of zeroes at the beginning
    const parsedValue = Math.abs(parseInt(event.target.value, 10));
    setInput({
      ...inputState, 
      [event.target.id]: parsedValue || 1
    });
  }

  return (
    <form noValidate>
      <label>Rows {`(1-${rowsMax})`}:</label>
      <input
        id='rowsInput'
        type='text'
        value={rowsInput}
        onChange={inputChangeHandler} 
      />
      <label>Columns {`(1-${colsMax})`}:</label>
      <input
        id='colsInput'
        type='text' 
        value={colsInput}
        onChange={inputChangeHandler} 
      />
      <button 
        type='submit'
        className='generateTableBtn'
        onClick={e => {
        // Prevent page from reloading on form submit
        e.preventDefault();
        // Removing unnecessary zeroes before generating table
        generateTableAction({
          rowsAmount: rowsInput,
          colsAmount: colsInput
        });
      }}>
        {loadingState.includes(generateTableLoading) ? 'Genetaring...' : 'Generate Table'}
      </button>
    </form>
  );
}

const mapStateToProps = state => ({
  limits: {
    rowsMax: state.table.rowsMax,
    colsMax: state.table.colsMax
  },
  loadingState: state.ui.loading,
  errorsState: state.ui.errors
});

const mapActionsToProps = {
  generateTableAction
};

export default connect(mapStateToProps, mapActionsToProps)(GenerateTableForm);
