import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InfiniteScroller from 'react-infinite';
import Measure from 'react-measure';

import TableModel from '../../../models/Table/Table';
import Cell from './Cell';
import useMounted from '../../customHooks/useMounted';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    marginTop: 70,
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      marginTop: 105
    }
  },
  scrollerContainer: {
    backgroundColor: '#ccc'
  }
}));

interface TableViewPropsInterface {
  table: TableModel;
}

interface TableRenderInterface extends TableViewPropsInterface {
  rowsHeight: RowHeightDataInterface[];
}

interface RowHeightDataInterface {
  index: number;
  height: number;
}

const TableView: React.FunctionComponent<TableViewPropsInterface> = props => {

  const { table } = props;

  const classes = useStyles();
  const isMounted = useMounted();

  const [renderData, setRenderData] = React.useState<TableRenderInterface | null>(null);

  const initRenderData = (table: TableModel): void => {
    const newRowsHeightData = new Array(table.rows.length)
    .fill({})
    // fill in initial data
    .map((data: RowHeightDataInterface, index) => ({ ...data, index, height: 33 }))
    setRenderData({
      table: table,
      rowsHeight: newRowsHeightData
    });
  }

  React.useMemo(() => initRenderData(table), [table]);

  const getRowsHeight = (i: number, d: any) => {
    const roundedHeight = Math.round(d.height);
    console.log(i, roundedHeight);
    setTimeout(() => {
      setRenderData(prevState => {
        if (prevState !== null) {
          return { ...prevState, rowsHeight: prevState.rowsHeight.map(data => data.index === i ? { ...data, height: roundedHeight } : data) }
        } else return null;
      });
    }, 10);
  }

  return (
    renderData ?
        <TableContainer 
          className={classes.grid} 
          component={Paper}
          style={{
            width: isMounted ? window.screen.width : 0,
            height: isMounted ? window.screen.height : 0,
          }}
        >
          <Table component='div'>
            <TableBody component='div'>
              <InfiniteScroller 
                className={classes.scrollerContainer} 
                containerHeight={isMounted ? window.screen.height : 400} 
                preloadBatchSize={isMounted ? window.screen.height * 1.5 : 400 * 1.5}
                preloadAdditionalHeight={isMounted ? window.screen.height * 1.5 : 400 * 1.5}
                elementHeight={renderData.rowsHeight.map(data => data.height)}
              >
                {renderData.table.rows.map((row, i) => (
                  <Measure 
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
                  </Measure>
                ))}
              </InfiniteScroller>
            </TableBody>
          </Table>
        </TableContainer> : null
  );
}

export default TableView;