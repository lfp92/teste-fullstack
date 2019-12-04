const express = require('express');
const router = express.Router();
const dbMensagem = require('../database/dbMensagem');

router.get('/get', function (req, res) {
    let { idUsuario, idDestinatario } = req.query;
    dbMensagem.getHistory(idUsuario, idDestinatario)
        .then(results => {
            res.send(results)
        })
        .catch(error => res.send(error));
});

router.get('/recent', function (req, res) {
    let { id } = req.query;
    dbMensagem.recentsChats(id)
        .then(results => {
            res.send(results)
        })
        .catch(error => res.send(error));
});



module.exports = router;