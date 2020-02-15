import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import TableModel from '../../../models/Table/Table';
import { storeStateInterface } from '../../redux/store';
import generateTableAction from '../../redux/actions/tableActions/generateTableAction';
import TableView from './TalbeView';

export interface RenderTableDataInterface extends TableModel {
  colsMaxWidth: number[],
  rowsMaxHeight: number[]
}

type Props = ConnectedProps<typeof connectToRedux>;

const TableContainer: React.FunctionComponent<Props> = props => {

  const { tableHistory, currentTableIndex, generateTableAction } = props;

  const [renderDataState, setRenderData] = React.useState<RenderTableDataInterface | null>(null);

  React.useEffect(() => {
    generateTableAction({ rowsAmount: 5, colsAmount: 5 });
  }, []);

  React.useEffect(() => {
    if (tableHistory.length > 0) {
      getTableMaxDimensions(tableHistory[currentTableIndex]);
    }
  }, [tableHistory, currentTableIndex]);

  /**
   * We need to set max rows heights and cols widhts,
   * because react-window can't is not able to do it
   * @param tableObject
   * RenderTableDataInterface
   */
  const getTableMaxDimensions = ({ rows, ...other }: TableModel): void => {
    const tableDataLengths: number[][] = [];

    // Getting each cell value length
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cellsLengthData: number[] = [];
      for (let j = 0; j < row.length; j++) {
        const valueLength = row[j].value.length;
        cellsLengthData.push(valueLength);
      }
      tableDataLengths.push(cellsLengthData);
    }

    /**
     * Geting the largest column values to set max cols width
     * @param arr 
     * array of table values length
     * @param index
     * column index
     */
    const getCol = (arr: number[][], index: number): number => {
      const col = [];
      for (let i = 0; i < arr.length; i++) {
        col.push(arr[i][index]); 
      }
      return Math.max(...col);
    }

    const colsMaxWidth = tableDataLengths
      .map((el: number[], index: number) => getCol(tableDataLengths, index))
      .filter((num: number) => !Number.isNaN(num));
    
    // Same for rows heights, but much simpler
    const rowsMaxHeight = tableDataLengths.map((row: number[]) => (Math.max.apply(Math, row)));

    setRenderData({
      colsMaxWidth,
      rowsMaxHeight,
      rows,
      ...other
    });
  }
  return (
    <React.Fragment>
    {
      renderDataState ? <TableView data={renderDataState} /> : null
    }
    </React.Fragment>
  );
}

const mapStateToProps = (state: storeStateInterface) => ({
  tableHistory: state.table.history,
  currentTableIndex: state.table.currentTableIndex
});

const mapActionsToProps = {
  generateTableAction
};

const connectToRedux = connect(mapStateToProps, mapActionsToProps);  

export default connectToRedux(TableContainer);