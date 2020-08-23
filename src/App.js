import React, { useContext } from 'react';
import './App.css';
import Footer from './views/common/components/Footer'
import NavBar from './views/common/components/NavBar';
import RoutePage from './router/RoutePage';
import AuthProvider from './AuthContext'

function App() {
  return (
    <AuthProvider>
      <NavBar/>
      <RoutePage/>
      <Footer/>
    </AuthProvider>
    
  );
}

export default App;
