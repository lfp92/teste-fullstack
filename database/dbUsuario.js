const { executeQuery } = require('./utils')

function addUsuario(nome, email, celular, senha, nivel) {
    return executeQuery(`insert into usuarios 
                        (usuario_nome, usuario_email, usuario_celular, usuario_senha, nv_usuario)
                        values (?,?,?,md5(?), ?)`, [nome, email, celular, senha, nivel])
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

function editUsuario(nome, email, celular, nivel, id) {
    return executeQuery(
        `update usuarios
            set usuario_nome = ?,
            usuario_email = ?,
            usuario_celular = ?,
            nv_usuario = ?
            where usuario_id = ?`,
        [nome, email, celular, nivel, id]
    )
}

function getUsuario(id = 0) {
    return executeQuery('select usuario_id id, usuario_nome nome, usuario_email email, usuario_celular celular, nv_usuario nivel from usuarios where usuario_id = ?', [id])
}

function login(email, senha) {
    return executeQuery('select usuario_id id, usuario_nome nome, usuario_email email, usuario_celular celular, nv_usuario nivel from usuarios where usuario_email = ? and usuario_senha = md5(?)', [email, senha]);
}

function listUsuarios() {
    return executeQuery('select usuario_id id, usuario_nome nome, usuario_email email, usuario_celular celular, nv_usuario nivel from usuarios');
}

function searchUser(pesquisa, id) {
    return executeQuery("SELECT usuario_id id, usuario_nome nome, usuario_email email, usuario_celular celular FROM usuarios u WHERE (u.usuario_nome LIKE concat('%', ?, '%') OR u.usuario_email LIKE concat('%', ?, '%')) and u.usuario_id <> ?", [pesquisa, pesquisa, id]);
}

module.exports = { addUsuario, changePassword, deleteUsuario, editUsuario, getUsuario, login, listUsuarios, searchUser }