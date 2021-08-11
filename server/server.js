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
    socket.on('chat message', (message) => {
        io.emit('chat message', message)

    });

});



