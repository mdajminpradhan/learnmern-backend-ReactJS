import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App';
import PrivateRoute from './auth/helper/PrivateRoute';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UpdateUser from './user/UpdateUser';
import UserDashboard from './user/UserDashboard';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/user/update/:userid" component={UpdateUser} />
                <PrivateRoute path="/user/dashboard" component={UserDashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/" component={Signin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
