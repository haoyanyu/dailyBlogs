import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './styles/style.scss';
// import mainImage from '../../static/logo.png';

import schema from './constants/schema';
import { getAvailableSchema } from './utils/flat-schema';

const availableSchema = getAvailableSchema(schema);

console.log(">>>>>>availableSchema<<<<<<", availableSchema);

const App = () => {
  return (
    <div className="container">
      <div className="left">
        <Link to="/"><div className="logo"></div></Link>
        {/* <img src={mainImage} alt="" /> */}
        <div className="nav-list">
          <Link to='/marked'>markdown格式转为html</Link>
          <Link to='/loadings'>各种各样的loading</Link>
          <Link to='/new-func'>new Function</Link>
          <br />
          <Link to='/typed.js'>打字动画</Link>
        </div>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
