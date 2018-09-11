import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import ManageSystem from './ManageSystem/ManageSystem';


ReactDOM.render(
  <Router>
    <ManageSystem />
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
