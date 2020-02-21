import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
// import ArrowTopIcon from '@material-ui/icons/KeyboardArrowUp';
// import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import CellModel, { CellEditModeEnum } from '../../../models/Table/Cell';
import setCellDataAction from '../../redux/actions/editorActions/setCellDataAction';
import setEditModeAction from '../../redux/actions/editorActions/setEditModeAction';
import { storeStateType } from '../../redux/store';

const useStyles = makeStyles({
  moreBtn: {
    position: 'absolute',
    margin: 0,
    zIndex: 10,
    bottom: 3,
    right: 0,
    display: 'none',
    color: 'white'
  }
});

const DraggableComponent: React.FunctionComponent = (props) => {
  return (
    <Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

interface OtherPropsInterface {
 cellData: CellModel
}

type ReduxProps = ConnectedProps<typeof connectToRedux>;

const CellEditModal: React.FunctionComponent<ReduxProps & OtherPropsInterface> = (props) => {

  const { 
    cellData, editableCell,
    setEditModeAction, setCellDataAction
  } = props;

  const { editMode } = cellData;

  const classes = useStyles();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => setCellDataAction(event.target.value);

  const setEditModeOnHandler = (): void => {
    if(editMode === CellEditModeEnum.EDIT_MODE_OFF) {
      setEditModeAction(cellData);
    }
  }

  const setEditModeOffHandler = (saveData?: boolean): void => {
    if(editMode === CellEditModeEnum.EDIT_MODE_ON && saveData) {
      setEditModeAction({
        ...cellData,
        value: editableCell?.value || ''
      });
    } else if (editMode === CellEditModeEnum.EDIT_MODE_ON && !saveData) {
      setEditModeAction(cellData);
    }
  }

  return (
    <React.Fragment>
      <Tooltip title='Edit Cell' arrow>
        <IconButton
          className={classes.moreBtn}
          onClick={setEditModeOnHandler}
        >
        <EditIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <Dialog
        open={editMode === CellEditModeEnum.EDIT_MODE_ON}
        onClose={() => setEditModeOffHandler()}
        PaperComponent={DraggableComponent}
        aria-labelledby='draggable-dialog-title'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          Edit Cell
        </DialogTitle>
        <DialogContent>
          <Typography component='div' variant='h5'>Edit Cell Value:</Typography>
          <TextField 
            label='Cell Value'
            type='text'
            margin='normal'
            variant='outlined'
            fullWidth 
            multiline
            rows='4'
            rowsMax='6'
            onChange={inputChangeHandler}
            value={editableCell?.value} 
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setEditModeOffHandler()}
            variant='contained'
            color='secondary'
            disableElevation
          >
            Cancel
          </Button>
          <Button 
            onClick={() => setEditModeOffHandler(true)} 
            color='primary'
            variant='contained'
            disableElevation
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state: storeStateType) => ({
  editableCell: state.editor.editableCell
});

const mapActionsToProps = {
  setCellDataAction,
  setEditModeAction
};

const connectToRedux = connect(mapStateToProps, mapActionsToProps);  

export default connectToRedux(CellEditModal);
