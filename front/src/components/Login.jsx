import React, { useState } from 'react';
import './Login.css';
import { login } from '../services/services';

function Login({ autenticado = false, setAutenticado }) {
    let [email, setEmail] = useState('');
    let [senha, setSenha] = useState('');
    let [aviso, setAviso] = useState('');

    function doLogin() {

        login(email, senha)
            .then(response => {
                if (response.mensagem) {
                    setAviso(response.mensagem)
                } else {
                    alert('asdsad');
                    console.log(setAutenticado)
                    setAutenticado(true);
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="login-container">
            <div>Email:</div><div><input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div>Senha:</div><div><input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
            <div><button onClick={doLogin}>Login</button></div>
            <div><button onClick={() => null}>Não tenho cadastro</button></div>
            <div>{aviso}</div>
        </div>
    );
}

export default Login;