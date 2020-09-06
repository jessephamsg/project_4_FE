//DEPENDENCIES
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//COMPONENTS
import Footer from './views/common/components/Footer'
import NavBar from './views/common/components/NavBar';
import RoutePage from './router/RoutePage';
import AuthProvider from './interactions/AuthService'

//STYLES
import './App.css';


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
