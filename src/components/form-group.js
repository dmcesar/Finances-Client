import React from 'react'

function FormGroup(props) {
    return (
        <div className="form-group">
            <label hmtlFor={props.hmtlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup