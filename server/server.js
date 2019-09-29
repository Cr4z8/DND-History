const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO.listen(server);

app.use(express.static(publicPath));

const sessions = [{ texts: ["Session 1"] }, { texts: ["Session 2"] }];
const session1 = [{ texts: ["Header 1", "Body 1"] }, { texts: ["Header 2", "Body 2"] }];
const session2 = [{ texts: ["Header 3", "Body 3"] }, { texts: ["Header 4", "Body 4"] }, { texts: ["Header 5", "Body 5"] }];
const adventureCards = [session1, session2];

io.on('connection', (socket) => {
    socket.on('loadSessions', () => {
        socket.emit('loadSessions', sessions);
    });
    socket.on('saveSession', (params) => {
        sessions[params.id] = { texts: [params.bodyText] };
    });

    socket.on('loadAdventureCards', (sessionID) => {
        socket.emit('loadAdventureCards', adventureCards[sessionID])
    });

    socket.on('saveAdventureCard', (params) => {
        if (params.sessionID >= adventureCards.length) {
            adventureCards.push([]);
        }
        adventureCards[params.sessionID][params.cardID] = { texts: params.texts };
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
    console.log("Hallo socket works");
    console.log("Hallo socket works");
    console.log("Hallo socket works");
    console.log("Hallo socket works");
    console.log("Hallo socket works");
});