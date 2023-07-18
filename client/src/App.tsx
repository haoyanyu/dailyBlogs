import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './styles/style.scss';
// import mainImage from '../../static/logo.png';

const App = () => {
  return (
    <div className="container">
      <div className="left">
        <div className="logo"></div>
        <div className="nav-list">
          <Link to='/marked-svg'>markdown格式转为html</Link>
        </div>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
    
  );
}

export default App;
