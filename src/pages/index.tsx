import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { connect, ConnectedProps } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import TableEditorToolbar from '../components/TableEditorToolbar/Toolbar';
import TableContainer from '../components/TableEditor/TableContainer';
import { storeStateType } from '../redux/store';
import { LoadingKeysEnum } from '../redux/enums';

const useStyles = makeStyles({
  cellEditModalLoaderContainer: {
    zIndex: 100,
    color: '#fff',
  }
});

type ReduxProps = ConnectedProps<typeof connectToRedux>;

const index: React.FunctionComponent<ReduxProps> = props => {

  const classes = useStyles();

  const { loading } = props;

  return (
    <React.Fragment>
       <style global jsx>{`
        body {
          overflow: hidden;
        }
      `}</style>
      <Backdrop open={loading.includes(LoadingKeysEnum.CELL_EDIT_MODAL_LOADING)} className={classes.cellEditModalLoaderContainer}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <TableEditorToolbar />
      <TableContainer />
    </React.Fragment>
  );
}

const mapStateToProps = (state: storeStateType) => ({
  loading: state.ui.loading
});

const connectToRedux = connect(mapStateToProps);  

export default connectToRedux(index);
