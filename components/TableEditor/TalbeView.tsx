import React from 'react'
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { RenderTableDataInterface } from './TableContainer';

interface TableViewPropsInterface {
  data: RenderTableDataInterface
}

const TableView: React.FunctionComponent<TableViewPropsInterface> = props => {

  const { data: { 
    colsMaxWidth, rowsMaxHeight,
    colsAmount, rowsAmount,
    rows
   } } = props;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          columnCount={colsAmount}
          rowCount={rowsAmount}
          width={width}
          height={height * 13.5}
          columnWidth={index => colsMaxWidth[index] + 250}
          rowHeight={index => rowsMaxHeight[index] + 50}
          itemData={rows}
        >
          {}
        </Grid>
      )}
    </AutoSizer>
  );
}

export default TableView;