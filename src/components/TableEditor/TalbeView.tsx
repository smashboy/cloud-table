import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { RenderTableDataInterface } from './TableContainer';
import Row from './Row';

const useStyles = makeStyles({
  tableContainer: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    minHeight: '100vh'
  },
  table: {
    width: '100%',
    height: '100%'
  },
  tableBody: {
    width: '100%',
    height: '100%'
  },
  list: {
    minHeight: '90vh'
  }
});

interface TableViewPropsInterface {
  data: RenderTableDataInterface
}

const TableView: React.FunctionComponent<TableViewPropsInterface> = props => {

  const { data } = props;

   const { rowsAmount, rowsMaxHeight } = data;

  const classes = useStyles();

  const [listRefState, setListRef] = React.useState<any | null>(null);

  const getRowsHeigth = (index: number):number => rowsMaxHeight[index] + 50

  const listRefHandler = (ref: any) => {
    setListRef(ref);
  }

  // Reset table(rows, cells) sizes when data is changed
  React.useMemo(() => {
    if (listRefState !== null) {
      listRefState.resetAfterIndex(0);
    }
  }, [data]);

  return (
    <AutoSizer>
      {({ height, width }) => {
        const adjustedHeight = height * 8.25;
        return <TableContainer 
          className={classes.tableContainer} 
          component={Paper}
          style={{ width, height: height }}
        >
          <Table component='div' className={classes.table}>
            <TableBody component='div' className={classes.tableBody}>
              <List
                width={width}
                height={adjustedHeight}
                itemCount={rowsAmount}
                itemSize={getRowsHeigth}
                itemData={data}
                ref={listRefHandler}
                className={classes.list}
                overscanCount={5}
                style={{overflow: 'scroll'}}
              >
                {({style, data, index}) => <Row styleData={style} data={data} rowIndex={index} />}
              </List>
            </TableBody>
          </Table>
        </TableContainer>
      }}
    </AutoSizer>
  );
}

export default TableView;