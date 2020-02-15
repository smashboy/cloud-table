import React from 'react';
import TableEditorToolbar from '../components/TableEditorToolbar/Toolbar';
import TableContainer from '../components/TableEditor/TableContainer';

const index: React.FunctionComponent = () => {

  return (
    <React.Fragment>
      <TableEditorToolbar />
      <TableContainer />
    </React.Fragment>
  );
}

export default index;
