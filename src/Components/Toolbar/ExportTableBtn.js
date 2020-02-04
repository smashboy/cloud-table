import React from 'react';
import { connect } from 'react-redux';
import { parse } from 'json2csv';
import fileDownload from 'js-file-download';

const ExportTableBtn = props => {

  const { tableData } = props;

  const downloadHandler = tableData => {
    try {
      // Before exporting table we need to reformat data
      const formattedTableData = tableData.rows.map(row => 
        row.map(cell => cell.value)
      );

      const csv = parse(formattedTableData, { header: false });
      
      fileDownload(csv, 'table.csv');
    } catch (err) {
      // Tomorrow will start working on UI
      console.error(err);
    }
  }

  return (
    <button onClick={downloadHandler.bind(this, tableData)}>
      Export Table
    </button>
  );
}

const mapStateToProps = state => ({
  tableData: state.table.tableHistory[state.table.currentTableIndex]
});

export default connect(mapStateToProps)(ExportTableBtn);
