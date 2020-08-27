import React from 'react';
import './App.css';
import Footer from './views/common/components/Footer'
import NavBar from './views/common/components/NavBar';
import RoutePage from './router/RoutePage';
import AuthProvider from './services/AuthService'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (            

    
    <AuthProvider>
        <Router>
        <NavBar/>
          <RoutePage/>
          <Footer/>
        </Router>
    </AuthProvider>
  
    
  );
}

export default App;
