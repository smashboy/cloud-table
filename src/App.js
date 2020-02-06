import React, { useState, useEffect, Fragment } from 'react';
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

  const [renderDataState, setRenderData] = useState(null);

  useEffect(() => {
    if (tableHistory.length > 0) {
      getTableMaxDimensions(tableHistory[currentTableIndex]);
    }
  }, [tableHistory, currentTableIndex]);

  // We need to set max rows heights and cols widhts,
  // because react-window can't is not able to do it 
  const getTableMaxDimensions = ({ rows, ...other }) => {

    const tableDataLengths = [];

    // Getting each cell value length
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cellsLengthData = [];
      for (let j = 0; j < row.length; j++) {
        const valueLength = row[j].value.length;
        cellsLengthData.push(valueLength);
      }
      tableDataLengths.push(cellsLengthData);
    }

    // Geting the largest column values to set max cols width
    const getCol = (arr, index) => {
      const col = [];
      for (let i = 0; i < arr.length; i++) {
        col.push(arr[i][index]); 
      }
      return Math.max(...col);
    }

    const colsMaxWidth = tableDataLengths
      .map((el, index) => getCol(tableDataLengths, index))
      .filter(num => !Number.isNaN(num));
    
    // Same for rows heights, but much simpler
    const rowsMaxHeight = tableDataLengths.map(row => (Math.max.apply(Math, row)));

    const tableMaxDimensions = { colsMaxWidth, rowsMaxHeight };

    setRenderData({
      tableMaxDimensions,
      tableData: { rows, ...other }
    });
  }

  return (
    <Fragment>
      <Toolbar />
      <div className='appContainer'>
        <h3>Table Preview:</h3>
        {renderDataState ?
          <TableView
            data={renderDataState}
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
