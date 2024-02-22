import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/leaflet/dist/leaflet.css';
import '../node_modules/leaflet/dist/leaflet.js';
import '../node_modules/leaflet-timedimension/dist/leaflet.timedimension.control.min.css';
import '../node_modules/leaflet-timedimension/dist/leaflet.timedimension.min.js';
import '../node_modules/leaflet-draw/dist/leaflet.draw.css';
import '../node_modules/leaflet-draw/dist/leaflet.draw.js';
//import '../node_modules/leaflet-simple-map-screenshoter/dist/leaflet-simple-map-screenshoter.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
