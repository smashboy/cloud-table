import React from 'react';
import Row from './Row';
import './TableView.css';

const TableView = props => {

  const { data } = props;

  return (
    <table>
      <tbody>
        {data.map((row, i) => 
          <Row 
            key={i} 
            cells={row}
          />
        )}
      </tbody>
    </table>
  );
}

export default TableView;
