import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import generateTableAction from '../../redux/actions/tableActions/generateTableAction';

import { 
  generateTableColsMaxError, 
  generateTableRowsMaxError 
} from '../../redux/constants';

const GenerateTableForm = props => {

  const { generateTableAction, errors } = props;

  // For inputs values we don't need redux, 
  // because we don't use inputs data outside this component
  // if data is not valid
  const [inputState, setInput] = useState({
    rowsInput: 5,
    colsInput: 5
  });

  const [modalShowState, setModalShow] = useState(false);

  const { rowsInput, colsInput } = inputState;

  useEffect(() => {
    // Using only validation part
    generateTableAction({
      rowsAmount: rowsInput,
      colsAmount: colsInput,
      validateOnly: true
    });
  }, [inputState]);

  const modalOpenHandler = () => {
    setModalShow(true);
  }

  const modalCloseHander = () => {
    setModalShow(false);
  }

  const inputChangeHandler = event => {
    const target = event.target.id;
    // If user is dum-dum and enters float number or a negative number
    // or user is trying to pass bunch of zeroes at the beginning
    const parsedValue = Math.abs(parseInt(event.target.value, 10));

    // Block user to add more numbers if input is not valid
    if (
      (errors[generateTableRowsMaxError] && target === 'rowsInput' && parsedValue.toString().length > rowsInput.toString().length)
        ||
      (errors[generateTableColsMaxError] && target === 'colsInput' && parsedValue.toString().length > colsInput.toString().length)
    ) return;

    setInput({
      ...inputState, 
      [target]: parsedValue || 1
    });
  }

  const submitHandler = event => {
    // Prevent page from reloading on form submit
    event.preventDefault();

    const success = generateTableAction({
      rowsAmount: rowsInput,
      colsAmount: colsInput
    });

    if (success) {
      modalCloseHander();
    }
  }

  return (
    <Fragment>
      <button onClick={modalOpenHandler}>New Table</button>
      <div className={`modal ${modalShowState ? 'show' : 'hide'}`}>
        <div className='modal-container'>
          <button className='close-modal-btn' onClick={modalCloseHander}>X</button>
          <h2 className='modal-title'>Create New Table</h2>
          <form className='generate-table-form' noValidate autoComplete='off'>
            <label>Rows:</label>
            <input
              id='rowsInput'
              type='text'
              value={rowsInput}
              onChange={inputChangeHandler} 
            />
            <div className='error-message'>{errors[generateTableRowsMaxError] || null}</div>
            <label>Columns:</label>
            <input
              id='colsInput'
              type='text' 
              value={colsInput}
              onChange={inputChangeHandler} 
            />
            <div className='error-message'>{errors[generateTableColsMaxError] || null}</div> 
            <button 
              type='submit'
              className='generateTableBtn'
              disabled={errors[generateTableRowsMaxError] || errors[generateTableColsMaxError] ? true : false}
              onClick={submitHandler}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  errors: state.ui.errors
});

const mapActionsToProps = {
  generateTableAction
};

export default connect(mapStateToProps, mapActionsToProps)(GenerateTableForm);
