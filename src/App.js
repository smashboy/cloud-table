import React, { useState, Fragment, useEffect } from 'react'
import TableView from "./Components/TableView"
import Toolbar from "./Components/Toolbar"
import './App.css'

const App = () => {

  // Temporary state, later will be moved to redux store
  const [tableState, setTable] = useState({

    // Table limits
    colsMax: 20,
    rowsMax: 500,
    cellValueMaxLength: 150,

    // Total number of rows and columns in table:
    colsAmount: 0,
    rowsAmount: 0,

    // List of rows
    // Each row consists of array of cells (2D Array)
    rows: []
  })

  const generateTableHandler = ({ rowsAmount, colsAmount }) => {
    // If table limits exceeded, show alert and do not generate table
    if (rowsAmount < 1 || rowsAmount > tableState.rowsMax) {
      alert(`Rows range exceeded: 1-${tableState.rowsMax}`)
      return
    }

    if (colsAmount < 1 || colsAmount > tableState.colsMax) {
      alert(`Columns range exceeded: 1-${tableState.colsMax}`)
      return
    }

    let rows = []

    // Saving cell data to 2D Array
    for (let i = 0; i < rowsAmount; i++) {
      rows.push([])
      for (let j = 0; j < colsAmount; j++) {
        rows[i].push({
          rowIndex: i,
          colIndex: j,
          value: "",
        })    
      }
    }

    setTable({
      ...tableState,
      rowsAmount,
      colsAmount,
      rows
    })
  }

  useEffect(() => {
    // Generating 5x5 table by default
    generateTableHandler({ rowsAmount: 5, colsAmount: 5 })
  }, [])

  const setCellValueHandler = ({ rowIndex, colIndex, value }) => {
    let rows = tableState.rows
    rows[rowIndex][colIndex].value = value
    setTable({
      ...tableState,
      rows
    })
  }

  // For debug purposes
  // useEffect(() => {
  //   console.log(tableState)
  // }, [tableState])

  return (
    <Fragment>
      <Toolbar
        data={{
          generateTableHandler, 
          colsMax: tableState.colsMax, 
          rowsMax: tableState.rowsMax
        }}
      />
      <div className="appContainer">
        <h3>Table Preview:</h3>
        <TableView
          data={tableState}
          setCellValueHandler={setCellValueHandler}
        />
      </div>
    </Fragment>
  )
}

export default App
