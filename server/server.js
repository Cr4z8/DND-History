const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { ContainerBuilder } = require('../public/js/containerBuilder');


const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO.listen(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {


    socket.on('createContainerBuilder', (params) => {
        console.log(params);
        const containerBuilder = new ContainerBuilder(params.containerClassName, params.editablesClassNames, params.scalings, params.mustacheObject, params.focusClassName);
        callback(ContainerBuilder.build());
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