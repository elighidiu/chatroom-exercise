// require express, http 
const express = require('express');
const http = require('http');
//define the application
const app = express();

//give the path to our client
const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

//use express to host the client
app.use(express.static(clientPath));

//use http to serve the app that express provides
const server = http.createServer(app);

const users = {}

server.listen(8080, () => {
    console.log("server running on port 8080");
});

// require socket
const io = require('socket.io')(server);
let counter = 0;

// making a connection from the client to the server

io.on('connection', (socket) => {
    counter++;
    console.log(counter + ' ' + 'connected');
    socket.on('sendToAll', (message) => {
        io.emit('chat message', {message : message, username : users[socket.id] })

    });

    socket.on('sendToMe', (message) => {
        // if you emit to io, all connected clients will receive the message, whereas the socket.emit will only send it back to the socket of which it received the message. socket.broadcast.emit will emit to all except to yourself
        socket.emit('chat message', message);
    });

    socket.on('new-user', (username) => {
        // the key of the user will be the id of the socket
        users[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
    });
    
});



