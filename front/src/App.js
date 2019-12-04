import React, { useState } from 'react';
import UsuarioList from './components/admin/UsuarioList';
import UsuarioDetails from './components/admin/UsuarioDetails';
import Login from './components/Login';
import Chat from './components/messenger/Chat';
import './App.css';
import Principal from './components/Principal';

function App() {
  let [autenticado, setAutenticado] = useState(false);
  // { nome: 'Leonardo', email: 'leonardopetrauskas@hotmail.com', celular: '123123', nivel: 1 }
  let [usuario, setUsuario] = useState({})

  return (
    <div className="App">
      {!autenticado ?
        <Login autenticado={autenticado} setAutenticado={setAutenticado} setUsuario={setUsuario} /> :
        <Principal usuario={usuario} />
      }
    </div>
  );
}

export default App;
