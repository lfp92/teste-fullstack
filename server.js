require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const rotaUsuario = require('./routes/usuario');
const rotaMensagem = require('./routes/mensagem');
const bodyParser = require('body-parser');
const dbMensagem = require('./database/dbMensagem');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    next();
});

let loggedUsers = [];

io.on('connection', function (socket) {
    socket.on('userLoggedIn', data => {
        let user = { ...data }
        user.socketId = socket.id;
        let arr = loggedUsers.filter(x => x.id !== user.id);
        arr.push(user)
        loggedUsers = arr;
    });

    socket.on('sendMessageToUser', data => {
        let { message, from, to, hora } = data;
        dbMensagem.saveMessage(from.id, message, to.id)
            .then(response => {
                let arr = loggedUsers.filter(x => x.id === to.id);
                if (arr.length > 0) {
                    let toId = arr[0].socketId
                    socket.broadcast.to(toId).emit('receivedMessage', { from, msg: message, hora: hora.toLocaleString() || null });
                }
            })
            .catch(error => console.log(error));
    })

    socket.on('sendMessageToChat', data => {
        let { message, from, hora } = data;
        dbMensagem.saveMessage(from.id, message, null)
            .then(response => {
                socket.broadcast.emit('receivedMessageGlobal', { from, msg: message, hora })
            })
    })
});

app.use('/usuario', rotaUsuario);
app.use('/mensagem', rotaMensagem);

app.listen(3001, function () {
    console.log(`Server on às ${(new Date()).toLocaleString()}`);
    io.listen(4000);
    console.log(`Socket on às ${(new Date()).toLocaleString()}`);
});