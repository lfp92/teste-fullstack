import React, { useState } from 'react';
import UsuarioList from './components/admin/UsuarioList';
import UsuarioDetails from './components/admin/UsuarioDetails';
import Login from './components/Login';
import ChatUser from './components/messenger/ChatUser';
import './App.css';

function App() {
  let [autenticado, setAutenticado] = useState(false);
  
  function ss(value) {
    console.log(1223)
    setAutenticado(value)
  }

  return (
    <div className="App">
      {autenticado ?
        <Login autenticado={autenticado} setAutenticado={ss} t={'NAO FUNCIONA'} /> :
        <ChatUser />
      }
    </div>
  );
}

export default App;
