  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, ConnectedProps } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';

import CellModel from '../../../models/Table/Cell';
import CellEditModal from './CellEditModal';
import TableEditMenu from './TableEditMenu';
import { storeStateType } from '../../redux/store';

interface CellPropsInterface {
  data: CellModel;
  cellWidth: number;
  cellHeight: number;
}

const useStyles = makeStyles({
  cell: {
    cursor: 'pointer',
    position: 'relative',
    minWidth: 100,
    minHeight: 50,
    display: 'block',
    flexGrow: 0,
    flexShrink: 0,
    border: '1px solid rgba(224, 224, 224, 1)',
    opacity: .75,
    '&:hover': {
      opacity: 1
    }
  },
  column: {},
  expandingCell: {
    flex: 1
  }
});

type ReduxProps = ConnectedProps<typeof connectToRedux>;

const Cell: React.FunctionComponent<ReduxProps & CellPropsInterface> = props => {

  const { data, editModeIndex, cellWidth, cellHeight } = props;
  const { value, cellColor, valueColor, rowIndex, colIndex } = data;

  const classes = useStyles();

  const [displayTools, setDisplayTools] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (editModeIndex !== null && (editModeIndex.rowIndex === rowIndex && editModeIndex.colIndex === colIndex)) {
      setDisplayTools(true);
    }
  });

  return (
    <TableCell
      component='div'
      style={{
        backgroundColor: cellColor,
        color: valueColor,
        flexBasis: Math.round(cellWidth + 50) || '',
        height: cellHeight + 50
      }}
      className={clsx(
        classes.cell,
        classes.column,
        cellWidth && classes.expandingCell
      )}
      onTouchStart={() => setDisplayTools(true)}
      onTouchCancel={() => setDisplayTools(false)}
      onMouseEnter={() => setDisplayTools(true)}
      onMouseLeave={() => setDisplayTools(false)}
    >
      {value}
      {displayTools ? 
        <React.Fragment>
          <TableEditMenu cellData={data} />
          <CellEditModal cellData={data} setDisplayTools={setDisplayTools} />
        </React.Fragment> : null
      }
    </TableCell>
  );
};

const mapStateToProps = (state: storeStateType) => ({
  editModeIndex: state.editor.editModeIndex
});

const connectToRedux = connect(mapStateToProps);

export default connectToRedux(Cell);