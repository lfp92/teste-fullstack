import React from 'react';

export default function ({ mensagem, usuario, hora }) {
    return (
        <div className="msg">
            <div className="msg-header">{usuario} em {hora.toLocaleString('pt-BR')}:</div>
            <div className="msg-body">{mensagem}</div>
        </div>
    );
}