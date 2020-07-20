import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import {withRouter} from 'react-router-dom'

import UserService from '../app/service/user-service'

import { successMessage, errorMessage } from '../components/toastr'

class Registry extends React.Component {

    state = {

        name : '',
        email : '',
        password : '',
        passwordConfirmation : ''
    }

    constructor() {

        super()

        this.userService = new UserService()
    }

    register = () => {

        const {name, email, password, passwordConfirmation} = this.state;

        const user = { name, email, password, passwordConfirmation };

        try {

            this.userService.validate(user);
            
        } catch (error) {
            
            const msgs = error.messages;

            msgs.forEach(msg => errorMessage(msg));
        }

        this.userService.register(user)

        .then( response => {

            successMessage('User registered.')

            this.props.history.push('/authenticate')
        
        }).catch( error => {

            errorMessage(error.response.data)
        })
    }

    cancel = () => {

        this.props.history.push('/authenticate')
    }

    render() {

        return(
            <Card title="Register account">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Name: *" htlmFor="inputName">
                                <input type="text" 
                                    className="form-control"
                                    id="inputName" 
                                    name="name"
                                    onChange={(e) => this.setState({name: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htlmFor="inputEmail">
                                <input type="email" 
                                    className="form-control"
                                    id="inputEmail" 
                                    name="email"
                                    onChange={(e) => this.setState({email: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Password: *" htlmFor="inputPassword">
                                <input type="password" 
                                    className="form-control"
                                    id="inputPasswprd" 
                                    name="password"
                                    onChange={(e) => this.setState({password: e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Password Confirmation: *" htlmFor="inputPasswordConfirmation">
                                <input type="password" 
                                    className="form-control"
                                    id="inputPasswordConfirmation" 
                                    name="password"
                                    onChange={(e) => this.setState({passwordConfirmation: e.target.value})}/>
                            </FormGroup>
                            <button 
                                onClick={this.register} 
                                type="button" 
                                className="btn btn-success">
                                    <i className="pi pi-save"></i>   Register account
                                </button>
                            <button 
                                onClick={this.cancel} 
                                type="button" 
                                className="btn btn-danger">
                                    <i className="pi pi-times"></i>   Cancel
                                </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(Registry)