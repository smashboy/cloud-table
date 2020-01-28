import React from 'react';
import { connect } from 'react-redux';
import clearTableAction from '../../redux/actions/tableActions/clearTableAction';

const ClearTableBtn = props => {

  const { clearTableAction } = props;

  return (
    <button onClick={clearTableAction}>
      Clear Table
    </button>
  );
}

const mapActionsToProps = {
  clearTableAction
};

export default connect(null, mapActionsToProps)(ClearTableBtn);
