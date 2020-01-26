import React, { useState } from 'react';
import ClickOutListener from 'react-onclickout';
import './Css/Cell.css';

const Cell = props => {

  const { cellData: { value, rowIndex, colIndex }, setCellValueHandler } = props;
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
      setCellValueHandler({ rowIndex, colIndex, value: inputValue });
    }
  }

  return (
    <ClickOutListener onClickOut={setEditModeOffHandler}>
      <td
        id={`cell-${rowIndex}-${colIndex}`} 
        className={editModeState ? 'editMode' : value.length === 0 ? 'empty' : 'filled'} // Changing css classes depending on cell state
        onClick={setEditModeOnHandler}
      >
        {editModeState ?
          <input type='text' onChange={inputChangeHandler} value={inputValue} autoFocus/>
            :
          value
        }
      </td>
    </ClickOutListener>
  );
}

export default Cell;
