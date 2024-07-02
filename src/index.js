import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home/Home';
import NovoVideo from './pages/NovoVideo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/novo-video" element={<NovoVideo />} />
    </Routes>
  </Router>
);



