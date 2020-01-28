import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';

const ExportTableBtn = props => {

  const { tableData } = props;
  const [formattedTableData, setFormattedData] = useState([]);

  const downloadHandler = tableData => {
    
    // Before exporting table we need to reformat data
    setFormattedData(
      tableData.map(row => 
        row.map(cell =>
          // If there are additional quotes inside value
          cell.value.indexOf('"') >= 0 ? cell.value.replace(/"/g, '\"\"') : cell.value
        )
      )
    );

    // Let react csv module know that data can be exported
    return true;
  }

  return (
    <button>
      <CSVLink 
        data={formattedTableData}
        filename={'table.csv'}
        target='_blank'
        onClick={downloadHandler.bind(this, tableData)}
      >
        Export Table
      </CSVLink>
    </button>
  );
}

const mapStateToProps = state => ({
  tableData: state.table.rows
});

export default connect(mapStateToProps)(ExportTableBtn);
