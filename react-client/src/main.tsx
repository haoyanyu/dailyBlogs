import React from 'react';
import * as ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import MarkedCom from 'src/pages/marked';
import Loadings from 'src/pages/loadings';
import App from './App';

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/marked" element={<MarkedCom />} />
          <Route path="/loadings" element={<Loadings />} />
          <Route path="*" element={<>Loading...</>} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);