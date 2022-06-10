const { Socket } = require("dgram")
const net = require("net")
const WebSocket = require("ws")
const express = require("express")
const app = express()
const path = require('path');
const { type } = require("os")

var CLIENTS=[];

app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/public',express.static('public'));

const exServer = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
})

const wsocket = new WebSocket.Server({
    port: 8281
});

wsocket.on("connection", (ws, req)=>{
    console.log("Cliente conectado")
    CLIENTS.push(ws);
    ws.on("message", (data)=>{
        //ws.send(data.toString());
        //console.log(data.toString());
        clientePython.write(data.toString());
    })
})

const handleTeste = socket =>{
    socket.on('data', data=>{
        console.log(data.toString());
    })
}
clientePython = [];
const handleConnection = socket =>{
    console.log('Alguém se conectou!')
    clientePython = socket;
    socket.on('data', data =>{
        console.log(data.toString())
        
        CLIENTS.forEach(element => {
            element.send(data.toString())
        });
    //socket.emit(data);
    })
}

const server = net.createServer(handleConnection)
server.listen(5000, '127.0.0.1')

