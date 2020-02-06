import React from 'react';
import Cell from './Cell';
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import './TableView.css';

const TableView = props => {

  const { data: { 
    tableData: { rows, colsAmount, rowsAmount },
    tableMaxDimensions: { colsMaxWidth, rowsMaxHeight }
  } } = props;

  return (
    <AutoSizer>
      {({ height, width }) => (
          <Grid
          className='grid'
          columnCount={colsAmount}
          rowCount={rowsAmount}
          width={width}
          height={height * 13.5}
          columnWidth={index => colsMaxWidth[index] + 250}
          rowHeight={index => rowsMaxHeight[index] + 50}
          itemData={rows}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
}

export default TableView;
