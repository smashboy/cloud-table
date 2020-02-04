import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import tableHistoryAction from '../../redux/actions/tableActions/tableHistoryAction';

const HistoryBtns = props => {

  const { 
    currentTableIndex, tableHistoryLimitIndex,
    tableHistoryAction, tableHistorySize
  } = props;

  return (
    <Fragment>
      <button onClick={tableHistoryAction.bind(this, true)} disabled={currentTableIndex === 0}>Undo</button>
      <button onClick={tableHistoryAction.bind(this, false)} disabled={
        currentTableIndex === tableHistoryLimitIndex 
          || 
        currentTableIndex === tableHistorySize - 1
      }
      >Redo</button>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  currentTableIndex: state.table.currentTableIndex,
  tableHistoryLimitIndex: state.table.tableHistoryLimit - 1,
  tableHistorySize: state.table.tableHistory.length
});

const mapActionsToProps = {
  tableHistoryAction
};

export default connect(mapStateToProps, mapActionsToProps)(HistoryBtns);
