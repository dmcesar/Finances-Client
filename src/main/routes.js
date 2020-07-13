import React from 'react'

import {Route, Switch, HashRouter} from 'react-router-dom'

import Login from "../views/login"
import Registry from "../views/registry"
import Home from '../views/home'

function Routes () {

    return(
        <HashRouter>
            <Switch>
                <Route path="/authenticate" component={Login} />
                <Route path="/register" component={Registry} />
                <Route path="/home" component={Home} />
            </Switch>
        </HashRouter>
    )
}

export default Routes