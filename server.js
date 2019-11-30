require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const rotaUsuario = require('./routes/usuario');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
});

io.on('connection', function (socket) {

    socket.on('loggedIn', usuario => {
        usuario.socketId = socket.id;
        console.log(usuario)
    });

    socket.on('sendMessage', message => {
        socket.broadcast.emit('receivedMessage', message);
    })
});

app.use('/usuario', rotaUsuario);

app.listen(3001, function () {
    console.log(`Server on às ${(new Date()).toLocaleString()}`);
    io.listen(4000);
    console.log(`Socket on às ${(new Date()).toLocaleString()}`);
});