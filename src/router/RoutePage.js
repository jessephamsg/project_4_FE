import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
<<<<<<< HEAD:src/RoutePage/RoutePage.js
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import HomePage from './HomePage'
import ChildDashboard from './ChildDashboard'
import ParentDashboard from './ParentDashboard'
import Gameboard from './Gameboard'
import ChildReportPage from './ChildReportPage'
=======
import LandingPage from '../views/page/LandingPage';
import LoginPage from '../views/page/LoginPage';
import RegisterPage from '../views/page/RegisterPage';
import HomePage from '../views/page/HomePage';
import ChildDashboard from '../views/page/ChildDashboard';
import ParentDashboard from '../views/page/ParentDashboard';
import Gameboard from '../views/page/Gameboard';
>>>>>>> 2b1b02fedd745fef88f751ecd5c96acaab52c086:src/router/RoutePage.js



class RoutePage extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/'  component={LandingPage}/>
                    <Route path='/login' component ={LoginPage}/>
                    <Route path='/register' component ={RegisterPage}/>
                    <Route path={`/home/parent`} component= {HomePage}/>{/*`/home/${this.state.parent}`*/}
                    <Route exact path={`/home/dashboard/:childname`} component ={ChildDashboard}/> {/*`/home/dashboard/${this.state.childname}`*/}
                    <Route path={`/dashboard/:parent`} component = {ParentDashboard}/> {/*`/home/dashboard/${this.state.childname}`*/}
                    <Route path='/child/:childname/game/:gameid' component={Gameboard}/>
                    <Route exact path='/child/:childname/report' component={ChildReportPage}/>
                </Switch>
            </Router>
        )
    }
}

export default RoutePage
