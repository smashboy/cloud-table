import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TableEditorToolbar from '../components/TableEditorToolbar/Toolbar';
import TableContainer from '../components/TableEditor/TableContainer';

const useStyles = makeStyles({
  tableEditorPageContainer: {
    // overflow: 'hidden'
  }
});

const index: React.FunctionComponent = () => {

  const classes = useStyles();

  return (
    <div className={classes.tableEditorPageContainer}>
      <TableEditorToolbar />
      <TableContainer />
    </div>
  );
}

export default index;
