import React from 'react'

import {withRouter} from 'react-router-dom'

import {Dialog} from 'primereact/dialog'
import { Button } from 'primereact/button'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import EntriesTable from './entries-table'
import EntriesService from '../../app/service/entries-service'
import LocalStorageService from '../../app/service/local-storage-service'

import * as messages from '../../components/toastr'

class Entries extends React.Component {

    state = {
        year: '',
        month: '',
        type: '',
        description: '',
        showConfirmDialog: false,
        entryToDelete: {},
        entries: []
    }

    constructor() {

        super()

        this.service = new EntriesService()
    }

    search = () => {

        if(!this.state.year) {

            messages.errorMessage('Must provide an year.');
            return false;
        }

        const signedUser = JSON.parse(LocalStorageService.getItem('_signed_user'))

        const filter = {
            year: this.state.year,
            month: this.state.month,
            type: this.state.type,
            description: this.state.description,
            user: signedUser.id
        };

        this.service
            .consult(filter)
            .then( response => {

                const results = response.data;

                if(results.length === 0) {

                    messages.warningMessage('No results found.');
                }

                this.setState({entries: results});

            }).catch( error => {

                console.log(error);

                messages.errorMessage('An error occurred.');
            })
    }

    edit = (id) => {

        this.props.history.push(`/register-entry/${id}`);
    }

    openConfirmDialog = (entry) => {

        this.setState({showConfirmDialog : true, entryToDelete: entry});
    }

    closeConfirmDialog = () => {

        this.setState({showConfirmDialog : false, entryToDelete: {}});
    }

    delete = () => {

        this.service
        .remove(this.state.entryToDelete.id)
        .then( response => {
            const entries = this.state.entries;
            const entryIndex = entries.indexOf(this.state.entryToDelete);
            entries.splice(entryIndex, 1);
            this.setState({entries: entries, showConfirmDialog: false});
            messages.successMessage('Entry deleted.');
        }).catch( error => {
            messages.errorMessage('An error occurred.');
        });
    }

    updateStatus = (entry, status) => {

        this.service.updateStatus(entry.id, status)
        .then( response => {
            const entries = this.state.entries;
            const index = entries.indexOf(entry);
            if(index !== -1) {
                entry['status'] = status;
                entries[index] = entry;
                this.setState({entries});
            }
            messages.successMessage('Status updated.');
        }).catch( error => {
            messages.errorMessage('An error occurred.');
        })
    }

    prepareEntryRegisterForm = () => {

        this.props.history.push('/register-entry');
    }

    render() {

        const monthsList = this.service.getMonthsList();

        const typesList = this.service.getTypesList();

        const confirmDialogFooter = <div>
                                        <Button label="Delete" icon="pi pi-check" onClick={this.delete} />
                                        <Button label="Cancel" icon="pi pi-times" onClick={this.closeConfirmDialog} className="p-button-secondary"/>
                                    </div>

        return(
            <Card title="My entries">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Year: *" htmlFor="inputYear">
                                <input type="text"
                                        className="form-control"
                                        id="inputYear"
                                        placeholder="Insert an year"
                                        value={this.state.year}
                                        onChange={ (e) => this.setState({ year: e.target.value }) }/>
                            </FormGroup>
                            <FormGroup label="Month: " htmlFor="inputMonth">
                                <SelectMenu id="inputMonth" 
                                            className="form-control" 
                                            list={monthsList}
                                            value={this.state.month}
                                            onChange={ (e) => this.setState({ month: e.target.value }) } />
                            </FormGroup>
                            <FormGroup label="Description: " htmlFor="inputDescription">
                                <input type="text"
                                        className="form-control"
                                        id="inputDescription"
                                        placeholder="Insert a description"
                                        value={this.state.description}
                                        onChange={ (e) => this.setState({ description: e.target.value }) }/>
                            </FormGroup>
                            <FormGroup label="Type: " htmlFor="inputType">
                                <SelectMenu id="inputType" 
                                            className="form-control" 
                                            list={typesList}
                                            value={this.state.type}
                                            onChange={ (e) => this.setState({ type: e.target.value }) } />
                            </FormGroup>
                            <button 
                                onClick={this.search} 
                                type="button" 
                                className="btn btn-success">
                                    <i className="pi pi-search"></i>    Search
                                </button>
                            <button 
                                onClick={this.prepareEntryRegisterForm} 
                                type="button" 
                                className="btn btn-danger">
                                    <i className="pi pi-plus"></i>      Register entry
                                </button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <EntriesTable 
                                list={this.state.entries} 
                                deleteAction={this.openConfirmDialog} 
                                editAction={this.edit}
                                updateStatus={this.updateStatus} />
                        </div>
                    </div>
                </div>
                <div>
                <Dialog 
                    header="Confirm delete entry" 
                    visible={this.state.showConfirmDialog} 
                    style={{width: '50vw'}} 
                    modal={true} 
                    onHide={() => this.setState({showConfirmDialog: false})}
                    footer={confirmDialogFooter}>
                        Are you sure you wish do delete this entry?
                </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(Entries)