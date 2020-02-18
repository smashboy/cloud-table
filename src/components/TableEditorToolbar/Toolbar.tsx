import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import GenerateTableForm  from './GenerateTableForm';
import ImportCsvModal from './ImportCsvModal';
import ClearTableBtn from './ClearTableBtn';

const useStyles = makeStyles({
  toolbar: {
    padding: 10,
    position: 'relative',
    zIndex: 1
  }
});

const Toolbar: React.FunctionComponent = () => {

  const classes = useStyles();

  return (
    <Paper className={classes.toolbar} square>
      <GenerateTableForm />
      <ImportCsvModal />
      <ClearTableBtn />
    </Paper>
  );
}

export default Toolbar;