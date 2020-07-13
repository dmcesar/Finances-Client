import React from 'react'

import { withRouter } from 'react-router-dom'

import axios from 'axios'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class Login extends React.Component {

    state = {

        email : '',
        password : '',
        errorMessage : null
    }

    login = () => {

        console.log("login() called");
     
        axios
            .post("http://localhost:8080/api/users/authenticate", {
                
                email: this.state.email,
                password: this.state.password

            }).then(response => {

                this.props.history.push('/home')

            }).catch(error => {

                this.setState( {errorMessage: error.response.data} )

            })
    }

    register = () => {

        console.log("register() called");
        this.props.history.push('/register')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={ {position : 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <spam>{this.state.errorMessage}</spam>
                            </div>
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email"
                                                    className="form-control"
                                                    id="inputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Email address"
                                                    value={this.setState.email}
                                                    onChange={ (e) => this.setState({email: e.target.value}) } />
                                        </FormGroup>
                                        <FormGroup label="Password: *" htmlFor="inputPassword">
                                            <input type="password"
                                                    className="form-control"
                                                    id="inputPassword"
                                                    placeholder="Password"
                                                    value={this.setState.password}
                                                    onChange={ (e) => this.setState({password: e.target.value}) }/>
                                        </FormGroup>
                                        <button onClick={this.login} className="btn btn-success">Login</button>
                                        <button onClick={this.register} className="btn btn-danger">Register account</button>
                                    </fieldset>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)
