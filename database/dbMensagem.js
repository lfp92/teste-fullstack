const { executeQuery } = require('./utils')

function saveMessage(idUser, message, idDestinatario) {
    return executeQuery(`insert into mensagens (usuario_id, mensagem, data_hora, destinatario_id) values (?, ?, now(), ?)`, [idUser, message, idDestinatario]);
}

function getHistory(idUser, idDestinatario) {
    return executeQuery(
        `SELECT rem.usuario_nome DE, dest.usuario_nome PARA, m.mensagem, m.data_hora FROM mensagens m, usuarios rem, usuarios dest
        WHERE m.usuario_id = rem.usuario_id
        AND m.destinatario_id = dest.usuario_id
        AND ((m.usuario_id = ? AND m.destinatario_id = ?) or (m.destinatario_id = ? AND m.usuario_id = ?)) `, [idUser, idDestinatario, idUser, idDestinatario]);
}

module.exports = { getHistory, saveMessage }