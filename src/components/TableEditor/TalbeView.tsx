import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { RenderTableDataInterface } from './TableContainer';
import Row from './Row';

const useStyles = makeStyles((theme: Theme) => createStyles({
  tableContainer: {
    marginTop: 70,
    flex: 1,
    display: 'block',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      marginTop: 105
    }
  },
  table: {
    width: '100%',
    height: '100%'
  },
  tableBody: {
    width: '100%'
  }
}));

interface TableViewPropsInterface {
  data: RenderTableDataInterface
}

const TableView: React.FunctionComponent<TableViewPropsInterface> = props => {

  const { data } = props;

   const { rowsAmount, rowsMaxHeight } = data;

  const classes = useStyles();

  const getRowsHeigth = (index: number):number => rowsMaxHeight[index] + 50

  return (
    <TableContainer 
      className={classes.tableContainer} 
      component={Paper}
    >
      <Table component='div' className={classes.table}>
        <TableBody component='div' className={classes.tableBody}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                itemCount={rowsAmount}
                itemSize={getRowsHeigth}
                itemData={data}
                style={{overflow: 'scroll'}}
              >
                {({style, data, index}) => <Row styleData={style} data={data} rowIndex={index} />}
              </List>
            )}
          </AutoSizer>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableView;

{/* <Measure 
  key={i}
  bounds
  onResize={(contentRect) => getRowsHeight(i, contentRect.bounds)}
>
  {({ measureRef }) => (
    <TableRow 
      component='div'
      ref={measureRef}
    >
      {row.map((cell, j) => <Cell key={j} data={cell} />)}
    </TableRow>
  )}
</Measure> */}