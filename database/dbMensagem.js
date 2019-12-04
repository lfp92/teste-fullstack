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

function recentsChats(id) {
    return executeQuery(`SELECT u.usuario_id id, u.usuario_nome nome, u.usuario_email email, u.usuario_celular celular
    FROM (
    SELECT dest.usuario_id
    FROM mensagens m, usuarios dest
    WHERE m.destinatario_id IS NOT NULL AND m.destinatario_id = dest.usuario_id AND m.usuario_id = ?
    UNION ALL
    SELECT rem.usuario_id
    FROM mensagens m, usuarios rem
    WHERE m.destinatario_id IS NOT NULL AND m.usuario_id = rem.usuario_id AND m.destinatario_id = ?) a, usuarios u
    WHERE a.usuario_id = u.usuario_id
    GROUP BY u.usuario_id, u.usuario_nome, u.usuario_email, u.usuario_celular
    LIMIT 3;`, [id, id])
}

module.exports = { getHistory, recentsChats, saveMessage }