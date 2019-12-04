import React, { useState } from 'react';
import { recentChats } from '../services/services';
import UsuariosList from './admin/UsuarioList';
import SearchUser from './messenger/SearchUser';
import ChatHistory from './messenger/ChatHistory';
import Chat from './messenger/Chat';

export default function ({ usuario, setAutenticado }) {

    let [userList, setUserList] = useState([]);
    let [destinatario, setDestinatario] = useState(null);
    let [todos, setTodos] = useState([])
    let [todosGlobal, setTodosGlobal] = useState([])
    let [carregado, setCarregado] = useState(false)
    if (!carregado) {
        recentChats(usuario.id)
            .then(response => {
                setCarregado(true);
                setUserList(Array.from(response))
            })
            .catch(error => {
                setCarregado(true);
                console.log(error);                
            });
    }
    return (
        <div>
            Bem vindo, {usuario.nome}. <button onClick={() => setAutenticado(false)}>Desconectar</button>
            <div><SearchUser setUserList={setUserList} usuario={usuario} /></div>
            <div><ChatHistory remetente={usuario} userList={userList} setDestinatario={setDestinatario} setTodos={setTodos} /></div>
            <div><Chat remetente={usuario} destinatario={destinatario} todos={todos} setTodos={setTodos} /></div>
            <div><Chat chatGlobal={true} remetente={usuario} todos={todosGlobal} setTodos={setTodosGlobal} /></div>
            {usuario.nivel === 1 ?
                <div><UsuariosList /></div> : null}
        </div>);
}