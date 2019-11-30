import React, { useState } from 'react';
import openSocket from 'socket.io-client';

const socket = openSocket('localhost:4000');

let i = 0;
export default function () {
    let [message, setMessage] = useState('');
    let [todos, setTodos] = useState([]);

    socket.on('receivedMessage', (m) => {
        let arr = todos.map(e => e);
        arr.push(<div key={i++}>{m}</div>);
        setTodos(arr);
    });

    const addMessage = () => {
        let arr = todos.map(e => e);
        arr.push(<div key={i++}>{message}</div>);

        socket.emit('sendMessage', message);

        setTodos(arr);
        setMessage('');
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            addMessage();
        }
    }

    return (
        <div>
            <div className="texto">{todos}</div>
            <input type="texto" onKeyUp={e => handleEnter(e)} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem" value={message}></input> <button onClick={addMessage}>Enviar</button>
        </div>)
}