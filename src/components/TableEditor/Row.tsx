import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

import Cell from './Cell';
import { RenderTableDataInterface } from './TableContainer';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    boxSizing: 'border-box',
    minWidth: '100%',
    width: '100%'
  }
});

interface RowPropsInterface {
  styleData?: any;
  data: RenderTableDataInterface;
  rowIndex: number;
}

const Row: React.FunctionComponent<RowPropsInterface> = props => {

  const { styleData, data, rowIndex } = props;
  const { rows, colsMaxWidth } = data;

  const classes = useStyles();

  const rowData = rows[rowIndex];

  return (
    <TableRow 
      component='div' 
      className={classes.row} 
      style={styleData}
    >
      {rowData.map((cellData, cellIndex) =>(
        <Cell key={rowIndex + cellIndex} data={cellData} cellWidth={colsMaxWidth[cellIndex]} />
      ))}
    </TableRow>
  );
}

export default Row;
