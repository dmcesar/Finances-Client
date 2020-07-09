import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class Login extends React.Component {

    state = {

        email : '',
        password : ''
    }

    login = () => {

        console.log("login() called");
            
    }

    register = () => {

        console.log("register() called");

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={ {position : 'relative', left: '300px'} }>
                        <div className="bs-docs-section">
                            <Card title="Login">
                                <div className="col-md-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Email address"
                                                        value={this.setState.email}
                                                        onChange={ (e) => this.setState({email: e.target.value}) } />
                                            </FormGroup>
                                            <FormGroup label="Password: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="Password"
                                                        value={this.setState.password}
                                                        onChange={ (e) => this.setState({password: e.target.value}) }/>
                                            </FormGroup>
                                            <button onClick={this.login} className="btn btn-success">Login</button>
                                            <button onClick={this.register} className="btn btn-danger">Register</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
