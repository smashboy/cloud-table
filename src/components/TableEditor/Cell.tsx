import React from 'react';
// import { connect, ConnectedProps } from 'react-redux';
// import ClickOutListener from 'react-onclickout';
import { makeStyles } from '@material-ui/core/styles';
import CellModel from '../../../models/Table/Cell';

interface CellPropsInterface {
  styleData?: any,
  data: CellModel[][],
  rowIndex: number,
  colIndex: number
}

// type Props = ConnectedProps<>;

const useStyles = makeStyles({
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative'
  }
});

const Cell: React.FunctionComponent<CellPropsInterface> = props => {

  const { styleData, data, colIndex, rowIndex } = props;

  const classes = useStyles();

  return (
    <div
    style={{
      ...styleData,
      left: styleData.left + 5,
      top: styleData.top + 5,
      width: styleData.width - 5,
      height: styleData.height - 5
    }}
    className={classes.gridItem}
    >
      {data[rowIndex][colIndex].value}
    </div>
  );
}

// const mapActionsToProps = {

// };

// const connectToRedux = connect(mapStateToProps, mapActionsToProps);  

export default Cell;
