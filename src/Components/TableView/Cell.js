import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import ClickOutListener from 'react-onclickout';
import TextareaAutosize from 'react-textarea-autosize';
import setCellValueAction from '../../redux/actions/tableActions/setCellValueAction';
import updateTableRowsAction from '../../redux/actions/tableActions/updateTableRowsAction';
import updateTableColsAction from '../../redux/actions/tableActions/updateTableColsAction';

const Cell = props => {

  const { 
    cellData: { value, rowIndex, colIndex }, 
    setCellValueAction, updateTableRowsAction, updateTableColsAction
  } = props;

  const [editModeState, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = event => setInputValue(event.target.value);

  // Cell data in table should be updated only when cell editMode changes from TRUE to FALSE
  const setEditModeOnHandler = () => {
    if (!editModeState) {
      setEditMode(true);
      // If table is not new, we need to pass cell value to input
      setInputValue(value);
    }
  }

  const setEditModeOffHandler = () => {
    if (editModeState) {
      setEditMode(false);
      if (inputValue !== value) setCellValueAction({ rowIndex, colIndex, value: inputValue });
    }
  }

  return (
    <ClickOutListener onClickOut={setEditModeOffHandler}>
      <td
        className={editModeState ? 'editMode' : value.length === 0 ? 'empty' : 'filled'} // Changing css classes depending on cell state
        onClick={setEditModeOnHandler}
      >
        {editModeState ?
          <Fragment>
            <TextareaAutosize onChange={inputChangeHandler} value={inputValue} autoFocus />
            {/* DELETE ROW OR COL BUTTONS */}
            <div className="dropdown">
              <button className="dropbtn delete">Delete</button>
              <div className="dropdown-content">
                <button
                onClick={() => {
                  setEditModeOffHandler();
                  updateTableRowsAction({ rowIndex, shouldDelete: true });
                }}
              >Row</button>
              <button
                onClick={() => {
                  setEditModeOffHandler();
                  updateTableColsAction({ colIndex, shouldDelete: true });
                }}
              >Column</button>
              </div>
            </div>
            {/* ADD ROW OR COL BUTTONS */}
            <button 
              className='edit-table-btn top'
              onClick={() => {
                setEditModeOffHandler();
                updateTableRowsAction({ rowIndex: rowIndex });
              }}
            >+</button>
            <button 
              className='edit-table-btn bottom'
              onClick={() => {
                setEditModeOffHandler();
                updateTableRowsAction({ rowIndex: rowIndex + 1 });
              }}
            >+</button>
            <button 
              className='edit-table-btn left'
              onClick={() => {
                setEditModeOffHandler();
                updateTableColsAction({ colIndex });
              }}
            >+</button>
            <button 
              className='edit-table-btn right'
              onClick={() => {
                setEditModeOffHandler();
                updateTableColsAction({ colIndex: colIndex + 1 });
              }}
            >+</button>
          </Fragment>
            :
          value
        }
      </td>
    </ClickOutListener>
  );
}

const mapActionsToProps = {
  setCellValueAction,
  updateTableColsAction,
  updateTableRowsAction
};

export default connect(null, mapActionsToProps)(Cell);
