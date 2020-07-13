import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

import {withRouter} from 'react-router-dom'

class Registry extends React.Component {

    state = {

        name : '',
        email : '',
        password : '',
        passwordConfirmation : ''
    }

    register = () => {

        console.log("register() called")
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
                            <button onClick={this.register} type="button" className="btn btn-success">Register account</button>
                            <button onClick={this.cancel} type="button" className="btn btn-danger">Login</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(Registry)