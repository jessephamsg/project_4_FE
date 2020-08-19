import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import HomePage from './HomePage'
import ChildDashboard from './ChildDashboard'
import ParentDashboard from './ParentDashboard'
import Gameboard from './Gameboard'



class RoutePage extends Component {

    render() {
        // import react router here
        return (
            <Router>
                <Switch>
                    <Route exact path='/'  component={LandingPage}/>
                    <Route path='/login' component ={LoginPage}/>
                    <Route path='/register' component ={RegisterPage}/>
                    <Route path={`/home/parent`} component= {HomePage}/>{/*`/home/${this.state.parent}`*/}
                    <Route exact path={`/home/dashboard/:childname`} component ={ChildDashboard}/> {/*`/home/dashboard/${this.state.childname}`*/}
                    <Route path={`/dashboard/:parent`} component = {ParentDashboard}/> {/*`/home/dashboard/${this.state.childname}`*/}
                    <Route path='/game/:gameid/child/:childname' component={Gameboard}/>
                </Switch>
            </Router>
        )
    }
}

export default RoutePage
