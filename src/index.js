import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todos from './components/Todos';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Todos/>, document.getElementById('root'));
registerServiceWorker();
