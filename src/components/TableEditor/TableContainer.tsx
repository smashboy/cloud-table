import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import TableModel from '../../../models/Table/Table';
import { storeStateType } from '../../redux/store';
import generateTableAction from '../../redux/actions/editorActions/generateTableAction';
import TableView from './TalbeView';

type Props = ConnectedProps<typeof connectToRedux>;

const TableContainer: React.FunctionComponent<Props> = props => {

  const { tableHistory, currentTableIndex, generateTableAction } = props;

  // Table data with max dimensions
  const [processedData, setProcessedData] = React.useState<TableModel | null>(null);

  React.useEffect(() => {
    generateTableAction({ rowsAmount: 5, colsAmount: 5 });
  }, []);

  React.useEffect(() => {
    if (tableHistory.length > 0) {
      setProcessedData(tableHistory[currentTableIndex]);
    }
  }, [tableHistory, currentTableIndex]);

  return (
    <React.Fragment>
    {
      processedData ? <TableView table={processedData} /> : null
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