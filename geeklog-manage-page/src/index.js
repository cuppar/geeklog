import React from 'react';
import ReactDOM from 'react-dom';
import ManageListItems from './ManageListItems/ManageListItems';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ManageListItems />, document.getElementById('root'));
registerServiceWorker();
