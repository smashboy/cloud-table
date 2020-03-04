import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { connect, ConnectedProps } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

import { storeStateType } from '../../redux/store';
import tableHistoryAction from '../../redux/actions/editorActions/tableHistoryAction';

type Props = ConnectedProps<typeof connectToRedux>;

const HistoryBtns: React.FunctionComponent<Props> = props => {

  const { currentTableIndex, tableHistoryLimitIndex, tableHistorySize, tableHistoryAction } = props;

  return (
    <React.Fragment>
      <Tooltip title='Undo' arrow>
        <span>
          <IconButton 
            aria-label='undo-table-history' 
            disabled={currentTableIndex === 0}
            onClick={() => tableHistoryAction(true)}
          >
            <UndoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Redo' arrow>
        <span>
          <IconButton 
            aria-label='redo-table-history' 
            disabled={
              currentTableIndex === tableHistoryLimitIndex 
                || 
              currentTableIndex === tableHistorySize - 1
            }
            onClick={() => tableHistoryAction(false)}
          >
            <RedoIcon />
          </IconButton>
        </span>
      </Tooltip>
    </React.Fragment>
  );
}

const mapStateToProps = (state: storeStateType) => ({
  currentTableIndex: state.editor.currentTableIndex,
  tableHistoryLimitIndex: state.editor.historyLimit - 1,
  tableHistorySize: state.editor.history.length
});

const mapActionsToProps = {
  tableHistoryAction
};

const connectToRedux = connect(mapStateToProps, mapActionsToProps);

export default connectToRedux(HistoryBtns);
