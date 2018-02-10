import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todos from './components/Todos';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'; 
import allReducer from './reducers/';
import { Provider } from 'react-redux'

const store = createStore(allReducer);

ReactDOM.render(
    <Provider store={store}>
        <Todos/>
    </Provider>,
document.getElementById('root'));
registerServiceWorker();