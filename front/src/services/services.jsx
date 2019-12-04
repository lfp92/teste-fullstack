async function request(path, method, params) {
    try {
        let response = await fetch(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_HTTP_PORT}${path}`,
            {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: params ? JSON.stringify(params) : null,

            });
        return response.json();
    } catch (error) {
        throw error;
    }
}

function addUser(nome, email, celular, senha, nivel) {
    return request('/usuario/add', 'POST', { nome, email, celular, senha, nivel });
}

function changePassword(senha, id) {
    return request('/usuario/changePassword', 'POST', { senha, id });
}

function deleteUser(id) {
    return request('/usuario/delete', 'POST', { id });
}

function editUser(nome, email, celular, nivel, id) {
    return request('/usuario/edit', 'POST', { nome, email, celular, nivel, id });
}

function getUser(id = 0) {
    return request('/usuario/get?id=' + id, 'GET');
}

function getHistory(idUsuario, idDestinatario) {
    return request(`/mensagem/get?idUsuario=${idUsuario}&idDestinatario=${idDestinatario}`, 'GET');
}

function login(email, senha) {
    return request('/usuario/login', 'POST', { email, senha });
}

function listUsers() {
    return request('/usuario/list', 'GET');
}

function searchUser(pesquisa, id) {
    return request(`/usuario/search?pesquisa=${pesquisa}&id=${id}`, 'GET');
}

export { addUser, changePassword, deleteUser, editUser, getUser, getHistory, login, listUsers, searchUser }