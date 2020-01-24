import React from 'react'
import GenerateTableForm from './Components/GenerateTableForm'

const Toolbar = (props) => {
    const { data } = props

    return (
        <div className="toolbar">
            <GenerateTableForm data={data} />
        </div>
    )
}

export default Toolbar
