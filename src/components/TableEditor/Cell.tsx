import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import CellModel, { CellEditModeEnum } from '../../../models/Table/Cell';
import setCellDataAction from '../../redux/actions/editorActions/setCellDataAction';
import setEditModeAction from '../../redux/actions/editorActions/setEditModeAction';
import ClickOutsideListener from './_ClickOutsideListener';
import { storeStateType } from '../../redux/store';

interface CellPropsInterface {
  styleData?: any,
  data: CellModel[][],
  rowIndex: number,
  colIndex: number
}

type Props = ConnectedProps<typeof connectToRedux>;

const useStyles = makeStyles({
  gridItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative'
  },
  cellTextArea: {
    resize: 'none',
    width: '100%',
    height: '100%'
  }
});

const Cell: React.FunctionComponent<Props & CellPropsInterface> = props => {

  const { 
    styleData, data, colIndex, rowIndex,
    setCellDataAction, setEditModeAction, editableCell
  } = props;

  const { value, editMode } = data[rowIndex][colIndex];

  const classes = useStyles();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => setCellDataAction(event.target.value);

  const setEditModeOnHandler = () => {
    if(editMode === CellEditModeEnum.EDIT_MODE_OFF) {
      setEditModeAction(data[rowIndex][colIndex]); 
    }
  }

  const setEditModeOffHandler = () => {
    if(editMode === CellEditModeEnum.EDIT_MODE_ON) {
      setEditModeAction({
        ...data[rowIndex][colIndex],
        value: editableCell?.value || ''
      });
    }
  }

  return (
    // @ts-ignore
    <ClickOutsideListener onClickOut={setEditModeOffHandler}>
      <div
        style={{
          ...styleData,
          left: styleData.left + 5,
          top: styleData.top + 5,
          width: styleData.width - 5,
          height: styleData.height - 5
        }}
        className={classes.gridItem}
        onClick={setEditModeOnHandler}
      >
        {
          editMode === CellEditModeEnum.EDIT_MODE_OFF ? value 
            : 
          editMode === CellEditModeEnum.EDIT_MODE_ON ?
            <React.Fragment>
              <textarea className={classes.cellTextArea} onChange={inputChangeHandler} value={editableCell?.value} autoFocus />
            </React.Fragment>
            :
          null
        }
      </div>
    </ClickOutsideListener>
  );
}

const mapStateToProps = (state: storeStateType) => ({
  editableCell: state.editor.editableCell
})

const mapActionsToProps = {
  setCellDataAction,
  setEditModeAction
};

const connectToRedux = connect(mapStateToProps, mapActionsToProps);  

export default connectToRedux(Cell);
