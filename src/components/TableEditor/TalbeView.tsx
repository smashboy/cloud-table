import React from 'react'
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { makeStyles } from '@material-ui/core/styles';

import { RenderTableDataInterface } from './TableContainer';
import Cell from './Cell';

interface TableViewPropsInterface {
  data: RenderTableDataInterface
}

const useStyles = makeStyles({
  grid: {
    backgroundColor: '#eeeeee'
  }
});

const TableView: React.FunctionComponent<TableViewPropsInterface> = props => {

  const { data: { 
    colsMaxWidth, rowsMaxHeight,
    colsAmount, rowsAmount,
    rows
   } } = props;

  const classes = useStyles();

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid
          className={classes.grid}
          columnCount={colsAmount}
          rowCount={rowsAmount}
          width={width}
          height={height * 12.4}
          columnWidth={index => colsMaxWidth[index] + 250}
          rowHeight={index => rowsMaxHeight[index] + 50}
          itemData={rows}
        >
          {({style, data, rowIndex, columnIndex}) => <Cell styleData={style} data={data} rowIndex={rowIndex} colIndex={columnIndex} />}
        </Grid>
      )}
    </AutoSizer>
  );
}

export default TableView;