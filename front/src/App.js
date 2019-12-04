import React, { useState } from 'react';
import Login from './components/Login';
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
        <Principal usuario={usuario} setAutenticado={setAutenticado} />
      }
    </div>
  );
}

export default App;
