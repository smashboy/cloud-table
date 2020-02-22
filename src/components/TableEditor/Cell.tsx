import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import CellModel from '../../../models/Table/Cell';
import setTableRowsAction from '../../redux/actions/editorActions/setTableRowsAction';
import setTableColsAction from '../../redux/actions/editorActions/setTableColsAction';
import ClickOutsideListener from './_ClickOutsideListener';
import CellEditModal from './CellEditModal';

interface CellPropsInterface {
  styleData?: any,
  data: CellModel[][],
  rowIndex: number,
  colIndex: number
}

type ReduxProps = ConnectedProps<typeof connectToRedux>;

const useStyles = makeStyles({
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    opacity: .75,
    '&:hover': {
      opacity: 1
    },
    '&:hover button': {
      display: 'inline-flex'
    }
  }
});

const Cell: React.FunctionComponent<ReduxProps & CellPropsInterface> = props => {

  const { styleData, data, colIndex, rowIndex } = props;

  const { value, cellColor, valueColor } = data[rowIndex][colIndex];

  const classes = useStyles();

  return (
    <div
      style={{
        ...styleData,
        left: styleData.left + 5,
        top: styleData.top + 5,
        width: styleData.width - 5,
        height: styleData.height - 5,
        backgroundColor: cellColor,
        color: valueColor
      }}
      className={classes.gridItem}
    >
      {value}
    <CellEditModal
      cellData={data[rowIndex][colIndex]}
    />
    </div>
  );
}

const mapActionsToProps = {
  setTableRowsAction,
  setTableColsAction
};

const connectToRedux = connect(null, mapActionsToProps);

export default connectToRedux(Cell);
