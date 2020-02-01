import React, { useState } from 'react';
import { connect } from 'react-redux';
import ClickOutListener from 'react-onclickout';
import TextareaAutosize from 'react-textarea-autosize';
import setCellValueAction from '../../redux/actions/tableActions/setCellValueAction';

const Cell = props => {

  const { cellData: { value, rowIndex, colIndex }, setCellValueAction } = props;
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
          <TextareaAutosize onChange={inputChangeHandler} value={inputValue} autoFocus />
            :
          value
        }
      </td>
    </ClickOutListener>
  );
}

const mapActionsToProps = {
  setCellValueAction
};

export default connect(null, mapActionsToProps)(Cell);
