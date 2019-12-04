const express = require('express');
const router = express.Router();
const dbUsuario = require('../database/dbUsuario');

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });


router.post('/add', function (req, res) {
    let { nome, email, celular, senha, nivel } = req.body;
    dbUsuario.addUsuario(nome, email, celular, senha, nivel)
        .then(results => {
            console.log(results)
            res.send(results.affectedRows > 0 ? { status: 'OK', mensagem: 'Registro inserido com sucesso!' } : { status: 'erro', mensagem: 'Erro ao inserir registro' })
        })
        .catch(error => {
            if (error.code === 'ER_DUP_ENTRY') {
                res.send({ status: 'ERRO', mensagem: 'Email já cadastrado!' })
            } else {
                res.send(error)
            }
        });
});

router.post('/changePassword', function (req, res) {
    let { senha, id } = req.body;
    dbUsuario.changePassword(senha, id)
        .then(results => res.send(results.affectedRows > 0 ? { status: 'OK', mensagem: 'Registro inserido com sucesso!' } : { status: 'erro', mensagem: 'Erro ao inserir registro' }))
        .catch(error => res.send(error));
});

router.post('/delete', function (req, res) {
    let { id } = req.body;
    dbUsuario.deleteUsuario(id)
        .then(results => res.send(results.affectedRows > 0 ? { status: 'OK', mensagem: 'Registro excluído com sucesso!' } : { status: 'erro', mensagem: 'Erro ao excluir registro' }))
        .catch(error => res.send(error));
})

router.post('/edit', function (req, res) {
    let { nome, email, celular, nivel, id } = req.body;
    dbUsuario.editUsuario(nome, email, celular, nivel, id)
        .then(results => res.send(results.affectedRows > 0 ? { status: 'OK', mensagem: 'Registro atualizado com sucesso!' } : { status: 'erro', mensagem: 'Erro ao editar registro' }))
        .catch(error => res.send(error));
})

router.get('/get', function (req, res) {
    let { id } = req.query;
    dbUsuario.getUsuario(id)
        .then(results => res.send(results))
        .catch(error => res.send(error));
});


router.post('/login', function (req, res) {
    let { email, senha } = req.body;
    dbUsuario.login(email, senha)
        .then(results => {
            if (Array.from(results).length === 0) {
                res.send({ mensagem: 'Usuário ou senha inválidos!' });
            } else {
                res.send(results);
            }
        })
        .catch(error => res.send(error));
});

router.get('/list', function (req, res) {
    dbUsuario.listUsuarios()
        .then(results => res.send(results))
        .catch(error => res.send(error));
});


router.get('/search', function (req, res) {
    let { pesquisa, id } = req.query;
    dbUsuario.searchUser(pesquisa, id)
        .then(results => res.send(results))
        .catch(error => res.send(error));
});

module.exports = router;