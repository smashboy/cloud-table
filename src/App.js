import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import TableView from './Components/TableView/TableView';
import Toolbar from './Components/Toolbar/Toolbar';
import generateTableAction from './redux/actions/tableActions/generateTableAction';
import './App.css';

const App = props => {

  const { tableHistory, currentTableIndex, generateTableAction } = props;

  useEffect(() => {
    generateTableAction({ rowsAmount: 5, colsAmount: 5 });
  }, []);

  return (
    <Fragment>
      <Toolbar />
      <div className='appContainer'>
        <h3>Table Preview:</h3>
        {tableHistory.length > 0 ?
          <TableView
            data={tableHistory[currentTableIndex].rows}
          />
            :
          null
        }
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  tableHistory: state.table.tableHistory,
  currentTableIndex: state.table.currentTableIndex
});

const mapActionsToProps = {
  generateTableAction
};

export default connect(mapStateToProps, mapActionsToProps)(App);
