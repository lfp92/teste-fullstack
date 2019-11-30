async function request(path, method, params) {
    try {
        let response = await fetch(`${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_HOST}${path}`,
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

function addUser(nome, email, celular, senha) {
    return request('/usuario/add', 'POST', { nome, email, celular, senha });
}

function changePassword(senha, id) {
    return request('/usuario/changePassword', 'POST', { senha, id });
}

function deleteUser(id) {
    return request('/usuario/delete', 'POST', { id });
}

function editUser(nome, email, celular, id) {
    return request('/usuario/edit', 'POST', { nome, email, celular, id });
}

function getUser(id = 0) {
    return request('/usuario/get?id=' + id, 'GET');
}

function login(email, senha) {
    return request('/usuario/login', 'POST', { email, senha });
}

function listUsers() {
    return request('/usuario/list', 'GET');
}


export { addUser, changePassword, deleteUser, editUser, getUser, login, listUsers }