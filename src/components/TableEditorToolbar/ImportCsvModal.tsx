import React, { ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { storeStateType } from '../../redux/store';
import importCsvAciton from '../../redux/actions/editorActions/importCsvAction';
import { LoadingKeysEnum, ErrorKeysEnum } from '../../redux/enums';
import useMounted from '../../customHooks/useMounted';

type Props = ConnectedProps<typeof connectToRedux>;

const useStyles = makeStyles((theme: Theme) => createStyles({
  title: {
    textAlign: 'center'
  },
  importContainer: {
    position: 'relative',
    overflow: 'hidden',
    padding: 10,
    border: '1px dotted #3f51b5',
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
  },
  mobileCloseModalBtn: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'inline-flex',
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  }
}));

const ImportCsvModal: React.FunctionComponent<Props> = props => {

  const { errors, loading, importCsvAciton } = props;

  const classes = useStyles();
  const isMounted = useMounted();

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
        .then((success: boolean) => {
          if (success) {
            modalCloseHandler();
          }
        });
    });
  }

  return (
    <React.Fragment>
      <Tooltip title='Import CSV File' arrow>
        <Button onClick={modalOpenHandler} startIcon={<ImportExportIcon />}>Import CSV</Button>
      </Tooltip>
      <Dialog 
        open={modalState} 
        onClose={modalCloseHandler} 
        aria-labelledby='import-table-dialog-title'
        maxWidth='sm'
        fullScreen={isMounted ? window.screen.width < 600 : false}
        fullWidth
      >
        <DialogTitle id='import-table-dialog-title' className={classes.title}>
          <Typography component='div' variant='h6'>Import CSV</Typography>
          <IconButton aria-label='close-modal' className={classes.mobileCloseModalBtn} onClick={modalCloseHandler}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
