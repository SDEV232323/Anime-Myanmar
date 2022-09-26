import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import {Context} from './Context';
import {BrowserRouter as Router} from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Router>
 <Context>
     <App />
 </Context>
</Router> 
);

