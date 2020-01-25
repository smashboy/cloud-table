import React from 'react';
import Row from './Components/Row';
import './TableView.css';

const TableView = props => {

  const { data: { rows }, setCellValueHandler } = props;

  return (
    <table>
      <tbody>
        {rows.map((row, i) => 
          <Row 
            key={i} 
            cells={row}
            setCellValueHandler={setCellValueHandler}
          />
        )}
      </tbody>
    </table>
  );
}

export default TableView;
