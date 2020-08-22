import React, { Fragment } from 'react';
import './App.css';
import Footer from './views/common/components/Footer'
import NavBar from './views/common/components/NavBar';
import RoutePage from './router/RoutePage';

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
