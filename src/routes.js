import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App';
import PrivateRoute from './auth/helper/PrivateRoute';
import Signin from './user/Signin';
import UserDashboard from './user/UserDashboard';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/user/dashboard" component={UserDashboard} />
                <Route path="/signin" component={Signin} />
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
