import React, { useState } from 'react'

const GenerateTableForm = (props) => {

    const { data: { generateTableHandler, colsMax, rowsMax } } = props

    // For inputs values we don't need redux, 
    // because we don't use inputs data outside this component
    // if data is not valid
    const [inputState, setInput] = useState({
        rowsInput: 1,
        colsInput: 1
    })

    const inputChangeHandler = (event) => {
        // If user is dum-dum and enters float number
        setInput({...inputState, [event.target.id]: Math.floor(event.target.value)})
    }

    return (
        <form noValidate>
            <label>Rows{`(1-${rowsMax})`}:</label>
            <input
                id="rowsInput"
                type="number"
                value={inputState.rowsInput}
                onChange={inputChangeHandler} 
            />
            <label>Columns{`(1-${colsMax})`}:</label>
            <input
                id="colsInput"
                type="number" 
                value={inputState.colsInput}
                onChange={inputChangeHandler} 
            />
            <button 
                type="submit"
                onClick={(e) => {
                // Prevent page from reloading on form submit
                e.preventDefault()
                generateTableHandler({
                    rowsAmount: inputState.rowsInput, 
                    colsAmount: inputState.colsInput
                })
            }}>Generate Table</button>
        </form>
    )
}

export default GenerateTableForm
