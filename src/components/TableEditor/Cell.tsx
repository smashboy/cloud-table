import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, ConnectedProps } from 'react-redux';

import CellModel from '../../../models/Table/Cell';
import CellEditModal from './CellEditModal';
import TableEditMenu from './TableEditMenu';
import { storeStateType } from '../../redux/store';

interface CellPropsInterface {
  styleData?: any,
  data: CellModel
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

type ReduxProps = ConnectedProps<typeof connectToRedux>;

const Cell: React.FunctionComponent<ReduxProps & CellPropsInterface> = props => {

  const { styleData, data, editModeIndex } = props;
  const { value, cellColor, valueColor, rowIndex, colIndex } = data;

  const classes = useStyles();

  const [displayTools, setDisplayTools] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (editModeIndex !== null && (editModeIndex.rowIndex === rowIndex && editModeIndex.colIndex === colIndex)) {
      setDisplayTools(true);
    }
  });

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
      onTouchStart={() => setDisplayTools(true)}
      onTouchCancel={() => setDisplayTools(false)}
      onMouseEnter={() => setDisplayTools(true)}
      onMouseLeave={() => setDisplayTools(false)}
    >
      {value}
      {displayTools ? 
        <React.Fragment>
          <TableEditMenu cellData={data} />
          <CellEditModal cellData={data} />
        </React.Fragment> : null
      }
    </div>
  );
};

const mapStateToProps = (state: storeStateType) => ({
  editModeIndex: state.editor.editModeIndex
});

const connectToRedux = connect(mapStateToProps);

export default connectToRedux(Cell);
