import React, { useState } from 'react';
import { connect } from 'react-redux';
import generateTableAction from '../../../redux/Actions/TableActions/generateTableAction';
import { 
  generateTableLoading, 
  // generateTableColsMaxError, 
  // generateTableRowsMaxError 
} from '../../../redux/keys';

const GenerateTableForm = props => {

  const { limits: { colsMax, rowsMax }, loadingState, generateTableAction } = props;

  // For inputs values we don't need redux, 
  // because we don't use inputs data outside this component
  // if data is not valid
  const [inputState, setInput] = useState({
    rowsInput: 5,
    colsInput: 5
  });

  const inputChangeHandler = event => {
    // If user is dum-dum and enters float number
    setInput({
      ...inputState, 
      [event.target.id]: Math.floor(event.target.value)
    });
  }

  return (
    <form noValidate>
      <label>Rows{`(1-${rowsMax})`}:</label>
      <input
        id='rowsInput'
        type='number'
        value={inputState.rowsInput}
        onChange={inputChangeHandler} 
      />
      <label>Columns{`(1-${colsMax})`}:</label>
      <input
        id='colsInput'
        type='number' 
        value={inputState.colsInput}
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
          rowsAmount: parseInt(inputState.rowsInput.toString().replace(/^0+/, ''), 10),
          colsAmount: parseInt(inputState.colsInput.toString().replace(/^0+/, ''), 10)
        });
      }}>
        {loadingState.includes(generateTableLoading) ? "Genetaring..." : "Generate Table"}
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
