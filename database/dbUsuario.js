const { executeQuery } = require('./utils')

function addUsuario(nome, email, celular, senha) {
    return executeQuery(`insert into usuarios 
                        (usuario_nome, usuario_email, usuario_celular, usuario_senha)
                        values (?,?,?,?)`, [nome, email, celular, senha])
}

function changePassword(novaSenha, id) {
    return executeQuery(
        `update usuarios
        set usuario_senha = md5(?)
        where usuario_id = ?`,
        [novaSenha, id])
}

function deleteUsuario(id) {
    return executeQuery(`delete from usuarios where usuario_id = ?`, [id])
}

function editUsuario(nome, email, celular, id) {
    return executeQuery(
        `update usuarios
            set usuario_nome = ?,
            usuario_email = ?,
            usuario_celular = ?
            where usuario_id = ?`,
        [nome, email, celular, id]
    )
}

function getUsuario(id = 0) {
    return executeQuery('select usuario_id id, usuario_nome nome, usuario_email email, usuario_celular celular from usuarios where usuario_id = ?', [id])
}

function listUsuarios() {
    return executeQuery('select usuario_id id, usuario_nome nome, usuario_email email, usuario_celular celular from usuarios');
}


module.exports = { addUsuario, changePassword, deleteUsuario, editUsuario, getUsuario, listUsuarios }