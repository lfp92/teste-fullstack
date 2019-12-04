import React, { useState } from 'react';
import Chat from './Chat';
import '../admin/UsuarioList.css';
import './ChatHistory.css'
import { getHistory } from '../../services/services';
import Message from '../messenger/Message'

let i = 0;
export default function ({ remetente, userList, setDestinatario, setTodos }) {
    let [hidden, setHidden] = useState(false);
    function handleClick(u) {
        getHistory(remetente.id, u.id)
            .then(response => {
                let arr = Array.from(response);
                arr = arr.map(x => <Message mensagem={x.mensagem} usuario={x.DE} hora={(new Date(x.data_hora)).toLocaleString('pt-BR')} key={`chatUser${i++}`} />)
                setTodos(arr)
                setDestinatario(u);
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="chatHistory">
            <div className="barra-popup" onClick={() => setHidden(!hidden)} >Lista de contatos (clique para {hidden ? 'expandir' : 'reduzir'})</div>
            <div className="chatList" hidden={hidden}>
                {userList.map(u => <div className="contato" key={`uid${i++}`} onClick={() => handleClick(u)}>
                    {u.nome}
                </div>)}
            </div>
        </div>
    )
}