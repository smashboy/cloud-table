  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';

import CellModel from '../../../models/Table/Cell';
import CellEditModal from '../CellEditModal/CellEditModal';
import TableEditMenu from './TableEditMenu';

const useStyles = makeStyles({
  cell: {
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    height: '100%',
    border: '1px solid rgba(224, 224, 224, 1)',
    wordBreak: 'break-all',
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

interface CellPropsInterface {
  data: CellModel;
  cellWidth: number;
}

const Cell: React.FunctionComponent<CellPropsInterface> = props => {

  const { data, cellWidth } = props;
  const { value, cellColor, valueColor } = data;

  const classes = useStyles();

  const [displayToolsState, setDisplayTools] = React.useState<boolean>(false);

  return (
    <TableCell
      component='div'
      style={{
        backgroundColor: cellColor,
        color: valueColor,
        // flexBasis: cellWidth > 0 ? Math.round(cellWidth + 100) : 100,
        minWidth: cellWidth > 0 ? Math.round(cellWidth + 100) : 100
      }}
      className={clsx(
        classes.cell,
        classes.column,
        cellWidth && classes.expandingCell
      )}
      // For optimization purposes, edit btns displayed only when user hovers or touch cell
      // Also material ui tooltip doesn't support css display: none, so we have to change
      // display state with js manually
      // Mobile events
      onTouchStart={() => setDisplayTools(true)}
      onTouchCancel={() => setDisplayTools(false)}
      // Desktop events
      onMouseEnter={() => setDisplayTools(true)}
      onMouseLeave={() => setDisplayTools(false)}
    >
      {value}
      <CellEditModal cellData={data} displayToolsState={displayToolsState} />
      {displayToolsState ? <TableEditMenu cellData={data} /> : null}
    </TableCell>
  );
};

export default Cell;