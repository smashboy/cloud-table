import React from 'react';
import GenerateTableForm from './GenerateTableForm';
import ImportCsvBtn from './ImportCsvBtn';
import ExportTableBtn from './ExportTableBtn';
import ClearTableBtn from './ClearTableBtn';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <GenerateTableForm />
      <ImportCsvBtn />
      <ExportTableBtn />
      <ClearTableBtn />
    </div>
  );
}

export default Toolbar;
