import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import TableView from './Components/TableView/TableView';
import Toolbar from './Components/Toolbar/Toolbar';
import generateTableAction from './redux/actions/tableActions/generateTableAction';
import './App.css';

const App = props => {

  const { tableData, generateTableAction } = props;

  useEffect(() => {
    generateTableAction({ rowsAmount: 5, colsAmount: 5 });
  }, []);

  return (
    <Fragment>
      <Toolbar />
      <div className='appContainer'>
        <h3>Table Preview:</h3>
        <TableView
          data={tableData}
        />
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  tableData: state.table.rows,
});

const mapActionsToProps = {
  generateTableAction
};

export default connect(mapStateToProps, mapActionsToProps)(App);
