import React from 'react'

import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import EntryService from '../../app/service/entries-service'
import LocalStorageService from '../../app/service/local-storage-service'

import * as messages from '../../components/toastr'

class EntryRegistryForm extends React.Component {

    constructor() {

        super();
        this.service = new EntryService();
    }

    state = {

        id: null,
        description: '',
        value: '',
        month: '',
        year: '',
        type: '',
        status: '',
        user: null,
        updateForm: false,
    };

    handleChange = (event) => {

        const value = event.target.value;

        const name = event.target.name;

        this.setState({[name]: value})
    }

    submit = () => {

        const user = JSON.parse(LocalStorageService.getItem('_signed_user'));
        const { description, value, month, year, type } = this.state;
        const entry =  {
            description,
            value,
            month,
            year,
            type,
            user: user['id']
        };
        try {
            this.service.validate(entry);
        } catch( error ) {
            const messages = error.messages;
            messages.forEach(msg => messages.errorMessage(msg));
            return false;
        }

        this.service
            .create(entry)
            .then( response => {
                this.props.history.push('/entries');
                messages.successMessage('Entry registered.');
            }).catch( error => {
                messages.errorMessage(error.response.data);
            });
    }

    update = () => {

        const { description, value, month, year, type, status, id, user } = this.state;

        const entry =  {
            description,
            value,
            month,
            year,
            type,
            status,
            id,
            user
        };

        this.service
            .update(entry)
            .then( response => {
                this.props.history.push('/entries');
                messages.successMessage('Entry updated.');
            }).catch( error => {
                messages.errorMessage(error.response.data);
            });
    }

    render() {

        const typesList = this.service.getTypesList();
        const monthsList = this.service.getMonthsList();

        return(

            <Card title={this.state.updateForm ? 'Update entry' : 'Register entry'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="descriptionInput" label="Description: *">
                            <input 
                                id="descriptionInput" 
                                name="description"
                                type="text" 
                                className="form-control" 
                                value={this.state.description}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="yearInput" label="Year: *">
                            <input 
                                id="yearInput" 
                                name="year"
                                type="text" 
                                className="form-control"
                                value={this.state.year}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="monthInput" label="Month: *">
                            <SelectMenu 
                                id="monthInput" 
                                name="month"
                                list={monthsList} 
                                className="form-control"
                                value={this.state.month}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="valueInput" label="Value: *">
                            <input 
                                id="valueInput" 
                                name="value"
                                type="text" 
                                className="form-control"
                                value={this.state.value}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="typeInput" label="Type: *">
                            <SelectMenu 
                                id="typeInput" 
                                name="type"
                                list={typesList} 
                                className="form-control"
                                value={this.state.type} 
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="statusInput" label="Status:">
                            <input 
                                type="text" 
                                id="statusInput"
                                name="status"
                                className="form-control" 
                                disabled
                                value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        { this.state.updateForm 
                        ? (
                            <button 
                                onClick={this.update} 
                                className="btn btn-success">
                                    <i className="pi pi-refresh"></i>   Update
                                </button>
                        ) : (                       
                            <button 
                                onClick={this.submit} 
                                className="btn btn-success">
                                    <i className="pi pi-save"></i>   Register
                                </button>
                        ) }
                        <button 
                            onClick={ e => this.props.history.push('/entries') } 
                            className="btn btn-danger">
                                <i className="pi pi-times"></i>   Cancel
                            </button>
                    </div>
                </div>
            </Card>
        )
    }

    componentDidMount() {

        const params = this.props.match.params;

        if(params.id) {

            this.service
                .getByID(params.id)
                .then( response => {
                    this.setState({ ...response.data, updateForm: true })
                }).catch( error => {
                    messages.errorMessage(error.response.data);
                })
        }
    }
}

export default withRouter(EntryRegistryForm);