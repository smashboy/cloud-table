import React, { ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import { storeStateType } from '../../redux/store';
import importCsvAciton from '../../redux/actions/tableActions/importCsvAction';
import { LoadingKeysEnum, ErrorKeysEnum } from '../../redux/enums';

type Props = ConnectedProps<typeof connectToRedux>;

const useStyles = makeStyles({
  title: {
    textAlign: 'center'
  },
  importContainer: {
    position: 'relative',
    overflow: 'hidden',
    padding: 10,
    border: '1px solid #3f51b5',
    borderRadius: 5,
    height: 250,
    display: 'block'
  },
  importContainerTitle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#666666',
    margin: 0
  },
  importInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    opacity: 0
  },
  importErrorContainer: {
    textAlign: 'center',
    margin: '20px 10px 10px 10px',
    color: 'red'
  }
});

const ImportCsvModal: React.FunctionComponent<Props> = props => {

  const { errors, loading, importCsvAciton } = props;

  const classes = useStyles();

  const [modalState, setModal] = React.useState<boolean>(false);

  const modalOpenHandler = (): void => {
    setModal(true);
  }

  const modalCloseHandler = (): void => {
    setModal(false);
  }

  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();

    const files = event.target.files;

    if (files === null) return;

    Array.from(files).forEach((file: File) => {
      importCsvAciton(file)
    });
  }

  return (
    <React.Fragment>
      <Button onClick={modalOpenHandler}>Import CSV</Button>
      <Dialog 
        open={modalState} 
        onClose={modalCloseHandler} 
        aria-labelledby='import-table-dialog-title'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id='import-table-dialog-title' className={classes.title}>Import CSV</DialogTitle>
        <DialogContent>
          <div className={classes.importContainer}>
              <Typography className={classes.importContainerTitle} align='center' component='div' variant='h6'>
                {loading.includes(LoadingKeysEnum.IMPORT_CSV_LOADING) ? 
                  'Loading...' 
                    : 
                  'Select file or drag and drop it'
                }
              </Typography>
              <input
                type='file'
                className={classes.importInput}
                onChange={fileChangeHandler}
              />
            </div>
          {errors[ErrorKeysEnum.IMPORT_CSV_ERROR] ? <div className={classes.importErrorContainer}>{errors[ErrorKeysEnum.IMPORT_CSV_ERROR]}</div> : null}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state: storeStateType) => ({
  errors: state.ui.errors,
  loading: state.ui.loading
});

const mapActionsToProps = {
  importCsvAciton
}

const connectToRedux = connect(mapStateToProps, mapActionsToProps);

export default connectToRedux(ImportCsvModal);
