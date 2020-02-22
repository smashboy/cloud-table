import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CellModel from '../../../models/Table/Cell';
import CellEditModal from './CellEditModal';
import TableEditMenu from './TableEditMenu';

interface CellPropsInterface {
  styleData?: any,
  data: CellModel[][],
  rowIndex: number,
  colIndex: number
}

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
    }
  }
});

const Cell: React.FunctionComponent<CellPropsInterface> = props => {

  const { styleData, data, colIndex, rowIndex } = props;
  const { value, cellColor, valueColor } = data[rowIndex][colIndex];

  const classes = useStyles();

  const [displayTools, setDisplayTools] = React.useState<boolean>(false);
  const [continueShowTools, setContinueShowTools] = React.useState<boolean>(false);

  // DONT FORGET TO CHEK THIS OUT LATER
  // const CellEditModalMemo = React.useMemo(() =>  <CellEditModal setContinueShowTools={setContinueShowTools} cellData={data[rowIndex][colIndex]} />, [data[rowIndex][colIndex]]);

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
      onMouseEnter={() => setDisplayTools(true)}
      onMouseLeave={() => {
        if (!continueShowTools) {
          setDisplayTools(false);
        }
      }}
    >
      {value}
      {displayTools ? 
        <React.Fragment>
          <TableEditMenu cellData={data[rowIndex][colIndex]} />
          <CellEditModal setContinueShowTools={setContinueShowTools} cellData={data[rowIndex][colIndex]} />
        </React.Fragment> : null
      }
    </div>
  );
};

export default Cell;
