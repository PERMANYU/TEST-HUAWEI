import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter,Route} from 'react-router-dom'

import './assets/css/base.css'
import './assets/css/home.css'
import {Provider} from 'react-redux'
import store from './store/store'
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App}/>
    </BrowserRouter>
  </Provider>  
    ,
     document.getElementById('root'));
registerServiceWorker();
