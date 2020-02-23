import React from 'react'
import { VariableSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { RenderTableDataInterface } from './TableContainer';
import Cell from './Cell';

interface TableViewPropsInterface {
  data: RenderTableDataInterface
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    marginTop: 70,
    maxHeight: '90vh',
    [theme.breakpoints.down('xs')]: {
      marginTop: 105
    }
  }
}));

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
          height={height * 125}
          columnWidth={index => {
            const columnWidth = colsMaxWidth[index] + 250;
            return columnWidth < 256 ? columnWidth : 255;
          }}
          rowHeight={index => {
            const rowHeight = rowsMaxHeight[index] + 50;
            return rowHeight < 410 ? rowHeight : 409;
          }}
          itemData={rows}
        >
          {({style, data, rowIndex, columnIndex}) => <Cell styleData={style} data={data[rowIndex][columnIndex]} />}
        </Grid>
      )}
    </AutoSizer>
  );
}

export default TableView;