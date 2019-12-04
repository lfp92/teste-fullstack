import React, { useState } from 'react';
import UsuarioDetails from './admin/UsuarioDetails'
import './Login.css';
import { login } from '../services/services';

function Login({ autenticado = false, setAutenticado, setUsuario }) {
    let [email, setEmail] = useState('');
    let [senha, setSenha] = useState('');
    let [aviso, setAviso] = useState('');
    let [novoCadastro, setNovoCadastro] = useState(false);

    function doLogin(e) {
        e.preventDefault();
        login(email, senha)
            .then(response => {
                if (response.mensagem) {
                    setAviso(response.mensagem)
                } else {
                    setUsuario(response[0]);
                    setAutenticado(true);
                }
            })
            .catch(error => console.log(error))
    }

    return (

        novoCadastro ?
            <UsuarioDetails ADD={true} usuarioSemCadastro={true} voltar={() => setNovoCadastro(false)} />
            :
            (<div className="login-container" onSubmit={e => doLogin(e)}>
                <form>
                    <div>Email:</div><div><input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div>Senha:</div><div><input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} /></div>
                    <div><button className="loginButton" onClick={e => doLogin(e)}>Login</button>
                    <button className="semCadastro" onClick={(e) => { e.preventDefault(); setNovoCadastro(true) }}>Não tenho cadastro</button></div>
                    {/* <div><button onClick={() => null}>Esqueci minha senha</button></div> */}
                    <div className="aviso">{aviso}</div>
                </form>
            </div>)

    );
}

export default Login;