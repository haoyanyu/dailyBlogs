import React from 'react';
import * as ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import MarkedCom from 'src/pages/marked';
import Loadings from 'src/pages/loadings';
import NewFunc from 'src/pages/new-func';
import Typed from 'src/pages/typed';
import App from './App';

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/marked" element={<MarkedCom />} />
          <Route path="/loadings" element={<Loadings />} />
          <Route path="/new-func" element={<NewFunc />} />
          <Route path="/typed.js" element={<Typed />} />
          <Route path="*" element={<>Loading...</>} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);