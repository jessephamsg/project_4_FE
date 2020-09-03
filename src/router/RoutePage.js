//DEPENDENCIES
import React, { Component } from 'react'
import {Switch, Route } from 'react-router-dom';

//PAGES
import LandingPage from '../views/page/LandingPage';
import LoginPage from '../views/page/LoginPage';
import RegisterPage from '../views/page/RegisterPage';
import HomePage from '../views/page/HomePage';
import ChildDashboard from '../views/page/ChildDashboard';
import ParentDashboard from '../views/page/ParentDashboard';
import Gameboard from '../views/page/Gameboard';
import ChildReportPage from '../views/page/ChildReportPage'
import ProtectedRoute from './ProtectedRoute';


class RoutePage extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/'  component={LandingPage}/>
                <Route path='/login' component ={LoginPage}/>
                <Route path='/register' component ={RegisterPage}/>
                <Route path='/child/:childname/game/:gameName' component={Gameboard}/>
                <ProtectedRoute path={`/home/:username`} component={HomePage}> </ProtectedRoute>
                <ProtectedRoute exact path={`/home/dashboard/:childname`}component={ChildDashboard}> </ProtectedRoute>
                <ProtectedRoute path={`/dashboard/:username`}component={ParentDashboard}> </ProtectedRoute>
                {/* <ProtectedRoute path='/child/:childname/game/:gameid'component={Gameboard}> </ProtectedRoute> */}
                <ProtectedRoute exact path='/child/:childname/report' component={ChildReportPage}> </ProtectedRoute>
            </Switch>
        )
    }
}

export default RoutePage
