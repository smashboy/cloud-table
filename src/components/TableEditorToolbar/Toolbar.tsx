import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import GenerateTableForm  from './GenerateTableForm';

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
    </Paper>
  );
}

export default Toolbar;