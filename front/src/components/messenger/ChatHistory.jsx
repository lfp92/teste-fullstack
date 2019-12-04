import React, { useState } from 'react';
import Chat from './Chat';
import { getHistory } from '../../services/services';
import Message from '../messenger/Message'

let i = 0;
export default function ({ remetente, userList, setDestinatario, setTodos }) {
    function handleClick(u) {
        getHistory(remetente.id, u.id)
            .then(response => {
                let arr = Array.from(response);
                arr = arr.map(x => <Message mensagem={x.mensagem} usuario={x.DE} hora={(new Date(x.data_hora)).toLocaleString('pt-BR')} key={i++} />)
                setTodos(arr)
                setDestinatario(u);
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            {userList.map(u => <div key={`uid${i++}`} onClick={() => handleClick(u)}>
                {u.nome}
            </div>)}
        </div>
    )
}