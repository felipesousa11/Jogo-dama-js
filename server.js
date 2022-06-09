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
    ws.send("Teste")
    CLIENTS.push(ws);
    ws.on("message", (data)=>{
        console.log("mensagem")

        console.log(data.toString())
       
    })
})
  

const handleConnection = socket =>{
    console.log('Alguém se conectou!')
    socket.on('data', data =>{

      
        CLIENTS.forEach(element => {
            element.send(data.toString())
        });
            
        console.log(data.toString());

    //socket.emit(data);
    })
    
}

const server = net.createServer(handleConnection)
server.listen(5000, '127.0.0.1')
