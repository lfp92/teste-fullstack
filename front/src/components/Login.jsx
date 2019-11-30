import React, { useState } from 'react';
import { login } from '../services/services';

function Login() {
    let [email, setEmail] = useState('');
    let [senha, setSenha] = useState('');
    let [aviso, setAviso] = useState('');
    let [AUTENTICADO, setAUTENTICADO] = useState(false)

    function doLogin() {
        login(email, senha)
            .then(response => {
                if (response.mensagem) {
                    setAviso(response.mensagem)
                } else {
                    setAUTENTICADO(true);
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {AUTENTICADO ? null :
                <div className="login-container">
                    <div>Email: <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div>Senha: <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
                    <div><button onClick={doLogin}>Login</button></div>
                    <div>{aviso}</div>
                </div>}
        </React.Fragment>
    );
}

export default Login;