import React, { Fragment } from 'react';
import './App.css';
import Footer from './Footer'
import NavBar from './NavBar';
import RoutePage from './RoutePage/RoutePage'

function App() {
  return (
    <Fragment>

      <NavBar/>
      <RoutePage/>
      <Footer/>
    </Fragment>
  );
}

export default App;
