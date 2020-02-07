import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import ClickOutListener from 'react-onclickout';
import setCellValueAction from '../../redux/actions/tableActions/setCellValueAction';
import updateTableRowsAction from '../../redux/actions/tableActions/updateTableRowsAction';
import updateTableColsAction from '../../redux/actions/tableActions/updateTableColsAction';
import deleteIcon from '../../assets/icons/delete-icon.png';

const Cell = props => {

  const { 
    data, rowIndex, columnIndex,
    style,
    setCellValueAction, 
    updateTableRowsAction, updateTableColsAction
  } = props;

  const [editModeState, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = event => setInputValue(event.target.value);

  // Cell data in table should be updated only when cell editMode changes from TRUE to FALSE
  const setEditModeOnHandler = () => {
    if (!editModeState) {
      setEditMode(true);
      // If table is not new, we need to pass cell value to input
      setInputValue(data[rowIndex][columnIndex].value);
    }
  }

  const setEditModeOffHandler = () => {
    if (editModeState) {
      setEditMode(false);
      if (inputValue !== data[rowIndex][columnIndex].value) setCellValueAction({ rowIndex, colIndex: columnIndex, value: inputValue });
    }
  }

  return (
    <ClickOutListener onClickOut={setEditModeOffHandler}>
      <div
       // cell padding
       style={{
        ...style,
        left: style.left + 5,
        top: style.top + 5,
        width: style.width - 5,
        height: style.height - 5
      }}
      // Changing css classes depending on cell state
       className={`grid-item ${editModeState ? 'edit-mode' : ''}`}
       onClick={setEditModeOnHandler}
      >
        {editModeState ? 
          <Fragment>
            <textarea onChange={inputChangeHandler} value={inputValue} autoFocus />
            {/* DELETE ROW OR COL BUTTONS */}
            <div className='dropdown'>
              <button className='dropbtn delete'>
                <img src={deleteIcon} alt='' />
              </button>
              <div className='dropdown-content'>
                <button
                onClick={() => {
                  setEditModeOffHandler();
                  updateTableRowsAction({ rowIndex, shouldDelete: true });
                }}
              >Row</button>
              <button
                onClick={() => {
                  setEditModeOffHandler();
                  updateTableColsAction({ colIndex: columnIndex, shouldDelete: true });
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
                updateTableColsAction({ colIndex: columnIndex });
              }}
            >+</button>
            <button 
              className='edit-table-btn right'
              onClick={() => {
                setEditModeOffHandler();
                updateTableColsAction({ colIndex: columnIndex + 1 });
              }}
            >+</button>
          </Fragment>
            :
          data[rowIndex][columnIndex].value
        }
      </div>
    </ClickOutListener>
  );
}

const mapActionsToProps = {
  setCellValueAction,
  updateTableColsAction,
  updateTableRowsAction
};

export default connect(null, mapActionsToProps)(Cell);
