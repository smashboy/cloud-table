import React from 'react';
import { connect } from 'react-redux';
import importTableAction from '../../redux/actions/tableActions/importTableAction';

const ImportCsvBtn = props => {

  const { importTableAction } = props;

  return (
    <div className='import-btn-wrapper'>
      <input 
        type='file'
        onChange={importTableAction}
      />
      <button>
        Import CSV
      </button>
    </div>
  );
}

const mapActionsToProps = {
  importTableAction
};

export default connect(null, mapActionsToProps)(ImportCsvBtn);


