import React from 'react'

import LocalStorageService from '../app/service/local-storage-service'
import UserService from '../app/service/user-service'

class Home extends React.Component {

    state = {

        balance : 0,
        userName: ''
    }

    constructor() {

        super()

        this.userService = new UserService()
    }

    componentDidMount() {

        const signedUserObj = JSON.parse(LocalStorageService.getItem('_signed_user'))

        this.setState({userName: signedUserObj.name});

        this.userService.getBalanceByUser(signedUserObj.id)
        
        .then( (response) => {

            this.setState( {balance: response.data} )
        
        }).catch((error) => {

            console.log(error.response)
        })
    }

    render() {

        return(
            <div className="jumbotron">
                <h1 className="display-3">Welcome, {this.state.userName} !</h1>
                <p className="lead">This is your personal finances management system.</p>
                <p className="lead">Your current balance is {this.state.balance} €</p>
                <hr className="my-4"/>
                <p>This is your administrator area. Use the buttons below to navigate the system.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                        href="#/entries" 
                        role="button">
                            <i className="pi pi-list"></i>  View entries
                    </a>
                    <a className="btn btn-danger btn-lg" 
                        href="#/register-entry" 
                        role="button">
                            <i className="pi pi-plus"></i>  Register entry
                    </a>
                </p>
            </div>
        )
    }
}

export default Home
