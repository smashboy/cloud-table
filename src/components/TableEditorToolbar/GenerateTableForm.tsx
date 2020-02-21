import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { storeStateType } from '../../redux/store';
import generateTableAction from '../../redux/actions/editorActions/generateTableAction';
import { ErrorKeysEnum } from '../../redux/enums';

interface GenerateTableFormInterface {
  rowsInput: number,
  colsInput: number
}

type Props = ConnectedProps<typeof connectToRedux>;

const useStyles = makeStyles({
  title: {
    textAlign: 'center'
  }
});

const GenerateTableForm: React.FunctionComponent<Props> = props => {

  const { generateTableAction, errors } = props;

  const classes = useStyles();

  // For inputs values we don't need redux, 
  // because we don't use inputs data outside this component
  // if data is not valid
  const [inputState, setInput] = React.useState<GenerateTableFormInterface>({
    rowsInput: 5,
    colsInput: 5
  });

  const [modalState, setModal] = React.useState<boolean>(false);

  const { rowsInput, colsInput } = inputState;

  React.useEffect(() => {
    // Using only validation part
    generateTableAction({
      rowsAmount: rowsInput,
      colsAmount: colsInput,
      validateDataOnly: true
    });
  }, [inputState]);

  const modalOpenHandler = (): void => {
    setModal(true);
  }

  const modalCloseHandler = (): void => {
    setModal(false);
  }

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const target = event.target.id;
    
    // If user is dum-dum and enters float number or a negative number
    // or user is trying to pass bunch of zeroes at the beginning
    const parsedValue = Math.abs(parseInt(event.target.value, 10));

    // Block user to add more numbers if input is not valid
    if (
      (errors[ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR] && target === 'rowsInput' && parsedValue.toString().length > rowsInput.toString().length)
        ||
      (errors[ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR] && target === 'colsInput' && parsedValue.toString().length > colsInput.toString().length)
    ) return;

    setInput({
      ...inputState, 
      [target]: parsedValue || 1
    });
  }

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // Prevent page from reloading on form submit
    event.preventDefault();

    const success = generateTableAction({
      rowsAmount: rowsInput,
      colsAmount: colsInput
    });

    if (success) {
      modalCloseHandler();
    }
  }

  return (
    <React.Fragment>
      <Tooltip title='Create new table' arrow>
      <Button onClick={modalOpenHandler} startIcon={<AddIcon />}>New Table</Button>
      </Tooltip>
      <Dialog 
        open={modalState} 
        onClose={modalCloseHandler} 
        aria-labelledby='create-table-dialog-title'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id='create-table-dialog-title' className={classes.title}>Create New Table</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off'>
            <TextField
              id='rowsInput'
              label='Rows Amount'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              autoFocus
              error={errors[ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR] ? true : false}
              helperText={errors[ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR] || null}
              onChange={inputChangeHandler}
              value={rowsInput}
            />
            <TextField
              id='colsInput'
              label='Columns Amount'
              type='text'
              margin='normal'
              variant='outlined'
              fullWidth
              error={errors[ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR] ? true : false}
              helperText={errors[ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR] || null}
              onChange={inputChangeHandler}
              value={colsInput}
            />
          </form>
          <Button 
            variant='contained' 
            fullWidth
            type='submit'
            color='primary'
            disableElevation
            disabled={errors[ErrorKeysEnum.GENERATE_TABLE_ROWS_MAX_ERROR] || errors[ErrorKeysEnum.GENERATE_TABLE_COLS_MAX_ERROR] ? true : false}
            onClick={submitHandler}
          >
            Create Table
          </Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state: storeStateType) => ({
  errors: state.ui.errors
});

const mapActionsToProps = {
  generateTableAction
};

const connectToRedux = connect(mapStateToProps, mapActionsToProps);  

export default connectToRedux(GenerateTableForm);
