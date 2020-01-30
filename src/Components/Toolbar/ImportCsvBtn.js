import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import importCsvAction from '../../redux/actions/tableActions/importCsvAction';
import { importCsvLoading, importCsvError } from '../../redux/constants';

const ImportCsvBtn = props => {

  const { ui: { errors, loading }, importCsvAction } = props;

  const [modalShowState, setModalShow] = useState(false);

  const modalOpenHandler = () => {
    setModalShow(true);
  }

  const modalCloseHander = () => {
    setModalShow(false);
  }

  const importCsvHandler = event => {
    importCsvAction(event)
      .then(success => {
        if (success) {
          modalCloseHander();
        }
      });
  }

  return (
    <Fragment>
      <button onClick={modalOpenHandler}>Import CSV</button>
      <div className={`modal ${modalShowState ? 'show' : 'hide'}`}>
        <div className='modal-container'>
          <button className='close-modal-btn' onClick={modalCloseHander}>X</button>
          <h2 className='modal-title'>Import CSV File</h2>
          <div className='import-container'>
            <h4 className='drag-and-drop-title'>
              {loading.includes(importCsvLoading) ? 
                'Loading...' 
                  : 
                'Select file or drag and drop it'
              }
            </h4>
            <input
              type='file'
              onChange={importCsvHandler}
            />
          </div>
          {errors[importCsvError] ? <div className='import-csv-error-message'>{errors[importCsvError]}</div> : null}
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  ui: state.ui
});

const mapActionsToProps = {
  importCsvAction
};

export default connect(mapStateToProps, mapActionsToProps)(ImportCsvBtn);


