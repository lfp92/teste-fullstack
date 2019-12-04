import React, { useState } from 'react';
import UsuariosList from './admin/UsuarioList';
import SearchUser from './messenger/SearchUser';
import ChatHistory from './messenger/ChatHistory';
import Chat from './messenger/Chat';

export default function ({ usuario }) {
   
    let [userList, setUserList] = useState([]);
    let [destinatario, setDestinatario] = useState(null);
    let [todos, setTodos] = useState([])
    return (
        <div>
            Bem vindo, {usuario.nome}
            <div><SearchUser setUserList={setUserList} usuario={usuario} /></div>
            <div>Lista de conversas <ChatHistory remetente={usuario} userList={userList} setDestinatario={setDestinatario} setTodos={setTodos} /></div>
            <div><Chat remetente={usuario} destinatario={destinatario} todos={todos} setTodos={setTodos} /></div>
            {usuario.nivel === 1 ?
                <div><UsuariosList /></div> : null}
        </div>);
}