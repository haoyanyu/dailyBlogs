import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './styles/style.scss';
// import mainImage from '../../static/logo.png';

const App = () => {
  return (
    <div className="container">
      <div className="left">
        <Link to="/"><div className="logo"></div></Link>
        {/* <img src={mainImage} alt="" /> */}
        <div className="nav-list">
          <Link to='/marked'>markdown格式转为html</Link>
          <Link to='/loadings'>各种各样的loading</Link>
        </div>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
    
  );
}

export default App;
