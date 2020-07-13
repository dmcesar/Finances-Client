import React from 'react'

class Home extends React.Component {

    state = {

        balance : 0
    }

    render() {

        return(
            <div className="jumbotron">
                <h1 className="display-3">Welcome!</h1>
                <p className="lead">This is your personal finances management system.</p>
                <p className="lead">Your current balance is {this.state.balance} €</p>
                <hr className="my-4"/>
                <p>This is your administrator area. Use the buttons below to navigate the system.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" 
                    href="#/register" 
                    role="button">
                        <i className="fa fa-users"></i>
                        Register account
                </a>
                <a className="btn btn-danger btn-lg" 
                    href="#/register" 
                    role="button">
                        <i className="fa fa-users"></i>
                        Create entry
                </a>
                </p>
            </div>
        )
    }
}

export default Home