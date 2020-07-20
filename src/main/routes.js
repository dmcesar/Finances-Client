import React from 'react'

import {Route, Switch, HashRouter} from 'react-router-dom'

import Login from "../views/login"
import Registry from "../views/registry"
import Home from '../views/home'
import Entries from '../views/entries/entries'
import EntryRegistryForm from '../views/entries/entry-registry-form'

function Routes () {

    return(
        <HashRouter>
            <Switch>
                <Route path="/authenticate" component={Login} />
                <Route path="/register" component={Registry} />
                <Route path="/home" component={Home} />
                <Route path="/entries" component={Entries} />
                <Route path="/register-entry/:id?" component={EntryRegistryForm} />
            </Switch>
        </HashRouter>
    )
}

export default Routes