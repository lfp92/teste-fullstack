import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UsuarioList from './components/UsuarioList';
import UsuarioDetails from './components/UsuarioDetails';
import ChatUser from './components/ChatUser';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ChatUser />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
