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
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  rootContainer: {
    flex: '1 1 auto', 
    height: '90.8vh',
    [theme.breakpoints.down('xs')]: {
      height: '87.2vh'
    }
  }
}));

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
    <div style={{ display: 'flex' }}>
      <div className={classes.rootContainer}>
        <AutoSizer>
          {({ height, width }) => (
            <TableContainer 
              className={classes.tableContainer} 
              component={Paper}
              style={{ width, height }}
            >
              <Table component='div'>
                <TableBody component='div'>
                  <List
                    width={width}
                    height={height}
                    itemCount={rowsAmount}
                    itemSize={getRowsHeigth}
                    itemData={data}
                    ref={listRefHandler}
                    overscanCount={5}
                    style={{overflow: 'scroll'}}
                  >
                    {({style, data, index}) => <Row styleData={style} data={data} rowIndex={index} />}
                  </List>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default TableView;