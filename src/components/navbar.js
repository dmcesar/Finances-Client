import React from 'react'

import NavbarItem from './navbar-item'

function Navbar() {

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">My personal finances</a>
                <button className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarResponsive" 
                        aria-controls="navbarResponsive" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem href="#/entries" label="Entries" />
                        <NavbarItem href="#/register" label="Register" />
                        <NavbarItem href="#/authenticate" label="Login" />
                    </ul>
                </div>
            </div>
        </div>
    )
}   

export default Navbar