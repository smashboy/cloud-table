import React from 'react'
import Cell from "./Cell"

const Row = (props) => {
    const { cells, setCellValueHandler } = props
    return (
        <tr>
            {cells.map((cell, i) =>
                <Cell 
                    key={i} 
                    cellData={cell}
                    setCellValueHandler={setCellValueHandler}
                />
            )}
        </tr>
    )
}

export default Row
