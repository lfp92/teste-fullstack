import React, { useState } from 'react';
import './Chat.css'
import Message from './Message';
import openSocket from 'socket.io-client';

const socket = openSocket(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SOCKET_PORT}`);
let isLogged = false;

let i = 0;

export default function ({ remetente, destinatario, todos, setTodos }) {
    let [message, setMessage] = useState('');

    if (!isLogged) {
        socket.emit('userLoggedIn', remetente);
        isLogged = true;
    }

    socket.on('receivedMessage', (data) => {
        let { from, msg, hora } = data;
        alert(`${from.nome} disse: ${msg.substr(0, 10)}`)
    });


    const addMessage = () => {
        let arr = todos.map(e => e);
        arr.push(<Message mensagem={message} usuario={remetente.nome} hora={new Date()} key={i++} />);

        socket.emit('sendMessageToUser', { message, from: remetente, to: destinatario, hora: new Date() });

        setTodos(arr);
        setMessage('');
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            addMessage();
        }
    }

    return destinatario ? (
        <div className="chat">
            Conversa com {destinatario.nome} {socket.id}: <br />
            <div className="texto">{todos}</div>
            <input type="texto" onKeyUp={e => handleEnter(e)} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem" value={message} />
            <button onClick={addMessage}>Enviar</button>
        </div>) : null;
}