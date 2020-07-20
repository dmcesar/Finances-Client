import React from 'react'

import {Route, Switch, HashRouter, Redirect} from 'react-router-dom'

import Login from "../views/login"
import Registry from "../views/registry"
import Home from '../views/home'
import Entries from '../views/entries/entries'
import EntryRegistryForm from '../views/entries/entry-registry-form'
import { AuthConsumer } from '../main/authentication-provider'

function AuthenticatedRoute( {component: Component, isUserAuthenticated, ...props} ) {

    return (
        <Route {...props} render={ (componentProps) => {
            if(isUserAuthenticated){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/authenticate', state : { from: componentProps.location } } } />
                )
            }
        }}  />
    )
}

function Routes (props) {

    return(
        <HashRouter>
            <Switch>
                <Route path="/authenticate" component={Login} />
                <Route path="/register" component={Registry} />
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/home" component={Home} />
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/entries" component={Entries} />
                <AuthenticatedRoute isUserAuthenticated={props.isUserAuthenticated} path="/register-entry/:id?" component={EntryRegistryForm} />
            </Switch>
        </HashRouter>
    )
}

export default () => (

    <AuthConsumer>
        { (context) => (<Routes isUserAuthenticated={context.isAuthenticated}/>) }
    </AuthConsumer>
)