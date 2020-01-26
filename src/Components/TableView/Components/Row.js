import React from 'react';
import Cell from './Cell';

const Row = props => {
  
  const { cells } = props;

  return (
    <tr>
      {cells.map((cell, i) =>
        <Cell 
          key={i} 
          cellData={cell}
        />
      )}
    </tr>
  );
}

export default Row;
