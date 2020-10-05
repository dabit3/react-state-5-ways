import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Context from './context';
// import MobX from './mobx';
// import Recoil from './recoil';
// import XState from './xstate';
import Redux from './redux'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Redux />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
