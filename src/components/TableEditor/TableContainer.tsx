import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import TableModel from '../../../models/Table/Table';
import { storeStateType } from '../../redux/store';
import generateTableAction from '../../redux/actions/editorActions/generateTableAction';
import TableView from './TalbeView';

export interface RenderTableDataInterface extends TableModel {
  colsMaxWidth: number[],
  rowsMaxHeight: number[],
  colsId: string[]
}

type Props = ConnectedProps<typeof connectToRedux>;

const TableContainer: React.FunctionComponent<Props> = props => {

  const { tableHistory, currentTableIndex, generateTableAction } = props;

  const [renderDataState, setRenderData] = React.useState<RenderTableDataInterface | null>(null);

  React.useEffect(() => {
    generateTableAction({ rowsAmount: 10, colsAmount: 20 });
  }, []);

  React.useEffect(() => {
    if (tableHistory.length > 0) {
      prepareDataForRender(tableHistory[currentTableIndex]);
    }
  }, [tableHistory, currentTableIndex]);

  /**
   * We need to set max rows heights and cols widhts,
   * because react-window can't is not able to do it
   * @param tableObject
   * RenderTableDataInterface
   */
  const prepareDataForRender = ({ rows, colsAmount, ...other }: TableModel): void => {
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

    const generateColsId = (colsAmount: number): string[] => {
      const colsId = [];
      const j = 'Z'.charCodeAt(0);
      let i = 'A'.charCodeAt(0);

      // Generate alphabet
      for (; i <= j; ++i) {
        colsId.push(String.fromCharCode(i));
      }
      return colsId.slice(0, colsAmount);
    }

    setRenderData({
      colsMaxWidth,
      rowsMaxHeight,
      rows,
      colsAmount,
      colsId: generateColsId(colsAmount),
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

const mapStateToProps = (state: storeStateType) => ({
  tableHistory: state.editor.history,
  currentTableIndex: state.editor.currentTableIndex
});

const mapActionsToProps = {
  generateTableAction
};

const connectToRedux = connect(mapStateToProps, mapActionsToProps);  

export default connectToRedux(TableContainer);