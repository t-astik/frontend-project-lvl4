// @ts-check

import 'core-js/stable/index.js';
import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime.js';
import App  from './App.js';
import '../assets/application.scss';
import {Provider} from "react-redux";
import {store} from "./store.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppStyles.css';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('chat'),
);