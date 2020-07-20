import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {

    const tableRows = props.list.map( entry => {

        return(
            <tr key={entry.id}>
                <td>{entry.description}</td>
                <td>{currencyFormatter.format(entry.value, {locale: 'pt-PT'} )}</td>
                <td>{entry.type}</td>
                <td>{entry.month}</td>
                <td>{entry.status}</td>
                <td>
                    <button 
                        title="Effect"
                        disabled={ entry.status !== "PENDING"}
                        className="btn btn-success"
                        onClick={e => props.updateStatus(entry, 'EFFECTED')} 
                        type="button">
                            <i className="pi pi-check"></i>
                    </button>
                    <button 
                        title="Cancel"
                        disabled={ entry.status !== "PENDING"}
                        className="btn btn-warning"
                        onClick={e => props.updateStatus(entry, 'CANCELED')} 
                        type="button">
                            <i className="pi pi-times"></i>
                    </button>
                    <button 
                        title="Edit"
                        onClick={ e => props.editAction(entry.id) } 
                        type="button" 
                        className="btn btn-primary">
                            <i className="pi pi-pencil"></i>

                    </button>
                    <button 
                        title="Delete"
                        onClick={ e => props.deleteAction(entry) } 
                        type="button" 
                        className="btn btn-danger">
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Value</th>
                    <th scope="col">Type</th>
                    <th scope="col">Month</th>
                    <th scope="col">Situation</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
}